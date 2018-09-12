<template>
    <div class="jine-mingxi">
        <div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toHome" />
            <div class="card-title-name">
                收入详情
            </div>
        </div>

        <div class="margintop45">
            <div class="orderDetail">
                <div class="orderDetail-title">
                    <div class="orderDetail-title-left">交易金额</div>
                    <div class="orderDetail-title-right" :class="{active: content.direction === '+'}">{{ content.direction + content.amount }}</div>
                </div>
                <div>           
                    <van-cell-group>
                        <!-- <van-cell v-for="(item,index) in items" :title="item.title" :value="item.type" :key="index" /> -->
                        <van-cell title="交易类型" :value="{0: '收款', 1: '提现'}[content.type]" />
                        <van-cell title="交易时间" :value="content.date" />
                        <van-cell title="流水单号" :value="content.orderNo" />
                        <van-cell title="备注" :value="content.remark" />
                    </van-cell-group>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import { Cell, CellGroup } from 'vant';

export default {
    data() {
        return {
            items: [{
                title: '交易类型',
                type: '充值'
            },{
                title: '交易时间',
                type: '2018.09.10'
            },{
                title: '流水单号',
                type: 232323233223
            },{
                title: '备注',
                type: '备注'
            }] ,
            content: {},
            active: true
        };
    },
    created() {
        this.$reqPost('mock/27/v1/trans/detail',this.$route.query).
        then(res => {
            console.log(res.data.data);
            this.content = res.data.data;
        })
    },
    components: {
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
    },
    methods: {
        toHome() {
            this.$router.push({ name: "mingxi" });
        },
        isRed: function(sun) {
            return this.active = sun.charAt(0) === "+";
        }
    }
};
</script>

<style lang="scss" scoped>

    .jine-mingxi .card-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 45px;
        line-height: 45px;
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
    }
    .orderDetail{
        padding: 15px 5px;
        background: #fff;
    }
    .orderDetail-title{
        padding: 0 15px;
        height: 60px;
        line-height: 60px;
        border-bottom: 1px solid #999;
    }
    .orderDetail-title-left{
        float: left;
        font-size: 16px;
        font-weight: 600;
    }
    .orderDetail-title-right{
        float: right;
        font-size: 20px;
    }
    .orderDetail-title-right.active{
        color: #f00;
    }
</style>




