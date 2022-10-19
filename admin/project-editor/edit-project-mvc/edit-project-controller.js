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
            this.view.bindHandlePublishBlog(this.handlePublishEditedProject);
        }else{
            this.view.bindHandlePublishBlog(this.handlePublishNewProject);
        }
    }

    fetchProject(projectId){
        this.model.fetchSingleProject(projectId).then((projectData) => this.askViewToSetUpBlog(projectData))
            .catch((err) => console.error(err))
    }   

    askViewToSetUpBlog(data) {
        this.view.setUpProject(data);
    }

    handlePublishNewProject = async (projectObject) => this.model.uploadNewProject(projectObject);
    handlePublishEditedProject = async (projectObject) => this.model.uploadEditedProject(projectObject);
}
