<template>
   <view>
      <view class="operation-bar">
         <button type="default" size="mini">
            <text style="margin-right: 10rpx;">时间排序</text>
            <image src="@/static/oper-down.png" style="width: 30rpx;height: 30rpx;vertical-align: middle;"></image>
         </button>
         <button type="default" style="width: fit-content;padding: 0 15rpx;" size="mini">全选</button>
      </view>

      <view class="list" v-for="(item , index) of arr" :key="index">
         <view class="file-icon">
            <image src="@/static/type_1.svg" class="img"></image>
         </view>
         <view class="main">
            <text class="title">爱吃菠萝的女孩</text>
            <text class="details">
               <text>10个文件</text>
               <text> | </text>
               <text>2023/09/19 12:23</text>
            </text>
         </view>
         <view class="checkbox">
            <checkbox />
         </view>
      </view>
   </view>
</template>

<script>
   export default {
      data() {
         return {
            arr: [1, 2, 3, 4]
         }
      },
      methods: {

      }
   }
</script>

<style lang="scss" scoped>
   .img {
      width: 100%;
      height: 100%;
   }

   .operation-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 30rpx;

      button {
         width: 30%;
         padding: unset;
         color: #3679FF;
         font-size: 30rpx;
         background-color: #F4F7FA;

         &:first-child {
            margin-left: 20rpx;
         }

         &:last-child {
            margin-right: 20rpx;
         }
      }
   }


   .list {
      display: flex;
      align-items: center;
      margin-top: 30rpx;

      .file-icon {
         width: 100rpx;
         height: 100rpx;
         margin-left: 30rpx;
      }

      .main {
         display: flex;
         flex-direction: column;
         justify-content: center;
         margin-left: 30rpx;

         .title {
            color: #333333;
            margin: 10rpx 0;
         }

         .details {
            color: #999999;
         }
      }

      .checkbox {
         height: fit-content;
         margin-left: auto;
         margin-right: 30rpx;
      }
   }
</style>
