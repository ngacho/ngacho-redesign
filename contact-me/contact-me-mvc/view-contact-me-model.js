import { ContactMeModel } from "../../mvc-architecture/contact-me-model.js";

export class ViewContactMeModel extends ContactMeModel{
    constructor(){
        super();
    }

    async fetchContactMeFromDb(){
        var blogData = await this.getContactMeText();
        return blogData;
    }
}