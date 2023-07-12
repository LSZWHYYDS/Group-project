<template>
	<uni-popup ref="popup" :safe-area="false" type="bottom"  style="z-index:99999;" @maskClick="maskClose" @close="close">
		<!-- <uni-popup-share></uni-popup-share> -->
		<view class="uniPop">
			<slot></slot>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		data() {
			return {
			};
		},
		methods: {
			showPop() {
				this.$refs.popup.open('bottom')
			},
			maskClose(){
				this.$emit('maskClose')
			},
			close(){
        this.$refs.popup.close()
			},
		},
	}

</script>

<style lang="scss" scoped>
	.vue-popup-dialog{
		z-index:10000 !important
	}
	.uniPop {
		width:100vw;
		background-color:#fff;
		padding: 20rpx;
		box-sizing: border-box;
		border-top-left-radius: 40rpx;
		border-top-right-radius: 40rpx;
		padding-bottom:80rpx;
	}
</style>
