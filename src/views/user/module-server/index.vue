<template>
	<div>
		<van-cell-group>
			<van-cell title="联系客服" @click="showKefu = true" isLink></van-cell>
			<van-cell title="意见反馈" isLink></van-cell>
			<van-cell title="常见问题" isLink></van-cell>
		</van-cell-group>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				showKefu: false,
			}	
		},
		
		components: {
			[md_kefu.name]: md_kefu,
		}
	}
</script>