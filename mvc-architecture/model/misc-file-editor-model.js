import { MiscFileModel } from "../../../../mvc-architecture/misc-file-model.js";

export class EditFileModel extends MiscFileModel {
    constructor(){
        super();
    }


    async uploadNewFile(file, fileData){
        let uploadRef = await this.publishFile(file, fileData);
        return uploadRef;
    }

}