<template>
    <div class="inputMoney_box">
        <div class="inputMoney_inner">
            <div class="inputMoney_dec">
                <p>收款金额</p>
            </div>
            <div class="input_box">
                <span>￥</span>
                <input type="number" ref="moneyInput"
                  v-model.number="defaultValue"
                  @click="foucs"
                  @blur="blur">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                defaultValue: '0.00'
            }
        },
        methods: {
            foucs() {
                this.$refs.moneyInput.value = this.$refs.moneyInput.value == '0.00' ? '' : this.$refs.moneyInput.value;
            },
            blur() {
                var reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                
                this.defaultValue = reg.test(this.$refs.moneyInput.value) ? (this.$refs.moneyInput.value-0).toFixed(2) : '';
            },
            format(val) {
                return (val+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
            }
        },
        watch: {
            defaultValue(n){
                this.defaultValue = /\.\d{2,}$/.test(n) ? (n-0).toFixed(2) : n;
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }


    .inputMoney_box {
        padding: 0 12px;
        margin-top: 57px;
        box-sizing: border-box;
        width: 100%;
        height: 142px;

        .inputMoney_inner {
            width: 100%;
            height: 100%;
            background-color: #fff;

            .inputMoney_dec {
                margin-top: 5px;
                width: 100%;
                height: 60px;

                p {
                    margin-left: 30px;
                    font-size: 14px;
                    line-height: 60px;
                }
            }

            .input_box {
                position: relative;
                width: 100%;
                height: 70px;

                span {
                    position: absolute;
                    top: 0;
                    margin-left: 30px;
                    width: 18px;
                    height: 70px;
                    font-size: 16px;
                    line-height: 70px;
                    display: inline-block;
                }

                input {
                    margin-left: 48px;
                    width: 80%;
                    height: 100%;
                    font-size: 38px;
                    line-height: 70px;
                    border: none;
                }
            }
        }
    }
</style>
