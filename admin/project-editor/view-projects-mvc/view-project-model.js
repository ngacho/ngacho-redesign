import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class ViewProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async deleteProject(projectData){
        var deleteProjectStatus = await this.deleteProject(projectData);
        return deleteProjectStatus;
    }

    async fetchProjects(){
        var projects = await this.getProjects();
        return projects;
    }  
}