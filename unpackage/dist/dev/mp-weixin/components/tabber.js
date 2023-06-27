"use strict";
var common_vendor = require("../common/vendor.js");
var common_assets = require("../common/assets.js");
const filePop = () => "../pages/filePop/filePop.js";
const _sfc_main = {
  props: {
    pagePath: {
      type: String,
      default: "/pageIndex/index/index"
    }
  },
  data() {
    return {
      showPage: false,
      containerHeight: 400,
      tabbar: [
        {
          "pagePath": "/pageIndex/index/index",
          "text": "\u6587\u4EF6"
        },
        {
          "text": "add"
        },
        {
          "pagePath": "/pageMy/my/my",
          "text": "\u6211\u7684"
        }
      ],
      uploadList: [],
      imageStyles: {
        "height": 0,
        "width": 0
      }
    };
  },
  components: {
    filePop
  },
  mounted() {
  },
  methods: {
    sentFile() {
      common_vendor.index.chooseMessageFile({
        count: 6,
        extension: [".zip", ".doc"],
        success: function(res) {
          console.log(JSON.stringify(res.tempFilePaths));
        }
      });
    },
    getCode() {
      console.log(111);
    },
    uploadSelect(e, type) {
      console.log(e);
      return;
    },
    changeTab(item) {
      console.log(item.pagePath);
      console.log(this.pagePath);
      console.log(111);
      if (item.pagePath) {
        this.$emit("pagePath", JSON.stringify(item.pagePath));
        common_vendor.index.reLaunch({
          url: item.pagePath,
          animationType: "none"
        });
      } else {
        this.showPage = true;
        this.$refs.midPop.showPop();
      }
    },
    closePop() {
      this.showPage = false;
    }
  }
};
if (!Array) {
  const _component_filePop = common_vendor.resolveComponent("filePop");
  _component_filePop();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabbar, (item, index, i0) => {
      return common_vendor.e({
        a: item.pagePath == $props.pagePath && $props.pagePath == "/pageIndex/index/index" && item.text !== "add"
      }, item.pagePath == $props.pagePath && $props.pagePath == "/pageIndex/index/index" && item.text !== "add" ? {
        b: common_assets._imports_0$2
      } : item.pagePath == $props.pagePath && $props.pagePath == "/pageMy/my/my" && item.text !== "add" ? {
        d: common_assets._imports_1$2
      } : common_vendor.e({
        e: item.text == "add"
      }, item.text == "add" ? {
        f: common_assets._imports_2$2
      } : {
        g: common_vendor.t(item.text)
      }), {
        c: item.pagePath == $props.pagePath && $props.pagePath == "/pageMy/my/my" && item.text !== "add",
        h: item.pagePath == $props.pagePath ? 1 : "",
        i: index,
        j: common_vendor.o(($event) => $options.changeTab(item), index)
      });
    }),
    b: common_assets._imports_3$2,
    c: common_assets._imports_4$1,
    d: common_assets._imports_5$1,
    e: common_vendor.o((...args) => $options.getCode && $options.getCode(...args)),
    f: common_assets._imports_6$1,
    g: common_assets._imports_7$1,
    h: common_vendor.o((...args) => $options.closePop && $options.closePop(...args)),
    i: common_vendor.sr("midPop", "7783c656-0"),
    j: $data.showPage
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7783c656"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/components/tabber.vue"]]);
wx.createComponent(Component);
