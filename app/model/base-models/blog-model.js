import { BaseModel } from "./base-model.js";

export class BlogModel {

    /**
     * getBlogs
     * deleteBlogById
     * editBlog
     * addBlog
     */
    constructor() {
        this.baseModel = new BaseModel("https://api.ngacho.com/database/blogs");
    }

    // pass me a new blog. I'll modify the id
    async addBlog(blog) {
        return this.baseModel.createItem(blog);
    }

    // pass me an edited blog, it should have a blog id.
    async editBlog(editedBlog) {
        return this.baseModel.updateItem(editedBlog);
    }

    async getBlogs() {
        return this.baseModel.getList();
    }

    // singular blog raw vs ssr
    async getBlog(blogId, serverSideRendering = false) {
        return this.baseModel.getListItemById(blogId, serverSideRendering);
    }

    async deleteBlogById(blogId) {
        return this.baseModel.deleteItem(blogId);
    }

    // filter blog by tags.
    async getBlogsByTags(tag) {
        return this.baseModel.getListByTag(tag);
    }

}
