let url = 'https://test.wkkc.vip';  //测试环境（服务器地址）
// let url = 'https://kc.wkzx.store';  //正式环境
let token = '';//token令牌
// process.env.NODE_ENV === 'development' ? 'http://192.168**:6002' : 'http://***/api'; //环境配置
//向外暴露一个方法，传入一个空对象
export function service(options = {}) {
	uni.getStorageSync('token') &&(token = uni.getStorageSync('token'));//从本地缓存中获取token
	options.url = `${url}${options.url}`;//前面为你的服务器地址，后面为具体接口地址
	//配置请求头
	options.header = {
		// 'content-type': 'application/json',//默认请求头，可不写
		'Authorization': `${token}` //Bearer ，你请求数据需要的自定义请求头（令牌）
	};
// 创建promise
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
			resolved(res);//请求成功时返回接口数据
		}
		//错误
		options.fail = (err) => {
			rejected(err); //请求失败时返回错误信息
		}
		uni.request(options);//传入配置好的对象
 
	});
}