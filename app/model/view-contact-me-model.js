import { ContactMeModel } from "./base-models/contact-me-model.js";

export class ViewContactMeModel extends ContactMeModel{
    constructor(){
        super();
    }

    async fetchContactMeFromDb(){
        var blogData = await this.fetchActiveContactMe();
        return blogData;
    }
}