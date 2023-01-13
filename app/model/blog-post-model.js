import { BlogModel } from "./base-models/blog-model.js";

export class BlogPostModel extends BlogModel {
    constructor(){
        super();
    }

    async fetchBlogFromDb(id){
        var blogData = await this.getBlog(id, true);
        return blogData;
    }

}

