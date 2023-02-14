const MarkDownParser = require('./mark-down-parser')
module.exports = class ServerController {
    constructor(redisClient, firebaseHelperClass) {
        this.firebaseHelper = firebaseHelperClass;
        this.redisClient = redisClient;
        this.markDownParser = new MarkDownParser();
    }


    fetchAllDocs = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;

        
        client.hGet('isCached', `cache-${storageName}`).then((isCached) => {       
            if (isCached && isCached === 'true') {
            
                let results = []
                let items = client.hGetAll(storageName)
                items.then((data) => {
                    Object.keys(data).forEach(function (key) {
                        let file = {...JSON.parse(data[key]), id : key};
                        results.push(file);
                    });
                    res.status(200).send(results);
                }).catch((err) => {
                    res.status(500).send({ error: err });
                });

            }else{
                this.firebaseHelper.getDocsFromFirebaseDatabase(storageName).then((data) => {
                    for (const doc of data) {
                        client.hSet(storageName, doc['id'], JSON.stringify(doc));
                    }
                    client.hSet('isCached', `cache-${storageName}`, 'true');
                    res.status(200).send(data);
                }).catch((err) => {
                    debug(err);
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    })
                });
            }
        }).catch((err) => {
            debug(err);
            res.status(500).send({
                error: 'Failed to get necessary data'
            })
        });

    };


    fetchDocsByTag = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;

        let tag = decodeURIComponent(req.params.tag);
        if (!tag) res.status(400).send({ error: "No tag found in request" })

        client.hGet('isCached', `cache-${storageName}`).then((isCached) => {
            if (isCached === 'true') {
                let results = []
                let items = client.hGetAll(storageName)
                items.then((data) => {
                    Object.keys(data).forEach(function (key) {
                        let file = {...JSON.parse(data[key]), id : key};
                        if(file['tags'].includes(tag)){
                            results.push(file);
                        }
                        
                    });
                    res.status(200).send(results);
                }).catch((err) => {
                    res.status(500).send({ error: err });
                });

            }else{
                this.firebaseHelper.getDocsFromFirebaseDatabase(storageName).then((data) => {
                    let results = []
                    for (const doc of data) {
                        client.hSet(storageName, doc['id'], JSON.stringify(doc));
                        if(doc['tags'].includes(tag)){
                            results.push(file);
                        }
                    }
                    client.hSet('isCached', `cache-${storageName}`, 'true');
                    res.status(200).send(results);
                }).catch((err) => {
                    debug(err);
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    })
                });
            }

        }).catch((err) => {
            debug(err);
            res.status(500).send({
                error: 'Failed to get necessary data'
            })
        });

    };


    fetchDocById = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;

        let id = req.params.id;
        if (!id) res.status(400).send({ error: "No id found in request" })

        let serverSideRendering = req.params.ssr;

        let exists = client.exists(storageName, id);
        exists.then((reply) => {
            if (reply == 1) {
                client.hGet(storageName, id).then((data) => {
                    let blog = {...JSON.parse(data)};
                    if (serverSideRendering) {
                        let html = this.markDownParser.parseMarkdown(blog['text']);
                        blog['html'] = html;
                    }

                    res.status(200).send(blog);
                }).catch((err) => {
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    });
                });
            } else {
                this.firebaseHelper.getSpecificDocFromFirebase(storageName, id).then((data) => {
                    client.hSet(storageName, id, JSON.stringify(data));
                    let blog = {...data};
                    if (serverSideRendering) {
                        let html = this.markDownParser.parseMarkdown(blog['text']);
                        blog['html'] = html;
                    }

                    res.status(200).send(blog);
                }).catch((err) => {
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    });
                })
            }
        }).catch((err) => {
            debug(err);
            res.status(502).send({
                error: 'Failed to get necessary data'
            });
        });

    }

    updateDoc = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;
        let id = req.params.id;
        let updatedObject = req.body.doc;

        this.firebaseHelper.updateDocOnFirebaseDatabase(storageName, updatedObject).then((_) => {
            client.hGet(storageName, id).then((data) => {
                let obj = JSON.parse(data);

                // updating the object with the new one
                let newObj = Object.keys(obj).reduce((accumulator, key) => {
                    return { ...accumulator, [key]: updatedObject[key] ? updatedObject[key] : obj[key] };
                }, {});

                client.hSet(storageName, id, JSON.stringify(newObj));
                res.status(200).send({message : "Successful update"});
            }).catch((err) => {
                debug(err);
                res.status(502).send({
                    error: 'Failed to get necessary data'
                });
            });
        }).catch((err) => {
            debug(err);
            res.status(500).send({ error: err });
        });
        

    }

    deleteDoc = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;
        let id = req.params.id;

        this.firebaseHelper.deleteDocOnFirebaseDatabase(storageName, id).then((_) => {
            let deleteRef = client.hDel(storageName, id);
            deleteRef.then((_) => {
                res.status(200).send(({ message: 'deleted successfully' }));
            }).catch((err) => res.status(500).send({ error: err }))
        }).catch((err) => res.status(500).send({ error: err }));
    }

    deleteFile = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;
        let id = req.params.id;

        client.hGet(storageName, id).then((data) => {
            let file = JSON.parse(data);

            this.firebaseHelper.deleteFileFromStorage(storageName, file).then((_) => {
                let deleteRef = client.hDel(storageName, id);
                deleteRef.then((_) => {
                    res.status(200).send(({ message: 'deleted successfully' }));
                }).catch((err) => res.status(500).send({ error: err }))
            }).catch((err) => res.status(500).send({ error: err }));

        }).catch((err) => {
            debug(err);
            res.status(502).send({
                error: 'Failed to get necessary data'
            });
        });

    }

    setSingleItemToActive = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;
        let id = req.params.id;
        let markDownParser = this.markDownParser;

        var updatedItems = []

        let items = client.hGetAll(storageName)
        items.then((data) => {
            Object.keys(data).forEach(function (key) {
                let oldItem = JSON.parse(data[key])
                let newObject = { ...oldItem, active: false, html : '' };

                if (key === id) {
                    newObject = { ...newObject, active: true , html : markDownParser.parseMarkdown(newObject['text'])}
                }
                updatedItems.push(newObject);

            });
            this.firebaseHelper.updateMultipleDocsInFirebaseDatabase(storageName, updatedItems).then((_) => {
                updatedItems.forEach((doc) => {
                    client.hSet(storageName, doc['id'], JSON.stringify(doc));
                })
                res.status(200).send({ message: 'Item set to active successfully' });
            }).catch((err) => {
                debug(err);
                res.status(500).send({ error: `Error from db: ${err}` });
            });
        }).catch((err) => {
            debug(err);
            res.status(500).send({ error: `Error reading from cache: ${err}` });
        });

    }

    postDoc = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;
        let doc = req.body.doc;

        this.firebaseHelper.postDocToFirebaseDatabase(storageName, doc).then((data) => {
            let doc = data['doc'];

            client.hSet(storageName, doc['id'], JSON.stringify(doc));
            res.status(200).send({ message: 'Posted successfully' });
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    cacheFileInfo(storageName, doc) {
        /**
         * Upload via controller was tricky so it's done in the server now.
         */
        let client = this.redisClient;
        return new Promise((resolve, reject) => {
            try {
                client.hSet(storageName, doc['id'], JSON.stringify(doc));
                resolve({ message: 'Successfully saved' });
            } catch (error) {
                reject({ err: error });
            }
        });
    }

    verifyToken(token){
        return this.firebaseHelper.verifyIdToken(token);
    }
}