<template>
    <div class="popupBox" v-show="isShow">
        <div id="mask"></div>
        <div class="pop error_pop">
            <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="declareHide">x</a></div>
            <div class="pop_bd">
                <p>申报已提交，政小二正在快速匹配申报专家，请保持手机畅通。</p>
                <span>(评测功能能助您快速了解企业情况，匹配合适的申报项目)</span>
                <div class="to">
                    <router-link to="/evaluation">免费测评</router-link>
                    <router-link to="/">返回首页</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isShow:false
        }
    },
    methods:{
        declareHide(){
            this.$router.push('/')
        },
        popShow(){
            this.isShow = true
        }
    }
}
</script>

<style scoped>

.pop_bd{
    font-size: 20px;
    color: #000;
    padding:20px  50px;
    
}
.pop_bd p{
    text-indent: 2em;
    color: red;
}
.pop_bd span{
    font-size: 16px
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
