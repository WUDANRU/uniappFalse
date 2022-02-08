export default {
	state: {
		// list:[],
		list: [ //购物车列表
			{
				checked: false,
				id: 11, //每件商品id是不一样的
				title: "商品标题11",
				cover: "/static/images/demo/list/1.jpg",
				// 选中商品属性
				attrs: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: '火焰红',
							},
							{
								name: '炭黑',
							},
							{
								name: '冰川兰',
							}
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: '64GB',
							},
							{
								name: '128GB',
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: '标配',
							},
							{
								name: '套餐一',
							},
							{
								name: '套餐二',
							}
						]
					},
				],
				pprice: 336,
				num: 1,
				minnum: 1,
				maxnum: 10, // 该商品最大商品数，跟库存有关
			}, {
				checked: false,
				id: 12,
				title: "商品标题12",
				cover: "/static/images/demo/list/1.jpg",
				// 选中商品属性
				attrs: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: '火焰红',
							},
							{
								name: '炭黑',
							},
							{
								name: '冰川兰',
							}
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: '64GB',
							},
							{
								name: '128GB',
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: '标配',
							},
							{
								name: '套餐一',
							},
							{
								name: '套餐二',
							}
						]
					},
				],
				pprice: 336,
				num: 1,
				minnum: 1,
				maxnum: 10, // 该商品最大商品数，跟库存有关
			},
			{
				checked: false,
				id: 13, //每件商品id是不一样的
				title: "商品标题13",
				cover: "/static/images/demo/list/1.jpg",
				// 选中商品属性
				attrs: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: '火焰红',
							},
							{
								name: '炭黑',
							},
							{
								name: '冰川兰',
							}
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: '64GB',
							},
							{
								name: '128GB',
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: '标配',
							},
							{
								name: '套餐一',
							},
							{
								name: '套餐二',
							}
						]
					},
				],
				pprice: 336,
				num: 1,
				minnum: 1,
				maxnum: 10, // 该商品最大商品数，跟库存有关
			},
			{
				checked: false,
				id: 14, //每件商品id是不一样的
				title: "商品标题14",
				cover: "/static/images/demo/list/1.jpg",
				// 选中商品属性
				attrs: [{
						title: "颜色",
						selected: 0,
						list: [{
								name: '火焰红',
							},
							{
								name: '炭黑',
							},
							{
								name: '冰川兰',
							}
						]
					},
					{
						title: "容量",
						selected: 0,
						list: [{
								name: '64GB',
							},
							{
								name: '128GB',
							},
						]
					},
					{
						title: "套餐",
						selected: 0,
						list: [{
								name: '标配',
							},
							{
								name: '套餐一',
							},
							{
								name: '套餐二',
							}
						]
					},
				],
				pprice: 336,
				num: 1,
				minnum: 1,
				maxnum: 10, // 该商品最大商品数，跟库存有关
			},
		],
		// 弹出框当前索引
		popupIndex: -1,
		// popup显示
		popupShow: "none",
		// 选中列表(存放选中的id)
		selectedList: []
	},
	getters: {
		// 判断是否全选
		checkedAll: (state) => {
			// 下面的代码(dODelGoods)点击一个商品删除后全选框会打勾是因为下面的代码,因为删的跟剩下的相等就会打勾
			return state.list.length === state.selectedList.length

			// if (state.list.length >= 1) { //表示剩下有几个商品
			// 	console.log('a', state.list.length, state.selectedList.length)
				// console.log(state.list[this.i],'lllllllllll')
				// 	if(state.list.length===state.selectedList.length){
				// 		// 目的：让点击商品删除后全选框不会打勾
				// 		//一共4个商品，删了2个，还剩2个
				// 		return false//这个不能写固定 //点击一个商品删除后全选框会打勾，如果删了的和剩下的一样就让全选框不会打勾

				// }
				// return state.list.length === state.selectedList.length //需要动态true/false 不能只写false
			// }
			//  else {
			// 	console.log('b', state.list.length, state.selectedList.length)
			// 	return state.list.length === state.selectedList.length //判断是否全选
			// }

		},
		// 合计
		totalPrice: (state) => {
			var total = 0
			state.list.forEach(v => {
				if (state.selectedList.indexOf(v.id) > -1) { //这个商品需要在已选的里面才能计算价格，已选里有id才能计算价格
					total += v.num * v.pprice
				}
			})
			return total;
		},
		disableSelectAll: (state) => { //radio的disable有bug,吧cart.vue的全选的disable=:disable="disableSelectAll" 删掉
			// return state.list.length === 0 //将上面改为list:[]，radio的disable不起作用
		},
		// 拿到当前需要修改属性的商品
		popupData: (state) => { //popupData拿到的是state.list里其中一个需要修改属性的商品，比如state.list[0]
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {}
		}
	},
	mutations: {
		// 选中/取消选中某个商品
		selectItem(state, index) {
			var id = state.list[index].id
			var i = state.selectedList.indexOf(id) //返回下标0或者-1
			console.log(i) //-1

			//之前是选中，取消选中
			if (i > -1) {
				// console.log(i,'this.listId') //这里不会进来
				// 取消当前商品选中状态
				state.list[index].checked = false
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i, 1) //这里要写i,不能写id  //1代表删除1个
			}
			//选中
			state.list[index].checked = true
			state.selectedList.unshift(id)


			// state.list[index].checked=!state.list[index].checked
			// if(state.list[index].checked){
			// 	state.list[index].checked=false
			// }
		},
		// 全选,拿到全部id
		selectAll(state) {
			state.selectedList = state.list.map(v => {
				// 设置选中状态
				v.checked = true
				return v.id
			})
		},
		// 取消全选
		unSelectAll(state) {
			state.list.forEach(v => {
				// 设置选中状态
				v.checked = false
			})
			state.selectedList = []
		},
		// 删除选中
		delGoods(state) { //11 12 13  选中13  过滤掉了13，两个结果(state.list和return...)拿到的都是11，12
			state.list = state.list.filter(v => {
				console.log(state.list, 'list', state.selectedList, 'selectedList') //当我选中12，selectedList这个里面是12
				// return代表最后，这句表示要看最后 -1代表最后不存在   if(state.selectedList.indexOf(v.id) === -1)代表的是现在不存在，不代表最后
				return state.selectedList.indexOf(v.id) === -1 //-1表示最后不存在(选中列表里面),最后要删除的
			}) //filter:  return true过滤掉false,return false过滤掉true
		},
		// 初始化弹出框当前索引
		initPopupIndex(state, index) {
			state.popupIndex = index
		},
		// 加入购物车
		addGoodsToCart(state, goods) {
			state.list.unshift(goods)
		}
	},
	actions: { //全选？取消全选：全选     //commit执行，提交
		// 显示popup
		doShowPopup({
			state,
			commit
		}, index) {
			commit('initPopupIndex', index)
			state.popupShow = "show"
		},
		// 隐藏popup
		doHidePopup({
			state
		}) {
			state.popupShow = "hide"
			setTimeout(() => {
				state.popupShow = "none"
				commit('initPopupIndex', -1) //隐藏弹出框是回归到初始化-1
			}, 200)
		},
		doSelectAll({
			commit,
			getters
		}) {
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll')
		},
		dODelGoods({
			commit,
			state
		}) {
			uni.showModal({ //模态框
				content: '是否删除选中',
				success: (res) => {
					if (res.confirm) {
						commit('delGoods')
						uni.showToast({ //提示框
							title: '删除成功'
						})
					}
				}
			})
		}
	}
}
