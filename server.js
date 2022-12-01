// import packages
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer')
const redis = require('redis');
const ServerController = require('./server-controller');
const FirebaseHelperClass = require('./firebase-helper');
const firebaseHelper = new FirebaseHelperClass();
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
app.use(express.static(initial_path));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// redis set up
let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(error));

    await redisClient.connect();
})();

const serverController = new ServerController(redisClient, firebaseHelper);

// home page sending to port 3000.
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.listen("3030", () => {
    console.log('listening......');
});

/**
 * Functions related to the admin page.
 * admin page.
 * */
app.get('/admin', authorizeAccess, (_, res) => {
    res.sendFile(path.join(initial_path, "/admin/admin-home.html"));
});

app.get(['/admin/write-blog', '/admin/edit-blog/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/blog-editor/blog_editor.html"))
});

app.get(['/admin/blogs-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/blog-editor/blogs_to_edit.html"))
})

app.get(['/admin/projects-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/project-editor/projects_to_edit.html"))
});

app.get(['/admin/edit-bio'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/bio-editor/bio-list/edit-bio.html"))
})

app.get(['/admin/add-bio', '/admin/edit-bio/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/bio-editor/edit-bio/bio-editor.html"));
});

app.get(['/admin/choose-contact-me-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/contact-me-editor/contact-me-list.html"))
});

app.get(['/admin/add-contact-me', '/admin/edit-contact-me/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/contact-me-editor/edit-contact-me.html"))
});

// listen for new project and edit project project page
app.get(['/admin/new-project/', '/admin/edit-project/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/project-editor/project-editor.html"));
});


app.get(['/admin/add-misc-photos'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/project-editor/project-editor.html"))
});

// blog page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(initial_path, "/blog/blog.html"));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(initial_path, "/projects/projects.html"));
});

app.get('/aboutme', (req, res) => {
    res.sendFile(path.join(initial_path, "/about-me/aboutme.html"));
});

app.get('/contactme', (req, res) => {
    res.sendFile(path.join(initial_path, "/contact-me/contact.html"));
});

// listen for the blog-post page
app.get('/blog-post', (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/blog/blog_post.html"));
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
            console.error(err);
            res.status(417).send({
                error: 'failed to upload image'
            });
        })
    }).catch((error) => {
        console.error(error);
        res.status(417).send({
            error: 'failed to upload image'
        });
    });
}

//REST API routes
// Create
// POST.	blogs/
app.post('/database/blogs', authorizeAccess, serverController.postDoc);
// POST. 	projects/
// POST.	contactmes
app.post('/database/contact-me-texts', authorizeAccess, serverController.postDoc);
// POST. 	bios
app.post('/database/miscalleneous', upload.single('file'), uploadFile);

// Read
app.get('/database/blogs', serverController.fetchAllDocs);
app.get('/database/blogs/:id', serverController.fetchDocById);
app.get('/database/projects', serverController.fetchAllDocs);
app.get('/database/projects/:id', serverController.fetchDocById);
app.get('/database/contact-me-texts', serverController.fetchAllDocs);
app.get('/database/contact-me-texts/:id', serverController.fetchDocById);
app.get('/database/bios/:id', serverController.fetchAllDocs);
app.get('/database/bios/:id', serverController.fetchDocById);

// Update
// PUT.       blogs/:id
// PUT.       projects/:id
// PUT.		  contactmes/:id
app.put('/database/contact-me-texts/:id', authorizeAccess, serverController.setSingleItemToActive);
// PUT.       bios/:id
app.put('/database/bios/:id', authorizeAccess, serverController.setSingleItemToActive);

// Delete
app.delete('/database/blogs/:id', authorizeAccess, serverController.deleteDoc);
app.delete('/database/projects/:id', authorizeAccess, serverController.deleteFile);
app.delete('/database/contact-me-texts/:id', authorizeAccess, serverController.deleteDoc);
app.delete('/database/bios/:id', authorizeAccess, serverController.deleteFile);
app.delete('/database/miscalleneous/:id', authorizeAccess, serverController.deleteFile);


// get all files

// delete a file


app.use((req, res) => {
    res.sendStatus(404);
});

function authorizeAccess(req, res, next) {
    const reject = () => {
        res.setHeader('www-authenticate', 'Basic')
        res.sendStatus(401)
    }

    // auth factors stored in an encrypted file.
    const auth = { login: 'xxxxx', password: '12345' } // change this

    const authorization = req.headers.authorization

    if (!authorization) {
        return reject()
    }

    const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

    if (!(username && password && username === auth.login && password === auth.password)) {
        return reject()
    }

    next();

}
