/**
 * We're rewriting firebase probably.
 */

// https://www.bezkoder.com/google-cloud-storage-nodejs-upload-file/
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');

const { getFirestore } = require('firebase-admin/firestore');

const { getStorage } = require('firebase-admin/storage');



const serviceAccount = require('./firebase-creds.json');


module.exports = class FirebaseHelperClass {

    constructor() {
        initializeApp({
            credential: cert(serviceAccount),
            storageBucket: 'ngacho-blog.appspot.com'
        });

        this.db = getFirestore();
        this.bucket = getStorage().bucket();

    }

    /**
     * 
     * Return a bunch of docs from firebase's specified collection.
     * 
     * @param {Name of database we want} database_name 
     * @returns 
     */
    async getDocsFromFirebaseDatabase(database_name) {
        const files = []
        const fileRef = this.db.collection(database_name);
        return new Promise((resolve, reject) => {
            fileRef.get().then((snapshot) => {
                snapshot.forEach(doc => {
                    let item = { ...doc.data(), id: doc.id };
                    files.push(item);
                });
                resolve(files);
            }).catch((err) => {
                reject(err);
            });
        });
    }


    /**
     * Posts a doc to a specified firebase collection
     * 
     * @param {Name of database we want} database_name 
     * @ param {Document we posting} docObject
     */
    async postDocToFirebaseDatabase(database_name, docObject) {
        const fileRef = this.db.collection(database_name);
        const docName = this.getFileId(docObject);

        return new Promise((resolve, reject) => {
            fileRef.doc(docName).set(docObject).then((_) => {
                resolve({ doc: { ...docObject, id: docName }, message: "Successfully added to firestore" })
            }).catch((err) => {
                reject(err);
            })

        });

    }


    /**
     * 
     * @param {databse in which the doc is found} database_name 
     * @param {document we are updating} updatedDoc 
     */
    async updateDocOnFirebaseDatabase(database_name, updatedDoc) {
        const docName = this.getFileId(docObject);
        const doc = { ...updatedDoc }
        delete doc.id;
        const fileRef = this.db.collection(database_name).doc(docName);

        const updateRef = await fileRef.update(updatedDoc);

        return new Promise((resolve, reject) => {
            updateRef.then((_) => {
                resolve("Successfully updated database")
            }).catch((err) => {
                reject(err)
            })

        })

    }

    /**
     * 
     * @param {name of database we're updating} database_name 
     * @param {a list of docs containing the updated information} updatedDocs 
     */
    async updateMultipleDocsInFirebaseDatabase(database_name, updatedDocs) {
        const batch = db.batch();
        updatedDocs.forEach((doc) => {
            let key = this.getFileId(doc);

            let updatedDoc = { ...doc }
            delete updatedDoc.id;

            const updatedRef = db.collection(database_name).doc(key);
            batch.update(updatedRef, updatedDoc);
        });

        return new Promise((resolve, reject) => {
            batch.commit().then(() => resolve(("Batch updated successfully"))).catch((err) => {
                
                reject(err);
            })
        });
    }


    /**
     * 
     * @param {database where we are updating} database_name 
     * @param {document we're updating} id 
     */
    async deleteDocOnFirebaseDatabase(database_name, id) {
        const docName = id;
        const fileRef = this.db.collection(database_name).doc(docName);

        return new Promise((resolve, reject) => {
            fileRef.delete().then((_) => {
                resolve("Successfully deleted doc");
            }).catch((err) => {
                reject(err);
            })
        })

    }


    /**
     * 
     * @param {database name where doc is} database_name 
     * @param {id of the doc we're updating} id 
     */
    async getSpecificDocFromFirebase(database_name, id) {

        const docName = id;
        const fileRef = this.db.collection(database_name).doc(docName);

        return new Promise((resolve, reject)=>{
            fileRef.get().then((doc) => {
                if (!doc.exists) {
                    reject("No such document exists")
                } else {
                    resolve(doc.data());
                }
            }).catch((err) => {
                reject(err);
            });
        })

        

    }

    /**
     * Post a file(image, document etc) to FirebaseStorage
     * 
     * @param {Storage to which we post firebase} storage_name 
     */
    async postFileToStorage(file, fileDataObject) {
        return new Promise((resolve, reject) => {
            if (!file) {
                reject('No image file');
            }


            let fileUpload = this.bucket.file(`${fileDataObject.storageDest}/${file.originalname}`);

            const blobStream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                },
                resumable: false,
            });

            blobStream.on('error', (error) => {
                reject(error);
            });

            const self = this;

            blobStream.on('finish', (_) => {
                fileUpload.makePublic().then((_) => {
                    const publicUrl = fileUpload.publicUrl();
                    let docObject = { ...fileDataObject }
                    docObject['publicUrl'] = publicUrl
                    docObject['fileName'] = file.originalname

                    self.postDocToFirebaseDatabase(fileDataObject.storageDest, docObject).then((_) => {
                        resolve("Successfully uploaded Image");
                    }).catch((err) => {
                        reject(err);
                    })
                }).catch((err) => {
                    reject(err)
                });
            });

            blobStream.end(file.buffer);
        });

    }


    /**
     * Delete a file (image, document etc) from firebase.
     * 
     * @param {storage to which our file is} storage_name 
     * @param { id of the file we're deleting} id 
     */
    async deleteFileFromStorage(fileObject) {

        return new Promise((resolve, reject) => {
            let fileToBeDeleted = this.bucket.file(`${fileObject.storageDest}/${file.fileName}`);
            let fileId = this.getFileId(fileObject);

            const self = this;

            fileToBeDeleted.delete().then(() => {

                self.deleteDocOnFirebaseDatabase(fileObject.storageDest, fileId).then(() => {
                    resolve("Successfully deleted the file from storage");
                }).catch((err) => {
                    reject(err);
                })
            }).catch((err) => {
                reject(err);
            });

        });

    }



    getFileId(fileObject) {
        if (fileObject.id) {
            return fileObject.id;
        } else {
            var id = ''
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            // generate project id.
            let fileTitle = fileObject.title.split(" ").join("-");
            for (let i = 0; i < 4; i++) {
                id += letters[Math.floor(Math.random() * letters.length)];
            }
            const fileId = `${fileTitle}-${id}`;

            return fileId;
        }

    }


}