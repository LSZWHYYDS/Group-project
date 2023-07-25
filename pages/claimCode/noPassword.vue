<template>
   <view class="wrapper">
      <TopFileTheme fileIconType="type_1.svg" :fileData="fileData" />
      <FileDetails />
      <text class="text">
         该文件设置了密码保护
      </text>

      <input type="text" class="input-style" placeholder="请输入密码">

      <button type="default">确定</button>
   </view>

</template>

<script>
   import TopFileTheme from './components/fileTopInfo.vue'
   import FileDetails from './components/fileDetails.vue'

   export default {
      name: "noPassword",
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
   .wrapper{
      text-align: center;

      .text {
         display: inline-block;
         color: #717E98;
         margin: 80rpx;
      }

      .input-style{
         width: 65%;
         height: 80rpx;
         line-height: 80rpx;
         margin: 0 auto;
         border-radius: 10rpx;
         background-color: #e9e9ea
      }

      button {
         width: 65%;
         margin: 50rpx auto 0;
         background-color: #3679FF;
         color: #fff;
      }

   }

</style>
