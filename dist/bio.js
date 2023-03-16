/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/controller/about-me-controller.js":
/*!***********************************************!*\
  !*** ./app/controller/about-me-controller.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutMeController": () => (/* binding */ AboutMeController)
/* harmony export */ });

class AboutMeController{
    constructor(aboutMeModel, aboutMeView){
        this.model = aboutMeModel;
        this.view = aboutMeView;

        this.init();
    }

    init(){
        this.model.fetchActiveBio().then((bioData) => {
            this.onBioChanged(bioData);
        }).catch((err) => {
            console.error(err);
        })
    }

    onBioChanged = (bio) => {
        this.view.displayBio(bio);
    }
}

/***/ }),

/***/ "./app/model/about-me-model.js":
/*!*************************************!*\
  !*** ./app/model/about-me-model.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutMeModel": () => (/* binding */ AboutMeModel)
/* harmony export */ });
/* harmony import */ var _base_models_bio_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-models/bio-model.js */ "./app/model/base-models/bio-model.js");


class AboutMeModel extends _base_models_bio_model_js__WEBPACK_IMPORTED_MODULE_0__.BioModel {
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

/***/ }),

/***/ "./app/model/base-models/base-model.js":
/*!*********************************************!*\
  !*** ./app/model/base-models/base-model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BaseModel": () => (/* binding */ BaseModel)
/* harmony export */ });
class BaseModel{
    constructor(baseUrl){
        this.baseUrl = baseUrl;

    }


    /**
     * 
     * @returns {Promise with array of objects}
     */
    async getList(){
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl, {credentials: 'include'})
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
    async getListByTag(tag){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/tags/${encodeURIComponent(tag)}`)
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
    async getListItemById(id, serverSideRendering){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/${id}/${serverSideRendering}`, {credentials: 'include'}).then((response) => {
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
    async createItem(contents){
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
            fetch(this.baseUrl, requestOptions).then(response => {
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
    async createFileItem(file, itemObject){
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', JSON.stringify(itemObject));


        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        }


        return new Promise((resolve, reject) => {
            fetch(this.baseUrl, requestOptions).then(response => {
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
    async updateFileItemObject(file, contents){
        const formData = new FormData();
        formData.append('file', file);
        formData.append('doc', JSON.stringify(contents));


        const requestOptions = {
            method: 'PUT',
            body: formData,
            credentials: 'include'
        }


        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/${contents['id']}`, requestOptions).then(response => {
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
    async updateItem(contents){
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
            fetch(`${this.baseUrl}/${contents['id']}`, requestOptions).then(response => {
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
    async updateItemStatus(id){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/set-active/${id}`, {
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
    async deleteItem(id){
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/${id}`, {
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

/***/ }),

/***/ "./app/model/base-models/bio-model.js":
/*!********************************************!*\
  !*** ./app/model/base-models/bio-model.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BioModel": () => (/* binding */ BioModel)
/* harmony export */ });
/* harmony import */ var _base_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.js */ "./app/model/base-models/base-model.js");


class BioModel{
    constructor(){
        this.baseModel = new _base_model_js__WEBPACK_IMPORTED_MODULE_0__.BaseModel("https://api.ngacho.com/database/bios");
        
    }


    async fetchBios(){
        return this.baseModel.getList();
    }

    async fetchBioById(id){
        return this.baseModel.getListItemById(id);
    }

    async purgeBio(bioId){
        return this.baseModel.deleteItem(bioId);
    }

    async updateBioStatus(bioId) {
        return this.baseModel.updateItemStatus(bioId);
    }

    async updateBioWithFile(file, bioObject){
        return this.baseModel.updateFileItemObject(file, bioObject);
    }

    async updateBio(bioObject){
        return this.baseModel.updateItem(bioObject);
    }

    async publishBio(file, bioObject){
        return this.baseModel.createFileItem(file, bioObject);
    }




}

/***/ }),

/***/ "./app/view/bio/about-me-view.js":
/*!***************************************!*\
  !*** ./app/view/bio/about-me-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutMeView": () => (/* binding */ AboutMeView)
/* harmony export */ });
class AboutMeView{
    constructor(){

        // <div class="descript-wrapper">
        this.bioWrapper = document.querySelector('.descript-wrapper');
        
    }
 
    displayBio(bio){

        // create image tag
        const profilePhoto = document.createElement('img');
        profilePhoto.className = 'profile-photo animate-entry';
        profilePhoto.src = bio["publicUrl"];

        // create descript div
        const descript = document.createElement('div');
        descript.className = 'descript';

        // create a p tag with text node
        const description = document.createElement('p');
        // create text node
        const descriptionText = document.createTextNode(bio["text"]);
        description.appendChild(descriptionText);
        descript.appendChild(description);

        // add this to the wrapper
        this.bioWrapper.appendChild(profilePhoto);
        this.bioWrapper.appendChild(descript);

        
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./app/about-me-app.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_about_me_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/about-me-controller.js */ "./app/controller/about-me-controller.js");
/* harmony import */ var _model_about_me_model_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/about-me-model.js */ "./app/model/about-me-model.js");
/* harmony import */ var _view_bio_about_me_view_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/bio/about-me-view.js */ "./app/view/bio/about-me-view.js");





const app = new _controller_about_me_controller_js__WEBPACK_IMPORTED_MODULE_0__.AboutMeController(new _model_about_me_model_js__WEBPACK_IMPORTED_MODULE_1__.AboutMeModel(), new _view_bio_about_me_view_js__WEBPACK_IMPORTED_MODULE_2__.AboutMeView());
})();

/******/ })()
;
//# sourceMappingURL=bio.js.map