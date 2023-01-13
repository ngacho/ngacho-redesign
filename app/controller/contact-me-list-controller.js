

export class ContactMeListController{
    constructor(model, view){
        this.model = model;
        this.view = view;

        this.init();
    }

    init(){
        this.model.getContactMesList().then((contactMeList) => {
            this.onContactListChanged(contactMeList);
        }).catch((err)=>{
            console.error(err);
        });

        this.view.bindDeleteContactMe(this.handleDeleteContactMe);
        this.view.bindMakeContactMeActive(this.handleUpdateContactMeStatus);

    }


    onContactListChanged = (contactMeList) => {
        this.view.setUpContactMePage(contactMeList);
    }



    handleDeleteContactMe = async(contactMeId) => this.model.deleteContactMeItem(contactMeId);
    handleUpdateContactMeStatus = async(contactMeId) => this.model.updateActiveContactMe(contactMeId);
    

}