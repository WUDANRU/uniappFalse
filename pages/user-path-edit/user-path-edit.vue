<template>
	<view>

		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-3 text-secondary mr-1 flex-shrink">
				收货人：</view>
			<input class="px-1 font-3 flex-1" type="text" v-model="form.name" />
		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-3 text-secondary mr-1 flex-shrink">
				手机号码：</view>
			<input class="px-1 font-md flex-1" type="text" v-model="form.phone" />
		</view>

		<divider></divider>

		<view class="p-2 border-bottom d-flex a-center bg-white">
			<view class="font-3 text-secondary mr-1 flex-shrink">
				所在地区：</view>
			<input class="px-1 font-3 flex-1" type="text" disabled @click="showMulLinkageThreePicker"
				placeholder="请选择所在地区" :value="form.path" />

			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="pickerValue"
				@onConfirm="onConfirm"></mpvue-city-picker>

		</view>
		<view class="p-2 d-flex a-center bg-white">
			<view class="font-3 text-secondary mr-1 flex-shrink">
				详细地址：</view>
			<input class="px-1 font-3 flex-1" type="text" v-model="form.detailPath" />
		</view>

		<divider></divider>

		<view class="p-2 d-flex a-center bg-white">
			<view class="font-3 text-secondary mr-1 flex-shrink">
				设为默认地址：</view>
			<switch :checked="form.isdefault" @change="form.isdefault=$event.detail.value" class="ml-auto"
				color="#FD6801" />
		</view>
		<!-- 类似v-model的功能： @change="form.isdefault=$event.detail.value" -->

		<view class="p-3">
			<view @click="submit" class="text-center w-100 main-bg-color text-white font-3 rounded py-2"
				hover-class="main-bg-hover-color">
				保 存
			</view>
		</view>

	</view>
</template>

<script>
	import mpvueCityPicker from "@/components/uni-ui/mpvue-citypicker/mpvueCityPicker.vue"

	import {
		// mapMutations,
		mapActions
	} from 'vuex'

	export default {
		components: {
			mpvueCityPicker,
		},
		data() {
			return { //修改和创建都是这个user-path-edit页面,通过isedit:true或isedit:false判断是修改还是创建
				isedit: false, //false是创建，true是修改  //path.js写了updatePath再到isedit
				themeColor: '#007AFF',
				pickerValue: [0, 0, 1],
				index: -1,
				form: {
					path: '', //这些是v-model的数据
					name: '',
					phone: '',
					detailPath: '',
					isdefault: false //true为默认地址
				}
			}
		},
		onBackPress() { //app端监听页面返回
			if (this.$refs.mpvueCityPicker.showPicker) { //手机点击返回键，如果显示三级联动，关闭三级联动再返回
				this.$refs.mpvueCityPicker.pickerCancel()
				return true
			}
		},
		onUnload() { //页面卸载
			if (this.$refs.mpvueCityPicker.showPicker) {
				this.$refs.mpvueCityPicker.pickerCancel()
			}
		},
		onLoad(e) { //user-path-list点击了修改跳转到user-path-edit页面的
			
			if (e.data) {
				let result = JSON.parse(e.data)
				this.index = result.dex
				this.form = result.item //修改某一个地址
				this.isedit = true //修改
			
			uni.setNavigationBarTitle({
				title:'修改收获地址'
			})
			
			}
		},
		methods: {
			// ...mapMutations(['createPath', 'updatePath']),
			...mapActions(['updatePathAction','createPathAction']),
			
			// 提交
			submit() {
				// 验证表单

				// 修改
				if (this.isedit) { //加入true为创建，false为修改
					this.updatePathAction({ //	this.updatePath({
						index: this.index,
						item: this.form
					})
					// return;  //还没有写后面时要加return,要不然会触发下面的创建
					uni.showToast({title:'修改成功'})
					return uni.navigateBack({
						delta:1
					})
				}

				// 创建
				this.createPathAction(this.form)
				uni.showToast({
					title: '创建成功'
				})
				uni.navigateBack({
					delta: 1 //返回上一页
				})
			},
			onConfirm(e) {
				this.form.path = e.label //所在地区，内蒙古自治区-阿拉善盟-阿拉善左旗
				this.pickerValue = e.value //[ 0,0,1 ]  负责提交到数据库，数据库和前端数据要统一
			},
			// 显示三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
		}
	}
</script>

<style>

</style>
