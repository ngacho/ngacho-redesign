import { ProjectListView } from "../projects-mvc/projects-list-view.js";
import { ProjectListController } from "../projects-mvc/projects-list-controller.js";
import { ProjectListModel } from "../projects-mvc/project-list-model.js";

const app = new ProjectListController(new ProjectListModel(), new ProjectListView());