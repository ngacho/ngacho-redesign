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
            blogData.forEach(element => {
                console.log("Blog Id " + element["blogId"]);
            });

        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
    }

}