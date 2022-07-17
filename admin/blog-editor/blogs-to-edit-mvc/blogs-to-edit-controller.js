export class BlogsToEditController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;

        this.init();
    }

    init() {
        // Display initial todos
        this.model.getBlogList().then((blogData) => {
            this.onBlogListChanged(blogData);
        });

        this.view.bindDeleteBlog(this.handleDeleteBlog);
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs);
    }

    handleDeleteBlog = async (blogId) => {
        this.model.deleteBlog(blogId);
    }

}