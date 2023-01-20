export class BlogListController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;

        this.init();
    }

    init() {
        let tag = decodeURI(location.search).slice(1);
        let blogListRef = tag ? this.model.getBlogListByTag(tag) : this.model.getBlogList();
        
        // Display initial todos
        blogListRef.then((blogData) => {
            this.onBlogListChanged(blogData);
        }).catch((err) => {
            console.error(err);
        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
    }

}