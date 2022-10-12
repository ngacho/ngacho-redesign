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
            uploadBytesResumable(imageRef, projectData.projectCoverImage)
                .then((snapshot) => {
                    console.log('Uploaded', snapshot.totalBytes, 'bytes.');
                    // Let's get a download URL for the file.
                    getDownloadURL(snapshot.ref).then((url) => {

                        var id = ''
                        let letters = 'abcdefghijklmnopqrstuvwxyz';
                        let projectTitle = projectData.projectTitle.split(" ").join("-");
                        for (let i = 0; i < 4; i++) {
                            id += letters[Math.floor(Math.random() * letters.length)];
                        }
                        var docName = `${projectTitle}-${id}`;

                        var projectDataToWriteToDatabase = {
                            projectLanguages: projectData.projectLanguages,
                            projectCoverUrl: url
                        }

                        setDoc(doc(db, "projects", docName), projectDataToWriteToDatabase).then((_) => {
                            resolve("Successfully uploaded project")
                        }).catch((err) => {
                            reject("Failed to write to database");
                        });
                    }).catch((err) => {
                        reject("Failed to fetch url")
                        console.error('writing to fetch url', err);
                    });
                }).catch((error) => {
                    console.error('Upload failed', error);
                    reject("Failed to upload Image")
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

    }

}