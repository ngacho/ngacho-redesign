import { AboutMeController } from "../../about-me/about-me-mvc/about-me-controller.js";
import { AboutMeModel } from "../../about-me/about-me-mvc/about-me-model.js";
import { AboutMeView } from "../../about-me/about-me-mvc/about-me-view.js";


const app = new AboutMeController(new AboutMeModel(), new AboutMeView());