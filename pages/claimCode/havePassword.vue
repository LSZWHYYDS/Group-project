<template>
   <view class="">
      <TopFileTheme fileIconType="type_1.svg" :fileData="fileData" />
      <FileDetails/>
      <view>
         <!-- 文件夹文本说明 -->
         <view class="folder">
            <view class="folder-one">
               <image src="../../static/down.svg" class="img-down"></image>
               <text>2023年04月01日 12:00 失效</text>
            </view>

            <view class="folder-two">
               <image src="../../static/time.png" class="img-down"></image>
               <text>下载次数剩余 44/100</text>
            </view>
         </view>


      </view>
   </view>
</template>

<script>
   import TopFileTheme from './components/fileTopInfo.vue'
   import FileDetails from './components/fileDetails.vue'

   export default {
      name: 'havePassword',
      components: {
         TopFileTheme,
         FileDetails
      },
      data() {
         return {
            fileData: {
               fileNumber: 1,
               fileSize: 10
            }
         }
      },

      methods: {

      }
   }
</script>

<style lang="scss" scoped>

   .folder{

      .folder-one ,
      .folder-two{
         margin: 20rpx 30rpx;
         padding: 20rpx;
         border-radius: 20rpx;
         background-color: #eaeaea;
         margin: 30rpx;
      }

      .img-down{
         width: 50rpx;
         height: 50rpx;
         margin-left: 10rpx;
         margin-right: 10rpx;
         vertical-align: middle;
      }

      text {
         color : #717E98;
      }
   }
</style>
