import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 三级联动组件
import TypeNav from '@/components/TypeNav'
// 全局——分页组件
import PagSeperate from '@/components/Pagination'
import  '@/mock/mockServer.js'
// 引入store
import store from '@/store'
// 引入swiper样式
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// 统一接受api 文件夹里面的全部接口
import * as API from '@/api'
// 引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import defaultPic from '@/assets/2.gif'
Vue.use(VueLazyload,{
  //  懒加载默认图片
   loading: defaultPic
})
// 引入表单验证插件
import "@/plugins/validate"



// 注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(PagSeperate.name,PagSeperate)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus=this;
    Vue.prototype.$API=API
  },
  router, 
  store,
}).$mount('#app')



