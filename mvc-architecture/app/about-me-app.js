import { AboutMeController } from "../controller/about-me-controller.js";
import { AboutMeModel } from "../model/about-me-model.js";
import { AboutMeView } from "../view/about-me-view.js";


const app = new AboutMeController(new AboutMeModel(), new AboutMeView());