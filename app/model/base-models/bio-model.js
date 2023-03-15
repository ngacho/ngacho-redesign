import { BaseModel } from "./base-model.js";

export class BioModel{
    constructor(){
        this.baseModel = new BaseModel("https://api.ngacho.com/database/bios");
        
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

    async updateBioWithFile(file, bioObject){
        return this.baseModel.updateFileItemObject(file, bioObject);
    }

    async updateBio(bioObject){
        return this.baseModel.updateItem(bioObject);
    }

    async publishBio(file, bioObject){
        return this.baseModel.createFileItem(file, bioObject);
    }




}