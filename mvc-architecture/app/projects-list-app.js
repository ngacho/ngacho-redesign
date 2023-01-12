import { ProjectListView } from "../view/projects-list-view.js";
import { ProjectListController } from "../controller/projects-list-controller.js";
import { ProjectListModel } from "../projects-mvc/project-list-model.js";

const app = new ProjectListController(new ProjectListModel(), new ProjectListView());