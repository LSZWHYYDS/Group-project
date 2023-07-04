<template>
	<view>
		<view v-if="showPage">
			<filePop ref='midPop' @maskClose="maskClose" @close="closePop">
				<view class="cloudPop">
					<view class="top">
						<image v-if="listItem.fileClass == 'image'" class="typeImg" src="@/static/type_3.svg" style="width:80rpx;height:80rpx;" mode=""></image>
						<image v-if="listItem.fileClass == 'video'" class="typeImg" src="@/static/type_2.svg" style="width:80rpx;height:80rpx;" mode=""></image>
						<image v-if="listItem.fileClass == 'file'" class="typeImg" src="@/static/type_4.svg" style="width:80rpx;height:80rpx;" mode=""></image>
						<image v-if="listItem.fileClass == 'floder'" class="typeImg" src="@/static/type_1.svg" style="width:80rpx;height:80rpx;" mode=""></image>
						<view class="msg_box">
							<text class="text1 me-text-beyond-multi">{{ listItem.name }}</text>
							<text class="text2">{{ dateFormate(listItem.createDate) }} | {{ byTes(listItem.size) }}</text>
						</view>
						<view class="closeIcon" @click="closePop">
							<image src="@/static/close.svg" mode=""></image>
						</view>
					</view>
					<view class="downCss pop-button mtop20">
						下载文件
					</view>
					<view class="renameCss pop-button mtop15" @click="renameClick">
						重命名
					</view>
					<view class="shareCss pop-button mtop15"  @click="shareClick">
						分享
					</view>
					<view class="deleteCss pop-button-del mtop15" @click="delClick">
						删除
					</view>
				</view>
			</filePop>
		</view>
		<view>
			<uni-popup ref="reNamePop" type="bottom" :safe-area="false" @close="closeRename">
				<view class="uniPop">
					<view class="renameTitle">
						<image @click="closeRename" src="@/static/close.svg" mode=""></image>
						<text class="title">重命名</text>
						<view class="sure" @click="confirmName">
							确定
						</view>
					</view>
					<view class="renameText">
						<input v-model="resetName" class="uni-input"  placeholder="请输入名称" />
					</view>
				</view>
			</uni-popup>
		</view>
		<view>
			<uni-popup ref="delPop" type="bottom" :safe-area="false" @close="closeDel">
				<view class="uniPop" style="padding-top:0">
					<view class="delTitle">
						<text class="title">提示</text>
						<image @click="closeDel" src="@/static/close.svg" mode=""></image>
					</view>
					<view class="toDel">
						删除文件至回收站
					</view>
					<view class="deleteCss pop-button-del" @click="deleteAry()">
						确认删除
					</view>
					<view class="renameCss pop-button mtop15" @click="closeDel">
						取消
					</view>
				</view>
			</uni-popup>
		</view>
		<shareSetting ref="shareSett"></shareSetting>
	</view>
</template>

