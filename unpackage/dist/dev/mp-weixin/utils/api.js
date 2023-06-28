"use strict";
require("../common/vendor.js");
const utils_http = require("./http.js");
const getOssToken = (params) => utils_http.get("/oss/getOssToken", params);
const createTransfer = (params) => utils_http.post("/transfer/createTransfer", params);
const sendEmailAndSMS = (params) => utils_http.post("/transfer/sendEmailAndSMS/" + params);
const sendPhoneCode = (value) => utils_http.post("/login/sendPhoneCode/" + value);
const phoneLogin = (value) => utils_http.post("/login/phoneLogin", value);
const mailLogin = (value) => utils_http.post("/login/mailLogin", value);
const slipEmailPassword = (value) => utils_http.post("/login/slipEmailPassword", value);
const slipGetEmailCode = (userName, bindType) => utils_http.get("/login/slipGetEmailCode?userName=" + userName + "&bindType=" + bindType);
const verifyEmailCode = (userName, code) => utils_http.get("/login/verifyEmailCode?userName=" + userName + "&code=" + code);
const getEverboxList = (value) => utils_http.get("/everbox/getEverboxList", {
  params: value
});
const batchDelete = (value) => utils_http.post("/everbox/batchDelete", value);
const verifyExist = (superId, fileName) => utils_http.get("/everbox/verifyExist?superId=" + superId + "&fileName=" + fileName);
const rename = (value) => utils_http.post("/everbox/rename", value);
const everBoxShare = (value) => utils_http.post("/transfer/everBoxShare", value);
const wxappletLogin = (data) => utils_http.post("/wx/wxappletLogin", data);
const getFlow = (params) => utils_http.get("/flow/getFlow");
const getEverBoXFiles = (value) => utils_http.get("/everbox/getEverBoXFiles/" + value);
exports.batchDelete = batchDelete;
exports.createTransfer = createTransfer;
exports.everBoxShare = everBoxShare;
exports.getEverBoXFiles = getEverBoXFiles;
exports.getEverboxList = getEverboxList;
exports.getFlow = getFlow;
exports.getOssToken = getOssToken;
exports.mailLogin = mailLogin;
exports.phoneLogin = phoneLogin;
exports.rename = rename;
exports.sendEmailAndSMS = sendEmailAndSMS;
exports.sendPhoneCode = sendPhoneCode;
exports.slipEmailPassword = slipEmailPassword;
exports.slipGetEmailCode = slipGetEmailCode;
exports.verifyEmailCode = verifyEmailCode;
exports.verifyExist = verifyExist;
exports.wxappletLogin = wxappletLogin;
