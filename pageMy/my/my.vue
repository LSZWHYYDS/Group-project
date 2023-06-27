<template>
	<view>
		我的
		<tabber pagePath="/pageMy/my/my"></tabber>
	</view>
</template>

<script>
	import tabber from "@/components/tabber.vue";
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			// uni.clearStorage();
		},
		components: {
			tabber
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>

</style>
