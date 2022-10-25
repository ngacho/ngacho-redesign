import { BlogModel } from "../../mvc-architecture/blog-model.js";

export class BlogListModel extends BlogModel {

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