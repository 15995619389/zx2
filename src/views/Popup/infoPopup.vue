<template>
<div class="popupBox" v-show="isCommitHide">
    <div id="mask"></div>
    <div class="pop error_pop">
        <div class="pop_tit"><a href="javaScript:;" class="a_close" id="domMessage1_close" @click="infoCommit">x</a></div>
        <div class="pop_bd user-bd">
            <div class="fom-tit">
                <span class="popsmlogo"></span>
                <span class="change-name">更换账户名称</span>
            </div>
            <div class="change-form">
                <div class="row">
                    <label>原账户：</label>
                    <div class="i-items">
                        <input type="text" placeholder="请输入您的原账户" v-model.trim="infoModel.userName" @blur="infoInput(1)" >
                        <p>{{infoModel.oldNameText}}</p>
                    </div>
                </div>
                <div class="row">
                    <label>密码：</label>
                    <div class="i-items"> 
                        <input class="oth-control mon-ipt" placeholder="请输入您的密码" type="password" v-model.trim="infoModel.password" @blur="infoInput(2)">
                        <p>{{infoModel.passwordText}}</p>
                    </div>
                </div>
                <div class="row">
                    <label>新账户：</label>
                    <div class="i-items"> 
                        <input type="text" class="oth-control mon-ipt" placeholder="请输入您的新账户" v-model.trim="newName" @blur="infoInput(3)">
                        <p>{{infoModel.newNameText}}</p>
                    </div>
                </div>
                <div class="row">
                    <label>验证码：</label>
                    <div class="i-items">   
                        <div>
                            <input type="text" class="oth-control mon-ipt tel-int" placeholder="验证码" v-model.trim="infoModel.authCodeModel">
                            <a v-if="sendAuthCode" href="javaScript:;" class="code" @click="getAuthCode">获取验证码</a>
                            <a v-else href="javaScript:;" class="code" style="cursor:default"><span>{{auth_time}}</span>秒后重新获取</a>
                        </div>
                        <p>{{infoModel.authText}}</p>
                    </div>
                </div>
                <div class="row">
                    <span class="immediate" @click="infoSubmit">提交</span>
                </div>
            </div>
        </div>
    </div>
</div>    
</template>

<script>
export default {
    data(){
        return{
            isCommitHide:false,
            sendAuthCode:true,
            token:'',
            newName:'',
            infoModel:{
                oldName:"",
                password:'',
                authCodeModel:"",
                authPost:'',
                oldNameText:'',
                passwordText:'',
                newNameText:'',
                authText:'',
            },
            auth_time:0
        }
    },
    created(){
        this.token = localStorage.getItem('token')
        this.$http.get('/account/epns_detail',{
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then(res=>{
                this.infoModel = res.data
            }).catch(err=>{
                console.log(err)
            })
    },
    methods:{
        // 获取验证码
        getAuthCode(){
            const reg= 11&& /^((13|14|15|17|18)[0-9]{1}\d{8})$/;//手机号正则验证
            if(!this.newName){
                this.infoModel.newNameText = '请输入手机号码'
            }else if(!reg.test(this.newName)){
                this.infoModel.newNameText = '请输入正确的手机号码'
            }else{
                this.sendAuthCode = false;
                this.auth_time = 60;
                let auth_timetimer  = setInterval(()=>{
                    this.auth_time--;
                    if(this.auth_time <= 0 ){
                        this.sendAuthCode = true;
                        clearInterval(auth_timetimer)
                    }
                },1000)
                this.$http.post('/sms_code/update_profile',this.newName,{headers:{"Content-Type": "application/json"}}).then((res)=>{
                    if(res.status == 200){
                        this.infoModel.authText=res.data
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
        },
        infoCommit(){
            this.isCommitHide = false
        },
        infoShow(){
            this.isCommitHide = true
        },
        infoInput(num){
            var regIphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
            var model = this.infoModel
           if(num == 1){
               if(!model.phoneNumber){
                    model.oldNameText = '账户不能为空！'
                }else if(!regIphone.test(model.phoneNumber)){
                    model.oldNameText = '请填写正确的手机号码！'
                }else{
                    model.oldNameText = ''
                }
           }else if(num == 2){
               if(!model.password){
                   model.passwordText = '密码错误！'
               }else{
                   model.passwordText = ''
               }
           }else if(num == 3){
               if(!regIphone.test(this.newName) || !this.newName){
                    model.newNameText = '请填写正确的手机号码！'
               }else{
                    model.newNameText = ''
               }
           }
        },
        Validate(){
            const model = this.infoModel;
            const regIphone = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/; 
            let isPas = true;
             if(!model.phoneNumber){
                model.oldNameText = '账户不能为空！'
                isPas=false
             }else if(!model.password){
                model.passwordText = '密码错误'
                isPas=false
             }else if(!regIphone.test(this.newName) || !this.newName){
                model.newNameText = '请填写正确的手机号码！'
                isPas=false
             }else if(!model.authCodeModel){
                model.authText = '请填写验证码！'
                isPas=false
             }
            return isPas
        },
        infoSubmit(){
            if (!this.Validate()) {
                return false;
            }
            this.$http.post('/account/change_username',this.newName,{
                headers: {
                    Authorization: "Bearer " + this.token,
                    'Content-Type':'application/json'
                }
            }).then(res=>{
                this.$emit('reviseData',this.newName)
                this.isCommitHide = false
            }).catch(err=>{
                console.log(err)
            })
        }
    }
}
</script>

<style scoped>
.pop_bd{
    padding: 30px 0 20px 0;
    font-size: 26px;
    width: 90%;
    margin: 0 auto;
}
.fom-tit {
    width: 100%;
    font-size: 16px;
    color: #14579E;
    overflow: hidden;
}
.change-form {
    width: 436px;
    margin-top: 20px;
}
.fom-tit .popsmlogo {
    background: url('../../images/combg.png')no-repeat;
    width: 66px;
    height: 35px;
    background-position: -2508px -91px;
    display: block;
    border-right: 1px solid #C9C9C9;
    float: left;
    padding-right: 10px;
}
.fom-tit .change-name {
    float: left;
    padding-left: 10px;
    font-size: 16px;
    color: #14579E;
}
.change-form .row {
    width: 100%;
    overflow: hidden;
    margin-bottom: 10px;
}
.change-form .row label {
    width: 85px;
    float: left;
    font-size: 14px;
    color: #14579E;
    letter-spacing: 0.88px;
    font-weight: 600;
    padding-top: 10px;
}
.change-form .row .i-items {
    width: 350px;
    float: left;
}
.change-form .row .i-items input {
    background: #FFFFFF;
    border: 1px solid #979797;
    box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.50);
    height: 30px;
    text-align: center;
    width: 350px;
}
.change-form .row .i-items p{
    font-size: 12px;
    color: red;
}
.change-form .row .i-items .tel-int {
    width: 226px;
    float: left;
}
.change-form .row .i-items .code {
    width: 112px;
    height: 32px;
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0.43px;
    background: #2963CA;
    display: block;
    line-height: 32px;
    float: left;
    margin-left: 10px;
    text-align: center
}
.change-form .row .immediate {
    display: block;
    margin-left: 85px;
    margin-top: 20px;
    width: 350px;
    background: #2963CA;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.57px;
    border: none;
    cursor: pointer;
}
</style>
