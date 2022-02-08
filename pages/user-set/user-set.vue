<template>
	<view>
		<card :headTitle="item.label" bodyStyle="background:pink;"
		v-for="(item,index) in list" :key="index">
			<uni-list-item contain :title="list.title" v-for="(list,listIndex) in item.value"
			:key="listIndex" titleStyle="font-size:26upx;" @click="navigate(list.path)"><block slot="right">
				<text class="iconfont icon-you" style="font-size:25upx;color:#b0b0b0;"></text>
			</block></uni-list-item>
		</card>
		<view class="p-3">
			<button type="default" class="bg-white">退出登录</button>
		</view>
	</view>
</template>

<script>
	import card from "@/components/card1.vue"
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"
	export default {
		components: {
			card,
			uniListItem
		},
		data() {
			return {
				list:[
					{
						label:"账号管理",
						value:[
							{ title:"个人资料",path:"" },
							{ title:"收货地址",path:"" },
						]
					},
					{
						label:"关于",
						value:[
							{ title:"关于商城",path:"about" },
							{ title:"意见反馈",path:"" },
							{ title:"协议规则",path:"" },
							{ title:"资质证件",path:"" },
							{ title:"用户协议",path:"" },
							{ title:"隐私政策",path:"" },
						]
					},
				]
			}
		},
		methods: {
			navigate(path){
				if (!path) return;
				uni.navigateTo({
					url: `/pages/${path}/${path}`
				});
			}
		}
	}
</script>

<style>
page{
	background: #EEEEEE;
}
</style>
