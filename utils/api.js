import {service} from './request.js'//request向外暴露的方法
 import {
 	get,
 	post
 } from "./http.js"

// export function mailLogin(data) {
//   return service({
//     url: '/login/mailLogin',//接口地址
//     method: 'post',//请求方法
//     data//请求接口需要的参数
//   })
// }


// export function phoneLogin(data) { // 手机登陆
//   return service({
//     url: '/login/phoneLogin',//接口地址
//     method: 'post',//请求方法
//     data//请求接口需要的参数
//   })
// }

// export function wxLogin(data) { //手机号或邮箱验证码校验
//   return service({
//     url: '/wx/wxLogin',//接口地址
//     method: 'post',//请求方法
// 	data//请求接口需要的参数
//   })
// }
// export const getUserFlow = e => get("/flow/getUserFlow")
// export const getUserSpace = e => get("/everbox/getUserSpace")
//获取 流量
// export const getFlow = params => get("/flow/getFlow")

// export function getFlow(params) { //
//   return service({
//     url: '/flow/getFlow',//接口地址
//     method: 'get',//请求方法
//   })
// }
//上传参数


//wkkc/oss/getOssToken
export const getOssToken = params => get('/oss/getOssToken', params)


//上传参数

export const createTransfer = params => post("/transfer/createTransfer", params)


//上传文件信息
export const uploadBefore = params => post("/files/uploadBefore", params)
//收集
export const completCollect = params => post("/collectfiles/completCollect", params)

//  wkkc/transfer/completUpload

export const completUpload = params => post("/transfer/completUpload/", params)


//发送 /wkkc/transfer/sendEmailAndSMS
export const sendEmailAndSMS = params => post("/transfer/sendEmailAndSMS/" + params)

export const Emailsup = (transferGuid, emil) => post(
	'/transfer/Emailsup?transferGuid=' + transferGuid + '&emil=' + emil);


///transfer/getTransfe

export const getTransfe = params => get("/transfer/getTransfer/" + params)

//获取连接
export const getLink = params => get("/transfer/getLink/" + params)

//test/download?transferGuid=15616516316156

// export const download = value => get('/test/download?transferGuid='+value)
//downloadZip 下载文件夹
export const downloadZip = value => get('/download/downloadZip/' + value)

//获取文件链接 transferGuid
export const getZipLink = (value, newLink) => get("/download/getZipLink/" + value + "/" + newLink)
//  download/downloadFolder/

//下载单个文件
export const downloadFolder = (value, newLink) => post('/download/downloadFolder/' + value + "/" + newLink)

export const newdownloadFolder = (value, newLink) => post('/download/newdownloadFolder/' + value + "/" + newLink)

//手机登录验证码 login/sendPhoneCode/{

export const sendPhoneCode = value => post('/login/sendPhoneCode/' + value)

//举报弹框手机登录验证码
export const reprotCode = value => post('/reprot/reprotCode/' + value)

//手机登录

export const phoneLogin = value => post('/login/phoneLogin', value)

//监测邮箱是否注册

export const emailLoginBefore = value => get('/login/emailLoginBefore/' + value)


//邮箱登录

export const mailLogin = value => post('/login/mailLogin', value)


//邮箱注册

export const emailRegisterLogin = value => post('/login/emailRegisterLogin', value)

//手机号或邮箱校验
// 校验名称  bindAccount bindState
export const verifyPhoneOrEmailBinding = (bindAccount, bindState) => get(
	'/login/verifyPhoneOrEmailBinding?bindAccount=' + bindAccount + '&bindState=' + bindState);

//手机号或邮箱绑定 解绑
export const bindingPhoneOrEmailOrWX = value => post('/login/bindingPhoneOrEmailOrWX', value)

//邮箱修改密码
export const updateEmailPassword = value => post('/login/updateEmailPassword', value)
//忘记密码
export const slipEmailPassword = value => post('/login/slipEmailPassword', value)
//发送验证码
export const slipGetEmailCode = (userName, bindType) => get('/login/slipGetEmailCode?userName=' + userName +
	'&bindType=' + bindType);
//手机号或邮箱验证码校验
export const verifyEmailCode = (userName, code) => get('/login/verifyEmailCode?userName=' + userName + '&code=' + code);

// everbox/getEverboxList?superFolder=0&pageNum=1&pageSize=1

export const getEverboxList = value => get('/everbox/getEverboxList', {
	params: value
})


//everbox/moveFile 移动文件
export const moveFile = value => post('/everbox/moveFile', value);


