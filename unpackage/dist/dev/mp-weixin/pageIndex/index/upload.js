"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var utils_api = require("../../utils/api.js");
var utils_aliOss = require("../../utils/ali-oss.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const _sfc_main = {
  data() {
    return {
      scrollTop: 0,
      tipShow: false,
      href: "https://uniapp.dcloud.io",
      load_2_show: 2,
      isShowFile: false,
      isShowCollect: false,
      rightBoxShow: true,
      rightStyle: false,
      rigthBtnShow: false,
      pickUpCode: "xxxxxx",
      getCode: "",
      imgArr3: [],
      showWx: true,
      fileListAllNum: 0,
      addFileShow: false,
      openSetList: false,
      pickUpCode: "xxxxxx",
      fileList: [],
      fileListName: [],
      loginState: false,
      openPass: 0,
      pass: "",
      description: "",
      select_1: 0,
      select_2: 0,
      select_3: false,
      select_4: false,
      select_5: false,
      select_6: false,
      select_7: false,
      select_8: 1,
      select_10: 0,
      passwordShow: false,
      openPass: 0,
      pass: "",
      downloadLimit: 10,
      nubshow: false,
      enableDown: 1,
      enablePreview: 1,
      mails: "",
      phones: "",
      dateValue: 0,
      downLimit: [5, 10, 20],
      allSize: 0,
      progress: {},
      downTime: 0,
      alreadySize: 0,
      alreadyNum: 0,
      speed: "256kb",
      waterNum: 0,
      upLoadEnd: false,
      transferGuid: "",
      getCode: "",
      aKeyCopayShow: true,
      overTime: "xxxx-xx-xx",
      extractCode: "",
      qrCode: "",
      isShow: false,
      top: 0,
      errFileList: [],
      resetUploadShow: false,
      resetUploadTimes: 0,
      wxDailogShow: false,
      shareShow: false,
      startX: 0,
      startY: 0,
      downNumber: 10,
      downNumbershow: "10\u6B21",
      downDay: 1,
      downDayshow: "1\u5929",
      utilsType: false,
      drawer: false,
      show: false,
      timeshow: false,
      actions: [
        {
          name: "1\u5929",
          value: "1"
        },
        {
          name: "3\u5929",
          value: "3"
        },
        {
          name: "7\u5929",
          value: "7"
        },
        {
          name: "\u6C38\u4E45\u6709\u6548",
          value: "3650"
        },
        {
          name: "\u81EA\u5B9A\u4E49",
          value: "0"
        }
      ],
      nubactions: [
        {
          name: "50\u6B21",
          value: "50"
        },
        {
          name: "100\u6B21",
          value: "100"
        },
        {
          name: "200\u6B21",
          value: "200"
        },
        {
          name: "\u65E0\u9650\u5236",
          value: "9999999"
        },
        {
          name: "\u81EA\u5B9A\u4E49",
          value: "0"
        }
      ]
    };
  },
  onLoad(option) {
    console.log(JSON.parse(option.list));
    console.log(6969);
    this.$nextTick(() => {
    });
  },
  methods: __spreadProps(__spreadValues(__spreadValues({}, common_vendor.mapMutations(["SET_FILELIST"])), common_vendor.mapActions(["REQUEST_FLOW"])), {
    byTes(value) {
      return utils_index.bytesToSize(value);
    },
    switchChange(e) {
      if (e.detail.value == true) {
        this.select_1 = 1;
      } else {
        this.select_1 = 0;
      }
      console.log(this.select_1);
      let token = common_vendor.index.getStorageSync("token");
      if (!token) {
        if (e.detail.value == true) {
          this.select_1 = 0;
          console.log(this.select_1);
          return;
        }
      }
    },
    setPswChange(e) {
      if (e.detail.value == true) {
        this.select_2 = 1;
        console.log(this.show);
      } else {
        this.select_2 = 0;
      }
      console.log(this.select_2);
    },
    setYlChange(e) {
      if (e.detail.value == true) {
        this.select_8 = 1;
      } else {
        this.select_8 = 0;
      }
      console.log(this.select_8);
    },
    setXzChange(e) {
      if (e.detail.value == true) {
        this.select_10 = 1;
      } else {
        this.select_10 = 0;
      }
    },
    overlay(val) {
      if (val == 1) {
        this.nubshow = true;
        setTimeout(() => {
          this.nubshow = false;
        }, 100);
      } else {
        this.timeshow = true;
        setTimeout(() => {
          this.timeshow = false;
        }, 100);
      }
    },
    fileFunc(e) {
      console.log(e);
      console.log(6666666666666);
      let fileList = e.tempFiles;
      console.log(fileList);
      console.log(899999);
      let token = common_vendor.index.getStorageSync("token");
      if (!token) {
        if (fileList.length > 5) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u672A\u767B\u5F55\u72B6\u6001\u4E0A\u4F20\u4E0D\u5F97\u8D85\u8FC75\u4E2A"
          });
          return;
        }
      }
      let fileArray = [];
      fileList.forEach((file) => {
        let fileType = utils_index.getSuffix(file.name);
        if (utils_index.isImage(fileType)) {
          file.thisType = "image";
        } else if (utils_index.isVideo(fileType)) {
          file.thisType = "video";
        } else {
          file.thisType = "file";
        }
        fileArray.push(file);
      });
      console.log(fileList);
      console.log(fileArray);
      console.log(this.fileListName);
      console.log(fileArray);
      this.fileListName = [...new Set(this.fileListName)];
      for (let i = 0; i < fileArray.length; i++) {
        for (let j = 0; j < this.fileListName.length; j++) {
          if (fileArray[i].name == this.fileListName[j]) {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u53D1\u73B0\u6587\u4EF6\u540D\u79F0\u76F8\u540C\u7684\u6587\u4EF6\uFF0C\u8BE5\u6587\u4EF6\u5DF2\u88AB\u81EA\u52A8\u8FC7\u6EE4"
            });
            this.fileListName.splice(j, 1);
            fileArray.splice(i, 1);
          }
        }
      }
      console.log(this.fileListName);
      console.log(fileArray);
      this.fileList = this.fileList.concat(fileArray);
      this.fileList.forEach((item) => this.fileListName.push(item.name));
      this.fileList = this.uniqueFunc(this.fileList, "name");
      this.fileListAllNum = this.fileList.length;
      this.load_2_show = 2;
      let sizeCur = 0;
      this.$nextTick(() => {
        this.scrollTop = this.fileList.length * 64;
      });
      fileArray.forEach((item) => {
        sizeCur += item.size;
      });
      this.allSize += sizeCur;
      this.SET_FILELIST(this.fileList);
      this.addFileShow = false;
      this.transferType = 1;
    },
    uniqueFunc(arr, name) {
      const res = /* @__PURE__ */ new Map();
      return arr.filter((item) => !res.has(item[name]) && res.set(item[name], 1));
    },
    async uploadFunc() {
      this.load_2_show = 3;
      const transferGuid = await this.getTransferGuid();
      this.overTime = transferGuid.data.validDate;
      this.transferGuid = transferGuid.data.transferGuid;
      this.copyUrl = urlOSS + transferGuid.data.link;
      const getToken = await utils_api.getOssToken();
      const token = getToken.data;
      this.multipartUpload(token);
    },
    async multipartUpload(token) {
      let allList = [];
      this.fileList.forEach((item) => {
        if (item.dir) {
          let name = utils_aliOss.getFileNameUUID();
          item.files.forEach((item2) => {
            let ext = item2.webkitRelativePath.substring(item2.webkitRelativePath.indexOf("/"));
            if (!ext) {
              ext = item2.name.substring(item2.name.indexOf("/"));
            }
            let obj = {};
            obj.name = name + ext;
            obj.file = item2;
            allList.push(obj);
          });
        } else {
          let name = utils_aliOss.getFileNameUUID() + "/" + item.name;
          let obj = {};
          obj.name = name;
          obj.file = item;
          allList.push(obj);
        }
      });
      let timer = setInterval(() => {
        this.downTime += 1;
      }, 1e3);
      const transferGuid = this.transferGuid;
      this.upLoadEnd = false;
      let arry = [];
      const clientRusult = await Promise.all(allList.map(async (file, index) => {
        let o = {
          fileName: file.file.name,
          fileSize: file.file.size,
          path: file.name,
          originalName: file.file.webkitRelativePath ? file.file.webkitRelativePath : file.file.name,
          transferGuid,
          fileType: file.file.type
        };
        arry.push(o);
        return await this.multiBackPath(token, file.name, file.file);
      }));
      if (clientRusult.some((item) => item == false)) {
        this.resetUploadShow = true;
        return;
      } else {
        let saveEverBox;
        if (this.select_1 == true) {
          saveEverBox = 1;
        } else {
          saveEverBox = 0;
        }
        let totalFileSize = 0;
        arry.forEach((item) => {
          totalFileSize += item.fileSize;
        });
        const beforeRes = await uploadBefore({
          filesList: arry,
          saveEverBox,
          totalFileSize
        });
        if (beforeRes.data.code !== 0) {
          this.$message.error(this.$t("la.uploadFailedUA"));
          return;
        }
        this.$refs.water.isShow = false;
        let obj = {};
        obj.transferGuid = transferGuid;
        obj.saveEverBox = saveEverBox;
        obj.transferType = 1;
        const transferGuidData = await completUpload(obj);
        const payload = transferGuidData.data.data;
        this.pickUpCode = payload;
        createZip(transferGuid);
        await sendEmailAndSMS(transferGuid);
        clearInterval(timer);
      }
      this.upLoadEnd = true;
      this.downTime = 0;
    },
    async getTransferGuid() {
      let data = {};
      !this.select_2 ? data.openPass = 0 : data.openPass = 1;
      if (this.select_4) {
        if (!utils_index.isEmall(this.mails)) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u90AE\u4EF6\u683C\u5F0F\u9519\u8BEF"
          });
          return;
        }
      }
      if (this.select_2) {
        if (this.pass.length > 12 || this.pass.length < 6) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u5BC6\u7801\u683C\u5F0F"
          });
          return;
        }
      }
      data.transferType = 1;
      data.pass = this.pass;
      data.mails = [];
      if (!this.mails) {
        delete data.mails;
      } else {
        data.mails.push(this.mails);
      }
      data.userId = common_vendor.index.getStorageSync("loginUserId");
      data.description = this.description;
      data.downDay = this.downDay;
      data.downloadLimit = this.downNumber;
      data.enableDown = this.select_7 ? 1 : 0;
      data.enablePreview = this.select_8;
      console.log(data);
      if (this.loginState) {
        data.shareFlow = this.select_10;
      } else {
        data.shareFlow = 0;
      }
      for (let k in data) {
        if (!data[k] && data[k] !== 0) {
          delete data[k];
        }
      }
      const res = await utils_api.createTransfer(data);
      return res.data;
    },
    onselect(item) {
      console.log(item);
      this.show = false;
      if (item.target.value == 1) {
        this.downDay = "1";
        this.downDayshow = "1\u5929";
        this.timeshow = false;
      } else if (item.target.value == 3) {
        this.downDay = "3";
        this.downDayshow = "3\u5929";
        this.timeshow = false;
      } else if (item.target.value == 7) {
        this.downDay = "7";
        this.downDayshow = "7\u5929";
        this.timeshow = false;
      } else if (item.target.value == 3650) {
        this.downDay = "3650";
        this.downDayshow = "\u6C38\u4E45\u6709\u6548";
        this.timeshow = false;
      } else if (item.target.value == 0) {
        this.downDayshow = "";
        this.select_3 = true;
        this.timeshow = false;
      } else
        ;
    },
    nubselect(item) {
      console.log(item);
      this.show = false;
      if (item.target.value == 50) {
        console.log(item.target.value);
        this.downNumber = 50;
        this.downNumbershow = "50\u6B21";
        this.nubshow = false;
      } else if (item.target.value == 100) {
        this.downNumber = 100;
        this.downNumbershow = "100\u6B21";
        this.nubshow = false;
      } else if (item.target.value == 200) {
        this.downNumber = 200;
        this.downNumbershow = "200\u6B21";
        this.nubshow = false;
      } else if (item.target.value == 9999999) {
        this.downNumber = 9999999;
        this.downNumbershow = "\u65E0\u9650\u5236";
        this.nubshow = false;
      } else if (item.target.value == 0) {
        this.downNumbershow = "";
        this.select_6 = true;
        this.nubshow = false;
      } else
        ;
    },
    qhdnbm() {
      this.select_6 = false;
      this.nubshow = true;
      this.downNumber = 10;
      this.downNumbershow = "10\u6B21";
    },
    qhdwd() {
      this.select_3 = false;
      this.timeshow = true;
      this.downDay = "1";
      this.downDayshow = "1\u5929";
    },
    savePan(e) {
      this.select_1 = e;
      if (this.select_1 === 1) {
        this.select_1 = 0;
        return;
      }
    },
    deleteItem(item, index) {
      this.fileListName = [...new Set(this.fileListName)];
      console.log(this.fileListName);
      for (let i = 0; i < this.fileListName.length; i++) {
        if (item.name == this.fileListName[i]) {
          this.fileListName.splice(i, 1);
        }
      }
      this.allSize -= this.fileList[index].size;
      let c = this.fileList.splice(index, 1);
      if (c[0].files) {
        this.fileListAllNum -= c[0].files.length;
      } else {
        this.fileListAllNum -= 1;
      }
      if (this.$refs.fileInput2) {
        this.$refs.fileInput2.value = null;
      }
      if (this.$refs.dirInput2) {
        this.$refs.dirInput2.value = null;
      }
      if (this.fileList.length == 0) {
        this.load_2_show = 1;
        this.fileListName = [];
        this.fileListAllNum = 0;
        this.allSize = 0;
      }
    }
  }),
  computed: __spreadProps(__spreadValues({}, common_vendor.mapState({
    userFlowData: (state) => common_vendor.index.getStorageSync("userFlowData") ? JSON.parse(state.userFlowData) : {}
  })), {
    aKeyCopay() {
      let str = this.copyUrl;
      let code = this.pickUpCode;
      let showName;
      if (this.fileList.length > 0) {
        showName = this.fileList[0].name;
      }
      if (code == "xxxxxx") {
        return "\u60A8\u6709\u4E00\u4EFD\u6587\u4EF6\u3010" + showName + "\u3011\u5F85\u67E5\u6536\uFF01\u5373\u523B\u70B9\u51FB\u94FE\u63A5\u83B7\u53D6\uFF1A" + str;
      } else {
        return "\u60A8\u6709\u4E00\u4EFD\u6587\u4EF6\u3010" + showName + "\u3011\u5F85\u67E5\u6536\uFF01\u5373\u523B\u70B9\u51FB\u94FE\u63A5\u83B7\u53D6\uFF1A" + str + this.$t("la.pickUupCode") + code + " ( \u6709\u6548\u671F\u81F3 :" + this.overTime + " )";
      }
    },
    copyPickUpCode() {
      return this.pickUpCode;
    },
    getHeight() {
      let h = 0;
      if (this.load_2_show == 1) {
        h = "70px";
      } else if (this.load_2_show == 4) {
        h = "355px";
      } else {
        h = "88vh";
      }
      return h;
    }
  }),
  mounted() {
    console.log(this.userFlowData);
    console.log("this.userFlowData");
  }
};
if (!Array) {
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _component_van_action_sheet = common_vendor.resolveComponent("van-action-sheet");
  const _component_van_divider = common_vendor.resolveComponent("van-divider");
  const _component_van_popup = common_vendor.resolveComponent("van-popup");
  (_easycom_uni_file_picker2 + _component_van_action_sheet + _component_van_divider + _component_van_popup)();
}
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
if (!Math) {
  _easycom_uni_file_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.load_2_show == 2
  }, $data.load_2_show == 2 ? common_vendor.e({
    b: common_vendor.sr("fileInput2", "30ba4ef8-0"),
    c: common_vendor.o(($event) => $options.fileFunc($event)),
    d: common_vendor.p({
      ["file-mediatype"]: "all"
    }),
    e: common_vendor.t($data.fileListAllNum),
    f: common_vendor.t($options.byTes($data.allSize)),
    g: common_vendor.f($data.fileList, (item, index, i0) => {
      return common_vendor.e({
        a: item.thisType == "image"
      }, item.thisType == "image" ? {} : {}, {
        b: item.thisType == "video"
      }, item.thisType == "video" ? {} : {}, {
        c: item.thisType == "file"
      }, item.thisType == "file" ? {} : {}, {
        d: item.thisType == "dir"
      }, item.thisType == "dir" ? {} : {}, {
        e: common_vendor.t(item.name ? item.name : "\u672A\u8BFB\u53D6\u7684"),
        f: item.dir
      }, item.dir ? {} : {}, {
        g: item.dir
      }, item.dir ? {} : {}, {
        h: item.dir
      }, item.dir ? {
        i: common_vendor.t(item.len)
      } : {}, {
        j: common_vendor.t($options.byTes(item.size)),
        k: common_vendor.o(($event) => $options.deleteItem(item, index)),
        l: index
      });
    }),
    h: $data.scrollTop,
    i: common_vendor.o(($event) => $data.addFileShow = false),
    j: common_vendor.o((...args) => $options.switchChange && $options.switchChange(...args)),
    k: !$data.select_6
  }, !$data.select_6 ? {
    l: common_vendor.t($data.downNumbershow),
    m: common_vendor.o(($event) => $data.nubshow = true),
    n: common_vendor.o(($event) => $data.nubshow = true)
  } : {
    o: $data.downNumber,
    p: common_vendor.o(($event) => $data.downNumber = $event.detail.value),
    q: common_vendor.o(($event) => $options.qhdnbm())
  }, {
    r: common_vendor.o(($event) => $options.overlay(1)),
    s: common_vendor.o($options.nubselect),
    t: common_vendor.p({
      closeable: true,
      show: $data.nubshow,
      actions: $data.nubactions,
      description: "\u9009\u62E9\u4E0B\u8F7D\u6B21\u6570",
      closeOnClickAction: true
    }),
    v: !$data.select_3
  }, !$data.select_3 ? {
    w: common_vendor.t($data.downDayshow),
    x: common_vendor.o(($event) => $data.timeshow = true),
    y: common_vendor.o(($event) => $data.timeshow = true)
  } : {
    z: $data.downDay,
    A: common_vendor.o(($event) => $data.downDay = $event.detail.value),
    B: common_vendor.o(($event) => $options.qhdwd())
  }, {
    C: common_vendor.o(($event) => $options.overlay(2)),
    D: common_vendor.o($options.onselect),
    E: common_vendor.p({
      closeable: true,
      show: $data.timeshow,
      actions: $data.actions,
      description: "\u9009\u62E9\u6709\u6548\u671F",
      closeOnClickAction: true
    }),
    F: $data.description,
    G: common_vendor.o(($event) => $data.description = $event.detail.value),
    H: common_vendor.n($data.loginState ? "textareaBox" : "textareaBoxFalse"),
    I: $data.openSetList ? 1 : "",
    J: common_vendor.o(($event) => $data.show = !$data.show),
    K: common_vendor.o((...args) => $options.uploadFunc && $options.uploadFunc(...args)),
    L: common_vendor.o(($event) => $data.tipShow = false),
    M: $data.select_2 == 0
  }, $data.select_2 == 0 ? {} : {
    N: $data.passwordShow ? "text" : "password",
    O: $data.pass,
    P: common_vendor.o(($event) => $data.pass = $event.detail.value)
  }, {
    Q: $data.select_2 == 1
  }, $data.select_2 == 1 ? common_vendor.e({
    R: $data.passwordShow
  }, $data.passwordShow ? {
    S: common_vendor.o(($event) => $data.passwordShow = false)
  } : {
    T: common_vendor.o(($event) => $data.passwordShow = true)
  }) : {}, {
    U: common_vendor.o((...args) => $options.setPswChange && $options.setPswChange(...args)),
    V: common_vendor.o(($event) => $data.tipShow = false),
    W: common_vendor.o((...args) => $options.setYlChange && $options.setYlChange(...args)),
    X: common_vendor.o(($event) => $data.tipShow = false),
    Y: common_vendor.o(($event) => $data.tipShow = !$data.tipShow),
    Z: $data.tipShow
  }, $data.tipShow ? {} : {}, {
    aa: common_vendor.o((...args) => $options.setXzChange && $options.setXzChange(...args)),
    ab: common_vendor.o(($event) => $data.tipShow = false),
    ac: common_vendor.o(($event) => $data.tipShow = false),
    ad: common_vendor.t($options.byTes(_ctx.userFlowData.residueFlow)),
    ae: common_vendor.o(($event) => $data.tipShow = false),
    af: common_vendor.o(($event) => {
      $data.show = false;
      $data.tipShow = false;
    }),
    ag: common_vendor.p({
      show: $data.show,
      closeable: true,
      closeIconPosition: "top-right",
      closeOnClickOverlay: true,
      position: "bottom",
      round: true,
      closeOnClickAction: false
    })
  }) : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-30ba4ef8"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pageIndex/index/upload.vue"]]);
wx.createPage(MiniProgramPage);
