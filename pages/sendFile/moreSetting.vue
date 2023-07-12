<template>
  <view>
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
            <input :type="isShowPassword ? 'password' : 'text'" placeholder="请输入6-12位密码" placeholder-style="font-size:25rpx" />
            <image src="../../static/eyeIcon.png" @click="switchInputType"></image>
            <switch checked color="#007AFF" style="transform:scale(0.7)" />
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
        isShowPassword: false
      }
    },
    methods: {
      openMoreSetingPopup() {
        this.$refs.popup.open('bottom')
      },
      closeMoreSetingPopup() {
        this.$refs.popup.close()
      },
      switchInputType() {
        this.isShowPassword = !this.isShowPassword;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .moreSetting {
    height: 680rpx;
    background-color: #fff;
    border-top-right-radius: 30rpx;
    border-top-left-radius: 30rpx;

    .title {
      text-align: center;
      position: relative;
      padding-top: 10rpx;

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
      height: 90rpx;
      border-bottom: 1px solid #e8e8e8;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        text {
          color: #666;
          font-size: 30rpx;
          margin-left: 40rpx;
          font-weight: 500;
          letter-spacing: 5rpx;
        }
      }

      .right {
        display: flex;
        justify-content: flex-end;
        flex: 1;

        input {
          background-color: #F4F7FA;
          padding: 10rpx;
          border-radius: 10rpx;
        }

        image {
          width: 60rpx;
          height: 60rpx;
        }
      }
    }
  }
</style>
