import { BaseModel } from "../mvc-architecture/base-model.js";

export class BioModel{
    constructor(){
        this.baseModel = new BaseModel("http://localhost:3030/database/bios");
        
    }


    async fetchBios(){
        return this.baseModel.getList();
    }

    async fetchBioById(id){
        return this.baseModel.getListItemById(id);
    }

    async purgeBio(bioId){
        return this.baseModel.deleteItem(bioId);
    }

    async updateBioStatus(bioId) {
        return this.baseModel.updateItemStatus(bioId);
    }

    async publishBio(file, bioObject){
        return this.baseModel.createFileItem(file, bioObject);
    }




}