"use strict";
const common_vendor = require("../common/vendor.js");
const utils_api = require("../utils/api.js");
const store = common_vendor.createStore({
  state: {
    files: [],
    count: 1,
    userFlowData: common_vendor.index.getStorageSync("userFlowData") ? common_vendor.index.getStorageSync("userFlowData") : {},
    bhs: false,
    showFilePop: false
  },
  mutations: {
    settoken(state, token) {
      state.token = token;
      console.log(token);
    },
    SET_USERFLOW(state, userFlowData) {
      common_vendor.index.setStorageSync("userFlowData", userFlowData);
      state.userFlowData = userFlowData;
      console.log(common_vendor.index.getStorageSync("userFlowData"));
    },
    SET_FILELIST(state, files) {
      state.files = files;
    },
    SET_FILEPOP(state, showFilePop) {
      state.showFilePop = showFilePop;
    }
  },
  actions: {
    REQUEST_FLOW({ commit }) {
      utils_api.getFlow().then((res) => {
        console.log(11111222);
        if (res.data.code == 0) {
          console.log(9999);
          console.log("loginUserId" + res.data.data.userId);
          common_vendor.index.setStorageSync("loginUserId", res.data.data.userId);
          commit("SET_USERFLOW", JSON.stringify(res.data.data));
        }
      });
    }
    // getToken({commit}){
    // 	//创建一个请求
    // 	uni.request({			
    // 		url:"{登录的接口}",
    // 		method:"POST",
    // 		//账号，密码
    // 		data:{"username":"admin","password":"admin123"},
    // 		success(res) {					
    // 			const {code,msg,token} = res.data
    // 			//接口调用成功后 使用commit调用mutations里的函数并把token传过去					
    // 				commit("settoken",token)
    // 		}
    // 	})
    // }
  },
  getters: {
    // count(state, getters) {
    // 	return state.count
    // },
    // testArr(state, getters) {
    // 	return state.testArr
    // },
  }
});
exports.store = store;
