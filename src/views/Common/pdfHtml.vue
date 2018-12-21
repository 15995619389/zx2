<template>
    <div class="ceping-form asse-wp" id="pdfDom">
        <h3 class="sctitle">测评结果</h3>
        <p class="score">评估得分：<span class="red">{{reportData.score}}分</span></p>
        <div class="ev-items">
            <p><b>企业名称：</b>{{reportData.companyName}}</p>
            <p v-if="reportData.policy"><b>政策名称：</b>{{reportData.policy.policyName}}</p>
            <p v-if="reportData.policyCategory"><b>评测范围：</b>{{reportData.policyCategory.name}}</p>
            <p><b>评测地域：</b>{{reportData.area}}</p>
            <p><b>评测单位：</b>上海飞天众知科技有限公司</p>
            <p><b>评测时间：</b>{{reportData.testTime | formatDateSeconds}}</p>
        </div>
        <div class="report">
            <h3>报告解读：</h3>
            <p v-html="reportData.comment"></p>
        </div>
        <div class="through-icon" v-if="reportData.isPassed"></div>
        <div class="through-icon Didn" v-else></div>
    </div>
</template>

<script>
import {formatDate } from '../../script/date.js'
export default {

    data(){
        return{
            token:'',
            listModel:[]
        }
    },
    props:['reportData'],
    filters: {
        formatDateSeconds(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd-hh-ss');
        }
    }
}
</script>

<style scoped>
#pdfDom{
    overflow: hidden;
    padding-top: 55px;
    background-color:#fff;
    position:absolute;
    top:-1000em
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
}
.suggested .pj-info a {
    display: inline-block;
    background: #367AF0;
    padding: 3px 15px;
    box-sizing: border-box;
    color: #fff;
    margin-right: 10px;
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
#pdfDom .through-icon{
    position: absolute;
    top: 20px;
    right: 35px;
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
</style>
