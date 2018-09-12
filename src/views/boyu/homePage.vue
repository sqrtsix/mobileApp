<template>
    <div class="home_page" v-if="homeData">
        <homePageHeader></homePageHeader>
        <allMoney :total="homeData.balance"></allMoney>
        <walletServer></walletServer>
        <tranSta :record="homeData.record" :money="homeData.amount"></tranSta>
        <wonderPush></wonderPush>
        <!-- <van-swipe :autoplay="3000" class="swiper_list">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img v-lazy="image.picUrl" />
            </van-swipe-item>
        </van-swipe> -->
        <!-- <homePageFooter></homePageFooter> -->
    </div>
</template>

<script>
    import homePageHeader from './login-header'
    import allMoney from './homePage-allMoney'
    import walletServer from './wallet-server'
    import tranSta from './tran-sta'
    import wonderPush from './wonder-push'
    import { Swipe, SwipeItem } from 'vant';
    // import homePageFooter from './homePage-footer'

    export default {
        created() {
            this.$reqPost('mock/27/v1/index/wallet').
            then(res => {
                this.homeData = res.data.data;
            })

            this.$reqPost('mock/27/v1/adver/sowList',{
                type: 1
            }).
            then(res => {
                this.images = res.data.data.list;
            })
        },

        data() {
            return {
                homeData: '',
                images: []
            }
        },

        components: {
            homePageHeader,
            allMoney,
            walletServer,
            tranSta,
            wonderPush,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            // homePageFooter
        }
    }
</script>

<style>
    .van-swipe.swiper_list .van-swipe-item img {
        width: 100%;
    }
</style>
