export class BlogsToEditView{

    constructor(){
        this.blogs_wrapper = document.querySelector(".table-body");
    }

    displayBlogs(posts) {
        if (!posts) {
            // you have no blogs yet, add a new blog?

        }else{
            for (const post of posts) {
                // Your existing code unmodified...
                var blog_item = document.createElement('tr');
                blog_item.className = 'blog-item';
                blog_item.id = post["blogId"];
        
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
        
                post_title.addEventListener('click', function () {
                    location.href = `/edit-blog/?${post["blogId"]}`;
                });
        
                var blog_delete_icon_cell = document.createElement('td');
                blog_delete_icon_cell.className = 'blog-delete-icon-cell'
        
                var trash_element = document.createElement('a');
                var trash_icon = document.createElement('i');
                trash_icon.className = 'fa fa-trash';
                trash_icon.style = 'color: rgba(153, 15, 2, 1)';
                trash_icon.ariaHidden = true;
                trash_element.addEventListener('click', function () {
                    // how to make controller add this to a view.
                    deleteBlog(post["blogId"]);
                });
        
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

    deleteBlog(id){
        // push this to controller somehow.

    }
}