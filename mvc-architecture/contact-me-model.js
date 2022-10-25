import { db, doc, collection, getDoc, setDoc, deleteDoc, query, onSnapshot } from '../admin/firebase.js'

export class ContactMeModel {

    constructor() {

    }


    async postContactMeText(contactMeContents) {
        // if it has a blog Id, then it's not a new blog then reject promise.
        return new Promise((resolve, reject) => {
            const docName = `${contactMeContents.title}`
            setDoc(doc(db, "contact-me-texts", docName), contactMeContents).then((ref) => {
                resolve('Contact Me Published Successfully')
            }).catch((err) => {
                reject(err)
            })
        });
    }

    async getContactMeText(){
        return new Promise((resolve, reject)=>{
            const docRef = doc(db, "contact-me-texts");
            getDoc(docRef).then((ref)=>{
                console.log(ref);
                resolve(true);
            }).catch((err)=>{
                console.error(err)
                reject(err);
            });
        })


    }

    





}