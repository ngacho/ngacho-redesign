export class EditBioView {

    constructor() {

        this.add_projects_wrapper = document.querySelector(".add-bio-wrapper");
        this.projectForm = document.querySelector(".bio-details-form");

        this.uploadImageInput = document.getElementById("image-upload-input");
        this.bioTitleInput = document.getElementById("bio-title-input");
        this.bioTextInput = document.getElementById("bio-text-input");
        

        this.postBioButton = document.getElementById("post-bio-button");
        // this.resetForm();
        this.validate();

        this.bioTitleInput.addEventListener("input", ()=>{
            this.validate();
        })

        this.bioTextInput.addEventListener("input", ()=>{
            this.validate();
        })
        
    }

    validate(){
        if(
            this.bioTitleInput.value.length != 0 &&
            this.bioTextInput.value.length != 0
            ){
            this.postBioButton.disabled = false;
        }else{
            this.postBioButton.disabled = true;
        }
    }


    bindHandlePublishBio(handler) {
        let imageInput = this.uploadImageInput;
        let bioCoverFile = null;

        imageInput.addEventListener("change", () => {
            if (imageInput.files && imageInput.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var bio_cover = document.getElementById('bio-cover');
                    bio_cover.setAttribute('src', e.target.result);

                };

                bioCoverFile = imageInput.files[0];
                reader.readAsDataURL(bioCoverFile);
            }
        });

        this.postBioButton.addEventListener("click", ()=>{
            if(bioCoverFile){

                let bioObject = {
                    "title" : this.bioTitleInput.value,
                    "text" : this.bioTitleInput.value,
                    active : false
                }
                
        
                var status = handler(bioCoverFile, bioObject);
                status.then((message)=>{
                    console.log(message);
                    this.resetForm();
                }).catch((err)=>{
                    console.log('error ' + err);
                })
            }else{
                console.log("project cover file is null");
            }
        })
    }

    setUpBio(bioData){

        let bioTitle = bioData['title'];
        let bioText = bioData['text'];
        let publicUrl = bioData['publicUrl'];

        this.bioTitleInput.value = bioTitle;
        this.bioTextInput.value = bioText;

        var project_cover = document.getElementById('bio-cover');
        project_cover.setAttribute('src', publicUrl);
        
        this.validate();
    }

    resetForm(){
        this.projectForm.submit();
        return false;
    }

}