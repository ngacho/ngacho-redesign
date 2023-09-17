const baseUrl = "https://api.ngacho.com";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['formula'],

    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

    [{ 'font': [] }],
];

var quill = new Quill('#editor', {
    modules: {
        formula : true,
        syntax : true,
        toolbar: toolbarOptions
    },
    theme: 'snow',
    placeholder: 'Start writing your blog...',
});

// check if link has anything.
let path_extension = decodeURI(location.search);
var blogId = path_extension.slice(1);
if(blogId) setUpBlog(blogId)


document.addEventListener('DOMContentLoaded', () => {
    
    var markdownOptions = {
      
      tags: { // @option if you need to change for trigger pattern for some tags. 
      blockquote: {
        pattern: /^(\|){1,6}\s/g,
      },
      bold: {
        pattern:  /^(\|){1,6}\s/g,
      },
      italic: {
        pattern: /(\_){1}(.+?)(?:\1){1}/g,
      },
    },
  };
    new QuillMarkdown(quill, markdownOptions)
});


const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', () => {
    const title = document.querySelector('.editor-title').value;
    const description = document.querySelector('.blog-summary-input').value;
    const tags = document.querySelector('.tag-input').value;
    const content = quill.root.innerHTML;
    let date = new Date();

    var blogData = {
      title: title,
      tags: tags.split(',').map((tag) => tag.trim()).filter(n => n),
      descript: description,
      html : content,
      isPublished : true,
      lastModified: `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`
    }

    let id = getFileId(blogData.title);
    blogData = {...blogData, id: blogId ?? id};

    const payload = {
      doc: blogData
    }


    if(!title || !description || !tags || !content) {
      launch_toast('Error', 'Please fill all the fields', 'error');
      return;
    }

  const requestOptions = {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'include',
      body: JSON.stringify(payload)
  };

  

  fetch(`${baseUrl}/database/blogs`, requestOptions).then(response => {
    // Process the response body and status code simultaneously
    Promise.all([response.text(), response.status]).then(([_, status]) => {
            if (status === 200) {
              clearForm();
              launch_toast('Submitted', 'Your blog was published.');
            } else {
              
              launch_toast('Error', 'Your blog was could not be published');
              console.error(`ERROR LEVEL 3: ${status}`);
            }
        }).catch((err) => {
            console.error(`ERROR LEVEL 2: ${err}`);
            launch_toast('Error', 'Your blog was could not be published');
        });
    }).catch((err) => {
        console.error(`ERROR LEVEL 1: ${err}`);
        launch_toast('Error', 'Your blog was could not be published');
  });
});


const draftButton = document.querySelector('.draft-button')
draftButton.addEventListener('click', () => {
    const title = document.querySelector('.editor-title').value;
    const description = document.querySelector('.blog-summary-input').value;
    const tags = document.querySelector('.tag-input').value;
    const content = quill.root.innerHTML;
    let date = new Date();


    var blogData = {
      title: title,
      tags: tags.split(',').map((tag) => tag.trim()).filter(n => n),
      descript: description,
      html : content,
      isPublished : false,
      lastModified: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }

    let id = getFileId(blogData.title);
    blogData = {...blogData, id: blogId ?? id};

    const payload = {
      doc: blogData
    }

    if(!title || !description || !tags || !content) {
      launch_toast('Error', 'Please fill all the fields', 'error');
      return;
    }


    const requestOptions = {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'include',
        body: JSON.stringify(payload)
    };

  fetch(`${baseUrl}/database/blogs`, requestOptions).then(response => {
    // Process the response body and status code simultaneously
    Promise.all([response.text(), response.status]).then(([_, status]) => {
            if (status === 200) {
              window.history.replaceState({}, document.title, "/" + "admin/write-blog");
              clearForm();
              launch_toast('Saved', 'Your blog was saved as a draft.');
            } else {
              launch_toast('Error', 'Your blog was could not be saved as draft');
              console.error(`ERROR LEVEL 3: ${status}`);
            }
        }).catch((err) => {
            console.error(`ERROR LEVEL 2: ${err}`);
            launch_toast('Error', 'Your blog was could not be saved as draft');
        });
    }).catch((err) => {
        console.error(`ERROR LEVEL 1: ${err}`);
        launch_toast('Error', 'Your blog was could not be saved as draft');
  });

});

const cancelButton = document.querySelector('.cancel-button')
cancelButton.addEventListener('click', () => {
    clearForm();
    launch_toast('Cancelled', 'Your blog was not saved.');
});

function clearForm() {
    document.querySelector('.editor-title').value = '';
    document.querySelector('.blog-summary-input').value = '';
    document.querySelector('.tag-input').value = '';
    quill.root.innerHTML = '';
    blogId = '';
}



function launch_toast(title, text) {
    var x = document.getElementById("toast")
    x.className = "show";
    x.innerHTML = '';

    const titleDiv = document.createElement('div');
    titleDiv.id = 'img';

    const textDiv = document.createElement('div');
    textDiv.id = 'desc';

    const titleParagraph = document.createElement('p');
    titleParagraph.innerText = title;

    const textParagraph = document.createElement('p');
    textParagraph.innerText = text;

    titleDiv.appendChild(titleParagraph);
    textDiv.appendChild(textParagraph);

    x.appendChild(titleDiv);
    x.appendChild(textDiv);

    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
}

function getFileId(title) {

      var id = ''
      let letters = 'abcdefghijklmnopqrstuvwxyz';
      // generate project id.
      let fileTitle = title.split(" ").join("-");
      let noPunctuationTitle = fileTitle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      let fixedTitle = noPunctuationTitle.replace(/\s{2,}/g," ");
      for (let i = 0; i < 4; i++) {
          id += letters[Math.floor(Math.random() * letters.length)];
      }
      const fileId = `${fixedTitle}-${id}`;

      return fileId;

}


function setUpBlog(blogId){
  if(!blogId) return;

  const requestOptions = {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'include',
};

  fetch(`${baseUrl}/database/blogs/${blogId}`, requestOptions).then(response => {
    // Process the response body and status code simultaneously
    Promise.all([response.text(), response.status]).then(([data, status]) => {

      if (status === 200) {
        const blog = JSON.parse(data);
        document.querySelector('.editor-title').value = blog.title;
        document.querySelector('.blog-summary-input').value = blog.descript;
        document.querySelector('.tag-input').value = blog.tags.join(', ');
        quill.root.innerHTML = blog.html;
      } else {
        launch_toast('Error', 'Blog could not be loaded');
        console.error(`ERROR LEVEL 3: ${status}`);
      }
            
    }).catch((err) => {
        console.error(`ERROR LEVEL 2: ${err}`);
    });
  }).catch((err) => {
      console.error(`ERROR LEVEL 1: ${err}`);
  });
}