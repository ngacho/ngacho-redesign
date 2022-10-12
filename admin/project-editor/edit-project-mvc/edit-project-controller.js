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
        console.log('called handle with ');
        // this.model.uploadProjectImage(imageFile);
    }
}
