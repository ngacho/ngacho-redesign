import { EditBlogController } from "../../blog-editor/edit-blog-mvc/edit-blog-controller.js";
import { EditBlogModel } from "../../blog-editor/edit-blog-mvc/edit-blog-model.js";
import { EditBlogView } from "../../blog-editor/edit-blog-mvc/edit-blog-view.js";

const app = new EditBlogController(new EditBlogModel(), new EditBlogView());