<script>
	import filePop from "@/pages/filePop/filePop.vue";
	import shareSetting from "@/pageIndex/components/shareSetting.vue";
	import {
		bytesToSize,
		getSuffix,
		isImage,
		isVideo,
		isEmall,
		Debounce,
		timedown,
		timedownshow,
		timedownshowmm,
		timedownnum
	} from '@/utils/index.js'
	import {
		rename,
		verifyExist,
		batchDelete
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
			}
		},
		components: {
			filePop,
			shareSetting
		},
		filters: {
			timedown(value) {
				return timedown(value);
			},
			timedownshow(value) {
				return timedownshow(value);
			},
			timedownshowmm(value) {
				return timedownshowmm(value);
			},
			timedownnum(value) {
				return timedownnum(value);
			},
		},
		methods: {
			multiplcShareFunc(){
				console.log('selectItemsAry')
				console.log(this.listItem)
				console.log('button_5')
				console.log(this.button_5)
				console.log('button_2')
				console.log(this.button_2)
				console.log('button_3')
				console.log(this.button_3)
				console.log('下载次数')
				console.log(this.downNumber)
				console.log('时间')
				console.log(this.downDay)
				console.log('button_4')
				console.log(this.button_4)
				console.log('button_1')
				console.log(this.button_1)
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
					this.button_1 = 1
				}else{
					this.button_1 = 0
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
			maskClose(){
				// this.$emit('maskClose')
			},
			closePop(){
				this.$refs.midPop.close();
			},
			closeRename(){
				this.$refs.reNamePop.close();
			},
			closeDel(){
				this.$refs.delPop.close();
			},
			closeShare(){
				this.$refs.sharePop.close();
			},
			renameClick(){
				this.$refs.midPop.close();
				this.$refs.reNamePop.open();
			},
			shareClick(){
				this.$refs.midPop.close();
				// this.$refs.sharePop.open();
				this.$refs.shareSett.changeBtn();
				this.$refs.shareSett.selectItemsAry.push(this.listItem);
				this.$refs.shareSett.$refs.sharePop.open();
			},
			delClick(){
				this.$refs.midPop.close();
				this.$refs.delPop.open();
			},
			async deleteAry(){
				uni.showLoading({title: '删除中'});
				let ary = [];
				this.selectItemsAry.push(this.listItem)
				this.selectItemsAry.forEach((item) => {
					let obj = {};
					if (item.moveType == "1") {
					  obj.deleteID = item.fileId;
					} else {
					  obj.deleteID = item.folderId;
					}
					obj.deleteType = item.moveType;
					ary.push(obj);
				});
				const res = await batchDelete(ary);
				if (res.data.code !== 0) {
					uni.showToast({
						icon: "none",
						title: res.data.msg
					})
					return;
				} else {
					uni.hideLoading()
					uni.showToast({
						icon: "none",
						title: res.data.msg
					})
					this.$emit('getCreateData')
					this.closeDel();//关闭弹窗
					// this.createData();
				}
			},
			async confirmName(){
				if(this.resetName == '') {
					uni.showToast({
						icon: "none",
						title: '请输入文件名！'
					})
					return
				}
				let params = this.listItem; //无值
				let res = await verifyExist(params.superFolder, this.resetName);
				console.log(this.resetName)
				  if (res.data.code == 1) {
					uni.showToast({
						icon: "none",
						title: res.data.msg
					})
					return;
				  }else{
					let o = {};
					if (params.moveType == "2") {
						//文件夹
						o.renameID = params.folderId;
						o.renameType = params.moveType;
					} else {
						o.renameID = params.fileId;
						o.renameType = params.moveType;
					}
					o.renameName = this.resetName;
					rename(o).then((res) => {
						if (res.data.code == "0") {
						  this.dialogTableVisible = false;
						  uni.showToast({
						  	icon: "none",
						  	title: res.data.msg
						  })
						  this.resetName = "";
						  this.resetNameShow = false;
						  // this.createData();
						  this.$emit('getCreateData')
						  this.closeRename();//关闭弹窗
						} else {
						  uni.showToast({
						  	icon: "none",
						  	title: res.data.msg
						  })
						}
					});
				  }
			},
			// 处理日期
			dateFormate(val) {
				let day11 = this.$options.filters["timedown"](val);
				let daynum = this.$options.filters["timedownnum"](val);
				// console.log(day11);
				// console.log(item.createDate);
				if (daynum == true) {
					let timeHH = this.$options.filters["timedownshow"](val); //小时
					let timeMM = this.$options.filters["timedownshowmm"](val); //分钟
					return "今天  " + timeHH + ":" + timeMM;
				} else if (day11 <= 2 && daynum == false) {
					let timeHH = this.$options.filters["timedownshow"](val);
					let timeMM = this.$options.filters["timedownshowmm"](val);
					return "昨天  " + timeHH + ":" + timeMM;
				} else {
					return val;
				}
			},
			byTes(value) {
			  // console.log(value)
			  if (value <= 0 ) {
			    return "0B"; //Bytes
			  }
			  return bytesToSize(value);
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common.css");
	//弹出框样色
	.cloudPop {
		height: 702rpx;
		width:100%;
		.top {
			padding: 10rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			max-height: 140rpx;
			width: 100%;
			border-bottom: 2rpx solid #e8e6e6;
			.msg_box {
				width: 520rpx;
				height: 100%;
				// display: flex;
				// flex-direction: column;
				// justify-content: center !important;
				padding-left: 20rpx;
				box-sizing: border-box;
				margin-bottom: 20rpx;
				.text1 {
					font-weight: 700;
					color: #333;
					margin-bottom: 6rpx;
					width: 100%;
					font-size: 28rpx;
				}
				.text2 {
					font-size: 24rpx;
					color: #999;
				}
			}
			.closeIcon {
				position: fixed;
				right: 20rpx;
				top: 20rpx;
				image {
					width:60rpx;
					height:60rpx;
				}
			}
		}
	}
	.renameTitle {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		border-bottom: 2rpx solid #eeeeee;
		padding-bottom: 20rpx;
		image {
			width: 60rpx;
			height: 60rpx;
		}
		.title {
			color: #666666;
			font-weight: 400;
			font-size: 32rpx;
		}
		.sure {
			width: 114rpx;
			height: 64rpx;
			border: 2rpx solid #3679FF;
			border-radius: 12rpx;
			color: #3679FF;
			font-weight: 400;
			font-size: 24rpx;
			text-align: center;
			line-height: 64rpx;
		}
	}
	.renameText {
		width: 670rpx;
		height: 100rpx;
		background: #F3F4F5;
		border-radius: 20rpx;
		padding: 10rpx;
		box-sizing: border-box;
		margin: 60rpx auto;
		font-weight: 400;
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		text-indent: 20rpx;
		input {
			margin-top: 10rpx;
			padding-left: 20rpx;
		}
	}
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
