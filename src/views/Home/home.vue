<template>
    <div class="myHome">
        <myHeader></myHeader>
        <div class="banner-search">
            <div class="search-ct">
                <h2>全国最全的政策数据库，赶快来搜索！</h2>
                <form>
                    <div class="policy-s">
                        <input type="text" v-model.trim="searchText" >
                        <input type="button" class="button_s" value="政策搜" @click="searchSubmit('homeFrom')"/>
                        <!-- <router-link class="button_s" :to="{path:'/search',query:{keyword:searchText}}" @click="searchSubmit()">政策搜</router-link> -->
                    </div>
                    <div class="hotkey">
                        <span style="float:left">热门搜索：</span>
                        <!-- <a href="#">高企认定 </a><a href="#">高新技术企业 </a><a href="#">高企认定 </a><a href="#">高新技术企业 </a><a href="#">高企认定 </a><a href="#">高新技术企业 </a> -->
                    </div>
                </form>
            </div>
        </div>
        <div class="course-model">
            <ul>
                <li>
                    <div class="cmod-left"><i class="database"></i></div>
                    <div class="cmod-right">
                        <h3>权威政策数据库</h3>
                        <p>汇集海量国内政策，<br>
                            为您提供最全的政策<br>
                            查询数据库，精准了解国内政策。</p>
                    </div>
                </li>
                <li>
                    <div class="cmod-left"><i class="declare"></i></div>
                    <div class="cmod-right">
                        <h3>快速项目申报渠道</h3>
                        <p>为您提供便捷的项目申报渠道，<br>
                            减轻您的项目申报担负。</p>
                        <router-link :to="{path:'/booking',query:{id:'',category:''}}" class="report">立即申报</router-link>
                        <!-- <a href="#" ></a> -->
                    </div>
                </li>
                <li>
                    <div class="cmod-left"><i class="free"></i></div>
                    <div class="cmod-right">
                        <h3>权威政策数据库</h3>
                        <p>通过政小二的“评测工具”，<br>
                            为企业提供最佳的申报组合方案。</p>
                        <!-- <a v-bind:href="/evaluation" class="measurement">立即测评</a> -->
                        <router-link :to="{path:'/evaluation',query:{listId:''}}" class="measurement">立即测评</router-link>
                    </div>
                </li>
            </ul>
        </div>
        <div class="i-container">
            <div class="content-main">
                <!-- 申报进行中-->
                <div class="declare-module">
                    <div class="side-banner">
                        <i class="hot-declate"></i>
                        <p class="bolod-txt">申报<br>火热</p>
                        <p class="underway">进行中</p>
                        <router-link to="/search">查看更多</router-link>
                        <!-- <a href="#">></a> -->
                </div>
                    <div class="declare-right">
                        <ul>
                            <li v-for="(item,index) in policyModel" :key="index">
                                <p class="delcare-title"><router-link :to='{path:"/policydetail/"+item.id}'>{{item.policyName | ellipsis}}</router-link>  </p>
                                <div class="pro-box">
                                    <div class="pb-left">
                                        <p><span>类型：</span>{{item.industryName}}</p>
                                        <p><span>区域：</span>{{item.area}}</p>
                                        <p><span>部门：</span>{{item.policySourcesName}}</p>
                                        <p><span>优势：</span>{{item.keywords}}</p>
                                    </div>
                                    <div class="pb-buton">
                                        <router-link :to="{path:'/booking',query:{id:item.id,category:item.policyCategory.name}}" class="report">立即申报</router-link>
                                        <router-link :to="{path:'/evaluation',query:{listId:item.id}}" class="measurement">申报资格测评</router-link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- 企业服务-->
                <div class="declare-module sevice-md">
                    <div class="side-banner">
                        <i class="hot-declate service"></i>
                        <p class="bolod-txt">企业<br>服务</p>
                        <router-link to="/companie">查看更多</router-link>
                    </div>
                    <div class="declare-right servid-box">
                        <ul>
                            <li v-for="(item,index) in enterpriseServiceModel" :key="index">
                                <router-link :to='{path:"/companie/detail/"+item.id}'>
                                    <div class="sec-img">
                                        <div class="overflow_img">
                                            <img :src="baeUrl+item.imgUrl">
                                        </div>
                                    </div>
                                    <p class="intro" :title='item.title'>{{item.title | frimText}}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!--服务承诺-->
            <div class="promise-warp">
                <ul>
                    <li>
                        <div class="promis-icon">
                            <i class="pro-1"></i>
                        </div>
                        <div class="text-fuw">
                            <p class="tit">服务承诺</p>
                            <p>提供最全的政策信息</p>
                        </div>
                    </li>
                    <li>
                        <div class="promis-icon">
                            <i class="pro-2"></i>
                        </div>
                        <div class="text-fuw">
                            <p class="tit">服务承诺</p>
                            <p>保证政策申报24小时专人对接</p>
                        </div>
                    </li>
                    <li>
                        <div class="promis-icon">
                            <i class="pro-3"></i>
                        </div>
                        <div class="text-fuw">
                            <p class="tit">服务承诺</p>
                            <p>智能匹配企业相关政策</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <GoTop></GoTop>
    </div>
