import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home.vue')
const Sort = () => import('../views/sort/Sort.vue')
const Cart = () => import('../views/cart/Cart.vue')
const My = () => import('../views/my/My.vue')
const Detail = () => import('../views/detail/Detail.vue')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes=[
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/home',
        name:'Home',
        component:Home
    },
    {
        path:'/sort',
        name:'Sort',
        component:Sort
    },
    {
        path:'/cart',
        name:'Cart',
        component:Cart
    },
    {
        path:'/my',
        name:'My',
        component:My
    },
    {
        path:'/detail/:id',
        name:'Detail',
        component:Detail
    }
]
const router=new VueRouter({
    routes,
    mode:'history'
})

export default router
