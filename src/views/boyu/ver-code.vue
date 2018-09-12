<template>
    <div class="verCode">
        <van-cell-group class="verCode_inner">
            <van-field
                v-model="mobile"
                label="银行预留手机号"
                label-align="right"
                input-align="right"
            />

            <md-field 
                v-model="code"
                placeholder="请先获取验证码"
                :border="true"
            >
                <div slot="rightIcon" @click="getCode" class="getCode red">
                    <countdown v-if="counting" :time="60000" @countdownend="countdownend">
                        <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
                    </countdown>
                    <span v-else>发送验证码</span>
                </div>
            </md-field >
        </van-cell-group>
    </div>
</template>

<script>
    import field from '@/vue/components/field/';
    import { Toast } from 'vant';

    export default {
        props: {
            info: Object
        },
        data () {
            return {
                counting: false,
                mobile: '',
                code: '',
                order: ''
            }
        },
        components: {
            [Toast.name]: Toast,
            [field.name]: field
        },
        created() {
            this.getMobile(this.info);
        },
        methods: {
            getMobile(row) {
                this.mobile = row.mobile;
            },
            getCode(){
                if(this.counting) return;
                const regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if(!regP.test(this.mobile)) return Toast.fail('请输入正确手机号');

                this.counting = true;
                this.$reqPost('mock/27/v1/sms/trans', {
					mobile: this.mobile,
					bindId: this.info.bindId || ''
				}).then(res => {
                    Toast.success('发送成功');

                    this.order = res.data.data.orderNo;
                })
            },
            countdownend(){
                this.counting = false;
            }
        },
        watch: {
            info: {
                handler(val,old) {
                    this.getMobile(val);
                },
                deep:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .pull_left {
        float: left;
    }
    .pull_right {
        float: right;
    }

    .verCode {
        padding: 0 12px;
        margin-top: 12px;
        width: 100%;
        height: 82px;
        box-sizing: border-box;

        .verCode_inner {
            width: 100%;
            height: 100%;
            background-color: #fff;

            div {
                padding: 0 10px;
                width: 100%;
                height: 41px;
                box-sizing: border-box;
                border-bottom: 1px solid #ececec;
                line-height: 40px;
            }
            .phone_num_dec {
                font-size: 14px;
                color: #4c4c4c;
            }

            .verCode_item_box {
                position: relative;
                line-height: 40px;

                input {
                    font-size: 14px;
                    border: none;
                }

                .get_code_btn {
                    position: relative;
                    top: 50%;
                    margin-top: -13.5px;
                    width: 70px;
                    height: 25px;
                    background-color: #df5441;
                    border: 1px solid #c44c3d;
                    border-radius: 3px;
                    font-size: 12px;
                    color: #fff;
                    line-height: 25px;
                    text-align: center;
                    display: inline-block;
                }
            }

        }
    }
</style>
