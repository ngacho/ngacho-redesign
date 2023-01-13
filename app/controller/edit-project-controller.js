export class EditProjectController{
    
    constructor(editProjectView, editProjectModel){
        this.model = editProjectModel;
        this.view = editProjectView;
        this.projectId = '';
        this.init()
    }    

    init(){
        let path_extension = decodeURI(location.search);
        this.projectId = path_extension.slice(1);

        if (this.projectId) {
            this.fetchProject(this.projectId);
            this.view.bindHandlePublishProject(this.handlePublishEditedProject);
        }else{
            this.view.bindHandlePublishProject(this.handlePublishNewProject);
        }
    }


    handlePublishNewProject = async (file, projectObject) => this.model.uploadNewProject(file, projectObject);
    handlePublishEditedProject = async (file, projectObject) => { 
        return file ? this.model.uploadUpdatedProjectWithFile(file, projectObject) : this.model.uploadUpdatedProjectObjectWithoutFile(projectObject);
        
    };


    fetchProject(id){
        this.model.fetchSingleProject(id).then(
            (project) => this.view.setUpProject(project)
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }

}
