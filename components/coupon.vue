<template>
	<view class="bg-white rounded border d-flex a-center border-light-secondary mb-3">
		<view class="flex-1 d-flex flex-column j-center px-2">
			<view class="font-3"
			:class="item.disabled || !item.status ? 'text-light-muted':''"
			>{{item.title}}</view>
			<!-- 父组件item.status是true，这里的!item.status表示false -->
			<view class="font-1 text-light-muted">
				{{item.start_time}}~{{item.end_time}}
			</view>
		</view>
		<view class="text-white d-flex flex-column a-center j-center" style="width: 220rpx;height: 200rpx;"
		:class="item.disabled || !item.status ? 'bg-secondary':'main-bg-color'">
			<view style="font-size: 32rpx;line-height: 1.4;">
				{{item.price}}<text class="font-3">元</text></view>
			<view class="font-3">{{item.desc}}</view>
			
			<view class="rounded bg-white w-50 text-center" hover-class="bg-light"
			:class="item.disabled || !item.status? 'text-secondary':'main-text-color'">
				{{ item.status ? '去使用' : '已失效'}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: Object,
			index:Number
		},
	}
</script>

<style>
</style>
