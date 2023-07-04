"use strict";var i=require("../../../../common/vendor.js");const a={name:"uploadFile",emits:["uploadFiles","choose","delFile"],props:{filesList:{type:Array,default(){return[]}},delIcon:{type:Boolean,default:!0},limit:{type:[Number,String],default:9},showType:{type:String,default:""},listStyles:{type:Object,default(){return{border:!0,dividline:!0,borderStyle:{}}}},readonly:{type:Boolean,default:!1}},computed:{list(){let e=[];return this.filesList.forEach(r=>{e.push(r)}),e},styles(){return Object.assign({border:!0,dividline:!0,"border-style":{}},this.listStyles)},borderStyle(){let{borderStyle:e,border:r}=this.styles,o={};if(!r)o.border="none";else{let l=e&&e.width||1;l=this.value2px(l);let t=e&&e.radius||5;t=this.value2px(t),o={"border-width":l,"border-style":e&&e.style||"solid","border-color":e&&e.color||"#eee","border-radius":t}}let d="";for(let l in o)d+=`${l}:${o[l]};`;return d},borderLineStyle(){let e={},{borderStyle:r}=this.styles;if(r&&r.color&&(e["border-color"]=r.color),r&&r.width){let d=r&&r.width||1,l=r&&r.style||0;typeof d=="number"?d+="px":d=d.indexOf("px")?d:d+"px",e["border-width"]=d,typeof l=="number"?l+="px":l=l.indexOf("px")?l:l+"px",e["border-top-style"]=l}let o="";for(let d in e)o+=`${d}:${e[d]};`;return o}},methods:{uploadFiles(e,r){this.$emit("uploadFiles",{item:e,index:r})},choose(){this.$emit("choose")},delFile(e){this.$emit("delFile",e)},value2px(e){return typeof e=="number"?e+="px":e=e.indexOf("px")!==-1?e:e+"px",e}}};function f(e,r,o,d,l,t){return i.e({a:!o.readonly},o.readonly?{}:{b:i.o((...s)=>t.choose&&t.choose(...s))},{c:t.list.length>0},t.list.length>0?{d:i.f(t.list,(s,n,c)=>i.e({a:i.t(s.name)},o.delIcon&&!o.readonly?{b:i.o(u=>t.delFile(n))}:{},{c:s.progress&&s.progress!==100||s.progress===0},s.progress&&s.progress!==100||s.progress===0?{d:s.progress===-1?0:s.progress,e:s.errMsg?"#ff5a5f":"#EBEBEB"}:{},{f:s.status==="error"},s.status==="error"?{g:i.o(u=>t.uploadFiles(s,n))}:{},{h:n,i:n!==0&&t.styles.dividline?1:"",j:i.s(n!==0&&t.styles.dividline&&t.borderLineStyle)})),e:o.delIcon&&!o.readonly,f:i.s(t.borderStyle)}:{})}var y=i._export_sfc(a,[["render",f],["__file","E:/Code/BeiJing-Digitalsee/Group-project/uni_modules/uni-file-picker/components/uni-file-picker/upload-file.vue"]]);wx.createComponent(y);
