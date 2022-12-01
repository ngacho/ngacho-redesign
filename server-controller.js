const FirebaseHelperClass = require('./firebase-helper');

module.exports = class ServerController {
    constructor(redisClient, firebaseHelperClass) {
        this.firebaseHelper = firebaseHelperClass;
        this.redisClient = redisClient;
        this.isCached = false;
    }


    fetchAllDocs = async (req, res) => {
        const hashKey = req.url.split('/')[2];
        let client = this.redisClient;

        if(this.isCached){
            let results = []
            let items = client.hGetAll(hashKey)
            items.then((data)=>{
                Object.keys(data).forEach(function(key) {
                    results.push(JSON.parse(data[key]))
                });
                res.status(200).send(results);
            }).catch((err)=>{
                res.status(500).send({error : err});
            });
        }else{
            this.firebaseHelper.getDocsFromFirebaseDatabase(req.storageName).then((data) => {
                for(const doc of data){
                    client.hSet(hashKey, doc['id'], JSON.stringify(doc));
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
}