<template>
  <div class="wonderPush">
    <div class="w_p_box">
      <div class="w_p_title">
        <img :src="shugang">
        <span class="w_p_titleMsg">精彩推荐</span>
      </div>
      <div class="w_p_count">
        <div class="w_p_img_box pull_left">
          <img :src="tuijian">
        </div>
        <div class="w_p_msg_box pull_left">
          <p class="msg_l">
            分享成功日赚
            <span> 300元</span>
          </p>
          <p class="msg_s">
            分享成功1人，获得
            <span>10元</span>
            现金
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import shugang from '../../assets/home/标题图标.png';
import tuijian from '../../assets/home/精彩推荐.png';

export default {
  data () {
    return {
      shugang,
      tuijian
    }
  }
}
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .pull_left {
    float: left;
  }
  .wonderPush {
    margin-top: 5px;
    width: 100%;
    height: 22%;
    background-color: #fff;
  }
  .w_p_box {
    width: 100%;
    height: 100%;
  }
  .w_p_title {
    width: 100%;
    height: 23%;
    border-bottom: 1px solid #f9f9f9;
  }
  .w_p_title img {
    /*position: relative;
    top: 20%;*/
    margin-left: 20px;
    width: 3px;
    border-radius: 1px;
    display: inline-block;
    background-image: url('https://ws3.sinaimg.cn/large/006tNbRwly1fv293on3fgj300800y0sh.jpg');
    background-repeat: no-repeat;
    line-height: 27px;
  }
  .w_p_title .w_p_titleMsg {
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
  .w_p_count {
    width: 100%;
    height: 77%;
    display: flex;
    justify-content: space-between;
  }
  .w_p_img_box {
    /* width: 35%; */
    height: 100%;
  }
  .w_p_img_box img{
    margin: 0 10%;
    /* width: 80%; */
    height: 100%;
  }
  .w_p_msg_box {
    /* width: 65%; */
    height: 100%;
    margin-right: 30px;

    text-align: right;
    box-sizing: border-box;

    padding: 10px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .w_p_msg_box .msg_l {
    /* margin-top: 10%; */
    font-size: 20px;
    font-weight: 900;
    color: #4d4d4d;
  }
  .w_p_msg_box .msg_l span {
    color: #f46415;
  }
  .w_p_msg_box .msg_s {
    /* margin-top: 10px; */
    box-sizing: border-box;
    font-size: 12px;
    text-align: right;
    color: #4d4d4d;
  }
  .w_p_msg_box .msg_s span {
    color: #f46415;
  }
</style>
