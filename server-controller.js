const FirebaseHelperClass = require('./firebase-helper');

module.exports = class ServerController {
    constructor(redisClient, firebaseHelperClass) {
        this.firebaseHelper = firebaseHelperClass;
        this.redisClient = redisClient;
        this.isCached = false;
    }


    fetchAllDocs = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;

        if (this.isCached) {
            let results = []
            let items = client.hGetAll(storageName)
            items.then((data) => {
                Object.keys(data).forEach(function (key) {
                    results.push(JSON.parse(data[key]))
                });
                res.status(200).send(results);
            }).catch((err) => {
                res.status(500).send({ error: err });
            });
        } else {
            // replace this with storage name storageName
            this.firebaseHelper.getDocsFromFirebaseDatabase(storageName).then((data) => {
                for (const doc of data) {
                    client.hSet(storageName, doc['id'], JSON.stringify(doc));
                }
                this.isCached = true;
                res.status(200).send(JSON.stringify(data));
            }).catch((err) => {
                console.error(err);
                res.status(502).send({
                    error: 'Failed to get necessary data'
                })
            })
        };
    };


    fetchDocById = async (req, res) => {
        const storageName = req.url.split('/')[2];
        let client = this.redisClient;

        let id = req.params.id;
        if(!id) res.status(400).send({error : "No id found in request"})

        let exists = client.exists(id);
        exists.then((reply) => {
            if (reply == 1) {
                client.hGet(storageName, id).then((data) => {
                    res.status(200).send(JSON.parse(data));
                }).catch((err) => {
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    });
                })
            } else {
                firebaseHelper.getSpecificDocFromFirebase(storageName, id).then((data) => {
                    client.hSet(storageName, data['id'], JSON.stringify(data));
                    res.status(200).send(JSON.parse(data));
                }).catch((err) => {
                    console.error(err);
                    res.status(502).send({
                        error: 'Failed to get necessary data'
                    });
                })
            }
        }).catch((err) => {
            console.error(err);
            res.status(502).send({
                error: 'Failed to get necessary data'
            });
        });

    }
}