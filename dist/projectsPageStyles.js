/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./app/view/projects/projects.css":
/*!******************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./app/view/projects/projects.css ***!
  \******************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".projects-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    overflow: auto;\n    height: 100vh;\n    height: calc(100vh - 5rem);\n    min-height: calc(100vh - 5rem);\n}\n\n.projects-wrapper {\n    margin: auto;\n    overflow-y: auto;\n    /** create layout for project items **/\n}\n\n.projects-items-wrapper {\n    margin: auto;\n    display: flex;\n    width: calc((3*350px) + (12 * 20px));\n    align-items: center;\n    flex-direction: row;\n\n}\n\n.projects-carousel {\n    color: #03312E;\n    margin: auto;\n    display: flex;\n    flex-wrap: nowrap;\n    overflow-x: scroll;\n    flex-direction: row;\n    width: calc((3*350px) + (6 * 20px));\n    align-items: center;\n    -ms-overflow-style: none;\n    /* for Internet Explorer, Edge */\n    scrollbar-width: none;\n    /* for Firefox */\n\n\n}\n\n.projects-carousel::-webkit-scrollbar {\n    display: none;\n    /* for Chrome, Safari, and Opera */\n}\n\n.project-card {\n    position: relative;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n    height: 400px;\n    flex-shrink: 0;\n    overflow: hidden;\n    margin: 20px;\n    width: 350px;\n}\n\n.project-card>figure {\n    width: 100%;\n    margin: 0 auto 0 auto;\n    background-position: center center;\n}\n\n.project-card>figure>img {\n    width: 100%;\n    transition: box-shadow .7s ease-in-out,\n        top .7s ease-in-out;\n    -webkit-filter: grayscale(80%);\n    /* Safari 6.0 - 9.0 */\n    filter: grayscale(80%);\n}\n\n.project-card:hover img {\n    -webkit-filter: grayscale(0%);\n    /* Safari 6.0 - 9.0 */\n    filter: grayscale(0%);\n    filter: saturate(1.5);\n\n}\n\n.project-details {\n    background-color: #FFF;\n    padding: 20px;\n    position: absolute;\n    top: 80%;\n    width: 100%;\n    transition: box-shadow .1s ease-in-out,\n        top .3s ease-in-out;\n}\n\n.project-card:hover .project-details {\n    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n    top: 62%;\n}\n\n.project-details>.min-details {\n    margin-bottom: 20px;\n}\n\n.project-details>.min-details {\n    display: flex;\n    justify-content: space-between;\n    font-family: 'Poppins', sans-serif;\n}\n\n.project-details>.min-details>h1>span {\n    color: #7B7B7B;\n    display: block;\n    text-align: start;\n    font-size: .9rem;\n    font-weight: 400;\n}\n\n.project-details>.min-details>span {\n    font-family: 'Source Code Pro', sans-serif;\n}\n\n.btn {\n    background-color: #03312E;\n    border-radius: 5px;\n    color: #FFF;\n    display: block;\n    padding: 10px;\n    text-align: center;\n    text-decoration: none;\n    text-transform: capitalize;\n    width: 100%;\n    transition: box-shadow .3s ease-in-out,\n        transform .3s ease-in-out;\n}\n\n.btn:hover {\n    box-shadow: 0 5px 10px rgba(0, 0, 0, .3);\n    transform: translateY(-2px);\n}\n\n.carousel-control {\n    width: 50px;\n    height: 50px;\n    border: 1px solid #03312E;\n    background-color: #03312E;\n    font-size: 30px;\n    color: #fff;\n    margin: 0 10px 0 10px;\n    text-align: center;\n    line-height: 44px;\n    text-shadow: none;\n    opacity: 1;\n}\n\n.carousel-control:hover {\n    cursor: pointer;\n}\n\n\n.animate-entry {\n    -webkit-animation: fadein 1s;\n    /* Safari, Chrome and Opera > 12.1 */\n    -moz-animation: fadein 1s;\n    /* Firefox < 16 */\n    -ms-animation: fadein 1s;\n    /* Internet Explorer */\n    -o-animation: fadein 1s;\n    /* Opera < 12.1 */\n    animation: fadein 1s;\n}\n\n@keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Firefox < 16 */\n@-moz-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Safari, Chrome and Opera > 12.1 */\n@-webkit-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Internet Explorer */\n@-ms-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Opera < 12.1 */\n@-o-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n\n@media only screen and (max-width: 517px) {\n\n    .projects-container {\n        display: table;\n        text-align: center;\n        height: 100vh;\n        height: calc(100vh - 5rem);\n        min-height: calc(100vh - 5rem);\n    }\n\n}\n\n@media screen and (max-width: 630px) {\n\n    /*\n    Projects-wrapper >> project-items-wrapper >> projects-carousel\n    */\n\n    /*flow is column here*/\n    .projects-items-wrapper {\n        width: 100%;\n        position: absolute;\n        top: 4.5em;\n        bottom: 1em;\n        flex-direction: column;\n        justify-content: center;\n        min-height: 0;\n    }\n\n\n    .projects-carousel {\n        max-width: 360px;\n        flex: 1;\n        flex-wrap: wrap;\n        overflow-y: auto;\n    }\n\n    .project-card {\n        position: relative;\n        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n        height: 345px;\n        flex-shrink: 0;\n        overflow: hidden;\n        margin: 10px;\n        width: 340px;\n    }\n\n    .project-details {\n        top: 58%;\n    }\n\n    .project-card:hover .project-details {\n        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n        top: 56%;\n    }\n\n    .project-details>.min-details>h1>span {\n        font-size: .7rem;\n        font-weight: 250;\n    }\n\n    /** hide carousel control **/\n    .carousel-control {\n        display: none;\n    }\n\n}\n\n@media only screen and (min-width: 630px) and (max-width: 850px) {\n\n    .projects-items-wrapper {\n        width: calc((14*10px) + (2*90px) + 270px);\n    }\n\n    .projects-carousel {\n        width: calc((2*90px) + (4 * 10px) + 270px);\n\n    }\n\n    .project-card {\n        width: 270px;\n        margin: 10px;\n    }\n\n    .project-details>.min-details>h1>span {\n        font-size: .7rem;\n        font-weight: 250;\n    }\n\n    .project-details {\n        top: 65%;\n    }\n\n}\n\n@media only screen and (min-width: 851px) and (max-width: 1290px) {\n\n    .projects-items-wrapper {\n        width: calc((12*20px) + (2*300px) + 10px);\n    }\n\n    .projects-carousel {\n        width: calc((2*300px) + (4 * 20px));\n\n    }\n\n    .project-card {\n        width: 300px;\n    }\n\n\n    .project-details {\n        top: 63%;\n    }\n\n}\n\n@media screen and (max-height: 545px) {\n\n    .project-card {\n        height: 155px;\n    }\n\n    .project-card>.project-details {\n        top: 0%;\n    }\n\n    .project-card>figure {\n        display: none;\n    }\n\n    .project-card:hover .project-details {\n        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n        top: 0%;\n    }\n\n}", "",{"version":3,"sources":["webpack://./app/view/projects/projects.css"],"names":[],"mappings":"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","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap');\n\n.projects-container {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 100%;\n    overflow: auto;\n    height: 100vh;\n    height: calc(100vh - 5rem);\n    min-height: calc(100vh - 5rem);\n}\n\n.projects-wrapper {\n    margin: auto;\n    overflow-y: auto;\n    /** create layout for project items **/\n}\n\n.projects-items-wrapper {\n    margin: auto;\n    display: flex;\n    width: calc((3*350px) + (12 * 20px));\n    align-items: center;\n    flex-direction: row;\n\n}\n\n.projects-carousel {\n    color: #03312E;\n    margin: auto;\n    display: flex;\n    flex-wrap: nowrap;\n    overflow-x: scroll;\n    flex-direction: row;\n    width: calc((3*350px) + (6 * 20px));\n    align-items: center;\n    -ms-overflow-style: none;\n    /* for Internet Explorer, Edge */\n    scrollbar-width: none;\n    /* for Firefox */\n\n\n}\n\n.projects-carousel::-webkit-scrollbar {\n    display: none;\n    /* for Chrome, Safari, and Opera */\n}\n\n.project-card {\n    position: relative;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n    height: 400px;\n    flex-shrink: 0;\n    overflow: hidden;\n    margin: 20px;\n    width: 350px;\n}\n\n.project-card>figure {\n    width: 100%;\n    margin: 0 auto 0 auto;\n    background-position: center center;\n}\n\n.project-card>figure>img {\n    width: 100%;\n    transition: box-shadow .7s ease-in-out,\n        top .7s ease-in-out;\n    -webkit-filter: grayscale(80%);\n    /* Safari 6.0 - 9.0 */\n    filter: grayscale(80%);\n}\n\n.project-card:hover img {\n    -webkit-filter: grayscale(0%);\n    /* Safari 6.0 - 9.0 */\n    filter: grayscale(0%);\n    filter: saturate(1.5);\n\n}\n\n.project-details {\n    background-color: #FFF;\n    padding: 20px;\n    position: absolute;\n    top: 80%;\n    width: 100%;\n    transition: box-shadow .1s ease-in-out,\n        top .3s ease-in-out;\n}\n\n.project-card:hover .project-details {\n    box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n    top: 62%;\n}\n\n.project-details>.min-details {\n    margin-bottom: 20px;\n}\n\n.project-details>.min-details {\n    display: flex;\n    justify-content: space-between;\n    font-family: 'Poppins', sans-serif;\n}\n\n.project-details>.min-details>h1>span {\n    color: #7B7B7B;\n    display: block;\n    text-align: start;\n    font-size: .9rem;\n    font-weight: 400;\n}\n\n.project-details>.min-details>span {\n    font-family: 'Source Code Pro', sans-serif;\n}\n\n.btn {\n    background-color: #03312E;\n    border-radius: 5px;\n    color: #FFF;\n    display: block;\n    padding: 10px;\n    text-align: center;\n    text-decoration: none;\n    text-transform: capitalize;\n    width: 100%;\n    transition: box-shadow .3s ease-in-out,\n        transform .3s ease-in-out;\n}\n\n.btn:hover {\n    box-shadow: 0 5px 10px rgba(0, 0, 0, .3);\n    transform: translateY(-2px);\n}\n\n.carousel-control {\n    width: 50px;\n    height: 50px;\n    border: 1px solid #03312E;\n    background-color: #03312E;\n    font-size: 30px;\n    color: #fff;\n    margin: 0 10px 0 10px;\n    text-align: center;\n    line-height: 44px;\n    text-shadow: none;\n    opacity: 1;\n}\n\n.carousel-control:hover {\n    cursor: pointer;\n}\n\n\n.animate-entry {\n    -webkit-animation: fadein 1s;\n    /* Safari, Chrome and Opera > 12.1 */\n    -moz-animation: fadein 1s;\n    /* Firefox < 16 */\n    -ms-animation: fadein 1s;\n    /* Internet Explorer */\n    -o-animation: fadein 1s;\n    /* Opera < 12.1 */\n    animation: fadein 1s;\n}\n\n@keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Firefox < 16 */\n@-moz-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Safari, Chrome and Opera > 12.1 */\n@-webkit-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Internet Explorer */\n@-ms-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n/* Opera < 12.1 */\n@-o-keyframes fadein {\n    from {\n        opacity: 0;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n\n@media only screen and (max-width: 517px) {\n\n    .projects-container {\n        display: table;\n        text-align: center;\n        height: 100vh;\n        height: calc(100vh - 5rem);\n        min-height: calc(100vh - 5rem);\n    }\n\n}\n\n@media screen and (max-width: 630px) {\n\n    /*\n    Projects-wrapper >> project-items-wrapper >> projects-carousel\n    */\n\n    /*flow is column here*/\n    .projects-items-wrapper {\n        width: 100%;\n        position: absolute;\n        top: 4.5em;\n        bottom: 1em;\n        flex-direction: column;\n        justify-content: center;\n        min-height: 0;\n    }\n\n\n    .projects-carousel {\n        max-width: 360px;\n        flex: 1;\n        flex-wrap: wrap;\n        overflow-y: auto;\n    }\n\n    .project-card {\n        position: relative;\n        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n        height: 345px;\n        flex-shrink: 0;\n        overflow: hidden;\n        margin: 10px;\n        width: 340px;\n    }\n\n    .project-details {\n        top: 58%;\n    }\n\n    .project-card:hover .project-details {\n        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n        top: 56%;\n    }\n\n    .project-details>.min-details>h1>span {\n        font-size: .7rem;\n        font-weight: 250;\n    }\n\n    /** hide carousel control **/\n    .carousel-control {\n        display: none;\n    }\n\n}\n\n@media only screen and (min-width: 630px) and (max-width: 850px) {\n\n    .projects-items-wrapper {\n        width: calc((14*10px) + (2*90px) + 270px);\n    }\n\n    .projects-carousel {\n        width: calc((2*90px) + (4 * 10px) + 270px);\n\n    }\n\n    .project-card {\n        width: 270px;\n        margin: 10px;\n    }\n\n    .project-details>.min-details>h1>span {\n        font-size: .7rem;\n        font-weight: 250;\n    }\n\n    .project-details {\n        top: 65%;\n    }\n\n}\n\n@media only screen and (min-width: 851px) and (max-width: 1290px) {\n\n    .projects-items-wrapper {\n        width: calc((12*20px) + (2*300px) + 10px);\n    }\n\n    .projects-carousel {\n        width: calc((2*300px) + (4 * 20px));\n\n    }\n\n    .project-card {\n        width: 300px;\n    }\n\n\n    .project-details {\n        top: 63%;\n    }\n\n}\n\n@media screen and (max-height: 545px) {\n\n    .project-card {\n        height: 155px;\n    }\n\n    .project-card>.project-details {\n        top: 0%;\n    }\n\n    .project-card>figure {\n        display: none;\n    }\n\n    .project-card:hover .project-details {\n        box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.3);\n        top: 0%;\n    }\n\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************************!*\
  !*** ./app/view/projects/projects.css ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js!./projects.css */ "./node_modules/css-loader/dist/cjs.js!./app/view/projects/projects.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_projects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);

})();

/******/ })()
;
//# sourceMappingURL=projectsPageStyles.js.map