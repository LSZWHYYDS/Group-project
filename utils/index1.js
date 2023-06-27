import axios from 'axios'

// import settle from "axios/lib/core/settle";
// import buildURL from "axios/lib/helpers/buildURL";
// import buildFullPath from "axios/lib/core/buildFullPath";

import url from "./base"

// import router from "@/router"
// import state from '../../store/index.js'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.defaults.baseURL = url
axios.defaults.timeout = 1000 * 5 * 60

// 小程序axios适配器
import mpAdapter from "axios-miniprogram-adapter";
axios.defaults.adapter = mpAdapter;
// axios.defaults.adapter = require('axios/lib/adapters/http');
// http request 拦截器

/**token白名单 @params takeTokenArray **/ //getFlow 'aliPay', 'wxPay', , 'queryPay'
// let takeTokenArray = ["getUserSpace", "getUserFlow", 'completUpload', "aliPay", "aliAppPay", "getFlow",
// 	'getEverboxList', 'everBoxShare', 'uploadBefore',
// 	'moveFile', 'batchDelete', 'verifyExist', 'rename', 'uploadSize', 'newFolder', 'saveToEverbox', 'saveindexToEverbox','batchsaveindexToEverbox','everboxUpload',
// 	'recycleList', 'restore', 'clearFile', 'capacity',
// 	'inviteCapacity', 'downInviteImg', 'getInvite', 'getSizeKind', "createBoxDownLink", "getTransferHistory",
// 	"updateEmailPassword", "bindingPhoneOrEmailOrWX",
// 	'getMyShareHistory', 'cancelMyShare', 'updateShareFlow', 'createCollectLink', 'getAllCollect', 'delCollect', 'stopCollect', 'CollectDownLink','collectDownFiles',
// 	'updateImgAndNikeName','getOrderList','getInvoiceList','getInvoiceOrderList','makeInvoice','getAd','updateCollectDate','delShareFlow','CollectBatch','getEverBoXFiles','getCollectFiles',
// ]
axios.interceptors.request.use(
	config => {
		let Authorization = uni.getStorageSync('token');
		console.log(Authorization)
		let u = config.url;
		config.headers['Authorization'] = Authorization
		// if (takeTokenArray.some(item => u.indexOf(item) > -1)) {
		// 	if (Authorization) {
		// 		config.headers['Authorization'] = Authorization
		// 	}
		// }
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);
// let _this
// if(process.client) {
// 	 _this = this
// }
// http response 拦截器
axios.interceptors.response.use(
	response => {
		// if (response.data.code == 401) {
		// 	// localStorage.removeItem('token')
		// }
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);
export default axios;
