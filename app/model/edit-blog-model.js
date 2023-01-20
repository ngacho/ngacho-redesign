import { BlogModel } from "./base-models/blog-model.js";

export class EditBlogModel extends BlogModel {

    constructor() {
        super();
    }

    async fetchBlogFromDb(id) {
        let blogRef = await this.getBlog(id, true);
        return blogRef;
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