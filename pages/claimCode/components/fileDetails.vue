<template>
   <view class="text-details">
      <text>文件说明：有填写描述时，这里显示传输文件描述内容文字内容的区域，最多显示100个字！</text>
   </view>
</template>
<style lang="scss" scoped>
   .text-details {
      margin: 25rpx 30rpx;
      border-radius: 20rpx;
      padding: 20rpx 15rpx;
      background: linear-gradient(0deg, rgba(54, 121, 255, 0.15), rgba(54, 121, 255, 0.15)),
         linear-gradient(0deg, rgba(54, 121, 255, 0.1), rgba(54, 121, 255, 0.1));

      text {
         color: #5D6985;
         line-height: 17px;
         font-size: 30rpx;
      }
   }
</style>
