import { BaseModel } from "../mvc-architecture/base-model.js";

export class ContactMeModel {

    constructor() {
        this.baseUrl = 'http://localhost:3030/database/contact-me-texts'
        this.baseModel = new BaseModel('http://localhost:3030/database/contact-me-texts');
    }

    async fetchContactMeList() {
        return this.baseModel.getList();
    }

    async fetchContactMe(contactMeId) {
        return this.baseModel.getListItemById(contactMeId);
    }


    async updateContactMeStatus(contactMeId) {
        return this.baseModel.updateItemStatus(contactMeId);
    }

    async deleteContactMeText(contactMeId) {
        return this.baseModel.deleteItem(contactMeId);
    }


    async updateContactMeText(contactMeContents){
        return this.baseModel.updateItem(contactMeContents);
    }



    async postContactMeText(contactMeContents) {
        return this.baseModel.createItem(contactMeContents);

    }
}