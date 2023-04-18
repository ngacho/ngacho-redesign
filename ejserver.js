// import packages
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const envariable = require("dotenv").config({ path: __dirname + '/.env' });
const PORT = process.env.CLIENT_PORT || 3030;
const compression = require("compression");
const helmet = require("helmet");
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createCustomToken } = require("firebase/auth");
const constants = require('./credentials');
const { Console } = require('console');
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
const baseurl = process.env.API_BASE_URL;
const logger  = require('./utils/client-logger');

// securing https : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

// Obsfucation of code
// https://www.creativebloq.com/how-to/hide-your-javascript-code-from-view-source


// initial folders
// let initial_path = path.join(__dirname, "dist");


//express js server with initial path.
const app = express();

// where static files are.


const options = {
    origin: ['http://localhost:8080', 'https://gc.zgo.at', 'https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/'],
}

app.use(compression());
app.use(cookieParser());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "script-src": ["'self'",
            "https://gc.zgo.at",
            "https://smtpjs.com/v3/smtp.js",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.js",
            "https://cdn.rawgit.com/showdownjs/showdown/2.1.0/dist/showdown.min.js",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js "
        ],
        "script-src-attr": ["'self'"],
        "style-src": ["'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.css",
            "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css"
        ],
        "connect-src": ["'self'", "https://api.ngacho.com"],
        "img-src": ["'self' data:", 
	    "https://via.placeholder.com/180",
            "https://www.freeiconspng.com",
            "https://firebasestorage.googleapis.com/v0/b/ngacho-blog.appspot.com/",
            "https://*.googleapis.com/ngacho-blog.appspot.com/"],
    }
}));


// where static files are.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialize firebase
const firebaseApp = initializeApp(
    constants.firebaseConfig
);


// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
  logger.info(`host: ${req.hostname}`);
  res.render('pages/index', { title: "Home" });
});

app.get('/projects', function (req, res) {
  fetch(`${baseurl}/database/projects`)
  .then(response => response.json())
  .then((data) => {
    res.render('pages/projects/projects-list', {
      title: "Projects",
      projects: data
    })
  })
  .catch((e)=>{
	  console.log(e);
    res.status(500).send('Error retrieving data');
  })
  
})

app.get('/blog', function(req, res){

  fetch(`${baseurl}/database/blogs`)
  .then(response => response.json())
  .then((data) => {
    res.render('pages/blogs/blogs-list', {
      title : 'Blog',
      blogs : data
    })
  })
  .catch((e)=>{
    res.status(500).send('Error retrieving data');
  })

  
})

app.get('/blog-post/:id/*', function(req, res){
  let id = req.params.id
  // default server side rendering.
  let ssr = req.params.ssr ? true : req.params.ssr 

  fetch(`${baseurl}/database/blogs/${id}/${ssr}`)
  .then(response => response.json())
  .then((data) => {
    res.render('pages/blogs/blog-post', {
      title : data.title,
      blog : data
    })
  })
  .catch((e)=>{
    res.status(500).send('Error retrieving data');
  })

})

app.get('/blog/tags/:tag', function(req, res){
  let tag = req.params.tag

  fetch(`${baseurl}/database/blogs/tags/${tag}`)
  .then(response => response.json())
  .then((data) => {
    res.render('pages/blogs/blogs-list', {
      title : 'Blog Tags',
      blogs : data,
    })
  })
  .catch((e)=>{
    res.status(500).send('Error retrieving data');
  })
  
  
})

// about page
app.get(['/about-me', '/about'], function (req, res) {
  fetch(`${baseurl}/database/bios`)
  .then(response => response.json())
  .then((data) => {
    let activeBio = data.filter(bio => bio.active === true)[0];
 
    res.render('pages/bio/about-me', {
      title : 'About Me',
      bio : activeBio
    });
  })
  .catch((e)=>{
    res.status(500).send('Error retrieving data');
  })

});

app.get(['/contact-me', '/contact'], function(req, res){

  fetch(`${baseurl}/database/contact-me-texts`)
  .then(response => response.json())
  .then((data) => {
    let contact = data.filter(contact => contact.active === true)[0];
 
    res.render('pages/contact-me/contact-me', {
      title : 'Contact Me',
      contact : contact
    })
  })
  .catch((e)=>{
    res.status(500).send('Error retrieving data');
  })
})

app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});

