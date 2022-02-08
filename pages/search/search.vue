<template>
	<view>
	<!-- nvue页面跳转到vue页面 -->
	<card headTitle="热门搜索" bodyCover="../../static/images/demo/search-banner.png"></card>
<!-- 	<block v-for="(item,index) in hot" :key="index">
		<view :style="getStyle" class="px-2 py-1 border m-1">
			{{item.name}}
		</view>
		</block> -->
		
		<!-- 多色按钮 -->
		<view style="margin:none;" class="">
			<color-tag v-for="(item,index) in hot" :key="index" :item="item"></color-tag>
		</view>
		
		<!-- 常用按钮 -->
		<card headTitle="常用分类" :bodyPadding="true" :headBorderBottom="false">
			<color-tag :color="false" v-for="(item,index) in hot" :key="index" :item="item"></color-tag> 
		</card>
		
		<divider />
		
		<!-- 搜索记录 -->
		<card headTitle="搜索记录">
			<uni-list-item title="小米" :showArrow="false"></uni-list-item>
		</card>
		
	</view>
</template>
<!-- style="background:#007AFF;border-color:#007AFF;" -->
<script>
	import card from "@/components/uni-card.vue"
	import colorTag from "@/components/common/color-tag.vue"
	
		// uniListItem这是在官方提供的uniapp项目拿的，需要吧uni-common整个拿才不会报错
	import uniListItem from "@/components/uni-ui/uni-common/uni-list-item/uni-list-item.vue"

	export default {
		components:{
			card,
			colorTag,
			uniListItem
		},
		data() {
			return {
				hot:[
					{name:'领券中心'},
					{name:'Redmi k20'},
					{name:'RedmiBook 14'},
					{name:'智能积木 越野四驱车'},
					{name:'手环 腕带'}
				]
			}
		},
		onNavigationBarButtonTap(e) { //点击搜索按钮才能跳转
			console.log(e)
				if (e.index === 0){
					uni.navigateTo({
						url: '../search-list/search-list',
					});
				}
		},
		// onNavigationBarSearchInputClicked(){
		// 	console.log(1111)
		// 	uni.navigateTo({
		// 		url: '/pages/search-list/search-list',
		// 	});
		// },
		methods: {
			
		}
	}
</script>

<style src="@/common/zcm-main-nvue.css">

</style>
