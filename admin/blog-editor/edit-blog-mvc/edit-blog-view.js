export class EditBlogView {

    constructor() {
        this.blogTitleField = document.querySelector('.title');
        this.articleField = document.querySelector('.article');
        this.postDescriptField = document.querySelector('.post-descript');
        this.tagsField = document.querySelector('.tags');
        this.publishBtn = document.querySelector('.publish-btn');
        this.blog_options = document.querySelector('.blog-options');
        this.blog_div = document.querySelector('.blog');

        // blog options
        this.blogId = '';
        this.blogPublishedDate = '';
        // months
        this.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        this.blogPrevContainer = document.querySelector('.blog-content');


    }


    setUpBlog(data) {
        this.blogTitleField.value = data['title'];
        let tags_List = data["tags"].join(", ")
        this.tagsField.value = tags_List;
        this.postDescriptField.value = data["descript"];
        this.articleField.value = data["article"];
        this.blogId = data["blogId"];
        this.blogPublishedDate = data["publishedAt"];
        this.setUpPreviewBlogPreview(data);

        this.articleField.addEventListener("input", () => {
            var articleText = this.articleField.value;
            this.makeChangesToText(articleText);
        });

    }

    makeChangesToText(text) {
        var article_element = document.querySelector('.blog-post-preview');
        // html string
        const htmlStr = this.parseMarkdown(text);
        article_element.innerHTML = htmlStr;
        this.blogPrevContainer.appendChild(article_element);
    }

    publishBlog(handler) {
        if (this.articleField.value.length && this.blogTitleField.value.length) {

            if (this.blogId) {

                var edit_snack_bar = document.createElement('div');
                edit_snack_bar.id = "snackbar"
                edit_snack_bar.className = 'edit-snack-bar';
                var edit_blog_text = document.createTextNode('Edits Published');
                edit_snack_bar.appendChild(edit_blog_text);
                // append the edit to the div.
                this.blog_div.appendChild(edit_snack_bar);


                var snack_bar = document.querySelector('.edit-snack-bar');
                let date = new Date();

                var editedBlogData = {
                    blogId: this.blogId,
                    title: this.blogTitleField.value,
                    tags: this.tagsField.value.split(','),
                    descript: this.postDescriptField.value,
                    article: this.articleField.value,
                    publishedAt: this.blogPublishedDate,
                    lastModified: `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
                }

                var status = handler(editedBlogData);

                status.then((_) => {
                    // Add the "show" class to DIV
                    snack_bar.className = "show";
                    // After 3 seconds, remove the show class from DIV
                    setTimeout(function () { snack_bar.className = snack_bar.className.replace("show", ""); }, 1000);
                    console.info('success');
                }).catch((err) => {
                    console.error(err)
                });

            }
        }
    }

    bindHandlePublish(handler) {
        this.publishBtn.addEventListener('click', _ => {
            this.publishBlog(handler)
        })
    }

    setUpPreviewBlogPreview(data) {
        var heading_element = document.createElement('h1');
        heading_element.className = "blog-heading-preview";
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
            blockQuote_element.className = "post-description-preview";
            var blockQuote = document.createTextNode(descript);
            blockQuote_element.appendChild(blockQuote);
            this.blogPrevContainer.appendChild(blockQuote_element);
        }

        var article_element = document.createElement('article');
        article_element.className = "blog-post-preview";
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
            .replace(/^```\s*([^]+?.*?[^]+?[^]+?)```/gim, '<br/><pre><code>$1</code></pre><br/>')
            .replace(/^`(.*?)`/gim, '<code>$1</code>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
            .replace(/\*(.*)\*/gim, '<i>$1</i>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2'/>")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' target=\"_blank\" rel=\"noopener noreferrer\">$1</a>")
            .replace(/\n$/gim, '<br />')


        return htmlText.trim();

    }
}

