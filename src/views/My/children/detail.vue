<template>
            <div class="ac-right  member-wp">
		     <!--报告详情-->
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="report-icon"></i>报告详情</h3>
					</div>
					<div class="tip-list past-wp">
						<table class="post-table">
							<thead>
							<tr>
							<td>业务评估</td>
							<td>评估分数</td>
							<td>评估结果</td>
							<td>评估时间</td>
							<td style="width: 120px;">公司名称</td>
							<td>联系人</td>
							<td>联系方式</td>
							<td style="width: 110px;">推荐申报业务</td>
							<td>状态</td>
							<td>申报业务</td>
							<td>平台建议</td>
							</tr>
							</thead>
							<tbody>
							<tr>
								<td>
                                    <p v-if="reportDataModel.policyCategory">{{reportDataModel.policyCategory.name}}</p>
                                </td>
								<td>{{reportDataModel.score}}</td>
								<td>
                                    <p v-if="reportDataModel.isPassed">通过</p>
                                    <p v-else>未通过</p>
                                </td>
								<td>{{reportDataModel.testTime | formatDate}}</td>
								<td>{{reportDataModel.companyName}}</td>
								<td>{{reportDataModel.contactName}}</td>
								<td>{{reportDataModel.contactPhoneNumber}}</td>
								<td><p v-for='(item,index) in reportDataModel.recommendCategories' :key="index">{{item.name}}</p></td>
								<td><p v-if="reportDataModel.applied">已申报</p> <p v-else>未申报</p></td>
								<td>
                                    <p v-if="reportDataModel.policy">{{reportDataModel.policy.policyName}}</p>
                                </td>
								<td>
                                    <div v-if="reportDataModel.recommendCategories">
                                        <div v-if="reportDataModel.recommendCategories.length>0">
                                            <a href="javaScript:;" v-if="!reportDataModel.applied" class="blbg immed" @click="DeclareShow">立即申报</a>
                                            <a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" v-else class="sid">联系客服</a> 
                                        </div>
                                        <a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" v-else class="sid">联系客服</a> 
                                    </div>
                                </td>
							</tr>
							</tbody>
						</table>
				    </div>
					<div class="score-small">
						<div class="ceping-form asse-wp">
							<h2 class="sctitle">测评结果</h2>
							<p class="score">评估得分：<span class="red">{{reportDataModel.score}}分</span></p>
							<div class="ev-items">
								<p><b>企业名称：</b>{{reportDataModel.companyName}}</p>
								<p v-if="reportDataModel.policy"><b style="float:left">政策名称：</b><span style="display:inline-block;width:79%">{{reportDataModel.policy.policyName}}</span></p>
								<p v-if="reportDataModel.policyCategory"><b>评测范围：</b>{{reportDataModel.policyCategory.name}}</p>
								<p><b>评测地域：</b>{{reportDataModel.area}}</p>
								<p><b>评测单位：</b>上海飞天众知科技有限公司</p>
								<p><b>评测时间：</b>{{reportDataModel.testTime | formatDateSeconds}}</p>
							</div>
							<div class="suggested">
								<h3>根据评估，建议申报项目：</h3>
								<p class="pj-info">
									<span v-if="reportDataModel.recommendCategories">
                                        <a href="javaScript:;" :key="index" v-if="reportDataModel.recommendCategories.length>0" v-for='(item,index) in reportDataModel.recommendCategories'>{{item.name}}</a>	
                                    </span>
                                    <span v-else>暂无推荐项目！</span>								
								</p>
							</div>
							<div class="report">
								<h3>报告解读</h3>
								<p v-html="reportDataModel.comment"></p>
							</div>
							<div class="declare" style="border: 0">
								<div class="down-btn">
									<a href="javaScript:;" @click="getPdf()"><i class="dowd"></i>下载报告</a>
								</div>
							</div>
							<div class="through-icon" v-if="reportDataModel.isPassed"></div>
                            <div class="through-icon Didn" v-else></div>
						</div>
                        <PdfHtml :report-data='reportDataModel'></PdfHtml>
					</div>
			    </div>
                <!-- 勾选申报项目 -->
                <template>
                    <div class="popupBox" v-show="projectCheckModel.isDeclareHide">
                        <div id="mask"></div>
                        <div class="pop error_pop">
                            <div class="pop_tit"><a href="javaScript:;" class="a_close" id="domMessage1_close" @click="declareHide">x</a></div>
                            <div class="pop_bd recom_hd">
                                <h2 class="follow">根据评估结果，推荐申报如下项目：</h2>
                                <p class="notie">提示：请勾选要申报的项目！</p>
                                <div class="tick-item">
                                    <b v-for="(item,index) in reportDataModel.recommendCategories" :key="index" >
                                        <input type="checkbox" name='project' :value="item.id" :id="item.id" v-model="projectCheckModel.projectCheckbox">
                                        <span>{{item.name}}</span>
                                    </b>
                                    <p style="font-size:12px;color:red">{{projectCheckModel.CheckHint}}</p>
                                </div>
                                <a href="javaScript:;" class="sure" @click="projectSure">确定</a><a href="javaScript:;" class="canel" @click="declareHide">取消</a>
                            </div>
                        </div>
                    </div>    
                </template>
                <!-- 申报申请成功 -->
                <template>
                    <div class="popupBox" v-show="declareSuccess">
                        <div id="mask"></div>
                        <div class="pop error_pop">
                            <div class="pop_tit"><a href="javaScript:;" class="a_close" id="domMessage1_close" ></a></div>
                            <div class="pop_bd recom_hd" style="padding-top:20px">
                                <i class="sub"></i>
                                <!-- <img src="../../../images/passwored_ok.png" class="SuccessImg"/> -->
                                <h3 class="declareSuccess">申报申请成功</h3>
                                <p class="Success_p">感谢您对政小二的信任和支持，我们会在一个工作日内与您取得联系，请保持通讯畅通！</p>
                                <span class="time_span">{{time}}s后将跳转到<a href="javaScript:;">"评测管理"</a>页面</span>
                            </div>
                        </div>
                    </div>
                </template>
		    </div>    
