<template>
    <div class="allMoney" @click="toMingxi">
        <div class="money_dec">
            <p>钱包总额(元)</p>
        </div>
        <div class="money_item">
            <p>{{reversedMoney}}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        total: String
    },
    data() {
        return {
            allMoney: '2006532.32'
        }
    },
    methods: {
        toMingxi() {
            this.$router.push({ name: "mingxi" });
        }
    },
    computed: {
        reversedMoney: function() {
            return (this.total+'').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
        }
    }
}
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
    }
    .allMoney {
        width: 100%;
        height: 23%;
        background-image: url('../../assets/home/背景图.jpg');
        background-size: cover;
        font-size: 0;
        overflow: hidden;
    }
    .money_dec {
        margin-top: 15%;
        text-align: center;
        font-size: 10px;
        color: #fffcfa;
    }
    .money_item {
        margin-top: 3%;
        text-align: center;
        font-size: 24px;
        color: #fff;
    }
</style>
