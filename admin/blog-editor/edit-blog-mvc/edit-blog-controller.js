export class EditBlogController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;
        this.isNewBlog = true;
        this.blogId = '';

        this.init();
    }

    init() {

        // check if link has anything.
        let path_extension = decodeURI(location.search);
        this.blogId = path_extension.slice(1);

        if (this.blogId) {
            this.isNewBlog = false
            

            this.fetchBlog(this.blogId);
        };
    }

    fetchBlog(id) {
        
        this.model.fetchBlogFromDb(id).then(
            (blog) => this.viewSetUpBlog(blog)
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }


    viewSetUpBlog(data) {
        this.view.setUpBlog(data);
    }
}