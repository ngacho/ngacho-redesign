import { BlogListModel } from "../model/blog-list-model.js";
import { BlogListView } from "../view/blog-list-view.js";
import { BlogListController } from "../controller/blog-list-controller.js";

const app = new BlogListController(new BlogListModel(), new BlogListView());