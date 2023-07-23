<template>
   <view @touchmove.prevent.stop>
      <uni-popup ref="popup" type="bottom" :mask-click="false" :safe-area="false" class="create-share-popup">
         <view class="claim-code-bg">
            <view class="top-bg">
               <image src="../static/claim-bg.png"></image>
            </view>

            <view class="input">
               <input type="text" placeholder="请输入取件码文件" placeholder-style="color:#999 ">
            </view>

            <view class="btn">
               <button type="default">确定</button>
            </view>
            
            
            <view>
               <image src="../static/redClose.png"></image>
            </view>
         </view>
      </uni-popup>
   </view>
</template>

<script>
   export default {
      name: "claimCode",
      data() {
         return {

         };
      },

      methods: {
         open() {
            this.$refs.popup.open()
         }
      }
   }
</script>

<style lang="scss" scoped>
   .claim-code-bg {
      height: 900rpx;
      background-color: #fff;
      border-top-left-radius: 30rpx;
      border-top-right-radius: 30rpx;


      .top-bg {
         width: 90%;
         height: 260rpx;
         margin: 0 auto;

         image {
            width: 100%;
            height: 100%;
            object-fit: contain;
         }
      }


      .input {
         width: 60%;
         margin: 0 auto;
         padding: 20rpx;
         box-sizing: border-box;
         border-radius: 10rpx;
         background-color: #F3F4F5;
      }

      .btn {
         button {
            width: 60%;
            color: #fff;
            margin: 50rpx auto 0;
            background-color: #3679FF;
         }
      }

   }
</style>
