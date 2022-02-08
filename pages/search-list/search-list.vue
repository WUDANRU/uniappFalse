<template>
	<view>
		<view class="border-top border-bottom d-flex a-center j-center" style="height:100upx;line-height:100upx;">
			<view class="flex-1 d-flex a-center j-center" v-for="(item,index) in screen.list" :key="index"
				@tap="changeScreen(index)">
				<text :class="screen.currentIndex===index?'main-text-color':'text-light-muted'">{{item.name}}</text>
				<view style="line-height:0;">
					<view class="iconfont icon-paixu-shengxu"
						:class="item.status===1?'main-text-color':'text-light-muted'"></view>
					<view class="iconfont icon-paixu-jiangxu"
						:class="item.status===2?'main-text-color':'text-light-muted'"></view>
				</view>
			</view>

			<view @tap="showDrawer('showRight')" class="flex-1 d-flex a-center j-center main-text-color">
				筛选
			</view>
		</view>

		<!-- 抽屉 -->
		<uni-drawer ref="showRight" :mask-click="false" mode="right">
			<view class="d-flex position-fixed bottom-0 right-0 w-100">
				<card headTitle="服务" :headBorderBottom="false" :headTitleWeight="false">

					<!-- 单选按钮组 -->
					<zcm-radio-group :label="label" :selected.sync="label.selected" />
					<!-- 上面是第二种写法，这是第一种写法:	<zcm-radio-group :label="label" @change2="changeRadio" /> -->

				</card>

				<!-- 按钮 -->
				<view class="a-b main-text-color" @tap="closeDrawer('showRight')">
					确定
				</view>
				<view class="a-b-2" @tap="reset">
					重置
				</view>
			</view>

		</uni-drawer>

		<!-- 列表 -->
		<block v-for="(item,index) in list" :key="index">
		   <search-list :item="item" :index="index"></search-list>
		</block>	

	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-ui/uni-drawer/uni-drawer.vue'
	import card from '@/components/common/card.vue'
	import zcmRadioGroup from '@/components/common/radio-group.vue'
	import searchList from '@/components/search-list.vue'

	export default {
		components: {
			uniDrawer,
			card,
			zcmRadioGroup,
			searchList
		},
		data() {
			return {
				list:[
					{
					title:"真无限蓝牙耳机",
					titlepic:"/static/images/demo/demo6.jpg",
					desc:'雅致简约、分体式入耳、收纳盒充电/蓝牙5.0/触控操作',
					pprice:100,
					comment_num:1300,
					good_num:"98%"
				},
				{
					title:"真无限蓝牙耳机",
					titlepic:"/static/images/demo/demo6.jpg",
					desc:'雅致简约、分体式入耳、收纳盒充电/蓝牙5.0/触控操作',
					pprice:100,
					comment_num:1300,
					good_num:"98%"
				},
				],
				screen: {
					currentIndex: 0,
					list: [{
							name: "综合",
							status: 1
						},
						{
							name: "销量",
							status: 0
						}, //0代表没有状态，1代表箭头上，2代表箭头下
						{
							name: "价格",
							status: 0
						},
					]
				},
				label: {
					selected: 0,
					list: [{
							name: "选项一"
						},
						{
							name: "选项二"
						},
						{
							name: "选项三"
						}
					]
				}
			}
		},
		methods: {
			reset(){
				this.label.selected=0
			},
			// 打开窗口
			showDrawer(e) {
				console.log(e)
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			changeScreen(index) {
				// 判断当前点击是否已经是激活状态
				let oldIndex = this.screen.currentIndex
				let oldItem = this.screen.list[oldIndex]
				if (oldIndex === index) {
					return oldItem.status = oldItem.status === 1 ? 2 : 1
				}
				let newIitem = this.screen.list[index]
				// 移除旧激活状态
				oldItem.status = 0
				this.screen.currentIndex = index
				// 增加新激活状态
				newIitem.status = 1
			},
			//        	changeRadio(index){ //这个是第一种写法可以删除，radio-group.vue有第二种写法
			// 	this.label.selected=index
			// }
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css"></style>

<style src="@/common/icon.css"></style>
<style>
	.a-b {
		background: #ff5500;
		color: #ffffff;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.a-b-2 {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 50%;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
	}

	.a-b:active {
		background: #ea4e00;
	}

	.a-b-2:active {
		background: #e5e5e5;
	}
</style>
