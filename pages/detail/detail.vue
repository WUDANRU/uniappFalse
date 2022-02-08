<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height="750" preview />

		<!-- 基础详情 -->
		<base-info :detail="detail"></base-info>

		<!-- 滚动商品特性 w170*h110 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>

		<!-- 属性选择  uni-list-item.vue文件加了<slot></slot> -->
		<view class="p-1 pt-2">
			<view class="rounded border bg-light-secondary">
				<!--  <uni-list-item  title="已选">  -->
				<uni-list-item showArrow newStyle="background-color: #f1f1f1;" >
				    <view class="d-flex a-center" @click="show('attr')">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
					
				</uni-list-item>
				<uni-list-item newStyle="background-color: #f1f1f1;" >
					<view class="d-flex" @click="show('express')">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">现配</text>
					</view>
				</uni-list-item>
				<uni-list-item newStyle="background-color: #f1f1f1;"  extraStyle="width:2%;" :showArrowIcon="false">
					<view class="d-flex" style="justify-content: space-around;" @click="show('service')">
						<view style="margin-left:-20upx;" class="text-muted font-1 d-flex j-center">
							<view class="iconfont d-flex  icon-finish main-text-color"></view>
							小米自营
						</view>
						<view class="text-muted font-1 mr-1 d-flex j-center">
							<view class="iconfont icon-finish main-text-color"></view>
							小米发货
						</view>
						<view style="margin-left:-20upx;" class="text-muted font-1 mr-1 d-flex j-center">
							<view class="iconfont icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>

			</view>
		</view>

		<!-- 横向滚动评论
			外层 w620*h380
			头像 w70*h70
			图片 h115
		-->
		<scroll-comments :comments="comments"></scroll-comments>

		<!-- 商品详情 -->
		<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate"></u-parse>

		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
				</common-list>
			</view>
		</card>

		<!-- 底部操作条 -->
		<bottom-btn @showed="show('attr')"></bottom-btn>

		<!-- 属性筛选框 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<!-- 
			商品信息(275rpx)
			图片 180*180
			-->
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix" style="height: 180rpx;width: 180rpx;"
					class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2365</price>
					<text class="d-block">
						火焰红 64GB 标配
					</text>
				</view>
			</view>

			<!-- 
			表单部分(660rpx)
			-->
			<scroll-view scroll-y style="height: 660rpx;width:750rpx;">
				<card :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false" :key="index"
					v-for="(item,index) in selects">
					<zcm-radio-group :label="item" :selected.sync='item.selected'></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num=$event"></uni-number-box>
				</view>
			</scroll-view>

			<!--
			 按钮(100rpx)
			 -->
			<view class="main-bg-color text-white font-sm d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="addCart">
				加入购物车
			</view>
		</common-popup>

		<!-- 收货地址 -->
		<!-- 275+660=935-100=835 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<scroll-view scroll-y class="w-100" style="height: 935rpx;">
				<uni-list-item :newStyle="'background: none;border-bottom: 1upx solid #bfbfbf;'" v-for="(item,index) in pathList" :key="index">
					<view class="iconfont icon-dingwei font-weight font-3">{{item.name}}</view>
					<view class="font-1 text-light-muted mt-1">
						{{item.path}} {{item.detailPath}}
					</view>
				</uni-list-item>
			</scroll-view>	
					<!--
					按钮(100rpx)
					-->
			<view class="font-3 main-bg-color text-white d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="openCreatePath">
				选择新的地址
			</view>
		</common-popup>

		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<view class="d-flex a-center j-center font-sm border-bottom border-light-secondary" style="height: 100rpx;">
				服务说明
			</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						小米自营
					</view>
					<text class="text-light-muted font-2 pl-4">
						不管满多少，就是不包邮
					</text>
				</view>
			</scroll-view>
			<!-- 
		 按钮(100rpx)
		 -->
			<view class="main-bg-color text-white font-3 d-flex a-center j-center" hover-class="main-bg-hover-color"
				style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="hide('service')">
				确定
			</view>
		</common-popup>




	</view>
</template>

