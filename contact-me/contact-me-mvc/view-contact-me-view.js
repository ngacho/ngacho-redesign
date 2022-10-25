
class ViewContactMeView{
    constructor(){
        this.contact_me_content = document.querySelector(".contact-me-intro");
    }


    setUpContactMe(contactMeContents) {
        var heading_element = document.createElement('h1');
        heading_element.className = "open-invite animate-entry";
        var heading = document.createTextNode(contactMeContents["title"]);
        heading_element.appendChild(heading);
        this.contact_me_content.append(heading_element);


        var contact_me_element = document.createElement('p');
        contact_me_element.className = "contact-me-text animate-entry";
        var contactMeText = contactMeContents["text"]

        // html string
        const htmlStr = this.parseBlogMarkdown(contactMeText);
        contact_me_element.innerHTML = htmlStr;
        this.contact_me_content.append(contact_me_element);

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