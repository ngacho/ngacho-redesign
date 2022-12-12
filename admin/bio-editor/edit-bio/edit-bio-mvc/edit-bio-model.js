import { BioModel } from "../../../../mvc-architecture/bio-model.js";

export class EditBioModel extends BioModel {

    constructor(){
        super();
    }


    async uploadNewBio(file, bioObject){
        let uploadRef = await this.publishBio(file, bioObject);
        return uploadRef;
    }

    async fetchBioFromDb(id){
        let fetchRef = await this.fetchBioById(id);
        return fetchRef;
    }

    async uploadUpdatedBioWithFile(file, bioObject){
        let updateRef = await this.updateBioWithFile(file, bioObject);
        return updateRef;

    }

    async uploadUpdatedBioObjectWithoutFile(bioObject){
        let updateRef = await this.updateBio(bioObject);
        return updateRef;
    }
    
}