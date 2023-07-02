"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onLoad(option) {
    console.log(JSON.parse(option.list));
    console.log(6969);
    this.$nextTick(() => {
    });
  },
  components: {},
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageUpload/upload/upload.vue"]]);
wx.createPage(MiniProgramPage);
