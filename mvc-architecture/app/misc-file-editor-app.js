import { EditFileController } from "../controller/misc-file-editor-controller.js";
import { EditFileView } from "../view/misc-file-editor-view.js";
import { EditFileModel } from "../model/misc-file-editor-model.js";

const app = new EditFileController(new EditFileView(), new EditFileModel());