/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/controller/blog-list-controller.js":
/*!************************************************!*\
  !*** ./app/controller/blog-list-controller.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogListController": () => (/* binding */ BlogListController)
/* harmony export */ });
class BlogListController {

    constructor(blogListModel, blogListView) {
        this.model = blogListModel;
        this.view = blogListView;

        this.init();
    }

    init() {
        let tag = decodeURI(location.search).slice(1);
        let blogListRef = tag ? this.model.getBlogListByTag(tag) : this.model.getBlogList();
        
        // Display initial todos
        blogListRef.then((blogData) => {
            this.onBlogListChanged(blogData);
        }).catch((err) => {
            console.error(err);
        })
    }

    onBlogListChanged = (blogs) => {
        this.view.displayBlogs(blogs)
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

/***/ "./app/model/base-models/blog-model.js":
/*!*********************************************!*\
  !*** ./app/model/base-models/blog-model.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogModel": () => (/* binding */ BlogModel)
/* harmony export */ });
/* harmony import */ var _base_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-model.js */ "./app/model/base-models/base-model.js");


class BlogModel {

    /**
     * getBlogs
     * deleteBlogById
     * editBlog
     * addBlog
     */
    constructor() {
        this.baseModel = new _base_model_js__WEBPACK_IMPORTED_MODULE_0__.BaseModel("https://api.ngacho.com/database/blogs");
    }

    // pass me a new blog. I'll modify the id
    async addBlog(blog) {
        return this.baseModel.createItem(blog);
    }

    // pass me an edited blog, it should have a blog id.
    async editBlog(editedBlog) {
        return this.baseModel.updateItem(editedBlog);
    }

    async getBlogs() {
        return this.baseModel.getList();
    }

    // singular blog raw vs ssr
    async getBlog(blogId, serverSideRendering = false) {
        return this.baseModel.getListItemById(blogId, serverSideRendering);
    }

    async deleteBlogById(blogId) {
        return this.baseModel.deleteItem(blogId);
    }

    // filter blog by tags.
    async getBlogsByTags(tag) {
        return this.baseModel.getListByTag(tag);
    }

}


/***/ }),

/***/ "./app/model/blog-list-model.js":
/*!**************************************!*\
  !*** ./app/model/blog-list-model.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogListModel": () => (/* binding */ BlogListModel)
/* harmony export */ });
/* harmony import */ var _base_models_blog_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-models/blog-model.js */ "./app/model/base-models/blog-model.js");


class BlogListModel extends _base_models_blog_model_js__WEBPACK_IMPORTED_MODULE_0__.BlogModel {

    constructor() {
        super();
        this.blogList = [];
        this.taggedBlogList = [];
    }


    async getBlogList(){
        var blogList = await this.getBlogs();
        return blogList;
    }

    async getBlogListByTag(tag) {
        var taggedBlogList = await this.getBlogsByTags(tag);
        return taggedBlogList;
    }
}

/***/ }),

/***/ "./app/view/blog/blog-list-view.js":
/*!*****************************************!*\
  !*** ./app/view/blog/blog-list-view.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogListView": () => (/* binding */ BlogListView)
/* harmony export */ });
class BlogListView {
    constructor() {
        // The root element
        this.blogs_wrapper = document.querySelector(".blogs-wrapper");
    }

    displayBlogs(posts) {
        if (!posts) {
            // add error of no blogs yet.
            // const no_blog_warning = document.createElement('h1')
            // no_blog_warning.textContent = 'No blog yet. Please come back later.'
            // this.blogs_wrapper.append(no_blog_warning);
        } else {
            posts.forEach(post => {
                // Your existing code unmodified...
                var blog_item = document.createElement('div');
                blog_item.className = 'blog-item animate-entry';

                var time_item = document.createElement('time');
                time_item.className = 'post-date';
                var time = document.createTextNode(post["lastModified"] ? post["lastModified"] : post["publishedAt"]);
                time_item.appendChild(time);

                var post_title = document.createElement('p');
                post_title.className = 'post-title';
                var title = document.createTextNode(post["title"]);
                post_title.appendChild(title);

                var post_desc = document.createElement('p');
                post_desc.className = 'post-short-desc';
                var description = document.createTextNode(post["descript"]);
                post_desc.appendChild(description);

                post_title.addEventListener('click', function () {
                    location.href = `/blog-post/?${post["id"]}`;
                });

                post_desc.onclick = function () {
                    location.href = `/blog-post/?${post["id"]}`;
                }

                var tags = document.createElement('div');
                tags.className = 'tags';
                var post_tags = post["tags"];
                for (const tag of post_tags) {
                    var tag_ref = document.createElement('a');
                    tag_ref.className = 'tag';
                    tag_ref.addEventListener('click', function () {
                        let encodedTag = encodeURIComponent(tag);
                        console.log(encodedTag)
                        location.href = `/blog/tags/?${encodedTag}`;
                    });
                    var tag_item = document.createTextNode(tag);
                    tag_ref.appendChild(tag_item);
                    tags.appendChild(tag_ref);
                }

                // append all elements to the div
                blog_item.appendChild(time_item);
                blog_item.appendChild(post_title);
                blog_item.appendChild(post_desc);
                blog_item.appendChild(tags);

                // append the blog item to the blog wrappers.
                this.blogs_wrapper.appendChild(blog_item);

            });
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
/*!******************************!*\
  !*** ./app/blog-list-app.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _model_blog_list_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model/blog-list-model.js */ "./app/model/blog-list-model.js");
/* harmony import */ var _view_blog_blog_list_view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/blog/blog-list-view.js */ "./app/view/blog/blog-list-view.js");
/* harmony import */ var _controller_blog_list_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controller/blog-list-controller.js */ "./app/controller/blog-list-controller.js");




const app = new _controller_blog_list_controller_js__WEBPACK_IMPORTED_MODULE_2__.BlogListController(new _model_blog_list_model_js__WEBPACK_IMPORTED_MODULE_0__.BlogListModel(), new _view_blog_blog_list_view_js__WEBPACK_IMPORTED_MODULE_1__.BlogListView());
})();

/******/ })()
;
//# sourceMappingURL=blog.js.map