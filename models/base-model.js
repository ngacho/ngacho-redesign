const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));
    
module.exports = class BaseModel{
    constructor(){}


    /**
     * 
     * @returns {Promise with array of objects}
     */
    async getList(url, includeCredentials = false){
        return new Promise((resolve, reject) => {
            fetch(url, {credentials: includeCredentials ? 'include' : 'omit'})
                .then(response => {
                    // Process the response body and status code simultaneously
                    Promise.all([response.json(), response.status])
                        .then(([data, status]) => {
                            if (status === 200) {
                                resolve(data);
                            } else {
                                console.log(err);
                                reject(`Failed with response ${status}`)
                            }
                        }).catch((err) => {
                            console.log(err);
                            reject(`Failed response: ${err}`);
                        });
                }).catch((err) => {
                    console.log(err);
                    reject("Failed to fetch")
            });
        });
    }

    /**
     * 
     * @param {a tag in series} tag 
     * @returns promise of array of objects
     */
    async getListByTag(url, tag){
        return new Promise((resolve, reject) => {
            fetch(`${url}/tags/${encodeURIComponent(tag)}`)
                .then(response => {
                    // Process the response body and status code simultaneously
                    Promise.all([response.json(), response.status])
                        .then(([data, status]) => {
                            if (status === 200) {
                                resolve(data);
                            } else {
                                reject(`Failed with response ${status}`)
                            }
                        }).catch((err) => {
                            reject(`Failed response: ${err}`);
                        });
                }).catch((err) => reject("Failed to fetch"));
        });
    }


    /**
     * 
     * @param {object id} id 
     * @returns promise of single object
     */
    async getListItemById(url, id, includeCredentials = false){
        return new Promise((resolve, reject) => {
            fetch(`${url}/${id}`, {credentials: includeCredentials ? 'include' : 'omit'}).then((response) => {
                Promise.all([response.json(), response.status])
                    .then(([data, status]) => {
                        if (status === 200) {
                            resolve(data);
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        reject("Failed response")
                    });

            }).catch(() => reject("Failed to fetch id"))
        });
    }

    /**
     * 
     * @param {item we want to create} contents 
     * @returns status of item creation
     */
    async createItem(url, contents){
        const payload = {
            doc: contents
        }

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify(payload)
        };

        return new Promise((resolve, reject) => {
            fetch(url, requestOptions).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.text(), response.status])
                    .then(([_, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        console.error(`ERROR LEVEL 2: ${err}`);
                        reject("Failed response");
                    });
            }).catch((err) => {
                console.error(`ERROR LEVEL 1: ${err}`);
                reject("Failed response.")
            });
        });
    }

    /**
     * 
     * @param {file we want to upload} file 
     * @param {any data associated with the file} itemObject 
     * @returns 
     */
    async createFileItem(url, file, itemObject){
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', JSON.stringify(itemObject));


        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        }


        return new Promise((resolve, reject) => {
            fetch(url, requestOptions).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.text(), response.status])
                    .then(([_, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        console.error(`ERROR LEVEL 2: ${err}`);
                        reject("Failed response");
                    });
            }).catch((err) => {
                console.error(`ERROR LEVEL 1: ${err}`);
                reject("Failed response.")
            });
        });

        


    }

    /**
     * 
     * @param {file object we want to update} file 
     * @param {data object for metadata of the file} contents 
     * @returns the status of the update
     */
    async updateFileItemObject(url, file, contents){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', JSON.stringify(contents));


        const requestOptions = {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        }


        return new Promise((resolve, reject) => {
            fetch(`${url}/${contents['id']}`, requestOptions).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.text(), response.status])
                    .then(([_, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        console.error(`ERROR LEVEL 2: ${err}`);
                        reject("Failed response");
                    });
            }).catch((err) => {
                console.error(`ERROR LEVEL 1: ${err}`);
                reject("Failed response.")
            });
        });

    }

    /**
     * 
     * @param {data object of item to be update} contents 
     * @returns status of updated item
     */
    async updateItem(url, contents){
        const payload = {
            doc: contents
        }

        const requestOptions = {
            method: 'PUT',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            credentials: 'include',
            body: JSON.stringify(payload)
        }


        return new Promise((resolve, reject) => {
            fetch(`${url}/${contents['id']}`, requestOptions).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.text(), response.status])
                    .then(([response, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            console.error(`ERROR LEVEL 2: ${response}`);
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        console.error(`ERROR LEVEL 2: ${err}`);
                        reject("Failed response");
                    });
            }).catch((err) => {
                console.error(`ERROR LEVEL 1: ${err}`)
                reject("Failed response.")
            });
        });

    }

    /**
     * used for activating and deactivating items
     * @param {id of item we want to update} id 
     * @returns status of update
     */
    async updateItemStatus(url, id){
        return new Promise((resolve, reject) => {
            fetch(`${url}/set-active/${id}`, {
                method: 'PUT',
                credentials: 'include'
            }).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.json(), response.status])
                    .then(([_, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        reject("Failed response");
                    });
            }).catch((_) => {
                reject("Failed");
            });
        });

    }

    /**
     * 
     * @param {id of item to be deleted} id 
     * @returns 
     */
    async deleteItem(url, id){
        return new Promise((resolve, reject) => {
            fetch(`${url}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                // Process the response body and status code simultaneously
                Promise.all([response.text(), response.status])
                    .then(([data, status]) => {
                        if (status === 200) {
                            resolve("Success");
                        } else {
                            reject(`Failed with response ${status}`)
                        }
                    }).catch((err) => {
                        reject("Failed response");
                    });
            }).catch((_) => {
                reject("Failed to delete text")
            });
        });

    }
}