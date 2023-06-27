<template>
	<view class="prohibition">
		<view class="demo" :style="[{background},{color},{height},{paddingTop}]">
			<!-- 左侧返回按钮 -->
			<view class="left" @click="onBack" v-if="back" :style="[{color},{paddingTop}]">
				<uni-icons type="arrowleft" size="30" :color='color'></uni-icons>
				<!-- 此处图标使用的是 uni-ui图标 -->
			</view>
			<!-- 中间标题文字 -->
			<view class="title">
				{{title}}
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				height: 0, 
				paddingTop: 0,
				
			}
		},
		// props: ["title", "back"],
		props:{
			title:{ // 标题文字(默认为空)
				type:String,
				default:''
			},
			color:{ // 标题和返回按钮颜色(默认白色)
				type:String,
				default:'#fff'
			},
            //建议使用background  因为使用backgroundColor，会导致不识别渐变颜色
			background:{ // 背景颜色(不传值默认透明)
				type:String,
				default:'transparent'
			},
			back:{ // 是否显示返回按钮(不传值默认不显示)
				type:Boolean,
				default:false
			},
		},
		
		created() {
			const demo = uni.getMenuButtonBoundingClientRect()
			this.height = demo.height + "px"
			this.paddingTop = demo.top + "px"
 
		},
		methods: {
			// 左侧返回按钮调用
			onBack() {
				this.$emit("onBack")
			}
		}
	}
</script>
<style lang="less">
	.demo {
		position: relative;//注意，建议使用相对定位，因为固定定位会脱离文档流，然后你还要去设置marginTop值
		// position: fixed;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		z-index: 100;
		padding-bottom: 10rpx;
 
		.left {
			float: left;
			position: absolute;
			width: 100rpx;
			height: 50rpx;
			top: 0;
			bottom: 0;
			left: 20rpx;
			color: #fff;
			margin: auto;
		}
 
		.title {
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			// color: #FFFFFF;
		}
	}
</style>