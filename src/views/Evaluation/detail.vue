            <template>
				    <div class="">
                        <searchHeader></searchHeader>
                        <Banner></Banner>
                        <div class="c-container">
                            <div class="ceping-wrap">
                                <div class="flow-nav">
                                     <ul>
                                        <li><i class="basci"></i><span class="org">基本信息</span><i class="org-line"></i></li>
                                        <li><i class="finance_0"></i><span class="org">企业财务状况</span><i class="org-line"></i></li>
                                        <li><i class="equity_O"></i><span class="org">知识产权状况</span><i class="org-line"></i></li>
                                        <li><i class="bot_0"></i><span class="org">企业建设状况</span></li>
                                    </ul>
                                </div>
                           
                                    <div class="ceping-form asse-wp">
                                        <h2 class="sctitle">测评结果</h2>
                                        <p class="score">评估得分：<span class="red">{{reportDataModel.score}}分</span></p>
                                        <div class="ev-items">
                                            <p><b>企业名称：</b>{{reportDataModel.companyName}}</p>
                                            <p v-if="reportDataModel.policy"><b>政策名称：</b>{{reportDataModel.policy.policyName}}</p>
                                            <p v-if="reportDataModel.policyCategory"><b>评测范围：</b>{{reportDataModel.policyCategory.name}}</p>
                                            <p><b>评测地域：</b>{{reportDataModel.area}}</p>
                                            <p><b>评测单位：</b>上海飞天众知科技有限公司</p>
                                            <p><b>评测时间：</b>{{reportDataModel.testTime | formatDate}}</p>
                                        </div>
                                        <div class="suggested">
                                            <h3>根据评估，建议申报项目：</h3>
                                            <div v-if="reportDataModel.recommendCategories">
                                                <p class="pj-info" v-if="reportDataModel.recommendCategories.length>0">
                                                    <span>
                                                        <a href="javaScript:;" v-for="(item,index) in reportDataModel.recommendCategories" :key="index">{{item.name}}<b class="red"></b></a>
                                                    </span>
                                                </p>
                                                <div class="pj-info" v-else><h3  style="color:red">暂无推荐政策</h3></div>
                                            </div>
                                            
                                        </div>
                                        <div class="report">
                                            <h3>报告解读：</h3>
                                            <p v-html="reportDataModel.comment"></p>
                                        </div>
                                        <div class="declare">
                                            政小二为您提供专业的项目申报服务，帮您快速高效的申报成功！
                                            <div class="down-btn">
                                                <a href="javaScript:;" @click="getPdfHtml"><i class="dowd"></i>下载报告</a>
                                                <!-- <a href="#"><i class="conct"></i>联系客服</a> -->
                                            </div>
                                        </div>
                                        <div v-if="reportDataModel.recommendCategories">
                                            <router-link :to="{path:'/declare',query:{id:this.$route.query.id}}" class="immediate" v-if="reportDataModel.recommendCategories.length>0">立即申报</router-link>
                                            <a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" class="immediate" v-else>联系客服</a>
                                        </div>
                                        <div class="through-icon" v-if="reportDataModel.isPassed"></div>
                                        <div class="through-icon Didn" v-else></div>
                                    </div>
                                    <PdfHtml :report-data='reportDataModel'></PdfHtml>
                            </div>
                        </div>
			        </div> 
            </template>

<script>
import searchHeader from '../Search/search-header'
import Banner from '../Common/banner'
import PdfHtml from '../Common/pdfHtml'
import {formatDate } from '../../script/date.js'
export default {
    data(){
        return{
            reportDataModel:{},
            token:'',
            isLogin:true,
            htmlTitle: '',
            reportId:''
        }
    },
    components:{
        searchHeader,
        Banner,
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
            this.$http.get('/policytestreports/'+this.$route.query.id,{
                headers: {
                    Authorization: "Bearer " + this.token
                }
            }).then(res=>{
                this.reportDataModel = res.data
                if(res.data.policyCategory){
                    this.htmlTitle = res.data.policyCategory.name
                }
            }).catch(err=>{
                console.log(err)
            })
        },
        getPdfHtml(){
            this.getPdf()
        },
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
#pdfDom{
    overflow: hidden;
    padding-top: 55px;
    background-color:#fff;
    position:absolute;
    top:-1000em
}
.datail_ul{
    overflow: hidden;
    width: 100%;

}
.datail_ul li{
    width: 40%;
    float: left;
    padding: 5px 0;
    text-align: left;
    padding-left: 10%
}





.c-container .ceping-wrap .flow-nav {
    width: 100%;
    border-bottom: 1px solid #979797;
    padding: 20px 20px 20px 40px;
    box-sizing: border-box;
}
.c-container .ceping-wrap .flow-nav li {
    display: inline-block;
}
.c-container .ceping-wrap .flow-nav li span {
    float: left;
    display: block;
    font-size: 20px;
    letter-spacing: 0.4px;
    font-weight: 600;
    line-height: 50px;
    margin: 0 10px;
}
.org {
    color: #FA6602;
}
.c-container .ceping-wrap .flow-nav i {
    background: url(../../images/combg.png);
    display: block;
    float: left;
}
.c-container .ceping-wrap .flow-nav .basci {
    height: 56px;
    width: 56px;
    background-position: -1719px 0;
}
.c-container .ceping-wrap .flow-nav .org-line {
    height: 10px;
    width: 106px;
    background-position: -2495px 0;
    margin-top: 20px;
}
.c-container .ceping-wrap .flow-nav .finance_0 {
    height: 56px;
    width: 56px;
    background-position: -1999px 0;
}
.c-container .ceping-wrap .flow-nav .equity_O {
    height: 56px;
    width: 56px;
    background-position: -1607px 0;
}
.c-container .ceping-wrap .flow-nav .bot_0 {
    height: 56px;
    width: 56px;
    background-position: -1775px 0;
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
    margin-bottom: 10px;
    cursor: default
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
    top: 0;
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
