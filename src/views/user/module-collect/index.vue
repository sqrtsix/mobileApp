<template>
	<div class="user_collect">
		
		<div class="card-title">
			<van-icon name="arrow-left" class='arrow' @click="toUser" />
			<div class="card-title-name">
				我的银行卡
			</div>
		</div>
		
		<van-list
		  	:finished="true"
			:immediate-check="false"
			class="card-list">
			<item-group>
				<item-card-hori 
					class="card_style"
					v-for="(item, i) in items"
					:key="i"
					:row="item"
				>
				</item-card-hori>
			</item-group>
		</van-list>
		<div class="card-footer">
			<div class="add-card-btn">
				<van-button  size="large" class="card" @click="toCardForm">+ 添加银行卡</van-button>
			</div>
		</div>
		
	</div>	
</template>

<script>
	import ItemGroup from "@/vue/components/item-group/";
	import ItemCardHori from '@/vue/components/item-card-hori/';
	import IsEmpty from "@/vue/components/is-empty/";
	import { Search } from 'vant';
	
	import loadMore from '@/vue/mixin/list-load-more';
	import scrollFixed from '@/vue/mixin/scroll-fixed';

	export default {

		mixins: [loadMore, scrollFixed],

		data() {
			const shop_id = this.$util.getLocationParam("shop_id")
			return {
				shop_id,
				items: [],
				searchVal: ""
			}
		},

		created(){
			this.initData();
		},
		
		methods: {
			toUser() {
				this.$router.push({ name: "user" });
			},
			toCardForm(){
        		this.$router.push({ name: "cardForm" });
			},
			initData() {
				this.$reqPost('mock/27/v1/card/list').
				then(res => {
					console.log(res)
					this.items = res.data.data.list;
				})
			}
		},

		components: {
			[ItemGroup.name]: ItemGroup,
			[ItemCardHori.name]: ItemCardHori,
			[Search.name]: Search,
			[IsEmpty.name]: IsEmpty,
		}
	}

</script>

<style lang="scss" scoped>
	
	.user_collect{
		.card-title{
			position: fixed;
			top:0;
			width: 100%;
			height: 45px;
			line-height: 45px;
			background-color: #fff;
			z-index: 9999;
			display: flex;
			
			.arrow{
				position:absolute;
				left: 10px;
				top:16px;
				font-size: 14px;
			}
			.card-title-name{
				position: relative;
				font-size: 18px;
				margin: 0 auto;
				font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			}
		}
		.card-list{
			padding-top: 45px;
			.card_style {
				background-color: #5885ee;
				margin: 10px;
				height: 120px;
				border-radius: 6px;
			}
		}
		.card-footer{
      		position: fixed;
			bottom:0;
			width: 100%;
			.card{
				color: red;
			}
		}
	}

</style>
