import { BlogListModel } from "../../blog/mvc/blog-list-model.js";
import { BlogListView } from "../../blog/mvc/blog-list-view.js";
import { BlogListController } from "../../blog/mvc/blog-list-controller.js";

const app = new BlogListController(new BlogListModel(), new BlogListView());