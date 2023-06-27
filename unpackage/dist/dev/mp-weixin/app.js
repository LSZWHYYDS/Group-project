"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
require("./utils/api.js");
require("./utils/http.js");
require("./utils/index1.js");
require("./utils/base.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/login/phoneEmail.js";
  "./pages/login/forgetPassword.js";
  "./pageIndex/index/index.js";
  "./pageIndex/index/upload.js";
  "./pageIndex/index/searchCloud.js";
  "./pageMy/my/my.js";
  "./pageUpload/upload/upload.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Code/BeiJing-Digitalsee/Group-project/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
