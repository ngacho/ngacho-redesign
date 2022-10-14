
export class ViewProjectView{

    constructor(){
        this.projectGallery = document.querySelector(".project-gallery");

    }



    displayProjects(projects){
        for (const project of projects) {
            const projectId = project["projectId"];
            const projectTitle = projectId.substring(0, projectId.length-5);
            
            const projectCoverUrl = project["projectCoverUrl"];


            // create the parent item
            var project_gallery_item = document.createElement('div');
            project_gallery_item.className = 'project-gallery-item';
            project_gallery_item.tabIndex = 0;

            //  create figure element
            var img_figure = document.createElement('figure');
            // create img, append src, create alt.
            var project_poster = document.createElement('img');
            project_poster.className = "project-gallery-image"
            project_poster.src = projectCoverUrl;
            project_poster.alt = `photo of ${projectTitle}`
            // put image in figure element
            img_figure.appendChild(project_poster);

            // create the actions div
            var project_gallery_item_actions = document.createElement('div');
            project_gallery_item_actions.className = "project-gallery-item-actions";

            // create the actions as an unordered list
            var list = document.createElement('ul');

            var edit_list_item = document.createElement('li');
            edit_list_item.className = "project-gallery-item-edit"

            var edit_button = document.createElement('i');
            edit_button.className = "fas fa-pen"
            edit_button.ariaHidden = true;
            edit_list_item.appendChild(edit_button);

            var delete_list_item = document.createElement('li');
            delete_list_item.className = "project-gallery-item-delete"

            var delete_button = document.createElement('i');
            delete_button.className = "fas fa-trash"
            delete_button.ariaHidden = true;
            delete_list_item.appendChild(delete_button);

            // append each item to list, then append list to actions div
            list.appendChild(edit_list_item);
            list.appendChild(delete_list_item);
            project_gallery_item_actions.appendChild(list);
            
            // append image figure, actions to parent div
            project_gallery_item.appendChild(img_figure);
            project_gallery_item.appendChild(project_gallery_item_actions); 
            
            this.projectGallery.appendChild(project_gallery_item);
        
        }

    }
    
}