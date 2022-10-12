export class EditProjectController{
    
    constructor(editBlogView, editBlogModel){
        this.model = editBlogModel;
        this.view = editBlogView;
        this.init()
    }    

    init(){
        this.view.bindUploadProjectImage(this.handleUploadProjectImage);
    }





    handleUploadProjectImage = async (imageFile) => {
        this.model.uploadProjectImage(imageFile);
    }
}
