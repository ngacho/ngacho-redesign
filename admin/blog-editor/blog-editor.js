import { db, doc, getDoc, setDoc } from '../firebase.js'

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
const postDescriptField = document.querySelector('.post-descript');
const tagsField = document.querySelector('.tags');

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

var new_blog = true;

uploadInput.addEventListener('change', () => {
    uploadImage(uploadInput, "image");
});

const uploadImage = (uploadFile, uploadType) => {
    const [file] = uploadFile.files;
    if (file && file.type.includes("image")) {
        const formdata = new FormData();
        formdata.append('image', file);

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
            .then(data => {
                if (uploadType == "image") {
                    addImage(data, file.name);
                } else {
                    bannerPath = `${location.origin}/${data}`;
                    banner.style.backgroundImage = `url("${bannerPath}")`;
                }
            })
    } else {
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    let curPos = articleField.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleField.value = articleField.value.slice(0, curPos) + textToInsert + articleField.value.slice(curPos);
}


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
    var tags_String = ""
    let tags_List = data["tags"]
    for (var i = 0; i < tags_List.length; i++) {
        tags_String += tags_List[i];
        if (i != tags_List.length - 1) { //<---
            tags_String = tags_String + ",";
        }

    }
    tagsField.value = tags_String;
    postDescriptField.value = data["descript"];
    articleField.value = data["aricle"];
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