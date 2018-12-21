<template>
    <div>
        <v-searchHeader></v-searchHeader>
        <div class="a-container">
            <div class="ab-main">
                <div class="navigation">我的位置 : <router-link to="/companie">企服帮</router-link> &gt; <span class="navt-cur">{{detailModel.title}}</span></div>
                <div class="progam-cont">
                    <div class="detail-top">
                        <div class="detal_img">
                            <img :src="baeUrl+detailModel.imgUrl">
                        </div>
                        <div class="detil_text">
                            <h3>{{detailModel.title}}</h3>
                            <div class="button-groups">
                                <a href="javascript:" class="ask-tit" @click="consult">业务咨询</a>
                            </div>
                            <div class="info-mes">
                                <h4>概述</h4>
                                <p>{{detailModel.introduction}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="specil-comon">
                        <div class="spe-tab">
                            <h2>服务特色</h2>
                            <div class="inner-stu">
                                <p v-html="detailModel.feature"></p>
                            </div>
                        </div>
                        <div class="spe-tab">
                            <h2>业务说明</h2>
                            <div class="inner-stu">
                                <p v-html="detailModel.practice"></p>
                            </div>
                        </div>
                        <div class="spe-tab">
                            <h2>服务流程</h2>
                            <div class="inner-stu">
                                <p v-html="detailModel.serviceProcess"></p>
                            </div>
                        </div>
                        <div class="spe-tab">
                            <h2>联系方式</h2>
                            <div class="inner-stu">
                                <p v-html="detailModel.contact"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <template>
            <div class="popupBox" v-show="isShow">
                <div id="mask"></div>
                <div class="pop error_pop">
                    <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="popHide">x</a></div>
                    <div class="pop_bd">
                        <div>
                            <span>咨询内容：</span>
                            <textarea placeholder="请输入您的咨询内容!" rows="3" v-model.trim="consultContent" @blur="inputBlur(1)"></textarea>
                         
                        </div>
                        <div>
                            <span>咨询人：</span>
                            <input type="text" placeholder="请输入您的名字!" v-model.trim="consultName" @blur="inputBlur(2)"/>
                        </div>
                        <div>
                            <span>联系方式：</span>
                            <input type="text" placeholder="请输入您的联系方式!" v-model="consultPhoneNumber" @blur="inputBlur(3)"/>
                        </div>
                        <div class="error_tips" style="display:none"></div>
                        <div class="btn">
                            <button @click="submitConsultation">提交</button>
                            <button @click="popHide">取消</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="popupBox" v-show="isLoginHide">
                <div id="mask"></div>
                <div class="pop error_pop">
                    <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="loginHide">x</a></div>
                    <div class="pop_bd">
                        <div class="hint_storng">
                            <strong>请先登录，才能进行业务咨询！</strong>
                        </div>
                        <router-link class="pop_btn" to="/login">确定</router-link>
                        <!-- <a href="javascript:void(0);" class="pop_btn" id="MainMsgOK">确定</a> -->
                    </div>
                </div>
            </div>
            <div class="popupBox" v-show="isSuccessHide">
                <div id="mask"></div>
                <div class="pop error_pop">
                    <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="successHide">x</a></div>
                    <div class="pop_bd">
                        <div class="hint_storng">
                            <strong>咨询成功，工作人员会尽快给您处理！</strong>
                        </div>
                        <a href="javaScript:;" class="pop_btn" @click="successHide">确定</a>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
import config from "../../appsettings";

export default {
  data() {
    return {
      token: "",
      detailModel: [],
      isLoginHide: false,
      isShow: false,
      isSuccessHide:false,
      baeUrl: config.Api_Url,
      consultPhoneNumber: "",
      consultName: "",
      consultContent: ""
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    if (this.$route.params.type == "footer") {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  },
  mounted() {
    this.init();
  },
  components: {
    "v-searchHeader": searchHeader
  },
  methods: {
    init() {
      this.$http
        .get("/enterprises/" + this.$route.params.id)
        .then(res => {
          this.detailModel = res.data;
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    consult() {
      if (!this.token) {
        this.isLoginHide = true;
      } else {
        this.isShow = true;
      }
    },
    popHide() {
      this.isShow = false;
    },
    loginHide() {
      this.isLoginHide = false;
    },
    submitConsultation() {
      if (!this.Validate()) {
        return false;
      }
      this.$http.put('/enterprises',{
          enterpriseId:this.$route.params.id,
          mobile:this.consultPhoneNumber,
          RealName:this.consultName,
          consultationContent:this.consultContent,
      },{
          headers: {
              Authorization: "Bearer " + this.token
            }
      }).then((res)=>{
          if(res.status == 200){
              this.isShow = false;
              this.isSuccessHide = true
          }
          console.log(res)
      }).catch((err)=>{
          console.log(err)
      })
    },
    inputBlur(num) {
      const reg = /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
      if (num == 1) {
        if (!this.consultContent) {
          this.SetError("请输入咨询内容！");
          return;
        } else {
          this.SetError("");
          return;
        }
      } else if (num == 2) {
        if (!this.consultName) {
          this.SetError("请输入咨询人的姓名！");
          return;
        } else {
          this.SetError("");
          return;
        }
      } else {
        if (!this.consultPhoneNumber) {
          this.SetError("手机号码不能为空！");
        } else if (!reg.test(this.consultPhoneNumber)) {
          this.SetError("请输入正确的手机号码！");
        } else {
          this.SetError("");
        }
      }
    },
    Validate() {
      const reg = /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
      let isPas = true;
      if (!this.consultContent) {
        this.SetError("请输入咨询内容！");
        isPas = false;
      } else if (!this.consultName) {
        this.SetError("请输入咨询人的姓名！");
        isPas = false;
      } else if (!this.consultPhoneNumber) {
        this.SetError("手机号码不能为空！");
        isPas = false;
      } else if (!reg.test(this.consultPhoneNumber)) {
        this.SetError("请输入正确的手机号码！");
        isPas = false;
      }
      return isPas;
    },
    SetError(msg) {
      if (msg == "") {
        $(".error_tips").hide();
      } else {
        $(".error_tips").show();
      }
      $(".error_tips").html(msg);
    },
    successHide(){
      this.isSuccessHide = false
    }
  }
};
</script>

<style scoped>
.pop_btn {
  width: 135px;
  background: #0c4ca3;
  line-height: 35px;
  text-align: center;
  display: block;
  color: #fff;
  font-size: 18px;
  border-radius: 3px;
  margin: 0 auto 20px;
}
.pop_bd .hint_storng {
  padding: 40px 0;
  text-align: center;
  font-size: 17px;
}
.error_tips {
  background: #fef2f2;
  border: #ff7e00 1px solid;
  width: 373px;
  margin-left: 101px;
  border-radius: 2px;
  vertical-align: top;
  font-size: 12px;
  line-height: 5px;
}
.a-container {
  background: #f1f1f1;
}
.ab-main {
  width: 1170px;
  margin: 0 auto;
  padding: 20px 0;
}
.progam-cont {
  padding: 20px;
  overflow: hidden;
  background: #fff;
}
.detail-top {
  width: 100%;
  overflow: hidden;
}
.detal_img {
  width: 35%;
  float: left;
}
.detal_img img {
  width: 350px;
  height: 300px;
}
.detil_text {
  float: left;
  width: 65%;
  position: relative;
}
.detil_text h3 {
  font-size: 20px;
  font-weight: 500;
}
.detil_text .button-groups {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
}
.detil_text .button-groups a {
  display: block;
  float: left;
  color: #fff;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 3px;
  margin-right: 100px;
  width: 120px;
  text-align: center;
  font-size: 16px;
  background: #f67c00;
}
.detil_text .button-groups a:hover {
  color: #2963ca;
}
.info-mes {
  width: 100%;
  display: block;
  background: #f1f1f1;
  border: #ddd solid 1px;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 15px;
}
.info-mes h4 {
  font-size: 16px;
  margin-bottom: 10px;
  font-weight: normal;
}
.specil-comon {
  width: 100%;
  margin-top: 20px;
}
.specil-comon .spe-tab {
  width: 100%;
  border: #ddd solid 1px;
  margin-bottom: 20px;
}
.specil-comon .spe-tab h2 {
  font-size: 16px;
  background: #f1f1f1;
  border-bottom: #ddd solid 1px;
  padding-left: 20px;
  color: #0c4ca3;
  height: 35px;
  line-height: 35px;
  font-weight: normal;
}
.specil-comon .spe-tab .inner-stu {
  padding: 5px 15px;
}
.specil-comon .spe-tab p {
  line-height: 25px;
  text-align: justify;
}
.pop_bd div {
  padding: 8px 15px;
  overflow: hidden;
}
.pop_bd div span {
  display: block;
  float: left;
}
.pop_bd div input,
.pop_bd div textarea {
  float: right;
  width: 80%;
  padding: 4px;
}
.pop_bd div button {
  padding: 5px 40px;
  text-align: center;
  font-size: 16px;
  margin-right: 10px;
  cursor: pointer;
  border-width: 1px;
  border-radius: 5px;
}
.pop_bd div button:last-child {
  background: #ccc;
}
.pop_bd div button:first-child {
  background: #2963ca;
  color: #fff;
}
.pop_bd {
  padding: 10px 0;
}
.pop_bd .btn {
  text-align: center;
}
</style>
