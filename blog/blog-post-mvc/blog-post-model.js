import { Model } from "../../mvc-architecture/model.js";

export class BlogPostModel extends Model{
    constructor(){
        super();
    }

    async fetchBlogFromDb(id){
        var blogData = await this.getBlog(id);
        return blogData;
    }

}

