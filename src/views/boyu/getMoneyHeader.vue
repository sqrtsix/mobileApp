<template>
  <div class="getMoney_header">
    <div class="card-title">
			<van-icon name="arrow-left" class='arrow' @click="toHome" />
			<div class="card-title-name">
				收款
			</div>
		</div>
  </div>
</template>

<script>
  export default {
    components: {},
    methods: {
      toHome() {
        this.$router.push({ name: "home" });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .getMoney_header {
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
  }
</style>
