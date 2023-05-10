import { reqCategoryList,reqGetBanner,reqGetFloor } from '@/api'
const state = {
    categoryList: [],
    bannerList:[],
    floorList:[]
};
const mutations = {
    CATEGORYLIST(state, value) {
        state.categoryList = value;
    },
    BANNERLIST(state,value){
        state.bannerList=value
    },
    FLOORLIST(state,value){
        state.floorList=value
    }
};
const actions = {
    async categoryList(context) {
        let result = await reqCategoryList();
        context.commit('CATEGORYLIST', result)
        // 自己本地写了个接口，暂时先注释掉
        // if (result.code == 200) {
        //     context.commit('CATEGORYLIST', result.data)

        // }


    },
    async getBannerList(context){
        let result=await reqGetBanner()
        context.commit('BANNERLIST',result.data)
    },
    async getFloorList(context){
        let result=await reqGetFloor()
        context.commit('FLOORLIST',result.data)
    }
};
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}