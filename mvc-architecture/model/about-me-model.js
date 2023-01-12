import { BioModel } from "../../mvc-architecture/bio-model.js";

export class AboutMeModel extends BioModel {
    constructor() {
        super();   
    }


    async fetchActiveBio(){
        let bioList = await this.baseModel.getList();
        return new Promise((resolve, reject) => {
            let activeBio = bioList.filter(bio => bio.active === true);
            if(activeBio.length > 0){
                resolve(activeBio[0]);
            }else{
                reject("No active bio found");
            }
        });
    }
}