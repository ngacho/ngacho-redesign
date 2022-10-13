import { db, setDoc, doc, cloudStorage, ref, uploadBytesResumable, getDownloadURL } from '../admin/firebase.js'

export class ProjectBaseModel {

    constructor() { }

    init() {

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
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    var id = ''
                    let letters = 'abcdefghijklmnopqrstuvwxyz';
                    let projectTitle = projectData.projectTitle.split(" ").join("-");
                    for (let i = 0; i < 4; i++) {
                        id += letters[Math.floor(Math.random() * letters.length)];
                    }
                    var docName = `${projectTitle}-${id}`;

                    var projectDataToWriteToDatabase = {
                        projectLanguages: projectData.projectLanguages,
                        projectCoverUrl: url,
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

            });
        });
    }

    /**
     * List all projects.
     */
    getProjects() {

    }

    /**
     * Singular project
     */
    getProject() {

    }

    /**
     * Edit Project
     */
    editProject() {

    }

    /**
     * Delete project.
     */
    deleteProject() {
        // Create a reference to the file to delete
        const blogImage = ref(storage, 'images/desert.jpg');

        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });

    }

}