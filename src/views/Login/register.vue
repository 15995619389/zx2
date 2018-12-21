<template>
    <div>
        <v-searchHeader></v-searchHeader>
        <v-agrenMess ref="agren"></v-agrenMess>
        <div class="banner_reg">
            <div class="reg_box_btn"></div>
            <div class="reg_box">
                <div class="hd">
                    <h3>欢迎注册</h3>
                </div>
                <div class="bd">
                    <div>
                         <div class="form reg">
                             <div class="error_tips" style="display:none"></div>
                             <div class="row">
                                <label>手机号:</label>
                                <input class="input_txt" v-model="formData.phone" name="Mobile" maxlength="11" id="Mobile" type="text"  placeholder="您的手机号码">    
                             </div>
                             <div class="row">
                                <label>滑动验证:</label>
                                <div class="ln2 input_pad yzm_ip " style="height:34px;display:block">
                                    <div id="dom-id" class="nc-container" style="height:34px;display:block"></div>
                                </div>
                            </div>
                            <div class="row ewm">
                                <label>验证码:</label>
                                <input id="Code" v-model="formData.authCode" name="Code" class="input_txt" maxlength="6" type="text" placeholder="填写验证码">
                                <span id="SendValCode" v-if="formData.sendAuthCode" class="get_ewm" @click="getAuthCode">获取验证码</span>
                                <span id="SendValCode" v-else class="get_ewm" style="cursor:default">{{formData.auth_time}}秒后重新获取</span>
                            </div>
                            <div class="row">
                                <label>密码:</label>
                                <input class="input_txt" name="Password" v-model="formData.Password" maxlength="16" id="Password" type="password"  placeholder="请至少设置两种文字字符组合">
                            </div>
                            <div class="row">
                                <label>确认密码:</label>
                                <input class="input_txt" name="ConfirmPwd" v-model="formData.ConfirmPwd" id="ConfirmPwd" maxlength="16" type="password"  placeholder="请再次输入密码">
                            </div>
                            <div class="row">
                                <label>(选填)邀请码:</label>
                                <input id="Referee" class="input_txt" v-model="formData.Referee" value="@ViewBag.RefCode" type="text" placeholder="请填写您的邀请码">
                            </div>
                            <div class="row btns_submit">
                                <input id="Register" @click="Register" type="button" value="注 册" class="submit" title="" />
                            </div>
                         </div>
                         <input type="hidden" name="csessionid" v-model="csessionidCode"/>
                    </div>
                    <div class="agree">
                        <router-link to="/login" class="go_login">已有账号？<em>登录</em></router-link>
                        <span class="agree_check">
                            <input v-model="formData.checkboxAgreement" type="checkbox" class="checkbox" checked="checked" id="IsAgreeProtocol" @click="IsAgreeProtocol"/>同意<a id="AgrenMess" href="javascript:void(0);" @click="AgrenMess">《飞天众智用户协议》</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
