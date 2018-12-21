<template>
    <div class="popupBox" v-show="isDeclareHide">
        <div id="mask"></div>
        <div class="pop error_pop">
            <div class="pop_tit"><a href="javaScript:;" class="a_close" id="domMessage1_close" @click="declareHide">x</a></div>
            <div class="pop_bd recom_hd">
                <h2 class="follow">根据评估结果，推荐申报如下项目：</h2>
                <p class="notie">提示：请勾选要申报的项目！</p>
                <div class="tick-item">
                    <b v-for="(item,index) in projectList" :key="index" >
                        <input type="checkbox" name='project' :value="item.value" :id="item.id" v-model="projectCheckbox">
                        <span>{{item.value}}</span>
                    </b>
                    <p style="font-size:12px;color:red">{{CheckHint}}</p>
                </div>
                <a href="javaScript:;" class="sure" @click="sure">确定</a><a href="javaScript:;" class="canel" @click="declareHide">取消</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            projectCheckModel:{
                isDeclareHide:false,
                projectCheckbox:[],
                projectList:[
                    {
                        value:'高企认定',
                        id:1
                    },
                    {
                        value:'高新技术企业认定',
                        id:2
                    }
                ],
                CheckHint:'',
            }
        }
    },
    methods:{
        declareShow(){
            this.isDeclareHide = true
        },
        declareHide(){
            this.isDeclareHide = false
        },
        projectCheck(){
            let isPas = true
            if(!this.projectCheckbox.length){
                this.CheckHint = '提示：请勾选要申报的项目！'
                isPas = false
            }
            return isPas
        },
        sure(){
            if(!this.projectCheck()){
                return false
            }
            this.CheckHint = ''
            this.isDeclareHide = false
        }
    }
}
</script>

<style>

.pop_bd {
    font-size: 26px;
}
.recom_hd {
    width: 80%;
    margin: 0 auto;
    padding-bottom: 40px;
    overflow: hidden;
}
.follow {
    font-size: 20px;
    color: #14579E;
    letter-spacing: 0.4px;
    font-weight: 600;
    text-align: left;
}
.notie {
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.28px;
    text-align: left;
}
.recom_hd .tick-item {
    width: 100%;
    overflow: hidden;
    margin: 20px 0 30px 0;
}
.recom_hd .tick-item input {
    background: #fff;
    border: 1px solid #979797;
    box-shadow: inset 0 0 1px 0 rgba(0,0,0,0.50);
    width: 18px;
    height: 18px;
}
.tick-item b{
    overflow: hidden;
    display: inline-block;
}
.recom_hd .tick-item input, .recom_hd .tick-item span {
    float: left;
}
.recom_hd .tick-item span {
    background: #367AF0;
    padding: 0 15px;
    height: 23px;
    line-height: 23px;
    color: #fff;
    font-size: 12px;
    margin: 0 20px 0 10px;
}
.sure, .canel {
    width: 170px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    display: inline-block;
    letter-spacing: 0.57px;
    margin-right: 15px;
    float: left;
    text-align: center
}
.sure {
    background: #2963CA;
    border: #2963CA solid 1px;
    color: #fff;
}
.canel {
    border: 1px solid #979797;
    color: #2963CA;
}
</style>
