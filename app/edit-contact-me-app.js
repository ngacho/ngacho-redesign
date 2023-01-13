
import { EditContactMeController } from "./controller/edit-contact-me-controller.js"
import { EditContactMeModel } from "./model/edit-contact-me-model.js"
import { EditContactMeView } from "./view/contact-me/admin/edit-contact-me-view.js"


const app = new EditContactMeController(new EditContactMeModel(), new EditContactMeView())