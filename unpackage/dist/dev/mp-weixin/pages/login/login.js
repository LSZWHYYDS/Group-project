"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_api = require("../../utils/api.js");
const common_assets = require("../../common/assets.js");
require("../../utils/http.js");
require("../../utils/index1.js");
require("../../utils/base.js");
const navbar = () => "../../components/NavBer.js";
const _sfc_main = {
  data() {
    return {
      href: "https://uniapp.dcloud.io",
      title: "阿发阿发",
      backgroundColor: ""
    };
  },
  onLoad(option) {
    console.log(option);
    option.softId;
    this.softId = option.softId;
  },
  components: {
    // qrCode
    navbar
  },
  methods: {
    goBack() {
      common_vendor.index.navigateBake();
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
    },
    goLogin(val) {
      common_vendor.index.navigateTo({
        // url: "/pages/listDetails/listDetails",
        url: "/pages/login/phoneEmail?id=" + val
      });
    },
    mailClick() {
      let data = {};
      data.userName = "1725565883@qq.com";
      data.password = "123456";
      utils_api.mailLogin(data).then((res) => {
        console.log(res);
        if (res.code == 200)
          ;
      });
    }
  }
};
if (!Array) {
  const _component_navbar = common_vendor.resolveComponent("navbar");
  _component_navbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.goBack),
    b: common_vendor.p({
      background: $data.backgroundColor
    }),
    c: common_assets._imports_0,
    d: common_vendor.o((...args) => $options.getUserInfo && $options.getUserInfo(...args)),
    e: common_vendor.o(($event) => $options.goLogin(1)),
    f: common_vendor.o(($event) => $options.goLogin(2))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/Administrator/Desktop/peoject/Group-project/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
