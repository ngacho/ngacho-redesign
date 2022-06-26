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
        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
    }

    handleDeleteTodo = (id) => {
        this.model.deleteTodo(id);
    }

}