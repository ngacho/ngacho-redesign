import { ContactMeModel } from "../../../mvc-architecture/contact-me-model.js";


export class EditContactMeModel extends ContactMeModel{
    constructor(){
        super();
    }

    async uploadContactMe(contactMeObject){
        const postRef = await this.postContactMeText(contactMeObject);
        return postRef;
    }
}