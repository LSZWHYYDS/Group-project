<template>
   <view>
      <l-liquid :percent="target1" v-model:current="modelVale1" outline size="170px">
         <view class="info" v-if="!(target1 >= 100)">
            <text class="text">{{modelVale1}}<text class="unit">%</text></text>
            <text>{{ uploadSpeedResult }}</text>
         </view>
         <view v-else>
            <image src="../../static/correct.png" class="correct"></image>
         </view>
      </l-liquid>
   </view>
</template>

<script>
   import {
      ref,
      defineComponent,
      computed,
      onMounted,
      watch,
      toRef
   } from '../l-liquid/vue';
   let timer
   export default {
      setup(props) {
         const target1 = ref(80)
         const modelVale1 = ref(20)
         const uploadSpeed = ref(1.01)
         const uploadHdrographRef = ref(null)

         const uploadSpeedResult = computed(() => {
            return `${uploadSpeed.value} MB/s`
         })

         const onClick = number => {
            target1.value = Math.max(Math.min(100, target1.value + number), 0)
         }

         watch(() => target1.value, (value, oldValue) => {
            if (value >= 100) {
               props.handleUploadCompleted()
            }
         })

         onMounted(() => {})

         return {
            target1,
            modelVale1,
            uploadSpeedResult,
            onClick,
            uploadHdrographRef: toRef(uploadHdrographRef)
         }
      }
   }
</script>

<style lang="scss">
   .text {
      font-size: 50rpx;
      font-weight: 600;
      color: white;
      /* text-shadow: 0 0 20rpx #007aff */
      text-shadow: 0 0 20rpx rgba(0, 0, 0, 0.4) //rgb(0 122 255 / 50%)
   }

   .unit {
      font-size: 0.5em;
   }

   .info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #fff;
   }

   .correct {
      width: 70rpx;
      height: 80rpx;
      transform: rotate(15deg);
   }

   .custom {
      --l-liquid-border-radius: 20px;
      --l-liquid-inner-border-radius: 10px;
      --l-liquid-wave-color: linear-gradient(0deg, blue 0%, #fa6419 100%);
      --l-liquid-border-color: #5221b5;
   }
</style>
