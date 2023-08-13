<template>
   <TrafficPopup ref="buySuccessPopup" title="购买成功" height="800rpx">
      <view>
         <view class="img">
            <view class="img-view"></view>
         </view>

         <text style="color: #333333;width: 450rpx;display: inline-block;">订单已发送至您填写的邮箱/手机号60分钟内可重复下载此文件3次</text>

         <button type="default" class="btn">去下载</button>
      </view>
   </TrafficPopup>
</template>

<script>
   import TrafficPopup from '@/components/trafficPopup.vue'
   export default {
      name: 'buySuccess',
      components: {
         TrafficPopup
      },
      data() {
         return {
            isShowHighlight: 1
         }
      },
      methods: {
         open() {
            this.$refs.buySuccessPopup.showPop()
         },
         close() {
            this.$refs.buySuccessPopup.close()
         }
      }
   }
</script>

<style lang="scss" scoped>
   .img {
      width: 350rpx;
      margin: 0 auto;

      &-view {
         background: url('@/static/buy-success.png') no-repeat;
         background-size: cover;
         width: 100%;
         height: 0;
         padding-bottom: 100%
      }
   }
   
   .btn {
      width: 80%;
      margin: 60rpx auto 0;
      color: #fff;
      background-color: #3679FF
   }
</style>