</template>

<script>
import myHeader from '../Header/header'
import GoTop from '../GoTop/go-top'
import config from '../../appsettings'

export default {
    data(){
        return{
            policyModel:[],
            enterpriseServiceModel:[],
            searchText:'',
            area:'',
            baeUrl:config.Api_Url
        }
    },
    components:{
        myHeader,
        GoTop
    },
    created(){
        this.init()
    },
    methods:{
        searchSubmit(formName){
            this.$router.push({path:'/search',query:{keyword:this.searchText}})
        },
        init(){
            // 推荐政策
            this.$http.get('/policies/featured',{params:{MaxResultCount:8}}).then((res)=>{
                // console.log(res)
                this.policyModel = res.data
            }).catch((err)=>{
                console.log(err)
            })
            // 推荐企业
            this.$http.get('/enterprises/featured',{params:{MaxResultCount:8}}).then((res)=>{
                this.enterpriseServiceModel = res.data
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    filters: {
        ellipsis (value) {
            if(value.length>40){
                return value.slice(0,40)+'....'
            }else{
                return value
            }
        },
        frimText(value){
            if(value.length>10){
                return value.slice(0,10)+'....'
            }else{
                return value
            }
        }
    }
}
</script>

<style scoped>
.course-model{
    width: 1170px;
    margin: auto;
    padding: 50px 0;
    box-sizing: border-box;
    overflow: hidden;
}
.course-model ul li{
    width: 31.5%;
    float: left;
    border-right:#979797 solid 1px ;
    margin-right: 25px;
}
.course-model ul li:last-child{
    border-right: none;
    margin-right: 0;
}
.course-model ul li .cmod-left{
    width: 35%;
    float: left;
}
.course-model ul li .cmod-left  .database{
    height:116px;
    width:116px;
    background-position: -2939px 0;
}
.course-model ul li .cmod-left  .declare{
    height:116px;
    width:116px;
    background-position: -3055px 0;
}
.course-model ul li .cmod-left  .free{
    height:116px;
    width:116px;
    background-position: -2823px 0;
}
.course-model ul li .cmod-right{
    width: 65%;
    float: left;
}
.course-model ul li .cmod-right h3{
    font-size: 20px;
    color: #14579E;
    margin-bottom: 10px;
}
.course-model ul li .cmod-right p{
    font-size: 14px;
    color: #2B2B2B;
    line-height: 26px;
}
.course-model ul li .cmod-right a{
    display: block;
    width: 85px;
    height: 32px;
    font-size: 14px;
    text-align: center;
    line-height: 32px;
    margin-top: 5px;
}
.report{
    background: #2963CA;
    border: #2963CA;
    color:#fff;
}
.report:hover{
    color: #FFFFFF;
}
.measurement{
    border:1px solid #979797;
    background: #fff;
    color: #2963CA;
}
.i-container{
  background: #f1f1f1;
  width: 100%;
  overflow: hidden;
   padding: 20px 0;
    box-sizing: border-box;
}
.i-container .content-main{
  width: 1170px;
  margin: 0 auto;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.i-container .content-main .declare-module{
    width: 100%;
    overflow: hidden;
}
.i-container .content-main .declare-module .side-banner{
   width: 178px;
   height: 833px;
   float: left;
   display: block;
   background: url("../../images/banner/delt.jpg") no-repeat;
    padding: 80px 0 0 0;
    box-sizing: border-box;
    text-align: center;
}
.hot-declate{
    height:74px;
    width:70px;
    background-position: -2125px 0;
    margin: 0 auto;
    display: block;
}
.bolod-txt{
    font-size: 36px;
    color: #FFFFFF;
    letter-spacing: 4.5px;
    line-height: 42px;
    font-weight: 600;
    margin-top: 10px;
}
.declare-right{
    width: 84%;
    float: left;
}
.declare-right ul li{
    width: 460px;
    height: 197px;
    border: 1px solid #979797;
    padding: 14px 10px;
    box-sizing: border-box;
    margin-left: 23px;
    margin-bottom: 15px;
    float: left;
}
.declare-right ul li:last-child,
.declare-right ul li:nth-child(7){
    margin-bottom:0;
}
.delcare-title{
    font-size: 16px;
    color: #14579E;
}
.delcare-title a{
    color: #14579E;
    font-weight: 600;
}
.delcare-title a:hover{
    text-decoration: underline;
    color: #333
}
.underway{
    font-size: 23px;
    color: #FFFFFF;
    letter-spacing: 4.5px;
    line-height: 42px;
}
.side-banner a{
    color: #fff;
    margin-top: 20px;
    display: block;
}
.pro-box{
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
}
.pro-box .pb-left{
    width: 73%;
    float: left;
}
.pro-box .pb-left p{
    margin-bottom: 5px;
    font-size: 14px;
    color: #2B2B2B;
    line-height: 26px;
    height: 26px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.pro-box p span{
    font-weight: 600;
}
.pb-buton{
    width: 27%;
    float: left;
}
.pb-buton a{
    display: block;
    width: 110px;
    height: 36px;
    margin-bottom: 20px;
    text-align: center;
    line-height: 36px;
}
.i-container .content-main  .sevice-md{
    margin-top: 30px;
}
.i-container .content-main  .sevice-md .side-banner{
    width: 178px;
    height: 538px;
    float: left;
    display: block;
    background: url('../../images/banner/sever.png') no-repeat;
    padding: 80px 0 0 0;
    box-sizing: border-box;
    text-align: center;
}
.service{height:74px;width:70px;background-position:-2055px 0; }
.sevice-md ul li{
    width:222px;
    height: 260px;
    padding: 0;
    float: left;
    display: block;
    margin-left: 19px;
}
.sevice-md ul li:first-child{
    margin-left: 20px;
}
.sevice-md ul li .sec-img{
    width: 221px;
    height:223px;
    padding-top: 10px;
    box-sizing: border-box;
    overflow:hidden;
}
.sevice-md ul li .sec-img .overflow_img{
    overflow: hidden;
    width:202px;
    height:187px;
    margin: 0 auto;
}

.overflow_img img{
    width:202px;
    height:187px;
    display: block;
    margin: 0 auto;
    transition: all 0.6s;
}
 .overflow_img img:hover{
    transform: scale(1.4);
}
.intro{
    width: 100%;
    border-top: #979797 solid 1px;
    line-height: 37px;
    text-align: center;
}
.promise-warp{
    width:1170px;
    margin: 20px auto 0 auto;
    padding: 10px;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
}
.promise-warp ul li{
    width: 367px;
    height: 137px;
    background: #f5f5f5;
    float: left;
    padding: 20px;
    box-sizing: border-box;
    margin-right: 20px;
}
.promise-warp ul li:last-child{
    margin-right:0;
}
.promise-warp ul li .promis-icon{
    width: 40%;
    float: left;
}
.promise-warp .pro-1{height:100px;width:100px;background-position: -2295px 0;}
.promise-warp .pro-2{height:100px;width:100px;background-position: -2195px 0;}
.promise-warp .pro-3{height:100px;width:100px;background-position: -2395px 0;}
.promise-warp ul li .text-fuw{
    width: 60%;
    float: left;
    padding: 20px 0;
}
.promise-warp ul li .text-fuw p{
    font-size: 14px;
    color: #909090;
    line-height: 26px;
}
.promise-warp ul li .text-fuw .tit{
    font-size: 20px;
    color: #0D4CA3;
    letter-spacing: 0;
}
/*首页banner搜索*/
.banner-search{
    background: url("../../images/banner/banner-I.png");
    width: 100%;
    height: 370px;
    padding-top: 120px;
    box-sizing: border-box;
    background-size: cover;
}
.banner-search .search-ct{
    width: 580px;
    margin: 0 auto;
    text-align: center;
}
.banner-search .search-ct h2{
    font-size: 30px;
    color: #FFFFFF;
    letter-spacing: 3.75px;
    margin-bottom: 20px;
}
.policy-s{
    width: 580px;
    overflow: hidden;
}
.policy-s input{
    width: 449px;
    background: #FFFFFF;
    height: 40px;
    float: left;
    border: 0;
    padding: 0 8px;
}
.policy-s a{
    background: #2963CA;
    width: 106px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color:#FFFFFF;
    border: 0;
    float: left;
    cursor: pointer;
}
.policy-s .button_s{
    background: #2963CA;
    width: 106px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    color:#FFFFFF;
    border: 0;
    float: left;
    cursor: pointer;
}
.banner-search .search-ct .hotkey{
    width: 100%;
    color: #fff;
    margin-top: 20px;
}
.banner-search .search-ct .hotkey a{
    display: inline-block;
    color: #fff;
    margin-right: 10px;
}
.banner-search .search-ct .hotkey a:hover{
    color:#2963CA
} 
</style>
