"use strict";
const common_vendor = require("../common/vendor.js");
const utils_base = require("./base.js");
common_vendor.axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
common_vendor.axios.defaults.baseURL = utils_base.url;
common_vendor.axios.defaults.timeout = 1e3 * 5 * 60;
common_vendor.axios.defaults.adapter = common_vendor.mpAdapter;
common_vendor.axios.interceptors.request.use(
  (config) => {
    let Authorization = common_vendor.index.getStorageSync("token");
    console.log(Authorization);
    config.url;
    config.headers["Authorization"] = Authorization;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
common_vendor.axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
