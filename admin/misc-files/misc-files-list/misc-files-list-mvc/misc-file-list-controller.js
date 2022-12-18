export class MiscFileListController{
    constructor(miscFileListView, miscFileListModel){
        this.view = miscFileListView;
        this.model = miscFileListModel;
        this.init();
    }

    init(){
        this.fetchMiscFiles();
        this.view.bindCopyFileUrl(this.handleGetNewFileId);
        this.view.bindDeleteFile(this.handleDeleteFile);
    }


    fetchMiscFiles(){
        this.model.getMiscFilesFromDb().then((data) => {
            this.view.renderMiscFiles(data);
        }).catch((errMessage) => console.log(errMessage));
    }

    fetchMiscFileById(id){
        this.model.getMiscFilesFromDbById(id).then((data) => {
            // this.view.renderMiscFileList(data);
        }).catch((errMessage) => console.log(errMessage));
    }

    handleGetNewFileId = async (id) => this.model.getMiscFilesFromDbById(id);
    handleDeleteFile = async (id) => this.model.deleteMiscFileFromDb(id);
}