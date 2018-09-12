<template>
	<md-field-group class="register_view">
		<login-header name="商户注册" />

		<md-field 
			v-model="mobile"
			icon="icon-shouji"
			right-icon="clear"
			:is-error="phoneError"
			placeholder="请输入手机号"
			@right-click="clearText" />
		<div class="red" v-show="phoneError">请输入正确的手机号</div>

		<md-field 
			v-model="password" 
			icon="icon-lock" 
			placeholder="请输入密码(6-16位字母，数字或下划线)"
			:is-error="passError"
			:type="visiblePass ? 'text' : 'password'" 
			:right-icon="visiblePass ? 'password-not-view' : 'password-view'"
			@right-click="visiblePass = !visiblePass" />
		<div class="red" v-show="passError">请输入6-16位字母，数字或下划线</div>
		
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
			v-model="userPeople"
			icon="icon-yonghu"
			placeholder="请输入推荐人手机号(选填)" />
			
		<div class="register_submit">
			<van-button size="large" type="danger" @click="submitCode">注册</van-button>
		</div>
		
		<div class="register_footer">
			已有账号?
			<router-link to="/login" class="red">立即登录</router-link>
		</div>
	</md-field-group>
</template>

<script>
	import loginHeader from '../login-header';
	import field from '@/vue/components/field/';
	import fieldGroup from '@/vue/components/field-group/';
	import { Dialog,Toast } from 'vant';
	
	export default {
		
		data(){
			return {
				phoneError: false,
				passError: false,
				mobile: "",
				password: "",
				visiblePass: false,
				counting: false,
				code: "",
				userPeople: ""
			}	
		},
		
		methods: {
			clearText() {
				this.mobile = "";
			},
			getCode(){
				if(this.counting) return;
				const regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if(!regP.test(this.mobile)) return this.phoneError = true;

				this.counting = true;
				
				this.$reqPost('mock/27/v1/sms/send', {
					mobile: this.mobile,
					flag: 0
				}).then(res => {
					if(res.data.code == 0) Toast.success('发送成功');
				})
			},
			countdownend(){
				this.counting = false;
			},
			submitCode(){
				const reg = /^[\w]{6,16}$/;
				if(!reg.test(this.password)) return this.passError = true;

				this.$reqPost('mock/27/v1/merchant/register', {
					mobile: this.mobile,
					password: this.password,
					smsCode: this.code,
					referrer: this.userPeople
				}).then(res => {
					Dialog.alert({
						message: '注册成功',
						confirmButtonText: '去登录'
					}).then(() => {
						this.$router.push({path: '/login'})
					});
				})
			}
		},
		
		components: {
			[loginHeader.name]: loginHeader,
			[field.name]: field,
			[fieldGroup.name]: fieldGroup,
			[Dialog.name]: Dialog,
			[Toast.name]: Toast,
		},

		watch: {
			password(n){
				if(n){
					var reg = /^[\w]{6,16}$/;
					this.passError = reg.test(n) ? false : true;
				}
			},
			mobile(n,o){
				if(n){
					var regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
					if(regP.test(n)) this.phoneError = false;
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	
	div.register_view{
		background-color: #fff;
		padding-top: 30px;
	}
	
	div.register_submit{
		padding-top: 30px;
		padding-bottom: 20px;
	}
	
	.register_footer{
		text-align: right;
		color: $font-color-gray;
	}
</style>

