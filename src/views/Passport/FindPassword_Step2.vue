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
                <div class="bd yz_method">
                    <h4>您正在为账户 {{phoneNumber}} 找回密码，请选择验证方式：</h4>
                    <div class="method_item">
                        <i class="icon_m_tel"></i>
                        <div class="con">
                            <h5>通过手机验证</h5>
                            <p>如果您的手机正常使用，请选择这种方式进行验证</p>
                        </div>
                        <router-link :to="{path:'/passport/ModifyPwd',query:{phone:$route.query.phone}}" class="yz_m_btn">立即验证</router-link>
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
            phoneNumber:''
        }
    },
    computed:{
        
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
        }
    }
}
</script>

<style scoped>
@import '../../style/passPort.css';
</style>
