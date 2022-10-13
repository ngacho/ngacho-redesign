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
            "programming-language": "Kotlin, Javascript",
            "poster-url": "../images/phantom-runner.png",
            "project-link" : "https://github.com/LovemoreNyaumwe/Phantom-Runner"
        }
    ]
};

var projects_carousel = document.querySelector(".projects-carousel");

var projects = projects_data["projects"];
// repeat thrice
for (let i = 0; i < 4; i++) {
    

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