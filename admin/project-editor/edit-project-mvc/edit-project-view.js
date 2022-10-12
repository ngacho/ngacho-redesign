export class EditProjectView {
    constructor(){
        this.add_projects_wrapper = document.querySelector(".add_projects_wrapper");
        this.uploadImageInput = document.getElementById("image-upload-input");
        
    }





    bindUploadProjectImage(handler) {
        let input = this.uploadImageInput;
        
        input.addEventListener("change", ()=>{
            // this.readImageUrl(this.uploadImageInput, handler);
            if (input.files && input.files[0]) {
                var reader = new FileReader();
    
                reader.onload = function (e) {
                    var project_cover = document.getElementById('project-cover');
                    project_cover.setAttribute('src', e.target.result);
    
                };
    
                let projectCoverFile = input.files[0];
                reader.readAsDataURL(projectCoverFile);
                handler(projectCoverFile);
            }
        });
        // handler uploads the image.

    }

    

}