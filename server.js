// import packages
const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');


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

app.listen("3000", () => {
    console.log('listening......');
});

app.get('/admin/blog-editor', (req, res) => {
    res.sendFile(path.join(initial_path, "/admin/blog-editor/blog_editor.html"));
});

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = '/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
});

// blog page
app.get('/blog', (req, res)=>{
    res.sendFile(path.join(initial_path, "/blog/blog.html"));
});

app.get('/projects', (req, res)=>{
    res.sendFile(path.join(initial_path, "/projects/projects.html"));
});

app.get('/aboutme', (req, res)=>{
    res.sendFile(path.join(initial_path, "/about-me/aboutme.html"));
});

app.get('/contactme', (req, res)=>{
    res.sendFile(path.join(initial_path, "/contact-me/contact.html"));
});

// listen for the blog-post page
app.get('/blog-post', (req, res) => {
    res.sendFile(path.join(initial_path, "/blog/blog_post.html"));
});

app.use((req, res) => {
    res.json("404: Not found");
})




