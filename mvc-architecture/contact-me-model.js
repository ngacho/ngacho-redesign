export class ContactMeModel {

    constructor(){}

    async fetchContactMeList() {
        return new Promise((resolve, reject)=>{
            fetch('http://localhost:3030/database/contact-me-texts')
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                })
                .catch((err)=>{
                    reject(err);
                    
                });

        });
    }
}