import { EditBlogController } from "./controller/edit-blog-controller.js";
import { EditBlogModel } from "./model/edit-blog-model.js";
import { EditBlogView } from "./view/blog/admin/edit-blog-view.js";

const app = new EditBlogController(new EditBlogModel(), new EditBlogView());