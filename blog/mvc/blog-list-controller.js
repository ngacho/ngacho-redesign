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
            blogData.forEach(element => {
                console.log(element["title"]);
            });

        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
    }

}