export class EditFileController {
    
    constructor(editFileView, editFileModel){
        this.model = editFileModel;
        this.view = editFileView;
        this.init()
    }    

    init(){

        this.view.bindHandlePublishFile(this.handlePublishNewFile);
        
    }


    handlePublishNewFile = async (file, FileObject) => this.model.uploadNewFile(file, FileObject);
    

}
