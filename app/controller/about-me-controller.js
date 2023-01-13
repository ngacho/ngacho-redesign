
export class AboutMeController{
    constructor(aboutMeModel, aboutMeView){
        this.model = aboutMeModel;
        this.view = aboutMeView;

        this.init();
    }

    init(){
        this.model.fetchActiveBio().then((bioData) => {
            this.onBioChanged(bioData);
        }).catch((err) => {
            console.error(err);
        })
    }

    onBioChanged = (bio) => {
        this.view.displayBio(bio);
    }
}