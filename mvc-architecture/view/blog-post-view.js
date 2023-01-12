export class BlogPostView {
    constructor() {
        this.blog_heading_container = document.querySelector(".blog-heading-wrapper");
        this.blog_content_container = document.querySelector(".blog-content");

    }


    setUpBlog(data) {
        var heading_element = document.createElement('h1');
        heading_element.className = "blog-heading";
        var heading = document.createTextNode(data["title"]);
        document.title = data['title'];
        heading_element.appendChild(heading);
        this.blog_heading_container.appendChild(heading_element);


        var time_element = document.createElement('time');
        var time = document.createTextNode(data["publishedAt"]);
        time_element.appendChild(time);
        this.blog_content_container.appendChild(time_element);

        var descript = data["descript"];
        if (descript) {
            var blockQuote_element = document.createElement('blockquote');
            blockQuote_element.className = "post-description";
            var blockQuote = document.createTextNode(descript);
            blockQuote_element.appendChild(blockQuote);
            this.blog_content_container.appendChild(blockQuote_element);
        }

        var article_element = document.createElement('article');
        article_element.className = "blog-post";

        // html string
        article_element.innerHTML = data['html'];
        this.blog_content_container.appendChild(article_element);
    }

}