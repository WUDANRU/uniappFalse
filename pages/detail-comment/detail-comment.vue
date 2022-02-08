<template>
	<view>
		<view class="py-1">
			<view class="d-flex py-1 a-center border-bottom border-light-secondary">
				<text>用户评价(123)</text>
				<text class="main-text-color ml-auto mr-2">98.5%</text>
				<text>满意</text>
			</view>
			<view class="d-flex flex-wrap pt-1" style="margin-right:-30rpx;">
				<view v-for="(item,index) in cateList" :key="index" :class="cateIndex===index?'active':''"
					class="px-1 py border rounder mr-1 mb-1 cate-item" @tap="cateChange(index)">
					{{item.name}}
				</view>
			</view>
		</view>
		<!-- style="margin-right:-30rpx;"这个是如果右边比较空的话可以用这个就不会太空 -->
		<!-- mr-auto所在的昵称这一个吧超好所在的view推向右边 -->
		<!-- flex-1占满剩余的空间 -->
		<divider />
		<!-- 在被挤压的元素上使用flex-shrink:0 -->
		<!-- 下面的文字太多，图片会被挤压使用flex-shrink -->

		<view class="p-2 d-flex a-start">
			<image src="../../static/images/demo/demo6.jpg" mode="widthFix" style="width:90rpx;height:90rpx;"
				class="rounded flex-shrink"></image>
			<view class="pl-2 flex-1">
				<view class="d-flex a-center">
					<text class="font-sm text-primary font-weight mr-auto">昵称</text>
					<view class="iconfont icon-service main-text-color">
						<text class="pl font-1">超好</text>
					</view>
				</view>
				<view class="line-h-md font-1">
					非常好
				</view>
				<view class="row">
					<view class="apan24-8 px pb">
						<image src="../../static/images/demo/cate_08.png" mode="widthFix" style="width:160upx;"></image>
					</view>
				</view>
				<view class="d-flex a-center">
					<text class="text-light-muted mr-auto">2019-08-20</text>
					<view class="d-flex text-light-muted mr-1">
						0 <text class="iconfont icon-dianzan text-muted ml"></text>
					</view>
					<view class="d-flex text-light-muted">
						10 <text class="iconfont icon-pinglun text-muted  ml"></text>
					</view>
				</view>

				<!-- 客服回复 -->
				<view class="bg-light-secondary font-1 py rounder d-flex flex-wrap a-center">
					<text class="main-text-color">官方回复：</text>
					官方回复，哈哈哈哈
					<view class="py iconfont icon-dianzan text-light-muted line-h-md" style="font-size:32upx;">
						<text class="main-muted pl-1">赞客服 120</text>
					</view>
				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				cateIndex: 0,
				cateList: [{
						name: "全部"
					},
					{
						name: "有图"
					},
					{
						name: "非常喜欢"
					},
					{
						name: "拍照好"
					},
					{
						name: "手感很棒"
					},
					{
						name: "效果好"
					},
					{
						name: "性能很棒"
					},
				]
			}
		},
		methods: {
			cateChange(index) {
				this.cateIndex = index
			}
		}
	}
</script>

<style>
	.cate-item {
		background: #FFEBEC;
		color: #7B6D6C;
		border-color: #F4E0E1;
	}

	.cate-item.active {
		background: #FF6B01 !important;
		color: #FFFFFF !important;
		border-color: #DE7232 !important;
	}
</style>
