import { db, doc, collection, writeBatch, getDoc, setDoc, deleteDoc, query, onSnapshot } from '../admin/firebase.js'

export class ContactMeModel {

    constructor() {
        this.contactMeItems = new Map();
        this.valuesWritten = this.Bool(false);

        this.init();
    }

    init() {

        this.fetchListFromStorage().then(_ => _).catch((err) => console.error(err));

    }


    async postContactMeText(contactMeContents) {
        // if it has a blog Id, then it's not a new blog then reject promise.
        return new Promise((resolve, reject) => {
            const docName = this.getContactMeId(contactMeContents)
            setDoc(doc(db, "contact-me-texts", docName), contactMeContents).then((ref) => {
                resolve('Contact Me Published Successfully')
            }).catch((err) => {
                console.error(`Contact Me Model ${err}`);
                reject("Publishing failed");
            })
        });
    }


    async fetchContactMeList() {
        return new Promise((resolve, reject) => {
            this.valuesWritten.addListener((bool) => {
                if (bool) {
                    resolve(this.returnItemsWithIds());
                } else {
                    this.fetchContactMeList().then((list) => {
                        resolve(this.returnItemsWithIds())
                    }).catch((error) => {
                        console.error(error);
                        reject("No values")
                    });

                }

            });
        });

    }

    returnItemsWithIds() {
        const values = []
        this.contactMeItems.forEach((value, key) => {
            let item = { ...JSON.parse(value), id: key };
            values.push(item);
        });
        return values;
    }

    async fetchListFromStorage() {
        return new Promise((resolve, reject) => {
            let q = query(collection(db, "contact-me-texts"));
            const contactMeSnapshots = onSnapshot(q, (querySnapshot) => {
                querySnapshot.forEach((data) => {
                    this.contactMeItems.set(data.id, JSON.stringify(data.data()));
                });

                this.valuesWritten(true);
                resolve(true);
            }, (error)=>{
               
                reject(error)
            });
        })
    }


    async updateContactMeStatus(id) {
        // Get a new write batch
        const batch = writeBatch(db);

        this.contactMeItems.forEach((value, key) => {
            const updateRef = doc(db, "contact-me-texts", key);
            if (key == id) {
                batch.set(updateRef, {...value, 'active': true });
            }

            batch.set(updateRef, { 'active': false });
        })

        

        return new Promise((resolve, reject) => {
            batch.commit().then((msg) => {
                console.log(msg)
                resolve("Update Successful");
            }).catch((err) => {
                console.error(err)
                reject("UpdateContactMe: Update Failed")
            })
        });
    }

    async deleteContactMeText(contactMeId) {

        return new Promise((resolve, reject) => {
            if (this.contactMeItems.has(contactMeId)) {
                const deleteRef = async (id) => {
                    await deleteDoc(doc(db, "contact-me-texts", id));
                }
    
                deleteRef(contactMeId).then((_) => {
                    resolve(true)
                }).catch((err) => {
                    console.log(err);
                    reject(false);
                });
    
            } else {
                reject("Key not in maps");
            }

        });
    }


    getContactMeId(contactMeObject) {
        if (contactMeObject.projectId) {
            return contactMeObject.id;
        } else {
            var id = ''
            let letters = 'abcdefghijklmnopqrstuvwxyz';
            // generate project id.
            let projectTitle = contactMeObject.title.split(" ").join("-");
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