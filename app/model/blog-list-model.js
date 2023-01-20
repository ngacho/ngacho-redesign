import { BlogModel } from "./base-models/blog-model.js";

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

    async getBlogListByTag(tag) {
        var taggedBlogList = await this.getBlogsByTags(tag);
        return taggedBlogList;
    }
}