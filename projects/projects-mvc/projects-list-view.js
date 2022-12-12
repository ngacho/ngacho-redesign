
export class ProjectListView {
    constructor() {
        this.projects_carousel = document.querySelector(".projects-carousel");
        this.right_click_button = document.querySelector(".right-control");
        this.left_click_button = document.querySelector(".left-control");
        this.right_click_button.addEventListener('click', ()=>{
            this.scrollTowardsRight();
        })
        this.left_click_button.addEventListener('click', ()=>{
            this.scrollTowardsLeft();
        })
        
        this.scrollAmount = 0;
        
        // this.initiateCarousel();
    }


    displayBlogs(projects) {
        for (const project of projects) {
            const projectId = project["id"];
            const projectTitle = projectId.substring(0, projectId.length-5);
            
            const projectCoverUrl = project["publicUrl"];
            const projectLangs = project["projectLanguages"];
            const projectExtraInfoLink = project["projectExtraInfoUrl"];

            // create the (project-card animate-entry)
            var project_card = document.createElement('div');
            // class name
            project_card.className = 'project-card animate-entry';
            //  create figure element
            var img_figure = document.createElement('figure');
            // create img, append src, create alt.
            var project_poster = document.createElement('img');
            project_poster.src = projectCoverUrl;
            project_poster.alt = `photo of ${projectTitle}`
            // put image in figure element
            img_figure.appendChild(project_poster);


            // create a section, project-details
            var project_details = document.createElement('section');
            project_details.className = "project-details";
            // create div, min-details.
            var minimized_details = document.createElement('div');
            minimized_details.className = "min-details"
            // create h1 block for project name, span for language.
            var project_title = document.createElement('h1');
            var title = document.createTextNode(projectTitle);
            project_title.appendChild(title);

            var project_language = document.createElement('span');
            var lang = document.createTextNode(projectLangs);
            project_language.appendChild(lang);

            project_title.appendChild(project_language);

            minimized_details.appendChild(project_title);
            // create a tag class btn , with target _blank and rel noopener noreferrer 
            var learn_more = document.createElement('a');
            learn_more.className = "btn";
            // text is learn more.
            var learn_more_prompt = document.createTextNode("Learn More");
            learn_more.href = projectExtraInfoLink;
            learn_more.target = "_blank";
            learn_more.rel = "noopener noreferrer"

            learn_more.appendChild(learn_more_prompt);
            project_details.appendChild(minimized_details);
            project_details.appendChild(learn_more);



            // put everything in project card.
            project_card.appendChild(img_figure);
            project_card.appendChild(project_details);

            // add to carousel
            this.projects_carousel.appendChild(project_card);
        }
    }

    scrollTowardsLeft() {
        // add width of the card + one of the margins.
        var project_card = document.querySelector(".project-card");
        var style = project_card.currentStyle || window.getComputedStyle(project_card);

        var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

        this.projects_carousel.scrollTo({
            top: 0,
            left: (this.scrollAmount -= scrollPerClick),
            behavior: "smooth"
        });

        if (this.scrollAmount < 0) scrollAmount = 0;
    }

    scrollTowardsRight() {
        var project_card = document.querySelector(".project-card");
        var style = project_card.currentStyle || window.getComputedStyle(project_card);

        // add width of the card + one of the margins.
        var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

        if (this.scrollAmount <= this.projects_carousel.scrollWidth - this.projects_carousel.clientWidth) {
            this.projects_carousel.scrollTo({
                top: 0,
                left: (this.scrollAmount += scrollPerClick),
                behavior: "smooth"
            })
        }
    }


}