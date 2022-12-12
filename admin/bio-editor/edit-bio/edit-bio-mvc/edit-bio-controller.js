export class EditBioController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.bioId = '';

        this.init();
    }

    init() {
        let path_extension = decodeURI(location.search);
        this.bioId = path_extension.slice(1);

        if (this.bioId) {
            this.fetchBio(this.bioId);
            this.view.bindHandlePublishBio(this.handlePublishUpdatedBio);
        } else {
            this.view.bindHandlePublishBio(this.handlePublishNewBio);
        }



    }



    handlePublishNewBio = async (file, bioObject) => this.model.uploadNewBio(file, bioObject);
    handlePublishUpdatedBio = async (file, bioObject) => {
        return file ? this.model.uploadUpdatedBioWithFile(file, bioObject) : this.model.uploadUpdatedBioObjectWithoutFile(bioObject);
    }
    fetchBio(id) {
        this.model.fetchBioFromDb(id).then(
            (bio) => this.view.setUpBio(bio)
        ).catch((errMessage) =>
            console.log(errMessage)
        );

    }
}
