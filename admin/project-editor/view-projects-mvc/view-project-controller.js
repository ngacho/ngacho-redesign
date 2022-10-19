

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

        this.view.bindDeleteProject(this.handleDeleteProject);
        this.view.bindEditProject(this.handleEditProject);
        
    }

    onProjectListChanged = (projects) => {
        this.view.displayProjects(projects);
    }

    handleDeleteProject = async (projectData) => this.model.deleteProjectFromDB(projectData);

    handleEditProject = async (projectData) => this.model.editProject(projectData);
}