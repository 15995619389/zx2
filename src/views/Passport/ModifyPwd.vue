<template>
    <div>
        <searchHeader></searchHeader>
        <div class="wrap">
            <div class="password_find">
                <ul class="step">
                    <li class="cur"><span class="step_item"><i>1</i>输入账号</span></li>
                    <li class="cur"><span class="step_item"><i>2</i>安全认证</span></li>
                    <li><span class="step_item"><i>3</i>设置密码</span></li>
                    <li><span class="step_item"><i>4</i>完成</span></li>
                </ul>
                <div class="bd">
                    <div class="from">
                        <div class="row">
                            <label for="">*手机号:</label>
                            <input class="input_txt" name="uTel" id="uTel" type="text" :value="phoneNumber"  readonly="readonly">
                        </div>
                        <div class="row ewm">
                            <label for="">*验证码:</label>
                            <input class="input_txt" maxlength="6" type="text" placeholder="填写验证码" v-model="authCode" @blur='authCodeBlur'>
                            <span class="get_ewm" v-if="sendAuthCode" @click="getAuthCode">获取验证码</span>
                            <span id="SendValCode" v-else class="get_ewm" style="cursor:default">{{auth_time}}秒后重新获取</span>
                            <div class="error_tips" style="display:none;height:20px;line-height:20px;color:red"></div>
                        </div>
                        <div class="row btns_submit">
                            <input type="button" value="下一步" class="submit col_org" @click='next'>
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
            authCode:'',
            sendAuthCode:true,
            auth_time:''
        }
    },
    mounted(){
        this.phone()
    },
    components:{
        searchHeader
    },
    methods:{
        phone(){
            return this.phoneNumber = this.$route.query.phone.substr(0,3)+'****'+this.$route.query.phone.substr(7)
        },
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
        Validate(){
            const reg = /^\d{6}$/
            if(!this.authCode){
                this.SetError('请填写验证码！')
                return false
            }else if(!reg.test(this.authCode)){
                this.SetError('请填写正确的验证码！')
                return false
            }
            this.SetError()
            return true
        },
        getAuthCode(){
            this.sendAuthCode = false;
            this.auth_time = 60;
            let auth_timetimer = setInterval(() => {
                this.auth_time--;
                if (this.auth_time <= 0) {
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
            // 请求验证码
            this.$http.post('/sms_code/register',this.$route.query.phone,{
            headers: {
              "Content-Type": "application/json"
            }
          }).then((res)=>{
              if(res.status == 200 ){
                  this.SetError(res.data)
              }
          }).catch((err)=>{
              console.log(err)
          })

        },
        next(){
            if(!this.Validate()){
               return false
            } 
            this.$router.push({path:'/passport/FindPassword_Step3',query:{phone:this.$route.query.phone}})
        }
    }
}
</script>

<style scoped>
@import '../../style/passPort.css';
</style>
