<template>
	<view class="container" @click="bodyCloseSelected">
		<view class="index-title" v-if="!isSelectAll && isShowTitle">
			<text @click="titleChange(0)" :class="{ active:0===number}">我的分享</text>
			<text @click="titleChange(1)" :class="{ active:1===number}">我的云盘</text>
			<text @click="titleChange(2)" :class="{ active:2===number}">我的收集</text>
		</view>
		<view>
			<view class="myShare" v-show="0===number">
				<share ref="shareRef"></share>
			</view>
			<view class="myCloud" v-show="1===number">
				<view class="cloud_top" v-if="!isSelectAll" :class="{padTopTitle:isShowTitle == false}">
					<view class="search" @click="searchClick">
						<image src="../img/searchSl.svg"></image>
						<text>搜索文件</text>
					</view>
					<view class="btn">
						<image @click="showSort" src="../img/sort.svg" style="margin-left: 20rpx;"></image>
						<image @click="selectAll" src="../img/check.svg"></image>
					</view>
				</view>
				<view class="select_top" v-else>
					<image src="@/static/close.svg" @click="closeSelect"></image>
					<text v-if="quanxuan" @click="allSelectFunc">全选</text>
					<text v-else @click="cancelAllSelectFunc">取消全选</text>
				</view>
				<view v-if="isShowTitle == false" class="breadCrum">
					<text @click="breadFunc(0)">全部</text>
					<template v-for="(item, index) of breadCrumList" :key=index>
						<view class="" style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;" @click="breadFunc(item, index)">
							> {{ item.folderName }}
						</view>
					</template>
				</view>
				<view class="fileListBox" :class="{ padTop:isSelectAll == true }">
					<view>
						<view class="fileItems"  v-for="(item, index) of flodersList" :key = index >
							<image @click="goFolder(item)" class="typeImg" src="@/static/type_1.svg" mode=""></image>
							<view @click="goFolder(item)" class="msg_box">
								<text class="text_name">{{ item.folderName }}</text>
								<text class="text_date">{{ dateFormate(item.createDate) }} | {{ byTes(item.folderSize) }}</text>
							</view>
							<view v-if="!isSelectAll" class="moreBox" @click="getDetail(item)">
								<image src="@/static/ellipsis.svg" mode="" style="width: 60rpx;height: 60rpx;"></image>
							</view>
							<view v-else class="moreBox">
								<image v-if="!item.select" @click="delItemsFunc(item)" src="@/static/active_not.svg" mode=""></image>
								<image v-else @click="selectItemFunc(item)" src="@/static/active_check.svg" mode=""></image>
							</view>
						</view>
					</view>
					<view>
						<view class="fileItems" v-for="(item, index) of fileList" :key = index >
							<image v-if="item.fileClass == 'image'" class="typeImg" src="@/static/type_3.svg" mode=""></image>
							<image v-if="item.fileClass == 'video'" class="typeImg" src="@/static/type_2.svg" mode=""></image>
							<image v-if="item.fileClass == 'file'" class="typeImg" src="@/static/type_4.svg" mode=""></image>
							<view class="msg_box">
								<text class="text_name">{{ item.fileName }}</text>
								<text class="text_date">{{ dateFormate(item.createDate) }} | {{ byTes(item.fileSize) }}</text>
							</view>
							<view v-if="!isSelectAll" class="moreBox" @click="getDetail(item)">
								<image src="@/static/ellipsis.svg" mode="" style="width: 60rpx;height: 60rpx;"></image>
							</view>
							<view v-else class="moreBox">
								<image v-if="!item.select" @click="delItemsFunc(item)" src="@/static/active_not.svg" mode=""></image>
								<image v-else @click="selectItemFunc(item)" src="@/static/active_check.svg" mode=""></image>
							</view>
						</view>
					</view>
					<view class="wenxin">
						<text>就这么多，没有啦~</text>
					</view>
				</view>
			</view>
			<view class="myCollect" v-show="2===number">
				345
			</view>
		</view>
		<indexPop ref="indexPop" @getCreateData="createData"></indexPop>
		<shareSetting ref="selectRef"></shareSetting>
		<view>
			<uni-popup ref="sortPop" type="bottom" :safe-area="false" @close="closeSort">
				<view class="uniPop" style="padding-top:0">
					<view class="sortTitle">
						<text>排序方式</text>
						<image @click="closeSort" src="@/static/close.svg" mode=""></image>
					</view>
					<view class="sort-px pop-button mtop15" style="position: relative;" :class="{ sortActive:1===sortNum}" @click="sortClick(1)">
						时间排序
						<image v-if="1 === sortNum" src="@/static/arrow.svg" mode=""></image>
					</view>
					<view class="sort-px pop-button mtop15" @click="sortClick(2)" :class="{ sortActive:2===sortNum}" style="position: relative;">
						名称排序
						<image v-if="2 === sortNum" src="@/static/arrow.svg" mode=""></image>
					</view>
				</view>
			</uni-popup>
		</view>
		<view>
			<uni-popup ref="delAll" type="bottom" :safe-area="false" @close="closeDel">
				<view class="uniPop" style="padding-top:0">
					<view class="delTitle">
						<text class="title">提示</text>
						<image @click="closeDel" src="@/static/close.svg" mode=""></image>
					</view>
					<view class="toDel">
						删除文件至回收站
					</view>
					<view class="deleteCss pop-button-del" @click="deleteSelectList">
						确认删除
					</view>
					<view class="renameCss pop-button mtop15" @click="closeDel">
						取消
					</view>
				</view>
			</uni-popup>
		</view>
		<tabber v-if="!isSelectAll" pagePath="/pageIndex/index/index"></tabber>
		<view class="footerNav" v-if="isSelectAll && number==1" style="position: fixed;bottom: 80rpx;">
			<view class="fot">
				<image src="@/static/down.svg" mode=""></image>
				<text>下载</text>
			</view>
			<view class="fot" @click="selectShare">
				<image src="@/static/share.svg" mode=""></image>
				<text>分享</text>
			</view>
			<view class="fot" @click="multiplcDeleteFunc">
				<image src="@/static/delete.svg" mode=""></image>
				<text>删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	import indexPop from "@/pageIndex/components/indexPop.vue";
	import shareSetting from "@/pageIndex/components/shareSetting.vue";
	import share from "@/pageIndex/myShare/myShare.vue";
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
		timedownnum,
	} from '@/utils/index.js'
	import urlPath from '@/utils/base.js'
	import {
		mailLogin,
		createTransfer,
		getOssToken,
		getUserFlow,
		getEverboxList,
		batchDelete
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
				number: 1,
				sortNum:1,
				isSelectAll:false,
				isShowTitle:true,
				timeDate: [],
				timename: [],
				fileList: [], //文件列表
				flodersList: [], //文件夹列表
				filezonglist: [], //总文件列表
				folderId: 0,
				breadCrumList: [],
				selectArray: [],
				selectItemsAry: [],
				itemData: '', //单个操作的数据
				allSelect: false,
				quanxuan: true, //全选按钮切换
				pageNum: 1,
				timeSort: false, //按时间排序
				sizeSort: false, //按文件或文件夹大小排序
				defaultSort: true, //
				showPage:false,
			}
		},
		onLoad() {
			console.log('测试log')
		},
		components: {
			tabber,
			indexPop,
			shareSetting,
			share
		},
		created() {
			uni.hideKeyboard();
		},
		methods: {
			closeSelect(){
				this.isSelectAll = false;
				for (let i = 0; i < this.selectItemsAry.length; i++) {
					this.selectItemsAry[i].select = false
				}
				this.selectItemsAry = [];
			},
			closePop(){
				this.$refs.midPop.close();
			},
			closeDel(){
				this.$refs.delAll.close();
			},
			selectShare(){
				if(this.selectItemsAry.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择文件"
					})
					return
				}
				this.$refs.selectRef.changeBtn();
				this.$refs.selectRef.selectItemsAry = this.selectItemsAry;
				this.$refs.selectRef.$refs.sharePop.open();
			},
			multiplcDeleteFunc(){
				if(this.selectItemsAry.length == 0) {
					uni.showToast({
						icon: "none",
						title: "请选择文件"
					})
					return
				}
				this.$refs.delAll.open();
			},
			async deleteSelectList(){
				uni.showLoading({title: '删除中'}); 
				 let ary = [];
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
					this.selectItemsAry = []
					this.closeDel();
					this.createData();
				  }
			},
			maskClose(){},
			getDetail(item){ //点击按钮显示pop
			      let superFolder = 0;
			      if (this.breadCrumList.length !== 0) {
			        superFolder = this.breadCrumList[this.breadCrumList.length - 1].folderId;
			      }
				  this.superFolder = superFolder
				console.log(item)
				this.$refs.indexPop.showPage = true;
				this.$refs.indexPop.$refs.shareSett.superFolder = superFolder;//赋值superFolder用于创建分享
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
			//全选
			allSelectFunc() {
			  this.quanxuan = false;
			  this.fileList.forEach((item) => (item.select = true));
			  this.flodersList.forEach((item) => (item.select = true));
			  this.allSelect = !this.allSelect;
			  this.selectItemsAry = this.selectItemsAry.concat(this.fileList).concat(this.flodersList);
			},
			//取消全选
			cancelAllSelectFunc() {
			  this.quanxuan = true;
			  this.fileList.forEach((item) => (item.select = false));
			  this.flodersList.forEach((item) => (item.select = false));
			  this.allSelect = !this.allSelect;
			  this.selectItemsAry = [];
			  // this.isSelectAll = false;
			},
		   //添加文件
			delItemsFunc(val) {
			  // console.log("选择到了")
			  this.selectItemsAry.push(val);
			  this.itemData = val;
			  val.select = true;
			  console.log(this.selectItemsAry)
			},
			breadFunc(item, index) {
				this.selectArray = []
				this.checked = false
				console.log(this.selectArray)
				if (item == 0) {
					this.breadCrumList = [];
					this.folderId = 0;
					this.isShowTitle =true;
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
			//反选文件
			selectItemFunc(val) {
			  val.select = false;
			  this.allSelect = false;
			  for (let i = 0; i < this.selectItemsAry.length; i++) {
				if (this.selectItemsAry[i].select == false) {
				  this.selectItemsAry.splice(i, 1);
				}
			  }
			  console.log(this.selectItemsAry)
			},
			goFolder(item) {
				if(this.isSelectAll) return
				this.isShowTitle = false;//隐藏title
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
			openNewListData(res) {
			  let flodersList = res.data.data.foldersList;
			  // console.log(this.timeDate);
			  flodersList.forEach((item) => {
				item.select = false;
				item.moveType = "2";
				item.utilsType = false;
				let day11 = this.$options.filters["timedown"](item.createDate);
				let daynum = this.$options.filters["timedownnum"](item.createDate);
				// console.log(day11);
				// console.log(item.createDate);
				if (daynum == true) {
				  let timeHH = this.$options.filters["timedownshow"](item.createDate); //小时
				  let timeMM = this.$options.filters["timedownshowmm"](item.createDate); //分钟
				  this.timeDate.push("今天  " + timeHH + ":" + timeMM);
				} else if (day11 <= 2 && daynum == false) {
				  let timeHH = this.$options.filters["timedownshow"](item.createDate);
				  let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
				  this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
				} else {
				  this.timeDate.push(item.createDate);
				}
			  });
		
			  let fileList = res.data.data.filesList;
		
			  fileList.forEach((item) => {
				item.select = false;
				item.moveType = "1";
				item.utilsType = false;
				let day11 = this.$options.filters["timedown"](item.createDate);
				// console.log(day11);
				let daynum = this.$options.filters["timedownnum"](item.createDate);
				// console.log(item.createDate);
		
				let nametyp = item.fileName;
				let numsplit = nametyp.split(".")[0];
				// let houwen = nametyp.split(".")[1];
				let houwen = nametyp.split(".")[nametyp.split(".").length - 1];
				let numpd = numsplit.length;
				// console.log(houwen);
				// console.log(numpd);
				if (numpd <= 10) {
				  // console.log(numsplit + "... " + houwen);
				  this.timename.push(numsplit + "." + houwen);
				} else {
				  let qianwen = numsplit.substring(0, 10);
				  // console.log(qianwen);
				  // console.log(numsplit + "... " + houwen);
				  this.timename.push(qianwen + "... " + "." + houwen);
				}
		
				if (daynum == true) {
				  let timeHH = this.$options.filters["timedownshow"](item.createDate); //小时
				  let timeMM = this.$options.filters["timedownshowmm"](item.createDate); //分钟
				  this.timeDate.push("今天  " + timeHH + ":" + timeMM);
				} else if (day11 <= 2 && daynum == false) {
				  let timeHH = this.$options.filters["timedownshow"](item.createDate);
				  let timeMM = this.$options.filters["timedownshowmm"](item.createDate);
				  this.timeDate.push("昨天  " + timeHH + ":" + timeMM);
				} else {
				  this.timeDate.push(item.createDate);
				}
		
				let fileType = getSuffix(item.fileName);
		
				if (isImage(fileType)) {
				  item.fileClass = "image";
				} else if (isVideo(fileType)) {
				  item.fileClass = "video";
				} else {
				  item.fileClass = "file";
				}
			  });
			  this.flodersList = [];
			  this.flodersList = this.flodersList.concat(flodersList);
		
			  this.fileList = [];
			  this.fileList = this.fileList.concat(fileList);
			},
			closeSort(){
				this.$refs.sortPop.close();
			},
			titleChange(index){
				console.log(index)
				this.number = index;
			},
			bodyCloseSelected() {
				this.isShowCollect = false;
			},
			searchClick(){
				uni.navigateTo({
					url: "/pageIndex/index/searchCloud",
					// url: "/pageIndex/index/upload?list=" + JSON.stringify(e.tempFiles)
				})
			},
			showSort(){//弹出排序
				this.$refs.sortPop.open();
			},
			selectAll(){//弹出多选
				this.isSelectAll = true;
			},
			sortClick(num){
				this.sortNum = num
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
		filters: {
		    typeDate(value) {
		      if (!value) return;
		      return DateYMD(value.expireDate);
		    },
		    // byTes(value) {
		    //   console.log(2221111)
		    //   console.log(value)
		    //   if (value <= 0 ) {
		    //     return "0B"; //Bytes
		    //   }
		    //   return bytesToSize(value);
		    // },
			// bytesToSize(value){
			// 	return bytesToSize(value);
			// },
		    hiddenAccout(value) {
		      if (!value) {
		        return;
		      } else {
		        return value.replace(/(\d{3})\d*(\d{4})/, "$1****$2");
		      }
		    },
		    formatinstDataaa(value) {
		      return formatinstData(value);
		    },
		    residue(value) {
		      return residuePrecision(value);
		    },
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
		async mounted(){
			const file = await getEverboxList({
			  superFolder: 0,
			  pageNum: 1,
			  defaultSort: true,
			  timeSort: false,
			  pageSize: 1000,
			});
			if (file.data.code == 0) {
			  await this.openNewListData(file);
			}
			
		},
	}
</script>

<style lang="scss" scoped>
	@import url("@/common/common.css");
	.container {
		width: 100vw;
		height: 100vh;
		// display: flex;
		// justify-content: center;
		background-color: #fff;
		font-family: 'PingFang SC';
		font-style: normal;
		.index-title {
			display: flex;
			justify-content: space-around;
			height: 120rpx;
			// padding: 24rpx 30rpx;
			box-sizing: border-box;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			background: #fff;
			    // box-shadow: 0 1vw 2vw rgb(0 0 0 / 16%);
			    padding: 0 20rpx;
			    z-index: 99;
			text {
				width: 192rpx;
				height: 72rpx;
				line-height: 72rpx;
				text-align: center;
				background: #F6F6F6;
				border-radius: 18rpx;
				color: #555555;
				font-weight: 400;
				font-size: 28rpx;
			}
		}
		// .myShare {
		// 	margin-top: 120rpx;
		// }
		.myCloud {
			height: 100vh;
			.cloud_top {
				height: 72rpx;
				padding: 0 30rpx;
				display: flex;
				justify-content: space-between;
				position: fixed;
				margin-top: 120rpx;
				background:#fff;
				.search {
					width: 510rpx;
					height: 72rpx;
					display: flex;
					align-items: center;
					background: #F7FAFD;
					border-radius: 20rpx;
					color: #9CA3AE;
					font-size: 28rpx;
					line-height: 40rpx;
					image {
						width: 32rpx;
						height: 32rpx;
						margin-right: 12rpx;
						margin-left: 18rpx;
					}
				}
				.btn {
					image {
						width: 60rpx; 
						height: 60rpx;
					}
					:nth-child(1) {
						margin-right: 30rpx;
					}
				}

			}
			.select_top {
				height: 100rpx;
				padding: 0 50rpx;
				display: flex;
				justify-content: space-between;
				position: fixed;
				background:#fff;
				color: #333333;
				width: 100%;
				border-top: 2rpx solid #f4f4f4;
				border-bottom: 2rpx solid #f4f4f4;
				align-items: center;
				font-weight: 400;
				font-size: 28rpx;
				box-sizing: border-box;
				image {
					width: 60rpx;
					height:60rpx;
				}
			}
			.breadCrum {
				position: fixed;
				top: 90rpx;
				display: flex;
				// margin-left: 40rpx;
				font-weight: 400;
				font-size: 24rpx;
				height: 100rpx;
				align-items: center;
				line-height: 34rpx;
				color: #333333;
				background: #fff;
				padding-top: 20rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 0 40rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.fileListBox {
				padding-top: 200rpx;
				height: calc(100% - 360rpx);
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
							width: 40rpx;
							height: 40rpx;
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
		}
	}
	.active {
		background: #D7E4FF !important;
		color: #3679FF !important;
	}
	.sortActive {
		background: #D7E4FF;
		color: #3679FF;
	}
	.padTop {
		padding-top:100rpx !important;
		height: calc(100% - 300rpx) !important;
	}
	.padTopTitle {
		padding-top:20rpx !important;
		margin-top:0 !important;
	}
	.sortTitle {
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
	.sort-px {
		image {
			width: 40rpx;
			height: 40rpx;
			position: absolute;
			right: 28rpx;
			top: 24rpx;
		}
	}
	.footerNav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 15vw;
		background: #fff;
		border-top: 2rpx solid #eee;
		position: fixed;
		left: 0;
		bottom: 80rpx;
		right: 0;
		z-index: 90;
		font-weight: 400;
		font-size: 24rpx;
		color: #999999;
		.fot {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			flex-direction: column;
		}
		image {
			width: 60rpx;
			height: 60rpx;
		}
	}
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
					display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 2;
					    overflow: hidden;
					    text-overflow: ellipsis;
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
</style>

<style lang="scss">
	// .container {
	// 	.is-text-box {
	// 		display: none;
	// 	}
	// }
</style>
