<template>
   <view>
      <view class="empty" v-if="!data.length">
         <o-empty />
      </view>
      <view class="wrapper" v-for="(item , index) of data" :key="index" v-else>
         <view class="left">
            <image :src="getImageUrl(item.type)" />
         </view>
         <view class="middle">
            <view class="title">{{ item.name }}</view>
            <view class="file-details">
               <view class="folder-prefix" v-show="false">
                  <text class="folder"></text>
                  <text class="dot">.</text>
                  <text class="file-count"></text>
               </view>
               <text class="file-size">{{ item.transSize }}MB</text>
            </view>
         </view>
         <view class="right" @tap="deleteFile(index)">
            <image src="../../static/close.svg" />
         </view>
      </view>
   </view>
</template>

<script>
   export default {
      name: 'uploadList',
      props: {
         data: {
            type: Array,
            require: false,
            default: []
         },
         handleDeleteFile: {
            type: Function,
            require: true,
            default: () => {}
         }
      },
      data() {
         return {}
      },
      methods: {
         deleteFile(index) {
            this.handleDeleteFile(index)
         }
      },
      computed: {
         getImageUrl(fileType) {
            return function(fileType) {
               const prefixUrl = '../../static/'
               const fileTypeObject = {
                  'image': prefixUrl + 'type_3.svg',
                  'file': prefixUrl + 'type_4.svg',
               }
               return fileTypeObject[fileType]
            }
         }
      }
   }
</script>

<style scoped lang="scss">
   image {
      width: 100%;
      height: 100%;
   }

   .wrapper {
      margin: 0 20rpx;
      display: flex;
      align-items: center;

      .left {
         width: 100rpx;
         height: 100rpx;
      }

      .right {
         width: 70rpx;
         height: 70rpx;
      }

      .middle {
         margin-left: 20rpx;
         flex: 1;

         >view {
            margin: 20rpx 0;
         }

         .title {
            font-size: 30rpx;
            color: #333333;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 400rpx;
         }

         .file-size {
            color: #999
         }
      }
   }
</style>
