<template>
	<view>
		<view class="progress-bar" :style="{height: height,backgroundColor:dsColor}" v-if="textInside">
			<view class="progress" :style="{width: progressWidth, backgroundColor: bgColor,borderRadius: borderRadius}">
			</view>
			<span class="percentage" :style="{color:color,fontSize:fontSize }">{{ percentage }}%</span>
		</view>
		<view class="card-item" v-else>
			<view class="progress-bar1" :style="{height: height,backgroundColor:dsColor}">
				<view class="progress1"
					:style="{width: progressWidth, backgroundColor: bgColor,borderRadius: borderRadius}">
				</view>
			</view>
			<!-- <view class="percentage1" :style="{color:color,fontSize:fontSize }">{{ percentage }}%</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			//文字是否内显
			textInside: {
				type: Boolean,
				default: true
			},
			//当前进度
			progress: {
				type: Number,
				required: true,
				validator: (value) => value >= 0 && value <= 100,
				default: 50
			},
			//文字颜色
			color: {
				type: String,
				default: '#FFFFFF'
			},
			//文字大小
			fontSize: {
				type: String,
				default: '24rpx'
			},
			//进度条颜色
			bgColor: {
				type: String,
				default: '#5cb85c'
			},
			//进度条底色颜色
			dsColor: {
				type: String,
				default: '#f2f2f2'
			},
			//进度条高度
			height: {
				type: String,
				default: '28rpx'
			},
			//进度条圆角弧度
			borderRadius: {
				type: String,
				default: '8rpx'
			}
		},
		computed: {
			progressWidth() {
				return `${this.progress}%`
			},
			percentage() {
				return Math.round(this.progress)
			}
		}
	};
</script>

<style scoped>
	.progress-bar {
		position: relative;
		width: 100%;
		background-color: #f2f2f2;
		border-radius: 16rpx;
	}

	.percentage {
		position: absolute;
		top: 50%;
		left: 50%;
		color: #666;
		transform: translate(-50%, -50%);
		font-size: 24rpx;
		user-select: none;
		z-index: 1;
	}

	.progress {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
	}

	.card-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.progress-bar1 {
		position: relative;
		width: 90%;
		background-color: #f2f2f2;
		border-radius: 16rpx;
	}

	.percentage1 {
		color: #666;
		font-size: 24rpx;
	}

	.progress1 {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
	}
</style>
