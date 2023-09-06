var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

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
