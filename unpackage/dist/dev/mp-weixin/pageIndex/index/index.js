"use strict";var y=Object.defineProperty;var w=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,b=Object.prototype.propertyIsEnumerable;var _=(e,o,a)=>o in e?y(e,o,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[o]=a,g=(e,o)=>{for(var a in o||(o={}))D.call(o,a)&&_(e,a,o[a]);if(w)for(var a of w(o))b.call(o,a)&&_(e,a,o[a]);return e};var t=require("../../common/vendor.js"),h=require("../../utils/index.js");require("../../utils/base.js");var m=require("../../utils/api.js");require("../../utils/ali-oss.js");var c=require("../../common/assets.js");require("../../utils/http.js");require("../../utils/index1.js");const A=()=>"../components/indexPop.js",I=()=>"../components/shareSetting.js",x=()=>"../myShare/myShare.js",C=()=>"../../components/tabber.js",L={data(){return{number:1,sortNum:1,isSelectAll:!1,isShowTitle:!0,timeDate:[],timename:[],fileList:[],flodersList:[],filezonglist:[],folderId:0,breadCrumList:[],selectArray:[],selectItemsAry:[],itemData:"",allSelect:!1,quanxuan:!0,pageNum:1,timeSort:!1,sizeSort:!1,defaultSort:!0,showPage:!1}},onLoad(){},components:{tabber:C,indexPop:A,shareSetting:I,share:x},created(){t.index.hideKeyboard()},methods:{closeSelect(){this.isSelectAll=!1;for(let e=0;e<this.selectItemsAry.length;e++)this.selectItemsAry[e].select=!1;this.selectItemsAry=[]},closePop(){this.$refs.midPop.close()},closeDel(){this.$refs.delAll.close()},selectShare(){if(this.selectItemsAry.length==0){t.index.showToast({icon:"none",title:"\u8BF7\u9009\u62E9\u6587\u4EF6"});return}this.$refs.selectRef.changeBtn(),this.$refs.selectRef.selectItemsAry=this.selectItemsAry,this.$refs.selectRef.$refs.sharePop.open()},multiplcDeleteFunc(){if(this.selectItemsAry.length==0){t.index.showToast({icon:"none",title:"\u8BF7\u9009\u62E9\u6587\u4EF6"});return}this.$refs.delAll.open()},async deleteSelectList(){t.index.showLoading({title:"\u5220\u9664\u4E2D"});let e=[];this.selectItemsAry.forEach(a=>{let r={};a.moveType=="1"?r.deleteID=a.fileId:r.deleteID=a.folderId,r.deleteType=a.moveType,e.push(r)});const o=await m.batchDelete(e);if(o.data.code!==0){t.index.showToast({icon:"none",title:o.data.msg});return}else t.index.hideLoading(),t.index.showToast({icon:"none",title:o.data.msg}),this.selectItemsAry=[],this.closeDel(),this.createData()},maskClose(){},getDetail(e){let o=0;this.breadCrumList.length!==0&&(o=this.breadCrumList[this.breadCrumList.length-1].folderId),this.superFolder=o,console.log(e),this.$refs.indexPop.showPage=!0,this.$refs.indexPop.$refs.shareSett.superFolder=o,this.$refs.indexPop.$refs.midPop.showPop(),this.$refs.indexPop.$refs.midPop.isShow=!0;let a=e;if(e.moveType==2)a.fileClass="floder";else{let r=h.getSuffix(e.fileName);h.isImage(r)?e.fileClass="image":h.isVideo(r)?e.fileClass="video":e.fileClass="file"}e.fileSize?a.size=e.fileSize:a.size=e.folderSize,e.fileName?a.name=e.fileName:a.name=e.folderName,this.$refs.indexPop.listItem=a},allSelectFunc(){this.quanxuan=!1,this.fileList.forEach(e=>e.select=!0),this.flodersList.forEach(e=>e.select=!0),this.allSelect=!this.allSelect,this.selectItemsAry=this.selectItemsAry.concat(this.fileList).concat(this.flodersList)},cancelAllSelectFunc(){this.quanxuan=!0,this.fileList.forEach(e=>e.select=!1),this.flodersList.forEach(e=>e.select=!1),this.allSelect=!this.allSelect,this.selectItemsAry=[]},delItemsFunc(e){this.selectItemsAry.push(e),this.itemData=e,e.select=!0,console.log(this.selectItemsAry)},breadFunc(e,o){if(this.selectArray=[],this.checked=!1,console.log(this.selectArray),e==0){this.breadCrumList=[],this.folderId=0,this.isShowTitle=!0,this.createData();return}this.breadCrumList.splice(o+1,this.breadCrumList.length),this.folderId=e.folderId,this.createData()},async createData(){let e=this.folderId;m.getEverboxList({superFolder:e,pageNum:this.pageNum,pageSize:1e3,defaultSort:this.defaultSort,timeSort:this.timeSort,sizeSort:this.sizeSort}).then(o=>{o.data.code!=401&&this.openNewListData(o)})},selectItemFunc(e){e.select=!1,this.allSelect=!1;for(let o=0;o<this.selectItemsAry.length;o++)this.selectItemsAry[o].select==!1&&this.selectItemsAry.splice(o,1);console.log(this.selectItemsAry)},goFolder(e){this.isSelectAll||(this.isShowTitle=!1,this.folderId=e.folderId,this.breadCrumList.push(e),m.getEverboxList({superFolder:e.folderId,pageNum:this.pageNum,defaultSort:!0,timeSort:!1,pageSize:1e3}).then(o=>{o.data.code==0&&(this.openNewListData(o),this.selectArray=[])}))},openNewListData(e){let o=e.data.data.foldersList;o.forEach(r=>{r.select=!1,r.moveType="2",r.utilsType=!1;let i=this.$options.filters.timedown(r.createDate),l=this.$options.filters.timedownnum(r.createDate);if(l==!0){let s=this.$options.filters.timedownshow(r.createDate),n=this.$options.filters.timedownshowmm(r.createDate);this.timeDate.push("\u4ECA\u5929  "+s+":"+n)}else if(i<=2&&l==!1){let s=this.$options.filters.timedownshow(r.createDate),n=this.$options.filters.timedownshowmm(r.createDate);this.timeDate.push("\u6628\u5929  "+s+":"+n)}else this.timeDate.push(r.createDate)});let a=e.data.data.filesList;a.forEach(r=>{r.select=!1,r.moveType="1",r.utilsType=!1;let i=this.$options.filters.timedown(r.createDate),l=this.$options.filters.timedownnum(r.createDate),s=r.fileName,n=s.split(".")[0],u=s.split(".")[s.split(".").length-1];if(n.length<=10)this.timename.push(n+"."+u);else{let d=n.substring(0,10);this.timename.push(d+"... ."+u)}if(l==!0){let d=this.$options.filters.timedownshow(r.createDate),p=this.$options.filters.timedownshowmm(r.createDate);this.timeDate.push("\u4ECA\u5929  "+d+":"+p)}else if(i<=2&&l==!1){let d=this.$options.filters.timedownshow(r.createDate),p=this.$options.filters.timedownshowmm(r.createDate);this.timeDate.push("\u6628\u5929  "+d+":"+p)}else this.timeDate.push(r.createDate);let S=h.getSuffix(r.fileName);h.isImage(S)?r.fileClass="image":h.isVideo(S)?r.fileClass="video":r.fileClass="file"}),this.flodersList=[],this.flodersList=this.flodersList.concat(o),this.fileList=[],this.fileList=this.fileList.concat(a)},closeSort(){this.$refs.sortPop.close()},titleChange(e){console.log(e),this.number=e},bodyCloseSelected(){this.isShowCollect=!1},searchClick(){t.index.navigateTo({url:"/pageIndex/index/searchCloud"})},showSort(){this.$refs.sortPop.open()},selectAll(){this.isSelectAll=!0},sortClick(e){this.sortNum=e},dateFormate(e){let o=this.$options.filters.timedown(e),a=this.$options.filters.timedownnum(e);if(a==!0){let r=this.$options.filters.timedownshow(e),i=this.$options.filters.timedownshowmm(e);return"\u4ECA\u5929  "+r+":"+i}else if(o<=2&&a==!1){let r=this.$options.filters.timedownshow(e),i=this.$options.filters.timedownshowmm(e);return"\u6628\u5929  "+r+":"+i}else return e},byTes(e){return e<=0?"0B":h.bytesToSize(e)}},computed:g({},t.mapState({userFlowData:e=>t.index.getStorageSync("userFlowData")?JSON.parse(e.userFlowData):{}})),filters:{typeDate(e){if(!!e)return DateYMD(e.expireDate)},hiddenAccout(e){if(e)return e.replace(/(\d{3})\d*(\d{4})/,"$1****$2")},formatinstDataaa(e){return formatinstData(e)},residue(e){return residuePrecision(e)},timedown(e){return h.timedown(e)},timedownshow(e){return h.timedownshow(e)},timedownshowmm(e){return h.timedownshowmm(e)},timedownnum(e){return h.timedownnum(e)}},async mounted(){const e=await m.getEverboxList({superFolder:0,pageNum:1,defaultSort:!0,timeSort:!1,pageSize:1e3});e.data.code==0&&await this.openNewListData(e)}};if(!Array){const e=t.resolveComponent("share"),o=t.resolveComponent("indexPop"),a=t.resolveComponent("shareSetting"),r=t.resolveComponent("uni-popup"),i=t.resolveComponent("tabber");(e+o+a+r+i)()}const F=()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";Math||F();function v(e,o,a,r,i,l){return t.e({a:!i.isSelectAll&&i.isShowTitle},!i.isSelectAll&&i.isShowTitle?{b:t.o(s=>l.titleChange(0)),c:i.number===0?1:"",d:t.o(s=>l.titleChange(1)),e:i.number===1?1:"",f:t.o(s=>l.titleChange(2)),g:i.number===2?1:""}:{},{h:t.sr("shareRef","5e3ad3ab-0"),i:i.number===0,j:!i.isSelectAll},i.isSelectAll?t.e({r:c._imports_3,s:t.o((...s)=>l.closeSelect&&l.closeSelect(...s)),t:i.quanxuan},i.quanxuan?{v:t.o((...s)=>l.allSelectFunc&&l.allSelectFunc(...s))}:{w:t.o((...s)=>l.cancelAllSelectFunc&&l.cancelAllSelectFunc(...s))}):{k:c._imports_0$1,l:t.o((...s)=>l.searchClick&&l.searchClick(...s)),m:t.o((...s)=>l.showSort&&l.showSort(...s)),n:c._imports_1,o:t.o((...s)=>l.selectAll&&l.selectAll(...s)),p:c._imports_2,q:i.isShowTitle==!1?1:""},{x:i.isShowTitle==!1},i.isShowTitle==!1?{y:t.o(s=>l.breadFunc(0)),z:t.f(i.breadCrumList,(s,n,u)=>({a:t.t(s.folderName),b:t.o(f=>l.breadFunc(s,n)),c:n}))}:{},{A:t.f(i.flodersList,(s,n,u)=>t.e({a:t.o(f=>l.goFolder(s)),b:t.t(s.folderName),c:t.t(l.dateFormate(s.createDate)),d:t.t(l.byTes(s.folderSize)),e:t.o(f=>l.goFolder(s))},i.isSelectAll?t.e({h:!s.select},s.select?{k:t.o(f=>l.selectItemFunc(s)),l:c._imports_7}:{i:t.o(f=>l.delItemsFunc(s)),j:c._imports_6}):{f:c._imports_5,g:t.o(f=>l.getDetail(s))},{m:n})),B:c._imports_4,C:!i.isSelectAll,D:t.f(i.fileList,(s,n,u)=>t.e({a:s.fileClass=="image"},s.fileClass=="image"?{b:c._imports_8}:{},{c:s.fileClass=="video"},s.fileClass=="video"?{d:c._imports_9}:{},{e:s.fileClass=="file"},s.fileClass=="file"?{f:c._imports_10}:{},{g:t.t(s.fileName),h:t.t(l.dateFormate(s.createDate)),i:t.t(l.byTes(s.fileSize))},i.isSelectAll?t.e({l:!s.select},s.select?{o:t.o(f=>l.selectItemFunc(s)),p:c._imports_7}:{m:t.o(f=>l.delItemsFunc(s)),n:c._imports_6}):{j:c._imports_5,k:t.o(f=>l.getDetail(s))},{q:n})),E:!i.isSelectAll,F:i.isSelectAll==!0?1:"",G:i.number===1,H:i.number===2,I:t.sr("indexPop","5e3ad3ab-1"),J:t.o(l.createData),K:t.sr("selectRef","5e3ad3ab-2"),L:t.o((...s)=>l.closeSort&&l.closeSort(...s)),M:c._imports_3,N:i.sortNum===1},i.sortNum===1?{O:c._imports_11$1}:{},{P:i.sortNum===1?1:"",Q:t.o(s=>l.sortClick(1)),R:i.sortNum===2},i.sortNum===2?{S:c._imports_11$1}:{},{T:t.o(s=>l.sortClick(2)),U:i.sortNum===2?1:"",V:t.sr("sortPop","5e3ad3ab-3"),W:t.o(l.closeSort),X:t.p({type:"bottom",["safe-area"]:!1}),Y:t.o((...s)=>l.closeDel&&l.closeDel(...s)),Z:c._imports_3,aa:t.o((...s)=>l.deleteSelectList&&l.deleteSelectList(...s)),ab:t.o((...s)=>l.closeDel&&l.closeDel(...s)),ac:t.sr("delAll","5e3ad3ab-4"),ad:t.o(l.closeDel),ae:t.p({type:"bottom",["safe-area"]:!1}),af:!i.isSelectAll},i.isSelectAll?{}:{ag:t.p({pagePath:"/pageIndex/index/index"})},{ah:i.isSelectAll&&i.number==1},i.isSelectAll&&i.number==1?{ai:c._imports_12,aj:c._imports_13,ak:t.o((...s)=>l.selectShare&&l.selectShare(...s)),al:c._imports_11,am:t.o((...s)=>l.multiplcDeleteFunc&&l.multiplcDeleteFunc(...s))}:{},{an:t.o((...s)=>l.bodyCloseSelected&&l.bodyCloseSelected(...s))})}var N=t._export_sfc(L,[["render",v],["__scopeId","data-v-5e3ad3ab"],["__file","D:/WXFile/WeChat Files/wxid_24g7xarmwwne22/FileStorage/File/2023-06/483a303c5dc0354ecc26cfa10a7ddca7_c3ad831319d2832c177ef660df75d852_8/wkkcApplet/pageIndex/index/index.vue"]]);wx.createPage(N);