import { EditBioController } from "../../edit-bio/edit-bio-mvc/edit-bio-controller.js"
import { EditBioModel } from "../../edit-bio/edit-bio-mvc/edit-bio-model.js";
import { EditBioView } from "../../edit-bio/edit-bio-mvc/edit-bio-view.js";


const app = new EditBioController(new EditBioModel(), new EditBioView());