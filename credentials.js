require("dotenv").config({ path: __dirname + '/.env' });

const firebaseConfig = {
    "apiKey": process.env.apiKey,
    "authDomain": process.env.authDomain,
    "projectId": process.env.project_id,
    "storageBucket": process.env.storageBucket,
    "messagingSenderId": process.env.messagingSenderId,
    "appId": process.env.appId,
    "measurementId": process.env.measurementId

}


module.exports = Object.freeze({
    firebaseConfig: firebaseConfig
})
