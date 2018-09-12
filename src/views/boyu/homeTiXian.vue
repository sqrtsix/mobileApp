<template>
    <div class="jine-mingxi">
        <div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toHome" />
            <div class="card-title-name">
                提现
            </div>
        </div>
        <inputMoney ref="input_count"></inputMoney>
        <tranMode :bankName="bankName"></tranMode>
        <div class="next_btn_box">
            <van-button size="large" type="danger" @click="payfor">下一步</van-button>
        </div>
        
        <!-- <getMoneyNext></getMoneyNext> -->
    </div>
</template>
<script>
    import { Dialog } from 'vant';
    import inputMoney from './inputMoney';
    import tranMode from './tran-mode';
    // import getMoneyNext from './getMoneyNext'
    export default {
        data () {
            return {
                bankName: ""
            }
        },
        components: {
            [Dialog.name]: Dialog,
            inputMoney,
            tranMode,
            // getMoneyNext
        },
        methods: {
            payfor() {
                this.$reqPost('mock/27/v1/trans/withdraw', {
                    amount: this.$refs.input_count.defaultValue
                }).then(res => {
                    var tip = res.data.data.status == '10' ? '交易成功' : res.data.data.message;
                    
                    Dialog.alert({
                        message: tip
                    }).then(() => {
                        this.$refs.input_count.defaultValue = '0.00';
                    });
                })
            },
            toHome() {
                this.$router.push({ name: "home" });
            }
        }
    };
</script>
<style lang="scss" scoped>
.jine-mingxi {
    .card-title {
        position: fixed;
        top: 0;
        width: 100%;
        height: 45px;
        line-height: 45px;
        background-color: #fff;
        z-index: 9999;
        display: flex;

        .arrow {
            position: absolute;
            left: 10px;
            top: 16px;
            font-size: 14px;
        }
        .card-title-name {
            position: relative;
            font-size: 18px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        }
    }
    .next_btn_box {
        padding: 0 12px;
        margin-top: 20px;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
    }
}
</style>
