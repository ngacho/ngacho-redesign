
export class MiscFileListView{

    constructor(){
        this.miscFileGallery = document.querySelector(".files-gallery");
    }

    renderMiscFiles(files){
        for (const file of files) {
            const fileId = file["id"];
            const fileTitle = file["title"];
            // const fileCoverUrl = file["publicUrl"];
            const fileType = file['type'];
            const fileCoverUrl =  fileType === 'image/jpeg' ? file['publicUrl'] : "https://www.freeiconspng.com/uploads/document-icon-14.png";

            // create the parent item
            var file_gallery_item = document.createElement('div');
            file_gallery_item.id = fileId;
            file_gallery_item.className = 'file-gallery-item';
            file_gallery_item.tabIndex = 0;

            //  create figure element
            var img_figure = document.createElement('figure');
            // create img, append src, create alt.
            var file_poster = document.createElement('img');
            file_poster.className = "file-gallery-image"
            file_poster.src = fileCoverUrl;
            file_poster.alt = `${fileTitle} file`
            // put image in figure element
            img_figure.appendChild(file_poster);

            // create text node
            let textItem = document.createElement('p');
            textItem.className = "file-gallery-item-text"
            let textNode = document.createTextNode(fileTitle);
            textItem.appendChild(textNode);

            

            // create the actions div
            var file_gallery_item_actions = document.createElement('div');
            file_gallery_item_actions.className = "file-gallery-item-actions";
            

            // create the actions as an unordered list
            var list = document.createElement('ul');
            
            var copy_list_item = document.createElement('li');
            copy_list_item.className = "file-gallery-item-copy"

            var copy_url_button = document.createElement('i');
            
            copy_url_button.className = `fas fa-copy ${file['fileCoverTitle']}`
            copy_url_button.id = `copy ${fileId}`;
            copy_url_button.ariaHidden = true;
            copy_list_item.appendChild(copy_url_button);

            var delete_list_item = document.createElement('li');
            delete_list_item.className = "file-gallery-item-delete"
            

            var delete_button = document.createElement('i');
            delete_button.className = `fas fa-trash ${file['fileCoverTitle']}`;
            delete_button.id = `delete ${fileId}`;
            delete_button.ariaHidden = true;
            delete_list_item.appendChild(delete_button);

            list.appendChild(copy_list_item);
            list.appendChild(delete_list_item);


            file_gallery_item_actions.appendChild(list);
            file_gallery_item.appendChild(img_figure);
            file_gallery_item.appendChild(file_gallery_item_actions);
            file_gallery_item.appendChild(textItem);
            this.miscFileGallery.appendChild(file_gallery_item);

            

        
        }

    }


    bindDeleteFile(handler) {

        this.miscFileGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes("fas fa-trash")) {
                const fileId = e.target.id.replace("delete ", '');

                var deleteStatus = handler(fileId);
                deleteStatus.then((_)=>{
                    const gallery_item = document.getElementById(fileId);
                    gallery_item.classList.toggle('hide');
                    setTimeout(() => {
                        // remove the item after timeout.
                        gallery_item.remove();
                        
                    }, 1500);
                    console.log("deleted successfully")
                }).catch((err)=>{
                    console.log("Failed to delete");
                    console.log(err);

                })
                
            }
        });

    }

    bindCopyFileUrl(handler){
        this.miscFileGallery.addEventListener('click', e => {
            if (e.target && e.target.nodeName == 'I' && e.target.className.includes("fas fa-copy ")) {
                const fileId = e.target.id.replace("copy ", '');
                console.log(`copying ${fileId}`);

                var status = handler(fileId);
                status.then((data)=>{
                    console.log(data['publicUrl']);
                }).catch((err)=>{
                    console.log(err);
                });
            }
        });
    }
    
}
