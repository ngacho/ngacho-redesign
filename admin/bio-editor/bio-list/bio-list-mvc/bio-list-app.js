import { BioListController } from "../../bio-list/bio-list-mvc/bio-list-controller.js";
import { BioListModel } from "../../bio-list/bio-list-mvc/bio-list-model.js";
import { BioListView } from "../../bio-list/bio-list-mvc/bio-list-view.js";

const app = new BioListController(new BioListView(), new BioListModel());