<template>
  <div class="footer_box">
    <van-row>
      <van-col span="8" v-for="(item,index) in f_items" :key="index">
        <p class="icon_box">
          <img :src="item.src">
        </p>
        <p class="msg_box"
           :class="item.checked ? 'isChecked' : ''">
           {{item.msg}}
        </p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import { Row, Col} from 'Vant'
  export default {
    data () {
      return {
        f_items: [
          {src: 'https://ws2.sinaimg.cn/large/006tNbRwly1fv2i0z5femj301e01e0si.jpg', msg: '首页', method: '', checked: true},
          {src: 'https://ws2.sinaimg.cn/large/0069RVTdly1fv2i4b8fgrj301e01edfl.jpg', msg: '账单', method: '', checked: false},
          {src: 'https://ws4.sinaimg.cn/large/0069RVTdly1fv2i4bp0ujj301e01e3ya.jpg', msg: '我的', method: '', checked: false}
        ]
      }
    }
  }
</script>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .footer_box {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8%;
    border-top: 1px solid #ececec;
    background-color: #fff;
  }
  .footer_box .icon_box {
    margin: 5% auto 0;
    width: 15%;
    height: 33%;
  }
  .footer_box .icon_box img{
    width: 100%;
    height: 100%;
  }
  .footer_box .msg_box {
    text-align: center;
    font-size: 12px;
    color: #4d4d4d;
  }
  .footer_box .isChecked {
    color: #fd581e;
  }
</style>
