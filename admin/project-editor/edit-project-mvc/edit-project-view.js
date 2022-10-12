export class EditProjectView {
    constructor(){
        this.add_projects_wrapper = document.querySelector(".add_projects_wrapper");
        this.uploadImageInput = document.getElementById("image-upload-input");

        this.uploadImageInput.addEventListener("change", ()=>{
            this.readImageUrl(this.uploadImageInput);
        });
        
    }


    readImageUrl(input) {
        console.log('reading input');
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var project_cover = document.getElementById('project-cover')
                project_cover.setAttribute('src', e.target.result);

            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    

}