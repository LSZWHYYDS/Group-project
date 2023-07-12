<template>
  <view @touchmove.prevent.stop>
    <uni-popup ref="popup" type="bottom" :mask-click="false" :safe-area="false" class="create-share-popup">
      <view class="qr-bg">
        <text class="text-placeholder">扫码查看好友分享的文件</text>
        <!-- *****不能把 type=“2d” ，不然无法绘制图形，如果要使用同一个 canvas，可以通过填空字符串实现。 -->
        <canvas type="" id="qrcode" canvas-id="qrcode" style="width: 200px;height: 200px;"></canvas>
      </view>
      <view class="inner-box">
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
        </view>
    </uni-popup>
  </view>
</template>

<script>
  import uniCopy from '@/js_sdk/xb-copy/uni-copy.js'
  import UQRCode from 'uqrcodejs'
  export default {
    props: {
      shareLink: {
        type: String,
        required: true
      }
    },
    mounted() {
      this.generateQRcode()
    },
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
      shareToFriend() {},
      /**
       * @description 拷贝链接
       * */
      copyLink() {
        uniCopy({
          content: this.shareLink,
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
        let that = this;
        //   })
        uni.canvasToTempFilePath({
          canvasId: 'qrcode',
          success: function(res) {
            let data = res.tempFilePath
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function() {
                uni.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000,
                })
              }
            });
          },
        }, that)
      },
      /**
       * @description 生成二维码
       * */
      generateQRcode() {
        // 获取uQRCode实例
        let qr = new UQRCode();
        // 设置二维码链接
        qr.data = this.shareLink;
        // 设置二维码大小，必须与canvas设置的宽高一致
        qr.size = 200;
        qr.margin = 10;
        // 调用制作二维码方法
        qr.make();
        // 获取canvas上下文
        let canvasContext = uni.createCanvasContext('qrcode', this); // 如果是组件，this必须传入
        // 设置uQRCode实例的canvas上下文
        qr.canvasContext = canvasContext;
        // 调用绘制方法将二维码图案绘制到canvas上
        qr.drawCanvas();
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
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
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
        margin-top: 180rpx;
        margin-bottom: 20rpx;
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
