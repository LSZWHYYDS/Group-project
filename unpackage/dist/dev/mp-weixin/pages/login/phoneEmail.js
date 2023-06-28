"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_index = require("../../utils/index.js");
const utils_api = require("../../utils/api.js");
const common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const navbar = () => "../../components/NavBer.js";
const _sfc_main = {
  components: {
    // qrCode
    navbar
  },
  data() {
    return {
      showNum: "",
      typeShow: true,
      psdLogin: true,
      commonInput: "",
      // commonInput: "1725565883@qq.com",
      password: "",
      // password:'123456',
      accountType: "",
      //账号类型 email || phone
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
  methods: {
    ...common_vendor.mapActions(["REQUEST_FLOW"]),
    goBack() {
      common_vendor.index.redirectTo({
        // url: "/pages/listDetails/listDetails",
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
              title: "发送成功"
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
          title: "请输入正确的手机号!"
        });
      }
    },
    phoneLoginFunc() {
      let _this = this;
      if (_this.commonInput == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入手机号!"
        });
        return;
      }
      if (_this.accountType != "phone") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入正确的手机号!"
        });
        return;
      }
      if (_this.phoneCode.length != 6) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入6位验证码!"
        });
        return;
      }
      common_vendor.index.showLoading({ title: "登录中" });
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
            // icon: 'success',
          });
          setTimeout(() => {
            common_vendor.index.reLaunch({
              //邮箱密码登录页面
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
          title: "请输入邮箱号!"
        });
        return;
      }
      if (_this.accountType != "email") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入正确的邮箱号!"
        });
        return;
      }
      if (_this.password == "") {
        common_vendor.index.showToast({
          icon: "none",
          title: "请输入密码!"
        });
        return;
      }
      let data = {};
      data.userName = _this.commonInput;
      data.password = _this.password;
      common_vendor.index.showLoading({
        title: "登录中"
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
        title: "登录中"
      });
      common_vendor.index.getUserProfile({
        desc: "微信登陆后同步数据",
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
            title: "授权已取消",
            icon: "error",
            mask: true
          });
        },
        complete: () => {
          common_vendor.index.hideLoading();
        }
      });
    }
  }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5deac24f"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pages/login/phoneEmail.vue"]]);
wx.createPage(MiniProgramPage);
