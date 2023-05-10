import { reqCartList, reqCheckCart } from "@/api";

const state = {
    shopCartList: []
}
const mutations = {
    GETSHOPCARTLIST(state, data) {
        state.shopCartList = data
    }
}


const actions = {
    // 发请求
    async getShopCartList(context) {
        let result = await reqCartList();
        if (result.code == 200) {
            context.commit('GETSHOPCARTLIST', result.data[0].cartInfoList)
        }
    },
    async getCheckedCart(context, { skuId, isChecked }) {
        let result = await reqCheckCart(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    // todo 批量全选
    updateAllCart(context,isChecked){

         console.log(context,isChecked);
    }
}







const getters = {}


export default {
    state,
    mutations,
    actions,
    getters
}