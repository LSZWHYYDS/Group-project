<template>
	<view>
		<view>
			<uni-popup ref="sharePop" type="bottom" :mask-click="false" :safe-area="false" @close="closeShare">
				<view class="uniPop" style="padding-top:0">
					<view class="delTitle">
						<text class="title">分享设置</text>
						<image @click="closeShare" src="@/static/close.svg" mode=""></image>
					</view>
					<view class="shareSet">
						<view class="fileDes">
							<text>文件主题</text>
							<text>20字</text>
						</view>
						<textarea @blur="bindTextAreaBlur" maxlength="20" placeholder-style="font-size: 26rpx;color: #999999;font-weight: 400;" placeholder="给分享文件起个名字咯~" style="height:120rpx;" />
						<view class="fileDes">
							<text>文件说明</text>
							<text>100字</text>
						</view>
						<textarea v-model="button_5" @blur="bindTextAreaBlur" maxlength="100" placeholder-style="font-size: 26rpx;color: #999999;font-weight: 400;" placeholder="传输文件描述（选填）..." style="height:200rpx;" />
					</view>
					<view class="listSelect">
						<view class="">
							<view class="titleStl" v-if="button_2 == 0">
								<text class="selTittle">加密分享</text>
							</view>
							<view class="titleStl" v-else>
								<text class="selTittle">加密分享</text>
								<view class="pwdInput">
									<input class="passInput" maxlength="12" :type="passwordShow ? 'text' : 'password'" v-model="button_3">
								</view>
								<image v-if="passwordShow" @click="passwordShow = false" src="@/static/lookPass.svg" mode=""></image>
								<image v-else @click="passwordShow = true" src="@/static/closePass.svg" mode=""></image>
							</view>
						</view>
						<view class="switchSel">
							<switch :checked="button_2 == 1" color="#0092FF" style="transform:scale(0.7)" @change="switch2Change" />
						</view>
					</view>
					<view class="listSelect">
						<view class="titleStl">
							<text class="selTittle">限制下载次数</text>
						</view>
						<view class="switchSel" style="margin-right:25rpx">
							<uni-number-box :min="1" :max="999"  v-model="downNumber" />
						</view>
					</view>
					<view class="listSelect">
						<view class="titleStl">
							<text class="selTittle">链接有效期时间/天</text>
						</view>
						<view class="switchSel" style="margin-right:25rpx">
							 <!-- background="#0092FF" color="#fff" 按钮背景色 -->
							<uni-number-box :min="1" :max="9999" v-model="downDay" />
						</view>
					</view>
					<view class="listSelect">
						<view class="titleStl">
							<text class="selTittle">允许对方预览</text>
						</view>
						<view class="switchSel">
							<switch :checked="button_4 == 1" color="#0092FF" style="transform:scale(0.7)" @change="switch4Change" />
						</view>
					</view>
					<view class="listSelect" style="border-bottom: 2rpx solid #f4f4f4;">
						<view class="titleStl">
							<text class="selTittle" style="margin-right:10rpx;">提供下载流量</text>
							<uni-tooltip content="对方下载时使用您的流量" style="width:400rpx;">
							  <image src="@/static/question.svg" style="margin-top: 10rpx;" mode=""></image>
							</uni-tooltip>
						</view>
						<view class="switchSel">
							<switch :checked="button_1 == 0" color="#0092FF" style="transform:scale(0.7)" @change="switch1Change" />
						</view>
					</view>
					<view class="crtShare" @click="multiplcShareFunc(1)">
						创建分享
					</view>
				</view>
			</uni-popup>
		</view>
    <createShare ref="createShareRef" :shareLink="shareUrl" v-if="shareUrl" />
	</view>
</template>

