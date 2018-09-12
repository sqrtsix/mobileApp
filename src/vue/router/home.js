const tab_home = () =>
    import ( /* webpackChunkName: "home-page" */ '@/views/boyu/homePage.vue');
const Tabbar = () =>
    import ( /* webpackChunkName: "Tabbar" */ '@/vue/components/Tabbar/');
const HomeMingxi = () =>
    import ( /* webpackChunkName: "mingxi" */ '@/views/boyu/mingxiPage.vue');
const HomeXiangqing = () =>
    import ( /* webpackChunkName: "HomeDetail" */ '@/views/boyu/HomeDetail.vue');
const HomeShoukuan = () =>
    import ( /* webpackChunkName: "HomeShoukuan" */ '@/views/boyu/HomeShoukuan.vue');
const HomeTiXian = () =>
    import ( /* webpackChunkName: "homeTiXian" */ '@/views/boyu/HomeTiXian.vue');
const HomeKaBao = () =>
    import ( /* webpackChunkName: "HomeKaBao" */ '@/views/boyu/HomeKaBao.vue');

export default [
    {
        path: "/",
        name: "home",
        components: {
            default: tab_home,
            tabbar: Tabbar,
        },
        meta: {
            keepAlive: true
        }
    }, {
        path: '/home',
        redirect: {
            name: 'home'
        }
    }, {
        path: "/home/mingxi",
        name: "mingxi",
        component: HomeMingxi
    }, {
        path: "/home/xiangqing",
        name: "xiangqing",
        component: HomeXiangqing
    }, {
        path: "/home/shoukuan",
        name: "shoukuan",
        component: HomeShoukuan
    }, {
        path: "/home/tixian",
        name: "tixian",
        component: HomeTiXian
    }, {
        path: "/home/kabao",
        name: "kabao",
        component: HomeKaBao
    }
]
