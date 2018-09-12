<template>
	<div class="shiming">
    <div class="card-title">
			<van-icon name="arrow-left" class='arrow' @click="toUser" />
			<div class="card-title-name">
				我的银行卡
			</div>
		</div>
    <div class="shiming-form">
      <div class="autonym_input">
        <van-cell-group>
          <van-field
            v-model="field.custName"
            clearable
            label="客户姓名"
            placeholder="请输入客户姓名"
            input-align='right'
          />

          <van-field
            v-model="field.idCard"
            label="身份证号"
            placeholder="请输入身份证号"
            input-align='right'
          />
          <van-field
            v-model="field.merName"
            label="商户名称"
            placeholder="请输入商户名称"
            input-align='right'
          />
        </van-cell-group>
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
      </van-cell-group>
    </div>

		<div class="save_div">
			<van-button type="danger" size="large" @click="save">立即验证</van-button>
		</div>

    </div>
    
		<!--<ul class="text-desc">-->
			<!--<li>根据海关规定: 购买跨境商品需要办理相关手续.</li>-->
			<!--<li>根据海关规定: 购买跨境商品需要办理相关手续.</li>-->
		<!--</ul>-->
	</div>
</template>

<script>
import { idCard, mobile, bankCard } from '@/assets/js/regexp';
import { Checkbox, CheckboxGroup } from "vant";
export default {
  data() {
    return {
      field: {
        custName: "",
        idCard: "",
        merName: "",
        cardNo: "",
        bankCode:"",
        mobile:"",
        bankName: "",
        bankType: "",

      },
      nameErr: true,
      idCardErr: true,
      checked: true
    };
  },

  methods: {
    save() {
      let keys = Object.keys(this.field);
      const _this = this;
      console.log(keys,'keys')
      // 暂时注释掉，实际要进行校验的时候打开，一下未有用信息，误删，填写张三可以调用成功
      // let isValid = keys.every(key => {
      //   const message = this.getErrorMessageByKey(key);
      //   if (message) {
      //     this.$toast.fail({ message, duration: 1000 });
      //   }
      //   return !message;
      // });
      if (true) {
        console.log("保存");
        this.$reqPost('mock/27/v1/my/certify', {
          custName: this.field.custName,
          idCard: this.field.idCard,
          merName: this.field.merName,
          cardNo: this.field.cardNo,
          bankCode:this.field.bankCode,
          mobile:this.field.mobile,
        }).
				then(res => {
          // console.log(this.data,'实名认证校验');
          console.log(res.data.code,'jieguo');
          const message = res.data.message;
          this.$toast.success({ message, duration: 1000 });
          if(res.data.code === '0') {
            _this.$router.push({ name: "user" });
          }
				})
      }
    },
    checkUserName() {
      this.nameErr =
        this.field.username == "" || this.field.username.length > 5;
    },
    checkIdCard() {
      this.idCardErr = !idCard(this.field.idCard);
    },
    toUser(){
      this.$router.push({ name: "user" });
    },
    blur() {
      const cardNo = this.field.cardNo;
      if(!bankCard(cardNo)) {
        this.$reqPost('mock/27/v1/card/identify', {
          // 622123  这个卡号可以获取到对应的数据
          cardNo: this.field.cardNo,
          }).
				then(res => {
          this.field.bankName = res.data.data.bankName;
          this.field.bankCode = res.data.data.bankCode;
          this.field.bankType = res.data.data.bankType === '0' ? '储蓄卡' : '信用卡';
          // this.$toast.success({ res.data.message, duration: 1000 });
				})
      }
    },

    getErrorMessageByKey(key) {
    	const val = this.field[key];
    	switch (key) {
    		case 'custName':
    			return val ? val.length < 5 ? "" : "名字太长了" : "请输入名字";
    		case 'idCard':
    			return val ? idCard(val) ? "" : "请输入正确身份证" : "请输入身份证";
    		case 'merName':
    			return val ? "" : "请填写商户名称";
        case 'cardNo':
          return val ? bankCard(val) ? "" : "请输入正确的银行卡号" : "请填写银行卡号";
        case 'mobile':
          return val ? mobile(val) ? "" : "请输入正确手机号" : "请填写预留手机号";
    	}
    }
  },

  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [Checkbox.name]: Checkbox
  }
};
</script>


<style lang="scss" scoped>
.shiming {
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
  .shiming-form{
    margin-top: 65px;
    .autonym_input{
    
    }
    .autonym_message{
      margin-top: 8px;
    }
    .autonym_agreement{
      margin: 4px 0 25px;
    }
  }
}
</style>
