<template>
            <div class="ac-right  member-wp">
				<!--测评提醒-->
				<div class="mb-model">
                    <div class="meb-tit">
                        <h3><i class="report-icon"></i>最新测评报告</h3>
                    </div>
					<div class="tip-list score-wp" v-for="(item,index) in newDetailModel" :key="index">
						<div class="score-text" style="width:45%">
							<h2>评估结果</h2>
							<p class="scr-number">评估得分：<span class="red">{{item.score}}分</span></p>
							<p><b>企业名称：</b>{{item.companyName}}</p>
							<p v-if="item.policy"><b style="float:left">政策名称：</b><span style="display:inline-block;margin-right:0;width:75%">{{item.policy}}</span></p>
							<p><b>评测范围：</b>{{item.policyCategory}}</p>
							<p><b>评测地域：</b>{{item.area}}</p>
							<p><b>评测单位：</b>上海飞天众知科技有限公司</p>
							<p><b>评测时间：</b>{{item.testTime | formatDate}}</p>
						</div>
						<div class="scroe-icon" v-if="item.isPassed"></div>
                        <div class="Didn" v-else></div>
						<div class="scroe-btns">
                            <router-link :to="{path:'/my/appraisa/detail/'+item.id}" class="blbg">查看报告详情</router-link>
							<a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" class="sid">联系客服</a>
						</div>
					</div>
				</div>
		     <!--往期测评报告-->
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="period-icon"></i>往期测评报告</h3>
					</div>
					<div class="tip-list past-wp">
						<table class="post-table">
							<thead>
							<tr>
							<td>编号</td>
							<td>政策名称</td>
							<td>测评范围</td>
							<td>测评分数</td>
							<td>公司名称</td>
							<td>联系人</td>
							<td>联系方式</td>
							<td>测评结果</td>
							<td>测评时间</td>
							<td>是否下单</td>
							<td>操作</td>
							</tr>
							</thead>
							<tbody>
                                <tr v-for="(item,index) in listModel.items" :key="index">
                                    <td>{{index+1}}</td>
                                    <td style="width:150px">
                                        <router-link :to="{path:'/my/appraisa/detail/'+item.id}" v-if="item.policy">{{item.policy}}</router-link>
                                        <!-- <router-link :to="{path:'/my/appraisa/detail/'+item.id}" v-else>{{item.policyCategory}}</router-link> -->
                                    </td>
                                    <td>{{item.policyCategory}}</td>
                                    <td>{{item.score}}</td>
                                    <td style="width:150px">{{item.companyName}}</td>
                                    <td>{{item.contactName}}</td>
                                    <td>{{item.contactNumber}}</td>
                                    <td>
                                        <b v-if="item.isPassed">通过</b>
                                        <b v-else>未通过</b>
                                    </td>
                                    <td>{{item.testTime | formatDateList}}</td>
                                    <td v-if="item.isPassed">
                                        <b v-if="item.applied">是</b>
                                        <b v-else>否</b>
                                    </td>
                                    <td v-else>/</td>
                                    <td v-if="item.isPassed">
                                        <a href="javascript:;" class="blbg" v-if="item.applied">/</a> 
                                        <router-link :to="{path:'/my/appraisa/detail/'+item.id}" class="blbg" v-else>立即申报</router-link>
                                    </td>
                                    <td v-else>
                                        <a href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" class="blbg">联系客服</a> 
                                    </td>
                                </tr>
							</tbody>
						</table>
                         <v-pagination :total="total" :size="size" :page="page" :changge="pageFn" style="margin-top:50px"></v-pagination>
                </div>
			</div>
		</div>    
</template>

<script>
import pagination from '../../Common/pageination'
import {formatDate } from '../../../script/date.js'
export default {
    data(){
        return{
            listModel:[],
            newDetailModel:[],
            total:'',//总个数
            size:10,//每页显示个数
            page:1,//当前页,
            PageSkipCount:'',
        }
    },
    created(){
       
    },
    mounted(){
        this.init()
    },
    components:{
        'v-pagination':pagination
    },
    methods:{
        // 页面点击切换执行
        pageFn(val){
            this.page = val
            this.PageSkipCount = (val*10)-10
            this.init()
        },
        init(){
            var params={
                SkipCount:this.PageSkipCount,
                MaxResultCount:10
            }
            this.$http.get('/policytestreports',{params}).then((res)=>{
                this.total = res.data.totalCount
                this.listModel = res.data
                this.newDetailModel = res.data.items.slice(0,1)
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        },
        formatDateList(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>

<style scoped>
.Didn{
    display: inline-block;
    background: url('../../../images/combg.png');
    height: 238px;
    width: 238px;
    background-position: -3845px 0;
    -webkit-transform: rotate(25deg);
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
    margin: 0 10px 0 30px;
}
.member-wp {
    padding: 0;
    background: none;
}
.member-wp .report-icon {
    background-position: -1082px 0;
}
.member-wp .mb-model .score-wp {
    width: 100%;
    overflow: hidden;
    padding: 20px;
    box-sizing: border-box;
}
.score-wp div {
    float: left;
}
.score-wp .score-text h2 {
    font-size: 20px;
    color: #14579E;
    letter-spacing: 0.4px;
    font-weight: bold;
}
.member-wp .mb-model .tip-list span {
    margin-right: 20px;
}
.score-wp .score-text .scr-number {
    font-size: 25px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 26px;
    margin: 5px 0 20px 0;
}
.scr-number .red{
    color:red;
}
.score-wp .score-text p {
    font-size: 14px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 26px;
}


.score-wp .scroe-icon {
    display: inline-block;
    background: url('../../../images/combg.png');
    height: 238px;
    width: 238px;
    background-position: -4083px 0;
    -webkit-transform: rotate(25deg);
    -moz-transform: rotate(25deg);
    transform: rotate(25deg);
    margin: 0 10px 0 60px;
}
.score-wp .scroe-btns {
    text-align: center;
    float: right;
    margin-right: 20px;
    padding-top: 50px;
    box-sizing: border-box;
}
.score-wp .scroe-btns a {
    display: block;
    height: 31px;
    line-height: 31px;
    width: 110px;
    margin: 0 auto;
    margin-bottom: 20px;
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
.member-wp .period-icon {
    background-position: -1298px 0;
    margin-right: 6px;
}
.member-wp .mb-model .past-wp {
    padding: 20px 10px;
    box-sizing: border-box;
}
.post-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #979797;
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
.post-table td {
    height: 20px;
    border: 1px solid #979797;
    text-align: center;
}





.ipage {
    padding: 20px 0;
    color: #666;
    overflow: hidden;
    text-align: center;
}
</style>
