import { BaseModel } from "../mvc-architecture/base-model.js";

export class ContactMeModel {

    constructor() {
        this.baseModel = new BaseModel('http://localhost:3030/database/contact-me-texts');
    }

    async fetchContactMeList() {
        return this.baseModel.getList();
    }

    async fetchActiveContactMe() {
        let contactMeList = await this.baseModel.getList();
        return new Promise((resolve, reject) => {
            let activeContactMeList = contactMeList.filter(contactMe => contactMe.active === true);
            if (activeContactMeList.length > 0) {
                resolve(activeContactMeList[0]);
            } else {
                reject("No active contact me found");
            }
        });

    }

    async fetchContactMe(contactMeId, serverSideRendering = false) {
        return this.baseModel.getListItemById(contactMeId, serverSideRendering);
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