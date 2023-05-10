import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import Demo from '@/pages/demo.vue'
import Learn from '@/pages/learn.vue'
Vue.use(VueRouter)

// 路由懒加载
const search = () => import('@/pages/Search')
const home = () => import('@/pages/Home')
const login = () => import('@/pages/Login')
const register = () => import('@/pages/Register')
const detail = () => import('@/pages/Detail')
const addcartsuccess = () => import('@/pages/AddCartSuccess')
const shopCart = () => import('@/pages/ShopCart')
const trade = () => import('@/pages/Trade')
const pay = () => import('@/pages/Pay')
const paySuccess = () => import('@/pages/PaySuccess')
const center = () => import('@/pages/Center')
const myOrder = () => import('@/pages/Center/myOrder.vue')
const groupOrder = () => import('@/pages/Center/groupOrder.vue')

// 获取token
let token = localStorage.getItem('TOKEN')
let name = store.state.user.userInfo.name
let router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: home,
            meta: { show: true }
        },
        {
            path: '/demo',
            component: Demo,
            meta: { show: false }
        },
        {
            path: '/learn',
            component: Learn,
            meta: { show: false }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: search,
            meta: { show: true },
        },
        {
            name: 'login',
            path: '/login',
            component: login,
            meta: { show: false },
        },
        {
            path: '/register',
            component: register,
            meta: { show: false }
        },
        // 重定向,项目跑起来立即定位到首页
        {
            path: '*',
            redirect: '/home',
            meta: { show: true }
        },
        {
            path: '/detail/:id',
            component: detail,
            meta: { show: true }
        },
        {
            path: '/addcartsuccess',
            name: 'addcart',
            component: addcartsuccess,
            meta: { show: true }
        },
        {
            path: '/shopcart',
            name: 'shopCart',
            component: shopCart,
            meta: { show: true }
        },
        {
            path: '/trade',
            name: 'trade',
            component: trade,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                // 只有shopcart 过来才能放行，否则
                if (from.path == '/shopcart') {
                    next();
                } else { next(false); }
            }
        },
        {
            path: '/pay',
            name: 'pay',
            component: pay,
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next()
                } else { next(false); }
            }
        },
        {
            path: '/paySuccess',
            component: paySuccess,
            meta: { show: true },
            // 注释了，用路由内守卫实现了，写起来一样
            // beforeEnter: (from, to, next) => {
            //     if (from.path == '/pay') {
            //         next()
            //     } else { next(false); }
            // }
        },
        {
            path: '/center',
            component: center,
            meta: { show: true },
            children: [
                {
                    path: 'myOrder',
                    component: myOrder,
                },
                {
                    path: 'groupOrder',
                    component: groupOrder,

                },
                // 重定向
                {
                    path: '/center',
                    redirect: 'myOrder'
                }
            ]
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        // 始终滚到顶部
        return { top: 100 }
    }
})
// 全局守卫  
router.beforeEach(async (to, from, next) => {
    // 已登录时，不让跳login，直接重定向到/，反之放行
    if (localStorage.getItem('TOKEN')) {
        if (to.path == '/login' || to.path == '/register') {
            next('/')
        } else {

            // 获取到用户信息，放行
            if (name) {
                next()
            } else {
                try {
                    // 重新发请求
                    await store.dispatch('getUserInfo')
                    console.log('已登录，但没userinfo，重新获取用户信息');
                    next()
                } catch (error) {
                    //   登录了没用户名，重发请求还失败了，说明token过期了,清除所有信息，重新跳到登录页
                    await store.dispatch('logout')
                    next('/login')
                }

            }

        }
    } else {
        // debugger
        if (to.path.indexOf('/center') != -1 || to.path == '/trade' || to.path == '/pay' || to.path == '/paySuccess') {
            // 把原本要去的地址存在query里
            next('/login?redirect=' + to.path)
        } else {
            next();
        }
    }


})




export default router;