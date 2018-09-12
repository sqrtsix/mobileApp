<template>
	<div class="tabbar-user">
		<user-header :isLogin="isLogin" :data="data" />
		<user-module />
		<van-button  size="large" class="tabbar-user__quit" :loading="isLogining" v-if="isLogin" @click="quit">退出当前账户</van-button>
	</div>
</template>

<script>
	import userHeader from "./tabbar-user-header";
	import orderGroup from "./tabbar-user-order";
	import ecouponGroup from "./tabbar-user-ecoupon";
	import userModule from "./tabbar-user-module";
	import { Toast } from 'vant';
	
	export default {

		data() {
			return {
				isLogin: true,
				isLogining: false,
				data: {},
			}
		},
		
		// activated(){
		// 	this.getLoginStatus();
		// },
		created(){
			this.initData();
		},
		
		methods: {
			initData() {
				this.$reqPost('mock/27/v1/my/certifyCheck').
				then(res => {
					this.data = res.data.data;
					console.log(this.data,'实名认证校验');
				})
			},
			quit(){
				this.$util.removeLocalStorage('Authorization', 'token', 'custName', 'mobile', 'status');

				this.isLogining = true;
				this.$reqPost('mock/27/v1/auth/logout').then(res => {
					this.isLogining = false;
					
					this.$router.push({name: 'login'});
				}).catch((err) => {
					Toast.fail(err.data.message);
					this.isLogining = false;
				})
			},
			getLoginStatus(){
				// this.isLogin = !!localStorage.getItem('Authorization') && !!localStorage.getItem('user_id');
			}
		},

		components: {
			[userHeader.name]: userHeader,
			[orderGroup.name]: orderGroup,
			[ecouponGroup.name]: ecouponGroup,
			[userModule.name]: userModule,
			[Toast.name]: Toast
		}
	}

</script>


<style scoped lang="scss">
	.tabbar-user {
		>div {
			margin-bottom: 10px;
		}
		&__quit {
				border: 0;
				border-radius: 0;
		}
	}

</style>
