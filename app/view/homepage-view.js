import {TextType} from './utils/text-type.js'

export class HomePageView{
    constructor(){
        window.addEventListener('load', this.animate());
    }



    animate () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TextType(elements[i], JSON.parse(toRotate), period)
            }
        }
    
    };


}


