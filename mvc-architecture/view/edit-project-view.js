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


    bindHandlePublishProject(handler) {
        let imageInput = this.uploadImageInput;
        let projectCoverFile = null;

        imageInput.addEventListener("change", () => {
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
                let objId = decodeURI(location.search).slice(1);
                var projectObject = {
                    id : objId,
                    title : this.projectTitleInput.value,
                    projectLanguages : this.projectLanguagesInput.value,
                    projectExtraInfoUrl : this.moreInfoUrl.value
                }

                var status = handler(projectCoverFile, projectObject);
                status.then((message)=>{
                    this.resetForm();
                }).catch((err)=>{
                    console.log('error ' + err);
                })
            
        })
    }

    setUpProject(projectData){
        var projectUrl =  projectData.projectExtraInfoUrl;
        var projectLanguages = projectData.projectLanguages;
        var projectCoverUrl = projectData.publicUrl;
        var projectID = projectData.id;

        var project_cover = document.getElementById('project-cover');
        project_cover.setAttribute('src', projectCoverUrl);

        this.projectTitleInput.value = projectID.substr(0, projectID.length-5);
        this.projectLanguagesInput.value = projectLanguages;
        this.moreInfoUrl.value = projectUrl;

        this.validate()
    }
    resetForm(){
        this.projectForm.submit();
        return false;
    }




}