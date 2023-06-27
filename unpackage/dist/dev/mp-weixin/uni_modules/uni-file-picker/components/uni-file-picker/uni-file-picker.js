"use strict";var y=Object.defineProperty,F=Object.defineProperties;var _=Object.getOwnPropertyDescriptors;var c=Object.getOwnPropertySymbols;var b=Object.prototype.hasOwnProperty,x=Object.prototype.propertyIsEnumerable;var d=(e,t,i)=>t in e?y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,m=(e,t)=>{for(var i in t||(t={}))b.call(t,i)&&d(e,i,t[i]);if(c)for(var i of c(t))x.call(t,i)&&d(e,i,t[i]);return e},p=(e,t)=>F(e,_(t));var a=require("../../../../common/vendor.js"),g=require("./choose-and-upload-file.js"),u=require("./utils.js");const T=()=>"./upload-image.js",k=()=>"./upload-file.js",I={name:"uniFilePicker",components:{uploadImage:T,uploadFile:k},emits:["select","success","fail","progress","delete","update:modelValue","input"],props:{modelValue:{type:[Array,Object],default(){return[]}},disabled:{type:Boolean,default:!1},disablePreview:{type:Boolean,default:!1},delIcon:{type:Boolean,default:!0},autoUpload:{type:Boolean,default:!0},limit:{type:[Number,String],default:9},mode:{type:String,default:"grid"},fileMediatype:{type:String,default:"image"},fileExtname:{type:[Array,String],default(){return[]}},title:{type:String,default:""},listStyles:{type:Object,default(){return{border:!0,dividline:!0,borderStyle:{}}}},imageStyles:{type:Object,default(){return{width:"auto",height:"auto"}}},readonly:{type:Boolean,default:!1},returnType:{type:String,default:"array"},sizeType:{type:Array,default(){return["original","compressed"]}}},data(){return{files:[],localValue:[]}},watch:{modelValue:{handler(e,t){this.setValue(e,t)},immediate:!0}},computed:{filesList(){let e=[];return this.files.forEach(t=>{e.push(t)}),e},showType(){return this.fileMediatype==="image"?this.mode:"list"},limitLength(){return this.returnType==="object"||!this.limit?1:this.limit>=9?9:this.limit}},created(){a.pn.config&&a.pn.config.provider||(this.noSpace=!0,a.pn.chooseAndUploadFile=g.chooseAndUploadFile),this.form=this.getForm("uniForms"),this.formItem=this.getForm("uniFormsItem"),this.form&&this.formItem&&this.formItem.name&&(this.rename=this.formItem.name,this.form.inputChildrens.push(this))},methods:{clearFiles(e){e!==0&&!e?(this.files=[],this.$nextTick(()=>{this.setEmit()})):this.files.splice(e,1),this.$nextTick(()=>{this.setEmit()})},upload(){let e=[];return this.files.forEach((t,i)=>{(t.status==="ready"||t.status==="error")&&e.push(Object.assign({},t))}),this.uploadFiles(e)},async setValue(e,t){const i=async s=>{const l=/cloud:\/\/([\w.]+\/?)\S*/;let r="";return s.fileID?r=s.fileID:r=s.url,l.test(r)&&(s.fileID=r,s.url=await this.getTempFileURL(r)),s.url&&(s.path=s.url),s};if(this.returnType==="object")e?await i(e):e={};else{e||(e=[]);for(let s=0;s<e.length;s++){let l=e[s];await i(l)}}this.localValue=e,this.form&&this.formItem&&!this.is_reset&&(this.is_reset=!1,this.formItem.setValue(this.localValue));let o=Object.keys(e).length>0?e:[];this.files=[].concat(o)},choose(){if(!this.disabled){if(this.files.length>=Number(this.limitLength)&&this.showType!=="grid"&&this.returnType==="array"){a.index.showToast({title:`\u60A8\u6700\u591A\u9009\u62E9 ${this.limitLength} \u4E2A\u6587\u4EF6`,icon:"none"});return}this.chooseFiles()}},chooseFiles(){const e=u.get_extname(this.fileExtname);a.pn.chooseAndUploadFile({type:this.fileMediatype,compressed:!1,sizeType:this.sizeType,extension:e.length>0?e:void 0,count:this.limitLength-this.files.length,onChooseFile:this.chooseFileCallback,onUploadProgress:t=>{this.setProgress(t,t.index)}}).then(t=>{this.setSuccessAndError(t.tempFiles)}).catch(t=>{console.log("\u9009\u62E9\u5931\u8D25",t)})},async chooseFileCallback(e){const t=u.get_extname(this.fileExtname);(Number(this.limitLength)===1&&this.disablePreview&&!this.disabled||this.returnType==="object")&&(this.files=[]);let{filePaths:o,files:s}=u.get_files_and_is_max(e,t);t&&t.length>0||(o=e.tempFilePaths,s=e.tempFiles);let l=[];for(let r=0;r<s.length&&!(this.limitLength-this.files.length<=0);r++){s[r].uuid=Date.now();let n=await u.get_file_data(s[r],this.fileMediatype);n.progress=0,n.status="ready",this.files.push(n),l.push(p(m({},n),{file:s[r]}))}this.$emit("select",{tempFiles:l,tempFilePaths:o}),e.tempFiles=s,(!this.autoUpload||this.noSpace)&&(e.tempFiles=[])},uploadFiles(e){return e=[].concat(e),g.uploadCloudFiles.call(this,e,5,t=>{this.setProgress(t,t.index,!0)}).then(t=>(this.setSuccessAndError(t),t)).catch(t=>{console.log(t)})},async setSuccessAndError(e,t){let i=[],o=[],s=[],l=[];for(let r=0;r<e.length;r++){const n=e[r],h=n.uuid?this.files.findIndex(f=>f.uuid===n.uuid):n.index;if(h===-1||!this.files)break;n.errMsg==="request:fail"?(this.files[h].url=n.path,this.files[h].status="error",this.files[h].errMsg=n.errMsg,o.push(this.files[h]),l.push(this.files[h].url)):(this.files[h].errMsg="",this.files[h].fileID=n.url,/cloud:\/\/([\w.]+\/?)\S*/.test(n.url)?this.files[h].url=await this.getTempFileURL(n.url):this.files[h].url=n.url,this.files[h].status="success",this.files[h].progress+=1,i.push(this.files[h]),s.push(this.files[h].fileID))}i.length>0&&(this.setEmit(),this.$emit("success",{tempFiles:this.backObject(i),tempFilePaths:s})),o.length>0&&this.$emit("fail",{tempFiles:this.backObject(o),tempFilePaths:l})},setProgress(e,t,i){this.files.length;const o=Math.round(e.loaded*100/e.total);let s=t;i||(s=this.files.findIndex(l=>l.uuid===e.tempFile.uuid)),!(s===-1||!this.files[s])&&(this.files[s].progress=o-1,this.$emit("progress",{index:s,progress:parseInt(o),tempFile:this.files[s]}))},delFile(e){this.$emit("delete",{tempFile:this.files[e],tempFilePath:this.files[e].url}),this.files.splice(e,1),this.$nextTick(()=>{this.setEmit()})},getFileExt(e){const t=e.lastIndexOf("."),i=e.length;return{name:e.substring(0,t),ext:e.substring(t+1,i)}},setEmit(){let e=[];this.returnType==="object"?(e=this.backObject(this.files)[0],this.localValue=e||null):(e=this.backObject(this.files),this.localValue||(this.localValue=[]),this.localValue=[...e]),this.$emit("update:modelValue",this.localValue)},backObject(e){let t=[];return e.forEach(i=>{t.push({extname:i.extname,fileType:i.fileType,image:i.image,name:i.name,path:i.path,size:i.size,fileID:i.fileID,url:i.url})}),t},async getTempFileURL(e){return e={fileList:[].concat(e)},(await a.pn.getTempFileURL(e)).fileList[0].tempFileURL||""},getForm(e="uniForms"){let t=this.$parent,i=t.$options.name;for(;i!==e;){if(t=t.$parent,!t)return!1;i=t.$options.name}return t}}};if(!Array){const e=a.resolveComponent("upload-image"),t=a.resolveComponent("upload-file");(e+t)()}function w(e,t,i,o,s,l){return a.e({a:i.title},i.title?{b:a.t(i.title),c:a.t(l.filesList.length),d:a.t(l.limitLength)}:{},{e:i.fileMediatype==="image"&&l.showType==="grid"},i.fileMediatype==="image"&&l.showType==="grid"?{f:a.o(l.uploadFiles),g:a.o(l.choose),h:a.o(l.delFile),i:a.p({readonly:i.readonly,["image-styles"]:i.imageStyles,["files-list"]:l.filesList,limit:l.limitLength,disablePreview:i.disablePreview,delIcon:i.delIcon})}:{},{j:i.fileMediatype!=="image"||l.showType!=="grid"},i.fileMediatype!=="image"||l.showType!=="grid"?{k:a.o(l.uploadFiles),l:a.o(l.choose),m:a.o(l.delFile),n:a.p({readonly:i.readonly,["list-styles"]:i.listStyles,["files-list"]:l.filesList,showType:l.showType,delIcon:i.delIcon})}:{})}var P=a._export_sfc(I,[["render",w],["__file","D:/WXFile/WeChat Files/wxid_24g7xarmwwne22/FileStorage/File/2023-06/483a303c5dc0354ecc26cfa10a7ddca7_c3ad831319d2832c177ef660df75d852_8/wkkcApplet/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue"]]);wx.createComponent(P);