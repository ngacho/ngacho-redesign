export class BlogPostController {
    constructor(blogPostModel, blogPostView) {
        this.model = blogPostModel;
        this.view = blogPostView;
        this.blogId = '';

        this.init();
    }


    init() {
        let path_extension = decodeURI(location.search);
        this.blogId = path_extension.slice(1);

        if (this.blogId) {
            this.fetchBlog(this.blogId);
        }

    }

    fetchBlog(id) {

        this.model.fetchBlogFromDb(id).then(
            (blog) => {
                this.viewSetUpBlog(blog)
            }
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }

    viewSetUpBlog(data) {
        this.view.setUpBlog(data);
    }
}