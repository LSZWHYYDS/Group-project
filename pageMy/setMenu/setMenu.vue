<template>
   <view id="box" :style="{ 'padding-top': `${statusBarHeight}px` }">
      <view class="nav">
         <image class="image" @click="fanhui" src="../../static/setMenu-return.png"></image>
         <view> 我的</view>
         <view></view>
      </view>
      <!-- 套餐选择 -->
      <view class="kind flex">
         <view :class="id===1?'kind-item':''">空间套餐</view>
         <view :class="id===2?'kind-item':''">流量套餐</view>
      </view>
      <!-- 套餐剩余 -->
      <view class="setMeal">
         <view class="setMeal-text flex">
           <view class="flex">
              <image class=".setMeal-text_image" src="../../static/setMenu_one.png" ></image>
              <view style="margin-left: 20rpx;color: #B35F02;">
                 <view style="font-size: 30rpx;margin-bottom: 10rpx;">云盘空间</view>
                 <view style="font-size: 20rpx;">暂未升级</view>
              </view>
           </view>
            <image  class=".setMeal-text_image" src="../../static/setMenu_two.png"></image>
         </view>
         <image class="images" src="../../static/setMenu_beijing.png" mode="widthFix"></image>
      </view>
      <!-- 购买套餐 -->
      <view class="time">
         <view class="time_nav">选择投买时间</view>
         <scroll-view class="time_one" scroll-x="true">
            <view v-for="item in num" :key="item" class="time_one_item">一年</view>
         </scroll-view>
         <view class="time_nav">选择购买空间</view>
         <scroll-view class="time_one" scroll-x="true">
            <view v-for="item in num" :key="item" class="time_two_item">
               <view class="time_two_item_text">100G</view>
               <view class="time_two_item_RMB"><text style="font-size: 28rpx;" >¥</text>98</view>
               <view class="time_two_item_btn">非常划算</view>
            </view>
         </scroll-view>
         <view class="time_nav rule">购买提示</view>
         <view class="time_nav rule">1、任何身份（普通用户、个人 VIP 用户、企业 VIP 用户）均可额外购买分享流量</view>
         <view class="time_nav rule">2、此为一次性分享流量，不会过期、用完为止。您给他人发送（分享）的文件，对方可免费下载、预览（播放）</view>
         <view class="time_nav rule">3、优先消耗系统赠送的下载流量，然后再消耗额外购买的下载流量（小文件不会消耗下载流量）</view>
         <view class="time_nav rule">4、对方下载文件后，一定时间内可多次下载相同文件，而不会再消耗你的下载流量（保证对方成功率）</view>
         <view class="time_nav rule">5、购买前，请确保您已阅读《悟空快传用户服务协议》、《悟空快传用户付费服务协议》且同意所有条款</view>
         <view class="time_nav rule">6、由于云产品的特殊性，购买成功即表示已消费，不支持退款服务</view>
      </view>
      <view class="buttons">确认支付¥98</view>
   </view>
</template>
<script>
   export default {
      data() {
         return {
            statusBarHeight: 0, //导航栏距离顶部的高度
            titleBarHeight: 0, //导航栏高度
            id: 1, //1空间套餐2流量套餐
            num: 5, //数字
         }
      },
      onLoad() {
         let menuButtonObject = uni.getMenuButtonBoundingClientRect(); //获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
         uni.getSystemInfo({
            //获取系统信息
            success: res => {
               let navHeight = menuButtonObject.height + (menuButtonObject.top - res.statusBarHeight) *
                  2; //导航栏高度=菜单按钮高度+（菜单按钮与顶部距离-状态栏高度）*2
               this.titleBarHeight = navHeight;
               this.statusBarHeight = res.statusBarHeight;
               // 导航栏高度
               console.log(this.titleBarHeight, "导航栏高度");
               // 导航栏距顶高度
               console.log(this.statusBarHeight, "导航栏距顶高度");
            },
            fail(err) {
               // console.log(err);
            }
         });
      },
      methods: {
         fanhui(){
            uni.navigateBack({
               delta: 1
            })
         }
      }
   }
