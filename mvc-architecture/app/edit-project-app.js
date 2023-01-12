import { EditProjectController } from '../edit-project-mvc/edit-project-controller.js';
import { EditProjectView } from '../edit-project-mvc/edit-project-view.js';
import { EditProjectModel } from '../edit-project-mvc/edit-project-model.js';

const app = new EditProjectController(new EditProjectView(), new EditProjectModel());

