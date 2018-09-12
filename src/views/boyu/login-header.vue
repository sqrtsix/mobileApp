<template>
    <div class="home_page_header">
        <div class="card-title">
            <!-- <van-icon name="arrow-left" class='arrow' @click="toHome" /> -->
            <div class="card-title-name">
                我的钱包
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang='scss'  scoped>
.home_page_header {
    position: relative;
    /* top: 3%; */
    width: 100%;
    height: 6.8%;
    display: table;
    background-color: #fff;
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

    .iconfont {
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -8px;
        width: 12%;
        font-size: 16px;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }

    span {
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #414141;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
}
</style>
