import { ViewProjectView } from "../view-projects-mvc/view-project-view.js";
import { ViewProjectController } from "../view-projects-mvc/view-project-controller.js";
import { ViewProjectModel } from "../view-projects-mvc/view-project-model.js";

const app = new ViewProjectController(new ViewProjectModel(), new ViewProjectView());