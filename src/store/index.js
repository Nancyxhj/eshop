import Vue from 'vue'
import Vuex from 'vuex'
import search from './search';
import home from './home'
import detail from './detail'
import shopCart from './shopCart';
import user from './user.js'
import trade from './trade.js'
Vue.use(Vuex);

// 暴露vuex.store的实例，外部才能使用
export default new Vuex.Store({
    // 合并小仓库
    modules: {
        home,
        search,
        detail,
        shopCart,
        user,
        trade
    }
})