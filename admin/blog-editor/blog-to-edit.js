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

// delete method
// delete doc
const deleteBlog = async (id) => {
    try {
        await deleteDoc(doc(db, "blogs", id)).then((ref) => {
            var row = document.getElementById(id);
            // toggle hide animation.
            row.classList.toggle('hide');
            var table = document.querySelector('.blog-items-table');
            table.deleteRow(row.rowIndex);
            setTimeout(() => {
                // remove the row after timeout.
                
                while (table && table.tagName != 'TABLE')
                    table = table.parentNode;
                if (!table)
                    return;
                table.deleteRow(row.rowIndex);
            }, 5000);
        }).catch((err) => {
            console.log(err);
        });
    } catch (err) {
        console.log(err)
    }
};

var blogs_wrapper = document.querySelector(".table-body");


if (posts) {
    
}
