export class MiscFileListController{
    constructor(miscFileListView, miscFileListModel){
        this.view = miscFileListView;
        this.model = miscFileListModel;
        this.init();
    }

    init(){
        this.fetchMiscFiles();
        this.view.bindCopyFileUrl(this.handleGetFileById);
        this.view.bindDeleteFile(this.handleDeleteFile);
    }


    fetchMiscFiles(){
        this.model.getMiscFilesFromDb().then((data) => {
            this.view.renderMiscFiles(data);
        }).catch((errMessage) => console.log(errMessage));
    }

    handleGetFileById = async (id) => this.model.getMiscFilesFromDbById(id);
    handleDeleteFile = async (id) => this.model.deleteMiscFileFromDb(id);
}