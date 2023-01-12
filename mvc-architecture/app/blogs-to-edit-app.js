import { BlogsToEditController } from "../../blog-editor/blogs-to-edit-mvc/blogs-to-edit-controller.js";
import { BlogsToEditView } from "../../blog-editor/blogs-to-edit-mvc/blogs-to-edit-view.js";
import { BlogsToEditModel } from "../../blog-editor/blogs-to-edit-mvc/blogs-to-edit-model.js";

const app = new BlogsToEditController(new BlogsToEditModel(), new BlogsToEditView());