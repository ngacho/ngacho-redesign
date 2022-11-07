// import packages
const express = require('express');
const path = require('path');
const multer = require('multer')
const FirebaseHelperClass = require('./firebase-helper');
const firebaseHelper = new FirebaseHelperClass();

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
    res.sendFile(path.join(initial_path, "/admin/bio-editor/edit-bio.html"))
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
    firebaseHelper.getSpecificDocFromFirebase(req.storageName, req.params.id).then((data) => {
        res.status(200).send(JSON.stringify(data));
    }).catch((err) => {
        console.error(err);
        res.status(502).send({
            error: 'Failed to get necessary data'
        })
    })

}
// Read
// GET. 	blogs/
app.get('/database/blogs', setStorageLocation('blogs'), fetchAllDocs);
// GET. 	blogs/:id
app.get('/database/blogs/:id', setStorageLocation('blogs'), fetchDocById)
// GET.		projects/
app.get('/database/projects', setStorageLocation('projects'), fetchAllDocs);
// GET. 	projects/:id
app.get('/database/projects/:id', setStorageLocation('projects'), fetchDocById);
// GET.		contact-me-texts
app.get('/database/contact-me-texts', setStorageLocation('contact-me-texts'), fetchAllDocs);
// GET.		contact-me-texts/:id
app.get('/database/contact-me-texts/:id', setStorageLocation('contact-me-texts'), fetchDocById);
// GET.		bios
app.get('/database/bios/:id', setStorageLocation('bios'), fetchAllDocs);
// GET. 	bios/:id
app.get('/database/bios/:id', setStorageLocation('bios'), fetchDocById);

// Update
// PUT.       blogs/:id
// PUT.       projects/:id
// PUT.		      contactmes/:id
// PUT.       bios/:id

// Delete
// DELETE.		blogs/
// DELETE. 		projects/
// DELETE.		contactmes/
// DELETE.		bios/

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
