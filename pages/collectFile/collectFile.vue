<template>
   <view>
      <view class="top-title">
         <view class="img-wrapper">
            <image src="../../static/Vector.png" mode=""></image>
         </view>
         <text>收集文件</text>
      </view>

      <view class="ul">
         <text>创建收集链接，一键收集多人提交的文件</text>
         <text>文件默认将于收集结束30天后失效并清空</text>
         <text>收集的文件可以通过【我的收集】选择转存到我的云盘</text>
      </view>


      <view class="input-box">
         <input type="text" placeholder="收集文件主题（20字内）..." placeholder-style="color:#999" />
         <textarea name="" id="" cols="30" rows="10" placeholder="收集说明（100字内，选填）..." placeholder-style="color:#999"></textarea>
      </view>


      <view class="end">
         <text>结束日期</text>

         <view class="data-timer">
            <uni-datetime-picker type="datetime" v-model="datetimesingle" @change="changeLog" :hide-second="true"
               :clear-icon="false" />
         </view>
      </view>


      <view class="submit" @tap="navigateToSuccessPage">
         <button type="default">创建收集</button>
      </view>
   </view>
</template>

<script>
   export default {
      data() {
         return {
            datetimesingle: Date.now()
         }
      },
      methods: {
         changeLog(newval) {
            console.log(newval);
         },

         navigateToSuccessPage(){
            uni.reLaunch({
            	url: '/pages/collectFile/collectSuccess'
            });
         }
      }
   }
</script>

<style lang="scss" scoped>
   .top-title {
      margin-top: 100rpx;
      margin-left: 30rpx;
      display: flex;
      align-items: center;

      .img-wrapper {
         width: 50rpx;
         height: 44rpx;
         margin-right: 20rpx;

         image {
            width: 100%;
            height: 100%;
         }
      }

      text {
         color: #3679FF;
         font-size: 40rpx;
      }
   }



   .ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 30rpx;
      margin-top: 30rpx;

      text {
         color: #999;
         margin-top: 20rpx;
         font-size: 25rpx;
      }

      text:before {
         content: '';
         vertical-align: middle;
         display: inline-block;
         width: 5px;
         height: 5px;
         border-radius: 50%;
         background-color: #999;
         margin-right: 10rpx;
      }
   }



   .input-box {
      margin-top: 50rpx;

      input,
      textarea {
         width: 90%;
         margin: 0 auto;
         background-color: #eceef0;
         padding: 20rpx;
         margin-top: 20rpx;
         border-radius: 20rpx;
      }

   }


   .end {
      margin-top: 30rpx;
      display: flex;
      justify-content: space-around;
      align-items: center;

      text {
         font-size: 38rpx;
         color: #888;
      }

      .data-timer {
         display: inline-block;
      }
   }

   .submit {
      button {
         width: 80%;
         margin-top: 100rpx;
         background-color: #3679FF;
         color: #fff;
         letter-spacing: 4rpx;
      }
   }
</style>
