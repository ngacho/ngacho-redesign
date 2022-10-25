

export class EditContactMeView{
    constructor(){
        this.contactMeForm = document.querySelector(".contactme-details-form");
        this.contactMeTitleInput = document.getElementById("contactme-title-input");
        this.contactMeTextInput = document.getElementById("contactme-text-input");

        this.postContactMeButton = document.getElementById("post-contactme-button");

        this.validate();

        this.contactMeTitleInput.addEventListener("input", ()=>{
            this.validate();
        });

        this.contactMeTextInput.addEventListener("input", ()=>{
            this.validate();
        });
    }

    validate(){
        if(
            this.contactMeTitleInput.value.length != 0 &&
            this.contactMeTextInput.value.length != 0 
            ){
            this.postContactMeButton.disabled = false;
        }else{
            this.postContactMeButton.disabled = true;
        }
    }

    bindHandlePublishContactMe(handler) {
        this.postContactMeButton.addEventListener("click", ()=>{
            console.log("form clicked");
            const contactMeObject = {
                title : this.contactMeTitleInput.value,
                text : this.contactMeTextInput.value
            }

            var status = handler(contactMeObject);
            status.then((_)=>{
                this.resetForm();
            }).catch((err)=>{
                console.error(err);
            })
        });
    }

    resetForm(){
        this.contactMeForm.submit();
        return false;
    }



}