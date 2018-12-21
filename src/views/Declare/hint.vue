<template>
    <div>
        <searchHeader></searchHeader>
        <Banner></Banner>
        <div class="c-container">
            <div class="ceping-wrap report-wp">
                <div class="report-submit">
                    <i class="sub"></i>
                    <p class="su-tit">申报已提交</p>
                    <p class="experts">申报专家会在一个工作日内与您联系，请保持联系方式畅通！</p>
                    <p>
                        <span class="consult-tel">申报业务咨询电话：400-9202025</span>
                        <span class="line-text">
                            <a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D"> <i class="online_kf "></i>在线客服：政小二</a>
                        </span>
                    </p>
                </div>
                <div class="reference">
                    <div class="refer-title">
                        <h2>相关企业服务推荐</h2>
                    </div>
                    <ul>
                        <li v-for="(item,index) in enterpriseServiceModel" :key="index">
                            <router-link :to="{path:'/companie/detail/'+item.id}">
                                <div class="sev-pc">
                                    <!-- <img src="../../images/dfzc.png"> -->
                                    <img :src="baeUrl+item.imgUrl">
                                </div>
                                <p :title="item.title">{{item.title | frimText}}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from '../Search/search-header'
import Banner from '../Common/banner'
import config from '../../appsettings'
export default {
    data(){
        return{
            enterpriseServiceModel:[],
            area:'',
            baeUrl:config.Api_Url
        }
    },
    created(){
        this.init()
    },
    components:{
        searchHeader,
        Banner,
    },
    methods:{
        init(){
            // 推荐企业
            this.$http.get('/enterprises/featured',{params:{MaxResultCount:8}}).then((res)=>{
                this.enterpriseServiceModel = res.data
            }).catch((err)=>{
                console.log(err)
            })
        }
    },
    filters: {
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
.report-submit {
    width: 100%;
    margin: 0 auto;
    border: 1px solid #979797;
    text-align: center;
    padding: 50px;
    box-sizing: border-box;
}
.report-submit .sub {
    display: block;
    background: url(../../images/combg.png)no-repeat;
    height: 116px;
    width: 116px;
    background-position: -2707px 0;
    margin: 0 auto;
}
.su-tit {
    font-size: 30px;
    color: #FD6600;
    letter-spacing: 0.6px;
    font-weight: bold;
    margin: 10px 0;
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
.report-wp {
    padding: 30px 10px;
    box-sizing: border-box;
}

.experts {
    font-size: 20px;
    color: #4A4A4A;
    letter-spacing: 0.4px;
    font-weight: 600;
    margin-bottom: 10px;
}
.report-submit span {
    display: inline-block;
    text-align: left;
    margin-right: 20px;
}
.report-submit span {
    display: inline-block;
    text-align: left;
    margin-right: 20px;
}
.line-text a {
    font-size: 20px;
    color: #2B72F8;
    letter-spacing: 0.4px;
}
.online_kf {
    display: inline-block;
    background: url(../../images/combg.png)no-repeat;
    height: 30px;
    width: 30px;
    background-position: -494px 0;
    margin: 0 auto;
    float: left;
}
.reference {
    width: 100%;
    margin-top: 40px;
    overflow: hidden;
}
.reference .refer-title {
    width: 60%;
    margin: 0 auto;
    display: block;
    overflow: hidden;
}
.reference .refer-title:before {
    display: block;
    content: "";
    border-bottom: #979797 solid 1px;
    width: 30%;
    float: left;
    margin-top: 15px;
}
.reference .refer-title:after {
    display: block;
    content: "";
    border-bottom: #979797 solid 1px;
    width: 30%;
    float: left;
    margin-top: 15px;
}
.reference .refer-title h2 {
    text-align: center;
    font-size: 18px;
    color: #14579E;
    letter-spacing: 0.36px;
    float: left;
    width: 28%;
}
.reference ul {
    margin: 30px 0;
    overflow: hidden;
}
.reference ul li {
    float: left;
    display: block;
    border: 1px solid #979797;
    width: 270px;
    margin-right: 15px;
    margin-bottom: 15px;
}
.reference ul li .sev-pc {
    width: 100%;
    text-align: center;
}
.sev-pc img{
    width: 202px;
    height: 187px;
}

.reference ul li p {
    width: 100%;
    border-top: 1px solid #979797;
    text-align: center;
    padding: 10px 10px;
    box-sizing: border-box;
}

</style>
