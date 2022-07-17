export class BlogsToEditView {

    constructor() {
        this.blogs_wrapper = document.querySelector(".table-body");
    }

    displayBlogs(posts) {
        if (!posts) {
            // you have no blogs yet, add a new blog?

        } else {
            for (const post of posts) {
                // Your existing code unmodified...
                var blog_item = document.createElement('tr');
                blog_item.className = 'blog-item .new-item';
                blog_item.id = post["blogId"];

                var blog_time_cell = document.createElement('td');
                blog_time_cell.className = "blog-time-cell";

                var time_item = document.createElement('time');
                time_item.className = 'last-edit-date';
                var last_pub_date = post["lastModified"] || post["publishedAt"];
                var time = document.createTextNode(last_pub_date);
                time_item.appendChild(time);
                blog_time_cell.appendChild(time_item);


                var blog_title_cell = document.createElement('td');
                blog_title_cell.className = "blog-title-cell";

                var post_title = document.createElement('p');
                post_title.className = 'blog-title';
                var title = document.createTextNode(post["title"]);
                post_title.appendChild(title);
                blog_title_cell.appendChild(post_title);

                post_title.addEventListener('click', function () {
                    location.href = `/edit-blog/?${post["blogId"]}`;
                });

                var blog_delete_icon_cell = document.createElement('td');
                blog_delete_icon_cell.className = 'blog-delete-icon-cell'

                var trash_element = document.createElement('a');
                var trash_icon = document.createElement('i');
                trash_icon.className = 'fa fa-trash';
                trash_icon.id = `fa-fa-trash-delete-${post["blogId"]}`
                trash_icon.style = 'color: rgba(153, 15, 2, 1)';
                trash_icon.ariaHidden = true;


                trash_element.appendChild(trash_icon);
                blog_delete_icon_cell.appendChild(trash_element);

                // append all elements to the div
                blog_item.appendChild(blog_time_cell);
                blog_item.appendChild(blog_title_cell);
                blog_item.appendChild(blog_delete_icon_cell);

                // append the blog item to the blog wrappers.
                this.blogs_wrapper.appendChild(blog_item);
            }

        }
    }



    bindDeleteBlog(handler) {
        this.blogs_wrapper.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I') {
                const blogId = e.target.id;
                const id = blogId.replace('fa-fa-trash-delete-', '');
                var status = handler(id);
                status.then((_) => {
                    var row = document.getElementById(id);
                    // toggle hide animation.
                    row.classList.toggle('hide');
                    setTimeout(() => {
                        // remove the row after timeout.
                        var table = row.parentNode;
                        while (table && table.tagName != 'TABLE')
                            table = table.parentNode;
                        if (!table)
                            return;
                        table.deleteRow(row.rowIndex);
                    }, 1500);
                }).catch((err) => {
                    console.log('Deleting blog error ' + err);
                });
            }
        });

    }
}