"use strict";
var common_vendor = require("../../common/vendor.js");
const tabber = () => "../../components/tabber.js";
const _sfc_main = {
  data() {
    return {};
  },
  onLoad() {
  },
  components: {
    tabber
  },
  methods: {}
};
if (!Array) {
  const _component_tabber = common_vendor.resolveComponent("tabber");
  _component_tabber();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      pagePath: "/pageMy/my/my"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageMy/my/my.vue"]]);
wx.createPage(MiniProgramPage);
