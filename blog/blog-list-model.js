import { Model } from "../mvc-architecture/model.js";

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

    getBlogListByTag() {
        return super.getBlogsByTags();
    }
}

var blogListModel = new BlogListModel();
blogListModel.getBlogList().then((data)=>{    
    data.forEach(element => {
        console.log(element["title"]);
    });
    console.log(`Function call : ${data.length}`)
})