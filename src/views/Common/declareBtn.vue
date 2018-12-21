<template>
    <button @click="declareBtn">
        立即申报
    </button>
</template>

<script>
export default {
    data(){
        return{
            isLogin:false
        }
    },
    methods:{
        declareBtn(){
            if(this.isLogin = false){
                alert('请先登录！')
            }else{
                this.$router.push({path:''})
            }
        }
    }
}
</script>

<style>

</style>
