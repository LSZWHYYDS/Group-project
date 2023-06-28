"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
require("../../utils/base.js");
const utils_api = require("../../utils/api.js");
require("../../utils/ali-oss.js");
const common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
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
      //文件列表
      flodersList: [],
      //文件夹列表
      filezonglist: [],
      //总文件列表
      folderId: 0,
      breadCrumList: [],
      selectArray: [],
      selectItemsAry: [],
      itemData: "",
      //单个操作的数据
      allSelect: false,
      quanxuan: true,
      //全选按钮切换
      pageNum: 1,
      timeSort: false,
      //按时间排序
      sizeSort: false,
      //按文件或文件夹大小排序
      defaultSort: true,
      //
      showPage: false
    };
  },
  onLoad() {
  },
  components: {
    tabber
  },
  created() {
    common_vendor.index.hideKeyboard();
  },
  methods: {
    closeSelect() {
      this.$parent.isSelectAll = false;
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
          title: "请选择文件"
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
          title: "请选择文件"
        });
        return;
      }
      this.$refs.delAll.open();
    },
    async deleteSelectList() {
      common_vendor.index.showLoading({ title: "删除中" });
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
    //全选
    allSelectFunc() {
      this.quanxuan = false;
      this.fileList.forEach((item) => item.select = true);
      this.flodersList.forEach((item) => item.select = true);
      this.allSelect = !this.allSelect;
      this.selectItemsAry = this.selectItemsAry.concat(this.fileList).concat(this.flodersList);
    },
    //取消全选
    cancelAllSelectFunc() {
      this.quanxuan = true;
      this.fileList.forEach((item) => item.select = false);
      this.flodersList.forEach((item) => item.select = false);
      this.allSelect = !this.allSelect;
      this.selectItemsAry = [];
    },
    //添加文件
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
    //反选文件
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
          this.timeDate.push("今天  " + timeHH + ":" + timeMM);
        } else if (day11 <= 2 && daynum == false) {
          let timeHH = this.$options.filters["timedownshow"](item.createDate);
          let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
          this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
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
        // url: "/pageIndex/index/upload?list=" + JSON.stringify(e.tempFiles)
      });
    },
    showSort() {
      this.$refs.sortPop.open();
    },
    selectAll() {
      this.$parent.isSelectAll = true;
      this.isSelectAll = true;
    },
    sortClick(num) {
      this.sortNum = num;
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
    byTes(value) {
      if (value <= 0) {
        return "0B";
      }
      return utils_index.bytesToSize(value);
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
  // watch: {
  // },
  filters: {
    typeDate(value) {
      if (!value)
        return;
      return DateYMD(value.expireDate);
    },
    // byTes(value) {
    //   console.log(2221111)
    //   console.log(value)
    //   if (value <= 0 ) {
    //     return "0B"; //Bytes
    //   }
    //   return bytesToSize(value);
    // },
    // bytesToSize(value){
    // 	return bytesToSize(value);
    // },
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
  const _component_tabber = common_vendor.resolveComponent("tabber");
  _component_tabber();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isSelectAll
  }, !$data.isSelectAll ? {
    b: common_assets._imports_0$1,
    c: common_vendor.o((...args) => $options.searchClick && $options.searchClick(...args)),
    d: common_vendor.o((...args) => $options.showSort && $options.showSort(...args)),
    e: common_assets._imports_1,
    f: common_vendor.o((...args) => $options.selectAll && $options.selectAll(...args)),
    g: common_assets._imports_2,
    h: $data.isShowTitle == false ? 1 : ""
  } : common_vendor.e({
    i: common_assets._imports_3,
    j: common_vendor.o((...args) => $options.closeSelect && $options.closeSelect(...args)),
    k: $data.quanxuan
  }, $data.quanxuan ? {
    l: common_vendor.o((...args) => $options.allSelectFunc && $options.allSelectFunc(...args))
  } : {
    m: common_vendor.o((...args) => $options.cancelAllSelectFunc && $options.cancelAllSelectFunc(...args))
  }), {
    n: $data.isShowTitle == false
  }, $data.isShowTitle == false ? {
    o: common_vendor.o(($event) => $options.breadFunc(0)),
    p: common_vendor.f($data.breadCrumList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.folderName),
        b: common_vendor.o(($event) => $options.breadFunc(item, index), index),
        c: index
      };
    })
  } : {}, {
    q: common_vendor.f($data.flodersList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => $options.goFolder(item), index),
        b: common_vendor.t(item.folderName),
        c: common_vendor.t($options.dateFormate(item.createDate)),
        d: common_vendor.t($options.byTes(item.folderSize)),
        e: common_vendor.o(($event) => $options.goFolder(item), index)
      }, !$data.isSelectAll ? {
        f: common_assets._imports_5,
        g: common_vendor.o(($event) => $options.getDetail(item), index)
      } : common_vendor.e({
        h: !item.select
      }, !item.select ? {
        i: common_vendor.o(($event) => $options.delItemsFunc(item), index),
        j: common_assets._imports_6
      } : {
        k: common_vendor.o(($event) => $options.selectItemFunc(item), index),
        l: common_assets._imports_7
      }), {
        m: index
      });
    }),
    r: common_assets._imports_4,
    s: !$data.isSelectAll,
    t: common_vendor.f($data.fileList, (item, index, i0) => {
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
        k: common_vendor.o(($event) => $options.getDetail(item), index)
      } : common_vendor.e({
        l: !item.select
      }, !item.select ? {
        m: common_vendor.o(($event) => $options.delItemsFunc(item), index),
        n: common_assets._imports_6
      } : {
        o: common_vendor.o(($event) => $options.selectItemFunc(item), index),
        p: common_assets._imports_7
      }), {
        q: index
      });
    }),
    v: !$data.isSelectAll,
    w: $data.isSelectAll == true ? 1 : "",
    x: !$data.isSelectAll
  }, !$data.isSelectAll ? {
    y: common_vendor.p({
      pagePath: "/pageIndex/index/index"
    })
  } : {
    z: common_assets._imports_11,
    A: common_vendor.o((...args) => $options.multiplcDeleteFunc && $options.multiplcDeleteFunc(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5a4b9210"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pageIndex/myShare/myShare.vue"]]);
wx.createComponent(Component);
