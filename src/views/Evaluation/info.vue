<template>
    <div>
        <v-searchHeader></v-searchHeader>
        <v-banner></v-banner>
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
                        <p class="zxr-b">政小二正在努力赶制测评报告.....</p>
                        <p class="get-t">输入如下信息，快速获取报告</p>
                        <div class="inputText">
                            <input class="oth-control mon-ipt" placeholder="请输入公司名称" v-model="jobName" @blur="inputBlur(1)">
                            <p>{{msgJobName}}</p>
                        </div>
                        <div class="inputText">
                            <input class="oth-control mon-ipt" placeholder="联系人姓名" v-model="username" @blur="inputBlur(2)">
                            <p>{{msgName}}</p>
                        </div>
                        <v-phone ref="phone"></v-phone>
                        <button class="immediate" @click="immediatePop">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from '../Search/search-header'
import Banner from '../Common/banner'
import phone from '../Common/phoneNumber'
export default {
    data(){
        return{
            iphone:'',
            msgIphone:'',
            username:'',
            msgName:'',
            jobName:'',
            msgJobName:'',
            hintText:'请重新输入，内容不能为空或超过100个字符！'
        }
    },
    components:{
        'v-searchHeader':searchHeader,
        'v-banner':Banner,
        'v-phone':phone
    },
    methods:{
        inputBlur(num){
            if(num == 1){
                if(!this.jobName || this.jobName.length>100){
                    this.msgJobName = this.hintText
                }else{
                    this.msgJobName = ''
                }
            }else if(num == 2){
                if(!this.username || this.username.length>40){
                    this.msgName = '请重新输入，内容不能为空或超过40个字符！'
                }else{
                     this.msgName = ''
                }
            }
        },
        ValidateSubmitData(){
            let isPas = true;
            if(!this.jobName || this.jobName.length>100){
                this.msgJobName = this.hintText
                isPas = false; 
            }else if(!this.username || this.username.length>40){
                this.msgName = '请重新输入，内容不能为空或超过40个字符！'
                isPas = false; 
            } 
            return isPas
        },
        immediatePop(){
            if(!this.ValidateSubmitData()){
                return false
            }
            if(!this.$refs.phone.Validate()){
                return false
            }
            this.$router.push('/evaluation/detail')
        }
    }
}
</script>

<style scoped>
.distpicker-address-wrapper{
    color: #9caebf;
    width: 351px;
    margin: 0 auto;
    overflow: hidden;
    display: flex;
}

.ela-banner {
    background: url('../../images/banner/spl-bg.jpg') top center;
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
.ela-banner h2 span{
    color: #FD6600;
}
.ela-banner p{
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
    display: block;
    font-size: 20px;
    letter-spacing: 0.4px;
    font-weight: 600;
    line-height: 50px;
    margin: 0 10px;
}
.org {
    color: #FA6602;
}
.c-container .ceping-wrap .flow-nav i {
    background: url(../../images/combg.png);
    display: block;
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
    background: #F8F8F8;
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
    background: url(../../images/sup.png)no-repeat;
    width: 170px;
    height: 160px;
    display: block;
}
.supman{
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
    color: #14579E;
    letter-spacing: 0.89px;
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px
}
.get-t {
    font-size: 16px;
    color: #4A4A4A;
    letter-spacing: 0.57px;
    text-align: center;
    font-weight: 600;
    margin: 20px 0 10px 0;
}
.ceping-form .form-row .oth-control {
    width: 431px;
    border: 1px solid #ccc;
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.10);
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
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.10);
    height: 32px
}
.iphone{
    margin: 0 auto 20px;
    line-height:32px;
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
    color: #FFFFFF;
    letter-spacing: 0.43px;
    background: #2963CA;
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
    margin:0  auto ;
    background: #2963CA;
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

    margin: 0 auto 20px auto;
}
.inputText input{
    margin: 0  auto;
}
.inputText p{
    width: 353px;
    margin: 0 auto;
    color:red;
}
</style>
