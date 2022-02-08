<template>
	<view class="row" style="font-size:20upx;">
	<view class="span24-8  mb-2" v-for="(item,index) in label.list">
		<view @tap="changeRadio(index,label)" :class="label.selected===index?'radio-active':''" style="border-radius:10upx;width:130upx;height:60upx;line-height:60upx;display:flex;margin:30upx;justify-content:center;text-align: center;font-size:28upx;background:#e7e7e7;">
			{{item.name}}
		</view>
		<!-- <view hover-class="a" >dddd</view> -->
		<!-- hover-class="+类名" -->
	</view>
	</view>
</template>

<script>
	export default{
		props:{
			label:Object
		},
	methods:{
		// 第一种写法：
		// changeRadio(index,label){
		// 	this.$emit('change2',index,label)
		// }
		
		// 第二种写法：
		changeRadio(index){
			this.$emit('update:selected',index)
		}
		}
	}
</script>

<style>
	.radio-active{
		background:#FCE0D5!important;
		color:#Eb7320!important;
		border-color:#EB7320!important;
	}
	.a{
		background:#007AFF
	}
</style>
