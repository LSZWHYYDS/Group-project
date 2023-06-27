"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var utils_api = require("../../utils/api.js");
var common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const filePop = () => "../../pages/filePop/filePop.js";
const shareSetting = () => "./shareSetting.js";
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
      button_1: 0
    };
  },
  components: {
    filePop,
    shareSetting
  },
  filters: {
    timedown(value) {
      return utils_index.timedown(value);
    },
    timedownshow(value) {
      return utils_index.timedownshow(value);
    },
    timedownshowmm(value) {
      return utils_index.timedownshowmm(value);
    },
    timedownnum(value) {
      return utils_index.timedownnum(value);
    }
  },
  methods: {
    multiplcShareFunc() {
      console.log("selectItemsAry");
      console.log(this.listItem);
      console.log("button_5");
      console.log(this.button_5);
      console.log("button_2");
      console.log(this.button_2);
      console.log("button_3");
      console.log(this.button_3);
      console.log("\u4E0B\u8F7D\u6B21\u6570");
      console.log(this.downNumber);
      console.log("\u65F6\u95F4");
      console.log(this.downDay);
      console.log("button_4");
      console.log(this.button_4);
      console.log("button_1");
      console.log(this.button_1);
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
        this.button_1 = 1;
      } else {
        this.button_1 = 0;
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
    maskClose() {
    },
    closePop() {
      this.$refs.midPop.close();
    },
    closeRename() {
      this.$refs.reNamePop.close();
    },
    closeDel() {
      this.$refs.delPop.close();
    },
    closeShare() {
      this.$refs.sharePop.close();
    },
    renameClick() {
      this.$refs.midPop.close();
      this.$refs.reNamePop.open();
    },
    shareClick() {
      this.$refs.midPop.close();
      this.$refs.shareSett.changeBtn();
      this.$refs.shareSett.selectItemsAry.push(this.listItem);
      this.$refs.shareSett.$refs.sharePop.open();
    },
    delClick() {
      this.$refs.midPop.close();
      this.$refs.delPop.open();
    },
    async deleteAry() {
      common_vendor.index.showLoading({ title: "\u5220\u9664\u4E2D" });
      let ary = [];
      this.selectItemsAry.push(this.listItem);
      this.selectItemsAry.forEach((item) => {
        let obj = {};
        if (item.moveType == "1") {
          obj.deleteID = item.fileId;
        } else {
          obj.deleteID = item.folderId;
        }
        obj.deleteType = item.moveType;
        ary.push(obj);
      });
      const res = await utils_api.batchDelete(ary);
      if (res.data.code !== 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: res.data.msg
        });
        return;
      } else {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          icon: "none",
          title: res.data.msg
        });
        this.$emit("getCreateData");
        this.closeDel();
      }
    },
    async confirmName() {
      if (this.resetName == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u6587\u4EF6\u540D\uFF01"
        });
        return;
      }
      let params = this.listItem;
      let res = await utils_api.verifyExist(params.superFolder, this.resetName);
      console.log(this.resetName);
      if (res.data.code == 1) {
        common_vendor.index.showToast({
          icon: "none",
          title: res.data.msg
        });
        return;
      } else {
        let o = {};
        if (params.moveType == "2") {
          o.renameID = params.folderId;
          o.renameType = params.moveType;
        } else {
          o.renameID = params.fileId;
          o.renameType = params.moveType;
        }
        o.renameName = this.resetName;
        utils_api.rename(o).then((res2) => {
          if (res2.data.code == "0") {
            this.dialogTableVisible = false;
            common_vendor.index.showToast({
              icon: "none",
              title: res2.data.msg
            });
            this.resetName = "";
            this.resetNameShow = false;
            this.$emit("getCreateData");
            this.closeRename();
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: res2.data.msg
            });
          }
        });
      }
    },
    dateFormate(val) {
      let day11 = this.$options.filters["timedown"](val);
      let daynum = this.$options.filters["timedownnum"](val);
      if (daynum == true) {
        let timeHH = this.$options.filters["timedownshow"](val);
        let timeMM = this.$options.filters["timedownshowmm"](val);
        return "\u4ECA\u5929  " + timeHH + ":" + timeMM;
      } else if (day11 <= 2 && daynum == false) {
        let timeHH = this.$options.filters["timedownshow"](val);
        let timeMM = this.$options.filters["timedownshowmm"](val);
        return "\u6628\u5929  " + timeHH + ":" + timeMM;
      } else {
        return val;
      }
    },
    byTes(value) {
      if (value <= 0) {
        return "0B";
      }
      return utils_index.bytesToSize(value);
    }
  }
};
if (!Array) {
  const _component_filePop = common_vendor.resolveComponent("filePop");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_shareSetting = common_vendor.resolveComponent("shareSetting");
  (_component_filePop + _easycom_uni_popup2 + _component_shareSetting)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showPage
  }, $data.showPage ? common_vendor.e({
    b: $data.listItem.fileClass == "image"
  }, $data.listItem.fileClass == "image" ? {
    c: common_assets._imports_8
  } : {}, {
    d: $data.listItem.fileClass == "video"
  }, $data.listItem.fileClass == "video" ? {
    e: common_assets._imports_9
  } : {}, {
    f: $data.listItem.fileClass == "file"
  }, $data.listItem.fileClass == "file" ? {
    g: common_assets._imports_10
  } : {}, {
    h: $data.listItem.fileClass == "floder"
  }, $data.listItem.fileClass == "floder" ? {
    i: common_assets._imports_4
  } : {}, {
    j: common_vendor.t($data.listItem.name),
    k: common_vendor.t($options.dateFormate($data.listItem.createDate)),
    l: common_vendor.t($options.byTes($data.listItem.size)),
    m: common_assets._imports_3,
    n: common_vendor.o((...args) => $options.closePop && $options.closePop(...args)),
    o: common_vendor.o((...args) => $options.renameClick && $options.renameClick(...args)),
    p: common_vendor.o((...args) => $options.shareClick && $options.shareClick(...args)),
    q: common_vendor.o((...args) => $options.delClick && $options.delClick(...args)),
    r: common_vendor.sr("midPop", "441e0c64-0"),
    s: common_vendor.o($options.maskClose),
    t: common_vendor.o($options.closePop)
  }) : {}, {
    v: common_vendor.o((...args) => $options.closeRename && $options.closeRename(...args)),
    w: common_assets._imports_3,
    x: common_vendor.o((...args) => $options.confirmName && $options.confirmName(...args)),
    y: $data.resetName,
    z: common_vendor.o(($event) => $data.resetName = $event.detail.value),
    A: common_vendor.sr("reNamePop", "441e0c64-1"),
    B: common_vendor.o($options.closeRename),
    C: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    }),
    D: common_vendor.o((...args) => $options.closeDel && $options.closeDel(...args)),
    E: common_assets._imports_3,
    F: common_vendor.o(($event) => $options.deleteAry()),
    G: common_vendor.o((...args) => $options.closeDel && $options.closeDel(...args)),
    H: common_vendor.sr("delPop", "441e0c64-2"),
    I: common_vendor.o($options.closeDel),
    J: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    }),
    K: common_vendor.sr("shareSett", "441e0c64-3")
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-441e0c64"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageIndex/components/indexPop.vue"]]);
wx.createComponent(Component);
