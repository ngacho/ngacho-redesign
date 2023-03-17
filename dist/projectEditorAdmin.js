/*! For license information please see projectEditorAdmin.js.LICENSE.txt */
(()=>{"use strict";var e={"./app/controller/edit-project-controller.js":(e,t,s)=>{s.r(t),s.d(t,{EditProjectController:()=>o});class o{constructor(e,t){this.model=t,this.view=e,this.projectId="",this.init()}init(){let e=decodeURI(location.search);this.projectId=e.slice(1),this.projectId?(this.fetchProject(this.projectId),this.view.bindHandlePublishProject(this.handlePublishEditedProject)):this.view.bindHandlePublishProject(this.handlePublishNewProject)}handlePublishNewProject=async(e,t)=>this.model.uploadNewProject(e,t);handlePublishEditedProject=async(e,t)=>e?this.model.uploadUpdatedProjectWithFile(e,t):this.model.uploadUpdatedProjectObjectWithoutFile(t);fetchProject(e){this.model.fetchSingleProject(e).then((e=>this.view.setUpProject(e))).catch((e=>console.log(e)))}}},"./app/model/base-models/base-model.js":(e,t,s)=>{s.r(t),s.d(t,{BaseModel:()=>o});class o{constructor(e){this.baseUrl=e}async getList(){return new Promise(((e,t)=>{fetch(this.baseUrl,{credentials:"include"}).then((s=>{Promise.all([s.json(),s.status]).then((([s,o])=>{200===o?e(s):(console.log(err),t(`Failed with response ${o}`))})).catch((e=>{console.log(e),t(`Failed response: ${e}`)}))})).catch((e=>{console.log(e),t("Failed to fetch")}))}))}async getListByTag(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/tags/${encodeURIComponent(e)}`).then((e=>{Promise.all([e.json(),e.status]).then((([e,o])=>{200===o?t(e):s(`Failed with response ${o}`)})).catch((e=>{s(`Failed response: ${e}`)}))})).catch((e=>s("Failed to fetch")))}))}async getListItemById(e,t){return new Promise(((s,o)=>{fetch(`${this.baseUrl}/${e}/${t}`,{credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,t])=>{200===t?s(e):o(`Failed with response ${t}`)})).catch((e=>{o("Failed response")}))})).catch((()=>o("Failed to fetch id")))}))}async createItem(e){const t={doc:e},s={method:"POST",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((e,t)=>{fetch(this.baseUrl,s).then((s=>{Promise.all([s.text(),s.status]).then((([s,o])=>{200===o?e("Success"):t(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async createFileItem(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const o={method:"POST",credentials:"include",body:s};return new Promise(((e,t)=>{fetch(this.baseUrl,o).then((s=>{Promise.all([s.text(),s.status]).then((([s,o])=>{200===o?e("Success"):t(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async updateFileItemObject(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const o={method:"PUT",body:s,credentials:"include"};return new Promise(((e,s)=>{fetch(`${this.baseUrl}/${t.id}`,o).then((t=>{Promise.all([t.text(),t.status]).then((([t,o])=>{200===o?e("Success"):s(`Failed with response ${o}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),s("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),s("Failed response.")}))}))}async updateItem(e){const t={doc:e},s={method:"PUT",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((t,o)=>{fetch(`${this.baseUrl}/${e.id}`,s).then((e=>{Promise.all([e.text(),e.status]).then((([e,s])=>{200===s?t("Success"):(console.error(`ERROR LEVEL 2: ${e}`),o(`Failed with response ${s}`))})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),o("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),o("Failed response.")}))}))}async updateItemStatus(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/set-active/${e}`,{method:"PUT",credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,o])=>{200===o?t("Success"):s(`Failed with response ${o}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed")}))}))}async deleteItem(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/${e}`,{method:"DELETE",credentials:"include"}).then((e=>{Promise.all([e.text(),e.status]).then((([e,o])=>{200===o?t("Success"):s(`Failed with response ${o}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed to delete text")}))}))}}},"./app/model/base-models/projects-model.js":(e,t,s)=>{s.r(t),s.d(t,{ProjectBaseModel:()=>r});var o=s("./app/model/base-models/base-model.js");class r{constructor(){this.baseModel=new o.BaseModel("https://api.ngacho.com/database/projects")}async fetchProjects(){return this.baseModel.getList()}async fetchProjectById(e,t=!1){return this.baseModel.getListItemById(e,t)}async deleteProject(e){return this.baseModel.deleteItem(e)}async updateProjectWithFile(e,t){return this.baseModel.updateFileItemObject(e,t)}async updateProject(e){return this.baseModel.updateItem(e)}async publishProject(e,t){return this.baseModel.createFileItem(e,t)}}},"./app/model/edit-project-model.js":(e,t,s)=>{s.r(t),s.d(t,{EditProjectModel:()=>r});var o=s("./app/model/base-models/projects-model.js");class r extends o.ProjectBaseModel{constructor(){super()}async uploadNewProject(e,t){return await this.publishProject(e,t)}async fetchSingleProject(e){return await this.fetchProjectById(e)}async uploadUpdatedProjectWithFile(e,t){return await this.updateProjectWithFile(e,t)}async uploadUpdatedProjectObjectWithoutFile(e){return await this.updateProject(e)}}},"./app/view/projects/admin/edit-project-view.js":(e,t,s)=>{s.r(t),s.d(t,{EditProjectView:()=>o});class o{constructor(){this.add_projects_wrapper=document.querySelector(".add_projects_wrapper"),this.projectForm=document.querySelector(".project-details-form"),this.uploadImageInput=document.getElementById("image-upload-input"),this.projectTitleInput=document.getElementById("project-title-input"),this.projectLanguagesInput=document.getElementById("project-languages-input"),this.moreInfoUrl=document.getElementById("project-more-info-url"),this.postProjectButton=document.getElementById("post-project-button"),this.validate(),this.projectTitleInput.addEventListener("input",(()=>{this.validate()})),this.projectLanguagesInput.addEventListener("input",(()=>{this.validate()})),this.moreInfoUrl.addEventListener("input",(()=>{this.validate()}))}validate(){0!=this.projectTitleInput.value.length&&0!=this.projectLanguagesInput.value.length&&0!=this.moreInfoUrl.value.length?this.postProjectButton.disabled=!1:this.postProjectButton.disabled=!0}bindHandlePublishProject(e){let t=this.uploadImageInput,s=null;t.addEventListener("change",(()=>{if(t.files&&t.files[0]){var e=new FileReader;e.onload=function(e){document.getElementById("project-cover").setAttribute("src",e.target.result)},s=t.files[0],e.readAsDataURL(s)}})),this.postProjectButton.addEventListener("click",(()=>{var t={id:decodeURI(location.search).slice(1),title:this.projectTitleInput.value,projectLanguages:this.projectLanguagesInput.value,projectExtraInfoUrl:this.moreInfoUrl.value};e(s,t).then((e=>{this.resetForm()})).catch((e=>{console.log("error "+e)}))}))}setUpProject(e){var t=e.projectExtraInfoUrl,s=e.projectLanguages,o=e.publicUrl,r=e.id;document.getElementById("project-cover").setAttribute("src",o),this.projectTitleInput.value=r.substr(0,r.length-5),this.projectLanguagesInput.value=s,this.moreInfoUrl.value=t,this.validate()}resetForm(){return this.projectForm.submit(),!1}}}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,s),a.exports}s.d=(e,t)=>{for(var o in t)s.o(t,o)&&!s.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};(()=>{s.r(o);var e=s("./app/controller/edit-project-controller.js"),t=s("./app/view/projects/admin/edit-project-view.js"),r=s("./app/model/edit-project-model.js");new e.EditProjectController(new t.EditProjectView,new r.EditProjectModel)})()})();
//# sourceMappingURL=projectEditorAdmin.js.map