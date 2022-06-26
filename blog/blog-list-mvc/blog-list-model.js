import { Model } from "../../mvc-architecture/model.js";

export class BlogListModel extends Model {

    constructor() {
        super();
        this.blogList = [];
        this.taggedBlogList = [];
    }


    async getBlogList(){
        var blogList = await this.getBlogs();
        return blogList;
    }

    async getBlogListByTag() {
        var taggedBlogList = await this.getBlogsByTags();
        return taggedBlogList;
    }
}