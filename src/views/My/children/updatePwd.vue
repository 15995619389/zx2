            <template>
    			<div class="ac-right  member-wp">
                    <div class="mb-model">
                        <div class="meb-tit">
                            <h3><i class="basic-icon"></i>修改密码</h3>
                        </div>
                        <div class="past-wp">
                            <div class="basic-box">
                                <div class="bs-right">
                                    <dl>
                                        <dd><span>当前密码：</span><p><input type="password" placeholder="请输入您正在使用的密码" v-model.trim="oldPwd" @blur="inputBlur(1)"/></p></dd>
                                        <dd><div class="error_tips oldPwdText">{{oldPwdText}}</div></dd>
                                    </dl>
                                    <dl>
                                        <dd><span>新密码：</span><p><input type="password" placeholder="请输入您的新密码" v-model.trim="newPwd" @blur="inputBlur(2)"/></p></dd>
                                        <dd><div class="error_tips newPwdText">{{newPwdText}}</div></dd>
                                    </dl>
                                    <dl>
                                        <dd><span>确认密码：</span><p><input type="password" placeholder="请再次输入新密码" v-model.trim="confirmPwd" @blur="inputBlur(3)"/></p></dd>
                                        <dd><div class="error_tips confirmPwdText">{{confirmPwdText}}</div></dd>
                                    </dl>
                                    <dl>
                                        <label class="lab">安全提醒:</label>
                                        <div class="remind">
                                            请妥善保管密码！<br/>飞天众智平台的工作人员不会以任何理由向您索取密码。
                                        </div>
                                    </dl>
                                    <dl>
                                        <a class="blue" href="javaScript:;" @click="ChangePassword">确认修改</a>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="popupBox" v-show="popShow">
                        <div id="mask"></div>
                        <div class="pop error_pop">
                            <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="successHide">x</a></div>
                            <div class="pop_bd">
                                <div class="hint_storng">
                                    <strong>密码修改成功！</strong>
                                </div>
                                <div class="to">
                                    <router-link to="/evaluation">免费测评</router-link>
                                    <router-link to="/">返回首页</router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </template>

