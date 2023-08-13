<template>
   <view class="">
      <TrafficPopup ref="buyPopupRef" title="选择支付方式" height="800rpx">
         <view class="amountPaid">
            <text style="width: 200rpx;color: #3679FF;">购买邮箱</text>
            <view class="box" style="text-align: right;">
               <text>{{ `1437061099@qq.com` }}</text>
            </view>
         </view>
         <view class="wx-buy" @tap="this.isShowHighlight = 1">
            <view>
               <text>微信支付</text>
               <image v-show="isShowHighlight == 1" src="@/static/Vector-correct.png" style="width: 35rpx;height: 35rpx;"></image>
            </view>

         </view>
         <view class="zfb-buy" @tap="this.isShowHighlight = 2">
            <view>
               <text>支付宝支付</text>
               <image v-show="isShowHighlight == 2" src="@/static/Vector-correct.png" style="width: 35rpx;height: 35rpx;"></image>
            </view>
         </view>

         <button type="default" class="btn" @tap="handleCloseBuyPopup">去支付</button>
      </TrafficPopup>
   </view>
</template>

<script>
   import TrafficPopup from '@/components/trafficPopup.vue'
   export default {
      name: 'buyTraffic',
      components: {
         TrafficPopup
      },
      data(){
         return {
            isShowHighlight: 1
         }
      },
      methods: {
         handleOpenBuyPopup() {
            this.$refs.buyPopupRef.showPop()
         },
         handleCloseBuyPopup(){
            this.$refs.buyPopupRef.close()
            this.$parent.openBuySuccesPopup()
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

   .wx-buy,
   .zfb-buy {
      width: 90%;
      padding: 20rpx;
      line-height: 50rpx;
      margin: 30rpx auto;
      border-radius: 15rpx;
      color: #fff;

      &>view{
         display: flex;
         justify-content: space-between;
         align-items: center;
      }
   }

   .wx-buy {
      background-color: #27BE6F
   }

   .zfb-buy {
      background-color: #0092FF
   }

   .btn {
      width: 80%;
      margin: 60rpx auto 0;
      color: #fff;
      background-color: #3679FF
   }
</style>
