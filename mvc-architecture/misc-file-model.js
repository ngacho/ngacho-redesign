import { BaseModel } from "./base-model.js";

export class MiscFileModel{
    constructor(){
        this.baseModel = new BaseModel("http://localhost:3030/database/miscalleneous-files");
    }

    async fetchMiscFiles(){
        return this.baseModel.getList();
    }

    async fetchMiscFileById(id){
        return this.baseModel.getListItemById(id);
    }

    async deleteMiscFile(id){
        return this.baseModel.deleteItem(id);
    }

    async publishFile(file, fileObject){
        return this.baseModel.createFileItem(file, fileObject);
    } 

}