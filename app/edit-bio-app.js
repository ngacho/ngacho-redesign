import { EditBioController } from "./controller/edit-bio-controller.js"
import { EditBioModel } from "./model/edit-bio-model.js";
import { EditBioView } from "./view/bio/admin/edit-bio-view.js";


const app = new EditBioController(new EditBioModel(), new EditBioView());