<script>
	import swiperImage from '@/components/swiper-image1.vue'
	import baseInfo from '@/components/base-info.vue'
	import scrollAttrs from '@/components/scroll-attrs.vue'
	import uniListItem from '@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue'
	import scrollComments from "@/components/scroll-comments.vue"
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue' //解析富文本
	import card from "@/components/common/card.vue"
	import commonList from "../../components/common/common-list.vue"
	import bottomBtn from "@/components/bottom-btn.vue"
	import commonPopup from "@/components/common-popup.vue"
	import price from "@/components/price.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	
	import {
		mapState,mapMutations
	} from 'vuex'

	var htmlString = `
	<p>
		<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
		<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
		<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
		<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
		<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
		<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
		<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
	</p>
	    `
	export default {
		components: {
			swiperImage,
			scrollAttrs,
			baseInfo,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			uniNumberBox
		},

		data() {
			return {
				// popupClass: "none",
				popup: {
					attr: "none",
					express: "none", //隐藏地址
					service: "none"
				},
				context: htmlString, //从uParse复制过来的
				comments: [{
						userpic: "/static/images/demo/demo6.jpg",
						username: "楚绵",
						create_time: "2019-07-31",
						goods_num: 123,
						context: "评论内容",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					},
					{
						userpic: "/static/images/demo/demo6.jpg",
						username: "楚绵",
						create_time: "2019-07-31",
						goods_num: 123,
						context: "评论内容",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					},
					{
						userpic: "/static/images/demo/demo6.jpg",
						username: "楚绵",
						create_time: "2019-07-31",
						goods_num: 123,
						context: "评论内容",
						imglist: [
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg",
							"/static/images/demo/demo6.jpg"
						]
					}
				],
				banners: [{
						src: 'https://i8.mifile.cn/v1/a1/6d13e060-d5c5-e610-88d0-80816fa2b0ce.webp'
					},
					{
						src: 'https://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp'
					}
				],
				detail: {
					title: "小米MIX3 6GB+128GB",
					desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
					pprice: 3299,
					// 写点击加入购物车时增加的
					cover: "../../static/images/demo/list/1.jpg",
					num: 1,
					max: 100
				},
				baseAttrs: [{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
					{
						icon: "icon-cpu",
						title: "CPU",
						desc: "蛟龙845八核"
					},
				],
				hotList: [{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					},
					{
						cover: "/static/images/demo/list/1.jpg",
						title: "米家空调",
						desc: "1.5匹变频",
						oprice: 2699,
						pprice: 1399
					}
				],
				selects: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: "黄色"
							},
							{
								name: "黑色"
							},
							{
								name: "红色"
							},
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: "64GB"
							},
							{
								name: "128GB"
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: "标配"
							},
							{
								name: "套餐一"
							},
							{
								name: "套餐二"
							},
						]
					}
				],
				// detail: {
				// 	title: "小米MIX3 6GB+128GB",
				// 	desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
				// 	pprice: 3299,
				// 	num: 1,
				// 	max: 100
				// },
			}
		},
		computed:{
			...mapState({
				pathList:state=>state.path.list
			})
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
			openCreatePath(){
				uni.navigateTo({
					url:'../user-path-edit/user-path-edit'
				})
				this.hide('express')
			},
			addCart() {
				// 组织数据
				let goods = this.detail
				console.log(this.detail.cover,this.detail.pprice,'src')
				goods['checked'] = false
				goods['attrs'] = this.selects
				// 加入购物车
				this.addGoodsToCart(goods)
				// 隐藏筛选框
				this.hide('attr')
				// 成功提示
				uni.showToast({
					title: '加入成功'
				})
			},
			// 关闭模态框
			onBackPress() { //( 只对于app端起作用 )监听页面返回事件，点了detail页面的返回键返回的是首页，需要让它返回到上一个页面
				for (let key in this.popup) {
					// console.log(this.popup[key],'this.popup[key]')
					if (this.popup[key] !== 'none') {
						this.hide(key)
						// return true//写在这里反而阻止不了默认行为
					}
					// return true; //阻止默认行为，默认行为是返回到首页，只写这个的话，点击返回键是没有效果的
				}
			},
			show(key) {
				this.popup[key] = "show"
			},
			hide(key) {
				this.popup[key] = "hide"
				setTimeout(() => {
					this.popup[key] = "none"
				}, 200)
			},
			preview(src, e) { //从uParse复制过来的

			},
			navigate(href, e) {
				console.log(href, e)
			}
		}
	}
</script>

<style>
	.uparse .p {
		padding: 0 !important;
	}

	.uparse view,
	.uparse uni-view {
		line-height: 0 !important;
	}
</style>