<script>
	import { urlOSS } from '@/utils/base.js'
  import createShare from '@/components/create-share.vue'
	import {
		bytesToSize,
		getSuffix,
		isImage,
		isVideo,
		isEmall,
		Debounce,
	} from '@/utils/index.js'
	import {
		rename,
		verifyExist,
		batchDelete,
		sendEmailAndSMS,
		everBoxShare
	} from '@/utils/api.js' //具体根据你项目的路径修改
	export default {
		data() {
			return {
				showPage:true,
				// showRename:false,//显示重命名
				// showDel: false,//显示删除
				resetName:'',
				listItem:{
					name:'',
					size:'',
					fileClass:''
				},//单个点击数据
				selectItemsAry:[],
				button_2:0,
				button_3:'',//密码
				passwordShow: false, //密码显示切换，显示/隐藏
				button_5:'',//文件说明
				downNumber:10,//下载次数
				downDay: 1, //剩余分享时间,默认1天
				button_4: 0, //是否能够预览
				button_1: 0, //分享流量
				fileListAllNum:0,
				code:"",
				overTime:'',
				shareUrl: "",
				superFolder:0,
			}
		},
		components: {
      createShare
		},
		methods: {
			async multiplcShareFunc(val){
				if(this.selectItemsAry.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择文件"
					})
					return
				}
				let data = {};
				let fileIdList = [];
				let folderIdList = [];
				let fileNum = this.selectItemsAry.length;
				if (fileNum == 0) return;
				let filesize = 0;
				let isShow = false;
				this.selectItemsAry.forEach((item) => {
					if (item.moveType == "2") {
					  //文件夹
					  filesize += item.folderSize * 1;
					  folderIdList.push(item.folderId);
					} else {
					  //文件
					  filesize += item.fileSize * 1;
					  fileIdList.push(item.fileId);
					}
					if(item.folderName) {
					  if(item.filesNum == 0) {
						isShow = true
						return;
					  }
					}
				});
			   //参数注入
				// this.allSize = filesize + "";
				data.filesSize = filesize;
				  //判断空文件夹阻断，不允许分享空文件夹
				  if (filesize == 0  || isShow==true) {
					uni.showToast({
						icon: "none",
						title: "空文件不能分享"
					})
					return;
				  }
				  //新增参数(下载次数/有效期/是否设置密码/密码/是否允许预览/提供下载流量/文件描述)
				  data.downloadLimit = this.downNumber;
				  data.downDay = this.downDay;
				  data.openPass = this.button_2;
				  data.pass = this.button_3;
				  data.enablePreview = this.button_4;
				  data.shareFlow = this.button_1;
				  data.description = this.button_5;
					let transfersVO = data;
				  const ever = await everBoxShare({
					transfersVO,
					fileIdList,
					folderIdList,
					superFolder: 0,
				  });
				if (ever.data.code == 1) {
					uni.showToast({icon: "none",title: res.data.msg})
					return;
				}
				this.fileListAllNum = ever.data.data.filesNum
				this.code = ever.data.data.pickupCode;
				const transferGuid = ever.data.data.transferGuid; //设置不能被修改的常量transferGuid(文件id)
				this.overTime = ever.data.data.validDate; //分享结束时间
				this.shareUrl = urlOSS + ever.data.data.link; //拼接分享链接
				await sendEmailAndSMS(transferGuid); //上传完成发送邮件或者手机号通知
				  if(val == 1){
					// this.show = false;
					// if(this.selectItemsAry[0].folderName) {
					//   this.listName = this.selectItemsAry[0].folderName;
					// }else{
					//   this.listName = this.selectItemsAry[0].fileName;
					// }

					// this.showCopy = true;
					this.$refs.sharePop.close();
               this.$refs.createShareRef.open();
				  }
				  return
			},
			changeBtn(){
				if(!this.button_5){
					this.button_5 = '传输文件描述（选填）...'
					let timeId=setTimeout(()=>{
						this.button_5='';
						clearTimeout(timeId);
					},50);
				}
			},
			switch2Change(e){
				let check = e.target.value
				if(check) {
					this.button_2 = 1
				}else{
					this.button_2 = 0
				}
				console.log(this.button_2)
			},
			switch1Change(e){
				let check = e.target.value
				if(check) {
					this.button_1 = 0
				}else{
					this.button_1 = 1
				}
				console.log(this.button_1)
			},
			switch4Change(e){
				let check = e.target.value
				if(check) {
					this.button_4 = 1
				}else{
					this.button_4 = 0
				}
				console.log(this.button_4)
			},
			bindTextAreaBlur(val){
				console.log(val)
				console.log(this.button_5)
			},
			resetDate(){
				this.button_5 = '';
				this.button_2 = 0;
				this.passwordShow = false;
				this.downNumber = 10;
				this.downDay = 1;
				this.button_4 = 0;
				this.button_1 = 0;
			},
			closeShare(){
				this.resetDate()
				this.$refs.sharePop.close();
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common.css");
	.delTitle {
		text-align: center;
		height: 100rpx;
		position: relative;
		line-height: 100rpx;
		border-bottom: 2rpx solid #eeeeee;
		color: #666666;
		font-weight: 400;
		font-size: 32rpx;
		image {
			width: 60rpx;
			height: 60rpx;
			position: absolute;
			right: 10rpx;
			top: 20rpx;
		}
	}
	.shareSet {
		padding: 24rpx 0 24rpx 20rpx;
		.fileDes {
			display: flex;
			justify-content: space-between;
			margin-right: 20rpx;
			color: #999999;
			font-weight: 400;
			font-size: 26rpx;
			margin-bottom: 10rpx;
		}
		textarea{
			background: #F4F7FA;
			border-radius: 20rpx;
			width: 100%;
			font-weight: 400;
			font-size: 26rpx;
			line-height: 36rpx;
			color: #999999;
			padding: 20rpx;
			box-sizing: border-box;
			margin-bottom: 20rpx;
		}
	}
	.listSelect {
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 5rpx 24rpx 20rpx;
		border-top: 1px solid #f4f4f4;
		height: 52rpx;
		.titleStl {
			display: flex;
			height: 100%;
			align-items: center;
			.selTittle {
				color: #333333;
				font-weight: 400;
				font-size: 26rpx;
			}
			.pwdInput {
				margin-left: 150rpx;
				input {
					height: 64rpx;
					width: 286rpx;
					background: #F4F7FA;
					border-radius: 12rpx;
					color: #999999;
					font-weight: 400;
					font-size: 24rpx;
					padding-left: 15rpx;
					box-sizing: border-box;
				}
			}
			image {
				width: 40rpx;
				height: 40rpx;
			}
		}
	}
	.crtShare {
		background: #3679FF;
		border-radius: 20rpx;
		width: 520rpx;
		height: 88rpx;
		color: #fff;
		font-weight: 400;
		font-size: 28rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 48rpx auto;
		margin-bottom: 20rpx;
	}
	.toDel {
		color: #666666;
		text-align: center;
		padding: 70rpx 0;
		font-size: 28rpx;
	}
	.uni-tooltip {
		width: 400rpx;
	}
</style>
