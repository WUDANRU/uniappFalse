<template>
	<view style="background: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 --><!-- 点击cart的结算就会跳转到这个页面 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;"
		 hover-class="main-bg-hover-color">
			<view> <!-- user-path-list页面三种情况(两个页面(全局)之间的传递uni.$on,uni.$emit)：有收货地址 || 没有收货地址 || 有收货地址，对收货地址不满意要修改 -->
				<template v-if="path">
					<!-- <view  @click="openPathList"> -->
					<view  class="font-weight d-flex a-center font-sm">
						{{path.name}} {{path.phone}}
						<view class="border border-white rounded px-1 font-1 ml-2"
						v-if="path.isdefault">默认</view>
					</view>
					<view class="font-2 py">
						{{path.path}} {{path.detailPath}}
					</view>
					<!-- </view> -->
				</template>
				<template v-else><!-- 将path.js的所有对象的isdefault改为false -->
					<view @click="openPathList"
					class="font-weight font-sm d-flex a-center">
						请选择收货地址
					</view>
				</template>
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		
		<!-- showArrow代表右箭头图标 -->
		<view style="border-top-left-radius: 25rpx;border-top-right-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view class="d-flex a-center">
						<image src="/static/images/demo/demo6.jpg"
						style="width: 100rpx;height: 100rpx;" class="rounded mr-2"
						></image>
						<image src="/static/images/demo/demo6.jpg"
						style="width: 100rpx;height: 100rpx;" class="rounded mr-2"
						></image>
						<image src="/static/images/demo/demo6.jpg"
						style="width: 100rpx;height: 100rpx;" class="rounded mr-2"
						></image>
					</view>
					<view slot="rightContent">共3件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent">
						<price color="text-dark">20.00</price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<uni-list-item title="优惠券">
					<view slot="rightContent" class="text-light-muted">无可用</view>
				</uni-list-item>
				<uni-list-item :showArrowIcon="false">
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price>20.00</price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" extraStyle="width:300upx;">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>
		
		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p font-3">
			合计:
			<view class="ml">
				<price>24.00</price>
			</view>
			<view class="ml-2 px-2 py-1 main-bg-color text-white font-3"
			hover-class="main-bg-hover-color" style="border-radius: 80rpx;" @click="openPayMethods">
				去支付
			</view>
		</view>
		
	</view>
</template>

<script>
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	import price from "@/components/price.vue"
	
	import { mapGetters } from 'vuex'
	
	export default {
		components: {
			uniListItem,
			price
		},
		computed:{
			...mapGetters(['defaultPath']) //对于getters,这里用this.defaultPath才能打印值
		},
		data() {
			return {
				path:false
			}
		},
		onLoad(){
			// console.log(this.defaultPath,this.defaultPath[0]) //第一个拿到默认为true的数组，第二个拿到默认为true的对象
			if(this.defaultPath.length){ //判断是否存在默认地址，this.defaultPath.length为1
				this.path=this.defaultPath[0]
			}
			
			// 开启监听选择收货地址事件
			uni.$on('choosePath',(res)=>{ //uni.$on和uni.$emit互相传递(全局)参数
				console.log('接收到参数',res)
				this.path=res
			})
		},
		onUnload(){ //卸载
			// 关闭监听选择收货地址事件
			uni.$off('choosePath',(e)=>{
				console.log('关闭监听选择收货地址')
			})
		},
		methods: {
			openPayMethods(){
				uni.navigateTo({
					url:'../pay-methods/pay-methods'
				})
			},
			openPathList(){ //点击请选择收货地址
				uni.navigateTo({
					url:'../user-path-list/user-path-list?type=choose'
				})
			}
		}
	}
</script>

<style>

</style>