import AgrenMess from "../Popup/agrenPopup";
export default {
  data() {
    return {
      csessionidCode:'',
      formData: {
        phone: "",
        authCode: "",
        Password: "",
        ConfirmPwd: "",
        sendAuthCode: true,
        checkboxAgreement: true,
        auth_time: 0
      }
    };
  },
  mounted(){
    var _self = this
    var nc_token = ["FFFF0N0N0000000018BF", (new Date()).getTime(), Math.random()].join(':');
    var NC_Opt =
      {
        renderTo: "#dom-id",
        appkey: "FFFF0N0N0000000018BF",
        scene: "nc_register",
        token: nc_token,
        trans: '{"name1":"FFFF0000000001687A53"}',
        callback: function (data) {
          // window.console && console.log(nc_token)
          // window.console && console.log(data.csessionid)
          // window.console && console.log(data.sig)
          _self.csessionidCode = data.csessionid
        }
      }
        var nc = new noCaptcha(NC_Opt)
        nc.upLang('cn', {
            _startTEXT: "请按住滑块，拖动到最右边",
            _yesTEXT: "验证通过",
            _error300: "哎呀，出错了，点击<a href=\"javascript:__nc.reset()\">刷新</a>再来一次",
            _errorNetwork: "网络不给力，请<a href=\"javascript:__nc.reset()\">点击刷新</a>",
        })
  },
  components: {
    "v-searchHeader": searchHeader,
    "v-agrenMess": AgrenMess,
  },
  methods: {
    IsAgreeProtocol() {
      if (this.formData.checkboxAgreement) {
        this.formData.checkboxAgreement = true;
      } else {
        this.formData.checkboxAgreement = false;
      }
    },
    //   注册
    Register() {
      if (!this.Validate()) {
        return false;
      }
      this.$http
        .post("/account/reigister", {
          phoneNumber: this.formData.phone,
          confirmationCode: this.formData.authCode,
          password: this.formData.Password
        })
        .then(res => {
          this.SetError("正在注册中，请稍候....");
          if (res.status == 200) {
            setInterval(this.routeViews(),5000)
            return;
          }
          if (err.status == 400) {
            this.SetError("注册失败，请重新注册！");
          }
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //   获取验证码
    getAuthCode() {
      const reg = /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
      if (!this.formData.phone) {
        this.SetError("请填写手机号码");
        return false;
      } else if (!reg.test(this.formData.phone)) {
        this.SetError("请填写正确的手机号码");
        return false;
      } else {
        this.formData.sendAuthCode = false;
        this.formData.auth_time = 60;
        let auth_timetimer = setInterval(() => {
          this.formData.auth_time--;
          if (this.formData.auth_time <= 0) {
            this.formData.sendAuthCode = true;
            clearInterval(auth_timetimer);
          }
        }, 1000);
        this.$http
          .post("/sms_code/register", this.formData.phone, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.SetError(res.data);
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    AgrenMess() {
      this.$refs.agren.AgrenShow();
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
      const reg = /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
      const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
      let isPas = true;
      const model = this.formData;
      if (!model.phone) {
        this.SetError("请填写手机号码");
        isPas = false;
      } else if (!reg.test(model.phone)) {
        this.SetError("请填写正确的手机号码");
        isPas = false;
      }else if(this.csessionidCode == ''){
         this.SetError("请通过滑动验证");
         isPas = false
      }else if(model.authCode ==''){
        this.SetError("请输入验证码");
        isPas = false;
      }else if (!regPwd.test(model.Password)) {
        this.SetError("密码由英文字母和数字组成，至少6位");
        isPas = false;
      } else if (model.Password != model.ConfirmPwd) {
        this.SetError("密码输入不一致，请确认密码");
        isPas = false;
      } else if (!model.checkboxAgreement) {
        this.SetError("请同意飞天众智用户协议");
        isPas = false;
      }
      return isPas
    },
    routeViews(){
      this.$router.push('/registerSuccess')
    }
  }


}



</script>

<style scoped>
#dom-id .nc-container .nc_scale .scale_text{
  padding-left:15px !important
}
.nc-container #nc_1_wrapper{
width: 200px
}
#dom-id .nc-container .nc_scale span{
  width: 30px !important
}
.error_tips {
  background: #fef2f2;
  border: #ff7e00 1px solid;
  padding: 0px 10px;
  position: absolute;
  top: -21px;
  left: 0;
  width: 280px;
  margin-left: 0px;
  border-radius: 2px;
  vertical-align: top;
  font-size: 12px;
  line-height: 18px;
}
.banner_reg {
  background: url("../../images/banner/banner_reg.jpg") center 0 no-repeat;
  height: 600px;
  position: relative;
}
.reg_box_btn {
  position: absolute;
  left: 50%;
  top: 70px;
  width: 350px;
  height: 471px;
  margin-left: 235px;
  background: #fff;
  z-index: 9;
  margin-left: 235px;
  opacity: 0.8;
  filter: alpha(opacity=80);
}
.reg_box {
  position: absolute;
  left: 50%;
  top: 70px;
  width: 300px;
  margin-left: 235px;
  background: rgba(255, 255, 255, 0.8);
  padding: 25px 25px 15px;
}
.banner_reg .reg_box {
  z-index: 9;
  background: rgba(0, 0, 0, 0);
}
.reg_box .hd {
  margin-bottom: 20px;
  position: relative;
}
.reg_box .hd h3 {
  font: 800 20px/22px microsoft yahei;
  height: 24px;
  color: #0c4ca3;
}
.form,
.row {
  position: relative;
}
.row {
  line-height: 50px;
  margin-bottom: 30px;
  padding-left: 100px;
}
.banner_reg .row {
  height: 35px;
  line-height: 35px;
  background: #fff;
}
.reg .row {
  line-height: 35px;
  margin-bottom: 10px;
}
.row label {
  float: left;
  margin-left: -90px;
  width: 90px;
  font-size: 14px;
  font-weight: 800;
}
.input_txt[type="text"],
.input_txt[type="password"] {
  border: 1px solid #c9caca;
  height: 30px;
  padding: 10px;
  border-radius: 3px;
  width: 280px;
  font: 14px/30px microsoft yahei;
  box-shadow: none;
}
.reg .input_txt[type="text"],
.reg .input_txt[type="password"] {
  border: 0;
  height: 34px;
  line-height: 34px;
  width: 200px;
  padding: 0;
}
.form:after,
.row:after,
.step:after {
  clear: both;
  content: ".";
  overflow: hidden;
}
.form:after,
.row:after {
  display: block;
  height: 0;
}
.ewm {
  margin-right: 100px;
}
.ewm .get_ewm,
.submit {
  text-align: center;
  cursor: pointer;
}
.ewm .get_ewm {
  position: absolute;
  top: 0;
  right: -100px;
  height: 35px;
  width: 107px;
  background: #0c4ca3;
  color: #fff;
  font-size: 14px;
}
.reg .btns_submit {
  padding-left: 0;
  background: 0 0;
  margin-bottom: 0;
}
.submit {
  background: #0c4ca3;
  color: #fff;
  font: 800 16px/50px microsoft yahei;
  border: none;
  border-radius: 5px;
  width: 200px;
  display: block;
  margin: 0 auto;
}
.reg .submit {
  height: 35px;
  line-height: 35px;
  width: 100%;
}
.agree {
  margin-top: 18px;
  font-size: 13px;
}
.agree .go_login {
  float: right;
  text-decoration: underline;
}
.agree .go_login em {
  color: #0c4ca3;
}
.agree_check .checkbox,
.row .col .radio {
  margin-right: 10px;
  vertical-align: middle;
}
</style>
