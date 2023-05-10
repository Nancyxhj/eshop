import {reqSearchList} from '@/api'

const state = { 
    searchResult:{},
};
const mutations = {
    SEARCHRESULT(state,value){
        state.searchResult=value;
    }
};
const actions = {
   async getSearchResult(context,params={}){
        let result= await reqSearchList(params)
        if(result.code==200){
            context.commit('SEARCHRESULT',result.data)
        }
    
    }

};

// 计算属性，简化仓库中数据
const getters = {
    // 若请求失败的情况下，则返回空对象  
    goodsList:(state)=>{return state.searchResult.goodsList||[]},
    attrsList:(state)=>{return state.searchResult.attrsList||[]},
    trademarkList:(state)=>{return state.searchResult.trademarkList||[]}
}

export default {
    state,
    mutations,
    actions,
    getters
}