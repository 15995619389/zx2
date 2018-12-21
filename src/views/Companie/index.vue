<template>
    <div>
        <searchHeader></searchHeader>
        <div class="a-container">
            <div class="ab-main">
                <div class="navigation">我的位置 ：<router-link to="/companie">企服帮</router-link></div>
                <div class="progam-cont">
                    <div class="prog-left">
                        <div class="sevice-md">
                            <ul style="overflow:hidden">
                                <li v-for="item in enterpriseModel" :key="item.id">
                                    <router-link :to='{path:"/companie/detail/"+item.id}'>
                                        <div class="sec-img">
                                            <div class="overflow_img">
                                                <img :src="baeUrl+item.imgUrl">
                                            </div>
                                        </div>
                                        <p class="intro" :title="item.title">{{item.title | frimText}}</p>
                                    </router-link>
                                </li>
                            </ul>
                            <v-pagination :total="total" :size="size" :page="page" :changge="pageFn" style="margin-top:50px"></v-pagination>
                        </div>
                    </div>
                    <div class="prog-right">
                        <div class="proright-tit">
                            <h2><i class="hot-sever"></i>热门服务</h2>
                            <a href="javascript:;" @click="batch(enterpriseModel)">换一批></a>
                        </div>
                        <div class="sevice-md">
                            <ul>
                                <li v-for="item in hotModel" :key="item.id">
                                    <router-link :to="{path:'/companie/detail/'+item.id}">
                                        <div class="sec-img">
                                            <img :src="baeUrl+item.imgUrl">
                                        </div>
                                        <p class="intro" :title='item.title'>{{item.title | frimText}}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-goTop></v-goTop>
    </div>
</template>

<script>
import searchHeader from '../Search/search-header'
import pagination from '../Common/pageination'
import GoTop from '../GoTop/go-top'
import config from '../../appsettings'

