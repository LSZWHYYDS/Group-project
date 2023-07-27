<template>
   <view class="wrapper">
      <!-- 文件夹文本说明 -->
      <view class="folder">
         <view class="folder-one">
            <image src="../../static/down.svg" class="img-down"></image>
            <text>2023年04月01日 12:00 失效</text>
         </view>

         <view class="folder-two">
            <image src="../../static/timer.svg" class="img-down img-flag"></image>
            <text>下载次数剩余 44/100</text>
         </view>
      </view>

      <!-- mp4格式的文本说明 -->
      <view class="folder">
         <view class="folder-two">
            <image src="../../static/timer.svg" class="img-down img-flag"></image>
            <text>永久有效</text>
         </view>

         <view class="folder-two">
            <image src="../../static/down.svg" class="img-down"></image>
            <text>下载无限制</text>
         </view>
      </view>
   </view>
</template>

<script>
   export default {
      name : 'fileStatus',
   }
</script>

<style lang="scss" scoped>
   .folder{

      .folder-one ,
      .folder-two{
         margin: 20rpx 30rpx;
         padding: 20rpx;
         border-radius: 20rpx;
         background-color: #eaeaea;
         margin: 30rpx;
      }

      .img-down{
         width: 50rpx;
         height: 50rpx;
         margin-left: 10rpx;
         margin-right: 10rpx;
         vertical-align: middle;
      }

      .folder-two{
         .img-flag{
           width: 35rpx;height: 35rpx;margin-left: 9px;
           margin-right: 14rpx;
         }
      }

      text {
         color : #717E98;
      }
   }
</style>
