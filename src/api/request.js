import axios from 'axios'
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import store from '@/store'

// 正常的请求
const requests = axios.create({
    baseURL: " http://gmall-h5-api.atguigu.cn/api",
    // baseURL: "http://localhost:3000",
    timeout: 5000
})

// 请求拦截器
requests.interceptors.request.use((config) => {

    config.headers.userTempId = store.state.detail.uuid_token
    config.headers.token=localStorage.getItem('TOKEN')
    // 把token带给服务器
    // if (store.state.user.token) {
    //     config.headers.token = store.state.user.token
    // }
    nprogress.start();
    return config;
})
// 响应拦截
requests.interceptors.response.use((res) => {

    nprogress.done()
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'))
})

export default requests