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
var common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const navbar = () => "../../components/NavBer.js";
const _sfc_main = {
  components: {
    navbar
  },
  data() {
    return {
      showNum: "",
      typeShow: true,
      psdLogin: true,
      commonInput: "",
      password: "",
      accountType: "",
      phoneCode: "",
      count: 60,
      timer: null,
      backgroundColor: "linear-gradient(180.14deg, #3679FF 0.12%, rgba(54, 121, 255, 0) 99.88%)"
    };
  },
  watch: {
    commonInput: {
      immediate: true,
      handler: utils_index.Debounce(function(val) {
        if (utils_index.typePhone(val)) {
          this.accountType = "phone";
        } else if (utils_index.isEmall(val)) {
          this.accountType = "email";
        } else {
          this.accountType = "";
        }
      })
    }
  },
  onLoad(option) {
    console.log(option.id);
    this.showNum = option.id;
    this.$nextTick(() => {
    });
  },
  computed: common_vendor.mapState(["bhs"]),
  methods: __spreadProps(__spreadValues({}, common_vendor.mapActions(["REQUEST_FLOW"])), {
    goBack() {
      common_vendor.index.redirectTo({
        url: "/pages/login/login"
      });
    },
    sendMsg() {
      let _this = this;
      console.log(_this.accountType);
      if (_this.accountType == "phone") {
        let p = _this.commonInput;
        utils_api.sendPhoneCode(p).then((res) => {
          console.log(res);
          if (res.data.code == 0) {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u53D1\u9001\u6210\u529F"
            });
            _this.typeShow = false;
            if (!_this.typeShow) {
              clearInterval(_this.timer);
              _this.timer = setInterval(() => {
                if (_this.count == 1) {
                  _this.typeShow = true;
                  _this.count = 60;
                } else {
                  _this.count -= 1;
                }
              }, 1e3);
            }
            console.log(_this.typeShow);
            _this.verifyCodeFunc();
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: res.data.msg
            });
          }
        });
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7!"
        });
      }
    },
    phoneLoginFunc() {
      let _this = this;
      if (_this.commonInput == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7!"
        });
        return;
      }
      if (_this.accountType != "phone") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u624B\u673A\u53F7!"
        });
        return;
      }
      if (_this.phoneCode.length != 6) {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u51656\u4F4D\u9A8C\u8BC1\u7801!"
        });
        return;
      }
      common_vendor.index.showLoading({ title: "\u767B\u5F55\u4E2D" });
      let data = {};
      data.userName = _this.commonInput;
      data.code = _this.phoneCode;
      utils_api.phoneLogin(data).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          common_vendor.index.hideLoading();
          let data2 = res.data.data;
          console.log(data2);
          common_vendor.index.setStorageSync("token", data2.token);
          common_vendor.index.setStorageSync("userInfo", JSON.stringify(data2));
          common_vendor.index.setStorageSync("loginUserId", data2.userId);
          common_vendor.index.setStorageSync("inviteLink", data2.inviteLink);
          this.REQUEST_FLOW();
          this.uploadData();
          common_vendor.index.showToast({
            icon: "none",
            title: res.data.msg
          });
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "/pageIndex/index/index"
            });
          }, 800);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: res.data.msg
          });
        }
      });
    },
    loginEmail() {
      console.log(123);
      console.log(this.$store.state.bhs);
      let _this = this;
      if (_this.commonInput == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u90AE\u7BB1\u53F7!"
        });
        return;
      }
      if (_this.accountType != "email") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u6B63\u786E\u7684\u90AE\u7BB1\u53F7!"
        });
        return;
      }
      if (_this.password == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8BF7\u8F93\u5165\u5BC6\u7801!"
        });
        return;
      }
      let data = {};
      data.userName = _this.commonInput;
      data.password = _this.password;
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D"
      });
      utils_api.mailLogin(data).then((res) => {
        common_vendor.index.hideLoading();
        console.log(res);
        if (res.data.code == 0) {
          let data2 = res.data.data;
          console.log(data2);
          common_vendor.index.setStorageSync("token", data2.token);
          common_vendor.index.setStorageSync("userInfo", JSON.stringify(data2));
          common_vendor.index.setStorageSync("loginUserId", data2.userId);
          common_vendor.index.setStorageSync("inviteLink", data2.inviteLink);
          this.REQUEST_FLOW();
          this.uploadData();
          common_vendor.index.showToast({
            icon: "none",
            title: res.data.msg
          });
          setTimeout(() => {
            common_vendor.index.reLaunch({
              url: "/pageIndex/index/index"
            });
          }, 800);
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: res.data.msg
          });
        }
      });
    },
    uploadData() {
    },
    verifyCodeFunc() {
    },
    loginChange() {
      this.psdLogin = false;
    },
    codeChange() {
      this.psdLogin = true;
    },
    forgetPsd() {
      common_vendor.index.navigateTo({
        url: "/pages/login/forgetPassword"
      });
    },
    getUserInfo() {
      let _this = this;
      common_vendor.index.showLoading({
        title: "\u767B\u5F55\u4E2D"
      });
      common_vendor.index.getUserProfile({
        desc: "\u5FAE\u4FE1\u767B\u9646\u540E\u540C\u6B65\u6570\u636E",
        success: async (obj) => {
          console.log(obj);
          common_vendor.index.login({
            provider: "weixin",
            success: async (res) => {
              console.log(res);
              console.log(res.code);
              console.log(666);
              _this.code = res.code;
              if (res.errMsg == "login:ok") {
                let param = {
                  code: res.code
                };
                const userData = await utils_api.wxappletLogin(param);
                console.log(userData);
                if (userData.data.code == 0) {
                  let data = userData.data.data;
                  common_vendor.index.setStorageSync("token", data.token);
                  common_vendor.index.setStorageSync("userInfo", JSON.stringify(data));
                  common_vendor.index.setStorageSync("inviteLink", data.inviteLink);
                  common_vendor.index.showToast({
                    icon: "none",
                    title: userData.data.msg
                  });
                  setTimeout(() => {
                    common_vendor.index.reLaunch({
                      url: "/pageIndex/index/index"
                    });
                  }, 800);
                } else {
                  common_vendor.index.showToast({
                    icon: "none",
                    title: userData.data.msg
                  });
                }
              }
            }
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "\u6388\u6743\u5DF2\u53D6\u6D88",
            icon: "error",
            mask: true
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
  })
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      background: $data.backgroundColor,
      back: true
    }),
    c: common_assets._imports_0,
    d: $data.showNum == 1
  }, $data.showNum == 1 ? common_vendor.e({
    e: $data.commonInput,
    f: common_vendor.o(($event) => $data.commonInput = $event.detail.value),
    g: $data.phoneCode,
    h: common_vendor.o(($event) => $data.phoneCode = $event.detail.value),
    i: $data.typeShow
  }, $data.typeShow ? {
    j: common_vendor.o((...args) => $options.sendMsg && $options.sendMsg(...args))
  } : {
    k: common_vendor.t($data.count)
  }, {
    l: common_vendor.o((...args) => $options.phoneLoginFunc && $options.phoneLoginFunc(...args))
  }) : {
    m: $data.commonInput,
    n: common_vendor.o(($event) => $data.commonInput = $event.detail.value),
    o: $data.password,
    p: common_vendor.o(($event) => $data.password = $event.detail.value),
    q: common_vendor.o((...args) => $options.forgetPsd && $options.forgetPsd(...args)),
    r: common_vendor.o((...args) => $options.loginEmail && $options.loginEmail(...args)),
    s: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-18a6ebad"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pages/login/phoneEmail.vue"]]);
wx.createPage(MiniProgramPage);
