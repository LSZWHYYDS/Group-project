<template>
	<view class="container">
		<view class="btn" @click="open">显示弹出层</view>
		<popup :isShow='visible' :bottom='true' @close="closeMadle" @cancel="cancel" @confirm="confirm">
			<template
				v-slot:title>
				<view class="title">父组件自定义标题</view>
			</template>
			<template v-slot:body>
				<view class="body">这里是父组件引用子组件，使用具名插槽编写的自定义内容和样式。</view>
			</template></popup>
	</view>
</template>
<script>
	import popup from '../../components/popup.vue'
	export default {
		components: {
			popup
		},
		data() {
			return {
				visible: false,
			}
		},
		methods: {
			open() {
				this.visible = trueuni.hideTabBar()
			},
			closeMadle() {
				this.visible = falseuni.showTabBar()
			},
			confirm() { // 这里调用接口执行点击确定后的操作并关闭弹窗console.log('点击了确认按钮')this.visible = false},cancel(){// 点击了取消按钮直接关闭弹窗console.log('点击了取消按钮')this.visible = false},}}
</script>
<style>
.title{text-align: center;font-weight: 600;height: 50rpx;line-height: 50rpx;margin-bottom: 20rpx;}
.body{font-size: 28rpx;font-weight: 600;color: darkorchid;}
</style>
