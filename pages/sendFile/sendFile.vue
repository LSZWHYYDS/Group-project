<template>
   <view class="warpper">
      <!-- 点击开始上传按钮 ， 切换水波图组件 -->
      <view v-if="!isShowHdrograph">
         <!-- 上传文件列表 -->
         <view class="upload-list">
            <UploadList :data="fileData" :handleDeleteFile="handleDelete" />
         </view>
         <view class="settingPopup">
            <!-- 一层 继续添加文件 -->
            <view class="baseStyle">
               <view class="left">
                  <text>继续添加文件</text>
               </view>
               <view class="right" @tap="handleAddFile">
                  <view class="addBg"></view>
               </view>
            </view>
            <!-- 二层 存储至网盘 -->
            <view class="baseStyle">
               <view class="left">
                  <text>存储至网盘</text>
               </view>
               <view class="right">
                  <switch checked color="#007AFF" style="transform:scale(0.7);width: 115rpx;" />
               </view>
            </view>
            <!-- 三层 限制下载次数 -->
            <view class="baseStyle third-floor">
               <view class="left">
                  <text>限制下载次数</text>
               </view>
               <view class="right">
                  <view class="left-icon" @click="downloadNumber ++"></view>
                  <text>{{downloadNumber}}</text>
                  <view class="right-icon" @click="subDownloadNumber"></view>
               </view>
            </view>
            <!-- 四层 链接有效期时间/天 -->
            <view class="baseStyle third-floor">
               <view class="left">
                  <text>链接有效期时间/天</text>
               </view>
               <view class="right">
                  <view class="left-icon" @click="periodNumber ++"></view>
                  <text>{{periodNumber}}</text>
                  <view class="right-icon" @click="subPeriodNumber"></view>
               </view>
            </view>
            <!-- 五层 链接有效期时间/天 -->
            <view class="baseStyle inputStyle">
               <view class="left" style="width: 100%;">
                  <textarea type="text" placeholder="传输文件选填 (选填) ..." />
               </view>
            </view>
            <!-- 六层 底部功能按钮 -->
            <view class="baseStyle footerSetup">
               <view class="left">
                  <button type="default" class="btn" @click="openMoreSetting">
                     <image src="../../static/setUp.png"></image>
                  </button>
               </view>
               <view class="right" @tap="handleStartUpload">
                  <button type="default" class="btns">开始上传</button>
               </view>
            </view>
         </view>
         <!-- 更多设置开始 -->
         <MoreSetting ref="moreSetting" />
      </view>
      <!-- 上传的水位图组件 -->
      <view class="hdrograph" v-else>
         <UploaddHdrograph :handleUploadCompleted="handleUploadCompleted" />
         <!-- 未上传完毕时候展示信息 -->
         <view v-if="uploadCompleted">
            <view class="upload-info">
               <text class="text">正在上传</text>
               <text class="text space">{{uploadProgressInfo.totalUploadCount}}</text>
               <text class="text">个文件中的第</text>
               <text class="text space">{{uploadProgressInfo.currentUploadCount}}</text>
               <text class="text">个文件</text>
            </view>
            <view style="text-align: center;">
               <text class="text" style="margin-top: 10rpx">已上传<text
                     class="space">{{ uploadProgressInfo.uploadSize }}</text>MB</text>
            </view>
         </view>
         <!-- 上传完毕时候展示的UI -->
         <view v-else>
            <view style="text-align: center;">
               <text class="text">上传完成</text>
            </view>
            <view>
               <text class="text" style="margin-top: 10rpx;">可在<text class="space-completed">我的分享</text>中查看详情</text>
            </view>
         </view>
         <view class="operation-btn">
            <button type="default" @tap="copyLink">复制链接</button>
            <button type="default" @tap="openShare">二维码分享</button>
         </view>
         <CreateShare v-if="isShowShares" ref="createShare" />
      </view>
   </view>
</template>

