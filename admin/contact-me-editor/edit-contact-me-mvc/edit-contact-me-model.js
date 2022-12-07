import { ContactMeModel } from "../../../mvc-architecture/contact-me-model.js";


export class EditContactMeModel extends ContactMeModel{
    constructor(){
        super();
    }

    async uploadContactMe(contactMeObject){
        const postRef = await this.postContactMeText(contactMeObject);
        return postRef;
    }

    async updateContactMe(contactMeObject){
        const postRef = await this.updateContactMe(contactMeObject)
        return postRef;
    }

    async fetchContactMeFromDb(id){
        const fetchRef = await this.fetchContactMe(id)
        return fetchRef;
    }
}