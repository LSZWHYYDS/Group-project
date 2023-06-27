"use strict";var m=Object.defineProperty,p=Object.defineProperties;var x=Object.getOwnPropertyDescriptors;var r=Object.getOwnPropertySymbols;var f=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var u=(o,t,n)=>t in o?m(o,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):o[t]=n,g=(o,t)=>{for(var n in t||(t={}))f.call(t,n)&&u(o,n,t[n]);if(r)for(var n of r(t))w.call(t,n)&&u(o,n,t[n]);return o},h=(o,t)=>p(o,x(t));var e=require("../../common/vendor.js"),l=require("../../utils/index.js"),c=require("../../utils/api.js"),S=require("../../common/assets.js");require("../../utils/http.js");require("../../utils/index1.js");require("../../utils/base.js");const y=()=>"../../components/NavBer.js",T={components:{navbar:y},data(){return{showNum:"",typeShow:!0,psdLogin:!0,commonInput:"",password:"",accountType:"",phoneCode:"",count:60,timer:null,backgroundColor:"linear-gradient(180.14deg, #3679FF 0.12%, rgba(54, 121, 255, 0) 99.88%)"}},watch:{commonInput:{immediate:!0,handler:l.Debounce(function(o){l.typePhone(o)?this.accountType="phone":l.isEmall(o)?this.accountType="email":this.accountType=""})}},onLoad(o){console.log(o.id),this.showNum=o.id,this.$nextTick(()=>{})},computed:e.mapState(["bhs"]),methods:h(g({},e.mapActions(["REQUEST_FLOW"])),{goBack(){e.index.redirectTo({url:"/pages/login/login"})},sendMsg(){let o=this;if(console.log(o.accountType),o.accountType=="phone"){let t=o.commonInput;c.sendPhoneCode(t).then(n=>{console.log(n),n.data.code==0?(e.index.showToast({icon:"none",title:"\u53D1\u9001\u6210\u529F"}),o.typeShow=!1,o.typeShow||(clearInterval(o.timer),o.timer=setInterval(()=>{o.count==1?(o.typeShow=!0,o.count=60):o.count-=1},1e3)),console.log(o.typeShow),o.verifyCodeFunc()):e.index.showToast({icon:"none",title:n.data.msg})})}else e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7!"})},phoneLoginFunc(){let o=this;if(o.commonInput==""){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7!"});return}if(o.accountType!="phone"){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7!"});return}if(o.phoneCode.length!=6){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u51656\u4F4D\u9A8C\u8BC1\u7801!"});return}e.index.showLoading({title:"\u767B\u5F55\u4E2D"});let t={};t.userName=o.commonInput,t.code=o.phoneCode,c.phoneLogin(t).then(n=>{if(console.log(n),n.data.code==0){e.index.hideLoading();let d=n.data.data;console.log(d),e.index.setStorageSync("token",d.token),e.index.setStorageSync("userInfo",JSON.stringify(d)),e.index.setStorageSync("loginUserId",d.userId),e.index.setStorageSync("inviteLink",d.inviteLink),this.REQUEST_FLOW(),this.uploadData(),e.index.showToast({icon:"none",title:n.data.msg}),setTimeout(()=>{e.index.reLaunch({url:"/pageIndex/index/index"})},800)}else e.index.showToast({icon:"none",title:n.data.msg})})},loginEmail(){console.log(123),console.log(this.$store.state.bhs);let o=this;if(o.commonInput==""){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u90AE\u7BB1\u53F7!"});return}if(o.accountType!="email"){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u53F7!"});return}if(o.password==""){e.index.showToast({icon:"none",title:"\u8BF7\u8F93\u5165\u5BC6\u7801!"});return}let t={};t.userName=o.commonInput,t.password=o.password,e.index.showLoading({title:"\u767B\u5F55\u4E2D"}),c.mailLogin(t).then(n=>{if(e.index.hideLoading(),console.log(n),n.data.code==0){let d=n.data.data;console.log(d),e.index.setStorageSync("token",d.token),e.index.setStorageSync("userInfo",JSON.stringify(d)),e.index.setStorageSync("loginUserId",d.userId),e.index.setStorageSync("inviteLink",d.inviteLink),this.REQUEST_FLOW(),this.uploadData(),e.index.showToast({icon:"none",title:n.data.msg}),setTimeout(()=>{e.index.reLaunch({url:"/pageIndex/index/index"})},800)}else e.index.showToast({icon:"none",title:n.data.msg})})},uploadData(){},verifyCodeFunc(){},loginChange(){this.psdLogin=!1},codeChange(){this.psdLogin=!0},forgetPsd(){e.index.navigateTo({url:"/pages/login/forgetPassword"})},getUserInfo(){let o=this;e.index.showLoading({title:"\u767B\u5F55\u4E2D"}),e.index.getUserProfile({desc:"\u5FAE\u4FE1\u767B\u9646\u540E\u540C\u6B65\u6570\u636E",success:async t=>{console.log(t),e.index.login({provider:"weixin",success:async n=>{if(console.log(n),console.log(n.code),console.log(666),o.code=n.code,n.errMsg=="login:ok"){let d={code:n.code};const i=await c.wxappletLogin(d);if(console.log(i),i.data.code==0){let a=i.data.data;e.index.setStorageSync("token",a.token),e.index.setStorageSync("userInfo",JSON.stringify(a)),e.index.setStorageSync("inviteLink",a.inviteLink),e.index.showToast({icon:"none",title:i.data.msg}),setTimeout(()=>{e.index.reLaunch({url:"/pageIndex/index/index"})},800)}else e.index.showToast({icon:"none",title:i.data.msg})}}})},fail:()=>{e.index.showToast({title:"\u6388\u6743\u5DF2\u53D6\u6D88",icon:"error",mask:!0})},complete:()=>{e.index.hideLoading()}})}})};Array||e.resolveComponent("navbar")();function _(o,t,n,d,i,a){return e.e({a:e.o(a.goBack),b:e.p({background:i.backgroundColor,back:!0}),c:S._imports_0,d:i.showNum==1},i.showNum==1?e.e({e:i.commonInput,f:e.o(s=>i.commonInput=s.detail.value),g:i.phoneCode,h:e.o(s=>i.phoneCode=s.detail.value),i:i.typeShow},i.typeShow?{j:e.o((...s)=>a.sendMsg&&a.sendMsg(...s))}:{k:e.t(i.count)},{l:e.o((...s)=>a.phoneLoginFunc&&a.phoneLoginFunc(...s))}):{m:i.commonInput,n:e.o(s=>i.commonInput=s.detail.value),o:i.password,p:e.o(s=>i.password=s.detail.value),q:e.o((...s)=>a.forgetPsd&&a.forgetPsd(...s)),r:e.o((...s)=>a.loginEmail&&a.loginEmail(...s)),s:e.o((...s)=>a.getUserInfo&&a.getUserInfo(...s))})}var v=e._export_sfc(T,[["render",_],["__scopeId","data-v-18a6ebad"],["__file","D:/WXFile/WeChat Files/wxid_24g7xarmwwne22/FileStorage/File/2023-06/483a303c5dc0354ecc26cfa10a7ddca7_c3ad831319d2832c177ef660df75d852_8/wkkcApplet/pages/login/phoneEmail.vue"]]);wx.createPage(v);