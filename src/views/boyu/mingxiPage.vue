<template>
    <div class="jine-mingxi">
        <div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toHome" />
            <div class="card-title-name">
                余额明细
            </div>
        </div>

        <div class="margintop45">
            <van-tabs v-model="search.queryType" swipeable sticky @change="getList">
                <van-tab v-for="(con,i) in items" :key="i">
                    <div slot="title"> {{ con.title }} </div>

                    <van-list
                      v-model="loading"
                      :finished="finished"
                      @load="onLoad"
                    >
                        <!-- <van-cell v-for="item in list" :key="item" :title="item + ''" /> -->
                        <li class="information-list" v-for="(item,k) in list" :key='k' @click="toDetail(item)">
                            <div class="information-list-words">
                                <h5 class="list-words-title">{{ item.orderNo }}</h5>
                                <p class="list-words-desc">{{ item.date }}</p>
                                <p class="list-words-desc">{{ item.orderNo }}</p>
                            </div>
                            <div  class="information-list-right">
                                <span class="information-list-state" :class="getClass(item.status)">交易{{ state[item.status] }}</span>
                                <span class="information-list-money" :class="{active: item.direction === '+'}">{{ item.direction + item.amount }}</span>
                            </div>
                            <!-- <i class="van-icon van-icon-arrow"></i> -->
                        </li>
                    </van-list>

                    <div class="information-default" v-if="list.length === 0"><img src="../../assets/images/information-default.png" alt=""></div>
                </van-tab>
            </van-tabs>
        </div>
    </div> 
</template>
<script>
    import { Tab, Tabs, Card, Icon } from "vant";

    export default {
        data() {
            return {
                list: [],
                loading: false,
                finished: false,
                items: [
                    { title: "收入" },
                    { title: "支出" },
                    { title: "全部" },
                ],
                state: {
                    '00': '处理中',
                    '10': '成功',
                    '20': '失败'
                },
                stateClass: {
                    '00': 'process',
                    '10': 'success',
                    '20': 'fault'
                },
                search: {
                    pageSize: 5,
                    currPage: 1,
                    beginDate: '',
                    endDate: '',
                    queryType: 2
                }
            };
        },
        created() {
            this.getList();
        },
        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Card.name]: Card,
            [Icon.name]: Icon
        },
        methods: {
            getList() {
                this.search.currPage = 1;
                this.finished = false;
                this.list = [];
            },
            getClass(state) {
                return this.stateClass[state];
            },
            toHome() {
                this.$router.push({ name: "home" });
            },
            toDetail(row) {
                this.$router.push({ name: "xiangqing", query: {orderNo: row.orderNo,type: row.type} });
            },
            onLoad() {
                this.$reqPost('mock/27/v1/trans/list',this.search).
                then(res => {
                    var part = res.data.data;
                    this.list = this.list.concat(part.list);

                    this.loading = false;

                    if (part.pageSize*part.currPage - part.totalNum >= 0) this.finished = true;
                    this.search.currPage++;
                })
            }
        }
    };
</script>

<style scoped>
    .jine-mingxi .card-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        z-index: 9999;
        display: flex;
    }
    .jine-mingxi .card-title .arrow {
        position: absolute;
        left: 10px;
        top: 16px;
        font-size: 14px;
    }
    .jine-mingxi .card-title .card-title-name {
        position: relative;
        font-size: 18px;
        margin: 0 auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }

    .margintop45 {
        margin-top: 45px;
        height: 100%;
    }
    .view-router {
        background-color: #fff; 
    }
    .information-list {
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 7px 10px;
        padding: 1px 5px;
        -webkit-box-shadow: 1px 3px 9px 1px rgba(79, 83, 87, 0.3);
        box-shadow: 1px 3px 4px 1px rgba(79, 83, 87, 0.3);
    }
    .information-list-words {
        height: 100%;
        padding-left: 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .information-list-right{
        height: 100%;
        padding-right: 7px;
        text-align: right;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        /*position: relative;
        width: 7%;*/
    }
    .information-list-state.process {
        color: #f85;
    }
    .information-list-state.success {
        color: #4b0;
    }
    .information-list-state.fault {
        color: #f44;
    }
    .information-list-money{
        /*position: absolute;
        right: 30px;
        top: -1px;*/
    }
    .information-list-money.active{
        color: #f00;
    }
    .list-words-title {
        margin: 0;
        font-weight: 600;
        font-size: 14px;
        line-height: 25px;
    }
    .list-words-desc {
        margin: 0;
        width: 100%;
        font-size: 12px;
        color: #666;
    }
    .information-default{
        position: relative;
        height: 80vh;
    }
    .information-default img {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        margin: auto;
    }
</style>




