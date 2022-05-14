const carousel = document.querySelector(".projects-carousel");

var project_card = document.querySelector(".project-card");

var scrollAmount = 0;

// get style object to use for calculating margins.
var style = project_card.currentStyle || window.getComputedStyle(project_card);

// add width of the card + one of the margins.
var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);


function scrollTowardsLeft(){
    carousel.scrollTo({
        top: 0,
        left: (scrollAmount -= scrollPerClick),
        behavior: "smooth"
    });

    if(scrollAmount < 0) scrollAmount = 0;
}

function scrollTowardsRight(){
    if(scrollAmount <= carousel.scrollWidth - carousel.clientWidth){
        carousel.scrollTo({
            top: 0,
            left: (scrollAmount += scrollPerClick),
            behavior: "smooth"
        })
    }
}