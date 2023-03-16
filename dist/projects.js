/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/controller/projects-list-controller.js":
/*!****************************************************!*\
  !*** ./app/controller/projects-list-controller.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectListController": () => (/* binding */ ProjectListController)
/* harmony export */ });


class ProjectListController{
 
    constructor(viewProjectModel, viewProjectView){
        this.model = viewProjectModel;
        this.view = viewProjectView;
        this.init();
    }

    init(){
        // Display initial projects
        this.model.getProjects().then((projects) => {
            this.onProjectListChanged(projects);
        }).catch((err)=>{
            console.error("error " + err);
        });
        
    }

    onProjectListChanged = (projects) => {
        this.view.displayProjects(projects);
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

/***/ "./app/model/base-models/projects-model.js":
/*!*************************************************!*\
  !*** ./app/model/base-models/projects-model.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectBaseModel": () => (/* binding */ ProjectBaseModel)
/* harmony export */ });
/* harmony import */ var _base_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.js */ "./app/model/base-models/base-model.js");


class ProjectBaseModel {

    constructor() { 
        this.baseModel = new _base_model_js__WEBPACK_IMPORTED_MODULE_0__.BaseModel("https://api.ngacho.com/database/projects");
    }
    


    async fetchProjects() {
        return this.baseModel.getList();
        
    }

    async fetchProjectById(id, serverSideRendering = false) {
        return this.baseModel.getListItemById(id, serverSideRendering);
    }

    async deleteProject(id){
        return this.baseModel.deleteItem(id);

    }


    async updateProjectWithFile(file, bioObject){
        return this.baseModel.updateFileItemObject(file, bioObject);
    }

    async updateProject(bioObject){
        return this.baseModel.updateItem(bioObject);
    }

    async publishProject(file, bioObject){
        return this.baseModel.createFileItem(file, bioObject);
    }


}

/***/ }),

/***/ "./app/model/project-list-model.js":
/*!*****************************************!*\
  !*** ./app/model/project-list-model.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectListModel": () => (/* binding */ ProjectListModel)
/* harmony export */ });
/* harmony import */ var _base_models_projects_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-models/projects-model.js */ "./app/model/base-models/projects-model.js");


class ProjectListModel extends _base_models_projects_model_js__WEBPACK_IMPORTED_MODULE_0__.ProjectBaseModel {
    constructor(){
        super();
    }

    async getProjects(){
        var projects = await this.fetchProjects();
        return projects;
    }

    
    
}

/***/ }),

/***/ "./app/view/projects/projects-list-view.js":
/*!*************************************************!*\
  !*** ./app/view/projects/projects-list-view.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectListView": () => (/* binding */ ProjectListView)
/* harmony export */ });

class ProjectListView {
    constructor() {
        this.projects_carousel = document.querySelector(".projects-carousel");
        this.right_click_button = document.querySelector(".right-control");
        this.left_click_button = document.querySelector(".left-control");
        this.right_click_button.addEventListener('click', ()=>{
            this.scrollTowardsRight();
        })
        this.left_click_button.addEventListener('click', ()=>{
            this.scrollTowardsLeft();
        })
        
        this.scrollAmount = 0;
        
        // this.initiateCarousel();
    }


    displayProjects(projects) {
        for (const project of projects) {
            const projectId = project["id"];
            const projectTitle = projectId.substring(0, projectId.length-5);
            
            const projectCoverUrl = project["publicUrl"];
            const projectLangs = project["projectLanguages"];
            const projectExtraInfoLink = project["projectExtraInfoUrl"];

            // create the (project-card animate-entry)
            var project_card = document.createElement('div');
            // class name
            project_card.className = 'project-card animate-entry';
            //  create figure element
            var img_figure = document.createElement('figure');
            // create img, append src, create alt.
            var project_poster = document.createElement('img');
            project_poster.src = projectCoverUrl;
            project_poster.alt = `photo of ${projectTitle}`
            // put image in figure element
            img_figure.appendChild(project_poster);


            // create a section, project-details
            var project_details = document.createElement('section');
            project_details.className = "project-details";
            // create div, min-details.
            var minimized_details = document.createElement('div');
            minimized_details.className = "min-details"
            // create h1 block for project name, span for language.
            var project_title = document.createElement('h1');
            var title = document.createTextNode(projectTitle);
            project_title.appendChild(title);

            var project_language = document.createElement('span');
            var lang = document.createTextNode(projectLangs);
            project_language.appendChild(lang);

            project_title.appendChild(project_language);

            minimized_details.appendChild(project_title);
            // create a tag class btn , with target _blank and rel noopener noreferrer 
            var learn_more = document.createElement('a');
            learn_more.className = "btn";
            // text is learn more.
            var learn_more_prompt = document.createTextNode("Learn More");
            learn_more.href = projectExtraInfoLink;
            learn_more.target = "_blank";
            learn_more.rel = "noopener noreferrer"

            learn_more.appendChild(learn_more_prompt);
            project_details.appendChild(minimized_details);
            project_details.appendChild(learn_more);



            // put everything in project card.
            project_card.appendChild(img_figure);
            project_card.appendChild(project_details);

            // add to carousel
            this.projects_carousel.appendChild(project_card);
        }
    }

    scrollTowardsLeft() {
        // add width of the card + one of the margins.
        var project_card = document.querySelector(".project-card");
        var style = project_card.currentStyle || window.getComputedStyle(project_card);

        var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

        this.projects_carousel.scrollTo({
            top: 0,
            left: (this.scrollAmount -= scrollPerClick),
            behavior: "smooth"
        });

        if (this.scrollAmount < 0) scrollAmount = 0;
    }

    scrollTowardsRight() {
        var project_card = document.querySelector(".project-card");
        var style = project_card.currentStyle || window.getComputedStyle(project_card);

        // add width of the card + one of the margins.
        var scrollPerClick = project_card.clientWidth + parseFloat(style.marginRight) + parseFloat(style.marginLeft);

        if (this.scrollAmount <= this.projects_carousel.scrollWidth - this.projects_carousel.clientWidth) {
            this.projects_carousel.scrollTo({
                top: 0,
                left: (this.scrollAmount += scrollPerClick),
                behavior: "smooth"
            })
        }
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
/*!**********************************!*\
  !*** ./app/projects-list-app.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_projects_projects_list_view_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/projects/projects-list-view.js */ "./app/view/projects/projects-list-view.js");
/* harmony import */ var _controller_projects_list_controller_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller/projects-list-controller.js */ "./app/controller/projects-list-controller.js");
/* harmony import */ var _model_project_list_model_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model/project-list-model.js */ "./app/model/project-list-model.js");




const app = new _controller_projects_list_controller_js__WEBPACK_IMPORTED_MODULE_1__.ProjectListController(new _model_project_list_model_js__WEBPACK_IMPORTED_MODULE_2__.ProjectListModel(), new _view_projects_projects_list_view_js__WEBPACK_IMPORTED_MODULE_0__.ProjectListView());
})();

/******/ })()
;
//# sourceMappingURL=projects.js.map