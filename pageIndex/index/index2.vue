<template>
	<view class="container" @click="bodyCloseSelected">
		<view class="uploadWx" v-if="showWx">
			<view class="top">
				<view class="top_wx">
					<image src="../../static/wxPic.png" mode=""></image>
				</view>
				<view class="middle">
					<text class="tex1"  @click="uploadFile">上传微信文件</text>
					<text class="tex2">不限制大小，快速分享微信文件</text>
				</view>
				<view class="bottom" @click.stop="closeWx">
					<image src="../../static/close.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="uploadBack">
			<view class="upload">
				<view class="fafile sfileStyle" v-if="load_2_show == 1 && !isShowFile && !isShowCollect" style="">
					<view class="fa_1">
						<view class="fa_1_left">
							<label class="addOneFile">
								<image class="fafileIcon" src="../../static/sendfile.svg" alt="" />
								<uni-file-picker :value="imgArr3" file-mediatype="all" @select="otherSelect($event)">
									<slot>发文件</slot>
								</uni-file-picker>

								<!-- <input type="file" multiple style="display: none" @change="fileFunc" ref="fileInput" /> -->
							</label>
						</view>
						<span class="fileline">|</span>

						<view class="fa_1_right" @click.stop="collectFileClick">
							<label class="addOneFile">
								<image class="fafileIcon" src="../../static/collectfile.svg" alt="" />
								<span>
									收文件
								</span>
							</label>
						</view>
					</view>
				</view>
				<view class="fristStateStyle" v-if="load_2_show == 1 && isShowCollect"
					@click.stop="isShowCollect = true" style="position: relative;">
					<view class="load_1">
						<view class="load_1_left" style="width: 100%">
							<label class="addOneFile">
								<image class="fafileIcon" src="../../static/collectfile.svg" alt="" />
								<span @click="haveCode">
									取件码
								</span>
							</label>
						</view>
						<span class="orClass" style="margin:0 25px;">or</span>
						<view class="fa_1_right" @click="collectClick">
							<label class="addOneFile">
								<span>
									收集文件
								</span>
							</label>
						</view>
						<view class="load_1_right" :class="{ upClass: rightStyle }" v-if="!rightBoxShow">
							<view class="load_1_right_Input">
								<input v-model="getCode" type="text" placeholder="请输入6位取件码" maxlength="6" />
								<image @click="closeCode" class="closeBtn" src="../../static/close.svg" alt="" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabber pagePath="/pageIndex/index/index"></tabber>
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
	} from '@/utils/index.js'
	import urlPath from '@/utils/base.js'
	import {
		mailLogin,
		createTransfer,
		getOssToken,
		getUserFlow
	} from '@/utils/api.js' //具体根据你项目的路径修改
	import {
		client,
		getFileNameUUID
	} from "@/utils/ali-oss";
	import {
		mapMutations,
		mapState,
		mapActions
	} from "vuex";
	import tabber from "@/components/tabber.vue";
	export default {
		data() {
			return {
				scrollTop: 0,
				tipShow: false,
				href: 'https://uniapp.dcloud.io',
				load_2_show: 1, //上传列表状态  状态分为 1(点击上传) 2（准备上传） 3（上传中) 4(下载)
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
		// filters: {
		// 	byTes(value) {
		// 		return bytesToSize(value);
		// 	},
		// },
		onLoad() {
		},
		components: {
			tabber
		},
		methods: {
			uploadFile(){
				console.log(11111)
				uni.chooseMessageFile({
                    count:1,
                    type:'file',
                    extension: ['pdf', 'docx','doc','png','jpg'],
                    success:res=>{
                        console.log('res--选取文件--',res.tempFiles[0].path);
                        uni.uploadFile({
                            url:'https://upload.xuruidea.com/uploadFile',
                            filePath:res.tempFiles[0].path,
                            name:'file',
                            formData:{
                                'file':res.tempFiles[0].name
                            },
                            success:file=>{
                                console.log('file----',file);
                            }
                        })
                    }
                })
			},
			mailClick() {
				let data = {};
				data.userName = '1725565883@qq.com';
				data.password = '123456';
				mailLogin(data).then(res => {
					console.log(res)
					if (res.code == 200) { //一般成功状态码都是200，根据实际情况判断
						//此处为接口调用成功之后需要做的事情
					} else {
						//否者就是不成功，一般会弹出错误信息
					}

				})
			},
			otherSelect(e, type) {
				uni.navigateTo({
					// url: "/pages/listDetails/listDetails",
					url: "/pageIndex/index/upload?list=" + JSON.stringify(e.tempFiles)
				})
				// this.load_2_show = 2;
				// this.fileFunc(e)
			},
			closeWx() {
				this.showWx = false;
			},
			collectFileClick() {
				this.isShowCollect = true;
				this.isShowFile = false;
			},
			haveCode() {
				this.rightBoxShow = false;
				this.rightStyle = true;
			},
			collectClick() {},
			closeCode() {
				this.rightBoxShow = true;
				this.rightStyle = false;
			},
			bodyCloseSelected() {
				this.isShowCollect = false;
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
		},
		// watch: {

		// },
		mounted(){
			console.log(urlPath)
			getUserFlow().then(res=>{
				 if(res.data.code == 0){
					console.log(9999)
				 }
			})
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

	.uploadWx {
		position: absolute;
		top: 20px;
		width: 343px;
		height: 72px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;

		.top {
			display: flex;
			width: 100%;
			align-items: center;

			.top_wx { 
				margin: 0 10px;

				image {
					width: 44px;
					height: 44px;
				}
			}

			.middle {
				.tex1 {
					display: block;
					color: #333333;
					font-weight: 700;
					font-size: 14px;
					line-height: 20px;
				}

				.tex2 {
					font-size: 12px;
					color: #666666;
				}
			}

			.bottom {
				display: flex;
				align-items: center;
				position: absolute;
				right: 6px;

				image {
					width: 30px;
					height: 30px;
				}
			}
		}
	}

	.uploadBack {
		width: 87%;
		min-height: 70px;
		position: relative;
	}

	.upload {
		width: 100%;
		border-radius: 39px;
		overflow-y: auto;
	}

	.addOneFile {
		display: flex;
		align-items: center;
		height: 100%;
	}

	.addOneFile>view {
		display: flex;
		align-items: center;
		height: 100%;
	}

	//收文件发文件
	.fafile {
		width: 100%;
		height: 70px;
		background: #ffffff;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.16);
		border-radius: 39px;
		overflow: hidden;
		box-sizing: border-box;
		padding: 15px;
	}

	.fa_1 {
		height: 100%;
		width: 100%;
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;
	}

	.fa_1_left {
		display: flex;
		height: 100%;
		align-items: center;
		position: absolute;
		left: 0;
		overflow: hidden;
		white-space: nowrap;
		font-family: PingFang SC;
		font-weight: bold;
		font-size: 24px;
		z-index: 99;
		transition: width 0.5s;
		-webkit-transition: width 0.5s;
		background-color: #ffffff;

		image {
			width: 24px;
			height: 24px;
		}
	}

	.fa_1_right {
		display: flex;
		height: 100%;
		align-items: center;
		position: absolute;
		right: 5px;
		overflow: hidden;
		white-space: nowrap;
		font-family: PingFang SC;
		font-weight: bold;
		font-size: 24px;
		z-index: 99;
		transition: width 0.5s;
		-webkit-transition: width 0.5s;
		background-color: #ffffff;

		image {
			width: 24px;
			height: 24px;
		}
	}

	.fafileIcon {
		margin-left: 10px;
		margin-right: 10px;
		//   width:25px;
	}

	.fileline {
		color: #cccc;
		position: absolute;
		left: 50%;
	}

	.fillUpload {
		height: 48px;
		width: 100%;
		background: #fff;
		padding-top: 1px;
		padding-bottom: 5px;
		border: 0;
	}

	.orClass {
		font-size: 24px;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 33px;
		color: #999999;
		margin-left: 10px;
		margin-right: 10px;
		position: absolute;
		z-index: 99;
		left: 40%;
	}

	.fristStateStyle {
		width: 100%;
		height: 70px;
		background: #ffffff;
		box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.16);
		border-radius: 39px;
		overflow: hidden;
		box-sizing: border-box;
		padding: 11px;
	}

	.load_1 {
		height: 100%;
		width: 100%;
		display: flex;
		position: relative;
		justify-content: space-between;
		align-items: center;

		.addIcon {
			margin-left: 15px;
			margin-right: 15px;
		}

		.load_1_left {
			width: 58%;
			display: flex;
			height: 100%;
			align-items: center;
			position: absolute;
			left: 0;
			overflow: hidden;
			white-space: nowrap;
			font-family: PingFang SC;
			font-weight: bold;
			font-size: 24px;
			z-index: 99;
			transition: width 0.5s;
			-webkit-transition: width 0.5s;
			background-color: #ffffff;

			image {
				width: 24px;
				height: 24px;
			}
		}

		// .load_1_left:hover {
		//   width: 100%;
		//   z-index: 999;
		// }

		.load_1_right {
			width: 112px;
			height: 100%;
			position: absolute;
			transition: width 0.5s;
			-webkit-transition: width 0.5s;
			background: #eee;
			box-sizing: border-box;
			border-radius: 39px;
			overflow: hidden;
			display: flex;
			align-items: center;
			border: 4px solid #eee;
			right: 0;
		}

		.load_1_right:hover {
			color: #3679ff !important;
			background-color: #ffffff !important;
			border: 4px solid #3679ff !important;
			z-index: 999;
		}

		.load_1_right_btn {
			width: 112px;
			height: 100%;
			background: #eee;
			opacity: 1;
			border-radius: 41px;
			font-size: 18px;
			display: flex;
			font-weight: bold;
			color: #333333;
			justify-content: center;
			align-items: center;
			z-index: 9;
		}

		.load_1_right_btn:hover {
			color: #3679ff;
			background-color: #ffffff;
		}

		.load_1_right_Input {
			width: 100%;
			height: 100%;
			background: transparent;
			box-sizing: border-box;
			border-radius: 39px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;

			image {
				width: 24px;
				height: 24px;
			}
		}

		.load_1_right_Input>input {
			width: 70%;
			height: 100%;
			display: flex;
			align-items: center;
			border: 0;
			font-size: 18px;
			margin-left: 20px;
		}
	}

	.upClass {
		width: 100% !important;
		z-index: 999;
		right: 0;
		height: 100%;
		background: #ffffff;
		box-sizing: border-box;
		border-radius: 39px;
	}

	.closeBtn {
		width: 30px;
		height: 30px;
		margin-right: 10px;
	}

	.uni-file-picker__lists {
		display: none !important;
	}
	::v-deep .van-action-sheet__description+view {
		margin-bottom: 50px;
	}
</style>

<style lang="scss">
	.container {
		.is-text-box {
			display: none;
		}
	}
</style>
