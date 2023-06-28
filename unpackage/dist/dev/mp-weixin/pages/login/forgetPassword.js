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
  data() {
    return {
      showChange: false,
      typeShow: true,
      commonInput: "",
      emailCode: "",
      password: "",
      password_2: "",
      count: 60,
      timer: null,
      backgroundColor: "linear-gradient(180.14deg, #3679FF 0.12%, rgba(54, 121, 255, 0) 99.88%)"
    };
  },
  components: {
    // qrCode
    navbar
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
  },
  methods: {
    goBack() {
      common_vendor.index.redirectTo({
        // url: "/pages/listDetails/listDetails",
        url: "/pages/login/login"
      });
    },
    psdChange() {
      this.showChange = true;
    },
    sendMsg() {
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
      utils_api.slipGetEmailCode(_this.commonInput, 2).then((res) => {
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
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: "获取验证码失败"
          });
        }
      });
    },
    forgetNext() {
      let _this = this;
      if (!_this.showChange) {
        if (_this.emailCode.length != 6) {
          common_vendor.index.showToast({
            icon: "none",
            title: "请输入6位验证码"
          });
          return;
        }
        utils_api.verifyEmailCode(_this.commonInput, _this.emailCode).then((res) => {
          if (res.data.code == 0) {
            this.showChange = true;
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: res.data.msg
            });
          }
        });
      } else {
        if (_this.password.length < 6 || _this.password.length > 15) {
          common_vendor.index.showToast({
            icon: "none",
            title: "请输入6~15位密码"
          });
          return;
        }
        if (_this.password != _this.password_2) {
          common_vendor.index.showToast({
            icon: "none",
            title: "两次密码输入不一致"
          });
          return;
        }
        let data = {};
        data.password = this.password;
        data.userName = this.commonInput;
        utils_api.slipEmailPassword(data).then((res) => {
          if (res.data.code == 0) {
            common_vendor.index.showToast({
              icon: "none",
              title: "修改成功"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                //邮箱密码登录页面
                url: "/pages/login/phoneEmail"
              });
            }, 800);
          } else {
            common_vendor.index.showToast({
              icon: "none",
              title: res.data.msg
            });
          }
        });
      }
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
    d: $data.showChange
  }, $data.showChange ? {
    e: $data.password,
    f: common_vendor.o(($event) => $data.password = $event.detail.value),
    g: $data.password_2,
    h: common_vendor.o(($event) => $data.password_2 = $event.detail.value)
  } : common_vendor.e({
    i: $data.commonInput,
    j: common_vendor.o(($event) => $data.commonInput = $event.detail.value),
    k: $data.emailCode,
    l: common_vendor.o(($event) => $data.emailCode = $event.detail.value),
    m: $data.typeShow
  }, $data.typeShow ? {
    n: common_vendor.o((...args) => $options.sendMsg && $options.sendMsg(...args))
  } : {
    o: common_vendor.t($data.count)
  }), {
    p: common_vendor.o((...args) => $options.forgetNext && $options.forgetNext(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2e9c21b4"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pages/login/forgetPassword.vue"]]);
wx.createPage(MiniProgramPage);
