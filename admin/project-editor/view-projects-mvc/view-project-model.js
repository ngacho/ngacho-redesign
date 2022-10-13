import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class ViewProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    deleteProject(projectObject){
        // var blogImageUploadStatus = await this.postProjectToDB(projectObject);
        // return blogImageUploadStatus;
    }

    async fetchProjects(){
        var projects = await this.getProjects();
        return projects;
    }

    
    
}