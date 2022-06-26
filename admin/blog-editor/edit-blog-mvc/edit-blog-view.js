export class EditBlogView {
    constructor() {
        this.blogTitleField = document.querySelector('.title');
        this.articleField = document.querySelector('.article');
        this.postDescriptField = document.querySelector('.post-descript');
        this.tagsField = document.querySelector('.tags');
        this.publishBtn = document.querySelector('.publish-btn');
        this.blog_options = document.querySelector('.blog-options');
        this.blog_div = document.querySelector('.blog');

    }


    setUpBlog(data) {
        this.blogTitleField.value = data['title'];
        let tags_List = data["tags"].join(", ")
        this.tagsField.value = tags_List;
        this.postDescriptField.value = data["descript"];
        this.articleField.value = data["article"];
    }



}