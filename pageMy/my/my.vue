<template>
  <view style="min-height: 100vh;background-color: #fff;box-sizing: border-box;padding-bottom: 168rpx;">
    <!-- 顶部导航 -->
    <view class="nav" :style="{ 'padding-top': `${statusBarHeight}px` }">
      <view class="my" :style="{'height':`${titleBarHeight}px`}">我的</view>
      <!-- 我的 -->
      <view class="my_main">
        <!-- 头像 -->
        <view class="my_img"></view>
        <view class="my_text">你好,小明</view>
      </view>
    </view>
    <!-- 整体 -->
    <view class="main">
      <!-- 免费 -->
      <view class="entirety entirety_mianfei">
        <!-- 说明 -->
        <view class="entirety_explain flex">
          <image src="../../static/MY_exempt.png" style="width: 40rpx;height: 40rpx;"></image>
          <text>今日免费下载流量</text>
        </view>
        <!-- 剩余 -->
        <view class="entirety_residue">
          <view class="entirety_residue_view"> </view>
        </view>
        <!-- 文字备注 -->
        <view class="entirety_text flex">
          <text>0.3GB / 1GB</text>
          <text>剩余98%</text>
        </view>
      </view>
      <!-- 云盘空间 -->
      <view :class="cloud_storage=='1'?'entirety_cloud_storage1 entirety':'entirety_cloud_storage2 entirety'">
        <!-- 说明 -->
        <view class="entirety_explain flex">
          <view style="font-size: 28rpx;">云盘空间</view>
          <view class="entirety_btn" @click="btn">扩容</view>
        </view>
        <!-- 剩余 -->
        <view class="entirety_residue">
          <view class="entirety_residue_view"> </view>
        </view>
        <!-- 文字备注 -->
        <view class="entirety_text flex">
          <text>0.3GB / 1GB</text>
          <text>剩余98%</text>
        </view>
      </view>
      <!-- 分享；流量 -->
      <view :class="cloud_storage=='1'?'entirety_cloud_storage1 entirety':'entirety_cloud_storage2 entirety'">
        <!-- 说明 -->
        <view class="entirety_explain flex">
          <view style="font-size: 28rpx;">分享流量</view>
          <view class="entirety_btn" @click="btn">购买</view>
        </view>
        <!-- 剩余 -->
        <view class="entirety_residue">
          <view class="entirety_residue_view"> </view>
        </view>
        <!-- 文字备注 -->
        <view class="entirety_text flex">
          <text>0.3GB / 1GB</text>
          <text>剩余98%</text>
        </view>
      </view>
      <!-- 信息 -->
      <view class="entirety message_box" style="background-color: #F3F7FF;">
        <!-- 电子邮箱 -->
        <view class="message flex">
          <view> 电子邮箱</view>
          <black v-if="true">
            <view style="color: #000;"> 12345678910@QQ.com</view>
          </black>
          <black v-else>
            <view style="color: #3679FF;"> 去修改</view>
          </black>
        </view>
        <view class="message flex">
          <view> 绑定手机号</view>
          <black v-if="true">
            <view style="color: #000;"> 12345678910@QQ.com</view>
          </black>
          <black v-else>
            <view style="color: #3679FF;"> 去修改</view>
          </black>
        </view>
        <view class="message flex">
          <view> 修改密码</view>
          <view style="color: #000;" @click="xiugai"> 去修改</view>
        </view>
        <view class="message flex">
          <view> 绑定微信</view>
          <black v-if="true">
            <view style="color: #000;"> 12345678910@QQ.com</view>
          </black>
          <black v-else>
            <view style="color: #3679FF;"> 去修改</view>
          </black>
        </view>
      </view>
      <!-- 常见问题 -->
      <view class="entirety message_box" style="background-color: #F3F7FF;">
        <view class="message flex">
          <view> 常见问题</view>
          <image src="../../static/arrowBot.png" style="width: 20rpx;height: 20rpx;transform: rotate(-90deg);"></image>
        </view>
      </view>
    </view>
    <tabber pagePath="/pageMy/my/my"></tabber>
    <!-- 修改密码 -->
    <view class="modification" v-if="conceal">
      <view class="modification_nav flex">
        <image src="../../static/my_quxiao.png"  @click="xiugai" style="width: 60rpx;height: 60rpx;"></image>
        <view class="">修改密码</view>
        <view class="entirety_btn entirety_btn_mima" @click="xiugai(1)">确定</view>
      </view>
      <view class="modification_main">
        <input class="input" type="text" value="" placeholder="旧密码">
        <input class="input" type="text" value="" placeholder="新密码">
        <input class="input" type="text" value="" placeholder="再输一遍">
      </view>
    </view>
  </view>
