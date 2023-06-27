/*
 * @Description: 
 * @Autor: Nan
 * @Date: 2021-01-05 09:39:48
 * @NameSearch: 
 * @LastEditors: Nan
 * @LastEditTime: 2021-03-04 11:11:08
 * @FilePath: \panDown\pan\src\utils\index.js
 */

import dayjs from 'dayjs'


/**
 * @description: 
 * @param {*} value
 * @return {*}
 * @author: Nan
 */
export const bytesToSize = function(value) {
	if (null == value || value == '') {
		return "0 B"; //Bytes
	}
	// Bytes
	var unitArr = new Array("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
	var index = 0,
		srcsize = parseFloat(value);
	index = Math.floor(Math.log(srcsize) / Math.log(1024));
	var size = srcsize / Math.pow(1024, index);
	//  保留的小数位数
	size = size.toFixed(2);
	return size + unitArr[index];
}
export const getSuffix = function(filePath) {
	//获取最后一个.的位置
	var index = filePath.lastIndexOf(".");
	//获取后缀
	var ext = filePath.substr(index + 1);
	return ext
}

export const isImage = function(ext) {
	return [
		'png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'
	].
	indexOf(ext.toLowerCase()) !== -1;
}

export const isVideo = function(video) {
	return [
		'mp4', 'm2v', 'mkv', 'rmvb', 'wmv', 'avi', 'flv', 'mov', 'm4v'
	].
	indexOf(video) !== -1;
}

//获取随机字符
export const getCharacter = () => {
	function rx() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	let time = new Date().getTime()
	return time + '-' + rx()
}


//判断邮箱

export const isEmall = function(value) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	// var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	// var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	//放宽正则,至少有两处单词*顶级域名一般为2~4位（如cn、com、club）
	var reg = /\w+@[a-z0-9]+\.[a-z]{2,9}/;
	if (reg.test(value) === false) {
		return false;
	} else {
		return true
	}
}


export const typePhone = function(value) {
	// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
	var reg = /^1[23456789]\d{9}$/;
	if (reg.test(value) === false) {
		return false;
	} else {
		return true
	}
}

export const DateYMD = function(value) {
	let oldDate = dayjs(value).format('YYYY-MM-DD')
	return oldDate
}
//计算倒计时

export const DateDJS = function(value) {
	let newDate = new Date();
	let oldDate =  new Date(value);
	// alert(newDate)
	// alert(oldDate)
	let nd = newDate.getTime()
	let od = oldDate.getTime()
	// alert(nd)
	let remain = od - nd;
	let sec = remain / 1000 % 60;
	if (sec > 0){
		let h = parseInt(remain/1000/60/60%24);
      	let m = parseInt(remain/1000/60%60);
      	let s = parseInt(remain/1000%60);
		if ((h + '').length == 1) {
			h = '0' + h
		}
		if ((m + '').length == 1) {
			m = '0' + m
		}
		if ((s + '').length == 1) {
			s = '0' + s
		}
		let result = h + ':' + m + ':' + s
		return result
	}else{
		return ''
	}
}

//计算剩余天数 

export const residueDay = function(last) {

	let newDate = dayjs(new Date).format('YYYY-MM-DD');
	let oldDate = dayjs(last).format('YYYY-MM-DD')
	let nd = new Date(newDate).getTime()
	let od = new Date(oldDate).getTime()

	return Math.ceil((od - nd) / (1000 * 60 * 60 * 24))
}

//计算剩余天数 计算到时分秒
export const residuePrecision = function(value) {
	// 获取当前日期时间戳
	let nd = new Date().getTime()
	// let newDate = dayjs(new Date).format('YYYY/MM/DD');
	// 转换日期为时间戳
	let od = Date.parse(value.replace(/-/gi, "/"))
	// 计算剩余天数
	let day = Math.ceil((od - nd) / (1000 * 60 * 60 * 24))
	// let oldDate = dayjs(value).format('YYYY/MM/DD')
	// let nd = new Date(newDate).getTime()
	// let od = new Date(oldDate).getTime()
	// return Math.ceil((od - nd) / (1000 * 60 * 60 * 24))
	return day
}
// 计算剩余小时数
export const residueHour = function(value) {
	let nd = new Date().getTime()
	// 转换日期为时间戳
	let od = Date.parse(value.replace(/-/gi, "/"))
	// 计算剩余小时
	let hour = Math.ceil((od - nd) / (1000 * 60 * 60)) % 24
	return hour
}

//装换日期

export const formatData = (value) => {
	const d = new Date(value);
	const t = dayjs(d).format('YYYY-MM-DD');
	return t
}
export const formatData2 = (value) => {
	const d = new Date(value);
	const t = dayjs(d).format('YYYY-MM-DD HH:mm:ss');
	return t
}

//计算增加时间
export const formatinstData = (value) => {

	let newDate = dayjs(new Date).format('YYYY/MM/DD'); //新时间
	let oldDate = value; //页面天数传入
	let datatime = dayjs(newDate).add((oldDate * 24), 'h'); //天数计算时间转化为时间戳
	let newtime = Math.ceil(datatime);
	// console.log("newDate" + newDate + "oldDate" + oldDate + "/datatime" + (oldDate * 24)+"///"+newtime);
	let rettime = dayjs(newtime).format('YYYY/MM/DD'); //时间戳计算完重新转换为时间格式
	return rettime;
}
export const timedown = (value) => {

	let newDate = dayjs(new Date).format('YYYY/MM/DD HH:mm');

	let oldDate = dayjs(value).format('YYYY/MM/DD HH:mm')

	let nd = new Date(newDate).getTime()
	let od = new Date(oldDate).getTime()

	return Math.ceil((nd - od) / (1000 * 60 * 60 * 24))
}

