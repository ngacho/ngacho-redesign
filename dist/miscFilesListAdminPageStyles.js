/*! For license information please see miscFilesListAdminPageStyles.js.LICENSE.txt */
(()=>{"use strict";var n={"./node_modules/css-loader/dist/cjs.js!./app/view/admin/misc-files/misc-file-list.css":(n,e,t)=>{t.r(e),t.d(e,{default:()=>a});var o=t("./node_modules/css-loader/dist/runtime/sourceMaps.js"),i=t.n(o),r=t("./node_modules/css-loader/dist/runtime/api.js"),l=t.n(r)()(i());l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap);"]),l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap);"]),l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap);"]),l.push([n.id,".files-parent-container {\n    width: 80%;\n    margin: auto;\n    height: calc(100vh - 5rem);\n    overflow: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n}\n\n.files-list-container {\n    height: calc(100vh - 5rem);\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    width: 75%;\n    margin: 10px auto 0 auto;\n}\n\n.file-gallery-item-text{\n    padding: 3px;\n    color: #03312E;\n    font-size: 1rem;\n    font-weight: 500;\n    font-family: 'Montserrat', sans-serif;\n    text-align: center;\n}\n\n.header-wrapper {\n    margin: auto;\n    width: max-content;\n}\n\n.file-list-header {\n    margin-right: auto;\n    margin-left: auto;\n}\n\n\n\n\n.rounded-button {\n    background-color: #03312E;\n    border-radius: 999em;\n    width: 56px;\n    height: 56px;\n    padding: 20px;\n    margin: 0px 48px 48px 0px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n    line-height: 1;\n    font-size: 36px;\n    position: fixed;\n    cursor: pointer;\n    right: 0;\n    bottom: 0;\n}\n\n.rounded-button>i {\n    position: absolute;\n    left: 0;\n    top: 50%;\n    height: 100%;\n    width: 100%;\n    text-align: center;\n    margin-top: -22px;\n    color: #FFF;\n}\n\n/*\n\nAll grid code is placed in a 'supports' rule (feature query) at the bottom of the CSS (Line 310). \n        \nThe 'supports' rule will only run if your browser supports CSS grid.\n\nFlexbox and floats are used as a fallback so that browsers which don't support grid will still recieve a similar layout.\n\n*/\n\n\n.btn {\n    display: inline-block;\n    font: inherit;\n    background: none;\n    border: none;\n    color: inherit;\n    padding: 0;\n    cursor: pointer;\n}\n\n.btn:focus {\n    outline: 0.5rem auto #4d90fe;\n}\n\n.visually-hidden {\n    position: absolute !important;\n    height: 1px;\n    width: 1px;\n    overflow: hidden;\n    clip: rect(1px, 1px, 1px, 1px);\n}\n\n/* project-gallery Section */\n\n.files-gallery {\n    padding: 5px;\n    display: flex;\n    flex-wrap: wrap;\n    margin: 20px 0 20px 0;\n    padding-bottom: 3rem;\n}\n\n.file-gallery-item {\n    position: relative;\n    flex: 1 0 22rem;\n    margin: 1rem;\n    color: #fff;\n    cursor: pointer;\n    width: 350px;\n    height: auto;\n}\n\n.file-gallery-item.hide {\n    opacity: 0;\n    height: 0;\n}\n\n.file-gallery-item>figure {\n    width: 100%;\n    margin: 0 auto 0 auto;\n    background-position: center center;\n}\n\n.file-gallery-item:hover .file-gallery-item-actions,\n.file-gallery-item:focus .file-gallery-item-actions {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n.file-gallery-item-actions {\n    display: none;\n}\n\n.file-gallery-item-actions li {\n    display: inline-block;\n    font-size: 1.7rem;\n    font-weight: 600;\n}\n\n.file-gallery-item-copy {\n    margin-right: 2.2rem;\n}\n\n.file-gallery-item-type {\n    position: absolute;\n    top: 1rem;\n    right: 1rem;\n    font-size: 2.5rem;\n    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);\n}\n\n\n.file-gallery-image {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n/*\n\nThe following code will only run if your browser supports CSS grid.\n\nRemove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. \n\n*/\n\n@supports (display: grid) {\n\n    .files-gallery {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));\n        grid-gap: 2rem;\n    }\n\n    .file-gallery-item,\n    .files-gallery {\n        width: auto;\n        margin: 0;\n    }\n}\n\n@media screen and (max-width: 630px) {\n    .files-parent-container {\n        min-width: 320px;\n    }\n\n    .files-gallery {\n        margin: 0 10px 0 10px;\n    }\n\n    .file-gallery-item {\n        width: 300px;\n        margin: 0.5rem;\n    }\n}\n","",{version:3,sources:["webpack://./app/view/admin/misc-files/misc-file-list.css"],names:[],mappings:"AAKA;IACI,UAAU;IACV,YAAY;IACZ,0BAA0B;IAC1B,gBAAgB;IAChB,gBAAgB;IAChB,wBAAwB;IACxB,YAAY;IACZ,qBAAqB;AACzB;;AAEA;IACI,0BAA0B;IAC1B,kBAAkB;IAClB,gBAAgB;IAChB,wBAAwB;IACxB,YAAY;IACZ,qBAAqB;IACrB,UAAU;IACV,wBAAwB;AAC5B;;AAEA;IACI,YAAY;IACZ,cAAc;IACd,eAAe;IACf,gBAAgB;IAChB,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;IAClB,iBAAiB;AACrB;;;;;AAKA;IACI,yBAAyB;IACzB,oBAAoB;IACpB,WAAW;IACX,YAAY;IACZ,aAAa;IACb,yBAAyB;IACzB,2CAA2C;IAC3C,cAAc;IACd,eAAe;IACf,eAAe;IACf,eAAe;IACf,QAAQ;IACR,SAAS;AACb;;AAEA;IACI,kBAAkB;IAClB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,WAAW;IACX,kBAAkB;IAClB,iBAAiB;IACjB,WAAW;AACf;;AAEA;;;;;;;;CAQC;;;AAGD;IACI,qBAAqB;IACrB,aAAa;IACb,gBAAgB;IAChB,YAAY;IACZ,cAAc;IACd,UAAU;IACV,eAAe;AACnB;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,6BAA6B;IAC7B,WAAW;IACX,UAAU;IACV,gBAAgB;IAChB,8BAA8B;AAClC;;AAEA,4BAA4B;;AAE5B;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,qBAAqB;IACrB,oBAAoB;AACxB;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,YAAY;IACZ,WAAW;IACX,eAAe;IACf,YAAY;IACZ,YAAY;AAChB;;AAEA;IACI,UAAU;IACV,SAAS;AACb;;AAEA;IACI,WAAW;IACX,qBAAqB;IACrB,kCAAkC;AACtC;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,kBAAkB;IAClB,MAAM;IACN,WAAW;IACX,YAAY;IACZ,oCAAoC;AACxC;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,qBAAqB;IACrB,iBAAiB;IACjB,gBAAgB;AACpB;;AAEA;IACI,oBAAoB;AACxB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,WAAW;IACX,iBAAiB;IACjB,oDAAoD;AACxD;;;AAGA;IACI,WAAW;IACX,YAAY;IACZ,iBAAiB;AACrB;;AAEA;;;;;;CAMC;;AAED;;IAEI;QACI,aAAa;QACb,2DAA2D;QAC3D,cAAc;IAClB;;IAEA;;QAEI,WAAW;QACX,SAAS;IACb;AACJ;;AAEA;IACI;QACI,gBAAgB;IACpB;;IAEA;QACI,qBAAqB;IACzB;;IAEA;QACI,YAAY;QACZ,cAAc;IAClB;AACJ",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap');\n\n\n.files-parent-container {\n    width: 80%;\n    margin: auto;\n    height: calc(100vh - 5rem);\n    overflow: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n}\n\n.files-list-container {\n    height: calc(100vh - 5rem);\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    width: 75%;\n    margin: 10px auto 0 auto;\n}\n\n.file-gallery-item-text{\n    padding: 3px;\n    color: #03312E;\n    font-size: 1rem;\n    font-weight: 500;\n    font-family: 'Montserrat', sans-serif;\n    text-align: center;\n}\n\n.header-wrapper {\n    margin: auto;\n    width: max-content;\n}\n\n.file-list-header {\n    margin-right: auto;\n    margin-left: auto;\n}\n\n\n\n\n.rounded-button {\n    background-color: #03312E;\n    border-radius: 999em;\n    width: 56px;\n    height: 56px;\n    padding: 20px;\n    margin: 0px 48px 48px 0px;\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n    line-height: 1;\n    font-size: 36px;\n    position: fixed;\n    cursor: pointer;\n    right: 0;\n    bottom: 0;\n}\n\n.rounded-button>i {\n    position: absolute;\n    left: 0;\n    top: 50%;\n    height: 100%;\n    width: 100%;\n    text-align: center;\n    margin-top: -22px;\n    color: #FFF;\n}\n\n/*\n\nAll grid code is placed in a 'supports' rule (feature query) at the bottom of the CSS (Line 310). \n        \nThe 'supports' rule will only run if your browser supports CSS grid.\n\nFlexbox and floats are used as a fallback so that browsers which don't support grid will still recieve a similar layout.\n\n*/\n\n\n.btn {\n    display: inline-block;\n    font: inherit;\n    background: none;\n    border: none;\n    color: inherit;\n    padding: 0;\n    cursor: pointer;\n}\n\n.btn:focus {\n    outline: 0.5rem auto #4d90fe;\n}\n\n.visually-hidden {\n    position: absolute !important;\n    height: 1px;\n    width: 1px;\n    overflow: hidden;\n    clip: rect(1px, 1px, 1px, 1px);\n}\n\n/* project-gallery Section */\n\n.files-gallery {\n    padding: 5px;\n    display: flex;\n    flex-wrap: wrap;\n    margin: 20px 0 20px 0;\n    padding-bottom: 3rem;\n}\n\n.file-gallery-item {\n    position: relative;\n    flex: 1 0 22rem;\n    margin: 1rem;\n    color: #fff;\n    cursor: pointer;\n    width: 350px;\n    height: auto;\n}\n\n.file-gallery-item.hide {\n    opacity: 0;\n    height: 0;\n}\n\n.file-gallery-item>figure {\n    width: 100%;\n    margin: 0 auto 0 auto;\n    background-position: center center;\n}\n\n.file-gallery-item:hover .file-gallery-item-actions,\n.file-gallery-item:focus .file-gallery-item-actions {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    position: absolute;\n    top: 0;\n    width: 100%;\n    height: 100%;\n    background-color: rgba(0, 0, 0, 0.3);\n}\n\n.file-gallery-item-actions {\n    display: none;\n}\n\n.file-gallery-item-actions li {\n    display: inline-block;\n    font-size: 1.7rem;\n    font-weight: 600;\n}\n\n.file-gallery-item-copy {\n    margin-right: 2.2rem;\n}\n\n.file-gallery-item-type {\n    position: absolute;\n    top: 1rem;\n    right: 1rem;\n    font-size: 2.5rem;\n    text-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.1);\n}\n\n\n.file-gallery-image {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n/*\n\nThe following code will only run if your browser supports CSS grid.\n\nRemove or comment-out the code block below to see how the browser will fall-back to flexbox & floated styling. \n\n*/\n\n@supports (display: grid) {\n\n    .files-gallery {\n        display: grid;\n        grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));\n        grid-gap: 2rem;\n    }\n\n    .file-gallery-item,\n    .files-gallery {\n        width: auto;\n        margin: 0;\n    }\n}\n\n@media screen and (max-width: 630px) {\n    .files-parent-container {\n        min-width: 320px;\n    }\n\n    .files-gallery {\n        margin: 0 10px 0 10px;\n    }\n\n    .file-gallery-item {\n        width: 300px;\n        margin: 0.5rem;\n    }\n}\n"],sourceRoot:""}]);const a=l},"./node_modules/css-loader/dist/runtime/api.js":n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,i,r){"string"==typeof n&&(n=[[null,n,void 0]]);var l={};if(o)for(var a=0;a<this.length;a++){var A=this[a][0];null!=A&&(l[A]=!0)}for(var s=0;s<n.length;s++){var d=[].concat(n[s]);o&&l[d[0]]||(void 0!==r&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=r),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),i&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=i):d[4]="".concat(i)),e.push(d))}},e}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),i="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),r="/*# ".concat(i," */");return[e].concat([r]).join("\n")}return[e].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var r={},l=[],a=0;a<n.length;a++){var A=n[a],s=o.base?A[0]+o.base:A[0],d=r[s]||0,p="".concat(s," ").concat(d);r[s]=d+1;var c=t(p),u={css:A[1],media:A[2],sourceMap:A[3],supports:A[4],layer:A[5]};if(-1!==c)e[c].references++,e[c].updater(u);else{var m=i(u,o);o.byIndex=a,e.splice(a,0,{identifier:p,updater:m,references:1})}l.push(p)}return l}function i(n,e){var t=e.domAPI(e);t.update(n);return function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,i){var r=o(n=n||[],i=i||{});return function(n){n=n||[];for(var l=0;l<r.length;l++){var a=t(r[l]);e[a].references--}for(var A=o(n,i),s=0;s<r.length;s++){var d=t(r[s]);0===e[d].references&&(e[d].updater(),e.splice(d,1))}r=A}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var i=void 0!==t.layer;i&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,i&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var r=t.sourceMap;r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}},e={};function t(o){var i=e[o];if(void 0!==i)return i.exports;var r=e[o]={id:o,exports:{}};return n[o](r,r.exports,t),r.exports}t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},t.nc=void 0;var o={};(()=>{t.r(o),t.d(o,{default:()=>g});var n=t("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),e=t.n(n),i=t("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),r=t.n(i),l=t("./node_modules/style-loader/dist/runtime/insertBySelector.js"),a=t.n(l),A=t("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),s=t.n(A),d=t("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),p=t.n(d),c=t("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),u=t.n(c),m=t("./node_modules/css-loader/dist/cjs.js!./app/view/admin/misc-files/misc-file-list.css"),f={};f.styleTagTransform=u(),f.setAttributes=s(),f.insert=a().bind(null,"head"),f.domAPI=r(),f.insertStyleElement=p();e()(m.default,f);const g=m.default&&m.default.locals?m.default.locals:void 0})()})();
//# sourceMappingURL=miscFilesListAdminPageStyles.js.map