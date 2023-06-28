"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const utils_api = require("../../utils/api.js");
require("../../utils/ali-oss.js");
const common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const indexPop = () => "../components/indexPop.js";
const _sfc_main = {
  data() {
    return {
      searchValue: "",
      renameVal: "23334",
      searchFileList: [],
      searchFloList: [],
      folderId: 0,
      breadCrumList: [],
      selectArray: [],
      selectItemsAry: []
    };
  },
  components: {
    indexPop
  },
  onLoad(option) {
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
    ...common_vendor.mapMutations(["SET_FILELIST"]),
    ...common_vendor.mapActions(["REQUEST_FLOW"]),
    byTes(value) {
      if (value <= 0) {
        return "0B";
      }
      return utils_index.bytesToSize(value);
    },
    getDetail(item) {
      let superFolder = 0;
      if (this.breadCrumList.length !== 0) {
        superFolder = this.breadCrumList[this.breadCrumList.length - 1].folderId;
      }
      this.superFolder = superFolder;
      console.log(item);
      this.$refs.indexPop.showPage = true;
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
    maskClose() {
    },
    goFolder(item) {
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
    breadFunc(item, index) {
      this.selectArray = [];
      console.log(this.selectArray);
      if (item == 0) {
        this.breadCrumList = [];
        this.folderId = 0;
        this.createData();
        return;
      }
      this.breadCrumList.splice(index + 1, this.breadCrumList.length);
      this.folderId = item.folderId;
      this.createData();
    },
    //初始化数据
    async createData() {
      let folderId = this.folderId;
      utils_api.getEverboxList({
        superFolder: folderId,
        pageNum: this.pageNum,
        pageSize: 1e3,
        defaultSort: this.defaultSort,
        //默认时间排序 true
        timeSort: this.timeSort,
        //时间排序
        sizeSort: this.sizeSort
        //文件或文件夹大小排序
      }).then((res) => {
        if (res.data.code == 401) {
          return;
        }
        this.openNewListData(res);
      });
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
    renameClick() {
      this.$refs.midPop.close();
      this.$refs.reNamePop.open();
    },
    delClick() {
      this.$refs.midPop.close();
      this.$refs.delPop.open();
    },
    search(res) {
      common_vendor.index.showToast({
        title: "搜索：" + res.value,
        icon: "none"
      });
    },
    searchChange() {
      this.breadCrumList = [];
      if (this.searchValue == "") {
        this.searchFileList = [];
        this.searchFloList = [];
        return;
      }
      utils_api.getEverBoXFiles(this.searchValue).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          let data = res.data.data;
          if (data.filesList.length == 0 && data.foldersList.length == 0) {
            common_vendor.index.showToast({
              icon: "none",
              title: "暂无数据"
            });
            return;
          }
          this.searchFileList = data.filesList;
          this.searchFloList = data.foldersList;
          this.openNewListData(res);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: "暂未查询到该文件"
          });
        }
      });
    },
    // 处理日期
    dateFormate(val) {
      let day11 = this.$options.filters["timedown"](val);
      let daynum = this.$options.filters["timedownnum"](val);
      if (daynum == true) {
        let timeHH = this.$options.filters["timedownshow"](val);
        let timeMM = this.$options.filters["timedownshowmm"](val);
        return "今天  " + timeHH + ":" + timeMM;
      } else if (day11 <= 2 && daynum == false) {
        let timeHH = this.$options.filters["timedownshow"](val);
        let timeMM = this.$options.filters["timedownshowmm"](val);
        return "昨天  " + timeHH + ":" + timeMM;
      } else {
        return val;
      }
    },
    openNewListData(res) {
      this.timeDate = [];
      let flodersList = res.data.data.foldersList;
      flodersList.forEach((item) => {
        item.showSearch = true;
        item.select = false;
        item.moveType = "2";
        item.utilsType = false;
        let day11 = this.$options.filters["timedown"](item.createDate);
        let daynum = this.$options.filters["timedownnum"](item.createDate);
        if (daynum == true) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("今天  " + timeHH + ":" + timeMM);
        } else if (day11 <= 2 && daynum == false) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
        } else {
          this.timeDate.push(item.createDate);
        }
      });
      let fileList = res.data.data.filesList;
      fileList.forEach((item) => {
        item.showSearch = true;
        item.select = false;
        item.moveType = "1";
        item.utilsType = false;
        let fileType = utils_index.getSuffix(item.fileName);
        let day11 = this.$options.filters["timedown"](item.createDate);
        let daynum = this.$options.filters["timedownnum"](item.createDate);
        if (daynum == true) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("今天  " + timeHH + ":" + timeMM);
        } else if (day11 <= 2 && daynum == false) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
        } else {
          this.timeDate.push(item.createDate);
        }
        if (utils_index.isImage(fileType)) {
          item.fileClass = "image";
        } else if (utils_index.isVideo(fileType)) {
          item.fileClass = "video";
        } else {
          item.fileClass = "file";
        }
      });
      this.searchFloList = [];
      this.searchFloList = this.searchFloList.concat(flodersList);
      this.searchFileList = [];
      this.searchFileList = this.searchFileList.concat(fileList);
      console.log(this.searchFileList);
      console.log(this.searchFloList);
    },
    input(res) {
      this.searchValue = res;
      console.log("----input:", res);
      this.searchChange();
    },
    qhdwd() {
      this.select_3 = false;
      this.timeshow = true;
      this.downDay = "1";
      this.downDayshow = "1天";
    }
  },
  computed: {
    ...common_vendor.mapState({
      // userFlowData: (store) =>
      // 	 uni.getStorageSync("userFlowData") ?
      // 	JSON.parse(store.state.userFlowData) : {},
      userFlowData: (state) => common_vendor.index.getStorageSync("userFlowData") ? JSON.parse(state.userFlowData) : {}
      // files: (state) => state.files,
      // pro: (state) => state.progress,
      // parentTOP: (state) => state.top,
    })
  },
  mounted() {
  }
};
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _component_indexPop = common_vendor.resolveComponent("indexPop");
  (_easycom_uni_search_bar2 + _component_indexPop)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.search),
    b: common_vendor.o($options.input),
    c: common_vendor.o(($event) => $data.searchValue = $event),
    d: common_vendor.p({
      focus: true,
      modelValue: $data.searchValue
    }),
    e: $data.searchFloList.length + $data.searchFileList.length > 0 || $data.breadCrumList.length > 0
  }, $data.searchFloList.length + $data.searchFileList.length > 0 || $data.breadCrumList.length > 0 ? {
    f: common_vendor.o(($event) => $options.searchChange()),
    g: common_vendor.f($data.breadCrumList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.folderName),
        b: common_vendor.o(($event) => $options.breadFunc(item, index), index),
        c: index
      };
    })
  } : {}, {
    h: common_vendor.f($data.searchFloList, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.goFolder(item), index),
        b: common_vendor.t(item.folderName),
        c: common_vendor.t($options.dateFormate(item.createDate)),
        d: common_vendor.t($options.byTes(item.folderSize)),
        e: common_vendor.o(($event) => $options.goFolder(item), index),
        f: common_vendor.o(($event) => $options.getDetail(item), index),
        g: index
      };
    }),
    i: common_assets._imports_4,
    j: common_assets._imports_5,
    k: common_vendor.f($data.searchFileList, (item, index, i0) => {
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
        i: common_vendor.t($options.byTes(item.fileSize)),
        j: common_vendor.o(($event) => $options.getDetail(item), index),
        k: index
      });
    }),
    l: common_assets._imports_5,
    m: common_vendor.sr("indexPop", "6020ab87-1"),
    n: common_vendor.o(($event) => $options.searchChange())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6020ab87"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pageIndex/index/searchCloud.vue"]]);
wx.createPage(MiniProgramPage);
