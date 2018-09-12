<template>
    <div class="tranMode" @click="getBank">
        <div class="tranMode_inner" v-if="info">
            <div class="tranMode_dec pull_left">
                <span>选择交易方式</span>
            </div>
            <div class="choose_card_box pull_right">
                <span>{{ message }}</span>
                <van-icon class="icon" name="arrow" />
            </div>
        </div>
        <div class="tranMode_inner card_data" v-else>
            <div class="tranMode_dec pull_left">
                <span>{{ cardMsg }}</span>
            </div>
            <div class="choose_card_box pull_right">
                <span>{{ cardNo }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { Icon } from 'vant';

    export default {
        props: {
            info: {
                type: Object,
                default: ""
            }
        },
        created() {
            if (!this.info) {
                this.$reqPost('mock/27/v1/my/certifyCheck').
                then(res => {
                    this.cardMsg = res.data.data.bankName;
                    this.cardNo = res.data.data.cardNo.substr(-4);
                })
            }
        },
        computed: {
            message() {
                if (this.info) {
                    return this.info.bankName && this.info.bankCode ? `${this.info.bankName} (${this.info.bankCode})` : this.cardMsg;
                }else {
                    return '';
                }
            }
        },
        data() {
            return {
                cardMsg: '',
                cardNo: ''
            }
        },
        components: {
            [Icon.name]: Icon
        },
        methods: {
            getBank() {
                this.$emit('toggle');
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }

    .tranMode {
        padding: 0 12px;
        margin-top: 12px;
        width: 100%;
        height: 50px;
        box-sizing: border-box;

        .tranMode_inner {
            padding: 0 15px;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
            background-color: #fff;

            &.card_data {
                padding: 0 30px;
            }

            .pull_left {
                float: left;
            }
            .pull_right {
                float: right;
            }
            div {
                display: inline-block;
                line-height: 50px;
            }
            .tranMode_dec {
                width: 40%;
                height: 100%;
                font-size: 16px;
            }
            .choose_card_box {
                display: flex;
                justify-content: flex-end;
                align-items: center;

                width: 60%;
                height: 100%;
                text-align: right;
                font-size: 0;

                span {
                    // width: 100px;
                    height: 100%;
                    font-size: 10px;
                    display: inline-block;
                }
                .icon {
                    // position: relative;
                    // top: 3px;
                    width: 20px;
                    font-size: 14px;
                    color: #a9a9a9;
                }
            }
        }
    }

</style>
