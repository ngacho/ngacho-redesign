import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class EditProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }


    async uploadNewProject(projectObject){
        var blogImageUploadStatus = await this.postProjectToDB(projectObject);
        return blogImageUploadStatus;
    }

    async uploadEditedProject(projectData){
        return Promise.resolve("success");
    }

    async fetchSingleProject(projectId){
        var projectData = await this.getProject(projectId);
        return projectData;
    }
}