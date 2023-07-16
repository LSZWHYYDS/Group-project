<template>
   <view @click="handleClick">
      <uni-popup ref="popup" type="bottom" :safe-area="false">
         <view class="moreSetting">
            <view class="title">
               <text>更多设置</text>
               <image src="../../static/close.svg" @click="closeMoreSetingPopup" />
            </view>

            <!-- 一层 设置密码 -->
            <view class="baseStyle">
               <view class="left">
                  <text>设置密码</text>
               </view>
               <view class="right">
                  <input :type="isShowPassword ? 'password' : 'text'" placeholder="请输入6-12位密码"
                     placeholder-style="font-size:25rpx;color:#999999" />
                  <image src="../../static/eyeIcon.png" class="left-margin" @click="switchInputType"
                     v-if="isShowPassword" />
                  <image src="../../static/yanjing_xianshi.png" class="left-margin" @click="switchInputType" v-else />
                  <switch checked color="#007AFF" style="transform:scale(0.7)" />
               </view>
            </view>

            <!-- 二层 设置密码 -->
            <view class="baseStyle">
               <view class="left">
                  <text>允许对方下载文件</text>
               </view>
               <view class="right">
                  <switch checked color="#007AFF" style="transform:scale(0.7)" />
               </view>
            </view>

            <!-- 三层 提供下载流量 -->
            <view class="baseStyle">
               <uni-transition mode-class="fade" :show="isShowPromptBox">
                  <view class="tips-box">
                     <text>对方下载的分享文件，消耗你的流量</text>
                  </view>
               </uni-transition>
               <view class="left">
                  <text style="margin-right: 10rpx;">提供下载流量</text>
                  <image src="../../static/Group.png" class="questionn-icon" @click.stop="exhibitionTips" />
               </view>
               <view class="right">
                  <switch checked color="#007AFF" style="transform:scale(0.7)" />
               </view>
            </view>

            <!-- 四层 剩余流量 -->
            <view class="baseStyle">
               <view class="left">
                  <text style="margin-right: 10rpx;">剩余流量: 5GB</text>
               </view>
               <view class="bottom-right">
                  <button type="default" class="buyTraffic" size="mini">购买</button>
               </view>
            </view>

         </view>
      </uni-popup>
   </view>
</template>

<script>
   export default {
      data() {
         return {
            isShowPassword: false,
            // 控制点击完?图标后 ，是否展示提示框
            isShowPromptBox: false,
         }
      },
      methods: {
         handleClick() {
            this.isShowPromptBox = false
         },
         openMoreSetingPopup() {
            this.$refs.popup.open('bottom')
         },
         closeMoreSetingPopup() {
            this.isShowPromptBox = false
            this.$refs.popup.close()
         },
         switchInputType() {
            this.isShowPassword = !this.isShowPassword
         },
         exhibitionTips() {
            this.isShowPromptBox = true
         },
      },
      computed: {}
   }
</script>

<style lang="scss" scoped>
   .moreSetting {
      position: relative;
      z-index: 10;
      height: 680rpx;
      background-color: #fff;
      border-top-right-radius: 30rpx;
      border-top-left-radius: 30rpx;

      .title {
         text-align: center;
         position: relative;
         padding-top: 15rpx;
         padding-bottom: 30rpx;
         border-bottom: 1px solid #EEEEEE;
         margin-bottom: 30rpx;

         text {
            vertical-align: -webkit-baseline-middle;
            color: #666666;
            font-size: 34rpx;
         }

         image {
            width: 80rpx;
            height: 80rpx;
            position: absolute;
            right: 0;
            vertical-align: middle;
         }
      }

      .baseStyle {
         position: relative;
         height: 110rpx;
         display: flex;
         justify-content: space-between;
         align-items: center;
         margin-right: 30rpx;

         // 专门针对三层进行提示框的样式编写
         .tips-box {
            position: absolute;
            top: -72rpx;
            left: 148rpx;
            padding: 25rpx;

            border-radius: 10rpx;
            background-color: #fff;
            box-shadow: 0px 2px 10px 0px #00000026;

            text {
               letter-spacing: 2px;
               color: #666666;
               font-size: 25rpx;
               line-height: 0;
            }
         }

         .left {
            text {
               color: #666;
               font-size: 30rpx;
               margin-left: 40rpx;
               font-weight: 500;
               letter-spacing: 5rpx;
            }

            .questionn-icon {
               width: 30rpx;
               height: 30rpx;
               vertical-align: bottom;
            }
         }

         .right {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex: 1;

            input {
               background-color: #F4F7FA;
               padding: 10rpx;
               padding-left: 15rpx;
               border-radius: 10rpx;
            }

            image {
               width: 50rpx;
               height: 50rpx;
            }

            .left-margin {
               margin-left: 20rpx;
            }
         }


         .bottom-right {

            .buyTraffic {
               margin-right: 20rpx;
               color: #0092FF;
               background-color: #E5EEFF;
            }
         }
      }
   }
</style>
