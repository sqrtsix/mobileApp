<template>
    <div class="item_card_H_wrap one_border" @click="OnClick">
        <div class="clearfix">
            <div class="image-wrap">
                <div class="item_card_image float-l">
                    <img v-lazy="row.bankLogo">
                </div>
            </div>
            
            <div class="item_card_info">
                <div class="item_card_name">
                    {{ row.bankName }}
                </div>
                <div class="item_card_info_desc" v-if="row.cardType == 0">借记卡</div>
                <div class="item_card_info_desc" v-if="row.cardType == 1">信用卡</div>
                <!-- <div class="item_card_info_num">···· ···· ···  ···· 0011</div> -->
                <div class="item_card_info_num">{{ row.cardNo }}</div>
            </div>
        </div>
    </div>
</template>


<script>
import item_mix from "@/vue/mixin/item-card";
export default {
    name: "item-card-hori",
    props: {
        row: Object
    },
    data() {
        return {
        }
    },
    mixins: [item_mix]
};
</script>

<style lang="scss" scoped>
.image-wrap{
    // height: 120px;
    margin: 0;
    .item_card_image {
        position: relative;
        padding: 30px 15px 0 25px;
        width: 35px;
        height: 35px;

        img {
            display: inline-block;
            max-height: 100%;
            max-width: 100%;
        }
    }
}


.item_card_info {
    position: relative;
    .item_card_name {
        font-size: 16px;
        margin-top: 24px;
        padding: 0 0 3px 0;
        color: #fff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item_card_info_desc {
        color: #fff;
        font-size: 14px;

    }
    .item_card_info_num {
        color: #fff;
        text-align: center;
        padding: 10px;
        font-size: 18px;
    }
    

    .item_card_name .item_card_icon {
        width: 25px;
        height: 14px;
        vertical-align: middle;
        display: inline-block;
        background-repeat: no-repeat;
    }

    .item_card_footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;

        .footer_price {
            color: $red;
            margin-right: 5px;
        }

        .footer_price .marketPrice {
            color: $font-color-gray;
            font-size: 12px;
            text-decoration: line-through;
            margin-left: 5px;
        }

        .footer_desc {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>
