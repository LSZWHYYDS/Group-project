<script>
	export default {
		onLaunch: function() {
			console.log('测试合并主分支')
		},
		onShow: function() {
			// console.log('App Show')
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	@import '/wxcomponents/vant/common/index.wxss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
<style>
/* 	@import 'vant/lib/action-sheet/index.css';
	@import 'vant/lib/index.css'; */
</style>
