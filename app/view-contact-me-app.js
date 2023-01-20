import { ViewContactMeController } from "./controller/view-contact-me-controller.js"
import { ViewContactMeView } from "./view/contact-me/view-contact-me-view.js"
import { ViewContactMeModel } from "./model/view-contact-me-model.js"



const app = new ViewContactMeController(new ViewContactMeModel(), new ViewContactMeView());