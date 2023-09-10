// import packages
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');
const PORT = process.env.CLIENT_PORT || 3030;
const compression = require("compression");
const helmet = require("helmet");
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createCustomToken } = require("firebase/auth");
const constants = require('./credentials');
const { Console } = require('console');
const baseurl = process.env.API_BASE_URL;
const logger = require('./utils/client-logger');
const BaseModel = require('./models/base-model');
const fetchModel = new BaseModel();

// securing https : https://www.toptal.com/nodejs/secure-rest-api-in-nodejs

// Obsfucation of code
// https://www.creativebloq.com/how-to/hide-your-javascript-code-from-view-source


// initial folders
// let initial_path = path.join(__dirname, "dist");


//express js server with initial path.
const app = express();
let initial_path = path.join(__dirname, "views/");

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
      "https://cdn.quilljs.com/1.3.6/quill.js",
      "https://cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown.js",
      "https://smtpjs.com/v3/smtp.js",
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js",
      "https://cdn.rawgit.com/showdownjs/showdown/2.1.0/dist/showdown.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js "
    ],
    "script-src-attr": ["'self'"],
    "style-src": ["'self'",
      "'unsafe-inline'",
      "https://fonts.googleapis.com",
      "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      "https://cdn.quilljs.com/1.3.6/quill.snow.css",
      "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css",
      "https://cdn.jsdelivr.net/npm/quilljs-markdown@latest/dist/quilljs-markdown-common-style.css",
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

app.get('/', function (req, res) {
  res.render('pages/index', { title: "Home" });
});

app.get('/projects', function (req, res) {
  fetchModel.getList(`${baseurl}/database/projects`)
    .then((data) => {
      res.render('pages/projects/projects-list', {
        title: "Projects",
        projects: data
      })
    })
    .catch((error) => {
      logger.error(`Error fetching projects: ${error}`);
      res.status(500).send('Error retrieving data');
    })

})

app.get('/blog', function (req, res) {

  fetchModel.getList(`${baseurl}/database/blogs`)
    .then((data) => {
      data = data.filter(blog => blog.isPublished === true);
      res.render('pages/blogs/blogs-list', {
        title: 'Blog',
        blogs: data
      })
    })
    .catch((e) => {
      logger.error(`Error fetching blogs: ${e}`);
      res.status(500).send('Error retrieving data');
    })


})

app.get('/blog-post/:id/*', function (req, res) {
  let id = req.params.id
  // default server side rendering.
  let ssr = req.params.ssr ? true : req.params.ssr


  fetchModel.getListItemById(`${baseurl}/database/blogs`, id, ssr)
    .then((data) => {
      res.render('pages/blogs/blog-post', {
        title: data.title,
        blog: data
      })
    })
    .catch((e) => {
      logger.error(`Error fetching blog: ${id} - ${e}`);
      res.status(500).send('Error retrieving data');
    })

})

app.get('/blog/tags/:tag', function (req, res) {
  let tag = req.params.tag

  fetchModel.getListByTag(`${baseurl}/database/blogs`, tag)
    .then((data) => {
      data = data.filter(blog => blog.isPublished === true);
      res.render('pages/blogs/blogs-list', {
        title: 'Blog Tags',
        blogs: data,
      })
    })
    .catch((e) => {
      logger.error(`Error fetching blogs by tag ${tag}: ${e}`);
      res.status(500).send('Error retrieving data');
    })


})

// about page
app.get(['/about-me', '/about'], function (req, res) {
  fetchModel.getList(`${baseurl}/database/bios`)
    .then((data) => {
      let activeBio = data.filter(bio => bio.active === true)[0];

      res.render('pages/bio/about-me', {
        title: 'About Me',
        bio: activeBio
      });
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })

});

app.get(['/contact-me', '/contact'], function (req, res) {

  fetchModel.getList(`${baseurl}/database/contact-me-texts`)
    .then((data) => {
      let contact = data.filter(contact => contact.active === true)[0];

      res.render('pages/contact-me/contact-me', {
        title: 'Contact Me',
        contact: contact
      })
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })
})


app.get('/admin', authorizeAccess, (_, res)=>{

  const cards = [
    {
      title : "Write a blog",
      link : "/admin/write-blog"
    }, 
    {
      title : "Edit a Blog",
      link : "/admin/choose-blog-to-edit"
    },
    {
      title : "Add/Edit a Project",
      link : "/admin/choose-project-to-edit"
    },
    {
      title : "Edit Bio",
      link : "/admin/choose-bio-to-edit"
    },
    {
      title : "Edit Contact Me",
      link : "/admin/choose-contact-me-to-edit"
    },
    {
      title : "Add files",
      link : "/admin/misc-files"
    }
  ]

  res.render('pages/admin', {
    title : 'Admin Home',
    adminCards : cards
  })
})


app.get(['/admin/write-blog', '/admin/edit-blog/*'], authorizeAccess, (_, res) => {
  res.sendFile(path.join(initial_path, "pages/blogs/admin/edit-blog.html"))
});

app.get('/admin/choose-blog-to-edit', authorizeAccess, (_, res)=>{

  fetchModel.getList(`${baseurl}/database/blogs`)
    .then((data) => {

      res.render('pages/blogs/admin/edit-blog-list', {
        title: 'Edit a Blog',
        blogs: data
      });
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })

})

app.get('/admin/choose-project-to-edit', authorizeAccess, (_, res)=>{

  fetchModel.getList(`${baseurl}/database/projects`)
    .then((data) => {

      res.render('pages/projects/admin/edit-project-list', {
        title: 'Edit a Project',
        projects : data
      });
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })

})

app.get('/admin/choose-bio-to-edit', authorizeAccess, (_, res)=>{

  fetchModel.getList(`${baseurl}/database/bios`)
    .then((data) => {

      res.render('pages/bio/admin/edit-bio-list', {
        title: 'Edit a Bio',
        bios: data
      });
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })

})


app.get('/admin/choose-contact-me-to-edit', authorizeAccess, (_, res)=>{

  fetchModel.getList(`${baseurl}/database/contact-me-texts`)
    .then((data) => {

      res.render('pages/contact-me/admin/edit-contact-me-list', {
        title: 'Edit a Contact Me',
        contactMes: data
      });
    })
    .catch((e) => {
      logger.error(`Error fetching data: ${e}`);
      res.status(500).send('Error retrieving data');
    })

})

app.listen(3030, () => {
  console.log('Server is listening on port 3030');
});



function authorizeAccess(req, res, next) {

  const reject = () => {
      // res.setHeader('www-authenticate', 'Basic')
      res.sendFile(path.join(initial_path, "403.html"));
  }

  const promptAuth = () => {
      res.setHeader('www-authenticate', 'Basic')
      res.sendStatus(401);
  }

  const signInUser = (email, password) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              userCredential.user.getIdToken(true).then((token) => {

                  try {
                      res.cookie("access_token", token, {
                          maxAge: 3600000,
                          httpOnly: true,
                          sameSite : "strict",
                          domain : "ngacho.com",
                          secure: process.env.NODE_ENV === "production",
                      });
                      
                      logger.warn(`Log in successful: ${req.ip} - ${req.headers['user-agent']}`);
                      next();
                  } catch (error) {
                      logger.error(`Error setting cookie: ${error}`);
                      reject();
                  }
                  
                  
              }).catch((error) => {
                  logger.error(`Error getting token: ${error}`);
                  reject();
                  
              });

          }).catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              logger.error(`Error signing in user: ${errorCode} - ${errorMessage} || ${req.ip} - ${req.headers['user-agent']}`);

              promptAuth();
          });

  }


  const token = req.cookies.access_token;
  

  if(!token) {
      let authorization = req.headers.authorization;
      if(!authorization) {
          promptAuth();
      }else{
          const [email, password] = Buffer.from(authorization.replace('Basic ', ''), 'base64').toString().split(':');
          signInUser(email, password);
      }        
  }else{
      logger.warn(`Authorized with token: ${req.ip} - ${req.headers['user-agent']}`);
      next();
  }
  


}