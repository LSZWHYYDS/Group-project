<template>
   <view @touchmove.prevent.stop>
      <uni-popup ref="popup" type="bottom" :mask-click="false" :safe-area="false" class="create-share-popup">
         <view class="qr-bg">
            <view class="qr-wrapper" v-if="!(type === 'collect-bg')">
               <image src="../../static/bg1.png" class="bg1" />
               <!-- *****不能把 type=“2d” ，不然无法绘制图形，如果要使用同一个 canvas，可以通过填空字符串实现。 -->
               <canvas type="" id="qrcode" canvas-id="qrcode" class="qrcodeStyle"></canvas>
            </view>

            <!-- <text class="text-placeholder">扫码查看好友分享的文件</text> -->
            <view class="qr-wrapper-collectBg" v-else>
               <!-- *****不能把 type=“2d” ，不然无法绘制图形，如果要使用同一个 canvas，可以通过填空字符串实现。 -->
               <canvas type="" id="qrcode" canvas-id="qrcode" class="qrcodeStyle"></canvas>
            </view>

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
         },
         type: {
            type: String
         }
      },
      mounted() {
         this.generateQRcode()
         console.log(this.type);
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
            if (this.type === 'collect-bg') {
               qr.size = 130;
            } else {
               qr.size = 155;
            }
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

         .qr-wrapper,
         .qr-wrapper-collectBg {
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
               bottom: 55rpx;
               left: 207rpx;
            }
         }




         .qr-wrapper-collectBg {
            background: url(data:image/png;base64,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) no-repeat center;

            .qrcodeStyle {
               position: absolute;
               bottom: 88rpx;
               left: 228rpx;
               width: 290rpx;
               height: 270rpx;
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
