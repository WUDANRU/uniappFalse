import Vue from 'vue'
import App from './App'
import store from "./store"
import divider from './components/divider.vue'

// 引入全局加载动画
import loading from "@/components/loading.vue"
Vue.component('loading',loading)

import loadingPlus from "components/mixin/loading-plus.vue"
Vue.component('loading-plus',loadingPlus)

Vue.prototype.$store = store

Vue.config.productionTip = false
Vue.component('divider',divider)

App.mpType = 'app'

const app = new Vue({
    ...App,
		store,
})
app.$mount()
