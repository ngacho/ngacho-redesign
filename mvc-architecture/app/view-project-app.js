import { ViewProjectView } from "../view/view-project-view.js";
import { ViewProjectController } from "../controller/view-project-controller.js";
import { ViewProjectModel } from "../model/view-project-model.js";

const app = new ViewProjectController(new ViewProjectModel(), new ViewProjectView());