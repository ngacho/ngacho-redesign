import { ProjectBaseModel } from "../../mvc-architecture/projects-model.js";

export class ProjectListModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async fetchProjects(){
        var projects = await this.getProjects();
        return projects;
    }

    
    
}