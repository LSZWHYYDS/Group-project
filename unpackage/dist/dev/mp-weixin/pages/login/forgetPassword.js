"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_index = require("../../utils/index.js");
var utils_api = require("../../utils/api.js");
var common_assets = require("../../common/assets.js");
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
      utils_api.slipGetEmailCode(_this.commonInput, 2).then((res) => {
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
        } else {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u83B7\u53D6\u9A8C\u8BC1\u7801\u5931\u8D25"
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
            title: "\u8BF7\u8F93\u51656\u4F4D\u9A8C\u8BC1\u7801"
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
            title: "\u8BF7\u8F93\u51656~15\u4F4D\u5BC6\u7801"
          });
          return;
        }
        if (_this.password != _this.password_2) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u4E24\u6B21\u5BC6\u7801\u8F93\u5165\u4E0D\u4E00\u81F4"
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
              title: "\u4FEE\u6539\u6210\u529F"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
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
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9e3137f2"], ["__file", "E:/Code/BeiJing-Digitalsee/Group-project/pages/login/forgetPassword.vue"]]);
wx.createPage(MiniProgramPage);
