<template>
    <div>
        <searchHeader></searchHeader>
        <div class="banner_login">
            <div class="reg_box">
                <div class="hd">
                    <h3>账号登录<em>微信登录</em></h3>
                    <div class="error_tips" style="display:none">{{ErrorMsg}}</div>
                </div>
                <div class="bd">
                    <div id="reg-form">
                        <div class="form login">
                            <div class="row">
                                <label for="">账号:</label>
                                <input class="input_txt" id='Mobile' type="text" placeholder="您的账号" v-model.trim='username' @blur="inputBlur">
                            </div>
                            <div class="row">
                                <label for="">密码:</label>
                                <input class="input_txt" id='PassWord' type="password" placeholder="您的密码" v-model.trim='userpassword' @keyup.enter="loginData" @blur="inputBlur">
                            </div>
                            <div class="agree">
                                <router-link to="/register" class="go_reg">免费注册</router-link>
                                <!-- <a href="" class="go_reg">免费注册</a> -->
                                <span class="agree_check">
                                    <input type="checkbox" class="checkbox" name="" id="" v-model="checked">下次自动登录
                                </span>
                            </div>
                            <div class=" btns_submit">
                                <input type="button" value="登 录" class="submit" @click="loginData('loginFrom')">
                            </div>
                            <div class="forget">
                              <router-link to="/PassPort/FindPassword_Step1" class="a_forget">忘记密码？</router-link>
                                <!-- <a href="https://techina2025.com/passport/FindPassword_Step1" class="a_forget"></a> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {compileStr} from '../../script/encryption'
import searchHeader from "../Search/search-header";
import Base64 from "./../../script/base64";
import config from "./../../appsettings";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      userpassword: "",
      ErrorMsg: "",
      checked: true,
    };
  },
  mounted(){
    
  },
  components: {
    searchHeader
  },
  methods: {
    inputBlur(num) {
      this.Validate();
    },
    SetError(msg) {
      if (msg == "") {
        $(".error_tips").hide();
      } else {
        $(".error_tips").show();
      }
      $(".error_tips").html(msg);
    },
    Validate() {
      const reg = 11 && /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
      let isPas = true;
      if (!this.username) {
        this.SetError("请填写手机号码");
        return false;
      }
      if (!reg.test(this.username)) {
        this.SetError("手机号码有误，请重新输入");
        return false;
      }
      if (!this.userpassword) {
        this.SetError("请填写密码");
        return false;
      }
      this.SetError("");
      return true;
    },
    loginData(formName) {
      var userName = this.username;
      var password = this.userpassword;
      var authorization ="Basic " + Base64.encode(config.client_id + ":" + config.client_secret);

      if (!this.Validate()) {
        return false;
      } else {
        this.SetError('正在登录中，请稍候....') 
        this.$http
          .post(config.token_url,`grant_type=password&scope=epns_api+openid+profile&username=${userName}&password=${password}`,
            {
              headers: {
                Authorization: authorization,
                "Content-Type": "application/x-www-form-urlencoded"
              }
            }
          )
          .then(result => {
              if(result.status  == '200'){
                  localStorage.setItem('phone',userName)
                  localStorage.setItem('pwd',compileStr(password))
                localStorage.setItem("token", result.data.access_token);
                this.$router.push(this.$route.query.returnUrl||'/')
              }
          })
          .catch(err => {
            this.forgetPaswd = true
              this.SetError('你输入的密码和账户名不匹配，是否&nbsp;&nbsp;忘记密码?') 
              this.userpassword = ''
          });
      }
    }
  }
};
</script>

