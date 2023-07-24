<template>
   <view class="">
      <view class="topFileLogo">
         <image :src="computedImagePath(fileIconType)"></image>
      </view>

      <view class="text">
         <text>努力创造奇迹</text>
      </view>

      <view class="fileSize">
         <text>{{ 5 }}个文件</text>
         <text> | </text>
         <text>1.21GB</text>
      </view>

   </view>
</template>

<script>
   export default {
      name: 'fileTopInfo',
      props: {
         fileIconType: {
            type: String,
            require: false
         }
      },
      data() {
         return {

         }
      },

      computed: {
         computedImagePath(type) {
            const basePath = '../../../static/'
            return function(type) {
               return `${basePath}${type}`
            }
         }
      }
   }
</script>

<style lang="scss" scoped>
   image {
      width: 100%;
      height: 100%;
      object-fit: cover;
   }

   .topFileLogo {
      width: 200rpx;
      height: 200rpx;
      margin: 60rpx auto 0;
   }


   .text {
      text-align: center;
      margin-top: 20rpx;
      letter-spacing: 5rpx;
      color: #333;
   }

   .fileSize {
      text-align: center;
      margin-top: 20rpx;
      color: #999;
   }
</style>
