export class EditProjectView {
    constructor() {
        this.add_projects_wrapper = document.querySelector(".add_projects_wrapper");

        this.uploadImageInput = document.getElementById("image-upload-input");
        this.projectTitleInput = document.getElementById("project-title-input");
        this.projectLanguagesInput = document.getElementById("project-languages-input");

        this.postProjectButton = document.getElementById("post-project-button");
        this.validate();

        this.projectTitleInput.addEventListener("input", ()=>{
            this.validate()
        })

        this.projectLanguagesInput.addEventListener("input", ()=>{
            this.validate()
        })
        
    }

    validate(){
        if(
            this.projectTitleInput.value.length != 0 &&
            this.projectLanguagesInput.value.length != 0){
            this.postProjectButton.disabled = false;
        }else{
            this.postProjectButton.disabled = true;
        }
    }


    bindUploadProjectImage(handler) {
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

                // handle uploading the project
                handler(projectCoverFile);
            }
        });



        // handler uploads the image.

    }



}