//everbox/batchDelete 删除文件夹 或者 文件

export const batchDelete = value => post('/everbox/batchDelete', value)


//everbox/verifyExist 校验名称  superId fileName
export const verifyExist = (superId, fileName) => get('/everbox/verifyExist?superId=' + superId + '&fileName=' +
	fileName);


//everbox/rename  文件/文件夹重命名 renameID /文件或文件夹ID renameName;//新名字 renameType;//类型（1文件、2文件夹）

export const rename = value => post('/everbox/rename', value)




//下载
export const createBoxDownLink = value => post('/download/createBoxDownLink', value)
//划出下载
export const createindexBoxDownLink = value => post('/download/createindexBoxDownLink', value)

//分享  transfer/everBoxShare

export const everBoxShare = value => post('/transfer/everBoxShare', value)


// download/createZip 下载压缩文件

export const createZip = value => post('/download/createZip/' + value)

//everbox/uploadSize 云盘大小

export const uploadSize = value => get("/everbox/uploadSize")


//创建新文件夹 post：folder/newFolder
/**
 * @params
 * superFolder   父级目录
 * folderName  文件夹名称
 */

export const newFolder = value => post("/folder/newFolder", value)



/**
 *
 * everbox/saveToEverbox
 *
 * @params
 * newSuperFolder       要存至的目录（根目录传0）
 *  transferGuid              要存储的链接
 */

export const saveToEverbox = value => post("/everbox/saveToEverbox", value)
export const saveindexToEverbox = value => post("/everbox/saveindexToEverbox", value)
//转存多个文件
export const batchsaveindexToEverbox = value => post("/everbox/batchsaveindexToEverbox", value)

//微信权限

export const wxRoot = data => get("/official/getToken", {
	params: {
		jsUrl: data
	}
})

//wxLogin 微信登录
export const wxLogin = data => post("/wx/wxLogin", data)
export const wxappletLogin = data => post("/wx/wxappletLogin", data)


//云盘上传 everbox/everboxUpload


export const everboxUpload = params => post("/everbox/everboxUpload", params)


// 回收站列表  recycle/recycleList

export const recycleList = params => get('/recycle/recycleList')

// 传输历史列表  transfer/getTransferHistory

export const getTransferHistory = params => get('/transfer/getTransferHistory')

//分享历史列表
export const getMyShareHistory = params => get('/transfer/getMyShareHistory')

//设置分享流量

export const updateShareFlow = params => post('/transfer/updateShareFlow', params)

//取消我的分享
export const cancelMyShare = params => post('/transfer/cancelMyShare', params)



/**
 *  恢复文件 recycle/restore
 *
 *  @params
 * [{
 *  recycleId
 *  delPlies
 * },
 *  {
 *  recycleId
 *  delPlies
 * }
 * ]
 * */

export const restore = params => post("/recycle/restore", params)



//清理文件 /recycle/clearFile

export const clearFile = params => post("/recycle/clearFile", params)


// everbox/capacity    云盘容量

export const capacity = params => get("/everbox/capacity")

// everbox/inviteCapacity  容量
export const inviteCapacity = params => get("/everbox/inviteCapacity")


// everbox/downInviteImg
// 邀请码图片

export const downInviteImg = params => get("/everbox/downInviteImg")


// /everbox/getInvite  获取邀请码的 无参数

export const getInvite = params => get("/everbox/getInvite")


//orderPrice/getSizeKind  获取 空间和流量 价格列表

/**
 *
 * @param {*} params
 * mealType 1 空间 mealType 2 流量
 * @returns
 */
export const getSizeKind = params => get("/orderPrice/getSizeKind")

// 获取流量
export const getPrice = value => get("/orderPrice/getPrice/" + value)

//获取空间时间/年/月份
export const getSpacePricedurationKind = params => get("/orderPrice/getSpacePricedurationKind")

//获取空间价格List、
export const getSpacePriceByduration = value => get("/orderPrice/getSpacePriceByduration/" + value)



//wx
/**
 * ip ip地址
 * orderId 价格id
 * payType  1:pc 2 :h5
 */
export const wxPay = (...params) => get("/wx/wxPay", {
	params: {
		orderId: params[0],
		ip: params[1],
		payType: params[2],
		userId: params[3],
		fileSize: params[4],
		transferGuid: params[5],
		type: params[6]
	}
})
export const wxAppPay = (...params) => get("/wx/wxAppPay", {
	params: {
		orderId: params[0],
		ip: params[1],
		payType: params[2],
		userId: params[3],
		fileSize: params[4],
		transferGuid: params[5],
		type: params[6],
	}
})
//查询wx支付成功  wx/queryPay