<script>
import {uncompileStr} from '../../../script/encryption'
export default {
    data(){
        return{
            oldPwd:'',
            newPwd:'',
            confirmPwd:'',
            LoginPwd:'',
            popShow:false
        }
    },
    created(){
        this.oldPwdText='请输入您的密码'
        this.newPwdText='请输入您的密码'
        this.confirmPwdText='请输入您的密码'
        let getLoginPwd = localStorage.getItem('pwd')
        this.LoginPwd = uncompileStr(getLoginPwd)
    },
    mounted(){
    },
    methods:{
        inputBlur(num){
            if(num == 1){
                if(this.oldPwd == ''){
                    this.oldPwdText ='请输入密码'
                    $('.oldPwdText').show()
                }else if(this.oldPwd.length<6 || this.oldPwd.length>16){
                    this.oldPwdText = '密码长度须在6-15位之间'
                    $('.oldPwdText').show()
                }else if(this.oldPwd != this.LoginPwd){
                    this.oldPwdText ='原始密码不正确！'
                    $('.oldPwdText').show()
                }else{
                    $('.oldPwdText').hide()
                }
            }else if(num == 2){
                if(this.newPwd == ''){
                    this.newPwdText ='请输入密码'
                    $('.newPwdText').show()
                }else if(this.newPwd.length<6 || this.newPwd.length>16) {
                    this.newPwdText = '密码长度须在6-15位之间'
                    $('.newPwdText').show()
                }else if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(this.newPwd))){
                    this.newPwdText = '密码由英文字母和数字组成，至少6位'
                    $('.newPwdText').show()
                }else{
                    $('.newPwdText').hide()
                }
            }else if(num == 3){
                if(this.confirmPwd == ''){
                    this.confirmPwdText = '请输入密码'
                    $('.confirmPwdText').show()
                }else if(this.confirmPwd.length<6 || this.confirmPwd.length>16){
                    this.confirmPwdText = '密码长度须在6-15位之间'
                    $('.confirmPwdText').show()
                }else if(this.confirmPwd != this.newPwd){
                    this.confirmPwdText = '两次输入的密码不一致！，请重新输入'
                    $('.confirmPwdText').show()
                }else{
                    $('.confirmPwdText').hide()
                }
            }
        },
        Validate(){
            const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
            let isPas = true
            if(this.oldPwd == ''){
                this.oldPwdText ='请输入密码'
                isPas = false
            }else if(this.oldPwd.length<6 || this.oldPwd.length>16){
                this.oldPwdText = '密码长度须在6-15位之间'
                isPas = false
            }else if(!reg.test(this.oldPwd)){
                this.oldPwdText = '密码由英文字母和数字组成，至少6位'
                isPas = false
            }else if(this.oldPwd !=this.LoginPwd){
                this.oldPwdText = '原始密码不正确！'
                isPas = false
            }else if(this.newPwd == ''){
                this.newPwdText ='请输入密码'
                isPas = false
            }else if(this.newPwd.length<6 || this.newPwd.length>16) {
                this.newPwdText = '密码长度须在6-15位之间'
                isPas = false
            }else if(!reg.test(this.newPwd)){
                this.newPwdText = '密码由英文字母和数字组成，至少6位'
                isPas = false
            }else if(this.confirmPwd == ''){
                this.confirmPwdText = '请输入密码'
                isPas = false
            }else if(this.confirmPwd.length<6 || this.confirmPwd.length>16){
                this.confirmPwdText = '密码长度须在6-15位之间'
                isPas = false
            }else if(this.confirmPwd != this.newPwd){
                this.confirmPwdText = '两次输入的密码不一致！，请重新输入'
                isPas = false
            }
            return isPas
        },
        ChangePassword(){
            if(!this.Validate()){
                return false
            }
            this.$http.post(`/account/updatePassword?oldpassword=${this.oldPwd}&password=${this.newPwd}`,{}).then((res)=>{
                this.popShow = true
            }).catch((err)=>{
                console.log(err)
            })
        },
        successHide(){
            this.popShow = false
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
    overflow: hidden;
    border-radius: 50%
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
.basic-box .bs-right {
    width: 100%;
    float: left;
    padding-left: 30px;
    padding-top: 60px;
    box-sizing: border-box;
}
.basic-box .bs-right dl {
    display: block;
    overflow: hidden;
    margin-bottom: 20px;
}
.basic-box .bs-right dl dd {
    float: left;
    width: 50%;
}
.basic-box .bs-right dl dd span {
    color: #2963CA;
    font-weight: 600;
}
.basic-box .bs-right dl dd p{
    float: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.basic-box .bs-right dl dd .buletext {
    margin-left: 20px;
}
.error_tips {
    background: #fef2f2;
    border: #ff7e00 1px solid;
    padding: 5px 10px;
    width: 278px;
    display: inline-block;
    margin-left: 15px;
    border-radius: 2px;
    vertical-align: top;
    font-size: 12px;
}
.bs-right input{
    width: 300px;
    padding: 5px;
    font-size: 15px;
}
.buletext {
    color: #2963CA;
}
.basic-box .blue {
    background: #2963CA;
    color: #fff;
    width: 168px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    margin-left: 40%
}
.lab{
    float: left;
    font-weight: 800;
    font-size: 14px
}
.remind{
    padding-left:10px;
    float: left;
}
.pop_bd .hint_storng {
  padding: 40px 0;
  text-align: center;
  font-size: 22px;
  color: #ff7e00
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
.to{
    text-align: center;
    margin:20px 0 
}
.to a{
    border: 1px solid #ddd;
    font-size:16px ;
    padding: 5px 20px;
    border-radius:8px ;
    margin-right: 20px
}
.to a:hover{
    background: #0D4CA3;
    color: #fff
}
</style>
