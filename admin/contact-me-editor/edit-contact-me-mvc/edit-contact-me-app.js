
import { EditContactMeController } from "../../contact-me-editor/edit-contact-me-mvc/edit-contact-me-controller.js"
import { EditContactMeModel } from "../../contact-me-editor/edit-contact-me-mvc/edit-contact-me-model.js"
import { EditContactMeView } from "../../contact-me-editor/edit-contact-me-mvc/edit-contact-me-view.js"


const app = new EditContactMeController(new EditContactMeModel(), new EditContactMeView())