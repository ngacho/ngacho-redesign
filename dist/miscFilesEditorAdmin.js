/*! For license information please see miscFilesEditorAdmin.js.LICENSE.txt */
(()=>{"use strict";var e={"./app/controller/misc-file-editor-controller.js":(e,t,s)=>{s.r(t),s.d(t,{EditFileController:()=>i});class i{constructor(e,t){this.model=t,this.view=e,this.init()}init(){this.view.bindHandlePublishFile(this.handlePublishNewFile)}handlePublishNewFile=async(e,t)=>this.model.uploadNewFile(e,t)}},"./app/model/base-models/base-model.js":(e,t,s)=>{s.r(t),s.d(t,{BaseModel:()=>i});class i{constructor(e){this.baseUrl=e}async getList(){return new Promise(((e,t)=>{fetch(this.baseUrl,{credentials:"include"}).then((s=>{Promise.all([s.json(),s.status]).then((([s,i])=>{200===i?e(s):(console.log(err),t(`Failed with response ${i}`))})).catch((e=>{console.log(e),t(`Failed response: ${e}`)}))})).catch((e=>{console.log(e),t("Failed to fetch")}))}))}async getListByTag(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/tags/${encodeURIComponent(e)}`).then((e=>{Promise.all([e.json(),e.status]).then((([e,i])=>{200===i?t(e):s(`Failed with response ${i}`)})).catch((e=>{s(`Failed response: ${e}`)}))})).catch((e=>s("Failed to fetch")))}))}async getListItemById(e,t){return new Promise(((s,i)=>{fetch(`${this.baseUrl}/${e}/${t}`,{credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,t])=>{200===t?s(e):i(`Failed with response ${t}`)})).catch((e=>{i("Failed response")}))})).catch((()=>i("Failed to fetch id")))}))}async createItem(e){const t={doc:e},s={method:"POST",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((e,t)=>{fetch(this.baseUrl,s).then((s=>{Promise.all([s.text(),s.status]).then((([s,i])=>{200===i?e("Success"):t(`Failed with response ${i}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async createFileItem(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const i={method:"POST",credentials:"include",body:s};return new Promise(((e,t)=>{fetch(this.baseUrl,i).then((s=>{Promise.all([s.text(),s.status]).then((([s,i])=>{200===i?e("Success"):t(`Failed with response ${i}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),t("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),t("Failed response.")}))}))}async updateFileItemObject(e,t){const s=new FormData;s.append("file",e),s.append("doc",JSON.stringify(t));const i={method:"PUT",body:s,credentials:"include"};return new Promise(((e,s)=>{fetch(`${this.baseUrl}/${t.id}`,i).then((t=>{Promise.all([t.text(),t.status]).then((([t,i])=>{200===i?e("Success"):s(`Failed with response ${i}`)})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),s("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),s("Failed response.")}))}))}async updateItem(e){const t={doc:e},s={method:"PUT",headers:new Headers({"Content-Type":"application/json"}),credentials:"include",body:JSON.stringify(t)};return new Promise(((t,i)=>{fetch(`${this.baseUrl}/${e.id}`,s).then((e=>{Promise.all([e.text(),e.status]).then((([e,s])=>{200===s?t("Success"):(console.error(`ERROR LEVEL 2: ${e}`),i(`Failed with response ${s}`))})).catch((e=>{console.error(`ERROR LEVEL 2: ${e}`),i("Failed response")}))})).catch((e=>{console.error(`ERROR LEVEL 1: ${e}`),i("Failed response.")}))}))}async updateItemStatus(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/set-active/${e}`,{method:"PUT",credentials:"include"}).then((e=>{Promise.all([e.json(),e.status]).then((([e,i])=>{200===i?t("Success"):s(`Failed with response ${i}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed")}))}))}async deleteItem(e){return new Promise(((t,s)=>{fetch(`${this.baseUrl}/${e}`,{method:"DELETE",credentials:"include"}).then((e=>{Promise.all([e.text(),e.status]).then((([e,i])=>{200===i?t("Success"):s(`Failed with response ${i}`)})).catch((e=>{s("Failed response")}))})).catch((e=>{s("Failed to delete text")}))}))}}},"./app/model/base-models/misc-file-model.js":(e,t,s)=>{s.r(t),s.d(t,{MiscFileModel:()=>l});var i=s("./app/model/base-models/base-model.js");class l{constructor(){this.baseModel=new i.BaseModel("https://api.ngacho.com/database/miscalleneous-files")}async fetchMiscFiles(){return this.baseModel.getList()}async fetchMiscFileById(e,t=!1){return this.baseModel.getListItemById(e,t)}async deleteMiscFile(e){return this.baseModel.deleteItem(e)}async publishFile(e,t){return this.baseModel.createFileItem(e,t)}}},"./app/model/misc-file-editor-model.js":(e,t,s)=>{s.r(t),s.d(t,{EditFileModel:()=>l});var i=s("./app/model/base-models/misc-file-model.js");class l extends i.MiscFileModel{constructor(){super()}async uploadNewFile(e,t){return await this.publishFile(e,t)}}},"./app/view/admin/misc-files/misc-file-editor-view.js":(e,t,s)=>{s.r(t),s.d(t,{EditFileView:()=>i});class i{constructor(){this.add_files_wrapper=document.querySelector(".add-files-wrapper"),this.fileForm=document.querySelector(".file-details-form"),this.uploadImageInput=document.getElementById("image-upload-input"),this.fileTitleInput=document.getElementById("file-title-input"),this.postFileButton=document.getElementById("post-file-button"),this.validate(),this.fileTitleInput.addEventListener("input",(()=>{this.validate()}))}validate(){this.postFileButton.disabled=0==this.fileTitleInput.value.length}bindHandlePublishFile(e){let t=this.uploadImageInput,s=null;t.addEventListener("change",(()=>{if(t.files&&t.files[0]){var e=new FileReader;e.onload=function(e){document.getElementById("file-cover").setAttribute("src",e.target.result)},s=t.files[0],e.readAsDataURL(s)}})),this.postFileButton.addEventListener("click",(()=>{var t={title:this.fileTitleInput.value,type:s.type};e(s,t).then((e=>{this.resetForm()})).catch((e=>{console.log("error "+e)}))}))}resetForm(){return this.fileForm.submit(),!1}}}},t={};function s(i){var l=t[i];if(void 0!==l)return l.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,s),o.exports}s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{s.r(i);var e=s("./app/controller/misc-file-editor-controller.js"),t=s("./app/view/admin/misc-files/misc-file-editor-view.js"),l=s("./app/model/misc-file-editor-model.js");new e.EditFileController(new t.EditFileView,new l.EditFileModel)})()})();
//# sourceMappingURL=miscFilesEditorAdmin.js.map