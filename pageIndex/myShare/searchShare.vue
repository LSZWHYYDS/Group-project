<template>
	<view class="searchCloud">
		<view class="title" style="width: 100vw;">
			<uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @input="input">
			</uni-search-bar>
			<text style="color: #717E98;font-size: 24rpx;font-weight: 400;margin-left:30rpx">搜索结果</text>
			<view class="breadCrum"  v-if="searchFloList.length+searchFileList.length > 0 || breadCrumList.length>0" >
				<text style="color:#333333" @click="searchChange()">全部 </text>
				<template v-for="(item, index) of breadCrumList" :key="index">
					<view class="" style="color:#717E98;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="breadFunc(item, index)">
						> {{ item.folderName }}
					</view>
				</template>
			</view>
		</view>
		<view class="fileListBox">
			<view>
				<view class="fileItems" v-for="(item, index) of searchFloList" :key = index>
					<image @click="goFolder(item)" class="typeImg" src="@/static/type_1.svg" mode=""></image>
					<view @click="goFolder(item)" class="msg_box">
						<text class="text_name">{{ item.folderName }}</text>
						<text class="text_date">{{ dateFormate(item.createDate) }} | {{ byTes(item.folderSize) }}</text>
					</view>
					<view class="moreBox" @click="getDetail(item)">
						<image src="@/static/ellipsis.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view>
				<view class="fileItems" v-for="(item, index) of searchFileList" :key = index>
					<image v-if="item.fileClass == 'image'" class="typeImg" src="@/static/type_3.svg" mode=""></image>
					<image v-if="item.fileClass == 'video'" class="typeImg" src="@/static/type_2.svg" mode=""></image>
					<image v-if="item.fileClass == 'file'" class="typeImg" src="@/static/type_4.svg" mode=""></image>
					<view class="msg_box">
						<text class="text_name">{{ item.fileName }}</text>
						<text class="text_date">{{ dateFormate(item.createDate) }} | {{ byTes(item.fileSize) }}</text>
					</view>
					<view class="moreBox" @click="getDetail(item)">
						<image src="@/static/ellipsis.svg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="wenxin">
				<text>就这么多，没有啦~</text>
			</view>
		</view>
		<indexPop ref="indexPop" @getCreateData="searchChange()"></indexPop>
	</view>
</template>

