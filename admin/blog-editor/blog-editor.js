import { db, doc, getDoc, setDoc } from '../firebase.js'

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const postDescriptField = document.querySelector('.post-descript');
const tagsField = document.querySelector('.tags');

const publishBtn = document.querySelector('.publish-btn');

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

        // else we're editing
        } else {
            // old id
            docName = blogId;

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
        }).catch((error) => {
            console.log(`Unsuccessful returned error ${error}`)
        });
    }
});