

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
        for(const project of projects){
            console.log(project);
        }
        // this.view.displayBlogs(projects);
    }
}