<template>
	<div class="user_header">
		<div class='user-name'>
			我的
		</div>
		<div class="user_avatar">
			<van-row class="user_details">
				<van-col span='4' class="user_img">
					<img :src="data.bankLogo" @click="toLogin" alt="头像" width="55" height="55">
				</van-col>
				<van-col span='12' class="user_top">
					<div class="user_nick">
						{{data.merName}}
					</div>
					<div class="user_phone">
						手机号: {{data.mobile}}
					</div>
				</van-col>
				<van-col span='8' class="user_arrow">
					<van-tag :type="tagType">{{user_status}}</van-tag>
					<van-icon name="arrow" class="arrow" @click="toUserShiming" />
				</van-col>
			</van-row>
			<van-row class="user_referrr">

        <van-col span='16'>
          推荐人： {{data.custName}}
        </van-col>
        <van-col span='8' class="ref_arrow">
          <van-icon name="arrow" class='arrow' />
        </van-col>

			</van-row>
		</div>
	</div>
</template>

<script>
import { USER_PROFILE } from "@/api/user";
import { Row, Col, Tag, Icon } from "vant";
import avatar_default from "../../assets/images/avatar_default.png";
import bg_default from "../../assets/images/user_head_bg.png";

export default {
  name: "user-header",

  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: false
    }
  },

  data() {
    return {
      nick_name: "昵称",
      avatar: avatar_default,
      background_image: bg_default,
      Referee: "test",
      phone: 17602881111,
      referee_phone: 17608922882,
    };
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Icon.name]: Icon
  },

  activated() {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      const infoData = this.$util.getLocalStorage(
        "nick_name",
        "background_image",
        "avatar"
      );
      this.nick_name = infoData.nick_name || "昵称";
      this.avatar = infoData.avatar || avatar_default;
      this.background_image = infoData.background_image || bg_default;
    },
    toSetting() {
      this.$router.push({ name: "user-information" });
    },
    toUserShiming() {
      this.$router.push({ name: "shiming" });
    },
    toLogin() {
      !this.isLogin &&
        this.$router.push({ name: "login", query: { redirect: "user" } });
    }
  },
  computed: {
    user_status() {
      const status = this.data.status;
      if(status === '0'){
        return '已认证';
      }else if(status === '1' ){
        return '未实名';
      }
    }, 
    tagType(){
      const status = this.data.status;
      if(status === '0'){
        return 'success';
      }else if(status === '1' ){
        return 'default';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user_header {
  position: relative;
  background-color: #f8f8f8;
  box-sizing: border-box;
  text-align: center;
  .user-name {
    font-size: 18px;
    text-align: center;
    color: #101010;
    height: 45px;
    line-height: 45px;
  }
}

i.arrow {
  font-size: 12px;
}
.user_avatar {
  width: 100%;
  border-top: 1px solid rgba(187, 187, 187, 1);
  border-bottom: 1px solid rgba(187, 187, 187, 1);
  background-color: rgb(255, 255, 255);
  .user_details {
    text-align: left;
    padding: 20px 15px 20px;
    margin: 0 8px;
    border-bottom: 1px solid rgba(187, 187, 187, 1);
    .user_img {
      vertical-align: middle;
      padding: 0;
    }
    .user_top {
      text-align: left;
      padding: 6px 0 0 10px;
      .user_nick {
        padding: 0 0 5px 0px;
      }
      .user_phone {
        padding: 0;
      }
    }
    .user_arrow {
      text-align: right;
      padding: 20px 0 5px 0px;
    }
  }
  .user_referrr {
    text-align: left;
    padding: 10px 20px 10px 10px;
    font-size: 12px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    color: rgba(16, 16, 16, 1);
    .ref_arrow {
      text-align: right;
    }
  }
}
</style>
