import { MiscFileListController } from "./controller/misc-file-list-controller.js";
import { MiscFileListModel } from "./model/misc-file-list-model.js";
import { MiscFileListView } from "./view/admin/misc-files/misc-file-list-view.js";


const app = new MiscFileListController(new MiscFileListView(), new MiscFileListModel());