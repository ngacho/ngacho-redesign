import { MiscFileModel } from "./base-models/misc-file-model.js";

export class MiscFileListModel extends MiscFileModel{
    constructor(){
        super();
    }


    getMiscFilesFromDb(){
        const miscFilesRef = this.fetchMiscFiles();
        return miscFilesRef;
    }

    getMiscFilesFromDbById(id){
        const miscFileRef = this.fetchMiscFileById(id);
        return miscFileRef;
    }

    deleteMiscFileFromDb(id){
        const deleteRef = this.deleteMiscFile(id);
        return deleteRef;
    }

}