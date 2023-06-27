"use strict";
require("./index1.js");
var utils_base = require("./base.js");
var common_vendor = require("../common/vendor.js");
var baseURL = utils_base.url;
const post = function(url, params) {
  return common_vendor.axios.post(baseURL + url, params).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
};
const get = function(url, params) {
  return common_vendor.axios.get(baseURL + url, params).then((response) => {
    return response;
  }).catch((error) => {
    return error;
  });
};
exports.get = get;
exports.post = post;
