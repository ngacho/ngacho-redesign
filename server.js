// import packages
const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

// Obsfucation of code
// https://www.creativebloq.com/how-to/hide-your-javascript-code-from-view-source


// initial folders
let initial_path = path.join(__dirname, "");

//express js server with initial path.
const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

// home page sending to port 3000.
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"));
})

app.listen("3030", () => {
    console.log('listening......');
});

// admin page.
app.get('/admin',  authorizeAccess, (_, res) => {
    res.sendFile(path.join(initial_path, "/admin/admin_home.html"));
})

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = '/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if (err) {
            throw err;
        } else {
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
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

app.get(['/admin/write-blog', '/admin/edit-blog/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/blog-editor/blog_editor.html"))
});

app.get(['/admin/blogs-to-edit'], authorizeAccess, (req, res)=>{
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/blog-editor/blogs_to_edit.html"))
})

app.get(['/admin/projects-to-edit'], authorizeAccess, (req, res)=>{
    req.originalUrl
    res.sendFile(path.join(initial_path, "/admin/project-editor/projects_to_edit.html"))
})

// listen for new project and edit project project page
app.get(['/admin/new-project/', '/admin/edit-project/*'], authorizeAccess, (req, res) => {
    req.originalUrl;
    res.sendFile(path.join(initial_path, "/admin/project-editor/project_editor.html"))
});


app.use((req, res) => {
    res.sendStatus(404);
})


// authorize admin page.
function authorizeAccess(req, res, next){
    const reject = () => {
        res.setHeader('www-authenticate', 'Basic')
        res.sendStatus(401)
    }

    // auth factors stored in an encrypted file.
    const auth = {login: 'xxxxx', password: '12345'} // change this

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

