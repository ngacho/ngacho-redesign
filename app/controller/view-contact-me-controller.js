export class ViewContactMeController{

    constructor(model, view){
        this.model = model;
        this.view = view;

        this.init()
    }

    init() {
     
        this.fetchContactMeText();
    }


    fetchContactMeText() {

        this.model.fetchContactMeFromDb().then((contactMe) =>{
            this.view.setUpContactMe(contactMe);
        }).catch((errMessage)=>{
            console.error(errMessage);
        });

    }

}