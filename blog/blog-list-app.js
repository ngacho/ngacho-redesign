import { BlogListModel } from "../blog/blog-list-model.js";
import { BlogListView } from "../blog/blog-list-view.js";
import { BlogListController } from "../blog/blog-list-controller.js";

const app = new BlogListController(new BlogListModel(), new BlogListView());