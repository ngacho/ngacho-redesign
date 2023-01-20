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
    origin: ['http://localhost:8080', 'https://gc.zgo.at', 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/'],
}

// app.use(cors());
app.use(compression());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'",
            "https://gc.zgo.at",
            "https://smtpjs.com/v3/smtp.js",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.js",
            "https://cdn.rawgit.com/showdownjs/showdown/2.1.0/dist/showdown.min.js"
        ],
        "script-src-attr": ["'self'"],
        "style-src": ["'self'",
            "https://fonts.googleapis.com",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.css"
        ],
        "connect-src": ["'self'", "http://localhost:8080"],
        "img-src": ["'self'",
            "https://www.freeiconspng.com",
            "https://firebasestorage.googleapis.com/v0/b/ngacho-blog.appspot.com/",
            "https://*.googleapis.com/ngacho-blog.appspot.com/"],
    }
}));
app.use(express.static(initial_path));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

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
    res.sendFile(path.join(initial_path, "/app/view/blog/admin/blog_editor.html"))
});

app.get(['/admin/blogs-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/blog/admin/blogs_to_edit.html"))
})

app.get(['/admin/projects-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/projects/admin/projects_to_edit.html"))
});

app.get(['/admin/choose-bio-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/bio/admin/edit-bio-list.html"));
})

app.get(['/admin/add-bio', '/admin/edit-bio/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/contact-me/admin/bio-editor.html"));
});

app.get(['/admin/choose-contact-me-to-edit'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/contact-me/admin/contact-me-list.html"))
});

app.get(['/admin/add-contact-me', '/admin/edit-contact-me/*'], authorizeAccess, (req, res) => {
    req.originalUrl
    res.sendFile(path.join(initial_path, "/app/view/contact-me/admin/edit-contact-me.html"))
});

// listen for new project and edit project project page
app.get(['/admin/new-project/', '/admin/edit-project/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/projects/admin/project-editor.html"));
});


app.get(['/admin/misc-files'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/misc-files/misc-files-list.html"));
});

app.get(['/admin/add-misc-file', '/admin/edit-misc-file/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/app/view/admin/misc-files/misc-file-editor.html"));

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
    // const reject = () => {
    //     res.setHeader('www-authenticate', 'Basic')
    //     res.sendFile(path.join(initial_path, "/403.html"));
    // }

    // // auth factors stored in an encrypted file.
    // const auth = { login: 'xxxxx', password: '12345' } // change this

    // const authorization = req.headers.authorization

    // if (!authorization) {
    //     return reject()
    // }

    // const [username, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':')

    // if (!(username && password && username === auth.login && password === auth.password)) {
    //     return reject()
    // }

    next();

}
