export class BlogListView {
    constructor() {
        // The root element
        this.blogs_wrapper = document.querySelector(".blogs-wrapper");
    }

    displayBlogs(posts) {
        if (!posts) {
            // add error of no blogs yet.
            const no_blog_warning = this.createElement('h1')
            no_blog_warning.textContent = 'No blog yet. Please come back later.'
            this.blogs_wrapper.append(no_blog_warning);
        } else {
            posts.forEach(post => {
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

                post_title.addEventListener('click', function () {
                    location.href = `/blog-post/?${post["id"]}`;
                });

                post_desc.onclick = function () {
                    location.href = `/blog-post/?${post["id"]}`;
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
                this.blogs_wrapper.appendChild(blog_item);

            });
        }
    }

}