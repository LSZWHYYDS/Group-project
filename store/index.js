// import Vue from "vue"
// import Vuex from 'vuex'
import { createStore } from 'vuex'
import { getFlow, getUserSpace, getUserFlow} from "../utils/api"

// Vue.use(Vuex)
 const store = createStore({
	state: {
		files: [],
		count:1,
		userFlowData:uni.getStorageSync("userFlowData") ? uni.getStorageSync("userFlowData") : {},
		bhs:false,
		showFilePop:false,
	},
	mutations: {
		settoken(state,token){
			state.token = token
			console.log(token)
		},
		SET_USERFLOW(state, userFlowData) {
			uni.setStorageSync("userFlowData", userFlowData);
			state.userFlowData = userFlowData;
			console.log(uni.getStorageSync("userFlowData"))
		},
		SET_FILELIST(state, files) {
		  state.files = files
		},
		SET_FILEPOP(state, showFilePop) {
		  state.showFilePop = showFilePop
		},
	},
	actions: {
		 REQUEST_FLOW({commit}){
		  getFlow().then(res=>{
		   if(res.data.code == 0){
			   console.log(9999)
			   console.log("loginUserId"+ res.data.data.userId)
			 uni.setStorageSync("loginUserId", res.data.data.userId);
			 commit('SET_USERFLOW', JSON.stringify(res.data.data))
		   }
		  })
		 },
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
})

export default store


