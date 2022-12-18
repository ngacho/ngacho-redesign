import { MiscFileListController } from "../misc-files-list-mvc/misc-file-list-controller.js";
import { MiscFileListModel } from "../misc-files-list-mvc/misc-file-list-model.js";
import { MiscFileListView } from "../misc-files-list-mvc/misc-file-list-view.js";


const app = new MiscFileListController(new MiscFileListView(), new MiscFileListModel());