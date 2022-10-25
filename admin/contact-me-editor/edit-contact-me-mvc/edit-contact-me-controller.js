

export class EditContactMeController{


    constructor(model, view){
        this.model = model;
        this.view = view;

        this.init();
    }

    init(){
        this.view.bindHandlePublishContactMe(this.handlePublishContactMe);
    }

    handlePublishContactMe = async (contactMeObject) => this.model.uploadContactMe(contactMeObject);
}