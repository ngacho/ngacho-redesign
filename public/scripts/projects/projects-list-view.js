
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

        if (this.scrollAmount < 0) this.scrollAmount = 0;
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