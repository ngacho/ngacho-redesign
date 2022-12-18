import { EditFileController } from "../misc-files-editor-mvc/misc-file-editor-controller.js";
import { EditFileView } from "../misc-files-editor-mvc/misc-file-editor-view.js";
import { EditFileModel } from "../misc-files-editor-mvc/misc-file-editor-model.js";

const app = new EditFileController(new EditFileView(), new EditFileModel());