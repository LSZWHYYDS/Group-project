"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
require("../../utils/base.js");
var utils_api = require("../../utils/api.js");
require("../../utils/ali-oss.js");
var common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
const indexPop = () => "../components/indexPop.js";
const shareSetting = () => "../components/shareSetting.js";
const share = () => "../myShare/myShare.js";
const progressBar = () => "../../components/liu-progressbar/liu-progressbar.js";
const tabber = () => "../../components/tabber.js";
const _sfc_main = {
  data() {
    return {
      number: 1,
      sortNum: 1,
      isSelectAll: false,
      isShowTitle: true,
      timeDate: [],
      timename: [],
      fileList: [],
      flodersList: [],
      filezonglist: [],
      folderId: 0,
      breadCrumList: [],
      selectArray: [],
      selectItemsAry: [],
      itemData: "",
      allSelect: false,
      quanxuan: true,
      pageNum: 1,
      timeSort: false,
      sizeSort: false,
      defaultSort: true,
      showPage: false
    };
  },
  onLoad() {
    console.log("\u6D4B\u8BD5log");
  },
  components: {
    tabber,
    indexPop,
    shareSetting,
    share,
    progressBar
  },
  created() {
    common_vendor.index.hideKeyboard();
  },
  methods: {
    closeSelect() {
      this.isSelectAll = false;
      for (let i = 0; i < this.selectItemsAry.length; i++) {
        this.selectItemsAry[i].select = false;
      }
      this.selectItemsAry = [];
    },
    closePop() {
      this.$refs.midPop.close();
    },
    closeDel() {
      this.$refs.delAll.close();
    },
    selectShare() {
      if (this.selectItemsAry.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u6587\u4EF6"
        });
        return;
      }
      this.$refs.selectRef.changeBtn();
      this.$refs.selectRef.selectItemsAry = this.selectItemsAry;
      this.$refs.selectRef.$refs.sharePop.open();
    },
    multiplcDeleteFunc() {
      if (this.selectItemsAry.length == 0) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u9009\u62E9\u6587\u4EF6"
        });
        return;
      }
      this.$refs.delAll.open();
    },
    async deleteSelectList() {
      common_vendor.index.showLoading({
        title: "\u5220\u9664\u4E2D"
      });
      let ary = [];
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
        this.selectItemsAry = [];
        this.closeDel();
        this.createData();
      }
    },
    maskClose() {
    },
    getDetail(item) {
      let superFolder = 0;
      if (this.breadCrumList.length !== 0) {
        superFolder = this.breadCrumList[this.breadCrumList.length - 1].folderId;
      }
      this.superFolder = superFolder;
      console.log(item);
      this.$refs.indexPop.showPage = true;
      this.$refs.indexPop.$refs.shareSett.superFolder = superFolder;
      this.$refs.indexPop.$refs.midPop.showPop();
      this.$refs.indexPop.$refs.midPop.isShow = true;
      let listItem = item;
      if (item.moveType == 2) {
        listItem.fileClass = "floder";
      } else {
        let fileType = utils_index.getSuffix(item.fileName);
        if (utils_index.isImage(fileType)) {
          item.fileClass = "image";
        } else if (utils_index.isVideo(fileType)) {
          item.fileClass = "video";
        } else {
          item.fileClass = "file";
        }
      }
      if (item.fileSize) {
        listItem.size = item.fileSize;
      } else {
        listItem.size = item.folderSize;
      }
      if (item.fileName) {
        listItem.name = item.fileName;
      } else {
        listItem.name = item.folderName;
      }
      this.$refs.indexPop.listItem = listItem;
    },
    allSelectFunc() {
      this.quanxuan = false;
      this.fileList.forEach((item) => item.select = true);
      this.flodersList.forEach((item) => item.select = true);
      this.allSelect = !this.allSelect;
      this.selectItemsAry = this.selectItemsAry.concat(this.fileList).concat(this.flodersList);
    },
    cancelAllSelectFunc() {
      this.quanxuan = true;
      this.fileList.forEach((item) => item.select = false);
      this.flodersList.forEach((item) => item.select = false);
      this.allSelect = !this.allSelect;
      this.selectItemsAry = [];
    },
    delItemsFunc(val) {
      this.selectItemsAry.push(val);
      this.itemData = val;
      val.select = true;
      console.log(this.selectItemsAry);
    },
    breadFunc(item, index) {
      this.selectArray = [];
      this.checked = false;
      console.log(this.selectArray);
      if (item == 0) {
        this.breadCrumList = [];
        this.folderId = 0;
        this.isShowTitle = true;
        this.createData();
        return;
      }
      this.breadCrumList.splice(index + 1, this.breadCrumList.length);
      this.folderId = item.folderId;
      this.createData();
    },
    async createData() {
      let folderId = this.folderId;
      utils_api.getEverboxList({
        superFolder: folderId,
        pageNum: this.pageNum,
        pageSize: 1e3,
        defaultSort: this.defaultSort,
        timeSort: this.timeSort,
        sizeSort: this.sizeSort
      }).then((res) => {
        if (res.data.code == 401) {
          return;
        }
        this.openNewListData(res);
      });
    },
    selectItemFunc(val) {
      val.select = false;
      this.allSelect = false;
      for (let i = 0; i < this.selectItemsAry.length; i++) {
        if (this.selectItemsAry[i].select == false) {
          this.selectItemsAry.splice(i, 1);
        }
      }
      console.log(this.selectItemsAry);
    },
    goFolder(item) {
      if (this.isSelectAll)
        return;
      this.isShowTitle = false;
      this.folderId = item.folderId;
      this.breadCrumList.push(item);
      utils_api.getEverboxList({
        superFolder: item.folderId,
        pageNum: this.pageNum,
        defaultSort: true,
        timeSort: false,
        pageSize: 1e3
      }).then((res) => {
        if (res.data.code == 0) {
          this.openNewListData(res);
          this.selectArray = [];
        }
      });
    },
    openNewListData(res) {
      let flodersList = res.data.data.foldersList;
      flodersList.forEach((item) => {
        item.select = false;
        item.moveType = "2";
        item.utilsType = false;
        let day11 = this.$options.filters["timedown"](item.createDate);
        let daynum = this.$options.filters["timedownnum"](item.createDate);
        if (daynum == true) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("\u4ECA\u5929  " + timeHH + ":" + timeMM);
        } else if (day11 <= 2 && daynum == false) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("\u6628\u5929  " + timeHH + ":" + timeMM);
        } else {
          this.timeDate.push(item.createDate);
        }
      });
      let fileList = res.data.data.filesList;
      fileList.forEach((item) => {
        item.select = false;
        item.moveType = "1";
        item.utilsType = false;
        let day11 = this.$options.filters["timedown"](item.createDate);
        let daynum = this.$options.filters["timedownnum"](item.createDate);
        let nametyp = item.fileName;
        let numsplit = nametyp.split(".")[0];
        let houwen = nametyp.split(".")[nametyp.split(".").length - 1];
        let numpd = numsplit.length;
        if (numpd <= 10) {
          this.timename.push(numsplit + "." + houwen);
        } else {
          let qianwen = numsplit.substring(0, 10);
          this.timename.push(qianwen + "... ." + houwen);
        }
        if (daynum == true) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("\u4ECA\u5929  " + timeHH + ":" + timeMM);
        } else if (day11 <= 2 && daynum == false) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("\u6628\u5929  " + timeHH + ":" + timeMM);
        } else {
          this.timeDate.push(item.createDate);
        }
        let fileType = utils_index.getSuffix(item.fileName);
        if (utils_index.isImage(fileType)) {
          item.fileClass = "image";
        } else if (utils_index.isVideo(fileType)) {
          item.fileClass = "video";
        } else {
          item.fileClass = "file";
        }
      });
      this.flodersList = [];
      this.flodersList = this.flodersList.concat(flodersList);
      this.fileList = [];
      this.fileList = this.fileList.concat(fileList);
    },
    closeSort() {
      this.$refs.sortPop.close();
    },
    titleChange(index) {
      console.log(index);
      this.number = index;
    },
    bodyCloseSelected() {
      this.isShowCollect = false;
    },
    searchClick() {
      common_vendor.index.navigateTo({
        url: "/pageIndex/index/searchCloud"
      });
    },
    showSort() {
      this.$refs.sortPop.open();
    },
    selectAll() {
      this.isSelectAll = true;
    },
    sortClick(num) {
      this.sortNum = num;
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
  },
  computed: __spreadValues({}, common_vendor.mapState({
    userFlowData: (state) => common_vendor.index.getStorageSync("userFlowData") ? JSON.parse(state.userFlowData) : {}
  })),
  filters: {
    typeDate(value) {
      if (!value)
        return;
      return DateYMD(value.expireDate);
    },
    hiddenAccout(value) {
      if (!value) {
        return;
      } else {
        return value.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
      }
    },
    formatinstDataaa(value) {
      return formatinstData(value);
    },
    residue(value) {
      return residuePrecision(value);
    },
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
  async mounted() {
    const file = await utils_api.getEverboxList({
      superFolder: 0,
      pageNum: 1,
      defaultSort: true,
      timeSort: false,
      pageSize: 1e3
    });
    if (file.data.code == 0) {
      await this.openNewListData(file);
    }
  }
};
if (!Array) {
  const _component_share = common_vendor.resolveComponent("share");
  const _component_indexPop = common_vendor.resolveComponent("indexPop");
  const _component_shareSetting = common_vendor.resolveComponent("shareSetting");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _component_tabber = common_vendor.resolveComponent("tabber");
  (_component_share + _component_indexPop + _component_shareSetting + _easycom_uni_popup2 + _component_tabber)();
}
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  _easycom_uni_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isSelectAll && $data.isShowTitle
  }, !$data.isSelectAll && $data.isShowTitle ? {
    b: common_vendor.o(($event) => $options.titleChange(0)),
    c: $data.number === 0 ? 1 : "",
    d: common_vendor.o(($event) => $options.titleChange(1)),
    e: $data.number === 1 ? 1 : "",
    f: common_vendor.o(($event) => $options.titleChange(2)),
    g: $data.number === 2 ? 1 : ""
  } : {}, {
    h: common_vendor.sr("shareRef", "5e3ad3ab-0"),
    i: $data.number === 0,
    j: !$data.isSelectAll
  }, !$data.isSelectAll ? {
    k: common_assets._imports_0$1,
    l: common_vendor.o((...args) => $options.searchClick && $options.searchClick(...args)),
    m: common_vendor.o((...args) => $options.showSort && $options.showSort(...args)),
    n: common_assets._imports_1,
    o: common_vendor.o((...args) => $options.selectAll && $options.selectAll(...args)),
    p: common_assets._imports_2,
    q: $data.isShowTitle == false ? 1 : ""
  } : common_vendor.e({
    r: common_assets._imports_3,
    s: common_vendor.o((...args) => $options.closeSelect && $options.closeSelect(...args)),
    t: $data.quanxuan
  }, $data.quanxuan ? {
    v: common_vendor.o((...args) => $options.allSelectFunc && $options.allSelectFunc(...args))
  } : {
    w: common_vendor.o((...args) => $options.cancelAllSelectFunc && $options.cancelAllSelectFunc(...args))
  }), {
    x: $data.isShowTitle == false
  }, $data.isShowTitle == false ? {
    y: common_vendor.o(($event) => $options.breadFunc(0)),
    z: common_vendor.f($data.breadCrumList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.folderName),
        b: common_vendor.o(($event) => $options.breadFunc(item, index)),
        c: index
      };
    })
  } : {}, {
    A: common_vendor.f($data.flodersList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.goFolder(item)),
        b: common_vendor.t(item.folderName),
        c: common_vendor.t($options.dateFormate(item.createDate)),
        d: common_vendor.t($options.byTes(item.folderSize)),
        e: common_vendor.o(($event) => $options.goFolder(item))
      }, !$data.isSelectAll ? {
        f: common_assets._imports_5,
        g: common_vendor.o(($event) => $options.getDetail(item))
      } : common_vendor.e({
        h: !item.select
      }, !item.select ? {
        i: common_vendor.o(($event) => $options.delItemsFunc(item)),
        j: common_assets._imports_6
      } : {
        k: common_vendor.o(($event) => $options.selectItemFunc(item)),
        l: common_assets._imports_7
      }), {
        m: index
      });
    }),
    B: common_assets._imports_4,
    C: !$data.isSelectAll,
    D: common_vendor.f($data.fileList, (item, index, i0) => {
      return common_vendor.e({
        a: item.fileClass == "image"
      }, item.fileClass == "image" ? {
        b: common_assets._imports_8
      } : {}, {
        c: item.fileClass == "video"
      }, item.fileClass == "video" ? {
        d: common_assets._imports_9
      } : {}, {
        e: item.fileClass == "file"
      }, item.fileClass == "file" ? {
        f: common_assets._imports_10
      } : {}, {
        g: common_vendor.t(item.fileName),
        h: common_vendor.t($options.dateFormate(item.createDate)),
        i: common_vendor.t($options.byTes(item.fileSize))
      }, !$data.isSelectAll ? {
        j: common_assets._imports_5,
        k: common_vendor.o(($event) => $options.getDetail(item))
      } : common_vendor.e({
        l: !item.select
      }, !item.select ? {
        m: common_vendor.o(($event) => $options.delItemsFunc(item)),
        n: common_assets._imports_6
      } : {
        o: common_vendor.o(($event) => $options.selectItemFunc(item)),
        p: common_assets._imports_7
      }), {
        q: index
      });
    }),
    E: !$data.isSelectAll,
    F: $data.isSelectAll == true ? 1 : "",
    G: $data.number === 1,
    H: $data.number === 2,
    I: common_vendor.sr("indexPop", "5e3ad3ab-1"),
    J: common_vendor.o($options.createData),
    K: common_vendor.sr("selectRef", "5e3ad3ab-2"),
    L: common_vendor.o((...args) => $options.closeSort && $options.closeSort(...args)),
    M: common_assets._imports_3,
    N: $data.sortNum === 1
  }, $data.sortNum === 1 ? {
    O: common_assets._imports_11$1
  } : {}, {
    P: $data.sortNum === 1 ? 1 : "",
    Q: common_vendor.o(($event) => $options.sortClick(1)),
    R: $data.sortNum === 2
  }, $data.sortNum === 2 ? {
    S: common_assets._imports_11$1
  } : {}, {
    T: common_vendor.o(($event) => $options.sortClick(2)),
    U: $data.sortNum === 2 ? 1 : "",
    V: common_vendor.sr("sortPop", "5e3ad3ab-3"),
    W: common_vendor.o($options.closeSort),
    X: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    }),
    Y: common_vendor.o((...args) => $options.closeDel && $options.closeDel(...args)),
    Z: common_assets._imports_3,
    aa: common_vendor.o((...args) => $options.deleteSelectList && $options.deleteSelectList(...args)),
    ab: common_vendor.o((...args) => $options.closeDel && $options.closeDel(...args)),
    ac: common_vendor.sr("delAll", "5e3ad3ab-4"),
    ad: common_vendor.o($options.closeDel),
    ae: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    }),
    af: !$data.isSelectAll
  }, !$data.isSelectAll ? {
    ag: common_vendor.p({
      pagePath: "/pageIndex/index/index"
    })
  } : {}, {
    ah: $data.isSelectAll && $data.number == 1
  }, $data.isSelectAll && $data.number == 1 ? {
    ai: common_assets._imports_12,
    aj: common_assets._imports_13,
    ak: common_vendor.o((...args) => $options.selectShare && $options.selectShare(...args)),
    al: common_assets._imports_11,
    am: common_vendor.o((...args) => $options.multiplcDeleteFunc && $options.multiplcDeleteFunc(...args))
  } : {}, {
    an: common_vendor.o((...args) => $options.bodyCloseSelected && $options.bodyCloseSelected(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5e3ad3ab"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageIndex/index/index.vue"]]);
wx.createPage(MiniProgramPage);
