import { db, collection, doc, getDoc } from '../admin/firebase.js'

let path_extension = decodeURI(location.search);
var blogId = path_extension.slice(1);
console.log(blogId);

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

getBlog(blogId);

const setupBlog = (data) => {
    var blog_heading_container = document.querySelector(".blog-heading-wrapper");
    var heading_element = document.createElement('h1');
    heading_element.className = "blog-heading";
    var heading = document.createTextNode(data["title"]);
    heading_element.appendChild(heading);
    blog_heading_container.appendChild(heading_element);


    var blog_content_container = document.querySelector(".blog-content");

    var time_element = document.createElement('time');
    var time = document.createTextNode(data["publishedAt"]);
    time_element.appendChild(time);
    blog_content_container.appendChild(time_element);

    var descript = data["descript"];
    if(descript){
        var blockQuote_element = document.createElement('blockquote');
        blockQuote_element.className = "post-description";
        var blockQuote = document.createTextNode(descript);
        blockQuote_element.appendChild(blockQuote);
        blog_content_container.appendChild(blockQuote_element);
    }

    var article_element = document.createElement('article');
    article_element.className = "blog-post";
    var article_text = document.createTextNode(data["article"]);
    article_element.appendChild(article_text);
    blog_content_container.appendChild(article_element);
}