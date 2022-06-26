export class EditBlogView {
    constructor() {
        this.blogTitleField = document.querySelector('.title');
        this.articleField = document.querySelector('.article');
        this.postDescriptField = document.querySelector('.post-descript');
        this.tagsField = document.querySelector('.tags');
        this.publishBtn = document.querySelector('.publish-btn');
        this.blog_options = document.querySelector('.blog-options');
        this.blog_div = document.querySelector('.blog');

        this.blogPrevContainer = document.querySelector('.blog-content');

    }


    setUpBlog(data) {
        this.blogTitleField.value = data['title'];
        let tags_List = data["tags"].join(", ")
        this.tagsField.value = tags_List;
        this.postDescriptField.value = data["descript"];
        this.articleField.value = data["article"];

        this.setUpPreviewBlogPreview(data);
    }

    setUpPreviewBlogPreview(data) {
        var heading_element = document.createElement('h1');
        heading_element.className = "blog-heading";
        var heading = document.createTextNode(data["title"]);
        heading_element.appendChild(heading);
        this.blogPrevContainer.appendChild(heading_element);


        var time_element = document.createElement('time');
        var time = document.createTextNode(data["publishedAt"]);
        time_element.appendChild(time);
        this.blogPrevContainer.appendChild(time_element);

        var descript = data["descript"];
        if (descript) {
            var blockQuote_element = document.createElement('blockquote');
            blockQuote_element.className = "post-description";
            var blockQuote = document.createTextNode(descript);
            blockQuote_element.appendChild(blockQuote);
            this.blogPrevContainer.appendChild(blockQuote_element);
        }

        var article_element = document.createElement('article');
        article_element.className = "blog-post";
        var blog = data["article"]

        // html string
        const htmlStr = this.parseMarkdown(blog);
        article_element.innerHTML = htmlStr;
        this.blogPrevContainer.appendChild(article_element);


    }

    parseMarkdown(rawMarkdown) {
        const htmlText = rawMarkdown.replace(/^### (.*$)/gim, '<h3>$1</h3>')
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