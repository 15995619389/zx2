<template>
    <div id="pdfDom" v-show="isPdfShow">
        <h2>测评结果</h2>
        <ul class="datail_ul">
            <li>企业名称：杭州天楷科技有限公司</li>
            <li>政策名称：高新材料制造</li>
            <li>评测范围：高企认定</li>
            <li>评测地域：浙江省 杭州市 西湖区</li>
            <li>评测单位：上海飞天众智科技有限公司</li>
            <li>评测时间：2018-03-15 10:30</li>
        </ul>
        <ul>
            <h3>报告解读：</h3>
            <li>1、企业属于国家支持的高新技术领域。</li>
            <li>2、企业财务基础扎实，企业财务增长性好。</li>
            <li>3、企业科研经费充足，研发能力较强。</li>
            <li>4、该企业属于规模以上企业。</li>
            <li>5、企业知识产权资质良好，目前已积累知识产权总数“S总”个，其中，发明专利S1个，实用新型专利S2个，软件著作权S3个，外观专利设计S4个，增加知识产权的方式有购买/转让/自主申请。</li>
            <li>6、建议加强与科研院校的合作。</li>
            <li>7、企业具有国家级科研载体，申报加分。</li>
            <li>8、具有体系认证基础。</li>
            <li>9、具有高新技术企业资质。</li>
            <li>10、企业规模较大。</li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            isPdfShow:false,
            htmlTitle: '页面导出PDF文件名'
        }
    }
}
</script>

<style>
#pdfDom{
    overflow: hidden;
    padding-top: 55px;
    background-color:#fff;
    text-align: center
}
.datail_ul li{
    width: 50%;
    float: left;
    padding: 5px;
    
}
</style>