export const queryPay = params => get("/wx/queryPay", {
	params: {
		out_trade_no: params
	}
})

//ali 支付的接口  返回链接
export const aliPay = (...params) => get("/aliPay/pay", {
	params: {
		orderId: params[0],
		userId: params[1],
		payType: params[2],
		type: params[3],
	}
})
export const aliAppPay = (...params) => get("/aliPay/appPay", {
	params: {
		orderId: params[0],
		userId: params[1],
		payType: params[2],
		type: params[3],
	}
})

export const apiPayNew =  (...params) => get("/aliPay/newPay", {
	params: {
		orderId: params[0],
		userId: params[1],
		type: params[2],
	}
})
//ali 支付下载
export const aliPayNewLink = (...params) => get("/aliPay/aliPayNewLink", {
	params: {
		orderId: params[0],
		userId: params[1],
		payType: params[2],
		fileSize: params[3],
		transferGuid: params[4],
		type: params[5],
	}
})
export const aliAppPayNewLink = (...params) => get("/aliPay/aliAppPayNewLink", {
	params: {
		orderId: params[0],
		userId: params[1],
		payType: params[2],
		fileSize: params[3],
		transferGuid: params[4],
		type: params[5],
	}
})
export const queryAliPay = params => get("/aliPay/queryAliPay", {
	params: {
		orderNo: params
	}
})
// flow/getFlow


//获取 流量
export const getFlow = params => get("/flow/getFlow")


/**
 * everbox/getUserSpace
 * flow/getUserFlow
 */
//已购买空间
export const getUserSpace = e => get("/everbox/getUserSpace")
//已购买流量
export const getUserFlow = e => get("/flow/getUserFlow")

//文件详情
export const getTransferinfo = (transferGuid) => get('/transfer/getTransferinfo/' + transferGuid);
export const getTransferboxList = (id,transferGuid) => get('/transfer/getEverboxListinfo/' + id + '/' + transferGuid);
//举报表单信息提交
export const reprotInfo = params => post("/reprot/reprotInfo", params);
//收集文件接口

export const createCollectLink = params => post("/collectfiles/createCollectLink", params);
export const getCollect = (id) => get("/collectfiles/getCollect/" + id);
// 我的收集
export const getAllCollect = params => get("/collectfiles/getAllCollect");
//停止收集
export const stopCollect = (transferGuid) => get("/collectfiles/stopCollect/" + transferGuid);
// 删除收集
export const delCollect = (transferGuid) => get("/collectfiles/delCollect/" + transferGuid);
export const CollectDownLink = (transferGuid) => get("/download/CollectDownLink/" + transferGuid);
export const collectDownFiles = value => post('/download/collectDownFiles', value)
export const CollectBatch = value => post("/collectfiles/CollectBatch", value);//批量单个删除收集


//收集判断文件名重复
export const getCollectTitle = (transferGuid, title) => get('/collectfiles/getCollectTitle/' + transferGuid +  '/' + title);

//修改头像和昵称

export const updateImgAndNikeName = (nikeName, usernameImg) => get('/login/updateImgAndNikeName?nikeName=' + nikeName + '&usernameImg=' + usernameImg);
//订单与发票接口

export const getOrderList = (pageNum) => get("/invoice/getOrderList?pageNum=" + pageNum);
export const getInvoiceList = (pageNum) => get("/invoice/getInvoiceList?pageNum=" + pageNum);
export const getInvoiceOrderList = params => get("/invoice/getInvoiceOrderList");
export const makeInvoice = params => post('/invoice/makeInvoice', qs.stringify(params));
//活动接口
export const getAd = params => get("/login/getAd");
//修改收集时间
export const updateCollectDate = (id,crdate) => get("/collectfiles/updateCollectDate/" + id + '/' + crdate);
//删除我的分享
export const delShareFlow = params => post('/transfer/delShareFlow', params)
//云盘搜索
export const getEverBoXFiles = value => get("/everbox/getEverBoXFiles/" + value);
//我的收集搜索
export const getCollectFiles = value => get("/collectfiles/getCollectFiles/" + value);
//广告图片
export const getInfomercial = value => get("/Infomercial/getInfomercial/" + value);
//验证付费的缓存
export const getPayLink = transferGuid => get("/download/getPayLink/" + transferGuid);
