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


quill.on('text-change', function(delta, oldDelta, _) {
    console.log(quill.getContents());
});


const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', () => {
    launch_toast('Submitted', 'Your blog was published.');
});


const draftButton = document.querySelector('.draft-button')
draftButton.addEventListener('click', () => {
    launch_toast('Saved', 'Your blog was saved as a draft.');
});

const cancelButton = document.querySelector('.cancel-button')
cancelButton.addEventListener('click', () => {
    launch_toast('Cancelled', 'Your blog was not saved.');
});



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
