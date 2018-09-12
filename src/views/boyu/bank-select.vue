<template>
    <div class="choose_bank">
        <van-list
          class="bank_list"
          :finished="true"
          :immediate-check="false"
        >
            <!-- <van-cell v-for="(item,index) in list" :key="index" :title="item.bankName" /> -->
            <van-cell v-for="(item,index) in list" :key="index" @click="getBack(item)">
                <template slot="title">
                    <div class="flex_style">
                        <img class="bank_logo" :src="item.bankLogo">
                        <div class="cell_info">
                            <span>{{ item.bankName }}</span>
                            <span>{{ item.cardNo }}</span>
                        </div>
                    </div>
                </template>
            </van-cell>
        </van-list>

        <div id="ball" class="show-menu" v-if="show" @click="back">
            <span class="back_btn">返回</span>
        </div>
    </div>
</template>
<script>
    import { Button,List } from 'vant';
    import inertia from "@/vue/plugins/inertia.js";

    export default {
        props: {
            show: Boolean,
            list: Array
        },
        created() {
            this.$nextTick(() => {
                new inertia(document.getElementById('ball'), {edge: false})
            })
        },
        components: {
            [Button.name]: Button,
            [List.name]: List,
        },
        methods: {
            back() {
                this.$emit('back');
            },
            getBack(row) {
                this.$emit('bank',row);
            }
        }
    };
</script>

<style lang="scss" scoped>
    .choose_bank {
        margin: 10px 20px;

        .bank_list {
            margin-top: 10px;
            .flex_style {
                display: flex;
                align-items: center;
            }
            .cell_info {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
            }
            .bank_logo {
                width: 35px;
                height: 35px;
                margin-right: 20px;
            }
        }

        /*切换菜单按钮*/
        .show-menu {
            position: fixed;
            right: 20px;
            bottom: 20px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: rgba(254, 64, 129, .8);
            z-index: 999;

            &#ball {
                z-index: 9999;
            }
            .back_btn {
                width: 100%;
                font-size: 12px;
                color: #fff;
                text-align: center;

                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
        }
    }
</style>
