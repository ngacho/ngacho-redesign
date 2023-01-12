import { BlogModel } from "../../../mvc-architecture/blog-model.js";

export class BlogsToEditModel extends BlogModel {

    constructor() {
        super();
        this.blogList = [];
    }


    async getBlogList(){
        var blogList = await this.getBlogs();
        return blogList;
    }

    async deleteBlog(id){
        var hasBlogBeenDeleted = await this.deleteBlogById(id);
        return hasBlogBeenDeleted;
    }
}