<style scoped>
.banner_login {
  background: url("../../images/login-bg.jpg") center 0 no-repeat;
  width: 100%;
  height: 600px;
  background-size: cover;
  position: relative;
}
/*== ���� ==*/
.input_txt[type="text"],
.input_txt[type="password"] {
  border: none;
  height: 40px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 3px;
  width: 100%;
  font: 14px/30px microsoft yahei;
  box-shadow: none;
}
.form {
  position: relative;
}
.login .row {
  margin-bottom: 10px;
  background: #fff;
  padding-left: 80px;
  line-height: 40px;
}
.row {
  line-height: 50px;
  margin-bottom: 30px;
  padding-left: 100px;
  box-sizing: border-box;
  position: relative;
  *zoom: 1;
}
.row label {
  float: left;
  margin-left: -70px;
  width: 60px;
  font-size: 14px;
  font-weight: 800;
}
.form:after,
.row:after {
  clear: both;
  content: ".";
  display: block;
  height: 0;
  overflow: hidden;
}
.error_tips em {
  color: #ff7e00;
  display: inline-block;
  margin: 0 5px;
}

/*== ע�� ==*/
/* .banner_reg{ background: url(/img/banner/banner_reg.jpg) no-repeat center 0; height: 600px; position: relative;} */
.reg_box {
  position: absolute;
  left: 50%;
  top: 100px;
  width: 349px;
  margin-left: 235px;
  background: rgba(255, 255, 255, 0.8);
  padding: 25px 25px 15px;
}
.reg_box .hd {
  margin-bottom: 20px;
  position: relative;
}
.reg_box .hd h3 {
  font: 800 20px/22px microsoft yahei;
  height: 22px;
  overflow: hidden;
  color: #0c4ca3;
}
.reg_box .hd h3 em {
  color: #595757;
  margin-left: 10px;
  padding-left: 10px;
  border-left: #595757 1px solid;
}
.banner_reg .row {
  height: 35px;
  line-height: 35px;
  background: #fff;
}
.reg .input_txt[type="text"],
.reg .input_txt[type="password"] {
  border: 0 none;
  height: 34px;
  line-height: 34px;
  width: 200px;
  padding: 0;
}
.reg .row {
  line-height: 35px;
  margin-bottom: 10px;
}
.reg .btns_submit {
  padding-left: 0;
  background: transparent;
  margin-bottom: 0;
}
.reg .submit {
  height: 35px;
  line-height: 35px;
  width: 100%;
}
.ewm {
  margin-right: 100px;
}
.ewm .get_ewm {
  position: absolute;
  top: 0;
  right: -100px;
  height: 35px;
  width: 90px;
  background: #0c4ca3;
  color: #fff;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
}
.ewm .get_ewm_gray {
  background: #c9caca;
}
.input_txt::-webkit-input-placeholder {
  color: #c9caca;
}
.submit {
  background: #0c4ca3;
  width: 100%;
  color: #fff;
  font: 800 16px/40px microsoft yahei;
  text-align: center;
  border: none;
  border-radius: 5px;
  height: 40px;
  cursor: pointer;
  margin: 20px 0;
}
.submit:hover {
  opacity: 0.8;
}
.row .col {
  display: inline-block;
  font-size: 14px;
  font-weight: 800;
}
.row .last_col {
  margin-left: 20px;
}
.row .col .radio {
  margin-right: 10px;
  vertical-align: middle;
}
.agree {
  margin-top: 18px;
  overflow: hidden;
  font-size: 13px;
  width: 100%;
}
.agree .go_reg {
  display: block;
  float: left;
}
.agree .agree_check {
  float: right;
  display: block;
}

.forget {
  float: right;
  color: #0c4ca3;
}
.forget a {
  color: #0c4ca3;
}
.agree .go_login {
  float: right;
  text-decoration: underline;
  display: block;
}
.agree .go_login em {
  color: #0c4ca3;
}
.agree_check .checkbox {
  vertical-align: middle;
  margin-right: 10px;
}
.yz_bar_box {
  position: absolute;
  left: 100px;
  top: 0;
  height: 50px;
  line-height: 50px;
  width: 220px;
}
.reg_box .yz_bar_box {
  left: 80px;
}
.error_tips {
  background: #fef2f2;
  border: #ff7e00 1px solid;
  padding: 0px 10px;
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 327px;
  margin-left: 0px;
  border-radius: 2px;
  vertical-align: top;
  font-size: 12px;
  line-height: 18px;
}
.error_tips a{
  color: #0c4ca3
}
</style>
