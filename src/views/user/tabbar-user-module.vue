<template>
	<div class="user_module">
		<van-cell-group>
			<van-cell to="/user/collect">
				<template slot="title">
					<i class="iconfont icon-yinxingqia"></i>
					<span class="van-cell-text">银行卡管理</span>
					<van-icon name="arrow" class='arrow' />
				</template>
			</van-cell>
			<van-cell to="/user/passmanage">
				<template slot="title">
					<i class="iconfont icon-lock"></i>
					<span class="van-cell-text">密码管理</span>
					<van-icon name="arrow" class='arrow'  />
				</template>
			</van-cell>
			<van-cell to="">
				<template slot="title">
					<i class="iconfont icon-kefu"></i>
					<span class="van-cell-text">联系客服</span>
					<van-icon name="arrow" class='arrow'  />
				</template>
			</van-cell>
			<van-cell to="">
				<template slot="title">
					<i class="iconfont icon-guanyuwomen"></i>
					<span class="van-cell-text">关于我们</span>
					<van-icon name="arrow" class='arrow'  />
				</template>
			</van-cell>
		</van-cell-group>
	</div>
</template>

<script>
export default {
	name: "user-module",
	methods: {
    toYinhangka() {
      this.$router.push({ name: "user-information" });
    },
  }
};
</script>


<style scoped lang="scss">
.user_module {
  background-color: #fff;
	position: relative;
	i.arrow{
		position: absolute;
	  right: 20px;
		top:17px;
		font-size: 12px;
	}
  
  i.van-cell__right-icon {
    color: #fff !important;
    font-size: 12px;
    line-height: 24px;
    margin-right: 4px;
  }
}
</style>