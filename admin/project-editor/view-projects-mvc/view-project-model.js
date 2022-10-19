import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class ViewProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async deleteProjectFromDB(projectData){   
        var deleteProjectStatus = await this.deleteProject(projectData);
        return deleteProjectStatus;
    }

    async editProject(projectData){
        return Promise.resolve("edit project");
    }

    async fetchProjects(){
        var projects = await this.getProjects();
        return projects;
    }  
}