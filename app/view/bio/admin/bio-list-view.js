export class BioListView {
    constructor() {
        this.biolistGallery = document.querySelector('.bio-gallery')
    }


    setUpBios(bios) {
        for (const bio of bios) {
            const id = bio['id'];

            const bioItem = document.createElement('div');
            bioItem.className = "bio-item";

            let figure = document.createElement('figure');
            let imageHolder = document.createElement('img');
            imageHolder.src = bio['publicUrl'];
            imageHolder.className = 'bio-photo';

            figure.appendChild(imageHolder);

            const bioTitle = document.createElement('h3');
            bioTitle.className = "bio-title"
            var title = document.createTextNode(bio['title']);
            bioTitle.onclick = function () {
                location.href =  `/admin/edit-bio/?${id}`;
            }
            bioTitle.appendChild(title);


            const bioText = document.createElement('p');
            bioText.className = "bio-text"
            var text = document.createTextNode(bio['text']);
            bioText.appendChild(text);


            const iconsWrapper = document.createElement('div');
            iconsWrapper.className = "icons-wrapper";

            const checkMark = document.createElement('i');
            checkMark.className = `fa-solid fa-circle-check activate-${id}`;

            if (bio['active']) {
                checkMark.className += " active";
            }

            const deleteMark = document.createElement('i');
            deleteMark.className = `fa-solid fa-trash delete-${id}`;

            iconsWrapper.appendChild(checkMark);
            iconsWrapper.appendChild(deleteMark);

            bioItem.appendChild(figure);
            bioItem.appendChild(bioTitle);
            bioItem.appendChild(bioText);
            bioItem.appendChild(iconsWrapper);

            this.biolistGallery.appendChild(bioItem);

        }

    }

    bindDeleteBio(handler) {
        this.biolistGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes("fa-trash")) {

                const id = e.target.className.replace("fa-solid fa-trash delete-", '');


                var status = handler(id);
                status.then((_) => {
                    console.log("Deletion Successful");
                }).catch((err) => {
                    console.error(err)
                })

            }
        });

    }

    bindMakeBioActive(handler) {
        this.biolistGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes('fa-circle-check')) {
                if (!e.target.className.includes("active")) {
                    const id = e.target.className.replace("fa-solid fa-circle-check activate-", '');
                    var status = handler(id);
                    status.then((_) => {
                        this.activateNewlySelectedTag(id);
                    }).catch((err) => {
                        console.error(err)
                    });
                }
            }

        });
    }

    activateNewlySelectedTag(id) {
        var checkMarks = this.biolistGallery.getElementsByClassName('fa-circle-check');
        for (const checkMark of checkMarks) {
            const checkMarkId = checkMark.className.replace("fa-solid fa-circle-check activate-", '');
            checkMark.className = checkMark.className.replace('active', '')
            if (id === checkMarkId) {
                checkMark.className += " active"
            }

        }
    }
}