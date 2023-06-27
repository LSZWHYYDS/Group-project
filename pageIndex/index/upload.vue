<template>
	<view class="container">
		<view class="load_2" v-if="load_2_show == 2">
			<view class="fileList_bottom">
				<view class="wenzi">
					<uni-file-picker style="display: inline-block;float: left;" file-mediatype="all" ref="fileInput2"
						@select="fileFunc($event)">
						<slot>
							<image src="../../static/add.png" mode=""></image>
						</slot>
					</uni-file-picker>
					<text style="text-align: right;">( 共{{ fileListAllNum }}个文件 | {{ byTes(allSize) }})</text>
				</view>
			</view>
			<scroll-view :scroll-y="true" :scroll-top="scrollTop" class="fileList" @click.stop="addFileShow = false"
				ref="fileList">
				<view class="fileList_top">
					<template v-for="(item, index) of fileList" :key="index">
						<view class="fileItem">
							<view class="fileImg">
								<image class="smImage" v-if="item.thisType == 'image'" src="../../static/type_3.svg"
									alt="" />
								<image class="smImage" v-if="item.thisType == 'video'" src="../../static/type_2.svg"
									alt="" />
								<image class="smImage" v-if="item.thisType == 'file'" src="../../static/type_4.svg"
									alt="" />
								<image class="smImage" v-if="item.thisType == 'dir'" src="../../static/type_1.svg"
									alt="" />
							</view>
							<view class="fileMsg">
								<p class="fileItem_name">
									<!-- "未读取的" -->
									{{ item.name ? item.name : "未读取的" }}
								</p>
								<p class="fileItem_dir">
									<span v-if="item.dir">
										文件夹
									</span>
									<span v-if="item.dir" class="dot">&nbsp; · &nbsp;</span>
									<!-- 个文件 -->
									<span v-if="item.dir">{{ item.len }}个文件</span>
									<span>{{ byTes(item.size) }}</span>
								</p>
							</view>
							<view style="position: absolute;right: 0;">
								<image style="width: 30px;height: 30px;" src="../../static/close.svg"
									@click="deleteItem(item,index)" alt="" />
							</view>
						</view>
					</template>
				</view>
		
			</scroll-view>
		
			<view class="setList" :class="{ allSetList: openSetList }">
				<!--  存储至网盘 开始-->
				<view>
					<view class="lHeight">
						存储至网盘
					</view>
					<view class="setItemBtnBox">
						<switch style="transform:scale(0.7)" @change="switchChange" />
					</view>
				</view>
				<!-- 存储至网盘 结束 -->
				<!-- 下载次数 开始-->
				<view class="listselect">
					<view class="biaoti lHeight">
						下载次数
					</view>
					<view style="display: flex;height: 50px;line-height: 50px;">
						<view v-if="!select_6">
							<span class="el-dropdown-link" @click="nubshow = true"
								style="color: #606266;font-size: 14px;">
								{{downNumbershow}}
							</span>
							<image style="width: 10px;height: 10px;margin-left: 5px;" src="../../static/arrowBot.png"
								@click="nubshow = true" alt="" />
						</view>
						<view class="howNum" v-else>
							<input v-model="downNumber" type="text" placeholder="10" />
							<span style="margin: 0 5px">次</span>
							<image style="width: 10px;height: 10px;" src="../../static/arrowBot.png" @click="qhdnbm()"
								alt="" />
						</view>
						<!-- <van-button type="info">嗯嗯嗯</van-button> -->
						<van-action-sheet @click-overlay="overlay(1)" closeable :show="nubshow" @select="nubselect"
							:actions="nubactions" description="选择下载次数" close-on-click-action />
						<!--cancel-text="取消"-->
						<!-- 							<van-action-sheet closeable v-model="nubshow" @select="nubselect" :actions="nubactions"
								description="选择下载次数" close-on-click-action /> -->
					</view>
				</view>
				<!-- 下载次数 结束-->
				<!-- 有效期 开始-->
				<view class="listselect">
					<view class="biaoti lHeight">
						有效期
					</view>
					<view style="display: flex;height: 50px;line-height: 50px;">
						<view v-if="!select_3">
							<span class="el-dropdown-link" @click="timeshow = true"
								style="color: #606266;font-size: 14px;">
								{{downDayshow}}
							</span>
							<image style="width: 10px;height: 10px;margin-left: 5px;" src="../../static/arrowBot.png"
								@click="timeshow = true" alt="" />
						</view>
						<view class="howNum" v-else>
							<input v-model="downDay" type="text" placeholder="1" />
							<span style="margin: 0 5px">天</span>
							<image style="width: 10px;height: 10px;" src="../../static/arrowBot.png" @click="qhdwd()"
								alt="" />
							<!-- <i class="el-icon-arrow-down el-icon--right" @click="qhdwd()"></i> -->
						</view>
						<van-action-sheet @click-overlay="overlay(2)" closeable :show="timeshow" @select="onselect"
							:actions="actions" description="选择有效期" close-on-click-action />
					</view>
				</view>
				<!-- 有效期 结束-->
				<!-- 传输文件描述 开始 -->
				<view :class="loginState?'textareaBox':'textareaBoxFalse'">
					<textarea placeholder="传输文件描述(选填)..." v-model="description"></textarea>
				</view>
				<!-- 传输文件描述 结束 -->
			</view>
		
			<!-- 底部上传按钮 -->
			<view class="load_2_bottom">
				<view class="anniubase" @click="show = !show">
					<image src="../../static/setUp.png" mode="" style="width: 30px;height: 30px;"></image>
				</view>
				<view class="load_2_bottomBtn" @click="uploadFunc">
					开始上传
				</view>
			</view>
			<!--弹出层:更多设置 开始-->
			<view>
				<van-popup :show="show" closeable close-icon-position="top-right" :close-on-click-overlay="true"
					position="bottom" round :style="{ height: '36%' }" :close-on-click-action="false"
					@close="show = false;tipShow=false">
					<view class="fx"  @click="tipShow=false">更多设置</view>
					<van-divider style="margin: 0px;width: 100%;" />
					<!-- <el-viewider style="margin: 0px;width: 100%;"></el-viewider> -->
					<view class="setList1"  @click="tipShow=false">
						<!-- 加密传输 开始-->
						<view class="setItemStyle">
							<view class="top">
								<view v-if="select_2==0">设置密码</view>
								<view v-else class="passStyle">
									<view>设置密码</view>
									<view class="pwdinput">
										<input style="text-align:center" class="passInput" maxlength="12"
											:type="passwordShow ? 'text' : 'password'" v-model="pass"
											placeholder="请输入6-12位密码" />
									</view>
								</view>
							</view>
							<view class="setItemBtnBox"  @click="tipShow=false">
								<view v-if="select_2==1" style="display: flex; align-items: center;">
									<!-- <image src="../../static/setUp.png" mode="" style="width: 30px;height: 30px;"></image> -->
									<image class="iImg" v-if="passwordShow" @click="passwordShow = false"
										src="../../static/lookPass.png" alt="" style="margin-right: 20px;"></image>
									<image class="iImg" v-else @click="passwordShow = true"
										src="../../static/closePass.png" alt="" style="margin-right: 20px;"></image>
								</view>
								<switch style="transform:scale(0.7)"  @change="setPswChange" />
								<!-- 								<el-switch :active-value="1" :inactive-value="0" active-color="#409EFF"
									inactive-color="#C0CCDA" v-model="select_2">
								</el-switch> -->
							</view>
						</view>
						<!-- 加密传输 结束 -->
						<!--  是否可以预览 开始-->
						<view class="setItemStyle"  @click="tipShow=false">
							<view class="top">
								<view>允许对方预览</view>
							</view>
							<view class="setItemBtnBox">
								<switch style="transform:scale(0.7)" @change="setYlChange" />
								<!-- 								<el-switch :active-value="1" :inactive-value="0" active-color="#409EFF"
									inactive-color="#C0CCDA" v-model="select_8">
								</el-switch> -->
							</view>
						</view>
						<!--  是否可以预览 结束-->
		
						<!-- 是否分享流量 开始 -->
						<view class="setItemStyle"  @click="tipShow=false">
							<view class="top">
								<view style="align-items: center;display: flex;">
									<!-- 分享流量 v-else-->
									提供下载流量
									<image class="iImg" src="../../static/tips.png" mode=""
										@click.stop="tipShow = !tipShow"></image>
									<view v-if="tipShow" class="tipStyle">
										对方下载分享的文件,消耗你的下载流量
									</view>
									<!-- 									<el-tooltip class="item" effect="dark" content="对方下载分享的文件,消耗你的下载流量"
										placement="bottom-start">
										<i class="el-icon-question" style="color: #999999;"></i>
									</el-tooltip> -->
								</view>
							</view>
							<view class="setItemBtnBox"  @click="tipShow=false">
								<switch style="transform:scale(0.7)" @change="setXzChange" />
								<!-- 								<el-switch :active-value="0" :inactive-value="1" active-color="#409EFF"
									inactive-color="#C0CCDA" v-model="select_10">
								</el-switch> -->
							</view>
						</view>
						<!-- 是否分享流量 结束 -->
						<view class="setItemStyle"
							style="font-family: PingFang SC;font-style: normal;font-weight: normal;">
							<view style="color: #666666;" class="top">
								<!-- 流量剩余 -->
								流量剩余:
								{{ byTes(userFlowData.residueFlow) }}
							</view>
							<view class="buttonpuce">购买</view>
						</view>
					</view>
				</van-popup>
			</view>
			<!--弹出层:更多设置 结束-->
		</view>
	</view>
