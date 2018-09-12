<template>
    <div class="user_invitation">
        <div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toUser" />
            <div class="card-title-name">
                修改密码
            </div>
        </div>
        <van-cell-group class="changePassword">
            <van-field
                v-model="currentPw"
                clearable
                label="旧密码"
                type="password"
                placeholder="请输入旧密码"
            />

            <van-field
                v-model="newPw"
                clearable
                label="新密码"
                type="password"
                placeholder="请输入新密码"
            />
            <van-field
                v-model="newPwAgain"
                clearable
                label="再次输入"
                type="password"
                placeholder="再次输入新密码"
            />
        </van-cell-group>

        <div class="alert_info">
            <div class="red" v-show="passError">密码请输入6-16位字母，数字或下划线</div>
            <div class="red" v-show="againError">两次密码输入不一致</div>
            <div>提示：登录密码和交易密码保持一致</div>
        </div>

        <!-- <md-field 
            v-model="code"
            placeholder="请输入验证码"
            :border="true"
        >
            <div slot="rightIcon" @click="getCode" class="getCode blue">
                <countdown v-if="counting" :time="60000" @countdownend="countdownend">
                    <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
                </countdown>
                <span v-else>发送验证码</span>
            </div>
        </md-field > -->
        <div class="card-submit">
            <van-button :class="{ 'btn': !(currentPw&&newPw&&newPwAgain) }" size='large' type="danger" :loading="isLogining" @click='save'>
                保存
            </van-button>
        </div>
    </div>
</template>

<script>
import field from '@/vue/components/field/';

export default {
    data() {
        return {
            currentPw: "",
            newPw: "",
            newPwAgain: '',
            code: "",
            passError: false,
            againError: false,
            counting: false,
            isLogining: false,
        };
    },
    components: {
        [field.name]: field
    },
    methods: {
        toUser() {
            this.$router.push({ name: "user" });
        },
        save() {
            if (!this.currentPw || !this.newPw || !this.newPwAgain) return;
            const reg = /^[\w]{6,16}$/;
            if(!reg.test(this.newPw)) return this.passError = true;
            if (this.newPw != this.newPwAgain) return this.againError = true;

            this.isLogining = true;
            this.$reqPost('mock/27/v1/password/update', {
                passwordOld: this.currentPw,
                passwordNew: this.newPw
            }).then(res => {
                this.isLogining = false;
                
                this.$router.push({ name: "login", query:{reset: true} });
            }).catch((err) => {
                Toast.fail(err.data.message);
                this.isLogining = false;
            })
        },
        getCode(){
            if(this.counting) return;
            this.counting = true;
        },
        countdownend(){
            this.counting = false;
        }
    },
    watch: {
        newPw(n){
            if (/^[\w]{6,16}$/.test(n)) this.passError = false;
        },
        newPwAgain(n,o){
            if (this.newPw === this.newPwAgain) this.againError = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.user_invitation {
    margin-top: 45px;
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
    .changePassword {
        margin-top: 15px;
    }
    .alert_info {
        text-indent: 15px;
        line-height: 24px;
        padding: 5px 0;
    }
    .card-submit {
        margin: 60px 12px;
        .btn {
            color: #fff;
            background-color: #f8a0a0;
            border: 1px solid #f8a0a0;
        }
    }
}
</style>