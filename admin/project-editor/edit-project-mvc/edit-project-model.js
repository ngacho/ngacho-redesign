import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class EditProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }


    async uploadProject(projectObject){
        var blogImageUploadStatus = await this.postProjectToDB(projectObject);
        return blogImageUploadStatus;
    }
}