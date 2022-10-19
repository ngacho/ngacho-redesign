import { db, setDoc, deleteObject, deleteDoc, query, collection, onSnapshot, doc, cloudStorage, ref, uploadBytesResumable, getDownloadURL } from '../admin/firebase.js'

export class ProjectBaseModel {

    constructor() { 
        this.projectKeys = [];
        this.writtenToStorage = this.Bool(false);
        this.init();
    }

    init() {
        const q = query(collection(db, "projects"));
        const projectSnapshots = onSnapshot(q, (querySnapshot) => {   
            querySnapshot.forEach((project_data) => {
                let project = project_data.data();
                let projectId = project_data.id;
                this.projectKeys.push(projectId);
                let newProject = {...project, projectId:projectId}
                window.sessionStorage.setItem(projectId, JSON.stringify(newProject))
            });

            if(this.projectKeys.length > 0) this.writtenToStorage(true);

            // this.blogList = blogs;
        });
    }

    /**
     * Post all projects.
     */
    async postProjectToDB(projectData) {
        return new Promise((resolve, reject) => {
            const imageRef = ref(cloudStorage, 'project-cover-images/' + projectData.projectCoverImage.name);
            const uploadTask = uploadBytesResumable(imageRef, projectData.projectCoverImage);

            uploadTask.on('state_changed', (snapshot)=>{
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress.toFixed(2) + '% done');
                switch (snapshot.state) {
                    case 'paused':
                      console.error('Upload is paused');
                      break;
                    case 'canceled':
                        console.error('Upload is cancelled');
                        break;
                }
            }, (error)=>{
                console.error("uploading task error" + error);
                reject("Error in uploading task");
            }, ()=>{
                this.writeProjectToDatabase(uploadTask.snapshot.ref, projectData).then((message)=>{
                    resolve(message)
                }).catch((err)=>{
                    reject(err)
                });
            });
        });
    }

    async writeProjectToDatabase(snapshotRef, projectData){
        return new Promise((resolve, reject)=>{
            getDownloadURL(snapshotRef).then((url) => {

                var docName = this.getProjectId(projectData);

                var projectDataToWriteToDatabase = {
                    projectLanguages: projectData.projectLanguages,
                    projectCoverUrl: url,
                    projectCoverTitle: projectData.projectCoverImage.name,
                    projectInfoUrl : projectData.projectExtraInfoUrl
                }

                setDoc(doc(db, "projects", docName), projectDataToWriteToDatabase).then((_) => {
                    resolve("Successfully uploaded project")
                }).catch((err) => {
                    console.error("Failed to write to db", err);
                    reject("Failed to write to database");
                });
            }).catch((err) => {
                console.error('writing to fetch url', err);
                reject("Failed to fetch url");
            });

        })

    }

    /**
     * List all projects.
     */
    getProjects() {
        // Find all the prefixes and items.
        return new Promise((resolve, reject) => {
            this.writtenToStorage.addListener((writtenToStorageBool)=>{
                if(this.writtenToStorage){
                    var projects = [];
                    for(const projectKey of this.projectKeys ){
                        var project = JSON.parse(sessionStorage.getItem(projectKey));
                        projects.push(project);
                    }
                    resolve(projects);
                }else{
                    console.log("Nothing written to storage.")
                    reject("Nothing was written to storage");
                }

            });
        });
    }

    /**
     * Singular project
     */
    getProject(projectId) {
        return new Promise((resolve, reject)=>{
            const projectData = JSON.parse(window.sessionStorage.getItem(projectId));

            if(projectData){
                resolve(projectData)
            }else{
                reject({error : "Not found"})
            }

        })
    }

    /**
     * Edit Project
     */
    editProject(projectData) {
        return new Promise((resolve, reject) => {
            console.log(JSON.stringify(projectData.projectCoverUrl));
            const imageRef = ref(cloudStorage, projectData.projectCoverUrl);
            // Delete the image
            deleteObject(imageRef).then(() => {
                // upload the new image.
                this.postProjectToDB(projectData).then((_)=>{
                    resolve("Edited Project Successfully");
                }).catch((err)=>{
                    console.error(err)
                    resolve("Project editing unsucessful. Please try again");
                });

            }).catch((err)=> {
                console.error(err)
                resolve("Project editing unsucessful. Please try again");
            })

        });

    }

    /**
     * Delete project.
     */
    deleteProject(projectData) {
        return new Promise((resolve, reject)=>{
            console.log(projectData.projectUrl)
            const imageRef = ref(cloudStorage, projectData.projectCoverUrl);
            // Delete the image
            deleteObject(imageRef).then(() => {
                // File deleted successfully
                const projectRef = async (id) => {
                    await deleteDoc(doc(db, "projects", id));
                }

                projectRef(projectData.projectId).then((ref) => {
                    window.sessionStorage.removeItem(projectData.projectId);
                    resolve(true)
                }).catch((err) => {
                    console.log(err);
                    reject(false);
                });
            }).catch((error) => {
                // Uh-oh, an error occurred!
                console.error("failed to delete project image", error);
                reject(false);
            });

        })
        

    }

    getProjectId(projectData){
        if(projectData.projectId){
            return projectId;
        }else{
            var id = ''
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            // generate project id.
            let projectTitle = projectData.projectTitle.split(" ").join("-");
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            var docName = `${projectTitle}-${id}`;

            return docName;
        }        

    }

    // listen booleans
    Bool(initialValue) {
        var bool = !!initialValue;
        var listeners = [];
        var returnVal = function (value) {
            if (arguments.length) {
                var oldValue = bool;
                bool = !!value;
                listeners.forEach(function (listener, i, list) {
                    listener.call(returnVal, { oldValue: oldValue, newValue: bool });
                });
            }
            return bool
        };
        returnVal.addListener = function (fn) {
            if (typeof fn == "function") {
                listeners.push(fn);
            }
            else {
                throw "Not a function!";
            }
        };
        return returnVal;
    }

}