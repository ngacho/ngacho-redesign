import { ViewContactMeController } from "../../contact-me/contact-me-mvc/view-contact-me-controller.js"
import { ViewContactMeView } from "../../contact-me/contact-me-mvc/view-contact-me-view.js"
import { ViewContactMeModel } from "../../contact-me/contact-me-mvc/view-contact-me-model.js"



const app = new ViewContactMeController(new ViewContactMeModel(), new ViewContactMeView());