<template>
    <div class="getMoney">
        <getMoneyHeader></getMoneyHeader>
        <inputMoney ref="input_count"></inputMoney>
        <tranMode @toggle="getShow" :info="banks"></tranMode>
        <verCode ref="input_code" :info="banks"></verCode>
        <div class="next_btn_box">
            <van-button size="large" type="danger" @click="getMoney">下一步</van-button>
        </div>
        <van-popup v-model="show" position="right" overlay="false">
            <div class="bank_show">
                <bankSelect @back="back" @bank="bank" :show="show" :list="list"></bankSelect>
            </div>
        </van-popup>
        <!-- <getMoneyNext></getMoneyNext> -->
    </div>
</template>
<script>
    import { Dialog, Popup, Button } from 'vant';
    import getMoneyHeader from './getMoneyHeader';
    import inputMoney from './inputMoney';
    import tranMode from './tran-mode';
    import verCode from './ver-code';
    import bankSelect from './bank-select';
    // import getMoneyNext from './getMoneyNext'


    export default {
        data () {
            return {
                show: false,
                banks: {},
                list: [],
                bindId: '',
                smsCode: '',
                orderNo: ''
            }
        },
        components: {
            [Dialog.name]: Dialog,
            [Popup.name]: Popup,
            [Button.name]: Button,
            getMoneyHeader,
            inputMoney,
            tranMode,
            verCode,
            bankSelect
            // getMoneyNext
        },
        created() {
            this.$reqPost('mock/27/v1/card/list').
            then(res => {
                this.list = res.data.data.list;
                if (this.list.length != 0) this.banks = this.list[0];
            })
        },
        methods: {
            getShow() {
                this.show = true;
            },
            back() {
                this.show = false;
            },
            bank(row) {
                this.banks = row;
                this.back();
            },
            getMoney() {
                this.$reqPost('mock/27/v1/trans/consume', {
                    amount: this.$refs.input_count.defaultValue,
                    bindId: this.banks.bindId,
                    smsCode: this.$refs.input_code.code,
                    orderNo: this.$refs.input_code.order
                }).then(res => {
                    var tip = res.data.data.status == '10' ? '收款成功' : res.data.data.message;
                    
                    Dialog.alert({
                        message: tip
                    }).then(() => {
                        this.$refs.input_count.defaultValue = '0.00';
                    });
                })
            }
        }
    };
</script>

<style scoped>
    .next_btn_box {
        padding: 0 12px;
        margin-top: 20px;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
    }
    .bank_show {
        padding-top: 45px;
        box-sizing: border-box;
        height: 100vh;
        width: 100vw;
    }

</style>
