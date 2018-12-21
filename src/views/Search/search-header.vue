<template>
    <div>
        <header>
            <div class="commontopbar">
                <div class="topbar-cont">
                    <div class="bar-left">
                        欢迎来到政小二，<a href="https://www.techina2025.com" style="color:#2963CA">飞天众智</a>旗下专业的政策查询平台！
                    </div>
                    <div class="bar-right">
                        <ul>
                            <li><i class="home"></i><router-link to="/">首页</router-link></li>
                            <li class="backslash">/</li>
                            <li @mouseover="aboutShow" @mouseleave='aboutNone'>
                                <a href="#" style="height:28px;line-height:28px,display:inline-block">关于我们
                                    <i class="about"></i>
                                </a>
                                <ul class="drop-down" v-show="aboutUsShow">
                                    <li><router-link to="/aboutUs/index">公司简介</router-link></li>
                                    <li><router-link to="/aboutUs/problem">常见问题</router-link></li>
                                    <li><a href="#">帮助中心</a> </li>
                                    <li><router-link to="/aboutUs/contactUs">联系我们</router-link></li>
                                </ul>
                            </li>
                            <li class="backslash">/</li>
                            <li><a href="#">帮助中心</a> </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="headerwp">
                <div class="head-main">
                    <div class="logo-pt">
                        <router-link to="/">
                            <h2 class="logo"></h2>
                            <div class="spacr"></div>
                            <div class="slogan"></div>
                        </router-link>
                    </div>
                    <div class="nav-item">
                        <ul>
                            <li><router-link to="/">首页</router-link><em></em> </li>
                            <li><router-link to="/companie">企服帮</router-link><em></em> </li>
                            <li><router-link to="/aboutUs">关于我们</router-link><em></em> </li>
                        </ul>
                    </div>
                    <div class="regist-wrap search-top">
                        <div class="">
                            <span class="search-form">
                                <input type="text" v-model.trim='searchText'>
                                <span class="glass"></span>
                            </span>
                            <button type="button" class="button_s" @click="searchInfo">政策搜</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </div>
</template>

<script>
export default {
    data(){
        return{
            aboutUsShow:false,
            searchText:'',
            PageSkipCount:''
        }
    },
    methods:{
        aboutShow(){          
            this.aboutUsShow = true
        },
        aboutNone(){
            this.aboutUsShow=false 
        },
        searchInfo(){
            this.$router.push({path:'/search',query:{keyword:this.searchText}})
            this.$emit('childrenSearch')
        }
    
    }
}
$(document).ready(function () {
$(window).scroll(function () {
    var scrollPos = $(window).scrollTop();
    if (scrollPos >= 10) {
        $(".headerwp").addClass("fixed");
        $(".head-main").addClass("smpding")
    } else {
        $(".headerwp").removeClass("fixed");
        $(".head-main").removeClass("smpding")
    }
});
});
</script>

<style scoped>
.fixed {
    position: fixed;
    top: 0px;
    z-index: 99;
    background-color: #fff;
    -webkit-box-shadow: 2px 2px 2px rgba(0,0,0,.2);
    -moz-box-shadow: 2px 2px 2px rgba(0,0,0,.2);
    box-shadow: 2px 2px 2px rgba(0,0,0,.2);
    -webkit-animation: searchTop .5s ease-in-out;
    -moz-animation: searchTop .5s ease-in-out;
    animation: searchTop .5s ease-in-out;
}
.smpding{
    padding: 10px 0;
}
@keyframes searchTop{
    0% {
    top: -50px;
}
100% {
    top: 0;
}
}
.commontopbar{
    background: #E7E7E7;
    height: 30px;
    line-height: 28px;
    width: 100%;
}
.topbar-cont{
    width: 1170px;
    margin: 0 auto;
    position: relative;
}
.commontopbar .topbar-cont .bar-left{
    width: 60%;
    float: left;
}
.commontopbar .topbar-cont .bar-right{
    float: right;
    text-align: right;
    right: 0;
    position: absolute;
}
.commontopbar .topbar-cont .bar-right ul li{
    display: block;
    float: left;
    margin-right: 10px;
    position: relative;
}
.home {
    display:block;
    height: 16px;
    width: 16px;
    background-position: -117px 0;
    margin-top: 6px;
    float: left;
}
.about {
    height: 4px;
    width: 6px;
    background-position: -475px -21px;
    position: absolute;
    top: 10px;
    right: -10px;
}
.backslash {
    margin: 0 10px;
}
.headerwp{
    width: 100%;
    overflow: hidden;
}
.head-main{
    width:1170px;
    margin: 0 auto;
    padding: 20px 0;
    overflow: hidden;
    box-sizing: border-box;
}

.logo-pt{
    width: 40%;
    float: left;
    overflow: hidden;
}
.home{
    display: block;
    height:16px;
    width:16px;
    background-position:-117px 0;
    margin-top: 6px;
    float: left;
}
.logo{
   
    height:50px;
    width:150px;
    background-position:-3695px 0;
    padding-right: 10px;
    float: left;
    display: block;
}
.about{height:4px;width:6px;background-position:-475px -21px;position: absolute;top:10px;right:-10px}
.spacr{width: 1px;height: 45px;background: #595757;display: block;
    margin-left: 10px;
    margin-top: 5px;
    float: left;
}
.slogan{
    height:34px;
    width:259px;
    background-position: -4321px 0;
    display: block;
    margin-left: 10px;
    float: left;
    margin-top: 10px;
}
.nav-item{
    float: left;
    margin-top: 15px;
    box-sizing: border-box;
}
.nav-item ul li{
    width: 90px;
    margin: 0 10px;
    position: relative;
    float: left;
    display: block;
}
.nav-item ul li>em {
    position: absolute;
    left: 50%;
    bottom: 0;
    margin: -5px -45px;
    /* transform: translate(-50%); */
}
.nav-item ul li a{
    height: 100%;
    width: 100%;
    text-align: center;
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
li:hover em{
    animation: test 0.4s ease;
    border: 1px solid #14579E;
    width: 100%;
}

@keyframes test {
    from{
        width: 0;
    }

    to{
        width: 100%;
    }
}
.search-top {
    width: 369px;
    float: right;
    margin-top: 5px;
}
.search-form {
    background: #FFFFFF;
    border: 1px solid #979797;
    width: 250px;
    height: 38px;
    position: relative;
    float: left;
}
.search-form input {
    width: 256px;
    height: 38px;
    border: 0;
    padding: 3px;
    box-sizing: border-box;
    padding-left:35px 
}
.search-form .glass {
    display: inline-block;
    position: absolute;
    left: 5px;
    top: 5px;
    height: 26px;
    width: 26px;
    background-position: -441px 0;
}
.search-top .button_s {
    border: 1px solid #2963CA;
    background: #2963CA;
    color: #fff;
    width: 113px;
    height: 40px;
    font-size: 16px;
    cursor: pointer;
}
/**/
.drop-down {
    position: absolute;
    top: 30px;
    background: #fff;
    left: -5px;
    width: 100px;
    z-index: 99;
    -webkit-box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.1);
    -moz-box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 2px 1px rgba(0,0,0,0.1);
    padding: 10px 0;
    border-radius: 1px;
    box-sizing: border-box;
}
.drop-down li {
    height: 30px;
    color: #fff;
    padding-left: 15px;
    box-sizing: border-box;
}
.drop-down li a {
    color: #000;
} 
.drop-down li a:hover {
    color: #0c4ca3;
    text-decoration: underline
}
</style>
