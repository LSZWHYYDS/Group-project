<template>
<view class="">
   <TrafficPopup ref="buyPopupRef" title="选择支付方式" height="800rpx">
      <view class="amountPaid">
         <text style="width: 200rpx;color: #3679FF;">购买邮箱</text>
         <view class="box" style="text-align: right;">
            <text>{{ `1437061099@qq.com` }}</text>
         </view>
      </view>
   </TrafficPopup>
</view>
</template>

<script>
   import TrafficPopup from '@/components/trafficPopup.vue'
   export default {
      name : 'buyTraffic',
      components : {
         TrafficPopup
      },

      methods : {
         handleOpenBuyPopup(){
            this.$refs.buyPopupRef.showPop()
         }
      }
   }
</script>

<style lang="scss" scoped>
   .amountPaid {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 90%;
      height: 120rpx;
      padding: 10rpx 20rpx;
      margin: 30rpx auto;
      border-radius: 15rpx;
      background-color: #D7E4FF;

      .box {
         display: inline-block;
         color: #3679FF;
      }
   }
</style>
