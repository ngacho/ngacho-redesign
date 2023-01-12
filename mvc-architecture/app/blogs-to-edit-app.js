import { BlogsToEditController } from "../controller/blogs-to-edit-controller.js";
import { BlogsToEditView } from "../view/blogs-to-edit-view.js";
import { BlogsToEditModel } from "../model/blogs-to-edit-model.js";

const app = new BlogsToEditController(new BlogsToEditModel(), new BlogsToEditView());