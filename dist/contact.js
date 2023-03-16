/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/controller/view-contact-me-controller.js":
/*!******************************************************!*\
  !*** ./app/controller/view-contact-me-controller.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewContactMeController": () => (/* binding */ ViewContactMeController)
/* harmony export */ });
class ViewContactMeController{

    constructor(model, view){
        this.model = model;
        this.view = view;

        this.init()
    }

    init() {
     
        this.fetchContactMeText();
    }


    fetchContactMeText() {

        this.model.fetchContactMeFromDb().then((contactMe) =>{
            this.view.setUpContactMe(contactMe);
        }).catch((errMessage)=>{
            console.error(errMessage);
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

/***/ "./app/model/base-models/contact-me-model.js":
/*!***************************************************!*\
  !*** ./app/model/base-models/contact-me-model.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ContactMeModel": () => (/* binding */ ContactMeModel)
/* harmony export */ });
/* harmony import */ var _base_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.js */ "./app/model/base-models/base-model.js");


class ContactMeModel {

    constructor() {
        this.baseModel = new _base_model_js__WEBPACK_IMPORTED_MODULE_0__.BaseModel('https://api.ngacho.com/database/contact-me-texts');
    }

    async fetchContactMeList() {
        return this.baseModel.getList();
    }

    async fetchActiveContactMe() {
        let contactMeList = await this.baseModel.getList();
        return new Promise((resolve, reject) => {
            let activeContactMeList = contactMeList.filter(contactMe => contactMe.active === true);
            if (activeContactMeList.length > 0) {
                resolve(activeContactMeList[0]);
            } else {
                reject("No active contact me found");
            }
        });

    }

    async fetchContactMe(contactMeId, serverSideRendering = false) {
        return this.baseModel.getListItemById(contactMeId, serverSideRendering);
    }


    async updateContactMeStatus(contactMeId) {
        return this.baseModel.updateItemStatus(contactMeId);
    }

    async deleteContactMeText(contactMeId) {
        return this.baseModel.deleteItem(contactMeId);
    }


    async updateContactMeText(contactMeContents){
        return this.baseModel.updateItem(contactMeContents);
    }



    async postContactMeText(contactMeContents) {
        return this.baseModel.createItem(contactMeContents);

    }
}

/***/ }),

/***/ "./app/model/view-contact-me-model.js":
/*!********************************************!*\
  !*** ./app/model/view-contact-me-model.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewContactMeModel": () => (/* binding */ ViewContactMeModel)
/* harmony export */ });
/* harmony import */ var _base_models_contact_me_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-models/contact-me-model.js */ "./app/model/base-models/contact-me-model.js");


class ViewContactMeModel extends _base_models_contact_me_model_js__WEBPACK_IMPORTED_MODULE_0__.ContactMeModel{
    constructor(){
        super();
    }

    async fetchContactMeFromDb(){
        var blogData = await this.fetchActiveContactMe();
        return blogData;
    }
}

/***/ }),

/***/ "./app/view/contact-me/view-contact-me-view.js":
/*!*****************************************************!*\
  !*** ./app/view/contact-me/view-contact-me-view.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ViewContactMeView": () => (/* binding */ ViewContactMeView)
/* harmony export */ });

class ViewContactMeView{
    constructor(){
        this.contact_me_content = document.querySelector(".contact-me-intro");
    }


    setUpContactMe(contactMeContents) {
        var heading_element = document.createElement('h1');
        heading_element.className = "open-invite animate-entry";
        var heading = document.createTextNode(contactMeContents["title"]);
        heading_element.appendChild(heading);
        this.contact_me_content.append(heading_element);


        var contact_me_element = document.createElement('p');
        contact_me_element.className = "contact-me-text animate-entry";
        

        // html string
        contact_me_element.innerHTML = contactMeContents["html"];
        this.contact_me_content.append(contact_me_element);

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
/*!************************************!*\
  !*** ./app/view-contact-me-app.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_view_contact_me_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller/view-contact-me-controller.js */ "./app/controller/view-contact-me-controller.js");
/* harmony import */ var _view_contact_me_view_contact_me_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/contact-me/view-contact-me-view.js */ "./app/view/contact-me/view-contact-me-view.js");
/* harmony import */ var _model_view_contact_me_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/view-contact-me-model.js */ "./app/model/view-contact-me-model.js");






const app = new _controller_view_contact_me_controller_js__WEBPACK_IMPORTED_MODULE_0__.ViewContactMeController(new _model_view_contact_me_model_js__WEBPACK_IMPORTED_MODULE_2__.ViewContactMeModel(), new _view_contact_me_view_contact_me_view_js__WEBPACK_IMPORTED_MODULE_1__.ViewContactMeView());
})();

/******/ })()
;
//# sourceMappingURL=contact.js.map