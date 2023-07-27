<template>
   <view class="">
      <TopFileTheme fileIconType="type_1.svg" :fileData="fileData" />
      <FileDetails />
      <FileStatus />
      <BtnCom />
   </view>
</template>

<script>
   import TopFileTheme from './components/fileTopInfo.vue'
   import FileDetails from './components/fileDetails.vue'
   import FileStatus from './components/fileStatus.vue'
   import BtnCom from './components/button.vue'

   export default {
      name: 'havePassword',
      components: {
         TopFileTheme,
         FileDetails,
         FileStatus,
         BtnCom
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


</style>
