"use strict";require("../common/vendor.js");var o=require("./http.js");const t=e=>o.get("/oss/getOssToken",e),n=e=>o.post("/transfer/createTransfer",e),i=e=>o.post("/transfer/sendEmailAndSMS/"+e),r=e=>o.post("/login/sendPhoneCode/"+e),a=e=>o.post("/login/phoneLogin",e),l=e=>o.post("/login/mailLogin",e),g=e=>o.post("/login/slipEmailPassword",e),p=(e,s)=>o.get("/login/slipGetEmailCode?userName="+e+"&bindType="+s),c=(e,s)=>o.get("/login/verifyEmailCode?userName="+e+"&code="+s),d=e=>o.get("/everbox/getEverboxList",{params:e}),m=e=>o.post("/everbox/batchDelete",e),v=(e,s)=>o.get("/everbox/verifyExist?superId="+e+"&fileName="+s),E=e=>o.post("/everbox/rename",e),x=e=>o.post("/transfer/everBoxShare",e),f=e=>o.post("/wx/wxappletLogin",e),h=e=>o.get("/flow/getFlow"),b=e=>o.get("/everbox/getEverBoXFiles/"+e);exports.batchDelete=m;exports.createTransfer=n;exports.everBoxShare=x;exports.getEverBoXFiles=b;exports.getEverboxList=d;exports.getFlow=h;exports.getOssToken=t;exports.mailLogin=l;exports.phoneLogin=a;exports.rename=E;exports.sendEmailAndSMS=i;exports.sendPhoneCode=r;exports.slipEmailPassword=g;exports.slipGetEmailCode=p;exports.verifyEmailCode=c;exports.verifyExist=v;exports.wxappletLogin=f;
