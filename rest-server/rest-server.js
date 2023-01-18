// import packages
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer')
const redis = require('redis');
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const debug = require("debug")("server");
const compression = require("compression");
const helmet = require("helmet");
const ServerController = require('./server-controller');
const FirebaseHelperClass = require('./firebase-helper');
const firebaseHelper = new FirebaseHelperClass();
const restRoutes = require('../routes/rest-routes.json');
// securing https : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

// Obsfucation of code
// https://www.creativebloq.com/how-to/hide-your-javascript-code-from-view-source

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    }
});

// initial folders
let initial_path = path.join(__dirname, "");

//express js server with initial path.
const app = express();


const options = {
    origin: ['https://gc.zgo.at', 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/'],
}

app.use(cors(options));
app.use(compression());
app.use(helmet());
app.use(express.static(initial_path));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// redis set up
let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => debug(error));

    await redisClient.connect();
})();

const serverController = new ServerController(redisClient, firebaseHelper);


app.listen(PORT, () => {
    console.log('listening......');
});


// upload a file (move method to controller). Temporary fix ;-)
const uploadFile = (req, res) => {

    let fileObject = req.body.doc;
    let file = req.file;
    const storageName = req.url.split('/')[2];


    firebaseHelper.postFileToStorage(file, fileObject, storageName).then((data) => {
        let doc = data['doc'];

        serverController.cacheFileInfo(storageName, doc).then((_) =>
            res.status(200).send({
                message: 'successfully uploaded an image'
            })
        ).catch((err) => {
            debug(err);
            res.status(417).send({
                error: 'failed to upload image'
            });
        })
    }).catch((error) => {
        debug(error);
        res.status(417).send({
            error: 'failed to upload image'
        });
    });
}

// update File
const updateFile = (req, res) => {
    // delete the file first if there's a file.
    let fileObject = req.body.doc;
    let file = req.file;
    const storageName = req.url.split('/')[2];

    if (typeof fileObject !== 'object') {
        try {
            fileObject = JSON.parse(fileObject);
        } catch (error) {
            res.status(500).send({ error: "unable to parse file" })
        }
    }
    let id = req.params.id;


    if (file) {
        redisClient.hGet(storageName, id).then((data) => {
            if (data) {
                let oldFile = JSON.parse(data);
                //let newFileData = { ...oldFile, fileObject };

                // updating the object with the new one
                let newFileData = Object.keys(oldFile).reduce((accumulator, key) => {
                    return { ...accumulator, [key]: fileObject[key] ? fileObject[key] : oldFile[key] };
                }, {});
                // delete file
                firebaseHelper.deleteFileFromStorage(storageName, oldFile).then((_) => {
                    // upload new file with new data.

                    let deleteRef = redisClient.hDel(storageName, id);
                    deleteRef.then((_) => {

                        firebaseHelper.postFileToStorage(file, newFileData, storageName).then((data) => {
                            let doc = data['doc'];
                            fileObject = { ...doc };
                            // update client cache
                            redisClient.hSet(storageName, id, JSON.stringify(fileObject));
                        });
                        res.status(200).send({ error: "Successfully updated file" });

                    }).catch((err) => res.status(500).send({ error: err }))

                }).catch((err) => {
                    debug(err);
                    res.status(500).send({ error: "failed to delete file" });
                });
            } else {
                res.status(404).send({ error: "No such file exists" });

            }

        }).catch((err) => {
            debug(err);
            res.status(500).send({ error: "Failed" });

        });

    } else {
        firebaseHelper.updateDocOnFirebaseDatabase(storageName, fileObject).then((_) => {

            redisClient.hGet(storageName, id).then((data) => {
                if (data) {
                    let oldFile = JSON.parse(data);
                    //let newFileData = { ...oldFile, fileObject };

                    // updating the object with the new one
                    let newFileData = Object.keys(oldFile).reduce((accumulator, key) => {
                        return { ...accumulator, [key]: fileObject[key] ? fileObject[key] : oldFile[key] };
                    }, {});
                    // delete file with old data.
                    redisClient.hDel(storageName, id).then((_) => {
                        // update client cache
                        redisClient.hSet(storageName, id, JSON.stringify(newFileData));
                        
                    }).catch((err)=>res.status(500).send({error : `failed with error ${err}`}));

                    res.status(200).send({message : "Updated successfully"});


                }
            });


        }).catch((err) => {
            debug(err);
            res.status(500).send({ error: "failed to update file" });

        })

    }

}

//REST API routes
// Create
app.post([restRoutes.blogs, restRoutes.contactMe], serverController.postDoc);
app.post([restRoutes.projects, restRoutes.bios, restRoutes.misc], upload.single('file'), uploadFile);

// Read
app.get([restRoutes.blogs, restRoutes.projects, restRoutes.contactMe, restRoutes.bios], serverController.fetchAllDocs)
app.get(restRoutes.blogsByTag, serverController.fetchDocsByTag);
app.get([restRoutes.specificBlogRender, restRoutes.specificProjectRender, restRoutes.specificContactMeRender, restRoutes.specificBioRender], serverController.fetchDocById);

// reading misc files is protected
app.get(restRoutes.specificMisc, authorizeAccess, serverController.fetchDocById);
app.get(restRoutes.misc, authorizeAccess, serverController.fetchAllDocs)


// Update
app.put([restRoutes.specificBlog, restRoutes.specificContactMe], serverController.updateDoc);
app.put([restRoutes.specificProject, restRoutes.specificBio, restRoutes.specificMisc], upload.single('file'), updateFile);
app.put([restRoutes.setActiveContactme, restRoutes.setActiveBio], serverController.setSingleItemToActive);


// Delete
app.delete([restRoutes.specificBlog, restRoutes.specificContactMe], authorizeAccess, serverController.deleteDoc);
app.delete([restRoutes.specificProject, restRoutes.specificBio, restRoutes.specificMisc], authorizeAccess, serverController.deleteFile);



app.use((req, res) => {
    res.sendFile(path.join(initial_path, "/404.html"));
});

function authorizeAccess(req, res, next) {
    next();
}