export const timedownshow = (value) => {
	return dayjs(value).format('HH')
}
export const timedownshowmm = (value) => {
	return dayjs(value).format('mm')
}
export const timedownnum = (value) => {
	let newDate = dayjs(new Date).format('YYYY/MM/DD').toString(); //新时间
	let oldDate = dayjs(value).format('YYYY/MM/DD').toString(); //传入数据时间
	if (newDate == oldDate) {
		return true;
	} else {
		return false;
	}

}



//a标签下载

export const downLink = function(name, url) {
	const iframe = document.createElement("iframe");
	iframe.style.display = "none"; // 防止影响页面
	iframe.style.height = 0; // 防止影响页面
	iframe.src = url;
	document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
	// 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
	setTimeout(() => {
		iframe.remove();
	}, 5 * 60 * 1000);

}

//base64下载

export const downBase64 = (NAME, URL) => {
	// 截取base64的数据内容（去掉前面的描述信息，类似这样的一段：data:image/png;base64,）并解码为2进制数据
	// 如果浏览器支持msSaveOrOpenBlob方法（也就是使用IE浏览器的时候），那么调用该方法去下载图片
	if (window.navigator.msSaveOrOpenBlob) {
		var bstr = atob(URL.split(',')[1])
		var n = bstr.length
		var u8arr = new Uint8Array(n)
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n)
		}
		var blob = new Blob([u8arr])
		window.navigator.msSaveOrOpenBlob(blob, NAME + '.' + 'png')
	} else {
		// 这里就按照chrome等新版浏览器来处理
		const a = document.createElement('a')
		a.href = URL;
		a.setAttribute('download', NAME)
		a.click()
	}
}

/**
 * 函数防抖 (只执行最后一次点击)
 * @param fn
 * @param delay
 * @returns {Function}
 * @constructor
 */
export const Debounce = (fn, t) => {
	let delay = t || 500;
	let timer;
	return function() {
		let args = arguments;
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(() => {
			timer = null;
			fn.apply(this, args);
		}, delay);
	}
};
/** 
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export const Throttle = (fn, t) => {
	let last;
	let timer;
	let interval = t || 500;
	return function() {
		let args = arguments;
		let now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				last = now;
				fn.apply(this, args);
			}, interval);
		} else {
			last = now;
			fn.apply(this, args);
		}
	}
}


// export const getFiles = (targer) => {

//     let files = [];
//     let domFiles = targer.files; // 获取文件对象
//     let len = domFiles.length;
//     let fileList = []
//     for (let i = 0; i < len; i++) {
//         files[i] = domFiles[i];
//     }
//     if (files.length) {
//         let items = targer.items
//         if (items && items.length && items[0].webkitGetAsEntry != null) {
//             addFilesItems(items);
//         }
//     }
//     function addFilesItems(items) {
//         return (function () {
//             var ret = [];
//             for (var i = 0; i < items.length; i++) {
//                 var item = items[i];
//                 var entry;
//                 if (item.webkitGetAsEntry && (entry = item.webkitGetAsEntry())) {
//                     // 上传文件
//                     if (entry.isFile) {
//                         // 写入上传文件的逻辑，调用上传接口
//                         fileList.push(domFiles[i])
//                     } else if (entry.isDirectory) {
//                         // 上传文件夹
//                         ret.push(addFilesFormDirectory(entry, entry.name));
//                     }
//                 }
//             }
//         })();
//     }

// function addFilesFormDirectory(directory, path) {
//     const dirReader = directory.createReader();
//     const readEntries = function readEntries() {
//         return dirReader.readEntries(function (entries) {
//             entries.forEach(function (entry) {
//                 // 判断是否是文件
//                 if (entry.isFile) {
//                     entry.file(function (file) {
//                         // 用fullPath的值来代替webkitRelativePath
//                         file.fullPath = path + "/" + file.name;




//                         // 同上面的上传文件代码
//                     });

//                 } else if (entry.isDirectory) {
//                     // 如果还是文件夹,则递归处理
//                     addFilesFormDirectory(entry, path + "/" + entry.name);
//                 }
//             });
//         });
//     };
//     return readEntries()
// }


//     return fileList


// }


export const getFiles = async (files) => {
	let items = files.items;

	function addFilesItems(items) {
		var ret = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var entry;
			if (item.webkitGetAsEntry && (entry = item.webkitGetAsEntry())) {
				// 上传文件
				if (entry.isFile) {
					// 写入上传文件的逻辑，调用上传接口

					ret.push(FilesDirFunc(entry, entry.name))

				} else if (entry.isDirectory) {
					ret.push(FilesDirFunc(entry, entry.name))
				}
			}
		}
		return ret
	}
	async function FilesDirFunc(item, path) {
		let res = [];
		async function internalProces(item, path, res) {
			if (item.isFile) {
				await new Promise((resolve) => {
					item.file(file => {
						file.path = path + file.name;
						let newFile = new File([file], file.path, {
							type: file.type
						});
						newFile.oldName = file.name
						res.push(newFile);
						resolve();
					})
				})
			} else if (item.isDirectory) {
				let dirReader = item.createReader();
				let entries = await new Promise((resolve, reject) => {
					dirReader.readEntries(resolve, reject)
				});
				for (let i = 0; i < entries.length; i++) {
					await internalProces(entries[i], path + item.name + "/", res);
				}
			}
		}
		await internalProces(item, "", res);
		return res;

	}
	const c = await Promise.all(addFilesItems(items))
	return c
}
