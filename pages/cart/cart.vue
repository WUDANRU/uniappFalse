<template>
	<!-- <view> -->
		
		<!-- 最外一层的view-->
		 <view class="animated fadeIn faster">
	       
		 <loading-plus v-if="beforeReady"></loading-plus>  
		   
		<!-- 	 <view style="z-index: 10000;left:0;top:0;right:0;bottom:0;background: #fff;" class="position-fixed d-flex a-center j-center font-sm main-text-color"
		v-if="beforeReady">
			加载中...
		</view> -->
		
		<uni-nav-bar :fixed="true" @clickRight="isedit=!isedit" statusBar :rightText="isedit?'完成':'编辑'" title="购物车"
			:shadow="false">
		</uni-nav-bar>
		<!-- <view style="height:1000px;"></view> 如果写了这个上面那个不会固定住的, 见 fixed="true"和pages.json-->

		<!-- 购物车为空  v-if="disableSelectAll"-->
			<view v-if="list.length===0" class="py-5 d-flex a-center bg-white border" style="padding-left: 20%;">
			<view class="iconfont icon-gouwuche1 text-light-muted" style="font-size:60upx;"></view>
			<text class="text-light-muted" style="padding:30upx;">购物车还是为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded"
			hover-class="bg-light-secondaary">去逛逛</view>
	</view>

		<!-- a-self-end处于垂直的地方的底部 -->
		<!-- 将radio单选框变成复选框,加了:checked="checked" -->
		<!-- <label class="radio" @click="selectItem(1)">
		<radio value="1" color="#FD6801" :checked="checked"/>
	</label> -->

		<!-- 购物车商品列表  v-else-if="!disableSelectAll" -->
		<view class="bg-white px-2" v-else-if="list.length!==0">
			<!-- 列表 -->
			<view v-for="(item,index) in list" :key="index"
				class="d-flex a-center py-3 border-bottom border-light-secondary">
				<!-- 这个点击事件调用的是store的mutation里的，不能在methods再写一个方法 -->
				<label @click="selectItem(index)" class="radio d-flex a-center j-center flex-shrink"
					style="width: 80upx;height: 80upx;">
					<radio value="item.id" color="#FD6801" :checked="item.checked" />
				</label>

				<image :src="item.cover" mode="widthFix" style="z-inde:3000;width: 150rpx;height: 150rpx;"
					class="border border-light-secondary rounded p-2 flex-shrink">
				</image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">
						{{item.title}}
					</view>

					<!-- 规格属性 -->
					<view class="d-flex text-light-muted mb-1"
					:class="isedit?'p-1 bg-light-secondary mb-2':''"
					@tap.stop="doShowPopup(index)">
						<text class="mr-1" v-for="(attr,attrIndex) in popupData.attrs"
							:key="attrIndex">{{attr.list[attr.selected].name}}</text>
						<view v-if="isedit" class="iconfont icon-bottom font-2 ml-auto"></view>
					</view>


					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum"
								@change="changeNum($event,item,index)">
							</uni-number-box>
						</view>
					</view>
				</view>
				<!-- $event是点击数量(加或减)后的值 -->
			</view>
		</view>

		<!-- 合计 -->
		<view v-if="list.length!==0" class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index:100;left:0;right:0;bottom:50px;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink" style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 :disable="disableSelectAll"  -->
				<radio color="#FD6801" :checked="checkedAll" />
			</label>
			<template v-if="!isedit">
				<!-- isedit为true是编辑 -->
				<view class="flex-1 d-flex a-center font-3" style="justify-content: center;">
					合计 <price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-3"
					@tap="orderConfirm" hover-class="main-bg-hover-color">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center font-2 main-bg-color text-white" style="justify-content: center;">
					移入收藏
				</view>
				<view @tap="dODelGoods" class="flex-1 d-flex a-center font-2 bg-danger text-white" style="justify-content: center;">
					删除
				</view>
			</template>
		</view>

		<!-- 合计 -->
	<view v-if="list.length===0" 
		class="d-flex a-center position-fixed border-top border-light-secondary a-stretch"
			style="height: 100upx;z-index: 100;left:0;right:0;bottom:50px;background:#fff;">
			<label @click="doSelectAll" class="radio d-flex a-center j-center flex-shrink"
				style="width: 120upx;">
				<!-- 是否全选 -->
				<!--  disable代表禁用状态 删了:disable="disableSelectAll"和:checked="checkedAll" -->
			<radio color="#FD6801" :disabled="true" />
			</label>
			<view class="flex-1 d-flex a-center font-3" style="justify-content: center;color:#bfbfbf;">
				合计 <price style="color:#bfbfbf;"></price>
			</view>
			<view style="background-color:#bfbfbf;" class="flex-1 d-flex a-center j-center text-white font-3"
				hover-class="main-bg-hover-color">
				结算
			</view> 
		 </view>

		<!-- 属性筛选框 -->
		<!-- <common-popup :popupClass="popup.attr" @hide="hide('attr')"> -->
		<common-popup :popupClass="popupShow" @hide="doHidePopup">
