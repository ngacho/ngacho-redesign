import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class ViewProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async deleteProjectFromDB(projectData){   
        var deleteProjectStatus = await this.deleteProject(projectData);
        return deleteProjectStatus;
    }


    async getProjects(){
        var projects = await this.fetchProjects();
        return projects;
    }  
}