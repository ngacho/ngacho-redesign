import { Model } from "../../../mvc-architecture/blog-model.js";

export class BlogsToEditModel extends Model {

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