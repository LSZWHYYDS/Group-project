<template>
	<view class="">
		<view class="uni-tabbar">
			<view class="uni-tabbar__item" v-for="(item,index) in tabbar" :key="index" @tap="changeTab(item)">
				<view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
					<image v-if = "item.pagePath == pagePath && pagePath == '/pageIndex/index/index' && item.text !== 'add'" src="@/static/fileBlue.svg" style="width:52rpx;height:52rpx"  mode=""></image>
					<image v-else-if = "item.pagePath == pagePath && pagePath == '/pageMy/my/my' && item.text !== 'add'" src="@/static/iconBlue.svg" style="width:52rpx;height:52rpx"  mode=""></image>
					<template v-else class="">
						<view class="addClass" v-if = "item.text == 'add'">
							<image  src="@/static/addFile.svg" style="width:52rpx;height:52rpx;margin-top:14rpx;"  mode=""></image>
						</view>
						<p v-else>{{item.text}}</p>
					</template>
				</view>
			</view>

		</view>
		<view v-show="showPage">
			<filePop ref='midPop'>
				<view class="addFiles">
					<view class="titleFile">
						<!-- <uni-file-picker v-model="uploadList" file-mediatype="all"  @select="uploadSelect($event)"> -->
							<view class="titleStl">
								<image class="wh30" src="@/static/sendFile.svg" mode=""></image>
									<text class="mtop5">发文件</text>
							</view>
						<!-- </uni-file-picker> -->
						<view class="titleStl">
							<image class="wh30" src="@/static/collectFile.svg" mode=""></image>
							<text class="mtop5">收文件</text>
						</view>
					</view>
					<view class="picCodeStl" @click="getCode">
						<image class="wh24 mr5" src="@/static/key.svg" mode=""></image>
						<text>取件码</text>
					</view>
					<view class="wxStl">
						<image class="wh24 mr5" src="@/static/wx.svg" mode=""></image>
						<text>从微信上传</text>
					</view>
					<view class="closeStl"  @click="closePop">
						<image src="@/static/closeRed.svg" mode=""></image>
					</view>	
				</view>
			</filePop>
		</view>
	</view>

</template>

<script>
	import filePop from "@/pages/filePop/filePop.vue";
	export default {
		props: {
			pagePath: {
				type: String,
				default: '/pageIndex/index/index'
			}
		},
		data() {
			return {
				showPage: false,
				containerHeight: 400,
				tabbar: [{
						"pagePath": "/pageIndex/index/index",
						"text": "文件",
					},
					{
						// "pagePath": "/pageCloud/cloud/cloud",
						"text": "add",
					},
					{
						"pagePath": "/pageMy/my/my",
						"text": "我的",
					},
				],
				uploadList:[],
			imageStyles:{
					"height": 0,	// 边框高度
					"width": 0,	// 边框宽度
			}
			};

		},
		components: {
			filePop
		},
		mounted() {

		},
		methods: {
			sentFile(){
				uni.chooseMessageFile({
					count: 6, //默认100
					extension:['.zip','.doc'],
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				})
			},
			getCode(){
				console.log(111)
			},
			uploadSelect(e, type) {
				console.log(e)
				return
				// uni.navigateTo({
				// 	url: "/pageUpload/upload/upload?list=" + JSON.stringify(e.tempFiles)
				// })
				console.log(990)
				uni.navigateTo({
					url: "/pageUpload/upload/upload?list=" + JSON.stringify(e.tempFiles)
				})
				// this.load_2_show = 2;
				// this.fileFunc(e)
			},
			changeTab(item) {
				console.log(item.pagePath)
				console.log(this.pagePath)
				console.log(111)
				if(item.pagePath) {
					this.$emit("pagePath", JSON.stringify(item.pagePath))
					uni.reLaunch({
						url: item.pagePath,
						animationType:'none'
					});
				}else{
					this.showPage = true
					this.$refs.midPop.showPop()
				}
			},
			closePop(){
				this.showPage = false
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common.css");
	.addFiles {
		// padding: 40rpx;
		padding: 40rpx 20rpx;
		.titleFile {
			height: 192rpx;
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			.titleStl {
				width: 320rpx;
				height: 192rpx;
				background: #3679FF;
				border-radius: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				color: #FFFFFF;
				font-weight: 400;
				font-size: 12px;
			}
		}
		.picCodeStl {
			width: 668rpx;
			height: 100rpx;
			background: #D7E4FF;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #3679FF;
			font-weight: 400;
			font-size: 28rpx;
			margin: 40rpx 0 30rpx 0;
		}
		.wxStl {
			width: 668rpx;
			height: 100rpx;
			border-radius: 20rpx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			color: #333333;
			font-weight: 400;
			font-size: 28rpx;
			background: #D4F2E2;
		}
		.closeStl {
			margin: 50rpx auto;
			width: 108rpx;
			height: 82rpx;
		}
	}
	.uni-tabbar {
		position: fixed;
		bottom: 0;
		z-index: 9;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: flex-start;
        height: 168rpx;
		
		box-sizing: border-box;
		background-color: #fff;
		left: 0;
		right: 0;
		width: 100%;
	}

	.uni-tabbar__item {
		font-size: 24rpx;
		height: 100rpx;
		text-align: center;
		display: flex;
		justify-content: flex-start;
		align-items:center ;
		box-sizing: border-box;
		flex-direction: column;
	}


	.icon {
		display: inline-block;
	}

	.uni-tabbar__label {
		border-radius: 132rpx;
		width: 108rpx;
		height: 60rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-weight: 400;
		font-size: 32rpx;
		margin-top: 20rpx;
		color: #666666;
		// border: 2rpx solid #9E9E9E;
		font-family: 'PingFang SC';
		font-style: normal;
		.addClass {
			height: 84rpx;
			width: 108rpx;
			background: #3679FF;
			border-radius: 44rpx;
		}
	}

	.active {
		background: rgba(54, 121, 255, 0.2);
		border-radius: 132rpx;
	}
</style>
