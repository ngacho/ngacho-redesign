import { ProjectBaseModel } from "../../mvc-architecture/projects-model.js";

export class ProjectListModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async getProjects(){
        var projects = await this.fetchProjects();
        return projects;
    }

    
    
}