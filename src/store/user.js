import { reqGetCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, clearToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken,
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    LOGIN(state, token) {
        state.token = token
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    LOGOUT(state) {
        // 把仓库中的所有用户信息清空
        state.userInfo = {},
            state.token = ''
        clearToken()

    }
}


const actions = {
    async getCode(context, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            context.commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async register(context, userInfo) {
        let result = await reqRegister(userInfo)
        console.log(result);
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error(result.message))
        }

    },
    async login(context, userInfo) {
        let result = await reqLogin(userInfo)
        console.log(result.data.token, '登录');
        if (result.code == 200) {
            context.commit('LOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo(context) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            context.commit('USERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    async logout(context) {
        const result = await reqLogout()
        if (result.code == 200) {
            context.commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
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
