<template>
    <van-tabbar v-model="active" style="z-index: 1999">
        <van-tabbar-item
            v-for="(tab, index) in tabbar"
            :to="tab.path"
            :dot="tab.dot"
            :info="tab.info"
            :key="index">
            <img
                slot="icon"
                slot-scope="props"
                :src="props.active ? tab.active : tab.normal"
            >
            {{tab.name}}
        </van-tabbar-item>
    </van-tabbar>
</template>


<script>
    import { Tabbar, TabbarItem } from 'vant';
    export default {
        data() {
            return {
                active: 0,
                tabbar: [{
                        name: "首页",
                        path: "/",
                        pathName: "home",
                        normal: "./static/tar/首页-未选中.png",
                        active: "./static/tar/首页-选中.png",
                        icon: "compass-full",
                        dot: false,
                        info: ""
                    },
                    {
                        name: "信息",
                        path: "/items",
                        pathName: "class",
                        normal: "./static/tar/账单-未选中.png",
                        active: "./static/tar/账单-选中.png",
                        icon: "class-full",
                        dot: false,
                        info: ""
                    },
                    {
                        name: "我的",
                        path: "/user",
                        pathName: "user",
                        normal: "./static/tar/我的-未选中.png",
                        active: "./static/tar/我的-选中.png",
                        icon: "wode",
                        dot: false,
                        info: ""
                    }
                ]
            }
        },

        watch:{
            '$route': 'changeActive'
        },

        created(){
            const toName = this.$route.name
            this.setActive(toName)
        },

        methods: {
            changeActive({ name }){
                this.setActive(name)
            },
            setActive(name){
                this.tabbar.forEach((tab, i) => {
                    if(tab.pathName == name){
                        this.active = i;
                        return false;
                    }
                })
            }
        },

        components:{
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        }
    }

</script>
