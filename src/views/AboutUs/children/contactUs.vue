<template>
 
        <div class="ac-right problem-wrap">
				<h3><i class="contus"></i>联系我们</h3>
				<!--常见问题-->
				<div class="steplist ct-text">
					<dl>
						<dt><i class="addres"></i>通讯地址</dt>
						<dd>
							<p>上海飞天众知科技服务有限公司</p>
							<p class="small">上海浦东新区张江高科技服务园区张东路1387号11-01栋</p>
							<p class="small">邮编：200120</p>
						</dd>
					</dl>
					<dl>
						<dt><i class="cooper"></i>商务合作</dt>
						<dd>
							<p>XXXX@techina2025.com</p>
						</dd>
					</dl>
					<dl>
						<dt><i class="customer"></i>在线客服</dt>
						<dd>
							<p>在线咨询：<a href="#" class="buletext">【点此咨询】</a>  | 服务时间：周一至周五 9:00-17:30</p>
							<p>温馨提示：有账号或者订单的客户，在咨询前若能提前准备一下账号或订单信息，客服将能更快的定位和解决问题。</p>
						</dd>
					</dl>
					<dl>
						<dt><i class="hotline"></i>用户热线</dt>
						<dd>
							<p>服务热线：400-920-2025 | 服务时间：周一至周五 9:00-17:30</p>
							<p>温馨提示：有账号或者订单的客户，在咨询前若能提前准备一下账号或订单信息，客服将能更快的定位和解决问题。</p>
						</dd>
					</dl>
				</div>
			</div>
    
</template>

<script>
export default {

}
</script>

<style scoped>
.ac-right {
    width: 858px;
    background: #fff;
    float: right;
    padding: 13px;
    box-sizing: border-box;
}
.problem-wrap{
    padding: 0;
}
.problem-wrap h3{
    background: #326CD1;
    padding-left: 30px;
    height: 50px;
    line-height: 50px;
    box-sizing: border-box;
    font-size: 20px;
    color: #FEFEFE;
    letter-spacing: 1.25px;
    font-weight: normal;
}
.problem-wrap h3 .problem-icon{
    display: inline-block;
    background: url("../../../images/combg.png") no-repeat;
    height:36px;width:36px;background-position:-1154px 0;
    float: left;
    margin-top: 7px;
    margin-right: 10px;
}
.problem-wrap ul{
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
}
.problem-wrap ul li{
    display: block;
    margin-bottom: 20px;
}
.problem-wrap .qust{
    color: #0c4ca3;
    font-weight: 600;
    font-size: 15px;
    margin-bottom: 15px;
}
.problem-wrap h3 .contus{
    display: inline-block;
    background: url("../../../images/combg.png")no-repeat;
    height:36px;width:36px;background-position:-1046px 0;
    float: left;
    margin-top: 7px;
    margin-right: 10px;
}
.ct-text{
    margin-top: 30px;
}
.ct-text dl {
    width: 100%;
    display: block;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 35px;
}
.ct-text dl dt {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: #0c4ca3;
    letter-spacing: 0.5px;
    line-height: 24px;
}
.ct-text dl dd{
    padding-left: 40px;
    box-sizing: border-box;
}
.ct-text dl dt i {
    background: url("../../../images/combg.png") no-repeat;
    display: inline-block;
    margin-right: 10px;
    margin-top: 1px;
    width: 32px;
    height: 36px;
    float: left;
}
.ct-text dl dt .addres {
   background-position: -556px 0;
}
.ct-text dl dt .cooper {
    background-position:-524px 0;
}
.ct-text dl dt .customer {
   background-position: -588px 0;
}
.ct-text dl dt .hotline {
   background-position:-620px 0;
}
.buletext {
    color: #2963CA;
}
</style>
