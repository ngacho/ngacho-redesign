/*! For license information please see adminPageStyles.js.LICENSE.txt */
(()=>{"use strict";var e={"./node_modules/css-loader/dist/cjs.js!./app/view/admin/admin-home.css":(e,n,t)=>{t.r(n),t.d(n,{default:()=>i});var o=t("./node_modules/css-loader/dist/runtime/sourceMaps.js"),r=t.n(o),a=t("./node_modules/css-loader/dist/runtime/api.js"),s=t.n(a)()(r());s.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap);"]),s.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap);"]),s.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap);"]),s.push([e.id,".dash-board-container {\n    width: 80%;\n    height: calc(100vh - 5rem);\n    margin: auto;\n    margin-top: 1rem;\n    display: grid;\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 10px;\n}\n\n.action-card {\n    position: relative;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n    height: 180px;\n    outline: 1px solid rgba(3, 49, 46, 0.2);\n    overflow-wrap: break-word;\n    display: table;\n    overflow: hidden;\n    text-align: center;\n    margin: 20px;\n    transition: transform .2s;\n    color: #03312E;\n    width: 100%;\n}\n\n.action-card:hover {\n    cursor: pointer;\n    color: rgba(3, 49, 46, 1);\n    transform: scale(1.05);\n    cursor: pointer;\n}\n\n.action-details {\n    line-height: 140px;\n    display: table-cell;\n    vertical-align: middle;\n    background-color: #FFF;\n    padding: 20px;\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    position: absolute;\n    width: 100%;\n}\n\n@media only screen and (max-width: 960px) {\n    .dash-board-container {\n        width: 80%;\n        margin: auto;\n        display: grid;\n        grid-template-columns: 1fr;\n    }\n\n}","",{version:3,sources:["webpack://./app/view/admin/admin-home.css"],names:[],mappings:"AAIA;IACI,UAAU;IACV,0BAA0B;IAC1B,YAAY;IACZ,gBAAgB;IAChB,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,wBAAwB;IACxB,YAAY;IACZ,qBAAqB;IACrB,qCAAqC;IACrC,gBAAgB;AACpB;;AAEA;IACI,kBAAkB;IAClB,yCAAyC;IACzC,aAAa;IACb,uCAAuC;IACvC,yBAAyB;IACzB,cAAc;IACd,gBAAgB;IAChB,kBAAkB;IAClB,YAAY;IACZ,yBAAyB;IACzB,cAAc;IACd,WAAW;AACf;;AAEA;IACI,eAAe;IACf,yBAAyB;IACzB,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,kBAAkB;IAClB,mBAAmB;IACnB,sBAAsB;IACtB,sBAAsB;IACtB,aAAa;IACb,kBAAkB;IAClB,gBAAgB;IAChB,wBAAwB;IACxB,YAAY;IACZ,qBAAqB;IACrB,kBAAkB;IAClB,WAAW;AACf;;AAEA;IACI;QACI,UAAU;QACV,YAAY;QACZ,aAAa;QACb,0BAA0B;IAC9B;;AAEJ",sourcesContent:["@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Source+Code+Pro:wght@500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@300;500&display=swap');\n@import url('https://fonts.googleapis.com/css2?family=Poppins&family=Source+Code+Pro:wght@300;500&display=swap');\n\n.dash-board-container {\n    width: 80%;\n    height: calc(100vh - 5rem);\n    margin: auto;\n    margin-top: 1rem;\n    display: grid;\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    grid-template-columns: repeat(2, 1fr);\n    column-gap: 10px;\n}\n\n.action-card {\n    position: relative;\n    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);\n    height: 180px;\n    outline: 1px solid rgba(3, 49, 46, 0.2);\n    overflow-wrap: break-word;\n    display: table;\n    overflow: hidden;\n    text-align: center;\n    margin: 20px;\n    transition: transform .2s;\n    color: #03312E;\n    width: 100%;\n}\n\n.action-card:hover {\n    cursor: pointer;\n    color: rgba(3, 49, 46, 1);\n    transform: scale(1.05);\n    cursor: pointer;\n}\n\n.action-details {\n    line-height: 140px;\n    display: table-cell;\n    vertical-align: middle;\n    background-color: #FFF;\n    padding: 20px;\n    overflow-y: scroll;\n    /* IE and Edge */\n    -ms-overflow-style: none;\n    /* Firefox */\n    scrollbar-width: none;\n    position: absolute;\n    width: 100%;\n}\n\n@media only screen and (max-width: 960px) {\n    .dash-board-container {\n        width: 80%;\n        margin: auto;\n        display: grid;\n        grid-template-columns: 1fr;\n    }\n\n}"],sourceRoot:""}]);const i=s},"./node_modules/css-loader/dist/runtime/api.js":e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",o=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),o&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),o&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,o,r,a){"string"==typeof e&&(e=[[null,e,void 0]]);var s={};if(o)for(var i=0;i<this.length;i++){var l=this[i][0];null!=l&&(s[l]=!0)}for(var d=0;d<e.length;d++){var c=[].concat(e[d]);o&&s[c[0]]||(void 0!==a&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=a),t&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=t):c[2]=t),r&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=r):c[4]="".concat(r)),n.push(c))}},n}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":e=>{e.exports=function(e){var n=e[1],t=e[3];if(!t)return n;if("function"==typeof btoa){var o=btoa(unescape(encodeURIComponent(JSON.stringify(t)))),r="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o),a="/*# ".concat(r," */");return[n].concat([a]).join("\n")}return[n].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":e=>{var n=[];function t(e){for(var t=-1,o=0;o<n.length;o++)if(n[o].identifier===e){t=o;break}return t}function o(e,o){for(var a={},s=[],i=0;i<e.length;i++){var l=e[i],d=o.base?l[0]+o.base:l[0],c=a[d]||0,u="".concat(d," ").concat(c);a[d]=c+1;var p=t(u),A={css:l[1],media:l[2],sourceMap:l[3],supports:l[4],layer:l[5]};if(-1!==p)n[p].references++,n[p].updater(A);else{var m=r(A,o);o.byIndex=i,n.splice(i,0,{identifier:u,updater:m,references:1})}s.push(u)}return s}function r(e,n){var t=n.domAPI(n);t.update(e);return function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,r){var a=o(e=e||[],r=r||{});return function(e){e=e||[];for(var s=0;s<a.length;s++){var i=t(a[s]);n[i].references--}for(var l=o(e,r),d=0;d<a.length;d++){var c=t(a[d]);0===n[c].references&&(n[c].updater(),n.splice(c,1))}a=l}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":e=>{var n={};e.exports=function(e,t){var o=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!o)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");o.appendChild(t)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":e=>{e.exports=function(e){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var o="";t.supports&&(o+="@supports (".concat(t.supports,") {")),t.media&&(o+="@media ".concat(t.media," {"));var r=void 0!==t.layer;r&&(o+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),o+=t.css,r&&(o+="}"),t.media&&(o+="}"),t.supports&&(o+="}");var a=t.sourceMap;a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),n.styleTagTransform(o,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var a=n[o]={id:o,exports:{}};return e[o](a,a.exports,t),a.exports}t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.nc=void 0;var o={};(()=>{t.r(o),t.d(o,{default:()=>y});var e=t("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),n=t.n(e),r=t("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),a=t.n(r),s=t("./node_modules/style-loader/dist/runtime/insertBySelector.js"),i=t.n(s),l=t("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),d=t.n(l),c=t("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),u=t.n(c),p=t("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),A=t.n(p),m=t("./node_modules/css-loader/dist/cjs.js!./app/view/admin/admin-home.css"),f={};f.styleTagTransform=A(),f.setAttributes=d(),f.insert=i().bind(null,"head"),f.domAPI=a(),f.insertStyleElement=u();n()(m.default,f);const y=m.default&&m.default.locals?m.default.locals:void 0})()})();
//# sourceMappingURL=adminPageStyles.js.map