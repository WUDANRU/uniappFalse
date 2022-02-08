<template>
	<view class="card">
		<!-- head -->
		<view v-if="showhead" class="pt-1 main-border-color" :class="getHeadClass">
			<!-- <slot name="title"> -->
				<text v-if="headTitle" class="font-sm font-weight">{{headTitle}}</text>
			<!-- </slot> -->
		</view>
		
		<!-- body -->
		<!-- <view :class="{'p-2':bodyPadding}" -->
		<view :class="getBodyClass">
			<image v-if="bodyCover" :src="bodyCover" 
			mode="widthFix"></image>
			<slot />
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			// 头部标题
			headTitle:String,
			// 封面图
			bodyCover:String,
			// 是否显示头部
			showhead:{
				type:Boolean,
				default:true
			},
			bodyPadding:{
				type:Boolean,
				default:false
			},
			// 头部下边框
			headBorderBottom:{
				type:Boolean,
				default:false
			},
			bodyPadding:{
				type:Boolean,
				default:false
			},
		},
		computed:{
			getHeadClass(){
				return {
					'border-bottom':this.headBorderBottom,
				}
			},
			getBodyClass(){
				return {
					'p-2':this.bodyPadding
				}
			}
		}
	}
</script>

<style>
</style>