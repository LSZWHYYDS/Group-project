"use strict";var L=Object.defineProperty,_=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var p=Object.getOwnPropertySymbols;var D=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var w=(e,s,o)=>s in e?L(e,s,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[s]=o,u=(e,s)=>{for(var o in s||(s={}))D.call(s,o)&&w(e,o,s[o]);if(p)for(var o of p(s))C.call(s,o)&&w(e,o,s[o]);return e},g=(e,s)=>_(e,F(s));var i=require("../../common/vendor.js"),n=require("../../utils/index.js"),m=require("../../utils/api.js");require("../../utils/ali-oss.js");var c=require("../../common/assets.js");require("../../utils/http.js");require("../../utils/index1.js");require("../../utils/base.js");const b=()=>"../components/indexPop.js",y={data(){return{searchValue:"",renameVal:"23334",searchFileList:[],searchFloList:[],folderId:0,breadCrumList:[],selectArray:[],selectItemsAry:[]}},components:{indexPop:b},onLoad(e){},filters:{timedown(e){return n.timedown(e)},timedownshow(e){return n.timedownshow(e)},timedownshowmm(e){return n.timedownshowmm(e)},timedownnum(e){return n.timedownnum(e)}},methods:g(u(u({},i.mapMutations(["SET_FILELIST"])),i.mapActions(["REQUEST_FLOW"])),{byTes(e){return e<=0?"0B":n.bytesToSize(e)},getDetail(e){let s=0;this.breadCrumList.length!==0&&(s=this.breadCrumList[this.breadCrumList.length-1].folderId),this.superFolder=s,console.log(e),this.$refs.indexPop.showPage=!0,this.$refs.indexPop.$refs.midPop.showPop(),this.$refs.indexPop.$refs.midPop.isShow=!0;let o=e;if(e.moveType==2)o.fileClass="floder";else{let t=n.getSuffix(e.fileName);n.isImage(t)?e.fileClass="image":n.isVideo(t)?e.fileClass="video":e.fileClass="file"}e.fileSize?o.size=e.fileSize:o.size=e.folderSize,e.fileName?o.name=e.fileName:o.name=e.folderName,this.$refs.indexPop.listItem=o},maskClose(){},goFolder(e){this.folderId=e.folderId,this.breadCrumList.push(e),m.getEverboxList({superFolder:e.folderId,pageNum:this.pageNum,defaultSort:!0,timeSort:!1,pageSize:1e3}).then(s=>{s.data.code==0&&(this.openNewListData(s),this.selectArray=[])})},breadFunc(e,s){if(this.selectArray=[],console.log(this.selectArray),e==0){this.breadCrumList=[],this.folderId=0,this.createData();return}this.breadCrumList.splice(s+1,this.breadCrumList.length),this.folderId=e.folderId,this.createData()},async createData(){let e=this.folderId;m.getEverboxList({superFolder:e,pageNum:this.pageNum,pageSize:1e3,defaultSort:this.defaultSort,timeSort:this.timeSort,sizeSort:this.sizeSort}).then(s=>{s.data.code!=401&&this.openNewListData(s)})},closePop(){this.$refs.midPop.close()},closeRename(){this.$refs.reNamePop.close()},closeDel(){this.$refs.delPop.close()},renameClick(){this.$refs.midPop.close(),this.$refs.reNamePop.open()},delClick(){this.$refs.midPop.close(),this.$refs.delPop.open()},search(e){i.index.showToast({title:"\u641C\u7D22\uFF1A"+e.value,icon:"none"})},searchChange(){if(this.breadCrumList=[],this.searchValue==""){this.searchFileList=[],this.searchFloList=[];return}m.getEverBoXFiles(this.searchValue).then(e=>{if(console.log(e),e.data.code==200){let s=e.data.data;if(s.filesList.length==0&&s.foldersList.length==0){i.index.showToast({icon:"none",title:"\u6682\u65E0\u6570\u636E"});return}this.searchFileList=s.filesList,this.searchFloList=s.foldersList,this.openNewListData(e)}else i.index.showToast({icon:"none",title:"\u6682\u672A\u67E5\u8BE2\u5230\u8BE5\u6587\u4EF6"})})},dateFormate(e){let s=this.$options.filters.timedown(e),o=this.$options.filters.timedownnum(e);if(o==!0){let t=this.$options.filters.timedownshow(e),a=this.$options.filters.timedownshowmm(e);return"\u4ECA\u5929  "+t+":"+a}else if(s<=2&&o==!1){let t=this.$options.filters.timedownshow(e),a=this.$options.filters.timedownshowmm(e);return"\u6628\u5929  "+t+":"+a}else return e},openNewListData(e){this.timeDate=[];let s=e.data.data.foldersList;s.forEach(t=>{t.showSearch=!0,t.select=!1,t.moveType="2",t.utilsType=!1;let a=this.$options.filters.timedown(t.createDate),l=this.$options.filters.timedownnum(t.createDate);if(l==!0){let r=this.$options.filters.timedownshow(t.createDate),h=this.$options.filters.timedownshowmm(t.createDate);this.timeDate.push("\u4ECA\u5929  "+r+":"+h)}else if(a<=2&&l==!1){let r=this.$options.filters.timedownshow(t.createDate),h=this.$options.filters.timedownshowmm(t.createDate);this.timeDate.push("\u6628\u5929  "+r+":"+h)}else this.timeDate.push(t.createDate)});let o=e.data.data.filesList;o.forEach(t=>{t.showSearch=!0,t.select=!1,t.moveType="1",t.utilsType=!1;let a=n.getSuffix(t.fileName),l=this.$options.filters.timedown(t.createDate),r=this.$options.filters.timedownnum(t.createDate);if(r==!0){let h=this.$options.filters.timedownshow(t.createDate),d=this.$options.filters.timedownshowmm(t.createDate);this.timeDate.push("\u4ECA\u5929  "+h+":"+d)}else if(l<=2&&r==!1){let h=this.$options.filters.timedownshow(t.createDate),d=this.$options.filters.timedownshowmm(t.createDate);this.timeDate.push("\u6628\u5929  "+h+":"+d)}else this.timeDate.push(t.createDate);n.isImage(a)?t.fileClass="image":n.isVideo(a)?t.fileClass="video":t.fileClass="file"}),this.searchFloList=[],this.searchFloList=this.searchFloList.concat(s),this.searchFileList=[],this.searchFileList=this.searchFileList.concat(o),console.log(this.searchFileList),console.log(this.searchFloList)},input(e){this.searchValue=e,console.log("----input:",e),this.searchChange()},qhdwd(){this.select_3=!1,this.timeshow=!0,this.downDay="1",this.downDayshow="1\u5929"}}),computed:u({},i.mapState({userFlowData:e=>i.index.getStorageSync("userFlowData")?JSON.parse(e.userFlowData):{}})),mounted(){}};if(!Array){const e=i.resolveComponent("uni-search-bar"),s=i.resolveComponent("indexPop");(e+s)()}const S=()=>"../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";Math||S();function x(e,s,o,t,a,l){return i.e({a:i.o(l.search),b:i.o(l.input),c:i.o(r=>a.searchValue=r),d:i.p({focus:!0,modelValue:a.searchValue}),e:a.searchFloList.length+a.searchFileList.length>0||a.breadCrumList.length>0},a.searchFloList.length+a.searchFileList.length>0||a.breadCrumList.length>0?{f:i.o(r=>l.searchChange()),g:i.f(a.breadCrumList,(r,h,d)=>({a:i.t(r.folderName),b:i.o(f=>l.breadFunc(r,h)),c:h}))}:{},{h:i.f(a.searchFloList,(r,h,d)=>({a:i.o(f=>l.goFolder(r)),b:i.t(r.folderName),c:i.t(l.dateFormate(r.createDate)),d:i.t(l.byTes(r.folderSize)),e:i.o(f=>l.goFolder(r)),f:i.o(f=>l.getDetail(r)),g:h})),i:c._imports_4,j:c._imports_5,k:i.f(a.searchFileList,(r,h,d)=>i.e({a:r.fileClass=="image"},r.fileClass=="image"?{b:c._imports_8}:{},{c:r.fileClass=="video"},r.fileClass=="video"?{d:c._imports_9}:{},{e:r.fileClass=="file"},r.fileClass=="file"?{f:c._imports_10}:{},{g:i.t(r.fileName),h:i.t(l.dateFormate(r.createDate)),i:i.t(l.byTes(r.fileSize)),j:i.o(f=>l.getDetail(r)),k:h})),l:c._imports_5,m:i.sr("indexPop","5d2e0206-1"),n:i.o(r=>l.searchChange())})}var P=i._export_sfc(y,[["render",x],["__scopeId","data-v-5d2e0206"],["__file","D:/WXFile/WeChat Files/wxid_24g7xarmwwne22/FileStorage/File/2023-06/483a303c5dc0354ecc26cfa10a7ddca7_c3ad831319d2832c177ef660df75d852_8/wkkcApplet/pageIndex/index/searchCloud.vue"]]);wx.createPage(P);
