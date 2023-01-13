import { BlogPostView } from "./view/blog/blog-post-view.js";
import { BlogPostModel } from "./model/blog-post-model.js";
import { BlogPostController } from "./controller/blog-post-controller.js";

const app = new BlogPostController(new BlogPostModel(), new BlogPostView());