import { BioListController } from "../controller/bio-list-controller.js";
import { BioListModel } from "./bio-list-model.js.js";
import { BioListView } from "./bio-list-view.js.js";

const app = new BioListController(new BioListView(), new BioListModel());