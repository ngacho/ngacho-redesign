export class ContactMeListView {
    constructor() {

        this.contactMeGallery = document.querySelector(".contact-me-gallery");

    }


    setUpContactMePage(contactMes) {
        for (const contactMe of contactMes) {
            let id = contactMe['id'];
            const contactMeItemWrapper = document.createElement('div');
            contactMeItemWrapper.className = "contact-me-item-wrapper";

            const contactMeItem = document.createElement('div');
            contactMeItem.className = "contact-me-item";

            const contactMeTitle = document.createElement('h3');
            contactMeTitle.className = "contact-me-title"
            var title = document.createTextNode(contactMe['title']);
            contactMeTitle.appendChild(title);

            const contactMeText = document.createElement('p');
            contactMeText.className = "contact-me-text";
            contactMeText.onclick = function () {
                location.href =  `/admin/edit-contact-me/${id}`;
            }
            var text = document.createTextNode(contactMe['text']);
            contactMeText.appendChild(text);

            

            const iconsWrapper = document.createElement('div');
            iconsWrapper.className = "icons-wrapper";

            

            const checkMark = document.createElement('i');
            checkMark.className = `fa-solid fa-circle-check activate-${id}`;

            if (contactMe['active']) {
                checkMark.className += " active";
            }

            const deleteMark = document.createElement('i');
            deleteMark.className = `fa-solid fa-trash delete-${id}`;

            iconsWrapper.appendChild(checkMark);
            iconsWrapper.appendChild(deleteMark);




            contactMeItem.appendChild(contactMeTitle);
            contactMeItem.appendChild(contactMeText);

            contactMeItemWrapper.appendChild(contactMeItem);
            contactMeItemWrapper.appendChild(iconsWrapper);


            this.contactMeGallery.appendChild(contactMeItemWrapper);


        }
    }


    bindMakeContactMeActive(handler) {
        this.contactMeGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes('fa-circle-check')) {
                if (!e.target.className.includes("active")) {
                    const id = e.target.className.replace("fa-solid fa-circle-check activate-", '');
                    var status = handler(id);
                    status.then((_) => {
                        this.activateNewlySelectedTag(id);
                        console.log("success");
                    }).catch((err) => {
                        console.error(err)
                    });
                }
            }
        });
    }

    activateNewlySelectedTag(id){
        var checkMarks = this.contactMeGallery.getElementsByClassName('fa-circle-check');
        for(const checkMark of checkMarks){
            const checkMarkId = checkMark.className.replace("fa-solid fa-circle-check activate-", '');
            checkMark.className = checkMark.className.replace('active', '')
            if(id === checkMarkId){
                checkMark.className += " active"
            }

        }
    }

    bindDeleteContactMe(handler) {
        this.contactMeGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes("fa-trash")) {

                const id = e.target.className.replace("fa-solid fa-trash delete-", '');


                var status = handler(id);
                status.then((_) => {
                    console.log("success");
                }).catch((err) => {
                    console.error(err)
                })

            }
        });
    }

}