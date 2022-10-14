

export class ViewProjectController{
 
    constructor(viewProjectModel, viewProjectView){
        this.model = viewProjectModel;
        this.view = viewProjectView;
        this.init();
    }

    init(){
        // Display initial projects
        this.model.fetchProjects().then((projects) => {
            this.onProjectListChanged(projects);
        });
        
    }

    onProjectListChanged = (projects) => {
        this.view.displayProjects(projects);
    }
}