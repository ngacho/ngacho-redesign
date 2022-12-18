export class EditFileView {
    constructor() {
        this.add_files_wrapper = document.querySelector(".add-files-wrapper");
        this.fileForm = document.querySelector(".file-details-form");

        this.uploadImageInput = document.getElementById("image-upload-input");
        this.fileTitleInput = document.getElementById("file-title-input");
       

        this.postFileButton = document.getElementById("post-file-button");
        // this.resetForm();
        this.validate();

        this.fileTitleInput.addEventListener("input", ()=>{
            this.validate();
        })
        

    }

    validate(){
        this.postFileButton.disabled = this.fileTitleInput.value.length == 0
    }


    bindHandlePublishFile(handler) {
        let imageInput = this.uploadImageInput;
        let fileCoverFile = null;

        imageInput.addEventListener("change", () => {
            if (imageInput.files && imageInput.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    var file_cover = document.getElementById('file-cover');
                    file_cover.setAttribute('src', e.target.result);

                };

                fileCoverFile = imageInput.files[0];
                reader.readAsDataURL(fileCoverFile);
            }
        });

        this.postFileButton.addEventListener("click", ()=>{
                var fileObject = {
                    title : this.fileTitleInput.value,
                    type : fileCoverFile.type
                }


                var status = handler(fileCoverFile, fileObject);
                status.then((message)=>{
                    this.resetForm();
                }).catch((err)=>{
                    console.log('error ' + err);
                })
            
        })
    }

    
    resetForm(){
        this.fileForm.submit();
        return false;
    }




}