</template>

<script>
  import tabber from "@/components/tabber.vue";
  export default {
    data() {
      return {
        statusBarHeight: 0, //导航栏距离顶部的高度
        titleBarHeight: 0, //导航栏高度
        cloud_storage: 1, //云盘空间 分享;流量样式 1没充钱2充钱
        conceal:false,//修改密码
      };
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
    components: {
      tabber
    },
    methods: {
      // 修改密码
      xiugai(i){
        if(i===1){
          console.log("点击确定");
          this.conceal=!this.conceal
        }else{
          this.conceal=!this.conceal
        }
      },
      // 跳转购买
      btn(id){
       uni.navigateTo({
       	url: '/pageMy/setMenu/setMenu'
       });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .flex {
    display: flex;
    align-items: center;
  }

  .nav {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 440rpx;
    background: linear-gradient(to bottom, #3679FF, #fff);

    .my {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    .my_main {
      width: 100%;
      box-sizing: border-box;
      text-align: center;

      .my_img {
        width: 134rpx;
        height: 134rpx;
        background-color: #3679FF;
        overflow: hidden;
        margin: 24rpx auto;
        border-radius: 50%;
      }
    }
  }

  .main {
    width: 100%;
    box-sizing: border-box;
    padding: 0 24rpx;

    .entirety {
      width: 100%;
      box-sizing: border-box;
      border-radius: 20rpx;
      padding: 24rpx;
      background: #3679FF;
      font-size: 24rpx;
      margin-bottom: 30rpx;

      .entirety_residue {
        width: 100%;
        height: 12rpx;
        border-radius: 12rpx;
        background-color: #D7E4FF;
        margin: 20rpx 0;
        position: relative;

        .entirety_residue_view {
          position: absolute;
          height: 100%;
          width: 10%;
          top: 0;
          left: 0;
          border-radius: 12rpx;
          background-color: #fff;
        }
      }

      .entirety_text {
        justify-content: space-between;
      }

      // 信息
      .message {
        height: 100rpx;
        color: #666;
        font-size: 30rpx;
        justify-content: space-between;
      }
    }

    .entirety_cloud_storage1 {
      font-size: 24rpx;
      color: #000;
      background: #F3F7FF;

      .flex {
        justify-content: space-between;
      }

      .entirety_residue {
        .entirety_residue_view {
          background-color: #3679FF;
        }
      }

      .entirety_text {
        color: #666;
      }
    }

    .message_box {
      padding: 0 24rpx;
    }

    // 免费流量
    .entirety_mianfei {
      // height: 160rpx !important;
      color: #FFF;

      image {
        margin-right: 10rpx;
      }
    }
  }

  // 按钮
  .entirety_btn {
    width: 150rpx;
    height: 75rpx;
    text-align: center;
    line-height: 75rpx;
    background-color: #D7E4FF;
    border-radius: 20rpx;
    color: #3679FF;
  }

  .entirety_btn_mima {
    border: 1px solid #3679FF;
    background: #fff;
  }

  // x修改密码
  .modification {
    width: 100%;
    position: fixed;
    border-radius: 40rpx 40rpx 0 0;
    box-sizing: border-box;
    left: 0;
    bottom: 0rpx;
    color: #666;
    z-index: 9999;

    .modification_nav {
      width: 100%;
      height: 100rpx;
      justify-content: space-between;
      border-bottom: 1px solid #EEEEEE;
      box-sizing: border-box;
      padding: 0 40rpx;
      background-color: #fff;
    }

    .modification_main {
      width: 100%;
      box-sizing: border-box;
      padding: 40rpx 40rpx 20rpx;
      background-color: #fff;
      .input {
        width: 100%;
        height: 100rpx;
        border-radius: 24rpx;
        background-color: #F6F6F6;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        padding: 24rpx;
      }
    }
  }
</style>
