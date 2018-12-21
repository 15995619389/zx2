<template>
    <div>
        <v-searchHeader></v-searchHeader>
        <div class="ela-banner">
            <h2><span>立即</span>申报</h2>
            <p>政小二助您快速获得国家政策补贴！</p>
        </div>
        <div class="c-container">
            <div class="ceping-wrap">
                <div class="flow-nav">
                    <ul>
                        <li><i class="basci"></i><span class="org">基本信息</span><i class="org-line"></i></li>
                        <li><i class="finance_0"></i><span class="org">企业财务状况</span><i class="org-line"></i></li>
                        <li><i class="equity_O"></i><span class="org">知识产权状况</span><i class="org-line"></i></li>
                        <li><i class="bot_0"></i><span class="org">企业建设状况</span></li>
                    </ul>
                </div>
                
                    <div class="ceping-form quick-wp">
                        <div class="form-row quick-box">
                            <i class="supman"></i>
                            <p class="zxr-b" v-if="isLogin">立即申报，政小二助您快速获得国家补贴政策！</p>
                            <p class="get-t" v-else>快速填写申报信息，政小二竭诚为您服务！</p>
                            <div> 
                                <div class="inputText">
                                    <input class="oth-control mon-ipt" placeholder="请输入公司名称" v-model.trim="declare.companyName" @blur="inputBlur(1)">
                                    <p>{{declare.companyNameText}}</p>
                                </div>
                                <div class="inputText">
                                    <input class="oth-control mon-ipt" placeholder="联系人姓名" v-model.trim="declare.contactName" @blur="inputBlur(2)">
                                    <p>{{declare.contactNameText}}</p>
                                </div>
                                 <!-- 未登录状态 -->
                                <!-- <v-Phone  v-if="isLogin" ref="phone" @ChildIphoneNumber='parentIphoneNumber'></v-Phone> -->
                                <v-Phone  v-if="isLogin" ref="phone"></v-Phone>
                                <!-- 登录状态 -->
                                <p v-else class="oth-control mon-ipt iphone">{{declare.phoneNumber}}</p>   
                            </div>
                            <div>
                            <v-distpicker :province="user.searchProvince" :city="user.searchCity" :area='user.searchArea' @province="onChangeProvince" @city="onChangeCity" @area='onChangeArea'></v-distpicker>
                            <p style="width:353px;margin: 0 auto;color:red" v-show="user.searchProvince.length<=0">{{user.ProvinceText}}</p>
                            <!-- <p style="width:353px;margin: 0 auto;color:red" v-else></p> -->
                            </div>                            
                            <div class="row-rt" v-if="!$route.query.id">
                                <select  class="oth-control" v-model="policycategoriesId" @blur="fieldSelest">
                                    <option value="请选择您要申报的类型" disabled selected>请选择您要申报的类型</option>
                                    <option v-for="(item,index) in policycategoriesModel" :value="item.id" @click="policySelect(item.id)" :key="index">{{item.name}}</option>
                                </select>
                                <p style="color:red">{{policycategoriesText}}</p>
                            </div>
                            <div class="row-rt" v-else>
                              <p  class="oth-control mon-ipt iphone">{{$route.query.category}}</p>   
                            </div>
                            <button class="immediate" @click="immediatePop">立即申报</button>
                        </div>
                    </div>
                </div>
        </div>
        <v-popup ref="Popup"></v-popup>
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
import VDistpicker from "v-distpicker";
import popup from "../Popup/bookingPopup";
import Phone from "../Common/phoneNumber";
export default {
  data() {
    return {
      isLogin: true,
      token: "",
      // 省份三级
      user: {
        searchProvince: "",
        searchCity: "",
        searchArea: "",
        ProvinceText:'',
        ProvinceCode: "",
        CityCode: "",
        AreaCode: ""
      },
      policycategoriesModel: [],
      policycategoriesId: "",
      policycategoriesText:'',
      declare: {
        companyName: "",
        contactName: "",
        phoneNumber: "",
        companyNameText: "",
        contactNameText: "",
        areaCode: "",
        areaCodeShow: false
      }
    };
  },
  created() {
    this.declare.phoneNumber = localStorage.getItem("phone");
    this.token = localStorage.getItem("token");
  },
  mounted() {
    this.$http
      .get("/policycategories")
      .then(res => {
        this.policycategoriesModel = res.data.items;
      })
      .catch(err => {
        console.log(err);
      });
    // this.parentIphoneNumber();
    this.getToken();
  },
  components: {
    VDistpicker,
    "v-searchHeader": searchHeader,
    "v-popup": popup,
    "v-Phone": Phone
  },
  methods: {
    // 判断token是否存在
    getToken() {
      if (this.token) {
        this.isLogin = false;
      } else {
        this.isLogin = true;
      }
    },
    // 手机号码
    // parentIphoneNumber(data) {
    //   this.declare.phoneNumber = data;
    // },
    // 城市
    onChangeProvince(data) {
      this.user.searchProvince = data.value;
      this.user.ProvinceCode = data.code;
    },
    onChangeCity(data) {
      this.user.searchCity = data.value;
      this.user.CityCode = data.code;
    },
    onChangeArea(data) {
      this.user.searchArea = data.value;
      this.user.AreaCode = data.code;
    },
    inputBlur(num) {
      const model = this.declare;
      if (num == 1) {
        if (!model.companyName) {
          model.companyNameText = "公司名称不能为空，请重新输入！";
        } else {
          model.companyNameText = "";
        }
      } else if (num == 2) {
        if (!model.contactName) {
          model.contactNameText = "姓名不能为空，请重新输入！";
        } else {
          model.contactNameText = "";
        }
      }
    },
    fieldSelest(){
      if(!this.policycategoriesId){
        this.policycategoriesText = '请选择您要申报的类型'
      }else{
        this.policycategoriesText = ''
      }
    },
    ValidateList(){
      let isPas = true;
      const model = this.declare;
      if (!model.companyName) {
        model.companyNameText = "公司名称不能为空，请重新输入！";
        isPas = false;
      } else if (!model.contactName) {
        model.contactNameText = "姓名不能为空，请重新输入！";
        isPas = false;
      }else if(this.user.searchProvince.length<=0){
        this.user.ProvinceText = '请选择地区'
        isPas = false;
      }
      return isPas;
    },
    Validate() {
      let isPas = true;
      const model = this.declare;
      if (!model.companyName) {
        model.companyNameText = "公司名称不能为空，请重新输入！";
        isPas = false;
      } else if (!model.contactName) {
        model.contactNameText = "姓名不能为空，请重新输入！";
        isPas = false;
      }else if(this.user.searchProvince.length<=0){
        this.user.ProvinceText = '请选择地区'
        isPas = false;
      }else if(!this.policycategoriesId){
        this.policycategoriesText = '请选择您要申报的类型'
        isPas = false
      }
      return isPas;
    },
    getMax(num1, num2, num3) {
      if (num1 > num2) {
        if (num1 > num3) {
          this.declare.areaCode = num1;
        } else {
          this.declare.areaCode = num3;
        }
      } else {
        if (num2 > num3) {
          this.declare.areaCode = num2;
        } else {
          this.declare.areaCode = num3;
        }
      }
    },
    immediatePop() {
      if (this.user.CityCode == "") {
        this.user.CityCode = 0;
      }
      if (this.user.AreaCode == "") {
        this.user.AreaCode = 0;
      }
      this.getMax(
        this.user.ProvinceCode,
        this.user.CityCode,
        this.user.AreaCode
      );
      if(!this.$route.query.id){
        if (!this.Validate()) {
          return false;
        }
      }else{
        if (!this.ValidateList()) {
          return false;
        }
      }
      if (!this.token) {
        if (!this.$refs.phone.Validate()) {
          return false;
        }
      }
      var params = {
        policyCategoryId: this.policycategoriesId,
        policyId: this.$route.query.id,
        companyName: this.declare.companyName,
        contactName: this.declare.contactName,
        contactPhoneNumber: this.declare.phoneNumber,
        areaCode: this.declare.areaCode
      };
      if (this.$route.query.id) {
        this.$http
          .post("/policies/" + this.$route.query.id+'/apply', params)
          .then(res => {
            if (res.status == "200") {
              this.$refs.Popup.popShow();
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .post("/policycategories/" + this.policycategoriesId+'/apply', params)
          .then(res => {
            if (res.status == "200") {
              this.$refs.Popup.popShow();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    policySelect(id) {
      console.log(id);
      this.policycategoriesId = id;
    }
  }
};
</script>
<style>
.quick-box .distpicker-address-wrapper select {
  /* flex: 1; */
  padding: 0 !important;
  font-size: 14px !important;
  float: left;
  width: 32.33%
}
.quick-box .distpicker-address-wrapper select:nth-child(2) {
  margin: 0 5px;
}
.quick-box .distpicker-address-wrapper select{
  margin-right: 0
}
</style>

<style scoped>
.distpicker-address-wrapper {
  color: #9caebf;
  width: 351px;
  margin: 0 auto;
  overflow: hidden;
  /* display: flex; */
}

.ela-banner {
  background: url("../../images/banner/spl-bg.jpg") top center;
  width: 100%;
  height: 370px;
  background-size: cover;
  text-align: center;
  padding: 80px 0 20px 0;
  box-sizing: border-box;
  z-index: 222;
}
.ela-banner h2 {
  font-size: 50px;
  color: #fff;
  letter-spacing: 1px;
  line-height: 55px;
}
.ela-banner h2 span {
  color: #fd6600;
}
.ela-banner p {
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
  line-height: 55px;
  margin-top: 20px;
}

.c-container .ceping-wrap .flow-nav {
  width: 100%;
  border-bottom: 1px solid #979797;
  padding: 20px 20px 20px 40px;
  box-sizing: border-box;
}
.c-container .ceping-wrap .flow-nav li {
  display: inline-block;
}
.c-container .ceping-wrap .flow-nav li span {
  float: left;
  display: inline-block;
  font-size: 20px;
  letter-spacing: 0.4px;
  font-weight: 600;
  line-height: 50px;
  margin: 0 10px;
}
.org {
  color: #fa6602;
}
.c-container .ceping-wrap .flow-nav i {
  background: url(../../images/combg.png);
  display: inline-block;
  float: left;
}
.c-container .ceping-wrap .flow-nav .basci {
  height: 56px;
  width: 56px;
  background-position: -1719px 0;
}
.c-container .ceping-wrap .flow-nav .org-line {
  height: 10px;
  width: 106px;
  background-position: -2495px 0;
  margin-top: 20px;
}
.c-container .ceping-wrap .flow-nav .finance_0 {
  height: 56px;
  width: 56px;
  background-position: -1999px 0;
}
.c-container .ceping-wrap .flow-nav .equity_O {
  height: 56px;
  width: 56px;
  background-position: -1607px 0;
}
.c-container .ceping-wrap .flow-nav .bot_0 {
  height: 56px;
  width: 56px;
  background-position: -1775px 0;
}

.ceping-form {
  width: 760px;
  margin: 50px auto;
  background: #f8f8f8;
  padding: 50px 20px 80px 100px;
  box-sizing: border-box;
  position: relative;
}
.quick-wp {
  padding: 20px;
  box-sizing: border-box;
}
.quick-box {
  width: 80%;
  margin: 0 auto;
}
.ceping-form .form-row {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}
.quick-box .supman {
  margin: 0 auto;
  background: url(../../images/sup.png) no-repeat;
  width: 170px;
  height: 160px;
  display: block;
}
.supman {
  animation: myfirst 1s infinite;
}
@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.zxr-b {
  font-size: 20px;
  color: #14579e;
  letter-spacing: 0.89px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
}
.get-t {
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0.57px;
  text-align: center;
  font-weight: 600;
  margin: 20px 0 10px 0;
}
.ceping-form .form-row .oth-control {
  width: 431px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.ceping-form .quick-box .oth-control {
  width: 351px;
}
.ceping-form .form-row .mon-ipt {
  position: relative;
  text-align: center;
  display: block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.iphone {
  margin: 0 auto 20px;
  line-height: 32px;
  color: #ccc;
}
.ceping-form .quick-box .tell-item {
  display: block;
  width: 350px;
  margin: 0 auto;
  overflow: hidden;
}
.ceping-form .quick-box .tel-int {
  width: 216px;
  float: left;
}
.ceping-form .quick-box .tell-item input {
  float: left;
}
.ceping-form .quick-box .tell-item a {
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
.ceping-form .quick-box .selctcity {
  width: 354px;
  display: block;
  margin: 0 auto;
}
.ceping-form .quick-box .row-rt {
  width: 350px;
  display: block;
  margin: 20px auto;
  float: none;
  position: relative;
}
.immediate {
  display: block;
  margin: 0 auto;
  background: #2963ca;
  width: 360px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.57px;
  cursor: pointer;
  border: 0;
}
.quick-box .inputText {
  width: 353px;
  margin: 0 auto 20px auto;
}
.inputText input {
  margin: 0 auto;
}
.inputText p {
  color: red;
}
</style>
