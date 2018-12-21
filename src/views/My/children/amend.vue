<template>
<div class="ac-right  member-wp">
                <div  class="meb-tit">
                    <h3><i class="basic-icon" ></i>修改基本信息</h3>
                </div>
                <div class="past-wp">
                   <div class="basic-box">
                                <div class="bs-left">
                                    <div class="user-img">
                                        <img :src="baeUrl+'/'+infoModel.imgUrl">
                                    </div>
                                    <div class="use-name">
                                        <i class="up-icon"></i>
                                        <span>{{infoModel.realName}}</span>
                                    </div>
                                        <a href="javaScript:;" class="blue" id="fileImgs" @click="uploadImg">上传头像</a>
                                </div>
                                <div class="bs-right" style="padding:30px 0 0 80px;box-sizing: border-box">
                                    <div class="infom-form">
                                        <div class="row">
                                            <div class="inf-label">账户名称：</div>
                                            <div class="inf-inpt" style="line-height:26px;padding-top:4px">{{infoModel.userName}} <span href="javaScript:;"  class="buletext" @click="modify">修改</span> </div>
                                        </div>
                                        <div class="row">
                                            <span class="ospan">*</span>
                                            <div class="inf-label">真实姓名：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的真实姓名" v-model.trim="infoModel.realName" @blur="inputBlur('userName')">
                                                <p>{{infoModel.msgName}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <span class="ospan">*</span>
                                            <div class="inf-label">联系方式：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的联系方式" v-model.trim="infoModel.phoneNumber" @blur="inputBlur('userIphone')">
                                                <p>{{infoModel.msgIphone}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <span class="ospan">*</span>
                                            <div class="inf-label">工作单位：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的工作单位" v-model.trim="infoModel.companyName" @blur="inputBlur('userJob')">
                                                <p>{{infoModel.msgJob}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <span class="ospan">*</span>
                                            <div class="inf-label">电子邮箱：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的电子邮箱" v-model.trim="infoModel.emailAddress" @blur="inputBlur('userEmail')">
                                                <p>{{infoModel.msgEmail}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <button type="button" class="buton-yellow" @click="save">保存</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    <!-- 修改 -->
                    <v-infoPopup ref="infoPopup" @reviseData='ReviseData'></v-infoPopup>
                    <v-imgPopup ref='imgPopup' @imgpp='changgeImg'></v-imgPopup>
                </div>
</div>                
</template>

<script>
import infoPopup from '../../Popup/infoPopup'
import imgPopup from '../../Popup/imgPopup'
import config from '../../../appsettings'
export default {
    data(){
        return{
            isPopup:false,
            isAmendShow:false,
            infoModel:{
                // realName:'',
                // phoneNumber:'',
                // companyName:'',
                // emailAddress:'',
                msgName:'',
                msgIphone:'',
                msgJob:'',
                msgEmail:'',
                imgUpSrc:''
            },
            baeUrl:config.Api_Url
        }
    },
    created(){
        localStorage.getItem('phone')
        this.$http.get('/account/epns_detail').then(res=>{
                this.infoModel = res.data
            }).catch(err=>{
                console.log(err)
            })
    },
    components:{
        'v-infoPopup':infoPopup,
        'v-imgPopup':imgPopup
    },
    methods:{
        ReviseData(data){
            this.infoModel.userName = data
        },
        changgeImg(data){
            console.log(data)
            // this.infoModel.imgUrl = data.imgUrl
            this.infoModel.imgUrl = data.data
        },
        inputBlur(type){
            const model = this.infoModel;   
            const regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            const regIphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
            if(type == 'userName'){
                if(!model.realName){
                    model.msgName = '姓名不能为空！'
                }else{
                     model.msgName = ''
                }
            }else if( type == 'userIphone'){
                if(!model.phoneNumber || !regIphone.test(model.phoneNumber)){
                     model.msgIphone = '请输入11位有效的手机号码！'
                }else{
                    model.msgIphone = ''
                }
            }else if(type == 'userJob'){
                if(!model.companyName){
                     model.msgJob = '工作单位不能为空！'
                }else{
                     model.msgJob = ''
                }
            }else if(type == 'userEmail'){
                if(!model.emailAddress || !regEmail.test(model.emailAddress)){
                    model.msgEmail = '请输入有效的电子邮箱！'
                }else{
                     model.msgEmail = ''
                }
            }
        },
        Validate(){
            const model = this.infoModel;          
            const regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            const regIphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
            let isPas = true
            if(!model.realName){
                model.msgName = '姓名不能为空！'
                isPas=false
            }else if(!model.phoneNumber){
                model.msgIphone = '联系方式不能为空！'
                isPas=false
            }else if(!regIphone.test(model.phoneNumber)){
                model.msgIphone = '请输入11位有效的手机号码！'
                isPas=false
            }else if(!model.companyName){
                model.msgJob = '工作单位不能为空！'
                isPas=false
            }else if(!model.emailAddress){
                model.msgEmail = '邮箱不能为空！'
                isPas=false
            }else if(!regEmail.test(model.emailAddress)){
                model.msgEmail = '请输入有效的电子邮箱！'
                isPas=false
            }
            return isPas
        },
        save(){
            
            if(!this.Validate()){
                return false
            }
            this.$http.post('/account/profile_update',{
                realName:this.infoModel.realName,
                phoneNumber:this.infoModel.phoneNumber,
                companyName:this.infoModel.companyName,
                emailAddress:this.infoModel.emailAddress,
                imgUrl:this.infoModel.imgUrl
            }).then(res=>{
                if(res.status == 200){
                    this.$router.push('/my/info')
                }
            }).catch(err=>{
                console.log(err)
            })
            
        },
        uploadImg(){
           this.$refs.imgPopup.imgBlock()

        },
        modify(){
            this.$refs.infoPopup.infoShow()
        }
    }
}
</script>

<style scoped>
.member-wp {
    padding: 0;
    background: none;
}

.ac-right {
    width: 858px;
    background: #fff;
    float: right;
    padding: 13px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.meb-tit {
    width: 100%;
    background: #326CD1;
    overflow: hidden;
    padding-left: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.meb-tit h3 {
    float: left;
    font-size: 20px;
    color: #fff;
    letter-spacing: 1.25px;
    line-height: 50px;
    font-weight: normal;
}


.member-wp .basic-icon {
    background-position: -938px 0;
}
.member-wp .mb-model .past-wp {
    padding: 20px 10px;
    box-sizing: border-box;
}
.basic-box {
    border: 1px solid #979797;
    overflow: hidden;
    margin-bottom: 250px;
}
.basic-box .bs-left {
    width: 30%;
    float: left;
    text-align: center;
    padding-right: 30px;
    box-sizing: border-box;
}
.basic-box .bs-left .user-img {
    width: 168px;
    height: 168px;
    box-shadow: 2px 3px 2px #979797;
    margin: 20px auto;
}
.user-img img{
    width: 100%;
    height: 100%;
}
.basic-box .bs-left .use-name {
    text-align: center;
    width: 40%;
    margin: 0 auto;
    margin-bottom: 20px;
}
.up-icon {
    background: url('../../../images/combg.png') no-repeat;
    background-position: -2599px -54px;
    width: 18px;
    height: 19px;
    display: block;
    float: left;
    margin-top: 3px;
}
.basic-box .blue {
    background: #2963CA;
    color: #fff;
    width: 168px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    text-align: center;
}
.basic-box .bs-right {
    width: 70%;
    float: left;
    padding:30px 0 0 80px;
    border-left: #979797 solid 1px;
    box-sizing: border-box;
}
.basic-box .bs-right .infom-form {
    width: 365px;
    margin-bottom: 60px;
}
.basic-box .bs-right .row {
    width: 100%;
    overflow: hidden;
    margin-bottom: 15px;
}
.basic-box .bs-right .row .inf-label {
    width: 22%;
    float: left;
    color: #2963CA;
    font-weight: 600;
    padding-top: 5px;
    box-sizing: border-box;
}
.basic-box .bs-right .row .inf-inpt {
    width: 76%;
    float: right;
}
.inf-inpt p{
    color: red
}
.row .buletext {
    color: #2963CA;
    cursor: pointer;
}
.buton-yellow {
    background: #F5A623;
    width: 168px;
    height: 35px;
    border: 0;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: 0.88px;
    line-height: 26px;
    font-weight: 600;
    float: right;
    cursor: pointer;
}
.basic-box .bs-right .row .inf-inpt input {
    background: #FFFFFF;
    border: 1px solid #979797;
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
    width: 99%;
    height: 30px;
    text-align: center;
}
.row .ospan{
    color: red;
    float: left;
    padding-top: 8px
}
</style>
