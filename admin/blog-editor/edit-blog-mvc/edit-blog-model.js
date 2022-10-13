import { Model } from "../../../mvc-architecture/blog-model.js";

export class EditBlogModel extends Model {

    constructor() {
        super();
    }

    async fetchBlogFromDb(id) {
        var blogData = await this.getBlog(id);
        return blogData;
    }

    async updateBlog(editedBlog) {
        var updateStatus = await this.editBlog(editedBlog);

        return updateStatus;
    }

    async publishNewBlog(blog){
        var publishStatus = await this.addBlog(blog);
        return publishStatus;
    }

}