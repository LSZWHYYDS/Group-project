<template>
   <view>
      <view class="file-details">
         <view class="left-block">
            <text>文件数量</text>
            <text>文件大小</text>
         </view>
         <view class="right-block">
            <text>10 个</text>
            <text>10.23 GB</text>
         </view>
      </view>
      <view class="amountPaid">
         <text class="box">支付金额</text>
         <view class="box" style="text-align: right;">
            <text>¥</text>
            <text style="font-size: 35rpx;"> 10.2</text>
         </view>
      </view>

      <view class="input">
         <input type="text" placeholder-style="text-align:center;color:#fff" placeholder="输入邮箱/手机号">
         <text>购买成功后会给您发送购买订单凭证</text>
      </view>

      <button type="default" class="btn" @tap="openBuyPopup">确定</button>
   </view>
</template>

<script>
   export default {
      name: 'trafficDeficiency',
      methods: {
         openBuyPopup() {
            this.$parent.closeNoTrafficPopup()
         }
      }
   }
</script>

<style lang="scss" scoped>
   .file-details,
   .amountPaid {
      display: flex;
      justify-content: space-between;
      width: 90%;
      height: 120rpx;
      padding: 10rpx 20rpx;
      margin: 30rpx auto;
      border-radius: 15rpx;

   }

   .file-details {
      background-color: #D7E4FF;

      .left-block,
      .right-block {
         width: 200rpx;
         display: flex;
         font-size: 30rpx;
         flex-direction: column;
         justify-content: center;

         >text:last-child {
            margin: 10rpx 0 0;
         }
      }

      .right-block {
         text-align: right;
      }
   }

   .amountPaid {
      align-items: center;
      background-color: #FFE3BF;

      .box {
         width: 200rpx;
      }
   }


   .input {
      width: 90%;
      height: 80rpx;
      line-height: 80rpx;
      margin: 0 auto;
      padding: 10rpx 20rpx;
      border-radius: 15rpx;
      background-color: #DCE2EE;

      input {
         height: 100%;
      }

      text {
         display: inline-block;
         color: #999999;
         margin-top: 10rpx;
         font-size: 30rpx;
      }
   }


   .btn {
      width: 60%;
      color: #fff;
      margin: 100rpx auto 0;
      background-color: #3679FF;
   }
</style>
