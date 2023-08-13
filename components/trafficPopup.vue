<template>
   <uni-popup ref="popup" :safe-area="false" type="bottom" class="popup" @maskClick="maskClose" @close="close"
      :style="styleVar">
      <view class="warpper">
         <view class="top-style">
            <text>{{ title }}</text>
            <view class="right-close" @tap="close">
               <image src="../static/close.svg"></image>
            </view>
         </view>
         <slot></slot>
      </view>
   </uni-popup>
</template>

<script>
   export default {
      name: 'trafficPopup',
      inheritAttrs: true,
      props: {
         title: {
            type: String,
            default : '测试的提交标题'
         },
         height: {
            type: String,
            default: '600rpx'
         },
         closeNoTrafficPopup : {
            type : Function
         },
         errorPopup : {
            type : Function ,
         }
      },
      data() {

      },
      methods: {
         showPop() {
            console.log(this)
            this.$refs.popup.open('bottom')
         },
         maskClose() {
            this.$emit('maskClose')
         },
         close() {
            this.$refs.popup.close()
         },
      },

      computed: {
         styleVar() {
            return {
               '--height': this.height
            }
         }
      }
   }
</script>

<style scoped lang="scss">
   .popup {

      image{
         width: 100%;
         height: 100%;
         object-fit: contain;
      }

      .warpper {
         position: relative;
         height: var(--height);
         background-color: #fff;
         text-align: center;

         .right-close {
            width: 50rpx;
            height: 50rpx;
            position: absolute;
            right: 0;top: 15rpx;
            margin-right: 15rpx;
            margin-top: -3rpx;
         }

         .top-style {
            color: #666666;
            letter-spacing: 5rpx;
            padding: 20rpx 0;
            border-bottom: 1px solid #EEEEEE;
         }

      }

   }
</style>
