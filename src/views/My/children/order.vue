        <template>
            <div class="ac-right  member-wp">
		     <!--报告详情-->
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="order-icon"></i>我的申报</h3>
					</div>
				    <div class="tip-list past-wp">
						<table class="post-table">
							<thead>
							<tr>
							<td>编号</td>
							<td>申报名称</td>
							<td>提交申报时间</td>
							<td>操作</td>
							</tr>
							</thead>
							<tbody class="filltbd">
							<tr v-for="(item,index) in orderModel" :key="index">
								<td>{{index+1}}</td>
								<!-- <td><router-link :to="{path:'/my/appraisa/detail/'+item.id}" class="buletext">{{item.policyName}}</router-link></td> -->
								<td><a href="javascript:;" class="buletext">{{item.policyName}}</a></td>
								<td>{{item.applyTime | formatDate}}</td>
								<td><a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" class="blbg cust">联系客服</a></td>
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
            total:'',//总个数
            size:10,//每页显示个数
            page:1,//当前页
            PageSkipCount:'',
            orderModel:[],
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
            let params={
                SkipCount:this.PageSkipCount,
                MaxResultCount:10
            }
            this.$http.get('/policyapplys',{params}).then((res)=>{
                // console.log(res)
                this.total = res.data.totalCount
                this.orderModel = res.data.items
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:ss');
        }
    }
}
</script>

<style scoped>
.a-conter .member-wp .order-icon {
    background-position: -1190px 0;
}
 .member-wp .mb-model .past-wp{
    padding: 20px 10px;
    box-sizing: border-box;
}
.post-table{
    width: 100%;
    border-collapse:collapse;
    border:1px solid #979797;;
}
.post-table td
{
    height:20px;
    border:1px solid #979797;
    text-align: center;
}
.post-table thead tr td{
    color: #2963CA;
    font-weight: 600;
    height: 35px;
    font-size: 13px;
}
.post-table tbody tr td{
    padding: 10px 0;
    box-sizing: border-box;
    font-size: 12px;
}
.post-table .filltbd tr td{
    padding: 20px 10px ;
    box-sizing: border-box;
}
 .member-wp .collen-icon{
    background-position: -1262px 0;
}
 .member-wp .basic-icon{
    background-position: -938px 0;
}
.basic-box{
    border: 1px solid #979797;
    overflow: hidden;
    margin-bottom: 250px;
}
.basic-box .bs-left{
    width: 30%;
    float: left;
    text-align: center;
    padding-right: 30px;
    box-sizing: border-box;
}
.basic-box .bs-right{
    width: 70%;
    float: left;
    padding-left: 80px;
    padding-top: 60px;
    border-left: #979797 solid 1px;
    box-sizing: border-box;
}
.basic-box .bs-left .user-img{
    width: 168px;
    height: 168px;
    box-shadow: 2px 3px 2px  #979797;
    margin: 20px auto;
}
.basic-box .bs-left .use-name{
    text-align: center;
    width: 40%;
    margin: 0 auto;
    margin-bottom: 20px;
}
.basic-box .bs-right dl{
    display: block;
    overflow: hidden;
    margin-bottom: 20px;
}
.basic-box .bs-right dl dd{
    float: left;
    width: 50%;
}
.basic-box .bs-right dl dd span{
    color:  #2963CA;
    font-weight: 600;
}
.basic-box .bs-right dl dd .buletext{
    margin-left: 20px;
}
.buletext{
    color:#2963CA;
    cursor: default
}
.buletext:hover{
    text-decoration: none
}
.blbg {
    background: #2963CA;
    border: 1px solid #2963CA;
    color: #fff;
    width: 65px;
    display: block;
    margin: 0 auto;
    margin-bottom: 0;
}
</style>
