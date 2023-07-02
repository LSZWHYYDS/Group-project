"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_base = require("../../utils/base.js");
var utils_api = require("../../utils/api.js");
var common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
const _sfc_main = {
  data() {
    return {
      showPage: true,
      resetName: "",
      listItem: {
        name: "",
        size: "",
        fileClass: ""
      },
      selectItemsAry: [],
      button_2: 0,
      button_3: "",
      passwordShow: false,
      button_5: "",
      downNumber: 10,
      downDay: 1,
      button_4: 0,
      button_1: 0,
      fileListAllNum: 0,
      code: "",
      overTime: "",
      shareUrl: "",
      superFolder: 0
    };
  },
  components: {},
  methods: {
    async multiplcShareFunc(val) {
      if (this.selectItemsAry.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u6587\u4EF6"
        });
        return;
      }
      console.log(this.superFolder);
      console.log(this.selectItemsAry);
      let data = {};
      let fileIdList = [];
      let folderIdList = [];
      let fileNum = this.selectItemsAry.length;
      console.log(fileNum);
      if (fileNum == 0)
        return;
      let filesize = 0;
      let isShow = false;
      this.selectItemsAry.forEach((item) => {
        if (item.moveType == "2") {
          filesize += item.folderSize * 1;
          folderIdList.push(item.folderId);
        } else {
          filesize += item.fileSize * 1;
          fileIdList.push(item.fileId);
        }
        if (item.folderName) {
          if (item.filesNum == 0) {
            isShow = true;
            return;
          }
        }
      });
      data.filesSize = filesize;
      if (filesize == 0 || isShow == true) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u7A7A\u6587\u4EF6\u4E0D\u80FD\u5206\u4EAB"
        });
        return;
      }
      data.downloadLimit = this.downNumber;
      data.downDay = this.downDay;
      data.openPass = this.button_2;
      data.pass = this.button_3;
      data.enablePreview = this.button_4;
      data.shareFlow = this.button_1;
      data.description = this.button_5;
      let transfersVO = data;
      const ever = await utils_api.everBoxShare({
        transfersVO,
        fileIdList,
        folderIdList,
        superFolder: 0
      });
      console.log(ever.data);
      if (ever.data.code == 1) {
        common_vendor.index.showToast({ icon: "none", title: res.data.msg });
        return;
      }
      this.fileListAllNum = ever.data.data.filesNum;
      this.code = ever.data.data.pickupCode;
      const transferGuid = ever.data.data.transferGuid;
      this.overTime = ever.data.data.validDate;
      this.shareUrl = utils_base.urlOSS + ever.data.data.link;
      await utils_api.sendEmailAndSMS(transferGuid);
      if (val == 1) {
        console.log(this.shareUrl);
        common_vendor.index.showToast({ title: "\u521B\u5EFA\u5206\u4EAB\u6210\u529F\uFF01" });
        console.log(this.selectItemsAry);
        console.log(this.listName);
        this.$refs.sharePop.close();
      }
      return;
    },
    changeBtn() {
      if (!this.button_5) {
        this.button_5 = "\u4F20\u8F93\u6587\u4EF6\u63CF\u8FF0\uFF08\u9009\u586B\uFF09...";
        let timeId = setTimeout(() => {
          this.button_5 = "";
          clearTimeout(timeId);
        }, 50);
      }
    },
    switch2Change(e) {
      let check = e.target.value;
      if (check) {
        this.button_2 = 1;
      } else {
        this.button_2 = 0;
      }
      console.log(this.button_2);
    },
    switch1Change(e) {
      let check = e.target.value;
      if (check) {
        this.button_1 = 0;
      } else {
        this.button_1 = 1;
      }
      console.log(this.button_1);
    },
    switch4Change(e) {
      let check = e.target.value;
      if (check) {
        this.button_4 = 1;
      } else {
        this.button_4 = 0;
      }
      console.log(this.button_4);
    },
    bindTextAreaBlur(val) {
      console.log(val);
      console.log(this.button_5);
    },
    resetDate() {
      this.button_5 = "";
      this.button_2 = 0;
      this.passwordShow = false;
      this.downNumber = 10;
      this.downDay = 1;
      this.button_4 = 0;
      this.button_1 = 0;
    },
    closeShare() {
      this.resetDate();
      this.$refs.sharePop.close();
    }
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_number_box2 + _easycom_uni_tooltip2 + _easycom_uni_popup2)();
}
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_tooltip = () => "../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_number_box + _easycom_uni_tooltip + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.closeShare && $options.closeShare(...args)),
    b: common_assets._imports_3,
    c: common_vendor.o((...args) => $options.bindTextAreaBlur && $options.bindTextAreaBlur(...args)),
    d: $data.button_5,
    e: common_vendor.o(($event) => $data.button_5 = $event.detail.value),
    f: $data.button_2 == 0
  }, $data.button_2 == 0 ? {} : common_vendor.e({
    g: $data.passwordShow ? "text" : "password",
    h: $data.button_3,
    i: common_vendor.o(($event) => $data.button_3 = $event.detail.value),
    j: $data.passwordShow
  }, $data.passwordShow ? {
    k: common_vendor.o(($event) => $data.passwordShow = false),
    l: common_assets._imports_1$1
  } : {
    m: common_vendor.o(($event) => $data.passwordShow = true),
    n: common_assets._imports_2$1
  }), {
    o: $data.button_2 == 1,
    p: common_vendor.o((...args) => $options.switch2Change && $options.switch2Change(...args)),
    q: common_vendor.o(($event) => $data.downNumber = $event),
    r: common_vendor.p({
      min: 1,
      max: 999,
      modelValue: $data.downNumber
    }),
    s: common_vendor.o(($event) => $data.downDay = $event),
    t: common_vendor.p({
      min: 1,
      max: 9999,
      modelValue: $data.downDay
    }),
    v: $data.button_4 == 1,
    w: common_vendor.o((...args) => $options.switch4Change && $options.switch4Change(...args)),
    x: common_assets._imports_3$1,
    y: common_vendor.p({
      content: "\u5BF9\u65B9\u4E0B\u8F7D\u65F6\u4F7F\u7528\u60A8\u7684\u6D41\u91CF"
    }),
    z: $data.button_1 == 0,
    A: common_vendor.o((...args) => $options.switch1Change && $options.switch1Change(...args)),
    B: common_vendor.o(($event) => $options.multiplcShareFunc(1)),
    C: common_vendor.sr("sharePop", "1ed83ac0-0"),
    D: common_vendor.o($options.closeShare),
    E: common_vendor.p({
      type: "bottom",
      ["mask-click"]: false,
      ["safe-area"]: false
    })
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1ed83ac0"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageIndex/components/shareSetting.vue"]]);
wx.createComponent(Component);
