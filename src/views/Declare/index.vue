<template>
    <div>
        <searchHeader></searchHeader>
        <Banner></Banner>
        <div class="c-container">
            <div class="ceping-wrap">
                <form>
                    <div class="ceping-form">
                        <div class="check-de">
                            <h1>勾选申报项目</h1>
                            <h2>申报范围</h2>
                            <div class="check-fm">
                                <div v-for="(item,index) in reportDataModel.recommendCategories" :key="index">
                                    <input type="checkbox" name="declare" v-model="declareCkeckbox" :value="item.id" style="cursor: pointer"><span>{{item.name}}</span>
                                </div>
                                <p class="declareHint">{{declareHint}}</p>
                                <a href="javaScript:;" class="immediate" @click="immediate">立即申报</a>
                            </div>
                        </div>
                        <div class="results_cp">
                            <h2 class="nomargin">测评结果</h2>
                            <p class="score score_1">评估得分：<span class="red">{{reportDataModel.score}}分</span></p>
                            <div class="ev-items">
                                <p><b>企业名称：</b>{{reportDataModel.companyName}}</p>
                                <p v-if="reportDataModel.policy"><b>政策名称：</b>{{reportDataModel.policy.policyName}}</p>
                                <p v-if="reportDataModel.policyCategory"><b>评测范围：</b>{{reportDataModel.policyCategory.name}}</p>
                                <p><b>评测地域：</b>{{reportDataModel.area}}</p>
                                <p><b>评测单位：</b>上海飞天众知科技有限公司</p>
                                <p><b>评测时间：</b>{{reportDataModel.testTime | formatDate}}</p>
                            </div>
                            <div class="report">
                                    <h3>报告解读</h3>
                                    <p v-html="reportDataModel.comment"></p>
                            </div>
                            <div class="declare" style="border-bottom: 0;padding-bottom: 0">
                                    <div class="down-btn">
                                        <a href="javaScript:;" @click="getPdf()"><i class="dowd"></i>下载报告</a>
                                    </div>
                            </div>
                            <div class="suggested">
                                <h3>根据评估，建议申报项目：</h3>
                                <div v-if="reportDataModel.recommendCategories">
                                    <p class="pj-info" v-if="reportDataModel.recommendCategories.length>0">
                                        <span>
                                            <a href="javaScript:;" style="cursor: default;" v-for="(item,index) in reportDataModel.recommendCategories" :key="index">{{item.name}}<b class="red"></b></a>
                                        </span>
                                    </p>
                                    <div class="pj-info" v-else><h3  style="color:red">暂无推荐政策</h3></div>
                                </div>
                                <div class="pj-info" v-else><h3  style="color:red">暂无推荐政策</h3></div>
                            </div>
                            <!-- 评测通过与否 -->
                            <div class="through-icon" v-if="reportDataModel.isPassed"></div>
                            <div class="through-icon Didn" v-else></div>
                        </div>
                    </div>
                </form>
                <pdf-html :report-data='reportDataModel'></pdf-html>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from '../Search/search-header'
