

export class BioListController{

    constructor (bioListView, bioListModel){
        this.model = bioListModel;
        this.view = bioListView;

        this.init();

    }

    init(){
        this.model.getBioList().then((bios) => {
            this.onBioListChanged(bios);
        }).catch((err)=>{
            console.error(err);
        });

        this.view.bindDeleteBio(this.handleDeleteBioStatus);
        this.view.bindMakeBioActive(this.handleUpdateBioStatus);


    }

    handleDeleteBioStatus = async(bioId) => this.model.deleteBio(bioId);
    handleUpdateBioStatus = async(bioId) => this.model.updateActiveBio(bioId);

    onBioListChanged = (bios) => {
        this.view.setUpBios(bios);
    }


    
}