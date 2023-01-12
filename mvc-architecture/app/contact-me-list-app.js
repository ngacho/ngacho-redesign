import { ContactMeListController } from "../controller/contact-me-list-controller.js"
import { ContactMeListModel } from "../model/contact-me-list-model.js"
import { ContactMeListView } from "../view/contact-me-list-view.js";


const app = new ContactMeListController(new ContactMeListModel(), new ContactMeListView())