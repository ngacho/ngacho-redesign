import { BaseModel } from "./base-model.js";

export class ProjectBaseModel {

    constructor() { 
        this.baseModel = new BaseModel("http://localhost:8080/database/projects");
    }
    


    async fetchProjects() {
        return this.baseModel.getList();
        
    }

    async fetchProjectById(id, serverSideRendering = false) {
        return this.baseModel.getListItemById(id, serverSideRendering);
    }

    async deleteProject(id){
        return this.baseModel.deleteItem(id);

    }


    async updateProjectWithFile(file, bioObject){
        return this.baseModel.updateFileItemObject(file, bioObject);
    }

    async updateProject(bioObject){
        return this.baseModel.updateItem(bioObject);
    }

    async publishProject(file, bioObject){
        return this.baseModel.createFileItem(file, bioObject);
    }


}