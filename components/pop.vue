<template>
	<uni-popup ref="popup" type="bottom" style="z-index:99999">
		<!-- <uni-popup-share></uni-popup-share> -->
		<view class="" style="width:100vw;height:300px;background-color:#fff;">
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
		}
	}

</script>

<style lang="scss" scoped>
	.vue-popup-dialog{
		z-index:10000 !important
	}
</style>