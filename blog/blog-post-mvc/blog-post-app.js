import { BlogPostView } from "../../blog/blog-post-mvc/blog-post-view.js";
import { BlogPostModel } from "../../blog/blog-post-mvc/blog-post-model.js";
import { BlogPostController } from "../../blog/blog-post-mvc/blog-post-controller.js";

const app = new BlogPostController(new BlogPostModel(), new BlogPostView());