<script>
	import indexPop from "@/pageIndex/components/indexPop.vue";
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
		mailLogin,
		createTransfer,
		getOssToken,
		getEverBoXFiles,
		getEverboxList,
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
	export default {
		data() {
			return {
				searchValue: '',
				renameVal:'23334',
				searchFileList:[],
				searchFloList:[],
				folderId:0,
				breadCrumList:[],
				selectArray: [],
				selectItemsAry: [],
			}
		},
		components: {
			indexPop
		},
		onLoad(option) {
			// _self = this;
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
			...mapMutations(["SET_FILELIST"]),
			...mapActions(["REQUEST_FLOW"]),
			byTes(value) {
			  if (value <= 0 ) {
			    return "0B"; //Bytes
			  }
			  return bytesToSize(value);
			},
			getDetail(item){ //点击按钮显示pop
				let superFolder = 0;
				  if (this.breadCrumList.length !== 0) {
					superFolder = this.breadCrumList[this.breadCrumList.length - 1].folderId;
				  }
				  this.superFolder = superFolder
				console.log(item)
				this.$refs.indexPop.showPage = true;
				this.$refs.indexPop.$refs.midPop.showPop()
				this.$refs.indexPop.$refs.midPop.isShow = true;
				let listItem = item;
				if(item.moveType == 2) {
					listItem.fileClass = 'floder'
				}else{
					let fileType = getSuffix(item.fileName);
					if (isImage(fileType)) {
						item.fileClass = "image";
					} else if (isVideo(fileType)) {
						item.fileClass = "video";
					} else {
						item.fileClass = "file";
					}
				}
				if(item.fileSize) {
					listItem.size = item.fileSize
				}else{
					listItem.size = item.folderSize
				}
				if(item.fileName) {
					listItem.name = item.fileName
				}else{
					listItem.name = item.folderName
				}
				this.$refs.indexPop.listItem = listItem;
			},
			maskClose(){ //点券遮罩层关闭事件
			},
			goFolder(item) {
				this.folderId = item.folderId;
				this.breadCrumList.push(item);
				  getEverboxList({
					superFolder: item.folderId,
					pageNum: this.pageNum,
					defaultSort: true,
					timeSort: false,
					pageSize: 1000,
				  }).then((res) => {
					if (res.data.code == 0) {
					  this.openNewListData(res);
					  this.selectArray = [];
					  // this.checked = false;
					}
				  });
			},
			breadFunc(item, index) {
				this.selectArray = []
				console.log(this.selectArray)
				if (item == 0) {
					this.breadCrumList = [];
					this.folderId = 0;
					this.createData();
					return;
				}
				this.breadCrumList.splice(index + 1, this.breadCrumList.length);
				this.folderId = item.folderId;
				this.createData();
			},
			//初始化数据
			async createData() {
				let folderId = this.folderId;
				getEverboxList({
					superFolder: folderId,
					pageNum: this.pageNum,
					pageSize: 1000,
					defaultSort: this.defaultSort, //默认时间排序 true
					timeSort: this.timeSort, //时间排序
					sizeSort: this.sizeSort, //文件或文件夹大小排序
				}).then((res) => {
					if (res.data.code == 401) {
						return;
					}
					this.openNewListData(res);
				});
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
			renameClick(){
				this.$refs.midPop.close();
				this.$refs.reNamePop.open();
			},
			delClick(){
				this.$refs.midPop.close();
				this.$refs.delPop.open();
			},
			search(res) {
				uni.showToast({
					title: '搜索：' + res.value,
					icon: 'none'
				})
			},
			searchChange(){
				this.breadCrumList = [];
				if(this.searchValue == '') {
					this.searchFileList=[];
					this.searchFloList=[];
					return
				}
			  getEverBoXFiles(this.searchValue).then((res) => {
				  console.log(res)
				if (res.data.code == 200) {
				  let data = res.data.data;
				  if(data.filesList.length == 0 && data.foldersList.length == 0) {
					  uni.showToast({
					  	icon: "none",
					  	title: '暂无数据'
					  })
					return
				  }
				  // this.breadCrumList=[];
				  this.searchFileList=data.filesList;
				  this.searchFloList=data.foldersList;
				  this.openNewListData(res);
				}else{
					uni.showToast({
						icon: "none",
						title: '暂未查询到该文件'
					})
				}
			  });
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
			openNewListData(res){
				this.timeDate = []; //每次时间填充时，先清空已存在的时间集合
				let flodersList = res.data.data.foldersList;
				flodersList.forEach((item) => {
					item.showSearch=true
					item.select = false;
					item.moveType = "2";
					item.utilsType = false;

					let day11 = this.$options.filters['timedown'](item.createDate);
					let daynum = this.$options.filters['timedownnum'](item.createDate);

					if (daynum == true) {
						let timeHH = this.$options.filters['timedownshow'](item.createDate); //小时
						let timeMM = this.$options.filters['timedownshowmm'](item.createDate); //分钟
						this.timeDate.push("今天  " + timeHH + ":" + timeMM);
					} else if (day11 <= 2 && daynum == false) {
						let timeHH = this.$options.filters['timedownshow'](item.createDate);
						let timeMM = this.$options.filters['timedownshowmm'](item.createDate);
						this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
					} else {
						this.timeDate.push(item.createDate);
					}

				});

				let fileList = res.data.data.filesList;
				fileList.forEach((item) => {
					item.showSearch=true
					item.select = false;
					item.moveType = "1";
					item.utilsType = false;
					let fileType = getSuffix(item.fileName);
					let day11 = this.$options.filters['timedown'](item.createDate);

					let daynum = this.$options.filters['timedownnum'](item.createDate);

					if (daynum == true) {
						let timeHH = this.$options.filters['timedownshow'](item.createDate); //小时
						let timeMM = this.$options.filters['timedownshowmm'](item.createDate); //分钟
						this.timeDate.push("今天  " + timeHH + ":" + timeMM);
					} else if (day11 <= 2 && daynum == false) {
						let timeHH = this.$options.filters['timedownshow'](item.createDate);
						let timeMM = this.$options.filters['timedownshowmm'](item.createDate);
						this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
					} else {
						this.timeDate.push(item.createDate);
					}
					if (isImage(fileType)) {
						item.fileClass = "image";
					} else if (isVideo(fileType)) {
						item.fileClass = "video";
					} else {
						item.fileClass = "file";
					}
				});
				this.searchFloList = [];
				this.searchFloList = this.searchFloList.concat(flodersList);
				this.searchFileList = [];
				this.searchFileList = this.searchFileList.concat(fileList);
				console.log(this.searchFileList)
				console.log(this.searchFloList)
			},
			input(res) {
				this.searchValue = res;
				console.log('----input:', res)
				this.searchChange()
			},
			qhdwd() {
				this.select_3 = false;
				this.timeshow = true;
				this.downDay = "1";
				this.downDayshow = "1天";
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
		mounted(){
		},
	}

</script>

<style lang="scss" scoped>
	@import url("@/common/common.css");
	.searchCloud {
		width: 100%;
		height: 100vh;
		justify-content: center;
		background-color: #fff;
	}
	.fileListBox {
		height: calc(100% - 260rpx);
		overflow-y: auto;
		width: 100%;
		margin-bottom: 40rpx;
		.fileItems {
			padding: 20rpx 40rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			height: 120rpx;
			width: 100%;
			.typeImg {
				width: 80rpx;
				height: 80rpx;
			}
			.msg_box {
				width: 520rpx;
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center!important;
				padding-left: 20rpx;
				box-sizing: border-box;
				.text_name {
					font-weight: 700;
					color: #333;
					margin-bottom: 6rpx;
					width: 100%;
					font-size: 28rpx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
				.text_date {
					font-size: 24rpx;
					color: #999;
				}
			}
			.moreBox {
				display: flex;
				align-items: center;
				height: 100%;
				image {
					width: 60rpx;
					height: 60rpx;
				}
			}
		}
		.wenxin {
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 40rpx;
			font-weight: 400;
			color: #999999;
			font-size: 24rpx;
		}
	}
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
	.toDel {
		color: #666666;
		text-align: center;
		padding: 70rpx 0;
		font-size: 28rpx;
	}
	.breadCrum {
		display: flex;
		font-weight: 400;
		font-size: 24rpx;
		height: 80rpx;
		align-items: center;
		line-height: 34rpx;
		color: #333333;
		background: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 0 40rpx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
<style lang="scss">
	// .searchCloud {
	// 	.is-text-box {
	// 		display: none;
	// 	}
	// }
</style>
