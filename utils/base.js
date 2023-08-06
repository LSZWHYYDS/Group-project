let url;
url = 'https://kc.wkzx.store';//线上
	// url = 'https://test.wkkc.vip';//测试
// if (process.env.NODE_ENV === 'production') { // 请求baseurl设置
// 	// url = 'https://back.wkzs.vip'//
// 	url = 'https://kc.wkzx.store';//线上
// 	// url = 'https://test.wkkc.vip'; //本地
// } else {
// 	url = 'https://kc.wkzx.store' // 线上环境 /api会被dev-server代理为https://back.wkzs.vip
// }

	// window.urlPath = "https://wkkc.vip"; //发布
	// window.urlPath = "https://test2.wkkc.vip";//测试
	// window.urlPath = "http://nodenuxt.wkkc.vip";//测试
	// window.urlPath = "https://wkkc.wkzx.store";//测试
	// window.urlPath = "http://192.168.3.58:3000"; //开发
	//链接路径
	// window.urlOSS = window.urlPath + "/s/";
	//接口url
let urlPath = "https://wkkc.vip"; //发布
let urlOSS = urlPath + "/s/"; //发布

export {urlPath,urlOSS}
export default url