</template>

<script>
import PdfHtml from '../../Common/pdfHtml'
import {formatDate } from '../../../script/date.js'
export default {
    data(){
        return{
            time:0,
            token:'',
            declareSuccess:false,
            reportDataModel:[],
            projectCheckModel:{
                isDeclareHide:false,
                projectCheckbox:[],
                CheckHint:'',
            },
            htmlTitle: '',
            declareShow:false
        }
    },
    created(){
        this.token = localStorage.getItem('token')
    },
    mounted(){
        this.init()
        this.time = 5;
        setInterval(this.timer,1000)
    },
    watch: {
        'time':function(newVal,oldVal){
            if(newVal == 0){
                this.$router.push({path:'/my/appraisa'})
            }
        }
    },
    components:{
        PdfHtml
    },
    methods:{
        init(){
            this.$http.get('/policytestreports/'+this.$route.params.id,{headers:{
                Authorization: "Bearer " + this.token
            }}).then((res)=>{
                this.reportDataModel = res.data
                if(res.data.policyCategory){
                    this.htmlTitle = res.data.policyCategory.name
                }
            }).catch((err)=>{
                console.log(err)
            })
        },
        timer(){
            if(this.declareSuccess == true){
                this.time--
            }
        },
        DeclareShow(){
            this.projectCheckModel.isDeclareHide = true
        },
        declareHide(){
            this.projectCheckModel.isDeclareHide = false
        },
        projectCheck(){
            let isPas = true
            const model = this.projectCheckModel
            if(!model.projectCheckbox.length){
                model.CheckHint = '提示：请勾选要申报的项目！'
                isPas = false
            }
            return isPas
        },
        projectSure(){
            const model = this.projectCheckModel
            if(!this.projectCheck()){
                return false
            }
            model.CheckHint = ''
            this.$http.post(`/policytestreports/${this.$route.params.id}/apply`,{
                policyTestReportId:this.$route.params.id,
                categories:model.projectCheckbox
            },{
                headers:{
                    Authorization: "Bearer " + this.token
                }
            }).then(res=>{
                // console.log(res)
                if(res.status == 200){
                    model.isDeclareHide = false
                    this.declareSuccess = true
                }
            }).catch(err=>{
                console.log(err)
            })
            
           
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        },
        formatDateSeconds(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>

<style scoped>
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
.member-wp .mb-model .past-wp {
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
    padding: 10px;
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
    width: 600px;
    margin: 50px auto;
    margin-top: 10px;
    background: #F8F8F8;
    padding: 50px 20px 80px 50px;
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
    width: 63%
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
    margin-bottom: 10px;
    cursor:default;
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
    background: url('../../../images/combg.png');
    display: block;
    float: left;
}
.down-btn .dowd {
    height: 22px;
    width: 22px;
    background-position: -375px 0;
}
.through-icon {
    position: absolute;
    top: 20px;
    right: -30px;
    background: url('../../../images/combg.png');
    height: 238px;
    width: 238px;
    background-position: -4083px 0;
    -webkit-transform: rotate(25deg);
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
}
/*-------弹窗----*/

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
    display: block;
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

/**/ 
.declareSuccess{
    font-size: 26px;
    text-align: center;
    color: #FD6600;
}
.sub{
    display: block;
    background: url(/static/img/combg.d31ec37.png)no-repeat;
    height: 116px;
    width: 116px;
    background-position: -2707px 0;
    margin: 0 auto;
}
/* .SuccessImg{
    animation: myfirst 1s infinite;
    margin-left: 40%;
    width: 100px;
    height: 100px;
}
@keyframes myfirst {
    0% {
        transform: translate(0px, 0px);
    }
    50% {
        transform: translate(0px, -10px);
    }
    100% {
        transform: translate(0px, 0px);
    }
} */
.Success_p{
    font-size: 16px;
    text-align: center;
    margin: 5px 0;
    color: #14579E;
    font-weight: 700
}
.time_span{
    display:block;
    text-align: center;
    font-size: 16px;
}
.time_span a{
    color: #2963CA
}
.Didn {
    height: 238px;
    width: 238px;
    background-position: -3845px 0;
}
</style>
