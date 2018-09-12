<template>
	<div>
		<md-field-group>
			<md-field 
				v-model="account"
				icon="icon-shouji" 
				placeholder="请输入手机号"
				:is-error="phoneError"
				right-icon="clear"
				@right-click="clearText" />
			<div class="red" v-show="phoneError">请输入正确的手机号</div>
				
			<md-field 
				v-model="password" 
				icon="icon-lock" 
				placeholder="请输入密码(6-16位字母，数字或下划线)"
				:is-error="isErrow"
				:type="visiblePass ? 'text' : 'password'" 
				:right-icon="visiblePass ? 'password-not-view' : 'password-view'"
				@right-click="visiblePass = !visiblePass" />
			<div class="red" v-show="isErrow">请输入6-16位字母，数字或下划线</div>
				
			<div class="clearfix">
				<!-- <div class="float-l red">可用妈妈去哪儿账号登录</div> -->
				<div class="float-l rember" @click="toggle">
					<i class="fa" :class="checked?'fa-check-circle-o':'fa-circle-o'"></i> 记住密码
				</div>
				<div class="float-r"><router-link to="/login/forget">忘记密码?</router-link></div>
			</div>
			
			<van-button size="large" type="danger" :loading="isLogining" @click="loginSubmit">登录</van-button>
		</md-field-group>
		
		<div class="register clearfix">
			<!-- <div class="float-l connect">
				<span @click="showKefu = true">联系客服</span>
			</div> -->
			<div class="phone_regis"><router-link to="/login/registerGetCode">手机号快速注册</router-link></div>
		</div>
	</div>
</template>

<script>
	import field from '@/vue/components/field/';
	import fieldGroup from '@/vue/components/field-group/';
	import { Checkbox, CheckboxGroup, Toast } from 'vant';

	import {
		USER_LOGIN,
		USER_PROFILE
	} from '@/api/user';

	export default {
		name: "login-request",

		data() {
			return {
				phoneError: false,
				isErrow: false,
				checked: false,
				account: "",
				password: "",
				visiblePass: false,
				showKefu: false,
				isLogining: false,
			}
		},

		created() {
			if (this.$route.query.reset) return;
			this.account = this.$util.getLocalStorage('name').name;
			this.password = this.$util.getLocalStorage('password').password;
			if(this.account && this.password) this.checked = true;
		},

		methods: {
			toggle() {
				this.checked = !this.checked;
			},
			clearText() {
				this.account = "";
			},
			loginSubmit() {
				const regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
				if(!regP.test(this.account)) return this.phoneError = true;

				const reg = /^[\w]{6,16}$/;
				if(!reg.test(this.password)) return this.isErrow = true;

				this.isLogining = true;
				this.$reqPost('mock/27/v1/auth/login', {
					mobile: this.account,
					password: this.password
				}).then(res => {
					this.isLogining = false;
					
					const localData = this.getLocalData(res.data.data);
					this.$util.setLocalStorage(localData);
					
					const redirect = this.$route.query.redirect || 'home';

					var uaerData = {}
					if(this.checked) {
						uaerData = {
							name: this.account,
							password: this.password
						};
					}else {
						uaerData = {
							name: '',
							password: ''
						};
					}

					this.$util.setLocalStorage(uaerData);
					
					this.$router.push({path: `/home`});
				}).catch((err) => {
					Toast.fail(err.data.message);
					this.isLogining = false;
				})
			},
			getLocalData(data) {
				if(!data) return {};
				return {
					custName: data.custName,
					token: data.token,
					mobile: data.mobile,
					status: data.status
				}
			}
		},

		components: {
			[field.name]: field,
			[fieldGroup.name]: fieldGroup,
			[Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
			[Toast.name]: Toast
		},

		watch: {
			password(n){
				if(/^[\w]{6,16}$/.test(n)) this.isErrow = false;
			},
			account(n,o){
				if(n){
					var regP = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
					if(regP.test(n)) this.phoneError = false;
				}
			},
		}
	}

</script>

<style lang="scss" scoped>
	
	@import "../../assets/scss/mixin";
	.rember {
		cursor: pointer;
	}
	.register {
		padding-top: 20px;
		color: $font-color-gray;
		text-align: center;
		a {
			color: $font-color-gray;
		}
		>div {
			// width: 50%;
			box-sizing: border-box;
			padding: 0 20px;
		}
		.connect {
			@include one-border(right);
			text-align: right;
		}
	}

</style>
