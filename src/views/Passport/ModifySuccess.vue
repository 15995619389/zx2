<template>
    <div>
        <searchHeader></searchHeader>
        <div class="wrap">
            <div class="password_find">
                <ul class="step">
                    <li class="cur"><span class="step_item"><i>1</i>输入账号</span></li>
                    <li class="cur"><span class="step_item"><i>2</i>安全认证</span></li>
                    <li class="cur"><span class="step_item"><i>3</i>设置密码</span></li>
                    <li class="cur"><span class="step_item"><i>4</i>完成</span></li>
                </ul>
                <div class="bd " style="padding:20px 0 50px">
                    <div class="success">
                        <i class="icon_succ"></i>
                        <div class="succ_tip"><strong style="font-size:20px">新密码设置成功</strong>，
                            <strong><router-link to='/login' style="color:#ff9342">直接登录</router-link></strong>&nbsp;&nbsp;|&nbsp;&nbsp;<strong>返回<router-link to="/" style="color:#2963CA">&nbsp;首页</router-link></strong>
                        <span style="color:red">{{time}}</span>s&nbsp;&nbsp;后将前往登录页面！</div>
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
            time:0
        }
    },
    mounted(){
        this.time = 10
        setInterval(this.timer,1000)
    },
    watch: {
        'time':function(newVal,oldVal){
            if(newVal == 0){
                this.$router.push({path:'/login',query:{returnUrl:'/'}})
            }
        }
    },
    components:{
        searchHeader
    },
    methods:{
        timer(){
            this.time--
        }
    }
}
</script>

<style scoped>
@import '../../style/passPort.css';

.icon_succ{
    height: 129px;
    width: 118px;
    display: block;
    margin: 70px auto 35px;
    position: relative;
    background: url('../../images/un_icon.png') no-repeat;
    background-position:-281px -88px 
}
.succ_tip{
    font-size: 20px;
    text-align: center;
    font-weight: 800;
}
.edit_info{
    width: 130px;
    height: 34px;
    border: #cacaca 1px solid;
    display: inline-block;
    margin-right: 15px;
    font: 800 20px/34px microsoft yahei;
    border-radius: 3px;
    background: #0c4ca3;
    border-color: #0c4ca3;
    color: #fff;
}
</style>