</template>

<script>
	import {
		bytesToSize,
		getSuffix,
		isImage,
		isVideo,
		isEmall,
		Debounce,
	} from '../../utils/index.js'
	import {
		mailLogin,
		createTransfer,
		getOssToken
	} from '../../utils/api.js' //具体根据你项目的路径修改
	import {
		client,
		getFileNameUUID
	} from "../../utils/ali-oss";
	import {
		mapMutations,
		mapState,
		mapActions
	} from "vuex";
	export default {
		data() {
			return {
				scrollTop: 0,
				tipShow: false,
				href: 'https://uniapp.dcloud.io',
				load_2_show: 2, //上传列表状态  状态分为 1(点击上传) 2（准备上传） 3（上传中) 4(下载)
				isShowFile: false,
				isShowCollect: false,
				rightBoxShow: true,
				rightStyle: false,
				rigthBtnShow: false,
				pickUpCode: "xxxxxx", //取件码
				getCode: "",
				imgArr3: [],
				showWx: true,
				fileListAllNum: 0,
				addFileShow: false, //上传列表状态  点击加号添加文件
				openSetList: false,
				pickUpCode: "xxxxxx", //取件码
				fileList: [], // 上传列表内容
				fileListName: [], //禁止文件重复 储存文件名
				loginState: false,
				openPass: 0, //0表示无密码，1表示有密码
				pass: "", //密码
				description: "", //描述
				// copyUrl: urlPath,
				// 控制设置选择 （可能删除)
				select_1: 0,
				select_2: 0,
				select_3: false,
				select_4: false,
				select_5: false,
				select_6: false,
				select_7: false,
				select_8: 1,
				select_10: 0,
				passwordShow: false,
				openPass: 0, //0表示无密码，1表示有密码
				pass: "", //密码
				downloadLimit: 10, //下载次数限制
				nubshow: false, //下载次数
				enableDown: 1, //	是否可以下载和转存 0否 1是（第一版传1即可）
				enablePreview: 1, //	是否可以预览 0否 1是（第一版传1即可）
				mails: "", //	邮件分享
				phones: "", //	短信分享
				dateValue: 0, //选择的时间
				downLimit: [5, 10, 20],
				//进度条记录参数
				allSize: 0, //上传文件总大小
				progress: {}, //进度条载体
				downTime: 0, //计算时间
				alreadySize: 0, //已下载大小
				alreadyNum: 0,
				speed: "256kb", //速度
				waterNum: 0, //
				upLoadEnd: false, //上传完成
				transferGuid: "",
				getCode: "",
				aKeyCopayShow: true,
				overTime: "xxxx-xx-xx", //过期时间
				extractCode: "",
				//二维码
				qrCode: "",
				isShow: false, //tootip
				top: 0,
				errFileList: [],
				resetUploadShow: false,
				resetUploadTimes: 0,
				wxDailogShow: false,
				shareShow: false,
				startX: 0,
				startY: 0,
				//新增管控
				downNumber: 10, //剩余下载次数,默认为10次
				downNumbershow: "10次", //显示分享数
				downDay: 1, //剩余分享时间
				downDayshow: "1天", //显示分享时间剩余数
				utilsType: false, //设置面板显示/隐藏
				drawer: false, //弹窗开关，显示/隐藏
				show: false, //分享设置弹出
				timeshow: false, //有效期选择
				actions: [{
						name: '1天',
						value: '1',
					},
					{
						name: '3天',
						value: '3',
					},
					{
						name: '7天',
						value: '7',
					},
					{
						name: '永久有效',
						value: '3650',
					},
					{
						name: '自定义',
						value: '0',
					}
				],
				nubactions: [{
						name: '50次',
						value: '50',
					},
					{
						name: '100次',
						value: '100',
					},
					{
						name: '200次',
						value: '200',
					},
					{
						name: '无限制',
						value: '9999999',
					},
					{
						name: '自定义',
						value: '0',
					},
				],
			}
		},
		onLoad(option) {
			// _self = this;
			console.log(JSON.parse(option.list));
			console.log(6969);
			this.$nextTick(() => {
			})
		},
		methods: {
			...mapMutations(["SET_FILELIST"]),
			...mapActions(["REQUEST_FLOW"]),
			byTes(value) {
				return bytesToSize(value);
			},
			switchChange(e) {
				if (e.detail.value == true) {
					this.select_1 = 1;
				} else {
					this.select_1 = 0;
				}
				console.log(this.select_1)
				let token = uni.getStorageSync("token");
				if (!token) {
					if (e.detail.value == true) {
						this.select_1 = 0;
						console.log(this.select_1)
						return;
					}
				}
			},
			setPswChange(e) {
				if (e.detail.value == true) {
					this.select_2 = 1;
					console.log(this.show)
				} else {
					this.select_2 = 0;
				}
				console.log(this.select_2)
			},
			setYlChange(e) {
				if (e.detail.value == true) {
					this.select_8 = 1;
				} else {
					this.select_8 = 0;
				}
				console.log(this.select_8)
			},
			setXzChange(e) {
				if (e.detail.value == true) {
					this.select_10 = 1;
				} else {
					this.select_10 = 0;
				}
				// console.log(this.select_10)
			},
			overlay(val) {
				if (val == 1) {
					this.nubshow = true;
					setTimeout(() => {
						this.nubshow = false;
					}, 100)
				} else {
					this.timeshow = true;
					setTimeout(() => {
						this.timeshow = false;
					}, 100)
				}
			},
			fileFunc(e) {
				console.log(e)
				console.log(6666666666666)
				// this.typeDargStyle = false;
				let fileList = e.tempFiles;
				console.log(fileList)
				console.log(899999)
				let token = uni.getStorageSync("token");
				if (!token) {
					if (fileList.length > 5) {
						uni.showToast({
							icon: "none",
							title: '未登录状态上传不得超过5个'
						})
						// this.$refs.dirInput.value = null;
						return;
					}
				}
				let fileArray = [];
				fileList.forEach((file) => {
					let fileType = getSuffix(file.name); //获取后缀
					//判断文件类型 开始
					if (isImage(fileType)) {
						file.thisType = "image";
					} else if (isVideo(fileType)) {
						file.thisType = "video";
					} else {
						file.thisType = "file";
					}
					fileArray.push(file);
				});
				console.log(fileList)
				console.log(fileArray)
				//判断文件类型 结束
				console.log(this.fileListName)
				console.log(fileArray)
				this.fileListName = [...new Set(this.fileListName)];
				for (let i = 0; i < fileArray.length; i++) {
					for (let j = 0; j < this.fileListName.length; j++) {
						if (fileArray[i].name == this.fileListName[j]) {
							uni.showToast({
								icon: "none",
								title: '发现文件名称相同的文件，该文件已被自动过滤'
							})
							this.fileListName.splice(j, 1)
							fileArray.splice(i, 1)
						}
					}
				}
				console.log(this.fileListName)
				console.log(fileArray)
				//判断重复文件名 结束
			
				this.fileList = this.fileList.concat(fileArray);
				this.fileList.forEach((item) => this.fileListName.push(item.name)); //添加名字列表
				this.fileList = this.uniqueFunc(this.fileList, 'name'); //数组去重
				this.fileListAllNum = this.fileList.length;
				this.load_2_show = 2;
			
				let sizeCur = 0;
				this.$nextTick(() => {
					this.scrollTop = this.fileList.length * 64;
				});
				fileArray.forEach((item) => {
					sizeCur += item.size;
				});
			
				this.allSize += sizeCur;
				this.SET_FILELIST(this.fileList);
				this.addFileShow = false;
				this.transferType = 1;
			},
			uniqueFunc(arr, name) { //数组去重
				const res = new Map();
				return arr.filter((item) => !res.has(item[name]) && res.set(item[name], 1));
			},
			//开始上传
			async uploadFunc() {
				// console.log(this.downNumber)
				// console.log(this.downDay)
				this.load_2_show = 3; //状态 3
				const transferGuid = await this.getTransferGuid();
				// console.log(transferGuid);
				this.overTime = transferGuid.data.validDate;
				this.transferGuid = transferGuid.data.transferGuid;
				// this.copyUrl = "https://wkkc.vip/s/" + transferGuid.data.link;
				this.copyUrl = urlOSS + transferGuid.data.link;
				const getToken = await getOssToken();
				const token = getToken.data;
				this.multipartUpload(token);
			},
			//oss上传函数
			async multipartUpload(token) {
				let allList = [];
				this.fileList.forEach((item) => {
					if (item.dir) {
						//文件夹
						let name = getFileNameUUID(); // 从新编译文件夹的文件名
						item.files.forEach((item) => {
							let ext = item.webkitRelativePath.substring(
								item.webkitRelativePath.indexOf("/")
							);
							if (!ext) {
								ext = item.name.substring(item.name.indexOf("/"));
							}
							let obj = {};
							obj.name = name + ext;
							obj.file = item;
							allList.push(obj);
						});
					} else {
						//文件;
						let name = getFileNameUUID() + "/" + item.name; // 从新编译文件名
						let obj = {};
						obj.name = name;
						obj.file = item;
						allList.push(obj);
					}
				});
				//   return
				//计算下载时间 开始
				let timer = setInterval(() => {
					this.downTime += 1;
					// console.log(this.downTime);
				}, 1000);
			
				//计算下载时间 结束
			
				const transferGuid = this.transferGuid; //每次上传的时间戳
				this.upLoadEnd = false;
				let arry = [];
				const clientRusult = await Promise.all(
					allList.map(async (file, index) => {
						let o = {
							fileName: file.file.name,
							fileSize: file.file.size,
							path: file.name,
							originalName: file.file.webkitRelativePath ?
								file.file.webkitRelativePath : file.file.name,
							transferGuid: transferGuid,
							fileType: file.file.type,
						};
						arry.push(o);
						return await this.multiBackPath(token, file.name, file.file);
					})
				);
			
				if (clientRusult.some((item) => item == false)) {
					//上传失败
					this.resetUploadShow = true;
					return;
				} else {
					let saveEverBox;
					if (this.select_1 == true) {
						saveEverBox = 1;
					} else {
						saveEverBox = 0;
					}
			
					let totalFileSize = 0;
					arry.forEach((item) => {
						totalFileSize += item.fileSize;
					});
			
					const beforeRes = await uploadBefore({
						filesList: arry,
						saveEverBox,
						totalFileSize,
					});
					// console.log(beforeRes);
					if (beforeRes.data.code !== 0) {
						this.$message.error(this.$t('la.uploadFailedUA')); //"上传失败,请从新上传"
						return;
					}
					this.$refs.water.isShow = false;
					let obj = {};
					obj.transferGuid = transferGuid;
					obj.saveEverBox = saveEverBox;
					obj.transferType = 1;
					const transferGuidData = await completUpload(obj);
					const payload = transferGuidData.data.data;
					this.pickUpCode = payload;
					createZip(transferGuid);
					//请求完成 发送 推送
					await sendEmailAndSMS(transferGuid);
					clearInterval(timer);
				}
			
				this.upLoadEnd = true;
				this.downTime = 0;
			},
			//获取 TransferGuid
			async getTransferGuid() {
				let data = {};
				!this.select_2 ? (data.openPass = 0) : (data.openPass = 1);
				if (this.select_4) {
					if (!isEmall(this.mails)) {
						//"邮件格式错误"
						uni.showToast({
							icon: "none",
							title: '邮件格式错误'
						})
						return;
					}
				}
				if (this.select_2) {
					if (this.pass.length > 12 || this.pass.length < 6) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的密码格式'
						})
						return;
					}
				}
			
			
				data.transferType = 1; //移动端只能上传文件，定义默认值为1
				//0表示无密码，1表示有密码
				data.pass = this.pass; //		密码（无密码则可以不传）
				data.mails = []; //			邮件分享
				if (!this.mails) {
					delete data.mails;
				} else {
					data.mails.push(this.mails);
				}
				data.userId = uni.getStorageSync("loginUserId");
			
				data.description = this.description; //		传输描述
				data.downDay = this.downDay; //设置的有效天数
				/**不需要修改 */
				data.downloadLimit = this.downNumber; //	下载次数限制
				data.enableDown = this.select_7 ? 1 : 0; //		是否可以下载和转存 0否 1是（第一版传1即可）
				data.enablePreview = this.select_8; //			是否可以预览 0否 1是（第一版传1即可）
				console.log(data);
				if (this.loginState) {
					data.shareFlow = this.select_10; //0:分享流量 1:不分享流量
				} else {
					data.shareFlow = 0;
				}
				/**不需要修改 */
				for (let k in data) {
					if (!data[k] && data[k] !== 0) {
						delete data[k];
					}
				}
				const res = await createTransfer(data);
				return res.data;
			},
			onselect(item) {
				console.log(item)
				// let token = uni.getStorageSync("token");
				// if(token){
				this.show = false;
				if (item.target.value == 1) {
					this.downDay = "1";
					this.downDayshow = "1天";
					this.timeshow = false;
					// this.show = true;
				} else if (item.target.value == 3) {
					this.downDay = "3";
					this.downDayshow = "3天";
					this.timeshow = false;
					// this.show = true;
				} else if (item.target.value == 7) {
					this.downDay = "7";
					this.downDayshow = "7天";
					this.timeshow = false;
					// this.show = true;
				} else if (item.target.value == 3650) {
					this.downDay = "3650";
					this.downDayshow = "永久有效";
					this.timeshow = false;
					// this.show = true;
				} else if (item.target.value == 0) {
					// this.downDay = "";
					this.downDayshow = "";
					this.select_3 = true;
					this.timeshow = false;
				} else {
					// this.$message("系统错误，请稍后重试！");
				}
			},
			
			nubselect(item) {
				console.log(item)
				// let token = uni.getStorageSync("token");
				// if(token){
				this.show = false;
				if (item.target.value == 50) {
					console.log(item.target.value)
					this.downNumber = 50;
					this.downNumbershow = "50次";
					this.nubshow = false;
					// this.show = true;
				} else if (item.target.value == 100) {
					this.downNumber = 100;
					this.downNumbershow = "100次";
					this.nubshow = false;
					// this.show = true;
				} else if (item.target.value == 200) {
					this.downNumber = 200;
					this.downNumbershow = "200次";
					this.nubshow = false;
					// this.show = true;
				} else if (item.target.value == 9999999) {
					this.downNumber = 9999999;
					this.downNumbershow = "无限制";
					this.nubshow = false;
					// this.show = true;
				} else if (item.target.value == 0) {
					// this.downNumber = "";
					this.downNumbershow = "";
					this.select_6 = true;
					this.nubshow = false;
					// this.show = true;
				} else {
					// this.$message("系统错误，请稍后重试！");
				}
				// }
				// else{
				// 	// this.$refs.mloginAlert.comfirmDeleteShow = true
				// 	return;
				// }
			
			},
			qhdnbm() {
				this.select_6 = false;
				this.nubshow = true;
				this.downNumber = 10;
				this.downNumbershow = "10次";
			},
			qhdwd() {
				this.select_3 = false;
				this.timeshow = true;
				this.downDay = "1";
				this.downDayshow = "1天";
			},
			savePan(e) {
				this.select_1 = e
				// let token = uni.getStorageSync("token");
				// if(!token) {
				if (this.select_1 === 1) {
					// this.$refs.mloginAlert.comfirmDeleteShow = true
					// this.$message.error(this.$t('la.logIn'));
					// this.$parent._data.loginShow = true;
					this.select_1 = 0;
					return;
				}
				// }
			},
			//删除文件
			deleteItem(item, index) {
				this.fileListName = [...new Set(this.fileListName)];
				console.log(this.fileListName)
				for (let i = 0; i < this.fileListName.length; i++) {
					if (item.name == this.fileListName[i]) {
						this.fileListName.splice(i, 1)
					}
				}
				// console.log(this.fileList[index].size)
				this.allSize -= this.fileList[index].size;
				let c = this.fileList.splice(index, 1);
				//删除文件的数量
				if (c[0].files) {
					//【判断文件夹
					this.fileListAllNum -= c[0].files.length;
				} else {
					//文件
					this.fileListAllNum -= 1;
				}
				// 删除文件的数量
				if (this.$refs.fileInput2) {
					this.$refs.fileInput2.value = null;
				}
				if (this.$refs.dirInput2) {
					this.$refs.dirInput2.value = null;
				}
			
				if (this.fileList.length == 0) {
					this.load_2_show = 1;
					this.fileListName = [];
					this.fileListAllNum = 0;
					this.allSize = 0;
				}
			},
			
		},
	
		computed: {
			...mapState({
				// userFlowData: (store) =>
				// 	 uni.getStorageSync("userFlowData") ?
				// 	JSON.parse(store.state.userFlowData) : {},
				userFlowData: (state) => uni.getStorageSync("userFlowData") ? JSON.parse(state.userFlowData) : {},
				// files: (state) => state.files,
				// pro: (state) => state.progress,
				// parentTOP: (state) => state.top,
			}),
			aKeyCopay() {
				let str = this.copyUrl;
				let code = this.pickUpCode;
				let showName;
				if (this.fileList.length > 0) {
					showName = this.fileList[0].name
				}
				if (code == "xxxxxx") {
					//"您有一份文件待查收！即刻点击链接获取："
					return '您有一份文件【' + showName + '】待查收！即刻点击链接获取：' + str;
				} else {
					//"您有一份文件待查收！即刻点击链接获取："      " 或进入 ：https://wkkc.vip 获取，在首页输入取件码：" 24小时内有效
					return (
						'您有一份文件【' + showName + '】待查收！即刻点击链接获取：' + str + this.$t('la.pickUupCode') +
						code +
						' ( 有效期至 :' + this.overTime + ' )'
					);
				}
			},
			copyPickUpCode() {
				return this.pickUpCode;
			},
			//计算高度
			getHeight() {
				let h = 0;
				if (this.load_2_show == 1) {
					h = "70px";
				} else if (this.load_2_show == 4) {
					h = "355px";
				} else {
					h = "88vh";
				}
				return h;
			},
		},
		mounted(){
			// this.REQUEST_FLOW();
			console.log(this.userFlowData)
			console.log('this.userFlowData')
		},
	}
	
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eeeeee;
	}
	//上传列表 开始 *******************************
	.load_2 {
		position: fixed;
		bottom: 0;
		width: 100%;
		border-radius: 20px;
		background: #ffffff;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
	
		.fileList {
			width: 100%;
			/* height: 50%; */
			padding: 0 11px 0 11px;
			box-sizing: border-box;
			background: #F6F6F6;
			overflow-y: auto;
			max-height: calc(100vh - 400px);
		}
	
		.fileList_top {
			overflow-y: auto;
			width: 100%;
		}
	
		.fileList_bottom {
			width: 100%;
			height: 50px;
			line-height: 50px;
			box-sizing: border-box;
			background: #F6F6F6;
			border-radius: 20px 20px 0 0;
	
			.wenzi {
				text-align: right;
				margin-right: 20px;
				font-family: PingFang SC;
				font-style: normal;
				font-weight: 400;
				font-size: 12px;
				color: #666;
	
				image {
					width: 32px;
					height: 32px;
					float: left;
					margin-left: 20px;
					margin-top: 9px;
				}
			}
		}
		.fileImg {
			width: 40px;
			height: 40px;
			// background: #d6d6d6;
			border-radius: 5px;
			margin-right: 15px;
		}
	
		.fileItem {
			display: flex;
			align-items: center;
		}
	
		.fileMsg {
			width: 220px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
	
		.fileList_top>view {
			width: 100%;
			height: 53px;
			opacity: 1;
			border-radius: 10px;
			padding: 7px 12px;
			font-size: 14px;
			box-sizing: border-box;
		}
	
		.selectBox {
			box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
			width: 40%;
			min-height: 30px;
			z-index: 99999999999;
			position: absolute;
			top: 48px;
			left: 20px;
			background: #FFFFFF;
			border-radius: 5px;
			font-family: PingFang SC;
			font-style: normal;
			font-weight: normal;
		}
	
		.selectBox>view {
			height: 40px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
		}
	
		.selectBox>view>label {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: inherit;
		}
	
		.selectBox>view:hover {
			background-color: #F1F6F9;
		}
	
		.load_2_bottom {
			width: 100%;
			height: 70px;
			background: #ffffff;
			box-shadow: 0px -1px 0px #eeeeee;
			opacity: 1;
			border-radius: 0px 0px 10px 10px;
			display: flex;
			align-items: center;
	
			.anniubase {
				box-sizing: border-box;
				width: 60px;
				height: 40px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				padding: 10px;
				border-radius: 10px;
				margin-left: 20px;
				border: 1px;
				border-style: double;
				border-color: #3679ff;
				cursor: pointer;
			}
		}
	
		.load_2_bottomBtn {
			width: 220px;
			font-size: 14px;
			color: #fff;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin-left: 24px;
			background: #3679ff;
			color: #ffffff;
			border-radius: 10px;
			color: #ffffff;
		}
	}
	.allSetList {
		overflow-y: auto;
		animation: top 0.5s forwards;
	}
	
	//文件描述
	.textareaBox {
		flex-direction: column;
	
		textarea {
			width: 100%;
			height: 68px;
			border: 0;
			font-size: 14px;
			font-family: PingFang SC;
		}
	}
	
	.textareaBox :nth-child(1) {
		width: 100%;
		height: 60px;
		line-height: 30px;
		background-color: #fff;
		margin: 5px;
		padding: 5px;
		border-radius: 10px;
		border: 1px solid #DCDCDC;
	}
	
	.textareaBoxFalse {
		flex-direction: column;
	
		// height: 178px !important;
		textarea {
			width: 100%;
			height: 68px;
			border: 0;
			font-size: 14px;
			font-family: PingFang SC;
		}
	}
	
	.textareaBoxFalse :nth-child(1) {
		width: 100%;
		height: 65px;
		line-height: 30px;
		background-color: #F6F6F6;
		padding: 5px;
		margin: 5px;
		border-radius: 10px;
	}
	
	.setList>view {
		width: 100%;
		border-bottom: 1px solid #eee;
		padding: 0 15px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: 700;
		color: #333;
		justify-content: space-between;
	}
	
	.lHeight {
		line-height: 50px;
	}
	
	// .setList > view :first-child {
	// 	height: 100%;
	// 	line-height: 50px;
	// }
	.setList .textareaBoxFalse :first-child {
		width: 100%;
		height: 75px;
		line-height: 30px;
		background-color: #f6f6f6;
		padding: 5px;
		margin: 5px;
		border-radius: 10px;
	}
	
	.howNum {
		display: flex;
		align-items: center;
	
		input {
			display: inline-block;
			width: 50px;
			margin-top: 5px;
			border: 1px solid #dcdfe6;
			border-radius: 4px;
			height: 40px !important;
		}
	}
	
	::v-deep .van-action-sheet__description+view {
		margin-bottom: 50px;
	}
	
	// 更多设置
	.fx {
		height: 20%;
		line-height: 40px;
		font-family: PingFang SC;
		font-style: normal;
		font-weight: bold;
		color: #666666;
		font-size: 18px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.iImg {
		width: 20px;
		height: 20px;
	}
	
	.tipStyle {
		position: absolute;
		width: 250px;
		left: 50px;
		top: 132px;
		background: #fff;
		border-radius: 10px;
		padding: 0 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.15);
		color: #666666;
		font-size: 13px;
		text-align: center;
		height: 48px;
	}
	
	.setList1 {
		margin-bottom: 84px;
	}
	
	//设置
	.setItemStyle {
		width: 100%;
		border-bottom: 1px solid #eeeeee;
		padding: 0 15px;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		font-family: PingFang SC;
		font-size: 14px;
		font-weight: bold;
		color: #333333;
		justify-content: space-between;
	
		.top {
			width: 241px;
			height: 100%;
			line-height: 50px;
		}
	}
	
	.passStyle {
		display: flex;
		height: 100%;
		align-items: center;
	
		.pwdinput {
			max-width: 160px;
	
			input {
				height: 100%;
				margin-left: 35px;
				border: 0;
				text-align: center;
			}
		}
	}
	
	.setItemBtnBox {
		display: flex;
	}
	
	.buttonpuce {
		background-color: #E5EEFF;
		padding: 10px 15px 10px 15px;
		border-radius: 10px;
		color: #3679FF;
	}
	
	.fileItem_name {
		font-size: 14px;
		color: #333333;
		margin-bottom: 3px;
	}
	
	.fileItem_dir {
		height: 17px;
		display: flex;
		align-items: center;
		color: #999999;
		font-size: 12px;
	}
	
	.smImage {
		width: 40px;
		height: 40px;
	}
</style>
<style lang="scss">
	.container {
		.is-text-box {
			display: none;
		}
	}
</style>
