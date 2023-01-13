

export class ProjectListController{
 
    constructor(viewProjectModel, viewProjectView){
        this.model = viewProjectModel;
        this.view = viewProjectView;
        this.init();
    }

    init(){
        // Display initial projects
        this.model.getProjects().then((projects) => {
            this.onProjectListChanged(projects);
        }).catch((err)=>{
            console.error("error " + err);
        });
        
    }

    onProjectListChanged = (projects) => {
        this.view.displayProjects(projects);
    }
}