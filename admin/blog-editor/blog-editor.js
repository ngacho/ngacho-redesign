import { db, doc, getDoc, setDoc } from '../firebase.js'

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const postDescriptField = document.querySelector('.post-descript');
const tagsField = document.querySelector('.tags');

const publishBtn = document.querySelector('.publish-btn');
const blog_options = document.querySelector('.blog-options');

const blog_div = document.querySelector('.blog');

var error_snack_bar = document.createElement('div');
error_snack_bar.id = "snackbar"
error_snack_bar.className = 'error-snack-bar';
var error_text = document.createTextNode('Oops. Something wen\'t wrong.');
error_snack_bar.appendChild(error_text);
blog_div.appendChild(error_snack_bar);

var new_blog = true;

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


// check if link has anything.
let path_extension = decodeURI(location.search);
var blogId = path_extension.slice(1);

const getBlog = async (id) => {
    await getDoc(doc(db, "blogs", id))
        .then((blogSnapshot) => {
            if (blogSnapshot.exists()) {
                setupBlog(blogSnapshot.data());
            } else {
                console.log("Blog doesn't exist");
                // location.replace("/blog");
            }
        }).catch((err) => {
            console.log(err);
        });

};

if (blogId) {
    new_blog = false;
    getBlog(blogId);
}

const setupBlog = (data) => {
    blogTitleField.value = data['title'];
    let tags_List = data["tags"].join(", ")
    tagsField.value = tags_List;
    postDescriptField.value = data["descript"];
    articleField.value = data["article"];

}

publishBtn.addEventListener('click', () => {
    if (articleField.value.length && blogTitleField.value.length) {

        // Get the snackbar DIV
        var snack_bar = document.querySelector(".error-snack-bar");

        var docName = ''
        // if new blog
        if (new_blog) {
            // generating id
            var id = ''
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            let blogTitle = blogTitleField.value.split(" ").join("-");
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            docName = `${blogTitle}-${id}`;

            var publish_snack_bar = document.createElement('div');
            publish_snack_bar.id = "snackbar"
            publish_snack_bar.className = 'publish-snack-bar';
            var new_blog_text = document.createTextNode("Blog published");
            publish_snack_bar.appendChild(new_blog_text);

            blog_div.appendChild(publish_snack_bar);

            snack_bar = document.querySelector('.publish-snack-bar');
            // else we're editing
        } else {
            // old id
            docName = blogId;

            var edit_snack_bar = document.createElement('div');
            edit_snack_bar.id = "snackbar"
            edit_snack_bar.className = 'edit-snack-bar';
            var edit_blog_text = document.createTextNode('Edits Published');
            edit_snack_bar.appendChild(edit_blog_text);
            // append the edit to the div.
            blog_div.appendChild(edit_snack_bar);

            snack_bar = document.querySelector('.edit-snack-bar');

        }

        // setting up docName
        let date = new Date(); // for published at info

        var data = {
            title: blogTitleField.value,
            tags: tagsField.value.split(','),
            descript: postDescriptField.value,
            article: articleField.value,
            publishedAt: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
        }

        setDoc(doc(db, "blogs", docName), data).then((ref) => {
            blogTitleField.value = "";
            tagsField.value = "";
            postDescriptField.value = "";
            articleField.value = "";

            // Add the "show" class to DIV
            snack_bar.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { snack_bar.className = snack_bar.className.replace("show", ""); }, 3000);
        }).catch((error) => {
            // Get the snackbar DIV
            snack_bar = document.querySelector(".error-snack-bar");
            // Add the "show" class to DIV
            snack_bar.className = "show";
            // After 3 seconds, remove the show class from DIV
            setTimeout(function () { snack_bar.className = snack_bar.className.replace("show", ""); }, 3000);

            console.log(`Unsuccessful returned error ${error}`)
        });
    }
});