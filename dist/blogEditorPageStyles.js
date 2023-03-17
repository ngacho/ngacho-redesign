/*! For license information please see blogEditorPageStyles.js.LICENSE.txt */
(()=>{"use strict";var n={"./node_modules/css-loader/dist/cjs.js!./app/view/blog/admin/blog-editor.css":(n,e,t)=>{t.r(e),t.d(e,{default:()=>p});var o=t("./node_modules/css-loader/dist/runtime/sourceMaps.js"),r=t.n(o),i=t("./node_modules/css-loader/dist/runtime/api.js"),a=t.n(i),A=t("./node_modules/css-loader/dist/runtime/getUrl.js"),s=t.n(A),d=new URL(t("./images/graph-background.png"),t.b),l=a()(r());l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap);"]),l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap);"]),l.push([n.id,"@import url(https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap);"]);var c=s()(d);l.push([n.id,"body {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n.blog-heading-wrapper {\n    height: 120px;\n    text-align: center;\n    vertical-align: middle;\n    line-height: 120px;\n    background-image: url("+c+");\n    color: #03312E;\n}\n\nblockquote{\n    border-left: 5px solid #03312E;\n    padding-left: 1rem;\n    margin: 1rem 0;\n    font-style: italic;\n}\n\ntextarea::-webkit-scrollbar {\n    width: 10px;\n}\n\ntextarea::-webkit-scrollbar-thumb {\n    background: rgba(3, 49, 46, 0.4);\n    border-radius: 10px;\n}\n\n.title,\n.article,\n.tags,\n.post-descript {\n    width: 100%;\n    height: auto;\n    outline: none;\n    font-size: 40px;\n    font-weight: 600;\n    color: rgba(3, 49, 46, 0.9);\n    resize: none;\n    border: none;\n    padding: 10px;\n    outline: 1px solid rgba(3, 49, 46, 0.2);\n    border-radius: 4px;\n    margin: 4px;\n}\n\n.title::placeholder,\n.article::placeholder {\n    color: rgba(3, 49, 46, 0.7);\n}\n\n.article {\n    height: 500px;\n    font-size: 20px;\n    margin-top: 10px;\n    line-height: 20px;\n    font-weight: 500;\n    margin-bottom: 1rem;\n    padding-bottom: 100px;\n    white-space: pre-wrap;\n}\n\n.tags {\n    font-size: 0.8rem;\n    line-height: 0.8rem;\n    font-weight: 100;\n    white-space: pre-wrap;\n}\n\n.post-descript {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-size: 1rem;\n    line-height: 1.2rem;\n    font-weight: 200;\n    white-space: pre-wrap;\n}\n\n.blog-options {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    z-index: 9;\n    display: table-cell;\n    width: auto;\n    transition: opacity 0.5s linear;\n}\n\n.btn {\n    border: none;\n    outline: none;\n    cursor: pointer;\n    padding: 0.5rem;\n    margin: 0 20rem 1.5rem 20rem;\n    border-radius: 3px;\n    font-size: 20px;\n    background: rgba(3, 49, 46, 1);\n    color: #fff;\n}\n\n.blog-editor-wrapper {\n    display: grid;\n    column-gap: 20px;\n    height: 100%;\n    margin: 10px;\n    grid-template-columns: 2fr 1fr;\n}\n\n.blog-preview-container {\n    height: calc(100vh - 5rem);\n    overflow-y: scroll;\n}\n\n.blog-content{\n    overflow-y: scroll;   \n}\n\n.blog-post{\n    overflow-y: scroll;\n}\n\n.katex{\n    display: table;\n    margin: 0 auto;\n}\n\n.blog-preview-container > .blog-content > article > a{\n    text-decoration-line: underline;\n    text-decoration-style: dashed;\n    text-decoration-color: #03312E;\n    font-weight: 700;\n    text-decoration-thickness: 1.5px;\n    color: #03312E;\n}\n\n.blog-preview-container > .blog-content > article > pre {\n    background: #f0f0f0;\n    margin: 1em;\n    padding:0.5em;\n    border: 1px solid #808080;\n  }\n\n\n\n/* The snackbar - position it at the bottom and in the middle of the screen */\n#snackbar {\n    visibility: hidden;\n    /* Hidden by default. Visible on click */\n    min-width: 250px;\n    /* Set a default minimum width */\n    margin-left: -125px;\n    /* Divide value of min-width by 2 */\n    background-color: rgba(3, 49, 46, 1);\n    /* Black background color */\n    color: #fff;\n    /* White text color */\n    text-align: center;\n    /* Centered text */\n    border-radius: 2px;\n    /* Rounded borders */\n    padding: 16px;\n    /* Padding */\n    position: fixed;\n    /* Sit on top of the screen */\n    z-index: 20;\n    /* Add a z-index if needed */\n    left: 50%;\n    /* Center the snackbar */\n    bottom: 3rem;\n    /* 30px from the bottom */\n}\n\n/* Show the snackbar when clicking on a button (class added with JavaScript) */\n#snackbar.show {\n    visibility: visible;\n    /* Show the snackbar */\n    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.\n    However, delay the fade out process for 2.5 seconds */\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n/* Animations to fade the snackbar in and out */\n@-webkit-keyframes fadein {\n    from {\n        bottom: 0;\n        opacity: 0;\n    }\n\n    to {\n        bottom: 3rem;\n        opacity: 1;\n    }\n}\n\n@keyframes fadein {\n    from {\n        bottom: 0;\n        opacity: 0;\n    }\n\n    to {\n        bottom: 3rem;\n        opacity: 1;\n    }\n}\n\n@-webkit-keyframes fadeout {\n    from {\n        bottom: 3rem;\n        opacity: 1;\n    }\n\n    to {\n        bottom: 0;\n        opacity: 0;\n    }\n}\n\n@keyframes fadeout {\n    from {\n        bottom: 3rem;\n        opacity: 1;\n    }\n\n    to {\n        bottom: 0;\n        opacity: 0;\n    }\n}","",{version:3,sources:["webpack://./app/view/blog/admin/blog-editor.css"],names:[],mappings:"AAIA;IACI,aAAa;IACb,aAAa;IACb,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,kBAAkB;IAClB,sBAAsB;IACtB,kBAAkB;IAClB,yDAAgE;IAChE,cAAc;AAClB;;AAEA;IACI,8BAA8B;IAC9B,kBAAkB;IAClB,cAAc;IACd,kBAAkB;AACtB;;AAEA;IACI,WAAW;AACf;;AAEA;IACI,gCAAgC;IAChC,mBAAmB;AACvB;;AAEA;;;;IAII,WAAW;IACX,YAAY;IACZ,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,2BAA2B;IAC3B,YAAY;IACZ,YAAY;IACZ,aAAa;IACb,uCAAuC;IACvC,kBAAkB;IAClB,WAAW;AACf;;AAEA;;IAEI,2BAA2B;AAC/B;;AAEA;IACI,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,iBAAiB;IACjB,gBAAgB;IAChB,mBAAmB;IACnB,qBAAqB;IACrB,qBAAqB;AACzB;;AAEA;IACI,iBAAiB;IACjB,mBAAmB;IACnB,gBAAgB;IAChB,qBAAqB;AACzB;;AAEA;IACI,gBAAgB;IAChB,mBAAmB;IACnB,eAAe;IACf,mBAAmB;IACnB,gBAAgB;IAChB,qBAAqB;AACzB;;AAEA;IACI,eAAe;IACf,SAAS;IACT,OAAO;IACP,UAAU;IACV,mBAAmB;IACnB,WAAW;IACX,+BAA+B;AACnC;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,eAAe;IACf,4BAA4B;IAC5B,kBAAkB;IAClB,eAAe;IACf,8BAA8B;IAC9B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,gBAAgB;IAChB,YAAY;IACZ,YAAY;IACZ,8BAA8B;AAClC;;AAEA;IACI,0BAA0B;IAC1B,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,cAAc;IACd,cAAc;AAClB;;AAEA;IACI,+BAA+B;IAC/B,6BAA6B;IAC7B,8BAA8B;IAC9B,gBAAgB;IAChB,gCAAgC;IAChC,cAAc;AAClB;;AAEA;IACI,mBAAmB;IACnB,WAAW;IACX,aAAa;IACb,yBAAyB;EAC3B;;;;AAIF,6EAA6E;AAC7E;IACI,kBAAkB;IAClB,wCAAwC;IACxC,gBAAgB;IAChB,gCAAgC;IAChC,mBAAmB;IACnB,mCAAmC;IACnC,oCAAoC;IACpC,2BAA2B;IAC3B,WAAW;IACX,qBAAqB;IACrB,kBAAkB;IAClB,kBAAkB;IAClB,kBAAkB;IAClB,oBAAoB;IACpB,aAAa;IACb,YAAY;IACZ,eAAe;IACf,6BAA6B;IAC7B,WAAW;IACX,4BAA4B;IAC5B,SAAS;IACT,wBAAwB;IACxB,YAAY;IACZ,yBAAyB;AAC7B;;AAEA,8EAA8E;AAC9E;IACI,mBAAmB;IACnB,sBAAsB;IACtB;yDACqD;IACrD,iDAAiD;IACjD,yCAAyC;AAC7C;;AAEA,+CAA+C;AAC/C;IACI;QACI,SAAS;QACT,UAAU;IACd;;IAEA;QACI,YAAY;QACZ,UAAU;IACd;AACJ;;AAEA;IACI;QACI,SAAS;QACT,UAAU;IACd;;IAEA;QACI,YAAY;QACZ,UAAU;IACd;AACJ;;AAEA;IACI;QACI,YAAY;QACZ,UAAU;IACd;;IAEA;QACI,SAAS;QACT,UAAU;IACd;AACJ;;AAEA;IACI;QACI,YAAY;QACZ,UAAU;IACd;;IAEA;QACI,SAAS;QACT,UAAU;IACd;AACJ",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap');\n\nbody {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n}\n\n.blog-heading-wrapper {\n    height: 120px;\n    text-align: center;\n    vertical-align: middle;\n    line-height: 120px;\n    background-image: url('../../../../images/graph-background.png');\n    color: #03312E;\n}\n\nblockquote{\n    border-left: 5px solid #03312E;\n    padding-left: 1rem;\n    margin: 1rem 0;\n    font-style: italic;\n}\n\ntextarea::-webkit-scrollbar {\n    width: 10px;\n}\n\ntextarea::-webkit-scrollbar-thumb {\n    background: rgba(3, 49, 46, 0.4);\n    border-radius: 10px;\n}\n\n.title,\n.article,\n.tags,\n.post-descript {\n    width: 100%;\n    height: auto;\n    outline: none;\n    font-size: 40px;\n    font-weight: 600;\n    color: rgba(3, 49, 46, 0.9);\n    resize: none;\n    border: none;\n    padding: 10px;\n    outline: 1px solid rgba(3, 49, 46, 0.2);\n    border-radius: 4px;\n    margin: 4px;\n}\n\n.title::placeholder,\n.article::placeholder {\n    color: rgba(3, 49, 46, 0.7);\n}\n\n.article {\n    height: 500px;\n    font-size: 20px;\n    margin-top: 10px;\n    line-height: 20px;\n    font-weight: 500;\n    margin-bottom: 1rem;\n    padding-bottom: 100px;\n    white-space: pre-wrap;\n}\n\n.tags {\n    font-size: 0.8rem;\n    line-height: 0.8rem;\n    font-weight: 100;\n    white-space: pre-wrap;\n}\n\n.post-descript {\n    margin-top: 10px;\n    margin-bottom: 10px;\n    font-size: 1rem;\n    line-height: 1.2rem;\n    font-weight: 200;\n    white-space: pre-wrap;\n}\n\n.blog-options {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    z-index: 9;\n    display: table-cell;\n    width: auto;\n    transition: opacity 0.5s linear;\n}\n\n.btn {\n    border: none;\n    outline: none;\n    cursor: pointer;\n    padding: 0.5rem;\n    margin: 0 20rem 1.5rem 20rem;\n    border-radius: 3px;\n    font-size: 20px;\n    background: rgba(3, 49, 46, 1);\n    color: #fff;\n}\n\n.blog-editor-wrapper {\n    display: grid;\n    column-gap: 20px;\n    height: 100%;\n    margin: 10px;\n    grid-template-columns: 2fr 1fr;\n}\n\n.blog-preview-container {\n    height: calc(100vh - 5rem);\n    overflow-y: scroll;\n}\n\n.blog-content{\n    overflow-y: scroll;   \n}\n\n.blog-post{\n    overflow-y: scroll;\n}\n\n.katex{\n    display: table;\n    margin: 0 auto;\n}\n\n.blog-preview-container > .blog-content > article > a{\n    text-decoration-line: underline;\n    text-decoration-style: dashed;\n    text-decoration-color: #03312E;\n    font-weight: 700;\n    text-decoration-thickness: 1.5px;\n    color: #03312E;\n}\n\n.blog-preview-container > .blog-content > article > pre {\n    background: #f0f0f0;\n    margin: 1em;\n    padding:0.5em;\n    border: 1px solid #808080;\n  }\n\n\n\n/* The snackbar - position it at the bottom and in the middle of the screen */\n#snackbar {\n    visibility: hidden;\n    /* Hidden by default. Visible on click */\n    min-width: 250px;\n    /* Set a default minimum width */\n    margin-left: -125px;\n    /* Divide value of min-width by 2 */\n    background-color: rgba(3, 49, 46, 1);\n    /* Black background color */\n    color: #fff;\n    /* White text color */\n    text-align: center;\n    /* Centered text */\n    border-radius: 2px;\n    /* Rounded borders */\n    padding: 16px;\n    /* Padding */\n    position: fixed;\n    /* Sit on top of the screen */\n    z-index: 20;\n    /* Add a z-index if needed */\n    left: 50%;\n    /* Center the snackbar */\n    bottom: 3rem;\n    /* 30px from the bottom */\n}\n\n/* Show the snackbar when clicking on a button (class added with JavaScript) */\n#snackbar.show {\n    visibility: visible;\n    /* Show the snackbar */\n    /* Add animation: Take 0.5 seconds to fade in and out the snackbar.\n    However, delay the fade out process for 2.5 seconds */\n    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;\n    animation: fadein 0.5s, fadeout 0.5s 2.5s;\n}\n\n/* Animations to fade the snackbar in and out */\n@-webkit-keyframes fadein {\n    from {\n        bottom: 0;\n        opacity: 0;\n    }\n\n    to {\n        bottom: 3rem;\n        opacity: 1;\n    }\n}\n\n@keyframes fadein {\n    from {\n        bottom: 0;\n        opacity: 0;\n    }\n\n    to {\n        bottom: 3rem;\n        opacity: 1;\n    }\n}\n\n@-webkit-keyframes fadeout {\n    from {\n        bottom: 3rem;\n        opacity: 1;\n    }\n\n    to {\n        bottom: 0;\n        opacity: 0;\n    }\n}\n\n@keyframes fadeout {\n    from {\n        bottom: 3rem;\n        opacity: 1;\n    }\n\n    to {\n        bottom: 0;\n        opacity: 0;\n    }\n}"],sourceRoot:""}]);const p=l},"./node_modules/css-loader/dist/runtime/api.js":n=>{n.exports=function(n){var e=[];return e.toString=function(){return this.map((function(e){var t="",o=void 0!==e[5];return e[4]&&(t+="@supports (".concat(e[4],") {")),e[2]&&(t+="@media ".concat(e[2]," {")),o&&(t+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),t+=n(e),o&&(t+="}"),e[2]&&(t+="}"),e[4]&&(t+="}"),t})).join("")},e.i=function(n,t,o,r,i){"string"==typeof n&&(n=[[null,n,void 0]]);var a={};if(o)for(var A=0;A<this.length;A++){var s=this[A][0];null!=s&&(a[s]=!0)}for(var d=0;d<n.length;d++){var l=[].concat(n[d]);o&&a[l[0]]||(void 0!==i&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=i),t&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=t):l[2]=t),r&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=r):l[4]="".concat(r)),e.push(l))}},e}},"./node_modules/css-loader/dist/runtime/getUrl.js":n=>{n.exports=function(n,e){return e||(e={}),n?(n=String(n.__esModule?n.default:n),/^['"].*['"]$/.test(n)&&(n=n.slice(1,-1)),e.hash&&(n+=e.hash),/["'() \t\n]|(%20)/.test(n)||e.needQuotes?'"'.concat(n.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):n):n}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":n=>{n.exports=function(n){var e=n[1],t=n[3];if(!t)return e;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),i="/*# ".concat(r," */");return[e].concat([i]).join("\n")}return[e].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":n=>{var e=[];function t(n){for(var t=-1,o=0;o<e.length;o++)if(e[o].identifier===n){t=o;break}return t}function o(n,o){for(var i={},a=[],A=0;A<n.length;A++){var s=n[A],d=o.base?s[0]+o.base:s[0],l=i[d]||0,c="".concat(d," ").concat(l);i[d]=l+1;var p=t(c),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)e[p].references++,e[p].updater(m);else{var u=r(m,o);o.byIndex=A,e.splice(A,0,{identifier:c,updater:u,references:1})}a.push(c)}return a}function r(n,e){var t=e.domAPI(e);t.update(n);return function(e){if(e){if(e.css===n.css&&e.media===n.media&&e.sourceMap===n.sourceMap&&e.supports===n.supports&&e.layer===n.layer)return;t.update(n=e)}else t.remove()}}n.exports=function(n,r){var i=o(n=n||[],r=r||{});return function(n){n=n||[];for(var a=0;a<i.length;a++){var A=t(i[a]);e[A].references--}for(var s=o(n,r),d=0;d<i.length;d++){var l=t(i[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}i=s}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":n=>{var e={};n.exports=function(n,t){var o=function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(n){t=null}e[n]=t}return e[n]}(n);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":n=>{n.exports=function(n){var e=document.createElement("style");return n.setAttributes(e,n.attributes),n.insert(e,n.options),e}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(n,e,t)=>{n.exports=function(n){var e=t.nc;e&&n.setAttribute("nonce",e)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":n=>{n.exports=function(n){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=n.insertStyleElement(n);return{update:function(t){!function(n,e,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleTagTransform(o,n,e.options)}(e,n,t)},remove:function(){!function(n){if(null===n.parentNode)return!1;n.parentNode.removeChild(n)}(e)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":n=>{n.exports=function(n,e){if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}},"./images/graph-background.png":(n,e,t)=>{n.exports=t.p+"a45d61a34aa68be03dd3.png"}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={id:o,exports:{}};return n[o](i,i.exports,t),i.exports}t.m=n,t.n=n=>{var e=n&&n.__esModule?()=>n.default:()=>n;return t.d(e,{a:e}),e},t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(n){if("object"==typeof window)return window}}(),t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},(()=>{var n;t.g.importScripts&&(n=t.g.location+"");var e=t.g.document;if(!n&&e&&(e.currentScript&&(n=e.currentScript.src),!n)){var o=e.getElementsByTagName("script");o.length&&(n=o[o.length-1].src)}if(!n)throw new Error("Automatic publicPath is not supported in this browser");n=n.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=n})(),t.b=document.baseURI||self.location.href,t.nc=void 0;var o={};(()=>{t.r(o),t.d(o,{default:()=>g});var n=t("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),e=t.n(n),r=t("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),i=t.n(r),a=t("./node_modules/style-loader/dist/runtime/insertBySelector.js"),A=t.n(a),s=t("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),d=t.n(s),l=t("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),c=t.n(l),p=t("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),m=t.n(p),u=t("./node_modules/css-loader/dist/cjs.js!./app/view/blog/admin/blog-editor.css"),f={};f.styleTagTransform=m(),f.setAttributes=d(),f.insert=A().bind(null,"head"),f.domAPI=i(),f.insertStyleElement=c();e()(u.default,f);const g=u.default&&u.default.locals?u.default.locals:void 0})()})();
//# sourceMappingURL=blogEditorPageStyles.js.map