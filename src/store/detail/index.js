import { reqDetail, reqAddOrUpdateCart } from "@/api";
import {getUUID} from '@/utils/uuidToken.js'

const state = {
    detailInfo: {},
    // 游客临时身份
    uuid_token: getUUID()

}

const mutations = {
    GETDETAIL(state, data) {
        state.detailInfo = data
    },
}

const actions = {
    async getDetail(context, skuId) {
        let result = await reqDetail(skuId)
        if (result.code == 200) {
            context.commit('GETDETAIL', result.data)
        }

    },
    // 若dispatch传多个参数，放在对象里，读取的时候解构出来
    async addToCart(context, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('fail'))
        }

    }

}

const getters = {
    categoryView: (state) => state.detailInfo.categoryView || {},
    skuInfo: (state) => state.detailInfo.skuInfo || {},
    skuImageList(state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo.skuImageList : []
    },
    spuSaleAttrList: (state) => state.detailInfo.spuSaleAttrList || []
}

export default {
    state,
    mutations,
    actions,
    getters

}