import { cloudStorage, ref } from '../admin/firebase.js'

export class ProjectBaseModel {

    constructor(){
        // Create a child reference
        this.imagesRef = ref(cloudStorage, 'images/project-covers');
        


    }

    init(){
        
    }

    /**
     * Post all projects.
     */
    postProjectToDB(projectData, projectPhoto){

        // Create a reference to 'images/mountains.jpg'
        const mountainImagesRef = ref(cloudStorage, `images/project-covers/${projectData.name}`);

        
    }

    /**
     * List all projects.
     */
    getProjects(){

    }

    /**
     * Singular project
     */
    getProject(){

    }

    /**
     * Edit Project
     */
    editProject(){

    }

    /**
     * Delete project.
     */
    deleteProject(){

    }

}