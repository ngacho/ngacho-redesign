import { db, collection, doc as fetchDoc, getDoc, setDoc, getDocs } from './firebase.js'

function openPage(pageUrl) {
    window.open(pageUrl, "_self");
}

// get the posts
var posts_data = await getDocs(collection(db, "blogs"));
var posts = [];
posts_data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    posts.push(doc.data());
})


var blogs_wrapper = document.querySelector(".blogs-wrapper");

if (posts) {
    for (const post of posts) {
        console.log(post);
        // Your existing code unmodified...
        var blog_item = document.createElement('div');
        blog_item.className = 'blog-item animate-entry';

        var time_item = document.createElement('time');
        time_item.className = 'post-date';
        var time = document.createTextNode(post["publishedAt"]);
        time_item.appendChild(time);

        var post_title = document.createElement('p');
        post_title.className = 'post-title';
        var title = document.createTextNode(post["title"]);
        post_title.appendChild(title);

        var post_desc = document.createElement('p');
        post_desc.className = 'post-short-desc';
        var description = document.createTextNode(post["descript"]);
        post_desc.appendChild(description);

        post_title.onclick = function () {
            // open the new window.
            var blog_post_window = window.open("blog_post.html", "_self");
        }

        post_desc.onclick = function () {
            var blog_post_window = window.open("blog_post.html", "_self");
        }

        var tags = document.createElement('div');
        tags.className = 'tags';
        var post_tags = post["tags"];
        for (const tag of post_tags) {
            var tag_ref = document.createElement('a');
            tag_ref.className = 'tag';
            var tag_item = document.createTextNode(tag);
            tag_ref.appendChild(tag_item);
            tags.appendChild(tag_ref);
        }

        // append all elements to the div
        blog_item.appendChild(time_item);
        blog_item.appendChild(post_title);
        blog_item.appendChild(post_desc);
        blog_item.appendChild(tags);

        // append the blog item to the blog wrappers.
        blogs_wrapper.appendChild(blog_item);
    }
}


