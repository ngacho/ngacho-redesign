// import packages
const express = require('express');
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
    res.sendFile(path.join(initial_path, "/admin/admin_home.html"));
})

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
})

app.get(['/admin/edit-bio'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/bio-editor/bio-list/edit-bio.html"))
})

app.get(['/admin/choose-contact-me-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/contact-me-editor/contact-me-list.html"))
})

app.get(['/admin/add-contact-me', '/admin/edit-contact-me/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/contact-me-editor/edit-contact-me.html"))
})

// listen for new project and edit project project page
app.get(['/admin/new-project/', '/admin/edit-project/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/project-editor/project_editor.html"))
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

//REST API routes
// Create
// POST.	blogs/
// POST. 	projects/
// POST.	contactmes
// POST. 	bios

const setStorageLocation = (storageName) => {
    // middleware to set storage location of files.
    return (req, res, next) => {
        req.storageName = storageName;
        next();
    };
};


const fetchAllDocs = (req, res) => {
    firebaseHelper.getDocsFromFirebaseDatabase(req.storageName).then((data) => {
        res.status(200).send(JSON.stringify(data));
    }).catch((err) => {
        console.error(err);
        res.status(502).send({
            error: 'Failed to get necessary data'
        })
    })
};

const fetchDocById = (req, res)=>{
    let id = req.params.id
    if(!id) res.status(400).send({error : "No id found in request"})
    firebaseHelper.getSpecificDocFromFirebase(req.storageName, id).then((data) => {
        res.status(200).send(JSON.stringify(data));
    }).catch((err) => {
        console.error(err);
        res.status(502).send({
            error: 'Failed to get necessary data'
        })
    })
}

const deleteDocById = (req, res)=>{
    let id = req.params.id
    if(!id) res.status(400).send({error : "No id found in request"})
    firebaseHelper.deleteDocOnFirebaseDatabase(req.storageName, id).then((data) => {
        res.status(204).send();
    }).catch((err) => {
        console.error(err);
        res.status(502).send({
            error: 'Failed to get necessary data'
        });
    });
}
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
// PUT.       bios/:id

// Delete
app.delete('/database/blogs/:id', serverController.deleteDoc);
app.delete('/database/projects/:id', serverController.deleteFile);
app.delete('/database/contact-me-texts/:id', serverController.deleteDoc);
app.delete('/database/bios/:id', serverController.deleteFile);
app.delete('/database/miscalleneous/:id', serverController.deleteFile);

// add a file
app.post('/uploadFile', upload.single('file'), (req, res) => {
    let file = req.file

    let fileObject = {
        title: req.body.projectname,
        infoUrl: req.body.projectinfourl,
        storageDest: req.body.storageDest,
        projectLangs: req.body.projectlangs
    }

    firebaseHelper.postFileToStorage(file, fileObject).then((success) => {
        res.status(200).send({
            message: 'successfully uploaded an image'
        });
    }).catch((error) => {
        console.error(error);
        res.status(417).send({
            error: 'failed to upload image'
        })
    });

})
// get all files

// delete a file

// authorize admin page.


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
