<template>
   <view id="box" :style="{ 'padding-top': `${statusBarHeight}px` }">
      <image src="../../static/setMenu_background.png" mode="widthFix" style="position: absolute;top: 0;left: 0;width: 100%;" ></image>
      <view class="nav">
         <image class="image" @click="fanhui" src="../../static/setMenu-return.png"></image>
         <view> 我的</view>
         <view></view>
      </view>
      <!-- 套餐选择 -->
      <view class="kind flex">
         <view :class="ids===1?'kind-item':''" @click="select_btn(1)">空间套餐</view>
         <view :class="ids===2?'kind-item':''" @click="select_btn(2)">流量套餐</view>
      </view>
      <!-- 套餐剩余 -->
      <view class="setMeal" >
         <!-- 空间 -->
         <view class="setMeal-text flex"  v-if="ids==1">
           <view class="flex">
              <image class=".setMeal-text_image" src="../../static/setMenu_one.png" ></image>
              <view style="margin-left: 20rpx;color: #B35F02;">
                 <view style="font-size: 30rpx;margin-bottom: 10rpx;">云盘空间</view>
                 <view style="font-size: 20rpx;">暂未升级空间容量</view>
              </view>
           </view>
            <image  class=".setMeal-text_image" src="../../static/setMenu_two.png"></image>
         </view>
         <!-- 流量 -->
         <view class="setMeal-text flex" v-else style="background: linear-gradient(to right, #19EF95, #0AC778, #0AC778,#10F695);">
           <view class="flex">
              <image class=".setMeal-text_image" src="../../static/setMenu_three.png" ></image>
              <view style="margin-left: 20rpx;color: #00854D;">
                 <view style="font-size: 30rpx;margin-bottom: 10rpx;">分享流量</view>
                 <view style="font-size: 20rpx;">分享流量剩余 12.8 GB</view>
              </view>
           </view>
            <image  class=".setMeal-text_image" src="../../static/setMenu_four.png"></image>
         </view>
         <image class="images" src="../../static/setMenu_beijing.png" mode="widthFix"></image>
      </view>
      <!-- 购买套餐 -->
      <view class="time">
         <block v-if="ids==1">
         <view class="time_nav">选择投买时间</view>
         <scroll-view class="time_one" scroll-x="true">
            <!--  -->
            <view v-for="(item,index) in num" :key="item" :class="interspace==index?'time_one_item orange':'time_one_item'" @click="interspace=index" >一年</view>
         </scroll-view>
         <view class="time_nav">选择购买空间</view>
         <scroll-view class="time_one" scroll-x="true">
            <view v-for="(item,index) in num" :key="item" :class="interspace_time==index?'time_two_item orange':'time_two_item'" @click="interspace_time=index" >
               <view class="time_two_item_text">100G</view>
               <view class="time_two_item_RMB"><text style="font-size: 28rpx;" >¥</text>98</view>
               <view class="time_two_item_btn orange_btn">非常划算</view>
            </view>
         </scroll-view>
         </block>
         <block v-else>
              <view class="time_nav time_nav2">选择投买套餐</view>
              <scroll-view class="time_one" scroll-x="true">
                 <view v-for="(item,index) in num" :key="item" :class="flow_time==index?'time_two_item time_two_item2 orange2':'time_two_item time_two_item2'" @click="flow_time=index" >
                    <view class="time_two_item_text">100G</view>
                    <view class="time_two_item_RMB"><text style="font-size: 28rpx;" >¥</text>98</view>
                    <view class="time_two_item_btn orange_btn">非常划算</view>
                 </view>
              </scroll-view>
         </block>
         <view class="time_nav rule">购买提示</view>
         <view class="time_nav rule">1、任何身份（普通用户、个人 VIP 用户、企业 VIP 用户）均可额外购买分享流量</view>
         <view class="time_nav rule">2、此为一次性分享流量，不会过期、用完为止。您给他人发送（分享）的文件，对方可免费下载、预览（播放）</view>
         <view class="time_nav rule">3、优先消耗系统赠送的下载流量，然后再消耗额外购买的下载流量（小文件不会消耗下载流量）</view>
         <view class="time_nav rule">4、对方下载文件后，一定时间内可多次下载相同文件，而不会再消耗你的下载流量（保证对方成功率）</view>
         <view class="time_nav rule">5、购买前，请确保您已阅读《悟空快传用户服务协议》、《悟空快传用户付费服务协议》且同意所有条款</view>
         <view class="time_nav rule">6、由于云产品的特殊性，购买成功即表示已消费，不支持退款服务</view>
      </view>
      <view :class=" ids==1?'buttons':'buttons buttonss'">确认支付¥98</view>
   </view>
</template>
<script>
   export default {
      data() {
         return {
            statusBarHeight: 0, //导航栏距离顶部的高度
            titleBarHeight: 0, //导航栏高度
            ids: 1, //1空间套餐2流量套餐
            num: 5, //套餐个数
            interspace:0,//选中的空间套餐
            interspace_time:0,//选中的大小
            flow_time:0,//
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
         // 返回上一页
         fanhui(){
            uni.navigateBack({
               delta: 1
            })
         },
         // 更改套餐
         select_btn(i){
            console.log(i,this.ids);
            this.ids=i
         },
      }
   }
</script>

<style lang="scss" scoped>
   .flex {
      display: flex;
      align-items: center;

   }

   #box {
      position: relative;
      width: 100%;
      min-width: none;height: 100vh;
      box-sizing: border-box;
      overflow-y: auto;
      background: #2A283D;
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
      position: relative;
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
      .time_nav2{
          color: #0AC678;
      }
      .time_one {
         width: 100%;
         box-sizing: border-box;
         padding-left: 24rpx;
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
             border: 4rpx solid #BA812F;
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
         .time_two_item2{
            border: 4rpx solid #0DDE86;
             background-color: #0DDE8640;
               color: #1F9C67;
               .time_two_item_btn{
                  background-color: #0AC678;
                  color: #0E4E33;
               }
         }
      }
   }
   .rule{
      color: #999 !important;
      margin-bottom: 10rpx;
   }
   // 空间按钮
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
   .buttonss{
       background: linear-gradient(to right, #12BC75, #0BEC8D);
   }
   // 选中干的的空间套餐
   .orange{
      border: 4rpx solid #FFE7C0 !important;
      background-color: #FACB7F !important;
      color: #B35F02 !important;
      .orange_btn{
         background-color: #93600A !important;
         color: #FACB7F !important;
      }
   }
   .orange2{
      border: 4rpx solid #06E98B !important;
      background-color: #0AC678 !important;
      color: #B7FFE1 !important;
      .orange_btn{
         background-color: #9EF2CF !important;
         color: #1F9C67 !important;
      }
   }
</style>
