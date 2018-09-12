<template>
    <div class="user_collect">
        
        <div class="card-title">
            <van-icon name="arrow-left" class='arrow' @click="toUser" />
            <div class="card-title-name">
                卡包
            </div>
        </div>
        
        <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :offset="100"
            @load="loadMore"
                class="card-list"   >
            <item-group>
                <item-card-hori
                    v-for="(item, i) in items" 
                    :style="{backgroundColor: '#5885ee', margin:'10px', height: '120px', borderRadius:'6px'}"
                    :key="i"
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
    import { GOODS_COLLECT_LIST } from '@/api/user';
    
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
            this.resetInit();
        },
        
        methods: {
            toUser() {
                this.$router.push({ name: "home" });
            },
            toCardForm(){
                this.$router.push({ name: "cardForm" });
            },
            initData() {
                // return this.$reqGet(GOODS_COLLECT_LIST, {
                //     'per-page': this.pages.perPage,
                //     page: this.pages.currPage,
                //     shop_id: this.shop_id,
                // }, {
                //     hideLoading: true
                // }).then(res => {
                //     const { items, page } = res.data.data;
                //     this.items.push(...items);
                //     return page;
                // })
            },
            cancelCollect(event, i){
                const item_id = this.items[i].item_id;
                this.$dialog.confirm({message: "是否取消收藏该商品"}).then(() => {
                    this.items.splice(i, 1);
                })
            },
            clearInvalid() {
                this.$dialog.confirm({message: "确定清除所有失效商品吗?"})
            },
            itemClick(i) {
                const item_id = this.items[i].item_id;
                const status = this.items[i].goods_status;
                status && this.$router.push({
                    name: "detail",
                    params: { itemId: item_id }
                })
                !status && this.$toast("该商品已失效")
            },
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
