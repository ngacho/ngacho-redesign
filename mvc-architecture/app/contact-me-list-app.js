import { ContactMeListController } from "../../../../admin/contact-me-editor/contact-me-list/contact-me-list-mvc/contact-me-list-controller.js"
import { ContactMeListModel } from "../../../../admin/contact-me-editor/contact-me-list/contact-me-list-mvc/contact-me-list-model.js"
import { ContactMeListView } from "../../../../admin/contact-me-editor/contact-me-list/contact-me-list-mvc/contact-me-list-view.js";


const app = new ContactMeListController(new ContactMeListModel(), new ContactMeListView())