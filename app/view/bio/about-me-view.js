export class AboutMeView{
    constructor(){

        // <div class="descript-wrapper">
        this.bioWrapper = document.querySelector('.descript-wrapper');
        
    }
 
    displayBio(bio){

        // create image tag
        const profilePhoto = document.createElement('img');
        profilePhoto.className = 'profile-photo animate-entry';
        profilePhoto.src = bio["publicUrl"];

        // create descript div
        const descript = document.createElement('div');
        descript.className = 'descript';

        // create a p tag with text node
        const description = document.createElement('p');
        // create text node
        const descriptionText = document.createTextNode(bio["text"]);
        description.appendChild(descriptionText);
        descript.appendChild(description);

        // add this to the wrapper
        this.bioWrapper.appendChild(profilePhoto);
        this.bioWrapper.appendChild(descript);

        
    }
}