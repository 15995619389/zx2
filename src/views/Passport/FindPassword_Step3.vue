<template>
    <div>
        <searchHeader></searchHeader>
        <div class="wrap">
            <div class="password_find">
                <ul class="step">
                    <li class="cur"><span class="step_item"><i>1</i>输入账号</span></li>
                    <li class="cur"><span class="step_item"><i>2</i>安全认证</span></li>
                    <li class="cur"><span class="step_item"><i>3</i>设置密码</span></li>
                    <li><span class="step_item"><i>4</i>完成</span></li>
                </ul>
                <div class="bd">
                    <div class="from">
                        <div class="row">
                            <label for="">新密码:</label>
                            <input class="input_txt" name="uTel" id="uTel" type="password" v-model="newPassWord" @blur='passWordBlur'>
                            <div class="error_tips" style="display:none;height:20px;line-height:20px;color:red"></div>
                        </div>
                        <div class="row ewm">
                            <label for="">确认密码:</label>
                            <input class="input_txt"  type="password"  v-model="confirmPsaaWord" @blur='confirmPassBlur'>
                            <div class="error_confirm" style="display:none;height:20px;line-height:20px;color:red"></div>
                        </div>
                        <div class="row btns_submit">
                            <input type="button" value="确定" class="submit col_org" @click='next'>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
export default {
    data(){
        return{
            phoneNumber:'',
            newPassWord:'',
            confirmPsaaWord:''
        }
    },
    mounted(){
      this.phoneNumber = this.$route.query.phone  
    },
    components:{
        searchHeader
    },
    methods:{
        authCodeBlur(){
            this.Validate()
        },
        SetError(msg) {
            if (msg == "") {
                $(".error_tips").hide();
            } else {
                $(".error_tips").show();
            }
            $(".error_tips").html(msg);
        },
        confirmSetError(msg){
            if (msg == "") {
                $(".error_confirm").hide();
            } else {
                $(".error_confirm").show();
            }
            $(".error_confirm").html(msg);
        },
        confirmPassBlur(){
            if(!this.confirmPsaaWord){
                this.confirmSetError('密码不能为空！')
                return false
            }else if(this.newPassWord != this.confirmPsaaWord){
                this.confirmSetError('密码不一致，请重新输入！')
                return false
            }
            this.confirmSetError('')
            return true
        },
        passWordBlur(){
            const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9\\W]{2,}$/;
            if(!this.newPassWord){
                this.SetError('密码不能为空！')
                return false
            }else if(!regPwd.test(this.newPassWord)){
                this.SetError('请设置至少两种字符组合！')
                return false
            }
            this.SetError('')
            return true
        },
        Validate(){
            const regPwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9\\W]{2,}$/;
            if(!this.newPassWord){
                this.SetError('密码不能为空！')
                return false
            }else if(!regPwd.test(this.newPassWord)){
                this.SetError('请设置至少两种字符组合！')
                return false
            }else if(!this.confirmPsaaWord){
                this.confirmSetError('密码不能为空！')
                return false
            }else if(this.newPassWord != this.confirmPsaaWord){
                this.confirmSetError('密码不一致，请重新输入！')
                return false
            }
            this.SetError('')
            this.confirmSetError('')
            return true
        },
        next(){
            if(!this.Validate()){
               return false
            } 
            // this.$http.post('account')
            this.$router.push('/passport/ModifySuccess')
        }
    }
}
</script>

<style scoped>
@import '../../style/passPort.css';
</style>
