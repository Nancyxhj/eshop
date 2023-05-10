import { reqUserAdddress, reqTrade } from "@/api";

const state = {
    userAddress: [],
    orderInfo: {}
}
const mutations = {
    USERADRESS(state, adress) {
        state.userAddress = adress
    },
    GETORDERINFO(state, info) {
        state.orderInfo = info
    }

}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqUserAdddress()
        console.log(result, '获取用户地址');
        if (result.code == 200) {
            commit('USERADRESS', result.data)
        }
    },
    // 获取订单信息
    async getOrderInfo({ commit }) {
        let result = await reqTrade()
        if (result.code == 200) {
            commit('GETORDERINFO', result.data)
        }
    }

}




const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}