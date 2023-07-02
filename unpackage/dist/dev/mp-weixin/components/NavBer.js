"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      height: 0,
      paddingTop: 0
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#fff"
    },
    background: {
      type: String,
      default: "transparent"
    },
    back: {
      type: Boolean,
      default: false
    }
  },
  created() {
    const demo = common_vendor.index.getMenuButtonBoundingClientRect();
    this.height = demo.height + "px";
    this.paddingTop = demo.top + "px";
  },
  methods: {
    onBack() {
      this.$emit("onBack");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.back
  }, $props.back ? {
    b: common_vendor.p({
      type: "arrowleft",
      size: "30",
      color: $props.color
    }),
    c: common_vendor.o((...args) => $options.onBack && $options.onBack(...args)),
    d: common_vendor.s({
      color: $props.color
    }),
    e: common_vendor.s({
      paddingTop: $data.paddingTop
    })
  } : {}, {
    f: common_vendor.t($props.title),
    g: common_vendor.s({
      background: $props.background
    }),
    h: common_vendor.s({
      color: $props.color
    }),
    i: common_vendor.s({
      height: $data.height
    }),
    j: common_vendor.s({
      paddingTop: $data.paddingTop
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/components/NavBer.vue"]]);
wx.createComponent(Component);
