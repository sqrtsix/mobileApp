<template>
	<div class="user_team">
		<div class="card-title">
			<van-icon name="arrow-left" class='arrow' @click="toCollect" />
			<div class="card-title-name">
				添加银行卡
			</div>
		</div>
		<div class="autonym_message">
      <van-cell-group>
        <van-field
          v-model="field.cardNo"
          clearable
          label="银行卡号"
          placeholder="请输入银行卡号"
          input-align='right'
          @blur="blur"
        />
        <van-field
          v-model="field.bankName"
          clearable
          label="开户银行"
          input-align='right'
          readonly
        />
        <van-field
          v-model="field.bankType"
          clearable
          label="银行卡类型"
          input-align='right'
          readonly
        />
        <van-field
          v-model="field.mainName"
          clearable
          label="持卡人姓名"
          input-align='right'
          readonly
        />
      </van-cell-group>

    </div>

    <div class="autonym_agreement">
      <van-cell-group>
        <van-field
          v-model="field.mobile"
          clearable
          label="预留手机号"
          placeholder="请输入预留手机号"
          input-align='right'
        />
        <van-field
          v-model="field.smsCode"
          clearable
          placeholder="请先获取验证码"
          input-align='left'
        >
          <countdown v-if="counting" :time="60000" @countdownend="countdownend">
            <template slot-scope="props">{{ +props.seconds || 60 }}秒后获取</template>
          </countdown>
          <van-button v-else slot="button" size="small" type="danger" @click="getCode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
    </div>
		<div class="card-submit">
		  <van-button class="btn" size='large' @click='save'>
       立即验证
      </van-button>
		</div>
		
	</div>
</template>

<script>
import { idCard, mobile, bankCard } from '@/assets/js/regexp';
import { Dialog,Toast } from 'vant';
export default {
  data() {
    return {
      phoneError: false,
      counting:false,
      field: {
        custName: "",
        idCard: "",
        merName: "",
        cardNo: "",
        bankCode: "",
        mobile: "",
        bankName: "",
        bankType: "",
        mainName: "",
        smsCode:""
      }
    };
  },
  methods: {
    toCollect() {
      this.$router.push({ name: "collect" });
    },
    save(){
      this.$reqPost("mock/27/v1/card/add", {
        // mobile: this.mobile,
        smsCode: '622123',
        orderNo: '622123',
      }).then(res => {
        console.log()
        if (res.data.code == 0) Toast.success("添加成功");
        if (res.data.code == 1) Toast.success("添加失败");
      });
    },
    getCode() {
      if (this.counting) return;
      const regP = /^1[0-9]{10}$/;
      // if (!regP.test(this.mobile)) return (this.phoneError = true);
      console.log(111)

      this.counting = true;

      this.$reqPost("mock/27/v1/sms/send", {
        mobile: this.mobile,
        flag: 0
      }).then(res => {
        console.log()
        if (res.data.code == 0) Toast.success("发送成功");
      });
    },
    countdownend() {
      this.counting = false;
    },
    blur() {
      const cardNo = this.field.cardNo;
      if (!bankCard(cardNo)) {
        this.$reqPost("mock/27/v1/card/identify", {
          // 622123  这个卡号可以获取到对应的数据
          cardNo: this.field.cardNo
        }).then(res => {
          this.field.bankName = res.data.data.bankName;
          this.field.bankCode = res.data.data.bankCode;
          this.field.bankType =
            res.data.data.bankType === "0" ? "储蓄卡" : "信用卡";
          // this.$toast.success({ res.data.message, duration: 1000 });
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user_team {
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
  .autonym_message {
    margin-top: 55px;
  }
  .autonym_agreement {
    margin: 6px 0 50px;
  }

  .card-submit {
    margin: 0 12px;
    .btn {
      color: #fff;
      background-color: #f8a0a0;
    }
  }
}
</style>