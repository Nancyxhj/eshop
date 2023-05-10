// api统一管理
import requests from "./request";
import mockRequest from "./mockAjax"
// 当请求真实接口时，用requests,假的请求用 mockRequest
// 三级联动接口 
export const reqCategoryList = () => {
    return requests({
        method: 'get',
        url: '/product/getBaseCategoryList'
        // url: '/data'
    })
}

// 获取banner 轮播图
export const reqGetBanner = () => mockRequest.get('/banner')

// 获取floor 信息
export const reqGetFloor = () => mockRequest.get('/floor')
// 获取搜索模块 /api/list post
export const reqSearchList = (params) => requests({
    method: 'post',
    url: '/list',
    data: params
})
// 获取detail 页
export const reqDetail = (skuId) => requests({
    methods: 'get',
    url: `/item/${skuId}`,
})
// 将产品加入购物车、或更新数量
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`
})
// 获得购物车列表
export const reqCartList = () => requests.get('/cart/cartList')
// 删除购物车
export const reqDeleteItem = (skuId) => requests({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
})
// isChecked 
export const reqCheckCart = (skuId, isChecked) => requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 获取验证码
export const reqGetCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)
// 注册  注意，多个参数时，直接传一个对象
export const reqRegister = (userInfo) => requests({
    method: 'post',
    url: '/user/passport/register',
    data: userInfo
})
// 登录
export const reqLogin = (params) => requests({
    method: 'post',
    url: '/user/passport/login',
    data: params
})
// 自动登录，获取用户信息
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')
// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')
// 获取用户地址信息
export const reqUserAdddress = () => requests.get('/user/userAddress/auth/findUserAddressList')
// 获取订单交易页信息
export const reqTrade = () => requests.get('/order/auth/trade')
// 提交订单
export const reqSubmitOrder = (tradeNo, params) => requests({
    method: 'post',
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data: params
})
// 获取订单支付信息 
export const reqPaymentInfo = (orderId) => requests({
    method: 'get',
    url: `/payment/weixin/createNative/${orderId}`
})
// 查询支付状态
export const reqOrderStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)
// 获取订单列表
export const reqMyOrderList = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)