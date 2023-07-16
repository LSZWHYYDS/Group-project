<template>
   <view>
      <!-- 上传文件列表 -->
      <view class="upload-list">
         <uploadList :data="fileData" :handleDeleteFile="handleDelete" />
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
               <switch checked color="#007AFF" style="transform:scale(0.7)" />
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
            <view class="right">
               <button type="default" class="btns">开始上传</button>
            </view>
         </view>
      </view>
      <MoreSetting ref="moreSetting" />
   </view>
</template>

<script>
   import {
      forEach,
      remove
   } from 'lodash-es'
   import uploadList from './uploadList.vue'
   import MoreSetting from './moreSetting.vue'
   export default {
      components: {
         uploadList,
         MoreSetting
      },
      mounted() {},
      data() {
         return {
            downloadNumber: 0,
            periodNumber: 0,
            fileData: []
         }
      },
      methods: {
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
         }
      }
   }
</script>

<style lang="scss" scoped>
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
               width: 65rpx;
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
            margin-right: 16rpx;

            text {
               line-height: 0;
               padding: 0 15rpx;
            }
         }
      }


      .inputStyle {
         padding: 20rpx;

         textarea {
            width: 100%;
            height: 100rpx;
            box-sizing: border-box;
            padding: 10rpx;
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
</style>
