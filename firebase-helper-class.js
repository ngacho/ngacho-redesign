/**
 * We're rewriting firebase probably.
 */

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');

const serviceAccount = require('./firebase-creds.json');



initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore();
const cloudStorage = getStorage();


module.exports = class FirebaseHelperClass {

    constructor() {

    }

    testMethod() {
        console.log("hello world");
    }
}