<template>
	<md-field-group class="foget_view">
		<div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toLogin" />
            <login-header name="找回密码" />
        </div>
		
		<md-field 
			v-model="mobile"
			icon="icon-shouji"
			:is-error="phoneError"
			placeholder="请输入手机号"/>
		<div class="red" v-show="phoneError">请输入正确的手机号</div>
			
		<md-field 
			v-model="code"
			icon="icon-duihua2"
			placeholder="请输入短信验证码"
		>
			<div slot="rightIcon" @click="getCode" class="getCode red">
				<countdown v-if="counting" :time="60000" @countdownend="countdownend">
				  <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
				</countdown>
				<span v-else>获取验证码</span>
			</div>
		</md-field >
		
		<md-field 
			v-model="password"
			type="password"
			icon="icon-lock"
			:is-error="passError"
			placeholder="请输入新密码"
			:type="visiblePass ? 'text' : 'password'" 
			:right-icon="visiblePass ? 'password-not-view' : 'password-view'"
			@right-click="visiblePass = !visiblePass"/>
		<div class="red" v-show="passError">请输入6-16位字母，数字或下划线</div>
			
		<md-field 
			v-model="passwordRepeat"
			type="password"
			icon="icon-check-box-outline"
			:is-error="isErrow"
			placeholder="请再次输入密码" />
		<div class="red" v-show="isErrow">两次密码输入不一致</div>

		<div class="foget_submit">
			<van-button size="large" type="danger" @click="submitCode">重置</van-button>
		</div>

	</md-field-group>
</template>

<script>
	import field from '@/vue/components/field/';
	import fieldGroup from '@/vue/components/field-group/';
	import loginHeader from '../login-header';
	import { Dialog,Toast } from 'vant';
	
	export default {
		
		data(){
			return {
				phoneError: false,
				passError: false,
				isErrow: false,
				visiblePass: false,
				password: "",
				passwordRepeat: "",
				counting: false,
				mobile: "",
				code: ""
			}	
		},
		
		methods: {
			toLogin(){
				this.$router.push({path: '/login'});
			},
			submitCode(){
				const reg = /^[\w]{6,16}$/;
				if(!reg.test(this.password)) return this.passError = true;
				if(this.password != this.passwordRepeat) return;

				this.$reqPost('mock/27/v1/password/forgot', {
					mobile: this.mobile,
					password: this.password,
					smsCode: this.code
				}).then(res => {
					Dialog.alert({
						message: '密码重置成功',
						confirmButtonText: '去登录'
					}).then(() => {
						this.$router.push({path: '/login'});
					});
				})
			},
			getCode(){
				if(this.counting) return;
				const regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if(!regP.test(this.mobile)) return this.phoneError = true;
				this.counting = true;

				this.$reqPost('mock/27/v1/sms/send', {
					mobile: this.mobile,
					flag: 1
				}).then(res => {
					if(res.data.code == 0) Toast.success('发送成功');
				})
			},
			countdownend(){
				this.counting = false;
			}
		},
		
		components: {
			[loginHeader.name]: loginHeader,
			[field.name]: field,
			[fieldGroup.name]: fieldGroup,
			[Dialog.name]: Dialog,
			[Toast.name]: Toast
		},

		watch: {
			mobile(n,o){
				if(n){
					var regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
					if(regP.test(n)) this.phoneError = false;
				}
			},
			password(n,o){
				if(n){
					// var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
					var reg = /^[\w]{6,16}$/;
					this.passError = reg.test(n) ? false : true;
				}
			},
			passwordRepeat(n,o){
				this.isErrow = this.password === this.passwordRepeat ? false : true;
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	@import "../../../assets/scss/mixin";
	
	div.foget_view{
		background-color: #fff;
		padding-top: 30px;
	}
	
	div.foget_submit{
		padding-top: 30px;
		padding-bottom: 20px;
	}
	
	.getCode{
		@include one-border(left);
		text-align: center;
		cursor: pointer;
	}
	
	.time_down{
		color: $red;
	}

	div.foget_view{
		background-color: #fff;
		padding-top: 30px;
	}
	
	div.foget_submit{
		padding-top: 30px;
		padding-bottom: 20px;
	}
	
</style>

