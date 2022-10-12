export class EditProjectController{
    
    constructor(editBlogView, editBlogModel){
        this.model = editBlogModel;
        this.view = editBlogView;
        this.init()
    }    

    init(){
        this.view.bindUploadProject(this.handleUploadProject);
    }





    handleUploadProject = async (projectObject) => this.model.uploadProject(projectObject);
    
}
