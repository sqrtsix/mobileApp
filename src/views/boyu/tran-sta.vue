<template>
    <div class="tranSta">
        <div class="t_s_box">
            <div class="t_s_title">
                <img :src="shugang">
                <span class="t_s_titleMsg">交易统计</span>
            </div>
            <div class="t_s_count">
                <div class="img_box pull_left">
                    <img :src="jiaoyi">
                </div>
                <div class="tran_turn_box pull_left">
                    <p class="tran_turn_dec">交易额</p>
                    <p class="tran_turn">
                        {{money}}
                        <span>元</span>
                    </p>
                </div>
                <div class="tran_num_box pull_left">
                    <p class="tran_num_dec">交易笔数</p>
                    <p class="tran_num">
                        {{record}}
                        <span>笔</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import shugang from '../../assets/home/标题图标.png';
import jiaoyi from '../../assets/home/统计.png';
export default {
    props: {
        record: String,
        money: String
    },
    data () {
        return {
            tranTurn: '6784530.21',
            tranNum: '1900',
            shugang,
            jiaoyi
        }
    }
}
</script>

<style scoped>
    .pull_left {
        float: left
    }
    .tranSta {
        margin-top: 5px;
        width: 100%;
        height: 22%;
        background-color: #fff;
    }
    .t_s_box {
        width: 100%;
        height: 100%;
    }
    .t_s_title {
        width: 100%;
        height: 23%;
        border-bottom: 1px solid #f9f9f9;
    }
    .t_s_title img {
        /*position: relative;
        top: 20%;*/
        margin-left: 20px;
        width: 3px;
        border-radius: 1px;
        display: inline-block;
        background-image: url('https://ws3.sinaimg.cn/large/006tNbRwly1fv293on3fgj300800y0sh.jpg');
        background-repeat: no-repeat;
        line-height: 27px;
    }
    .t_s_title .t_s_titleMsg {
        /*position: absolute;
        left: 35px;*/
        vertical-align: middle;
        margin-left: 10px;
        width: 20%;
        color: #4d4d4d;
        font-size: 12px;
        display: inline-block;
        line-height: 27px;
    }
    .t_s_count {
        width: 100%;
        height: 77%;
    }
    .t_s_count div {
        display: inline-block;
    }
    .t_s_count .img_box {
        width: 30%;
        height: 100%;
    }
    .t_s_count .img_box img {
        margin-left: 5%;
        margin-right: 10%;
        width: 85%;
        /*height: 95%;*/
    }
    .t_s_count .tran_turn_box {
        margin-left: 5%;
        width: 35%;
        height: 100%;
    }
    .tran_turn_box .tran_turn_dec {
        margin-top: 25%;
        font-size: 12px;
        color: #4d4d4d;
    }
    .tran_turn_box .tran_turn {
        margin-top: 5%;
        font-size: 16px;
        color: #f46415;
    }
    .tran_turn_box .tran_turn span {
        font-size: 12px;
        color: #4d4d4d;
    }
    .t_s_count .tran_num_box {
        width: 25%;
        height: 100%;
    }
    .tran_num_box p {
        margin-left: 20%;
    }
    .tran_num_box .tran_num_dec {
        margin-top: 35%;
        font-size: 12px;
        color: #4d4d4d;
    }
    .tran_num_box .tran_num {
        margin-top: 7%;
        font-size: 16px;
        color: #f46415;
    }
    .tran_num_box .tran_num span {
        font-size: 12px;
        color: #4d4d4d;
    }
</style>
