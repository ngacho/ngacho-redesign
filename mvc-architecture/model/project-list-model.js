import { ProjectBaseModel } from "./base-models/projects-model.js";

export class ProjectListModel extends ProjectBaseModel {
    constructor(){
        super();
    }

    async getProjects(){
        var projects = await this.fetchProjects();
        return projects;
    }

    
    
}