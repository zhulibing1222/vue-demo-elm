import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Goods from './components/goods/goods.vue'
import Ratings from './components/ratings/ratings.vue'
import Seller from './components/seller/seller.vue'
import VueResource from'vue-resource'

import './common/css/index.styl'
import sData from '../data.json'
Vue.sData = sData;

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(VueResource);

const router = new VueRouter({
	mode: 'history',
  linkActiveClass:'active',
  linkExactActiveClass:'exactActive',
	routes:[
		{
			path:'/goods',
			name:'goods',
			component:Goods
		},
		{
			path:'/ratings',
			name:'ratings',
			component:Ratings
		},
		{
			path:'/seller',
			name:'seller',
			component:Seller
		}
	]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.replace('/goods')
