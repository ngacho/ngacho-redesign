/*! For license information please see projectsListAdmin.js.LICENSE.txt */
(()=>{"use strict";var e={"./app/controller/view-project-controller.js":(e,t,s)=>{s.r(t),s.d(t,{ViewProjectController:()=>r});class r{constructor(e,t){this.model=e,this.view=t,this.init()}init(){this.model.getProjects().then((e=>{this.onProjectListChanged(e)})),this.view.bindDeleteProject(this.handleDeleteProject),this.view.bindEditProject(this.handleEditProject)}onProjectListChanged=e=>{this.view.displayProjects(e)};handleDeleteProject=async e=>this.model.deleteProjectFromDB(e);handleEditProject=async e=>this.model.editProject(e)}},"./app/model/base-models/base-model.js":(e,t,s)=>{s.r(t),s.d(t,{BaseModel:()=>r});class r{constructor(e){this.baseUrl=e}async getList(){return new Promise(((e,t)=>{fetch(this.baseUrl,{credentials:"include"}).then((s=>{Promise.all([s.json(),s.status]).then((([s,r])=>{200===r?e(s):(console.log(err),t(`Failed with response ${r}`))})).catch((e=>{console.log(e),t(`Failed response: ${e}`)}))})).catch((e=>{console.log(e),t("Failed to fetch")}))}))}async getListByTag(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/tags/${encodeURIComponent(e)}`).then((e=>{Promise.all([e.json(),e.status]).then((([e,r])=>{200===r?t(e):s(`Failed with response ${r}`)})).catch((e=>{s(`Failed response: ${e}`)}))})).catch((e=>s("Failed to fetch")))}))}async getListItemById(e,t){return new Promise(((s,r)=>{fetch(`${this.baseUrl}/${e}/${t}`,{credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,t])=>{200===t?s(e):r(`Failed with response ${t}`)})).catch((e=>{r("Failed response")}))})).catch((()=>r("Failed to fetch id")))}))}async createItem(e){const t={doc:e},s={method:"POST",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((e,t)=>{fetch(this.baseUrl,s).then((s=>{Promise.all([s.text(),s.status]).then((([s,r])=>{200===r?e("Success"):t(`Failed with response ${r}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async createFileItem(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const r={method:"POST",credentials:"include",body:s};return new Promise(((e,t)=>{fetch(this.baseUrl,r).then((s=>{Promise.all([s.text(),s.status]).then((([s,r])=>{200===r?e("Success"):t(`Failed with response ${r}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async updateFileItemObject(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const r={method:"PUT",body:s,credentials:"include"};return new Promise(((e,s)=>{fetch(`${this.baseUrl}/${t.id}`,r).then((t=>{Promise.all([t.text(),t.status]).then((([t,r])=>{200===r?e("Success"):s(`Failed with response ${r}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),s("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),s("Failed response.")}))}))}async updateItem(e){const t={doc:e},s={method:"PUT",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((t,r)=>{fetch(`${this.baseUrl}/${e.id}`,s).then((e=>{Promise.all([e.text(),e.status]).then((([e,s])=>{200===s?t("Success"):(console.error(`ERROR LEVEL 2: ${e}`),r(`Failed with response ${s}`))})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),r("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),r("Failed response.")}))}))}async updateItemStatus(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/set-active/${e}`,{method:"PUT",credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,r])=>{200===r?t("Success"):s(`Failed with response ${r}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed")}))}))}async deleteItem(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/${e}`,{method:"DELETE",credentials:"include"}).then((e=>{Promise.all([e.text(),e.status]).then((([e,r])=>{200===r?t("Success"):s(`Failed with response ${r}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed to delete text")}))}))}}},"./app/model/base-models/projects-model.js":(e,t,s)=>{s.r(t),s.d(t,{ProjectBaseModel:()=>o});var r=s("./app/model/base-models/base-model.js");class o{constructor(){this.baseModel=new r.BaseModel("https://api.ngacho.com/database/projects")}async fetchProjects(){return this.baseModel.getList()}async fetchProjectById(e,t=!1){return this.baseModel.getListItemById(e,t)}async deleteProject(e){return this.baseModel.deleteItem(e)}async updateProjectWithFile(e,t){return this.baseModel.updateFileItemObject(e,t)}async updateProject(e){return this.baseModel.updateItem(e)}async publishProject(e,t){return this.baseModel.createFileItem(e,t)}}},"./app/model/view-project-model.js":(e,t,s)=>{s.r(t),s.d(t,{ViewProjectModel:()=>o});var r=s("./app/model/base-models/projects-model.js");class o extends r.ProjectBaseModel{constructor(){super()}async deleteProjectFromDB(e){return await this.deleteProject(e)}async getProjects(){return await this.fetchProjects()}}},"./app/view/projects/admin/view-project-view.js":(e,t,s)=>{s.r(t),s.d(t,{ViewProjectView:()=>r});class r{constructor(){this.projectGallery=document.querySelector(".project-gallery")}displayProjects(e){for(const d of e){const e=d.id,h=d.title,p=d.publicUrl;var t=document.createElement("div");t.id=e,t.className="project-gallery-item",t.tabIndex=0;var s=document.createElement("figure"),r=document.createElement("img");r.className="project-gallery-image",r.src=p,r.alt=`photo of ${h}`,s.appendChild(r);var o=document.createElement("div");o.className="project-gallery-item-actions";var a=document.createElement("ul"),c=document.createElement("li");c.className="project-gallery-item-edit";var l=document.createElement("i");l.className=`fas fa-pen ${d.projectCoverTitle}`,l.id=`edit ${e}`,l.ariaHidden=!0,c.appendChild(l);var n=document.createElement("li");n.className="project-gallery-item-delete";var i=document.createElement("i");i.className=`fas fa-trash ${d.projectCoverTitle}`,i.id=`delete ${e}`,i.ariaHidden=!0,n.appendChild(i),a.appendChild(c),a.appendChild(n),o.appendChild(a),t.appendChild(s),t.appendChild(o),this.projectGallery.appendChild(t)}}bindDeleteProject(e){this.projectGallery.addEventListener("click",(t=>{if(t.target&&"I"==t.target.nodeName&&t.target.className.includes("fas fa-trash")){t.target.className.replace("fas fa-trash","");const s=t.target.id.replace("delete ","");t.target.parentNode.parentNode.parentNode.parentNode.children[0].children[0].src;e(s).then((e=>{const t=document.getElementById(s);t.classList.toggle("hide"),setTimeout((()=>{t.remove()}),1500),console.log("deleted successfully")})).catch((e=>{console.log("Failed to delete"),console.log(e)}))}}))}bindEditProject(e){this.projectGallery.addEventListener("click",(e=>{if(e.target&&"I"==e.target.nodeName&&e.target.className.includes("fas fa-pen ")){const t=e.target.id.replace("edit ","");location.href=`/admin/edit-project/?${t}`}}))}}}},t={};function s(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={exports:{}};return e[r](a,a.exports,s),a.exports}s.d=(e,t)=>{for(var r in t)s.o(t,r)&&!s.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{s.r(r);var e=s("./app/view/projects/admin/view-project-view.js"),t=s("./app/controller/view-project-controller.js"),o=s("./app/model/view-project-model.js");new t.ViewProjectController(new o.ViewProjectModel,new e.ViewProjectView)})()})();
//# sourceMappingURL=projectsListAdmin.js.map