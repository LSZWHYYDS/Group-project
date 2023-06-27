<template>
	<view>
		上传页
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(option) {
			// _self = this;
			console.log(JSON.parse(option.list));
			console.log(6969);
			this.$nextTick(() => {
			})
		},
		components: {
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>


</style>
