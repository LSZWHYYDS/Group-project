<template>
	<view class="mark" v-if="isShow" @click="close">
		<view :class="bottom?'bottom':'center'" class="content">
			<view @click="close">
				<image class="close" src="../../static/close.svg"></image>
			</view>
			<slot name="title">
				<view class="title">子组件默认标题</view>
			</slot>
			<slot name="body"><text style="font-size: 28rpx;">确定要取消订单吗？取消之后购物车也将清空。</text></slot>
			<slot name="bottom">
				<view class="btns">
					<view class="confirm btn" @click="confirm">确定</view>
					<view class="cancel btn" @click="cancel">取消</view>
				</view>
			</slot>
		</view>
	</view>
</template>
<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}, // 子组件接收一个布尔类型的bottom，如果为true则弹窗则在页面的底部，false为默认居中显示bottom: {type: Boolean,default: false}},data() {return{}},methods: {close(){this.$emit('close')},cancel(){this.$emit('cancel')},confirm(){this.$emit('confirm')},}}
</script>
<style lang="scss">
	.mark {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.3);
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.bottom {
		position: absolute;
		bottom: 0;
		width: 100vw;
	}

	.center {
		width: 80vw;
		position: relative;
	}

	.content {
		background-color: #fff;
		border-radius: 20rpx;
		height: 400rpx;
		padding: 40rpx;
		box-sizing: border-box;

		.close {
			position: absolute;
			right: 30rpx;
			top: 20rpx;
			width: 40rpx;
			height: 40rpx;
		}

		.title {
			text-align: center;
			font-weight: 600;
			height: 50rpx;
			line-height: 50rpx;
			margin-bottom: 20rpx;
		}

		.btns {
			bottom: 40rpx;
			position: absolute;
			display: flex;
			justify-content: space-between;
			width: 88%;

			.btn {
				width: 160rpx;
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border-radius: 20rpx;
			}

			.confirm {
				background: bisque;
			}

			.cancel {
				background: #ccc;
			}
		}
	}
</style>
