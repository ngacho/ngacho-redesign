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


        this.blogTitlePreviewField = document.querySelector('.blog-heading-preview');
        this.blogTimePreviewField = document.querySelector('.blog-time-preview');
        this.blogPostDescriptPreviewField = document.querySelector('.post-description-preview');
        this.blogPostPreviewField = document.querySelector('.blog-post-article-preview');

        var titleText = this.blogTitleField.value;
        const titleHtmlStr = this.makeChangesToText(titleText);
        this.blogTitlePreviewField.innerHTML = titleHtmlStr;

        var postDescript = this.postDescriptField.value;
        const descriptHtmlStr = this.makeChangesToText(postDescript);
        this.blogPostDescriptPreviewField.innerHTML = descriptHtmlStr;

        var articleText = this.articleField.value;
        const articleTextHtmlStr = this.makeChangesToText(articleText);
        this.blogPostPreviewField.innerHTML = articleTextHtmlStr;




        
        // event listeners for the title.
        this.blogTitleField.addEventListener("input", () => {
            var titleText = this.blogTitleField.value;
            const htmlStr = this.makeChangesToText(titleText);

            this.blogTitlePreviewField.innerHTML = htmlStr;

        });

        this.postDescriptField.addEventListener("input", ()=>{
            var postDescript = this.postDescriptField.value;

            const htmlStr = this.makeChangesToText(postDescript);

            this.blogPostDescriptPreviewField.innerHTML = htmlStr;
            
        })

        // event listeners for article
        this.articleField.addEventListener("input", () => {
            var articleText = this.articleField.value;
            const htmlStr = this.makeChangesToText(articleText);

            this.blogPostPreviewField.innerHTML = htmlStr;
        });

    }


    setUpBlog(data) {
        console.log('Setting up blog ' + JSON.stringify(data));
        this.blogId = data["blogId"];
        this.blogTitleField.value = data['title'];
        let tags_List = data["tags"].join(", ") // bug is here.
        this.tagsField.value = tags_List;
        this.postDescriptField.value = data["descript"];
        this.articleField.value = data["article"];
        this.blogPublishedDate = data["publishedAt"];
        this.setUpPreviewBlogPreview(data);
    }

    makeChangesToText(text) {
        
        // html string
        const htmlStr = this.parseMarkdown(text);
        
        return htmlStr;
    }

    publishBlog(handler) {
        if (this.articleField.value.length && this.blogTitleField.value.length) {

            var edit_snack_bar = document.createElement('div');
            edit_snack_bar.id = "snackbar"
            edit_snack_bar.className = 'edit-snack-bar';
            var edit_blog_text = document.createTextNode('Edits Published');
            edit_snack_bar.appendChild(edit_blog_text);
            // append the edit to the div.
            this.blog_div.appendChild(edit_snack_bar);


            var snack_bar = document.querySelector('.edit-snack-bar');
            let date = new Date();

            var blogData = this.blogId ? {
                blogId: this.blogId,
                title: this.blogTitleField.value,
                tags: this.tagsField.value.split(',').map((tag) => tag.trim()).filter(n => n),
                descript: this.postDescriptField.value,
                article: this.articleField.value,
                publishedAt: this.blogPublishedDate,
                lastModified: `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
            } : {
                title: this.blogTitleField.value,
                tags: this.tagsField.value.split(',').map((tag) => tag.trim()).filter(n => n),
                descript: this.postDescriptField.value,
                article: this.articleField.value,
                publishedAt: `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`,
                lastModified: `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`
            }

            var status = handler(blogData);

            status.then((_) => {
                // Add the "show" class to DIV
                snack_bar.className = "show";
                // After 1 seconds, remove the show class from DIV
                setTimeout(function () { snack_bar.className = snack_bar.className.replace("show", ""); }, 1000);
                console.info('success');
            }).catch((err) => {
                console.error(err)
            });
        }
    }

    bindHandlePublish(handler) {
        this.publishBtn.addEventListener('click', _ => {
            this.publishBlog(handler)
        });
    }

    setUpPreviewBlogPreview(data) {
        var heading = document.createTextNode(data["title"]);
        this.blogTitlePreviewField.appendChild(heading);


        var time = document.createTextNode(data["publishedAt"]);
        this.blogTimePreviewField.appendChild(time);

        var descript = data["descript"];
        if (descript) {
            var blockQuote = document.createTextNode(descript);
            this.blogPostDescriptPreviewField.appendChild(blockQuote);
        }

        var blog = data["article"]

        // html string
        const htmlStr = this.parseMarkdown(blog);
        this.blogPostPreviewField.innerHTML = htmlStr;
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

