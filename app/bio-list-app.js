import { BioListController } from "./controller/bio-list-controller.js";
import { BioListModel } from "./model/bio-list-model.js";
import { BioListView } from "./view/bio/admin/bio-list-view.js";

const app = new BioListController(new BioListView(), new BioListModel());