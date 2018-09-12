<template>
  <div class="walletServer">
    <div class="w_s_box">
      <div class="w_s_title">
        <img src="../../assets/home/标题图标.png">
        <span class="w_s_titleMsg">钱包服务</span>
      </div>
      <div class="w_s_count">
        <van-row gutter="20">
          <van-col span="8" v-for="(item,index) in w_s_items" :key="index">
           <div class="w_s_item_box" @click='toCurrentItem(item,index)'>
             <div class="item_img_box">
               <img :src="item.src">
             </div>
             <div class="item_msg_box">
               <p>{{item.msg}}</p>
             </div>
           </div>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Row, Col } from "vant";
import yinlian from "../../assets/home/银联收款.png";
import xianjin from "../../assets/home/现金提现.png";
import kabao from "../../assets/home/卡包管理.png";
export default {
  data() {
    return {
      w_s_items: [
        { src: yinlian, msg: "银联收款", method: "", type: 1, router: 'shoukuan' },
        { src: xianjin, msg: "现金提现", method: "", type: 2, router: 'tixian' },
        { src: kabao, msg: "卡包管理", method: "", type: 3 ,router: 'kabao'}
      ]
    };
  },
  methods: {
    toCurrentItem(item) {
      this.$router.push({ name: item.router });
    }
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  }
};
</script>

<style>
.walletServer {
  margin-top: 5px;
  width: 100%;
  height: 22%;
  background-color: #fff;
}
.w_s_box {
  width: 100%;
  height: 100%;
}
.w_s_title {
  width: 100%;
  height: 23%;
  border-bottom: 1px solid #f9f9f9;
}
.w_s_title img {
  /*position: relative;
  top: 20%;*/
  vertical-align: middle;
  margin-left: 20px;
  width: 3px;
  border-radius: 1px;
  display: inline-block;
  background-image: url("https://ws3.sinaimg.cn/large/006tNbRwly1fv293on3fgj300800y0sh.jpg");
  background-repeat: no-repeat;
  line-height: 27px;
}
.w_s_title .w_s_titleMsg {
  /*position: absolute;
  left: 35px;*/
  vertical-align: middle;
  margin-left: 10px;
  width: 20%;
  color: #4d4d4d;
  font-size: 12px;
  display: inline-block;
  line-height: 27px;
}
.w_s_count {
  width: 100%;
  height: 77%;
}
.w_s_item_box {
  font-size: 0;
}
.w_s_item_box .item_img_box {
  margin: 15px auto 0;
  width: 35%;
  height: 40%;
}
.w_s_item_box .item_img_box img {
  width: 100%;
  height: 100%;
}
.item_msg_box p {
  font-size: 12px;
  color: #4d4d4d;
  text-align: center;
}
</style>
