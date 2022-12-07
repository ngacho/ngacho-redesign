import { ContactMeModel } from "../../../mvc-architecture/contact-me-model.js";


export class EditContactMeModel extends ContactMeModel{
    constructor(){
        super();
    }

    async uploadContactMe(contactMeObject) {    
        // if has id, then it's update, else its post
        const postRef = contactMeObject['id'] ?
         await this.postContactMeText(contactMeObject) :
         await this.updateContactMeText(contactMeObject);
         
        return postRef;
    }


    async fetchContactMeFromDb(id){
        const fetchRef = await this.fetchContactMe(id)
        return fetchRef;
    }
}