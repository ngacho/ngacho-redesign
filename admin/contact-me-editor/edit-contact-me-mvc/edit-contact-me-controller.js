

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
        }
        
        this.view.bindHandlePublishContactMe(this.handlePublishNewContactMe)
        
        
    }

    handlePublishNewContactMe = async (updatedContactMeObject) => {
        var contactMeObject = {...updatedContactMeObject}
        if(this.contactMeId){
            contactMeObject.id = this.contactMeId
        }

        this.model.uploadContactMe(contactMeObject);
    }
    
    

    fetchContactMe(id) {
        this.model.fetchContactMeFromDb(id).then(
            (contactMe) => this.view.setUpContactMe(contactMe)
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }
}