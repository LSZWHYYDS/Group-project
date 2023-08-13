<template>
   <view>
      <TopFileTheme fileIconType="type_1.svg" :fileData="fileData" />
      <!-- 如果文件是永久的话 FileDetails组件就不展示 -->
      <FileDetails />
      <FileStatus />
      <BtnCom @haveTraffic="handleOpenHavePopup" @noTraffic="handleOpenNoTrafficPopup" />

      <!-- 底部下载弹窗（有流量情况）  -->
      <FileDownPopup ref="downRef" />
      <!-- 底部下载弹窗（无流量情况） -->
      <NoTrafficPopup ref="trafficPopup" title="没有流量则进行购买" height="900rpx"
         :closeNoTrafficPopup="handleCloseNoTrafficPopup" :errorPopup="openErrorPopup">
         <!-- 没有流量 则引导购买 v-slot:default="slotProps" -->
         <TrafficDeficiency />
      </NoTrafficPopup>
      <!-- 点击完确定后 展示支付的弹窗 -->
      <BuyTraffic ref="buyTrafficRef" />
      <!-- 选择支付方式完毕后 进行展示支付成功 -->
      <BuySuccess ref="buySuccess" />
      <!-- 提示语文案 -->
      <uni-popup ref="message" type="message">
         <uni-popup-message type="error" style="text-align: center;" message="请正确输入手机号或邮箱!" :duration="2000">
         </uni-popup-message>
      </uni-popup>
   </view>
</template>

<script>
   import TopFileTheme from './components/fileTopInfo.vue'
   import FileDetails from './components/fileDetails.vue'
   import FileStatus from './components/fileStatus.vue'
   import FileDownPopup from './components/fileDownPopup.vue'
   import NoTrafficPopup from '@/components/trafficPopup.vue'
   import TrafficDeficiency from './components/trafficDeficiency.vue'
   import BuyTraffic from './components/buyTraffic.vue'
   import BtnCom from './components/button.vue'
   import BuySuccess from './components/buySuccess.vue'

   export default {
      name: 'havePassword',
      components: {
         TopFileTheme,
         FileDetails,
         FileStatus,
         FileDownPopup,
         NoTrafficPopup,
         TrafficDeficiency,
         BuyTraffic,
         BtnCom,
         BuySuccess
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
         handleOpenHavePopup() {
            this.$refs.downRef.showPop()
         },

         handleOpenNoTrafficPopup() {
            this.$refs.trafficPopup.showPop()
         },

         handleCloseNoTrafficPopup() {
            this.$refs.trafficPopup.close()
            this.handleOpenBuyPopup()
         },

         handleOpenBuyPopup() {
            this.$refs.buyTrafficRef.handleOpenBuyPopup()
         },

         openErrorPopup() {
            this.$refs.message.open()
         },

         openBuySuccesPopup(){
            this.$refs.buySuccess.open()
         }
      }
   }
</script>

<style lang="scss" scoped>


</style>
