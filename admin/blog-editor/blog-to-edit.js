import { db, collection, doc, deleteDoc, getDocs } from '../firebase.js';

// get the posts
var posts_data = await getDocs(collection(db, "blogs"));
var posts = [];
posts_data.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    var blog_post = doc.data();
    blog_post["blogId"] = doc.id; 
    posts.push(blog_post);
})


var blogs_wrapper = document.querySelector(".blog-items-table");


if (posts) {
    for (const post of posts) {
        // Your existing code unmodified...
        var blog_item = document.createElement('tr');
        blog_item.className = 'blog-item';

        var blog_time_cell = document.createElement('td');
        blog_time_cell.className = "blog-time-cell";

        var time_item = document.createElement('time');
        time_item.className = 'last-edit-date';
        var time = document.createTextNode(post["publishedAt"]);
        time_item.appendChild(time);
        blog_time_cell.appendChild(time_item);


        var blog_title_cell = document.createElement('td');
        blog_title_cell.className = "blog-title-cell";

        var post_title = document.createElement('p');
        post_title.className = 'blog-title';
        var title = document.createTextNode(post["title"]);
        post_title.appendChild(title);
        blog_title_cell.appendChild(post_title);

        post_title.addEventListener('click', function() {
            location.href = `/edit-blog/?${post["blogId"]}`;
        });

        var blog_delete_icon_cell = document.createElement('td');
        blog_delete_icon_cell.className = 'blog-delete-icon-cell'

        var trash_element = document.createElement('a');
        var trash_icon = document.createElement('i');
        trash_icon.className = 'fa fa-trash';
        trash_icon.style = 'color: rgba(153, 15, 2, 1)';
        trash_icon.ariaHidden = true;
        trash_element.addEventListener('click', function(){
            deleteBlog(post["id"]);
        });

        trash_element.appendChild(trash_icon);
        blog_delete_icon_cell.appendChild(trash_element);

        // append all elements to the div
        blog_item.appendChild(blog_time_cell);
        blog_item.appendChild(blog_title_cell);
        blog_item.appendChild(blog_delete_icon_cell);

        // append the blog item to the blog wrappers.
        blogs_wrapper.appendChild(blog_item);
    }
}

// delete doc
const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id))
        .catch((err) => {
            console.log(err);
        });

};