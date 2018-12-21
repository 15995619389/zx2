<template>
    <div>
        <footer class="pub-footer">
            <div class="foot-main">
                <div class="ft-item">
                    <ul>
                        <li class="ft-title"><i class="search_f"></i>搜政策</li>
                        <li class="ftlist"> <router-link :to="{path:'/booking',query:{id:'',category:''}}">立即申报</router-link></li>
                        <li class="ftlist"> <router-link :to="{path:'/evaluation',query:{listId:''}}">申报资格测评</router-link></li>
                    </ul>
            </div>
                <div class="ft-item">
                    <ul>
                        <li class="ft-title"><i class="compan_f"></i>企服帮</li>
                        <li class="ftlist"> <router-link to='/companie'>认证咨询服务</router-link></li>
                        <!-- <li class="ftlist"> <router-link :to="{name:'CompanieDetail',params:{type:'footer'}}">认证咨询服务</router-link></li>
                        <li class="ftlist"> <a href="#"> 企业管理提升培训</a></li>
                        <li class="ftlist"> <a href="#"> 认证咨询服务</a></li>
                        <li class="ftlist"> <a href="#"> 企业管理提升培训</a></li> -->
                    </ul>
                </div>
                <div class="ft-item">
                    <ul>
                        <li class="ft-title"><i class="about_f"></i>关于我们</li>
                        <li class="ftlist"> <router-link to="/aboutUs/index">公司简介</router-link></li>
                        <li class="ftlist"> <router-link to="/aboutUs/problem">常见问题</router-link></li>
                        <li class="ftlist"> <a href="#"> 帮助中心</a></li>
                        <li class="ftlist"> <router-link to="/aboutUs/contactUs">联系我们</router-link></li>
                    </ul>
                </div>
                <div class="ft-item">
                    <ul>
                        <li class="ft-title"><i class="mores_f"></i>更多服务</li>
                        <li class="ftlist"> <a href="https://www.techina2025.com"> 技术对接服务</a></li>
                        <li class="ftlist"> <a href="https://jc.techina2025.com"> 检测服务</a></li>
                        <li class="ftlist"> <a href="https://www.techina2025.com/demand/pageArticle"> 军民融合服务</a></li>
                        <li class="ftlist"> <a href="https://www.techina2025.com/TechShare/patentlistScreening"> 专利服务等</a></li>
                    </ul>
                </div>
                <div class="consult-item">
                    <div class="contact">
                        <div class="tel-left">
                            <div class="number-t">
                                <i class="fefu"></i>
                                <p class="correl">相关业务查询</p>
                                <p class="blue-mub">400-920-2025</p>
                            </div>
                            <p class="relation"><a href="#">联系客服</a> </p>
                            <p class="workday">工作日 9：00-17:30</p>
                        </div>
                        <div class="webchat-right">
                            <div class="ewm-box">
                                <img src="../../images/ewm_sm.png">
                            </div>
                            <p class="focus">关注飞天众智公众号</p>
                            <p class="obtain">获取更多资讯！</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        <div class="copyright">
            Copyright © 2016-2018 飞天众智平台 版权所有 沪ICP备16043947号-2 互联网违法和不良信息举报电话：<span>021-58866899</span> 邮箱：110@techina<span style="display:none">sdfsadfsd2512</span>2025.com
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.pub-footer{
    width: 100%;
    background: #fff;
}
.pub-footer .foot-main{
    width: 1170px;
    margin: 0 auto;
    padding: 30px;
    box-sizing: border-box;
    overflow: hidden;
}
.pub-footer .foot-main .ft-item{
    float: left;
    width: 180px;
}
.pub-footer .foot-main .ft-item .ft-title{
    font-size: 16px;
    color: #0D4CA3;
    font-weight: 600;
    margin-bottom: 5px;
}
.ft-item i{
    display: block;
    float: left;
    margin-right: 5px;

}
.pub-footer .foot-main .ft-item .ft-title .search_f{
    height:20px;width:20px;background-position: -190px 0;
}
.pub-footer .foot-main .ft-item .ft-title .compan_f{
    height:20px;width:20px;background-position: -150px 0;
}
.pub-footer .foot-main .ft-item .ft-title .about_f{
    height:20px;width:21px;background-position:-2513px -50px;
}
.pub-footer .foot-main .ft-item .ft-title .mores_f{
    height:20px;width:20px;background-position: -250px 0;
    margin-top: 3px;
}
.pub-footer .foot-main .ft-item .ftlist{
    padding-left: 20px;
    font-size: 14px;
    color: #2B2B2B;
    letter-spacing: 0;
    line-height: 26px;
}
.consult-item{
    float: left;
    border-left: 1px solid #979797;
    width: 380px;
    padding-left: 30px;
    box-sizing: border-box;
    overflow: hidden;
}
.consult-item .tel-left{
    float: left;
    width:45%;
    text-align: left;
}
.consult-item .webchat-right{
    float: left;
    width:50%;
    padding-left: 30px;
    box-sizing: border-box;
}
.consult-item .fefu{
    height:38px;width:38px;background-position: -1334px 0;
    display: block;
    float: left;
}
.relation a{
    display: block;
    width:158px;
    height: 27px;
    background: #2963CA;
    text-align: center;
    color: #fff;
    font-size: 14px;
    line-height: 27px;
    margin: 10px 0;
}
.correl{
    font-size: 14px;
    color: #2B2B2B;
    font-weight: 600;
}
.blue-mub{
    font-size: 16px;
    color: #0D4CA3;
    font-weight: 600;
}
.consult-item .webchat-right{
    text-align: center;
}
.workday{
    text-align: center;
}
.consult-item .webchat-right .focus{
    font-size: 16px;
    color: #0D4CA3;
    font-weight: bold;
}
.consult-item .webchat-right .obtain{
    font-size: 14px;
    color: #0D4CA3;
}
.consult-item .webchat-right .ewm-box{
    border: #0D4CA3 solid 1px;
    width: 90px;
    height: 90px;
    text-align: center;
    margin: 0 auto 10px auto;
}
.consult-item .webchat-right .ewm-box img{
    margin: 7px auto 0 auto;
    display: block;
}
.copyright{
    width: 100%;
    border-top: #f1f1f1 solid 1px;
    text-align: center;
    height: 60px;
    line-height: 60px;
}
.copyright span{
    color: #0D4CA3;
    cursor: pointer;
    text-decoration:underline
}
</style>
