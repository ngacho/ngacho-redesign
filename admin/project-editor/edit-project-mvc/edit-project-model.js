import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class EditProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }


    async uploadNewProject(projectObject){
        var updateProjectStatus = await this.postProjectToDB(projectObject);
        return updateProjectStatus;
    }

    async uploadEditedProject(projectData){
        console.log(projectData.projectCoverUrl);
        var updateProjectStatus = await this.editProject(projectData);
        return updateProjectStatus;
    }

    async fetchSingleProject(projectId){
        var projectData = await this.getProject(projectId);
        return projectData;
    }
}