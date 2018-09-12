const tab_class = () => import(/* webpackChunkName: "tabbar-class" */ '@/views/items/tabbar-class.vue');

const Tabbar = () => import(/* webpackChunkName: "Tabbar" */ '@/vue/components/Tabbar/');


export default [{
    path: "/items",
    name: "class",
    meta: {
        keepAlive: true 
    },
    components: {default: tab_class, tabbar: Tabbar }
}]