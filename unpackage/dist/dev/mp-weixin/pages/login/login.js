"use strict";var e=require("../../common/vendor.js"),c=require("../../utils/api.js"),d=require("../../common/assets.js");require("../../utils/http.js");require("../../utils/index1.js");require("../../utils/base.js");const l=()=>"../../components/NavBer.js",g={data(){return{href:"https://uniapp.dcloud.io",title:"\u963F\u53D1\u963F\u53D1",backgroundColor:""}},onLoad(o){console.log(o),o.softId,this.softId=o.softId},components:{navbar:l},methods:{goBack(){e.index.navigateBake()},getUserInfo(){let o=this;e.index.showLoading({title:"\u767B\u5F55\u4E2D"}),e.index.getUserProfile({desc:"\u5FAE\u4FE1\u767B\u9646\u540E\u540C\u6B65\u6570\u636E",success:async a=>{console.log(a),e.index.login({provider:"weixin",success:async i=>{if(console.log(i),console.log(i.code),console.log(666),o.code=i.code,i.errMsg=="login:ok"){let r={code:i.code};const t=await c.wxappletLogin(r);if(console.log(t),t.data.code==0){let n=t.data.data;e.index.setStorageSync("token",n.token),e.index.setStorageSync("userInfo",JSON.stringify(n)),e.index.setStorageSync("inviteLink",n.inviteLink),e.index.showToast({icon:"none",title:t.data.msg}),setTimeout(()=>{e.index.reLaunch({url:"/pageIndex/index/index"})},800)}else e.index.showToast({icon:"none",title:t.data.msg})}}})},fail:()=>{e.index.showToast({title:"\u6388\u6743\u5DF2\u53D6\u6D88",icon:"error",mask:!0})},complete:()=>{e.index.hideLoading()}})},goLogin(o){e.index.navigateTo({url:"/pages/login/phoneEmail?id="+o})},mailClick(){let o={};o.userName="1725565883@qq.com",o.password="123456",c.mailLogin(o).then(a=>{console.log(a),a.code==200})}}};Array||e.resolveComponent("navbar")();function u(o,a,i,r,t,n){return{a:e.o(n.goBack),b:e.p({background:t.backgroundColor}),c:d._imports_0,d:e.o((...s)=>n.getUserInfo&&n.getUserInfo(...s)),e:e.o(s=>n.goLogin(1)),f:e.o(s=>n.goLogin(2))}}var m=e._export_sfc(g,[["render",u],["__scopeId","data-v-b237504c"],["__file","E:/Code/BeiJing-Digitalsee/part-time-job/Group-project/pages/login/login.vue"]]);wx.createPage(m);
