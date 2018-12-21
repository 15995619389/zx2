<template>
    <div>
        <div class="tell-item inputText" >
            <div style="overflow:hidden" >
                <input class="oth-control mon-ipt tel-int" placeholder="手机号" v-model.trim="phone" @blur="inputBlur(1)">
                <a v-if="sendAuthCode" href="javaScript:;" class="code" @click="getAuthCode">获取验证码</a>
                <a v-else href="javaScript:;" class="code" style="cursor:default"><span>{{auth_time}}</span>秒后重新获取</a>
            </div>
            <p>{{phoneText}}</p>
        </div>
        <div class="inputText">
            <input  id='authCode' class="oth-control mon-ipt " placeholder="输入验证码" v-model.trim='authCode' @blur="inputBlur(2)">
            <p>{{authCodeText}}</p>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      phone: "",
      sendAuthCode: true,
      auth_time: 0,
      authCode: "",
      phoneText: "",
      authCodeText: "",
      token: ""
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
  },
  methods: {
    inputBlur(num) {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; //手机号正则验证
      if (num == 1) {
        if (!this.phone) {
          this.phoneText = "请输入手机号码";
        } else if (!reg.test(this.phone)) {
          this.phoneText = "请输入正确的手机号码";
        } else {
          this.phoneText = "";
        }
      } else if (num == 2) {
        if (!this.authCode || this.authCode !='123456') {
          this.authCodeText = "请输入正确的验证码";
        } else {
          this.authCodeText = "";
        }
      }
    },
    Validate() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; //手机号正则验证
      let isPas = true;
      if (!this.phone) {
        this.phoneText = "请输入手机号码";
        isPas = false;
      } else if (!reg.test(this.phone)) {
        this.phoneText = "请输入正确的手机号码";
        isPas = false;
      } else if (this.authCode =='') {
        this.authCodeText = "请输入验证码";
        isPas = false;
      }
      return isPas;
    },
    // 验证码
    getAuthCode() {
      // this.$emit("ChildIphoneNumber", this.phone);
      const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/; //手机号正则验证
      if (!this.phone) {
        this.phoneText = "请输入手机号码";
        return;
      } else if (!reg.test(this.phone)) {
        this.phoneText = "请输入正确的手机号码";
      }else {
        this.sendAuthCode = false;
        this.auth_time = 60;
        let auth_timetimer = setInterval(() => {
          this.auth_time--;
          if (this.auth_time <= 0) {
            this.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
        this.$http
          .post("/sms_code/test", this.phone, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if(res.status == 200){
              this.authCodeText = res.data;
            }
          })
          .catch(err => {
            console.log("请求失败"+err);
          });
      }
    }
  }
};
</script>

<style scoped>
.tell-item {
  display: block;
  width: 350px;
  margin: 0 auto;
  overflow: hidden;
}
.tell-item input {
  float: left;
  width: 216px;
  position: relative;
  text-align: center;
  display: block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.tell-item a {
  display: inline-block;
  width: 116px;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0.43px;
  background: #2963ca;
  margin-left: 16px;
  text-align: center;
}
.mon-ipt {
  width: 351px;
  position: relative;
  text-align: center;
  display: block;
  border: 1px solid #ccc;
  -webkit-box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
input {
  margin: 0 auto 20px auto;
}
.inputText input {
  margin: 0 auto;
}
.inputText p {
  width: 353px;
  margin: 0 auto;
  color: red;
}
.inputText {
  margin: 0 auto 20px auto;
}
</style>
