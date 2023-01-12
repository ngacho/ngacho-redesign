import { EditProjectController } from '../controller/edit-project-controller.js';
import { EditProjectView } from '../view/edit-project-view.js';
import { EditProjectModel } from '../model/edit-project-model.js';

const app = new EditProjectController(new EditProjectView(), new EditProjectModel());

