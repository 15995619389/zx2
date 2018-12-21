<template>
                <div class="ac-right  member-wp">
                    <div class="mb-model">
                        <div class="meb-tit">
                            <h3><i class="basic-icon"></i>基本信息</h3>
                        </div>
                        <div class="past-wp">
                            <div class="basic-box">
                                <div class="bs-left">
                                    <div class="user-img">
                                        <img :src="imgUpSrc">
                                    </div>
                                    <div class="use-name">
                                        <i class="up-icon"></i>
                                        <span>张小三</span>
                                    </div>
                                        <a href="javaScript:;" class="blue" id="fileImgs" @click="uploadImg">上传头像</a>
                                </div>
                                <div class="bs-right" style="padding:30px 0 0 80px;box-sizing: border-box">
                                    <form class="infom-form">
                                        <div class="row">
                                            <div class="inf-label">账户名称：</div>
                                            <div class="inf-inpt" style="line-height:26px;padding-top:4px">15221356321 <span href="javaScript:;" class="buletext" @click="modify">修改</span> </div>
                                        </div>
                                        <div class="row">
                                            <div class="inf-label">真实姓名：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的真实姓名" v-model.trim="infoModel.name" @blur="inputBlur('userName')">
                                                <p>{{infoModel.msgName}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="inf-label">联系方式：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的联系方式" v-model.trim="infoModel.iphone" @blur="inputBlur('userIphone')">
                                                <p>{{infoModel.msgIphone}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="inf-label">工作单位：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的工作单位" v-model.trim="infoModel.job" @blur="inputBlur('userJob')">
                                                <p>{{infoModel.msgJob}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="inf-label">电子邮箱：</div>
                                            <div class="inf-inpt">  
                                                <input class="oth-control mon-ipt" placeholder="请填写您的电子邮箱" v-model.trim="infoModel.email" @blur="inputBlur('userEmail')">
                                                <p>{{infoModel.msgEmail}}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <button type="button" class="buton-yellow" @click="save">保存</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- 修改 -->
                    <v-infoPopup ref="infoPopup"></v-infoPopup>
                    <v-imgPopup ref='imgPopup' @imgpp='changgeImg'></v-imgPopup>
                </div>
</template>

<script>
import infoPopup from '../../Popup/infoPopup'
import imgPopup from '../../Popup/imgPopup'
export default {
    data(){
        return{
            isPopup:false,
            infoModel:{
                name:'',
                iphone:'',
                job:'',
                email:'',
                msgName:'',
                msgIphone:'',
                msgJob:'',
                msgEmail:''
            },
            imgUpSrc:''
        }
    },
    components:{
        'v-infoPopup':infoPopup,
        'v-imgPopup':imgPopup
    },
    methods:{
        changgeImg(data){
            this.imgUpSrc = data
        },
        inputBlur(type){
            const model = this.infoModel;   
            const regEmail=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            const regIphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
            if(type == 'userName'){
                if(!model.name){
                    model.msgName = '姓名不能为空！'
                }else{
                     model.msgName = ''
                }
            }else if( type == 'userIphone'){
                if(!model.iphone || !regIphone.test(model.iphone)){
                     model.msgIphone = '请输入11位有效的手机号码！'
                }else{
                    model.msgIphone = ''
                }
            }else if(type == 'userJob'){
                if(!model.job){
                     model.msgJob = '工作单位不能为空！'
                }else{
                     model.msgJob = ''
                }
            }else if(type == 'userEmail'){
                if(!model.email || !regEmail.test(model.email)){
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
            if(!model.name){
                model.msgName = '姓名不能为空！'
                isPas=false
            }else if(!model.iphone){
                model.msgIphone = '联系方式不能为空！'
                isPas=false
            }else if(!regIphone.test(model.iphone)){
                model.msgIphone = '请输入11位有效的手机号码！'
                isPas=false
            }else if(!model.job){
                model.msgJob = '工作单位不能为空！'
                isPas=false
            }else if(!model.email){
                model.msgEmail = '邮箱不能为空！'
                isPas=false
            }else if(!regEmail.test(model.email)){
                model.msgEmail = '请输入有效的电子邮箱！'
                isPas=false
            }
            return isPas
        },
        save(){
            if(!this.Validate()){
                return false
            }else{
                this.$router.push({path:'/my/info'})
            }
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
    width: 78%;
    float: right;
}
.inf-inpt p{
    color: red
}
.buletext {
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
</style>
