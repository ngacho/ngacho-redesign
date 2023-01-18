// import packages
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const path = require('path');
require("dotenv").config();
const PORT = process.env.PORT || 3030;
const compression = require("compression");
const helmet = require("helmet");

// securing https : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

// Obsfucation of code
// https://www.creativebloq.com/how-to/hide-your-javascript-code-from-view-source


// initial folders
let initial_path = path.join(__dirname, "");
console.log(initial_path);

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


// home page sending to port 3000.
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.listen(PORT, () => {
    console.log('listening......');
});

/**
 * Functions related to the admin page.
 * admin page.
 * */
app.get('/admin', authorizeAccess, (_, res) => {
    res.sendFile(path.join(initial_path, "/app/view/admin/admin-home.html"));
});

app.get(['/admin/write-blog', '/admin/edit-blog/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/blog-editor/blog_editor.html"))
});

app.get(['/admin/blogs-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/blog-editor/blogs_to_edit.html"))
})

app.get(['/admin/projects-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/project-editor/projects_to_edit.html"))
});

app.get(['/admin/choose-bio-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/bio-editor/edit-bio-list.html"));
})

app.get(['/admin/add-bio', '/admin/edit-bio/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/bio-editor/bio-editor.html"));
});

app.get(['/admin/choose-contact-me-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/contact-me-editor/contact-me-list.html"))
});

app.get(['/admin/add-contact-me', '/admin/edit-contact-me/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/admin/contact-me-editor/edit-contact-me.html"))
});

// listen for new project and edit project project page
app.get(['/admin/new-project/', '/admin/edit-project/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/project-editor/project-editor.html"));
});


app.get(['/admin/misc-files'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/misc-files/misc-files-list/misc-files-list.html"));
});

app.get(['/admin/add-misc-file', '/admin/edit-misc-file/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/misc-files/misc-files-editor/misc-file-editor.html"));

});

// blog page
app.get('/blog', (req, res) => {
    res.sendFile(path.join(initial_path, "/app/view/blog/blog.html"));
});

app.get('/blog/tags/*', (req, res) => {
    res.sendFile(path.join(initial_path, "/app/view/blog/blog.html"));
});

app.get('/projects', (req, res) => {
    res.sendFile(path.join(initial_path, "/app/view/projects/projects.html"));
});

app.get('/about-me', (req, res) => {
    res.sendFile(path.join(initial_path, "/app/view/bio/aboutme.html"));
});

app.get('/contact-me', (req, res) => {
    res.sendFile(path.join(initial_path, "/app/view/contact-me/contact.html"));
});

// listen for the blog-post page
app.get('/blog-post', (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/blog/blog_post.html"));
});

function authorizeAccess(req, res, next) {
    const reject = () => {
        res.setHeader('www-authenticate', 'Basic')
        res.sendFile(path.join(initial_path, "/403.html"));
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
