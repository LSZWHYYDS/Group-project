"use strict";
var common_vendor = require("../common/vendor.js");
const bytesToSize = function(value) {
  if (value == null || value == "") {
    return "0 B";
  }
  var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
  var index = 0, srcsize = parseFloat(value);
  index = Math.floor(Math.log(srcsize) / Math.log(1024));
  var size = srcsize / Math.pow(1024, index);
  size = size.toFixed(2);
  return size + unitArr[index];
};
const getSuffix = function(filePath) {
  var index = filePath.lastIndexOf(".");
  var ext = filePath.substr(index + 1);
  return ext;
};
const isImage = function(ext) {
  return [
    "png",
    "jpg",
    "jpeg",
    "bmp",
    "gif",
    "webp",
    "psd",
    "svg",
    "tiff"
  ].indexOf(ext.toLowerCase()) !== -1;
};
const isVideo = function(video) {
  return [
    "mp4",
    "m2v",
    "mkv",
    "rmvb",
    "wmv",
    "avi",
    "flv",
    "mov",
    "m4v"
  ].indexOf(video) !== -1;
};
const isEmall = function(value) {
  var reg = /\w+@[a-z0-9]+\.[a-z]{2,9}/;
  if (reg.test(value) === false) {
    return false;
  } else {
    return true;
  }
};
const typePhone = function(value) {
  var reg = /^1[23456789]\d{9}$/;
  if (reg.test(value) === false) {
    return false;
  } else {
    return true;
  }
};
const timedown = (value) => {
  let newDate = common_vendor.dayjs(new Date()).format("YYYY/MM/DD HH:mm");
  let oldDate = common_vendor.dayjs(value).format("YYYY/MM/DD HH:mm");
  let nd = new Date(newDate).getTime();
  let od = new Date(oldDate).getTime();
  return Math.ceil((nd - od) / (1e3 * 60 * 60 * 24));
};
const timedownshow = (value) => {
  return common_vendor.dayjs(value).format("HH");
};
const timedownshowmm = (value) => {
  return common_vendor.dayjs(value).format("mm");
};
const timedownnum = (value) => {
  let newDate = common_vendor.dayjs(new Date()).format("YYYY/MM/DD").toString();
  let oldDate = common_vendor.dayjs(value).format("YYYY/MM/DD").toString();
  if (newDate == oldDate) {
    return true;
  } else {
    return false;
  }
};
const Debounce = (fn, t) => {
  let delay = t || 500;
  let timer;
  return function() {
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, delay);
  };
};
exports.Debounce = Debounce;
exports.bytesToSize = bytesToSize;
exports.getSuffix = getSuffix;
exports.isEmall = isEmall;
exports.isImage = isImage;
exports.isVideo = isVideo;
exports.timedown = timedown;
exports.timedownnum = timedownnum;
exports.timedownshow = timedownshow;
exports.timedownshowmm = timedownshowmm;
exports.typePhone = typePhone;
