<template>
    <div>
        <v-searchHeader></v-searchHeader>
        <div class="ela-banner about-bg">
            <h2>关于我们<br>ABOUT US</h2>
        </div>
        <div class="a-container">
            <div class="ab-main">
                <div class="navigation">
                    <router-link to="/">首页</router-link> &gt;
                    <a href="#">{{anoutTitle}}</a> 
                </div>
                <div class="a-conter">
                    <!-- <Nav></Nav> -->
                    <div class="ac-left">
                        <p class="cleft-head"><i class="cbt-icon"></i>关于我们</p>
                        <ul>
                            <li @click="aboutlList('index')"><router-link to="/aboutUs/index" >公司简介 <span>&gt;</span></router-link></li>
                            <li @click="aboutlList('problem')"><router-link to="/aboutUs/problem" >常见问题 <span>&gt;</span></router-link></li>
                            <li><a href="javaScript:;">帮助中心 <span>&gt;</span></a> </li>
                            <li @click="aboutlList('contactUs')"><router-link to="/aboutUs/contactUs" >联系我们 <span>&gt;</span></router-link></li>
                        </ul>
                    </div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchHeader from '../Search/search-header'
// import Nav from './children/nav'
export default {
    data(){
        return{
            anoutTitle:''
        }
    },
    components:{
        'v-searchHeader':searchHeader,
        // Nav
    },
    methods:{
        aboutlList(type){
            debugger
            if(type == 'index'){
                this.anoutTitle = '公司简介'
                return;
            }else if(type == 'problem'){
                this.anoutTitle = '常见问题'
                return;
            }else if(type == 'contactUs'){
                this.anoutTitle = '联系我们'
                return;
            }
        }
    }
}
</script>

<style scoped>
.about-bg{
    background: url("../../images/banner/aboutus.png") center 0 no-repeat;
    width: 100%;
    height: 340px;
    background-size: cover;
}
.about-bg h2{
    font-size: 50px;
    color: #FEFEFE;
    letter-spacing: 2.6px;
    line-height: 60px;
    text-align: center;
    padding-top: 100px;
    box-sizing: border-box;
}
.a-container{
    background: #f1f1f1
}
.ab-main{
    width: 1170px;
    margin: 0 auto;
    padding: 20px 0;
}
.ab-main .navigation {
    background: #E7E7E7;
    height: 50px;
    line-height: 50px;
    padding: 0 40px;
    box-sizing: border-box;
}
.a-conter{
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
}
/* .a-conter  */
.a-conter .ac-right {
    width: 858px;
    background: #fff;
    float: right;
    padding: 13px;
    box-sizing: border-box;
}
.system-banner {
    width: 100%;
}
.system-banner p {
    width: 85%;
    margin: 0 auto;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.5px;
    line-height: 24px;
    margin-top: 10px;
}
.advantage {
    width: 100%;
    padding: 20px 40px;
    overflow: hidden;
    box-sizing: border-box;
}
.advantage .adv-title {
    width: 80%;
    margin: 0 auto;
    text-align: center;
    overflow: hidden;
}
.advantage .adv-title h3 {
    font-size: 18px;
    color: #14579E;
    letter-spacing: 0.64px;
    float: left;
    width: 40%;
}
.advantage .adv-title:before {
    content: "";
    border-bottom: #ddd solid 1px;
    width: 29%;
    float: left;
    margin-top: 15px;
}
.advantage .adv-title:after {
    display: block;
    content: "";
    border-bottom: #ddd solid 1px;
    width: 29%;
    float: left;
    margin-top: 15px;
}
.advantage .advlist {
    width: 100%;
    overflow: hidden;
    margin-top: 40px;
}
.advantage .advlist .ad-text {
    width: 418px;
    float: left;
}
.advantage .advlist h4 {
    font-size: 16px;
    color: #000000;
    letter-spacing: 0.57px;
    line-height: 24px;
    margin-bottom: 10px;
}
.advantage .advlist .adv-pic {
    width: 300px;
    float: left;
    text-align: right;
}
.advantage .advlist .ad-text p {
    margin-bottom: 5px;
    font-size: 12px;
    color: #4A4A4A;
    letter-spacing: 0.57px;
    line-height: 24px;
}
.advantage .adv-right .adv-pic {
    width: 300px;
    float: left;
    text-align: left;
}
.advantage .sale-st {
    width: 100%;
    display: block;
    margin-top: 40px;
}
.system-text {
    width: 100%;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: 0.5px;
    line-height: 24px;
    margin-top: 20px;
    margin-bottom: 40px;
}
.ac-left {
    width: 282px;
    float: left;
    background: #fff;
    padding-bottom: 200px;
}
 .ac-left .cleft-head {
    background: #326CD1;
    height: 50px;
    padding-left: 30px;
    box-sizing: border-box;
    font-size: 20px;
    color: #FEFEFE;
    letter-spacing: 1.25px;
    line-height: 50px;
}
 .ac-left .cleft-head .cbt-icon {
    display: block;
    float: left;
    background: url('../../images/combg.png') no-repeat;
    height: 36px;
    width: 36px;
    background-position: -830px 0;
    margin-top: 10px;
}
 .ac-left ul li {
    display: block;
    border-bottom: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
    box-sizing: border-box;
    position: relative;
}
 .ac-left ul li span {
    position: absolute;
    right: 10px;
    font-size: 14px;
    color: #326CD1;
    letter-spacing: 0.88px;
    line-height: 26px;
    margin-top: 5px;
}
.active{
    color:#326CD1;
    /* background:  */
}
</style>
