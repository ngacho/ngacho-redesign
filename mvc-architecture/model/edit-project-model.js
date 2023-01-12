import { ProjectBaseModel } from "../../../mvc-architecture/projects-model.js";

export class EditProjectModel extends ProjectBaseModel {
    constructor(){
        super();
    }


    async uploadNewProject(file, projectData){
        let uploadRef = await this.publishProject(file, projectData);
        return uploadRef;
    }

    async fetchSingleProject(id){
        let fetchRef = await this.fetchProjectById(id);
        return fetchRef;
    }

    async uploadUpdatedProjectWithFile(file, projectData){
        let updateRef = await this.updateProjectWithFile(file, projectData);
        return updateRef;

    }

    async uploadUpdatedProjectObjectWithoutFile(projectData){
        let updateRef = await this.updateProject(projectData);
        return updateRef;
    }
}