</script>

<style lang="scss" scoped>
   .flex {
      display: flex;
      align-items: center;
   }

   #box {
      width: 100%;
      min-width: none;height: 100vh;
      box-sizing: border-box;
      overflow-y: auto;
      background-color: #000;
      // overflow: hidden;
   }

   .nav {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 100rpx;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24rpx;

      .image {
         width: 18rpx;
         height: 34rpx;
      }
   }

   .kind {
      width: 100%;
      height: 120rpx;
      justify-content: center;

      &>view {
         width: 240rpx;
         height: 72rpx;
         border-radius: 20rpx;
         background: #35394C;
         text-align: center;
         line-height: 72rpx;
         color: BAC1D1;
      }

      &>view:first-child {
         margin-right: 100rpx;
      }

      .kind-item {
         background-color: #B35F0220;
         color: #FACE83;
      }
   }

   // 套餐剩余
   .setMeal {
      width: 100%;
      box-sizing: border-box;
      position: relative;

      .setMeal-text {
         box-sizing: border-box;
         padding: 24rpx 24rpx 0;
         width: calc(100% - 48rpx);
         height: 200rpx;
         background: linear-gradient(to right, #F9D38A, #FFAD55, #F9D38A);
         border-radius: 20rpx;
         margin: 0 24rpx;
         justify-content: space-between;
         align-items: flex-start;
         .setMeal-text_image{
            width: 66rpx;
            height: 66rpx;
         }
      }

      .images {
         width: 100%;
         position: absolute;
         bottom: -20rpx;
         left: 0;
      }
   }

   // 套餐选择
   .time {
      width: 100%;
      box-sizing: border-box;
      margin-top: 30rpx;

      .time_nav {
         width: 100%;
         box-sizing: border-box;
         padding: 0 24rpx;
         font-size: 24rpx;
         color: #BA812F;
      }

      .time_one {
         width: 100%;
         box-sizing: border-box;
         padding: 0 24rpx;
         margin: 10rpx 0 20rpx;
         font-size: 30rpx;
         white-space: nowrap;

         .time_one_item {
            display: inline-block;
            width: 260rpx;
            height: 68rpx;
            text-align: center;
            line-height: 68rpx;
            background-color: #513724;
            border-radius: 8rpx;
            color: #BA812F;
            margin-right: 20rpx;
         }
         .time_two_item{
            display: inline-block;
            width: 260rpx;
            height: 260rpx;
            background-color: #513724;
            border-radius: 20rpx;
            color: #BA812F;
            margin-right: 20rpx;
            box-sizing: border-box;
            text-align: center;
            padding: 20rpx 0;
            .time_two_item_text{
               font-size: 32rpx
            }
            .time_two_item_RMB{
               font-size: 72rpx;
               margin: 20rpx 0 10rpx;
            }
            .time_two_item_btn{
               font-size: 20rpx;
               width: 120rpx;
               height: 40rpx;
               border-radius: 40rpx;
               line-height: 40rpx;
               text-align: center;
               background-color: #BA812F;
               color: #413520;
               margin: 0 auto;
            }
         }
         .time_two_item:last-child{
            margin-right: 0rpx;
         }
         .time_one_item:last-child{
             margin-right: 0rpx;
         }
      }
   }
   .rule{
      color: #999 !important;
      margin-bottom: 10rpx;
   }
   .buttons{
      width: calc(100% - 48rpx);
      margin: 10rpx auto;
      height: 100rpx;
      line-height: 100rpx;
      border-radius: 20rpx;
      text-align: center;
      font-size: 34rpx;
      color: #B35F02;
      background: linear-gradient(to right, #F9D38A, #FFAD55, #F9D38A);
   }
</style>