<!-- 
			商品信息(275rpx)
			图片 180*180
			-->
<view class="d-flex a-center" style="height: 275rpx;">
				<image src="../../static/images/demo/list/1.jpg" mode="widthFix"
				style="height: 180rpx;width: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2365</price>
			<text class="mr-1" v-for="(attr,attrIndex) in popupData.attrs" :key="attrIndex" >
				{{attr.list[attr.selected].name}}
			</text>
				<!-- 	<text class="d-block">
						火焰红 64GB 标配
					</text> -->
				</view>
			</view>
	
<!-- 
			表单部分(660rpx)
			-->
	 <scroll-view scroll-y style="height: 660rpx;width:750rpx;">
			<card :headTitle="item.title" :headTitleWeight="false" 
			:headBorderBottom="false" :key="index"
			v-for="(item,index) in popupData.attrs">
			<!--  从detail.vue拷贝过来的   v-for="(item,index) in selects" -->
			
				<zcm-radio-group :label="item" 
				:selected.sync='item.selected'></zcm-radio-group>
				
				<!-- {{attr.list[attr.selected].name的[attr.selected]是切换attr.list的索引}} -->
				<!-- item.selected就是等于zcm-radio-group里的index -->
				<!-- 
				<zcm-radio-group @change2="change2" :label="item"
				></zcm-radio-group> --> 
				
			</card>
			<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
				<text>购买数量</text>
				<uni-number-box :min="1" :value="popupData.num" @change="popupData.num=$event"></uni-number-box>
			</view>
		</scroll-view>	
			
			<!--
			 按钮(100rpx)
			 -->
			<view class="main-bg-color text-white font-sm d-flex a-center j-center" hover-class="main-bg-hover-color" 
			style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="doHidePopup">
				<!-- 加入购物车 -->
				确定
			</view> 
</common-popup>	

 <view class="text-center main-text-color font-sm font-weight mt-5">
			 为你推荐
		 </view>
		 <view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #ffffff;z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1upx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		 </view>
<!-- 为你推荐 -->
<view class="row j-sb bg-white">
				<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index">
				</common-list>
			</view>

<!-- 占位 -->
<view style="height:100upx;"></view>

	</view>
</template>
<!-- :statusBar="true"可以简写成statusBar，这个可以让手机状态栏隐藏 -->
<script>
	// uni.css改成和新版本一样: src: url('~@/static/uni.ttf')并且从新版本复制过来uni.ttf粘贴到static文件夹
	// import statusBar from "./uni-status-bar.vue";  // 手机状态栏
import loading from "@/components/mixin/loading.js"
	import uniNavBar from "@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue"
	import price from "@/components/price.vue"
	import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue"
	import commonPopup from "@/components/common-popup.vue"
	import zcmRadioGroup from "@/components/common/radio-group.vue"
	import card from "@/components/common/card.vue"
	import commonList from "../../components/common/common-list.vue"
	
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		mixins:[loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			commonPopup,
			zcmRadioGroup,
			card,
			commonList
		},
		data() {
			return {
				isedit: false,
				// checked:false,
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
			}
		},
		computed: {
			...mapState({
				list: state => state.cart.list,
				popupShow:state=>state.cart.popupShow
			}),
			...mapGetters([
				'checkedAll',
				'totalPrice',
				// 'disableSelectAll',
				'popupData'
			])
		},
		methods: {
			// change2(index,label){
			// 	console.log(index,label,'index')
			// 	label.selected=index
			// },
			...mapMutations([ //点击事件
				'selectItem'
			]),
			...mapActions([ //点击事件
				'doSelectAll',
				'dODelGoods',
				'doShowPopup',
				'doHidePopup'
			]),
			// selectItem(id,){
			// 	console.log(id)
			// 	this.checked=!this.checked
			// },
			changeNum(e, item, index) {
				item.num = e
			},
			// 订单结算
			orderConfirm(){
				uni.navigateTo({
					url:'../order-confirm/order-confirm'
				})
			}
		}
	}
</script>

<style>
</style>
