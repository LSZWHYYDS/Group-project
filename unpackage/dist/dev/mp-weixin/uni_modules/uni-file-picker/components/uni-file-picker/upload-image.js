"use strict";var i=require("../../../../common/vendor.js");const h={name:"uploadImage",emits:["uploadFiles","choose","delFile"],props:{filesList:{type:Array,default(){return[]}},disabled:{type:Boolean,default:!1},disablePreview:{type:Boolean,default:!1},limit:{type:[Number,String],default:9},imageStyles:{type:Object,default(){return{width:"auto",height:"auto",border:{}}}},delIcon:{type:Boolean,default:!0},readonly:{type:Boolean,default:!1}},computed:{styles(){return Object.assign({width:"auto",height:"auto",border:{}},this.imageStyles)},boxStyle(){const{width:e="auto",height:r="auto"}=this.styles;let t={};r==="auto"?e!=="auto"?(t.height=this.value2px(e),t["padding-top"]=0):t.height=0:(t.height=this.value2px(r),t["padding-top"]=0),e==="auto"?r!=="auto"?t.width=this.value2px(r):t.width="33.3%":t.width=this.value2px(e);let o="";for(let a in t)o+=`${a}:${t[a]};`;return o},borderStyle(){let{border:e}=this.styles,r={};const t=1,o=3;if(typeof e=="boolean")r.border=e?"1px #eee solid":"none";else{let s=e&&e.width||t;s=this.value2px(s);let l=e&&e.radius||o;l=this.value2px(l),r={"border-width":s,"border-style":e&&e.style||"solid","border-color":e&&e.color||"#eee","border-radius":l}}let a="";for(let s in r)a+=`${s}:${r[s]};`;return a}},methods:{uploadFiles(e,r){this.$emit("uploadFiles",e)},choose(){this.$emit("choose")},delFile(e){this.$emit("delFile",e)},prviewImage(e,r){let t=[];Number(this.limit)===1&&this.disablePreview&&!this.disabled&&this.$emit("choose"),!this.disablePreview&&(this.filesList.forEach(o=>{t.push(o.url)}),i.index.previewImage({urls:t,current:r}))},value2px(e){return typeof e=="number"?e+="px":e.indexOf("%")===-1&&(e=e.indexOf("px")!==-1?e:e+"px"),e}}};function n(e,r,t,o,a,s){return i.e({a:i.f(t.filesList,(l,d,c)=>i.e({a:l.url,b:i.o(u=>s.prviewImage(l,d))},t.delIcon&&!t.readonly?{c:i.o(u=>s.delFile(d))}:{},{d:l.progress&&l.progress!==100||l.progress===0},l.progress&&l.progress!==100||l.progress===0?{e:l.progress===-1?0:l.progress,f:l.errMsg?"#ff5a5f":"#EBEBEB"}:{},{g:l.errMsg},l.errMsg?{h:i.o(u=>s.uploadFiles(l,d))}:{},{i:d})),b:t.delIcon&&!t.readonly,c:i.s(s.borderStyle),d:i.s(s.boxStyle),e:t.filesList.length<t.limit&&!t.readonly},t.filesList.length<t.limit&&!t.readonly?{f:i.s(s.borderStyle),g:i.o((...l)=>s.choose&&s.choose(...l)),h:i.s(s.boxStyle)}:{})}var f=i._export_sfc(h,[["render",n],["__file","D:/WXFile/WeChat Files/wxid_24g7xarmwwne22/FileStorage/File/2023-06/483a303c5dc0354ecc26cfa10a7ddca7_c3ad831319d2832c177ef660df75d852_8/wkkcApplet/uni_modules/uni-file-picker/components/uni-file-picker/upload-image.vue"]]);wx.createComponent(f);