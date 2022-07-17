export class BlogPostView {
    constructor() {
        this.blog_heading_container = document.querySelector(".blog-heading-wrapper");
        this.blog_content_container = document.querySelector(".blog-content");

    }


    setUpBlog(data) {
        var heading_element = document.createElement('h1');
        heading_element.className = "blog-heading";
        var heading = document.createTextNode(data["title"]);
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
        var blog = data["article"]

        // html string
        const htmlStr = this.parseBlogMarkdown(blog);
        article_element.innerHTML = htmlStr;
        this.blog_content_container.appendChild(article_element);
    }

    parseBlogMarkdown(rawMarkedDownBlog) {

        const htmlText = rawMarkedDownBlog.replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\n$/gim, '<br />')


        return htmlText.trim();

    }
}