export class BlogListController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;

        this.init();
    }

    init() {
        // Display initial todos
        this.model.getBlogList().then((blogData) => {
            this.onBlogListChanged(blogData);
        }).catch((err) => {
            console.error(err);
        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
    }

}