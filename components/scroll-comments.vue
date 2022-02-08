<template>
	<view class="p-1">
		<scroll-view scroll-x class="">
			
			<view class=" rounded"  v-for="(item,index) in comments" :key="index" 
			style="width: 640rpx;height: 380rpx;background-color:#f1f1f1;">

				<view class="d-flex a-center p-1">
					<image :src="item.userpic" 
					mode="widthFix" style="width: 70rpx;height: 70rpx;"
					class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-1 line-h">
						{{item.username}}</text>
						<text class="d-block font-1 text-light-muted line-h">{{item.create_time}}</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted font-1 pl-1 ml-auto">{{item.goods_num}}</view>
				</view>
				
				<text class="d-block font-1 m-2">
					{{item.context}}
				</text>
				
				<view class="row">
					<view style="padding:0 15px;" class="span24-8"
					v-for="(img,i) in item.imglist"
					:key="i">
						<image :src="img" 
						mode="widthFix" style="width: 80rpx;"
						class="rounded"></image>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<navigator url="/pages/detail-comment/detail-comment">
		<view style="justify-content: center;" class="d-flex py-2 text-primary"
		hover-class="bg-light-secondary">
			更多样式 <view class="iconfont icon-you" style="margin-left:23rpx;margin-top:8rpx;"></view>
		</view>
		</navigator>
		
	</view>
</template>

<script>
	export default {
		props: ['comments'],
	}
</script>

<style>
</style>

