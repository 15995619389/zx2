            <template>
                <div>
                    <div class="ac-left">
                        <p class="cleft-head"><i class="mat-icon"></i>业务管理</p>
                        <ul>
                            <li><a href="#">评测管理 <span>&gt;</span></a> </li>
                            <li><router-link to="/my/order">申报管理<span>&gt;</span></router-link></li>
                        </ul>
                        <p class="cleft-head"><i class="acont-icon"></i>账号管理</p>
                        <ul>
                            <li><router-link to="/my/info">基本信息<span>&gt;</span></router-link></li> 
                            <li><router-link to="/my/collect">我的收藏<span>&gt;</span></router-link></li>
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
.ac-left .cleft-head{
    background: #326CD1;
    height: 50px;
    padding-left: 30px;
    box-sizing: border-box;
    font-size: 20px;
    color: #FEFEFE;
    letter-spacing: 1.25px;
    line-height: 50px;
}
.ac-left .cleft-head i {
    background: url('../../images/combg.png');
    display: block;
    float: left;
    margin-right: 3px;
}
.a-conter .ac-left .cleft-head .acont-icon {
    height: 36px;
    width: 36px;
    background-position: -2551px -43px;
    margin-top: 8px;
}
.ac-left .cleft-head .mat-icon {
    height: 36px;
    width: 36px;
    background-position: -758px 0;
    margin-top: 8px;
}
.ac-left .cleft-head .cbt-icon{
    display: block;
    float: left;
    background: url("../../images/combg.png")no-repeat;
    height:36px;width:36px;background-position:-830px 0;
    margin-top: 10px;
}
.ac-left ul li{
    display: block;
    border-bottom: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
    padding-left: 40px;
    box-sizing: border-box;
    position: relative;
}
.ac-left ul li span{
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
