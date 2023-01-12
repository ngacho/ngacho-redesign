export class EditBlogController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;
        this.blogId = '';

        this.init();
    }

    init() {

        // check if link has anything.
        let path_extension = decodeURI(location.search);
        this.blogId = path_extension.slice(1);

        if (this.blogId) {
            this.fetchBlog(this.blogId);
            this.view.bindHandlePublish(this.handleEditBlog);
        }else{
            this.view.bindHandlePublish(this.handlePublishNewBlog)
        }

    }

    fetchBlog(id) {
        this.model.fetchBlogFromDb(id).then((data)=>{
            this.view.setUpBlog(data);
        }).catch((errMessage) => console.log(errMessage));


    }

    handleEditBlog = async (editedBlog) => this.model.updateBlog({id : this.blogId, ...editedBlog});

    handlePublishNewBlog = async (newBlog) => this.model.publishNewBlog(newBlog);

    
}