import { BioModel } from "./base-models/bio-model.js";

export class BioListModel extends BioModel {

    constructor() {
        super();

    }


    async getBioList() {
        let bioListRef = this.fetchBios();
        return bioListRef;
    }

    async deleteBioFromDb(bioId){
        let deleteRef = this.purgeBio(bioId);
        return deleteRef;
        
    }

    async updateActiveBio(bioId){
        let updateStatus = this.updateBioStatus(bioId);
        return updateStatus;
    }

}