<script>
   import {
      forEach,
      remove
   } from 'lodash-es'
   import UploadList from './uploadList.vue'
   import MoreSetting from './moreSetting.vue'
   import UploaddHdrograph from '@/components/uploadd-hdrograph/uploadd-hdrograph.vue'
   import CreateShare from "@/components/create-share.vue"
   export default {
      components: {
         UploadList,
         MoreSetting,
         CreateShare,
         UploaddHdrograph
      },
      mounted() {

      },
      data() {
         return {
            downloadNumber: 0,
            periodNumber: 0,
            isShowHdrograph: false,
            uploadCompleted: true,
            // 上传
            uploadProgressInfo: {
               totalUploadCount: 100,
               currentUploadCount: 100,
               uploadSize: 10
            },
            fileData: [],

            // 控制分享组件
            isShowShares: false
         }
      },
      methods: {
         handleUploadCompleted() {
            this.uploadCompleted = false
         },

         handleAddFile() {
            let that = this;
            wx.chooseMessageFile({
               count: 10,
               type: 'all',
               success(res) {
                  const tempArr = that.fileData.concat(res.tempFiles)
                  forEach(tempArr, (item) => {
                     item.transSize = (item.size / 1024 / 1024).toFixed(2)
                  })
                  that.fileData = tempArr
               }
            })
         },

         handleDelete(index) {
            remove(this.fileData, (is, ix) => ix === index)
         },

         subDownloadNumber() {
            if (this.downloadNumber <= 0) return;
            this.downloadNumber--;
         },

         subPeriodNumber() {
            if (this.periodNumber <= 0) return;
            this.periodNumber--;
         },

         openMoreSetting() {
            this.$refs.moreSetting.openMoreSetingPopup()
         },

         handleStartUpload() {
            this.isShowHdrograph = true
         },

         openShare() {
            this.isShowShares = true;
            setTimeout(() => {
               this.$refs.createShare.open()
            })
         },
         
         copyLink(){
            
         }
      },

      // watch: {
      //    isShowHdrograph: {
      //       handler: function(newValue, oldValue) {
      //          if (newValue) {}
      //       },
      //    }
      // }

   }
</script>

<style lang="scss" scoped>
   .warpper {
      margin-top: 100rpx;

      .upload-list {
         height: calc(100vh - 750rpx);
         overflow-y: auto;
      }

      .uni-popup {
         pointer-events: none;
      }

      .settingPopup {
         height: 750rpx;
         background: #fff;


         .baseStyle {
            height: 90rpx;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
               text {
                  color: #666;
                  font-size: 26rpx;
                  margin-left: 40rpx;
                  font-weight: 500;
                  letter-spacing: 5rpx;
               }
            }

            .right {
               .addBg {
                  width: 87rpx;
                  height: 40rpx;
                  background-image: url('../../static/addBig.png');
                  background-repeat: no-repeat;
                  background-size: contain;
               }
            }

         }


         .third-floor {

            .left-icon {
               background-image: url('../../static/addSmall.png');
            }

            .right-icon {
               background-image: url('../../static/subSmall.png');
            }

            .left-icon,
            .right-icon {
               width: 40rpx;
               height: 40rpx;
               background-repeat: no-repeat;
               background-size: contain;
            }

            .right {
               display: flex;
               justify-content: space-between;
               align-items: center;
               margin-right: 40rpx;

               text {
                  line-height: 0;
                  padding: 0 15rpx;
               }
            }
         }


         .inputStyle {
            padding: 20rpx 22rpx;

            textarea {
               width: 100%;
               height: 100rpx;
               box-sizing: border-box;
               padding: 10rpx 20rpx;
               background-color: #F4F7FA;
               color: #333;
            }

         }

         .footerSetup {
            padding: 20rpx 0;

            .btn {
               width: 130rpx;
               height: 80rpx;
               margin-left: 40rpx;
               background-color: #transparent;
               border: 1px solid #3679FF;
               display: flex;
               justify-content: center;
               align-items: center;

               image {
                  width: 60rpx;
                  height: 60rpx;
               }
            }

            .right {
               flex: 1;
               padding: 0 30rpx;

               .btns {
                  background-color: #3679FF;
                  color: #fff;
               }
            }
         }
      }

      .hdrograph {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         .upload-info {
            margin-top: 50rpx;
         }

         .text {
            color: #666666;
            display: inline-block;
            margin: 10rpx 0;
         }

         .space {
            color: #333;
            margin: 0 10rpx;
         }

         .space-completed {
            color: #3679FF;
            margin: 0 10rpx;
         }

         .operation-btn {
            margin-top: 120rpx;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

            button {
               width: 60%;
            }

            >button:first-child {
               background-color: #3679FF;
               color: #fff;
            }

            >button:last-child {
               background-color: #D7E4FF;
               color: #3679FF;
               margin-top: 30rpx;
            }
         }

      }

   }
</style>
