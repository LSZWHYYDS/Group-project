<template>
   <view style="text-align: center;">

      <view class="success-flag">
         <image src="../../static/Frame.png"></image>
      </view>


      <text class="success-text">收集创建成功</text>


      <view class="middle-explain">
         <text style="color: #333;font-weight: bold;font-size: 40rpx;">努力创造奇迹吧少年</text>
         <text class="details">有好看电影的小伙伴发一下哈，非常感谢</text>
         <view class="middle-info">
            <view class="icon">
               <image src="../../static/ling.png" />
            </view>
            <text>结束日期:</text>
            <text>2022/12/11 18:00</text>
         </view>
      </view>


      <view>
         <button type="default" class="copylink" @tap="copyLink">复制链接</button>
         <button type="default" class="qrcodeShare" @tap="handleQRcodeShare">二维码分享</button>
      </view>

      <QrCodeShare type="collect-bg" v-if="isShowCollectQRCode" ref="collectShare"/>
   </view>
</template>

<script>
   import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
   import QrCodeShare from '@/components/create-share.vue'
   import dayJS from 'dayjs'
   export default {
      name: 'collectSuccess',
      components:{
         QrCodeShare
      },
      data() {
         return {
            isShowCollectQRCode: false
         }
      },
      methods:{
         copyLink(){
            uniCopy({
               content: '此处动态的替换',
               success: (res) => {
                  uni.showToast({
                     title: res,
                     icon: 'none'
                  })
               },
               error: (e) => {
                  uni.showToast({
                     title: e,
                     icon: 'none',
                     duration: 3000,
                  })
               }
            })
         },

         handleQRcodeShare(){
            this.isShowCollectQRCode = true;
            setTimeout(() => {
               this.$refs.collectShare.open()
            })
         }
      },
      mounted() {
         console.log(dayJS('290232323232323').format("YYYY/MM/DD hh:mm"));
      }
   }
</script>

<style lang="scss" scoped>
   image {
      width: 100%;
      height: 100%;
      object-fit: contain;
   }


   .success-flag {
      width: 320rpx;
      height: 320rpx;
      margin: 60rpx auto 0;
   }


   .success-text {
      font-size: 36rpx;
      color: #3679FF;
   }


   .middle-explain {
      width: 90%;
      height: 300rpx;
      margin: 50rpx auto 0;
      padding: 0 20rpx;
      border-radius: 10rpx;

      box-sizing: border-box;
      background-color: #e0e3e5;
      text-align: left;

      display: flex;
      flex-direction: column;
      justify-content: space-around;


      .title {
         margin-top: 30rpx;
      }


      .details {
         color: #888;
      }

      .middle-info {
         width: fit-content;
         display: inline-flex;
         align-items: center;
         border: 1px solid #d3d2d2;
         padding: 10rpx 20rpx;
         color: #888;

         .icon {
            width: 36rpx;
            height: 36rpx;
            margin-right: 10rpx;
         }

         text:nth-child(2) {
            letter-spacing: 5rpx;
            margin-right: 5rpx;
         }
      }
   }


   .copylink,
   .qrcodeShare {
      color: #fff;
      width: 70%;
      margin: 0 auto;
      letter-spacing: 4rpx;
   }

   .copylink {
      margin-top: 60rpx;
      background-color: #3679FF;
   }

   .qrcodeShare {
      color: #3679FF;
      margin-top: 30rpx;
      background-color: #D7E4FF
   }

</style>
