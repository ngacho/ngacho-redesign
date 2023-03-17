/*! For license information please see blog.js.LICENSE.txt */
(()=>{"use strict";var e={"./app/controller/blog-list-controller.js":(e,t,s)=>{s.r(t),s.d(t,{BlogListController:()=>o});class o{constructor(e,t){this.model=e,this.view=t,this.init()}init(){let e=decodeURI(location.search).slice(1);(e?this.model.getBlogListByTag(e):this.model.getBlogList()).then((e=>{this.onBlogListChanged(e)})).catch((e=>{console.error(e)}))}onBlogListChanged=e=>{this.view.displayBlogs(e)}}},"./app/model/base-models/base-model.js":(e,t,s)=>{s.r(t),s.d(t,{BaseModel:()=>o});class o{constructor(e){this.baseUrl=e}async getList(){return new Promise(((e,t)=>{fetch(this.baseUrl,{credentials:"include"}).then((s=>{Promise.all([s.json(),s.status]).then((([s,o])=>{200===o?e(s):(console.log(err),t(`Failed with response ${o}`))})).catch((e=>{console.log(e),t(`Failed response: ${e}`)}))})).catch((e=>{console.log(e),t("Failed to fetch")}))}))}async getListByTag(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/tags/${encodeURIComponent(e)}`).then((e=>{Promise.all([e.json(),e.status]).then((([e,o])=>{200===o?t(e):s(`Failed with response ${o}`)})).catch((e=>{s(`Failed response: ${e}`)}))})).catch((e=>s("Failed to fetch")))}))}async getListItemById(e,t){return new Promise(((s,o)=>{fetch(`${this.baseUrl}/${e}/${t}`,{credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,t])=>{200===t?s(e):o(`Failed with response ${t}`)})).catch((e=>{o("Failed response")}))})).catch((()=>o("Failed to fetch id")))}))}async createItem(e){const t={doc:e},s={method:"POST",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((e,t)=>{fetch(this.baseUrl,s).then((s=>{Promise.all([s.text(),s.status]).then((([s,o])=>{200===o?e("Success"):t(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async createFileItem(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const o={method:"POST",credentials:"include",body:s};return new Promise(((e,t)=>{fetch(this.baseUrl,o).then((s=>{Promise.all([s.text(),s.status]).then((([s,o])=>{200===o?e("Success"):t(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async updateFileItemObject(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const o={method:"PUT",body:s,credentials:"include"};return new Promise(((e,s)=>{fetch(`${this.baseUrl}/${t.id}`,o).then((t=>{Promise.all([t.text(),t.status]).then((([t,o])=>{200===o?e("Success"):s(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),s("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),s("Failed response.")}))}))}async updateItem(e){const t={doc:e},s={method:"PUT",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((t,o)=>{fetch(`${this.baseUrl}/${e.id}`,s).then((e=>{Promise.all([e.text(),e.status]).then((([e,s])=>{200===s?t("Success"):(console.error(`ERROR LEVEL 2: ${e}`),o(`Failed with response ${s}`))})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),o("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),o("Failed response.")}))}))}async updateItemStatus(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/set-active/${e}`,{method:"PUT",credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,o])=>{200===o?t("Success"):s(`Failed with response ${o}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed")}))}))}async deleteItem(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/${e}`,{method:"DELETE",credentials:"include"}).then((e=>{Promise.all([e.text(),e.status]).then((([e,o])=>{200===o?t("Success"):s(`Failed with response ${o}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed to delete text")}))}))}}},"./app/model/base-models/blog-model.js":(e,t,s)=>{s.r(t),s.d(t,{BlogModel:()=>a});var o=s("./app/model/base-models/base-model.js");class a{constructor(){this.baseModel=new o.BaseModel("https://api.ngacho.com/database/blogs")}async addBlog(e){return this.baseModel.createItem(e)}async editBlog(e){return this.baseModel.updateItem(e)}async getBlogs(){return this.baseModel.getList()}async getBlog(e,t=!1){return this.baseModel.getListItemById(e,t)}async deleteBlogById(e){return this.baseModel.deleteItem(e)}async getBlogsByTags(e){return this.baseModel.getListByTag(e)}}},"./app/model/blog-list-model.js":(e,t,s)=>{s.r(t),s.d(t,{BlogListModel:()=>a});var o=s("./app/model/base-models/blog-model.js");class a extends o.BlogModel{constructor(){super(),this.blogList=[],this.taggedBlogList=[]}async getBlogList(){return await this.getBlogs()}async getBlogListByTag(e){return await this.getBlogsByTags(e)}}},"./app/view/blog/blog-list-view.js":(e,t,s)=>{s.r(t),s.d(t,{BlogListView:()=>o});class o{constructor(){this.blogs_wrapper=document.querySelector(".blogs-wrapper")}displayBlogs(e){e&&e.forEach((e=>{var t=document.createElement("div");t.className="blog-item animate-entry";var s=document.createElement("time");s.className="post-date";var o=document.createTextNode(e.lastModified?e.lastModified:e.publishedAt);s.appendChild(o);var a=document.createElement("p");a.className="post-title";var l=document.createTextNode(e.title);a.appendChild(l);var r=document.createElement("p");r.className="post-short-desc";var n=document.createTextNode(e.descript);r.appendChild(n),a.addEventListener("click",(function(){location.href=`/blog-post/?${e.id}`})),r.onclick=function(){location.href=`/blog-post/?${e.id}`};var i=document.createElement("div");i.className="tags";var c=e.tags;for(const e of c){var d=document.createElement("a");d.className="tag",d.addEventListener("click",(function(){let t=encodeURIComponent(e);console.log(t),location.href=`/blog/tags/?${t}`}));var h=document.createTextNode(e);d.appendChild(h),i.appendChild(d)}t.appendChild(s),t.appendChild(a),t.appendChild(r),t.appendChild(i),this.blogs_wrapper.appendChild(t)}))}}}},t={};function s(o){var a=t[o];if(void 0!==a)return a.exports;var l=t[o]={exports:{}};return e[o](l,l.exports,s),l.exports}s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{s.r(o);var e=s("./app/model/blog-list-model.js"),t=s("./app/view/blog/blog-list-view.js");new(s("./app/controller/blog-list-controller.js").BlogListController)(new e.BlogListModel,new t.BlogListView)})()})();
//# sourceMappingURL=blog.js.map