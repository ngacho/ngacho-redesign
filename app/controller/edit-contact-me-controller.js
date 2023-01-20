

export class EditContactMeController{

    constructor(model, view){
        this.model = model;
        this.view = view;
        this.contactMeId = '';

        this.init();
    }

    init(){
        let path_extension = decodeURI(location.search);
        this.contactMeId = path_extension.slice(1);

        if(this.contactMeId){
            this.fetchContactMe(this.contactMeId);
            this.view.bindHandlePublishContactMe(this.handlePublishUpdatedContactMe);
        }else{
            this.view.bindHandlePublishContactMe(this.handlePublishNewContactMe);
        }
        
        
        
    }

    handlePublishNewContactMe = async (contactMeObject) => this.model.uploadContactMe(contactMeObject);
    handlePublishUpdatedContactMe = async (contactMeObject) => this.model.updateContactMe(contactMeObject);
    
    

    fetchContactMe(id) {
        this.model.fetchContactMeFromDb(id).then(
            (contactMe) => this.view.setUpContactMe(contactMe)
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }
}