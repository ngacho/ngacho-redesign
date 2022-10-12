export class EditProjectView {
    constructor() {
        this.add_projects_wrapper = document.querySelector(".add_projects_wrapper");
        this.projectForm = document.querySelector(".project-details-form");

        this.uploadImageInput = document.getElementById("image-upload-input");
        this.projectTitleInput = document.getElementById("project-title-input");
        this.projectLanguagesInput = document.getElementById("project-languages-input");
        this.moreInfoUrl = document.getElementById("project-more-info-url");

        this.postProjectButton = document.getElementById("post-project-button");
        // this.resetForm();
        this.validate();

        this.projectTitleInput.addEventListener("input", ()=>{
            this.validate();
        })

        this.projectLanguagesInput.addEventListener("input", ()=>{
            this.validate();
        })

        this.moreInfoUrl.addEventListener("input", ()=>{
            this.validate();
        })
        
    }

    validate(){
        if(
            this.projectTitleInput.value.length != 0 &&
            this.projectLanguagesInput.value.length != 0 &&
            this.moreInfoUrl.value.length != 0
            ){
            this.postProjectButton.disabled = false;
        }else{
            this.postProjectButton.disabled = true;
        }
    }


    bindUploadProject(handler) {
        let imageInput = this.uploadImageInput;
        let projectCoverFile = null;

        imageInput.addEventListener("change", () => {
            // this.readImageUrl(this.uploadImageInput, handler);
            if (imageInput.files && imageInput.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var project_cover = document.getElementById('project-cover');
                    project_cover.setAttribute('src', e.target.result);

                };

                projectCoverFile = imageInput.files[0];
                reader.readAsDataURL(projectCoverFile);
            }
        });

        this.postProjectButton.addEventListener("click", ()=>{
            if(projectCoverFile){
                var projectObject = {
                    projectCoverImage : projectCoverFile,
                    projectTitle : this.projectTitleInput.value,
                    projectLanguages : this.projectLanguagesInput.value,
                    projectExtraInfoUrl : this.moreInfoUrl.value
                }

                var status = handler(projectObject);
                status.then((message)=>{
                    console.log(message)
                    this.resetForm();
                }).catch((err)=>{
                    console.log('error ' + err);
                })
            }else{
                console.log("project cover file is null");
            }
        })
    }

    resetForm(){
        this.projectForm.submit();
        return false;
    }




}