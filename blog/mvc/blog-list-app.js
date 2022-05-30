import { BlogListModel } from "../mvc/blog/blog-list-model.js";
import { BlogListView } from "../mvc/blog/blog-list-view.js";
import { BlogListController } from "../mvc/blog/blog-list-controller.js";

const app = new BlogListController(new BlogListModel(), new BlogListView());