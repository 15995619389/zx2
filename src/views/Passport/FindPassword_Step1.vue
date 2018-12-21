<template>
    <div>
        <searchHeader></searchHeader>
        <div class="wrap">
            <div class="password_find">
                <ul class="step">
                    <li class="cur"><span class="step_item"><i>1</i>输入账号</span></li>
                    <li><span class="step_item"><i>2</i>安全认证</span></li>
                    <li><span class="step_item"><i>3</i>设置密码</span></li>
                    <li><span class="step_item"><i>4</i>完成</span></li>
                </ul>
                <div class="bd">
                    <div class="form">
                        <div class="row">
                            <label for="">账号:</label>
                            <input class="input_txt" id="username" name="username" v-model="phoneNumber" type="text" maxlength="11" placeholder="请输入您的账号" @blur='phoneBlur'>
                            <div class="error_tips" style="display:none"></div>
                        </div>
                        <div class="row yz_bar">
                            <label for="" style="line-height:42px">验证:</label>
                            <div id="dom-id" class="nc-container"></div>
                            <p class="error_code" v-show="codeErr" style="color:red;height:20px;line-height:20px;margin-top:10px">请通过滑动验证!</p>
                        </div>
                        <div class="row btns_submit">
                            <input type="submit" value="下一步" id="btn_next" class="submit col_org" title="请先通过滑动验证后进行下一步" @click="step1">
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
            csessionidCode:'',
            phoneNumber:'',
            codeErr:false
        }
    },
    components:{
        searchHeader
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
                if(_self.csessionidCode.length<=0){
                    _self.codeErr = true
                }else{
                    _self.codeErr = false
                }
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
    methods:{
        phoneBlur(){
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
            const reg = 11 && /^1(3|4|5|6|7|8)\d{9}$/; //手机号正则验证
            let isPas = true;
            if(!this.phoneNumber){
                this.SetError('请填写手机号！')
                return false
            }else if(!reg.test(this.phoneNumber)){
                this.SetError('请填写正确的手机号！')
                return false
            }
            this.SetError("");
            return true;
        },
        step1(){
            if(!this.Validate()){
                return false
            }
            if(!this.csessionidCode){
                this.codeErr = true
                return false
            }
            this.$router.push({path:'/PassPort/FindPassword_Step2',query:{phone:this.phoneNumber}})
        }
    }
}
</script>

<style scoped>
    @import '../../style/passPort.css';
    .error_tips{
        height: 20px;
        line-height: 20px;
        color: red
    }
</style>