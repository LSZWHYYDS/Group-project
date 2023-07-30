<template>
   <view class="wrapper">
      <button type="default" class="btn-view">查看文件列表</button>
      <button type="default" class="btn-download" @tap="openDownPopup">下载全部</button>
      <button type="default" class="btn-save">转存</button>
   </view>
</template>

<script>
   export default {
      name: 'button',
      data() {
         return {}
      },
      methods: {
         openDownPopup() {
            const hasTraffic = false ;
            hasTraffic ? this.$emit('haveTraffic') : this.$emit('noTraffic')
         }
      }
   }
</script>

<style lang="scss" scoped>
   .wrapper {

      .btn-view {
         width: 60%;
         color: #fff;
         margin-top: 55rpx;
         background-color: #3679FF;
      }

      .btn-download,
      .btn-save {
         margin: 30rpx auto 0;
         width: 60%;
         color: #3679FF;
         background-color: #D7E4FF;
      }
   }
</style>
