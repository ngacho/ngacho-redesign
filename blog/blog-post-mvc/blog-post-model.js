import { BlogModel } from "../../mvc-architecture/blog-model.js";

export class BlogPostModel extends BlogModel {
    constructor(){
        super();
    }

    async fetchBlogFromDb(id){
        var blogData = await this.getBlog(id);
        return blogData;
    }

}

