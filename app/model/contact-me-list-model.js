import { ContactMeModel } from "./base-models/contact-me-model.js";

export class ContactMeListModel extends ContactMeModel {
    constructor() {
        super();
    }

    async getContactMesList() {
        const getListRef = this.fetchContactMeList();
        return getListRef
    }

    async deleteContactMeItem(contactMeId) {
        const deleteRef = this.deleteContactMeText(contactMeId);
        return deleteRef;
    }


    async updateActiveContactMe(contactMeId) {
        const updateRef = this.updateContactMeStatus(contactMeId);
        return updateRef;
    }

}