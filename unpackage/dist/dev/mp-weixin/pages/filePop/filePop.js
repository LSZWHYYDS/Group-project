"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    showPop() {
      this.$refs.popup.open("bottom");
    },
    maskClose() {
      this.$emit("maskClose");
    },
    close() {
      this.isShow = false;
    }
  }
  // computed: {
  // 	...mapState({
  // 		showFilePop: (state) => state.showFilePop,
  // 	}),
  // },
  // watch: {
  // 	showFilePop(val){
  // 		console.log(val)
  // 		console.log(2222222222222)
  // 	}
  // },
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  _easycom_uni_popup2();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.sr("popup", "e3cc7f53-0"),
    b: $data.isShow,
    c: common_vendor.o($options.maskClose),
    d: common_vendor.o($options.close),
    e: common_vendor.p({
      ["safe-area"]: false,
      type: "bottom"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e3cc7f53"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pages/filePop/filePop.vue"]]);
wx.createComponent(Component);
