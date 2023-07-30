<template>
   <uni-popup ref="popup" :safe-area="false" type="bottom" style="z-index:99999;" @maskClick="maskClose" @close="close">
      <view class="downPopup">
         <view class="top-bg">
            <image src="../static/claim-bg.png"></image>
         </view>

         <view class="tip">
            <view>
               <text>文件下载中</text>
               <text class="time" style="--time:8">.</text>
               <text class="time" style="--time:9">.</text>
               <text class="time" style="--time:10">.</text>
            </view>
            <text class="copywriting">本次下载对方提供下载流量</text>
         </view>

         <view class="btn">
            <button type="default" class="btn_son">关闭</button>
         </view>
      </view>
   </uni-popup>
</template>

<script>
   export default {
      name: 'fileDownPopup',
      data() {
         return {};
      },
      methods: {
         showPop() {
            this.$refs.popup.open('bottom')
         },
         maskClose() {
            this.$emit('maskClose')
         },
         close() {
            this.$refs.popup.close()
         },
      },
   }
</script>

<style lang="scss" scoped>
   .downPopup {
      position: relative;
      z-index: 10;
      height: 680rpx;
      background-color: #fff;
      border-top-right-radius: 30rpx;
      border-top-left-radius: 30rpx;


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

      .tip {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         text:first-child {
            color: #6597FA;
         }

         .time {
            color: #6597FA;
            display: inline-block;
            font-size: 30px;
            font-weight: bold;
            font-family: 'Courier New', Courier, monospace;
            animation: wave-loading 1s ease-in-out infinite;
            animation-delay: calc(0.1s * var(--time));
         }

         @keyframes wave-loading {
            0% {
               transform: translateY(0px);
            }

            25% {
               transform: translateY(-10px);
            }

            50%,
            100% {
               transform: translateY(0px);
            }
         }

         .copywriting {
            margin-top: 30rpx;
            color: #6597FA;
         }
      }


      .btn {
         &>button:first-child {
            color: #fff;
            width: 70%;
            margin-top: 70rpx;
            background-color: #3679FF;
         }
      }
   }
</style>
