<template>
  <view id="box"  :style="{ 'padding-top': `${statusBarHeight}px` }">
    <view class="nav">
      <image class="image" src="../../static/setMenu-return.png"></image>
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
      <view class="setMeal-text"></view>
      <image class="images" src="../../static/setMenu_beijing.png" mode="widthFix"></image>
    </view>
    <!-- 购买套餐 -->
    <view class="time">
      <view class="time_nav">选择投买时间</view>
      <view class="time_one">
        <view v-for="item in num" class="time_one_item">一年</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        statusBarHeight: 0, //导航栏距离顶部的高度
        titleBarHeight: 0, //导航栏高度
        id:1,//1空间套餐2流量套餐
        num:5,//数字
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
    height: 100vh;
    box-sizing: border-box;
    overflow-y: auto;
    background-color: #000;
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
    .image{
      width: 18rpx;
      height: 34rpx;
    }
  }
  .kind{
    width: 100%;
    height: 160rpx;
    justify-content: center;
    & > view{
      width:240rpx;
      height: 72rpx;
      border-radius: 20rpx;
      background: #35394C;
      text-align: center;
      line-height: 72rpx;
      color: BAC1D1;
    }
     & > view:first-child{
       margin-right: 100rpx;
     }
     .kind-item{
       background-color: #B35F0220;
       color: #FACE83;
     }
  }
  // 套餐剩余
  .setMeal{
    width: 100%;
    box-sizing: border-box;
    position: relative;
    .setMeal-text{
      box-sizing: border-box;
      width:calc(100% - 48rpx);
      height: 200rpx;
      background: linear-gradient(to right, #F9D38A, #FFAD55,#F9D38A);
      border-radius: 20rpx;
      margin: 0 24rpx;
    }
    .images{
      width: 100%;
      position: absolute;
      bottom: -20rpx;
      left: 0;
    }
  }
  // 套餐选择
  .time{
    width: 100%;
    box-sizing: border-box;
    margin-top: 30rpx;
    .time_nav{
      width: 100%;
      box-sizing: border-box;
      padding: 0 24rpx;
      font-size: 24rpx;
      color: #BA812F;
    }
    .time_one{
      width: auto;
      box-sizing: border-box;
      padding: 0 24rpx;
      overflow-x: auto;
      margin: 10rpx 0 20rpx;
      font-size: 30rpx;
      display: flex;
      justify-content: left;
      .time_one_item{
        width: 260rpx;
        height: 68rpx;
        text-align: center;
        line-height: 68rpx;
        background-color: #513724;
        border-radius: 8rpx;
        color: #BA812F;
      }
    }
  }
</style>
