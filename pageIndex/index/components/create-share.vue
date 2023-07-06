<template>
  <div>
    <uni-popup ref="popup" type="bottom" :mask-click="false" :safe-area="false" class="create-share-popup">
      <view class="qr-bg">
        <text class="text-placeholder">扫码查看好友分享的文件</text>
      </view>
      <div class="inner-box">
        <view class="share-mode-box">
          <button class="wrapper-btn" open-type="share">
            <view class="wechat">
              <view class="wechat-icon">
                <image src="../../../static/wechat.png"></image>
              </view>
              <text>分享给好友</text>
            </view>
          </button>

          <view class="link" @tap="copyLink">
            <view class="link-icon">
              <image src="../../../static/link.png"></image>
            </view>
            <text>复制链接</text>
          </view>

          <view class="QR-code" @tap="saveImageToLocal">
            <view class="QR-code-icon">
              <image src="../../../static/QRcode.png"></image>
            </view>
            <text>保存二维码</text>
          </view>

        </view>
        <button class="close-btn" type="default" @tap="closePopup">关闭</button>
      </div>
    </uni-popup>
  </div>
</template>

<script>
  import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
  export default {
    methods: {
      open() {
        this.$refs.popup.open()
      },
      closePopup() {
        this.$refs.popup.close()
      },
      /**
       * @description 点击分享到好友
       * */
      shareToFriend() {
      },
      /**
       * @description 拷贝链接
       * */
      copyLink() {
        uniCopy({
          content: 'uni复制插件',
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
      /**
       * @description 保存二维码到本地相册
       * */
      saveImageToLocal() {
        uni.downloadFile({
          url: 'https://ts1.cn.mm.bing.net/th/id/R-C.efeea7fe9c2700fcff22483246e448db?rik=2GOGPn7eZvqd7A&riu=http%3a%2f%2fpic.zsucai.com%2ffiles%2f2013%2f0830%2fxiaguang4.jpg&ehk=WiVr1cmj4u7RnOhKcAbAFDCbcnEuMDMJc1g9GVQAoj8%3d&risl=&pid=ImgRaw&r=0',
          success: (res) => {
            if (res.statusCode === 200) {
              uni.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function() {
                  uni.showToast({
                    title: "保存成功",
                    icon: "none"
                  });
                },
                fail: function() {
                  uni.showToast({
                    title: "保存失败，请稍后重试",
                    icon: "none"
                  });
                }
              });
            }
          }
        })

      }
    }
  }
</script>

<style lang="scss" scoped>
  image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .create-share-popup {
    .qr-bg {
      height: 752rpx;
      margin-bottom: 40rpx;
      text-align: center;
      background: url('../../../static/QR-bg.png') no-repeat center;

      .text-placeholder {
        display: inline-block;
        width: 346rpx;
        line-height: 0;
        padding: 30rpx 15rpx;
        border-radius: 12rpx;
        margin-top: 140rpx;
        background-color: #D7E4FF;
        color: #3679FF;
        font-size: 25rpx;
        letter-spacing: 4rpx;
      }
    }


    .inner-box {
      position: relative;
      overflow: hidden;
      height: 450rpx;
      background-color: #fff;
      border-top-left-radius: 20rpx;
      border-top-right-radius: 20rpx;

      .share-mode-box {
        width: 80%;
        margin: 65rpx auto 0;
        display: flex;
        justify-content: space-between;

        .wrapper-btn {
          margin: unset;
          padding: unset;
          background-color: #fff;

          &:after {
            border: unset;
          }
        }

        .wechat,
        .link,
        .QR-code {
          text-align: center;

          &-icon {
            width: 100rpx;
            height: 100rpx;
          }

          &>text {
            display: inline-block;
            margin-top: 20rpx;
            font-size: 24rpx;
            color: #999999;
          }

        }


        .wechat>text {
          margin-top: 6rpx;
          display: block;
        }
      }

      .close-btn {
        position: absolute;
        left: 50%;
        bottom: calc(30rpx + env(safe-area-inset-bottom));
        transform: translateX(-50%);
        width: 480rpx;
        height: 86rpx;
        background-color: #F4F7FA;

      }
    }

  }
</style>
