<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-swipe-action :rightOptions="rightOptions" @click="bindClick($event,index)">
				<uni-list-item @click="choose(item)">
					<view class="text-secondary">
						<view class="d-flex a-center">
							<text class="main-text-color">{{item.name}}</text>
							{{item.phone}}
							<text class="main-text-color" v-if="item.isdefault">[默认]</text>
						</view>
						<view>{{item.path}}</view>
						<view>{{item.detailPath}}</view>
					</view>
				</uni-list-item>
			</uni-swipe-action>
		</block>
	</view>
</template>

<!-- 用storage试试 -->
<!-- /user-path-list这个页面通过+进入到的/user-path-edit页面增加收获地址再点击刷新，state新增的列表数据被刷没了 -->
<!-- /user-path-edit页面修改后的值点击刷新，还是回到回来的假数据 -->

<script>
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	import uniSwipeAction from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue"

	import {
		mapState,
		mapMutations
	} from "vuex"

	export default {
		components: {
			uniListItem,
			uniSwipeAction
		},
		data() {
			return {
				isChoose: false, //true表示从confirm页面进来的
				rightOptions: [{
					text: '修改',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) { //创建地址(+号在pages.json写的)
			console.log(e)
			if (e.index === 0) {
				uni.navigateTo({
					url: '/pages/user-path-edit/user-path-edit'
				})
			}
		},
		computed: {
			...mapState({
				list: state => state.path.list
			})
		},
		onLoad(e) {
			//console.log(e) //confirm页传来的{type: 'choose'}
			if (e.type === 'choose') {
				this.isChoose = true
			}
		},
		methods: {
			...mapMutations(['delPath']),

			// 选择收货地址
			choose(item) {
				if (this.isChoose) { //从confirm页面进来的才触发choose方法
					//通知订单提交页修改收货地址
					uni.$emit('choosePath', item) //吧item传给confirm页
					// 关闭当前页面(返回上一页)
					uni.navigateBack({
						delta: 1
					})

				}
			},
			bindClick(e, index) {
				// console.log(e, index) //e.index有0，1，其中0代表修改，1代表删除   //e.content.text
				switch (e.index) {
					case 0: //修改
						let obj = JSON.stringify({
							dex: index,
							item: this.list[index]
						})
						setTimeout(() => { //如果点击修改反应比较慢然后点击后要跳转，这个问题可以延迟解决
							uni.navigateTo({
								url: '../user-path-edit/user-path-edit?data=' + obj
							})
						}, 50)
						break;
					case 1: //删除
						uni.showModal({
							content: '要删除该收货地址吗？',
							success: (res) => {
								if (res.confirm) {
									this.delPath(index) //直接写this要用箭头函数
									uni.showToast({
										title: '删除成功'
									})
								}
							}
						})
						break;
				}
			}
		}
	}
</script>

<style>

</style>
