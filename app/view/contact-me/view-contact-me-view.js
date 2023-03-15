
export class ViewContactMeView{
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
        

        // html string
        contact_me_element.innerHTML = contactMeContents["html"];
        this.contact_me_content.append(contact_me_element);

    }


}