<template>

    <van-tabs class="info_notic_fixed" v-model="active" sticky swipeable @change="getList">
        <van-tab v-for="(index,i) in items" :key="i">
            <div slot="title"> {{ index.tittle }} </div>
    
            <ul>
                <li class="information-list" v-for="(item,k) in index.comtant" :key='k'>
                    <!-- <div class="information-list-img">
                        <img :src="item.imageUR" alt="">
                    </div> -->
                    <div class="information-list-words">
                        <h5 class="list-words-title">{{ item.title }}</h5>
                        <p class="list-words-desc">{{ item.content }}</p>
                        <p class="list-words-desc">{{ item.date }}</p>
                    </div>
                    <i class="information-list-icon van-icon van-icon-arrow"></i>
                </li>
            </ul>
            <div class="information-default" v-if="index.comtant.length === 0"><img src="../../assets/images/information-default.png" alt=""></div>
        </van-tab>
    </van-tabs>
    

</template>

<script>
    import { GOODS_CATEGORY } from '@/api/goods';
    
    import { Tab, Tabs } from 'vant';
    import { Card } from 'vant';
    import { Icon } from 'vant';
    
    export default {
        data(){
            return {
                items: [
                    {
                        tittle: '系统公告',
                        comtant:[
                        // {
                        //     title: '系统1',
                        //     content: '描述' ,
                        //     date: '',
                        //     imageURL: ''
                        // },{
                        //     title: '系统1',
                        //     content: '描述',
                        //     date: '',
                        //     imageURL: ''
                        // }
                        ]
                    },{
                        tittle: '个人通知',
                        comtant:[]
                    }
                ],
                active: 0,
                title:'',
                viewShow: false         
            }
        },

        created() {
            this.getList();
        },
        
        methods: {
            getList() {
                this.$reqPost('mock/27/v1/notice/list',{
                    flag: this.active
                }).
                then(res => {
                    this.items[this.active].comtant = res.data.data.list;
                })
            }
        },
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Card.name]: Card,
            [Icon.name]: Icon
        }
    }
</script>


<style scoped>

    .view-router{
        background-color: #fff;
    }
    .information-list{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 7px 10px;
        padding: 0 5px;
        -webkit-box-shadow: 1px 3px 9px 1px rgba(79, 83, 87, 0.3);
        box-shadow: 1px 3px 4px 1px rgba(79, 83, 87, 0.3);
        
    }
    .information-list-img {
        width: 25%;
        flex-shrink: 0;
    }
    .information-list-words{
        width: 65%;
    }
    .information-list-icon{
        width: 8%;
    }
    .list-words-title{
        margin: 8px 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 20px;
    }
    .list-words-desc{
        margin: 8px 0;
        width: 100%;
        font-size: 12px;
        color: #666;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .information-default img{
        position: absolute;
        top: 0;bottom: 0;
        right: 0;left: 0;
        margin: auto;
    }   

</style>