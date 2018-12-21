<template>
    <div>
        <div class="ac-left">
            <p class="cleft-head"><i class="cbt-icon"></i>关于我们</p>
            <ul>
                <li><router-link to="/aboutUs/index">公司简介 <span>&gt;</span></router-link></li>
                <li><router-link to="/aboutUs/problem">常见问题 <span>&gt;</span></router-link></li>
                <li><a href="#">帮助中心 <span>&gt;</span></a> </li>
                <li><router-link to="/aboutUs/contactUs">联系我们 <span>&gt;</span></router-link></li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
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
    display:block;
    float: left;
    background: url('../../../images/combg.png') no-repeat;
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