import Banner from '../Common/banner'
import PdfHtml from '../Common/pdfHtml'
import Hint from './hint'
import {formatDate } from '../../script/date.js'
export default {
    data(){
        return{
            resultModel:{
                score:65,
                enterpriseName:'企业属于国家支持的高新技术领域',
                through:false,
            },
            reportDataModel:{},
            token:'',
            htmlTitle: '',
            declareHint:'',
            declareHintShow:false,
            declareCkeckbox:[]
        }
    },
    components:{
        searchHeader,
        Banner,
        Hint,
        PdfHtml
    },
    created(){
        this.token = localStorage.getItem('token')
    },
    mounted(){
       this.init() 
    },
    methods:{
        init(){
            this.$http.get('/policytestreports/'+this.$route.query.id).then(res=>{
                this.reportDataModel = res.data
                this.htmlTitle = res.data.policy.policyName
                // console.log(res.data)
            }).catch(err=>{
                console.log(err)
            })
        },
        Validate(){
            let isPas = true;
            
        },
        immediate(){
            if(!this.declareCkeckbox.length){
                this.declareHint = '请选择申报范围'
                this.declareHintShow = true
            }else{
                this.$http.post(`/policytestreports/${this.$route.query.id}/apply`,{
                    policyTestReportId:this.$route.query.id,
                    categories:this.declareCkeckbox
                    }).then(res=>{
                        // console.log(res)
                        if(res.status == 200){
                            this.declareHintShow = false
                            this.$router.push('/hint')
                        }
                }).catch(err=>{
                    console.log(err)
                })
                // console.log(this.declareCkeckbox)
                
            }
            
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>

<style scoped>
.declareHint{
    color: red;
    font-size: 14px;
    padding-top:10px 
}
.check-de {
    width: 80%;
}
.check-de h1 {
    font-size: 25px;
    color: #14579E;
    letter-spacing: 0.5px;
    text-align: center;
    width: 200px;
    margin: 0 auto;
}
.check-de h1:before {
    display: block;
    float: left;
    content: "";
    background: url(../../images/combg.png)no-repeat;
    height: 36px;
    width: 34px;
    background-position: -652px 0;
}
.ceping-form h2 {
    font-size: 18px;
    color: #14579E;
    margin-bottom: 30px;
    font-weight: 800;
}
.ceping-form h2:before {
    content: "";
    width: 2px;
    height: 35px;
    background: #2963CA;
    display: block;
    margin-right: 20px;
    margin-left: -30px;
    float: left;
}
.check-de .check-fm {
    width: 100%;
    overflow: hidden;
    border-bottom: #979797 dashed 1px;
    padding-bottom: 50px;
    margin-bottom: 30px;
}
.check-de .check-fm div {
    display: inline-block;
    margin-right: 15px;
    margin-bottom: 10px
}
.check-de .check-fm div input {
    float: left;
    display: block;
    margin-top: 5px;
    width: 18px;
    height: 18px;
    margin-right: 5px;
}
.check-de .check-fm div span {
    background: #367AF0;
    padding: 5px 15px;
    box-sizing: border-box;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.43px;
}
.immediate {
    display: block;
    margin: 50px auto 0 70px;
    background: #2963CA;
    width: 360px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.57px;
}

.results_cp {
    position: relative;
}
.ceping-wrap {
    background: #fff;
    width: 1170px;
    margin-left: auto;
    margin-right: auto;
    /* z-index: 333; */
    position: relative;
    top: -100px;
    overflow: hidden;
}
.member-wp {
    padding: 0;
    background: none;
}
.member-wp .report-icon {
    background-position: -1082px 0;
}
.post-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #979797;
}
.member-wp .past-wp {
    padding: 20px 10px;
    box-sizing: border-box;
}
.post-table td {
    height: 20px;
    border: 1px solid #979797;
    text-align: center;
}
.post-table thead tr td {
    color: #2963CA;
    font-weight: 600;
    height: 35px;
    font-size: 13px;
}
.post-table tbody tr td {
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 12px;
}
.blbg {
    background: #2963CA;
    border: 1px solid #2963CA;
    color: #fff;
}
.sid {
    border: 1px solid #979797;
    background: #fff;
    color: #2963CA;
}
.mb-model .post-table tbody tr td .blbg,.mb-model .post-table tbody tr td .sid{
   width: 65px;
    display: block;
    margin: 0 auto;
    margin-bottom: 10px; 
}
.ceping-form {
    width: 760px;
    margin: 50px auto;
    background: #F8F8F8;
    padding: 50px 20px 80px 100px;
    box-sizing: border-box;
    position: relative;
}
.ceping-form h2 {
    font-size: 18px;
    color: #14579E;
    margin-bottom: 30px;
    font-weight: 800;
}
.ceping-form .sctitle {
    font-size: 25px;
    color: #14579E;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
}
.score {
    font-size: 25px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 26px;
}
.red {
    color: #db0000;
}
.ev-items {
    margin-top: 20px;
    font-size: 14px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 26px;
}
.suggested {
    margin-top: 30px;
}
.suggested h3 {
    font-size: 16px;
    color: #14579E;
    letter-spacing: 0;
    line-height: 26px;
}
.suggested .pj-info {
    width: 100%;
    overflow: hidden;
    margin-top: 15px;
    margin-bottom: 10px
}
.suggested .pj-info a {
    display: inline-block;
    background: #367AF0;
    padding: 3px 15px;
    box-sizing: border-box;
    color: #fff;
    margin-bottom: 10px;
    margin-right: 15px
}
.report {
    width: 75%;
    margin-top: 30px;
}
.report h3 {
    font-size: 16px;
    color: #14579E;
    letter-spacing: 0;
    line-height: 26px;
    margin-bottom: 10px;
}
.report p {
    font-size: 12px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 24px;
}
.ceping-form .declare {
    width: 80%;
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    line-height: 26px;
    position: relative;
    margin-top: 50px;
    border-bottom: #ddd dashed 1px;
    padding-bottom: 30px;
}
.down-btn {
    position: absolute;
    right: 0;
    top: -20px;
}
.down-btn a {
    display: block;
    font-size: 14px;
    color: #367AF0;
    letter-spacing: 0;
    text-decoration: underline;
}
.down-btn i {
    background: url('../../images/combg.png');
    display: block;
    float: left;
}
.down-btn .dowd {
    height: 22px;
    width: 22px;
    background-position: -375px 0;
}
.down-btn .conct {
    height: 22px;
    width: 22px;
    background-position: -419px 0;
}
.through-icon {
    position: absolute;
    top: 20px;
    right: -30px;
    background: url('../../images/combg.png');
    height: 238px;
    width: 238px;
    background-position: -4083px 0;
    -webkit-transform: rotate(25deg);
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
}
.Didn{
    height: 238px;
    width: 238px;
    background-position: -3845px 0; 
}
.ceping-form h2:before {
    content: "";
    width: 2px;
    height: 35px;
    background: #2963CA;
    display: block;
    margin-right: 20px;
    margin-left: -30px;
    float: left;
}
.immediate {
    display: block;
    margin: 50px auto 0 70px;
    background: #2963CA;
    width: 360px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.57px;
}
.immediate:hover{
    color: #333
}
.report-wp {
    padding: 30px 10px;
    box-sizing: border-box;
}
</style>
