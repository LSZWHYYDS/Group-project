<template>
  <view class="container">


    <!-- 搜索栏UI -->
    <view class="cloud_top">
      <view class="search" @click="searchClick">
        <image src="@/pageIndex/img/searchSl.svg"></image>
        <text>搜索文件</text>
      </view>
      <view class="btn">
        <image @click="openSortPopup" src="@/pageIndex/img/sort.svg" style="margin-left: 20rpx;"></image>
        <image @click="selectAll" src="@/pageIndex/img/check.svg"></image>
      </view>
    </view>


    <!-- 排序UI -->
    <uni-popup ref="sortPop" type="bottom" :safe-area="false" @close="closeSortPopup">
      <view class="uniPop" style="padding-top:0">
        <view class="sortTitle">
          <text>排序方式</text>
          <image @click="closeSortPopup" src="@/static/close.svg" mode=""></image>
        </view>
        <view class="sort-px pop-button mtop15" style="position: relative;" :class="{ sortActive: 1 === sortNum}"
          @click="sortClick(1)">
          时间排序
          <image v-if="1 === sortNum" src="@/static/arrow.svg" mode=""></image>
        </view>
        <view class="sort-px pop-button mtop15" @click="sortClick(2)" :class="{ sortActive:2 === sortNum}"
          style="position: relative;">
          名称排序
          <image v-if="2 === sortNum" src="@/static/arrow.svg" mode=""></image>
        </view>
      </view>
    </uni-popup>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        sortNum: 1
      }
    },
    methods: {
      searchClick() {
        uni.navigateTo({
          url: "/pageIndex/index/searchCloud",
        })
      },

      openSortPopup() {
        this.$refs.sortPop.open('bottom');
      },

      closeSortPopup() {
        this.$refs.sortPop.close();
      },

      sortClick(num) {
        this.sortNum = num
      },
      shangchaun(){
        console.log("选择文件")
        wx.chooseMessageFile({
          count: 10,
          type:"all",
          success(e){
            console.log("成功",e);
          },fail(l) {
            console.log("失败",l);
          }
        })
      },
    }
  }
</script>


<style lang="scss" scoped>
  @import url("@/common/common.css");

  .container {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    font-family: 'PingFang SC';
    font-style: normal;

    .cloud_top {
      height: 72rpx;
      padding: 0 30rpx;
      display: flex;
      justify-content: space-between;
      position: fixed;
      // margin-top: 120rpx;
      background: #fff;

      .search {
        width: 510rpx;
        height: 72rpx;
        display: flex;
        align-items: center;
        background: #F7FAFD;
        border-radius: 20rpx;
        color: #9CA3AE;
        font-size: 28rpx;
        line-height: 40rpx;

        image {
          width: 32rpx;
          height: 32rpx;
          margin-right: 12rpx;
          margin-left: 18rpx;
        }
      }

      .btn {
        image {
          width: 60rpx;
          height: 60rpx;
        }

        :nth-child(1) {
          margin-right: 30rpx;
        }
      }

    }

    .select_top {
      height: 100rpx;
      padding: 0 50rpx;
      display: flex;
      justify-content: space-between;
      position: fixed;
      background: #fff;
      color: #333333;
      width: 100%;
      border-top: 2rpx solid #f4f4f4;
      border-bottom: 2rpx solid #f4f4f4;
      align-items: center;
      font-weight: 400;
      font-size: 28rpx;
      box-sizing: border-box;

      image {
        width: 60rpx;
        height: 60rpx;
      }
    }

    .breadCrum {
      position: fixed;
      top: 90rpx;
      display: flex;
      // margin-left: 40rpx;
      font-weight: 400;
      font-size: 24rpx;
      height: 100rpx;
      align-items: center;
      line-height: 34rpx;
      color: #333333;
      background: #fff;
      padding-top: 20rpx;
      width: 100%;
      box-sizing: border-box;
      padding: 0 40rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .sortActive {
      background: #D7E4FF;
      color: #3679FF;
    }

    .sortTitle {
      text-align: center;
      height: 100rpx;
      position: relative;
      line-height: 100rpx;
      border-bottom: 2rpx solid #eeeeee;
      color: #666666;
      font-weight: 400;
      font-size: 32rpx;

      image {
        width: 60rpx;
        height: 60rpx;
        position: absolute;
        right: 10rpx;
        top: 20rpx;
      }


    }

    .sort-px {
      image {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        right: 28rpx;
        top: 24rpx;
      }
    }
  }
</style>
