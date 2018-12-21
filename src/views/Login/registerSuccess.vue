<template>
    <div>
        <v-header></v-header>
        <div class="wrap">
            <div class="success">
                <i class="icon_succ"></i>
                <div class="succ_tip">恭喜您注册成功，&nbsp;&nbsp;<span style="color:red">{{time}}</span>s&nbsp;&nbsp;后将前往登录页面！</div>
            </div>
        </div>
    </div>
</template>

<script>
import header from '../Search/search-header'
export default {
    data(){
        return{
            time:0
        }
    },
    mounted(){
        this.time = 5
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
        'v-header':header
    },
    methods:{
        timer(){
            this.time--
        }
    }
}
</script>

<style scoped>
.wrap {
    background: #f1f1f1;
    padding: 20px 0 30px 0;
}
.success{
    margin: 0 auto;
    width: 500px;
    height: 400px;
    padding: 50px 300px;
    border: #cacaca 1px solid;
    background: #fff;
}
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
