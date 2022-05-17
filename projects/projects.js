// get the projects
var projects_data = {
    "projects": [
        {
            "project-name": "Protaskinator",
            "programming-language": "Kotlin",
            "poster-url": "../images/to-do.png",
            "project-link" : "https://github.com/ngacho/Protaskinator"
        },
        {
            "project-name": "AI Pacman Agent",
            "programming-language": "Python",
            "poster-url": "../images/pacman.png",
            "project-link" : "https://github.com/ngacho/pacman-contest"
        },
        {
            "project-name": "Phantom Runner",
            "programming-language": "Kotlin",
            "poster-url": "../images/phantom-runner.png",
            "project-link" : "https://github.com/LovemoreNyaumwe/Phantom-Runner"
        }
    ]
};

var projects_carousel = document.querySelector(".projects-carousel");

var projects = projects_data["projects"];
// repeat thrice
for (let i = 0; i < 4; i++) {
    for (const project of projects) {

        // create the (project-card animate-entry)
        var project_card = document.createElement('div');
        // class name
        project_card.className = 'project-card animate-entry';
        //  create figure element
        var img_figure = document.createElement('figure');
        // create img, append src, create alt.
        var project_poster = document.createElement('img');
        project_poster.src = project["poster-url"];
        project_poster.alt = `photo of ${project["project-name"]}`
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
        var title = document.createTextNode(project["project-name"]);
        project_title.appendChild(title);

        var project_language = document.createElement('span');
        var lang = document.createTextNode(project["programming-language"]);
        project_language.appendChild(lang);

        project_title.appendChild(project_language);

        minimized_details.appendChild(project_title);
        // create a tag class btn , with target _blank and rel noopener noreferrer 
        var learn_more = document.createElement('a');
        learn_more.className = "btn";
        // text is learn more.
        var learn_more_prompt = document.createTextNode("Learn More");
        learn_more.href = project["project-link"];
        learn_more.target = "_blank";
        learn_more.rel = "noopener noreferrer"

        learn_more.appendChild(learn_more_prompt);
        project_details.appendChild(minimized_details);
        project_details.appendChild(learn_more);
        
    

        // put everything in project card.
        project_card.appendChild(img_figure);
        project_card.appendChild(project_details);

        // add to carousel
        projects_carousel.appendChild(project_card);
    }

}

var scrollAmount = 0;

var project_card = document.querySelector(".project-card");

// get style object to use for calculating margins.
var style = project_card.currentStyle || window.getComputedStyle(project_card);

// add width of the card + one of the margins.
var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

function scrollTowardsLeft() {
    projects_carousel.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if (scrollAmount < 0) scrollAmount = 0;
}

function scrollTowardsRight() {
    console.log("clicked");
    if (scrollAmount <= projects_carousel.scrollWidth - projects_carousel.clientWidth) {
        projects_carousel.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        })
    }
}