export default {
    data(){
        return{
            enterpriseModel:[],
            hotModel:[],
            total:'',//总个数
            size:10,//每页显示个数
            page:1,//当前页
            PageSkipCount:'',
            baeUrl:config.Api_Url
        }
    },
    mounted(){
        this.init()
    },
    components:{
        searchHeader,
        'v-goTop':GoTop,
        'v-pagination':pagination,
    },
    methods:{
        init(){
            this.$http.get('/enterprises',{
                params:{
                    MaxResultCount:12,
                    SkipCount:this.PageSkipCount
                }
            }).then((res)=>{
                // console.log(res)
                this.total = res.data.totalCount
                this.enterpriseModel = res.data.items
                this.hotModel = res.data.items.slice(res.data.items.length-3,res.data.items.length)
            }).catch((err)=>{
                console.log(err)
            })
        },
        batch(arr){
            var arr = this.enterpriseModel
            var shuffled = arr.slice(0)
            var i = arr.length
            var min = i - 3
            var temp,index
            while(i-- >min){
                index = Math.floor((i+1)*Math.random());
                temp = shuffled[index]
                shuffled[index] = shuffled[i]
                shuffled[i] = temp
            }
            return this.hotModel = shuffled.slice(min)
        },
        // page点击切换执行
        pageFn(val){
            this.page = val
            this.PageSkipCount = (val*10)-10
            scrollTo(0,0);
            this.init()
        },
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
.navt-cur{
    color: #2963CA;
}
.progam-cont{
    width: 100%;
    margin: 20px 0;
    overflow: hidden;
}
.progam-cont .prog-left{
    width:867px;
    background: #fff;
    overflow: hidden;
    float: left;
}
.progam-cont .prog-left .progm-lst {
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    border-bottom:1px solid #979797;
}
.progam-cont .prog-left .progm-lst h3{
    background:url("../../images/combg.png");
    background-position: -2479px -141px;
    padding-left: 10px;
    width: 254px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    color: #14579E;
    letter-spacing: 1.25px;
    font-weight: 600;
    display: block;
    overflow: hidden;
    margin-bottom: 20px;
    box-sizing: border-box;
}
.progam-cont .prog-left .progm-lst i{
    background: url("../../images/combg.png") no-repeat;
    display: block;
    float: left;
    margin-right: 10px;
    margin-top: 2px;
    height:36px;width:36px;
}
.progam-cont .prog-left .progm-lst .benefits{
   background-position: -902px 0;
}
.progam-cont .prog-left .progm-lst p b{
    display: block;
    font-size: 16px;
}
.progam-cont .prog-left .progm-lst p{
    display: block;
    margin-bottom: 10px;
}
.progam-cont .prog-left .progm-lst  .refer{
    background-position:-974px 0;
}
.progam-cont .prog-left .progm-lst .process{
    background-position: -866px 0;
}
.progam-cont .prog-left .progm-lst .problem{
    background-position: -3701px -59px;
    margin-top: 3px;
}
.progam-cont .prog-left .progm-lst .document{
    background-position:-1118px 0;
}
.progam-cont .prog-left .progm-lst .dot-t a{
    font-size: 16px;
    color: #0447A3;
    letter-spacing: 0;
    line-height: 24px;
    text-decoration: underline;
    float: left;
    display: block;margin-right: 15px;
}
.progam-cont .prog-left .progm-lst .dot-t .don-gry{
    background: url("../../images/combg.png");
    height:22px;width:22px;background-position:-397px 0;
    margin-top: 5px;
}
.progam-cont .prog-left .progm-lst .dot-t span{
    display: block;
    margin-bottom: 10px;
    width: 100%;
    overflow: hidden;
}
.progam-cont  .prog-right{
    width: 283px;
    float: left;
    margin-left: 20px;
}
.progam-cont .prog-right .sevice-md {
    background: #fff;
    width: 100%;
    padding: 15px 0 20px 0;
    box-sizing: border-box;
}
.progam-cont  .prog-right .proright-tit{
    background: #326CD1;
    line-height: 50px;
    height: 50px;
    padding: 0 10px;
    box-sizing: border-box;
}
.progam-cont  .prog-right .proright-tit h2{
    font-size: 20px;
    color: #FEFEFE;
    letter-spacing: 1.25px;
    font-weight: normal;
    float: left;
}
.progam-cont .prog-right .sevice-md ul li {
    width: 258px;
    margin: 0 auto 10px auto;
    display: block;
    float: none;
}
.progam-cont  .prog-right .proright-tit .relevant{
    background: url("../../images/combg.png");
    height:36px;width:36px;background-position:-1226px 0;
    display: block;
    float: left;
    margin-top: 8px;
    margin-right: 5px;
}
.progam-cont  .prog-right .proright-tit a{
    font-size: 12px;
    color: #FFFFFF;
    letter-spacing: 0;
    float: right;
    line-height: 50px;
}
.relve-list{
    background: #fff;
    padding: 10px 0 30px 0;
}
.relve-list li{
    border-bottom: 1px dashed #ddd;
    padding: 10px 10px 15px 20px;
    box-sizing: border-box;
    overflow: hidden;
}
.relve-list li:last-child{
    border: 0;
}
.relve-list li:before{
    content: "";
    display: block;
    float: left;
    width: 5px;
    height: 5px;
    background: #4E80D7;
    border-radius: 50%;
    margin-top: 10px;
}
.relve-list li span{
    display: block;
    float: left;
}
.relve-list .info-relve{
    width: 98%;
    float: left;
    display: block;
    padding-left: 20px;
    box-sizing: border-box;
}
.relve-list .info-relve .r-t{
    display: block;
    font-size: 16px;
    color: #2B2B2B;
    letter-spacing: 0.8px;
    line-height: 26px;
    margin-bottom: 10px;
}
.relve-list .info-relve .r-t:hover{
    color:  #4E80D7;
}
.relve-list .info-relve .oth-b{
    border: 1px solid #326CD1;
    border-radius: 2px;
    font-size: 12px;
    color: #14579E;
    letter-spacing: 0;
    line-height: 26px;
    display: inline-block;
    padding: 0 5px;
    margin-right: 10px;
    box-sizing: border-box;
}
.prog-left .sevice-md{
    padding: 10px 0 20px 7px;
    box-sizing: border-box;
}
.sevice-md{
    width: 100%;
    overflow: hidden;
}
.sevice-md ul li{
    width:201px;
    height: 260px;
    padding: 0;
    float: left;
    display:block;
    margin: 0 5px 10px 5px;
    border: 1px solid #979797;
}
.sevice-md ul li:last-child{
    margin-right: 0;
}
.sevice-md ul li  .sec-img{
    width: 100%;
    height:223px;
    padding-top: 10px;
    box-sizing: border-box;
    overflow:hidden;
    margin: 0 auto
}

.sevice-md ul li .sec-img img:hover{
    transform: scale(1.4);
}
.sevice-md ul li .sec-img img{
    width:100%;
    height:187px;
    display: block;
    margin: 0 auto;
    overflow: hidden;
    transition: all 0.6s;
}
.intro {
    width: 100%;
    border-top: #979797 solid 1px;
    line-height: 37px;
    text-align: center;
    font-size: 12px;
}
</style>
