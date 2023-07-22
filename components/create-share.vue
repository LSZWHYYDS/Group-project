<template>
   <view @touchmove.prevent.stop>
      <uni-popup ref="popup" type="bottom" :mask-click="false" :safe-area="false" class="create-share-popup">
         <view class="qr-bg">
            <!-- <text class="text-placeholder">扫码查看好友分享的文件</text> -->
            <view class="qr-wrapper">
               <image src="../../static/bg1.png" class="bg1" />
               <canvas type="" id="qrcode" canvas-id="qrcode" class="qrcodeStyle"></canvas>
            </view>
            <!-- *****不能把 type=“2d” ，不然无法绘制图形，如果要使用同一个 canvas，可以通过填空字符串实现。 -->
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
            required: false
         }
      },
      mounted() {
         this.generateQRcode()
      },
      methods: {
         open() {
            this.$refs.popup.open('bottom')
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
            qr.size = 165;
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

         .qr-wrapper {
            position: relative;
            width: 680rpx;
            height: 720rpx;
            background: url('data:image/png;base64,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') no-repeat center;
            background-size: cover;

            .bg1 {
               position: absolute;
               width: 100%;
               height: 562rpx;
               bottom: 0;
               left: 0;
            }

            .qrcodeStyle {
               position: absolute;
               width: 340rpx;
               height: 330rpx;
               bottom: 62rpx;
               left: 199rpx;
            }
         }

         // .text-placeholder {
         //    display: inline-block;
         //    width: 346rpx;
         //    line-height: 0;
         //    padding: 25rpx 15rpx;
         //    border-radius: 12rpx;
         //    margin-top: 180rpx;
         //    margin-bottom: 20rpx;
         //    background-color: #D7E4FF;
         //    color: #3679FF;
         //    font-size: 25rpx;
         //    letter-spacing: 4rpx;
         // }
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
