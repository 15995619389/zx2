<template>
    <div>
        <searchHeader></searchHeader>     
        <div class="a-container">
            <div class="ab-main">
                <div class="navigation"> <router-link to="/">首页</router-link> >  <span class="navt-cur">{{policyDetailModel.policyName}}</span> </div>
                <div class="program-box">
                    <div class="grid-l-inner">
                        <h3 :title="policyDetailModel.policyName">{{policyDetailModel.policyName}}</h3>
                        <p>
                            <span v-show="policyDetailModel.level == 1"><b>政策级别：</b>国家级</span>
                            <span v-show="policyDetailModel.level == 2"><b>政策级别：</b>省级</span>
                            <span v-show="policyDetailModel.level == 3"><b>政策级别：</b>地市级</span>
                            <span v-show="policyDetailModel.level == 4"><b>政策级别：</b>区县级</span>

                            <span><b>政策区域：</b>{{policyDetailModel.area}}</span>
                            <span><b>政策出处：</b>{{policyDetailModel.policySource}}</span>
                        </p>
                        <p><span><b>政策类型：</b>{{policyDetailModel.policyCategory}}</span></p>
                        <p><span><b>适合产业：</b>{{policyDetailModel.industry}}</span></p>
                        <p><span><b>施行时间：</b>{{policyDetailModel.beginTime | formatDate}}&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;{{policyDetailModel.endTime | formatDate}}</span></p>
                        <div class="orgn-btn">
                            <a href="javaScript:;">{{policyDetailModel.keywords}}</a>
                            <!-- <a href="javaScript:;" v-for="item in advantageArr">{{item}}</a> -->
                        </div>
                    </div>
                    <div class="gird-c-inner">
                        <router-link :to="{path:'/booking',query:{id:policyDetailModel.policyCategoryId,category:policyDetailModel.policyCategory}}" class="declare">立即申报</router-link>
                        <router-link v-if="policyDetailModel.isValidity" :to="{path:'/evaluation',query:{listId:policyDetailModel.policyCategoryId}}" class="review">申报资格测评</router-link>
                    </div>
                    <div class="gird-r-inner">
                        <a href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D" style="float:left"><i class="cust-wt"></i>联系客服</a>
                       <span style="overflow:hidden;display:inline-block">
                            <a href="javaScript:;" v-if="policyDetailModel.isFollow == 1" @click="collectSuccess" class="collect-success"><i class="collect-wt" ></i>收藏成功</a>
                            <a href="javaScript:;" v-else class="attention" @click="cancelAttention"><i class="collect-wt"></i>收藏政策</a>
                       </span>
                    </div>
                </div>
                <div class="progam-cont">
                    <div class="prog-left">
                        <div class="progm-lst">
                            <h3><i class="benefits"></i>申请益处</h3>
                            <p v-html="policyDetailModel.benifit"></p>
                        </div>
                        <div class="progm-lst">
                            <h3><i class="refer"></i>申请提交</h3>
                            <p v-html="policyDetailModel.apply"></p>
                        </div>
                        <div class="progm-lst">
                            <h3><i class="process"></i>服务流程</h3>
                            <p v-html="policyDetailModel.procedure"></p>
                        </div>
                        <div class="progm-lst">
                        <h3><i class="problem"></i>常见问题</h3>
                        <p v-html="policyDetailModel.qna"></p>
                    </div>
                        <div class="progm-lst" style="border-bottom: none">
                            <h3><i class="document"></i>政策文件</h3>
                            <div class="dot-t">
                                <p v-for="(item,index) in policyDetailModel.fileUrl" :key="index" >
                                  {{index+1}}{{item.fileName}} <a href="javascript:;" @click='fileData(item.fileUrl, item.fileName)'><i class="don-gry"></i></a> 
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="prog-right">
                        <div class="proright-tit">
                            <h2><i class="relevant"></i>相关政策</h2>
                            <router-link to="/search">查看更多&gt;</router-link>
                            <!-- <a href="#"></a> -->
                        </div>
                        <ul class="relve-list">
                            <li v-for="(item,index) in policyModel" :key="index">
                                <span class="info-relve">
                                    <a class="r-t" :href="`/policydetail/${item.id}`" >{{item.policyName}}</a>
                                    <a href="javascript:;" class="oth-b" >{{item.keywords}}</a>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div> 
        <template>
            <div class="popupBox" v-show="isLoginHide">
                <div id="mask"></div>
                <div class="pop error_pop">
                    <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="loginHide">x</a></div>
                    <div class="pop_bd">
                        <div class="hint_storng">
                            <strong>请先登录，才能进行业务收藏功能！</strong>
                        </div>
                        <router-link class="pop_btn" to="/login">确定</router-link>
                        <!-- <a href="javascript:void(0);" class="pop_btn" id="MainMsgOK">确定</a> -->
                    </div>
                </div>
            </div>
            <div class="popupBox" v-show="isDownloadHide">
                <div id="mask"></div>
                <div class="pop error_pop">
                    <div class="pop_tit">提&nbsp;&nbsp;&nbsp;&nbsp;示<a href="javaScript:;" class="a_close" id="domMessage1_close" @click="DownloadHide">x</a></div>
                    <div class="pop_bd">
                        <div class="hint_storng">
                            <strong>请先登录，才能进行文件下载功能！</strong>
                        </div>
                        <router-link class="pop_btn" to="/login">确定</router-link>
                        <!-- <a href="javascript:void(0);" class="pop_btn" id="MainMsgOK">确定</a> -->
                    </div>
                </div>
            </div>
        </template>
        <GoTop></GoTop>  
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
import GoTop from "../GoTop/go-top";
import { formatDate } from "../../script/date.js";

export default {
  data() {
    return {
      token: "",
      isDownloadHide:false,
      isLoginHide: false,
      isCollection: true,
      policyDetailModel: [],
      policyModel: [],
      isNowTime: "",
      isentTime: "",
      advantageArr:[]
    };
  },
  components: {
    searchHeader,
    GoTop
  },
  computed: {
    time() {
      return;
    }
  },
  created() {
    this.token = localStorage.getItem("token");
    
  },
mounted(){
  this.init();
},
  methods: {
    init() {
      if (!this.token) {
        this.$http
          .get("/policies/" + this.$route.params.id)
          .then(res => {
            // console.log(res.data)
            this.policyDetailModel = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$http
          .get("/policies/" + this.$route.params.id, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            // console.log(res.data)
            this.policyDetailModel = res.data;
          })
          .catch(err => {
            console.log(err);
          });
      }

      // 推荐政策
      this.$http
        .get("/policies/featured", { params: { MaxResultCount: 4 } })
        .then(res => {
          this.policyModel = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 收藏政策
    cancelAttention() {
      if (!this.token) {
        this.isLoginHide = true;
      } else {
        this.$http
          .post(`/policies/${this.$route.params.id}/follow`, null, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.init();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    // 取消政策
    collectSuccess() {
      if (!this.token) {
        this.isLoginHide = true;
      } else {
        this.$http
          .post(`/policies/${this.$route.params.id}/unfollow`, null, {
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.init();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    loginHide() {
      this.isLoginHide = false;
    },
    DownloadHide(){
      this.isDownloadHide = false
    },
    // 下载文件
    fileData(fileurl, fileName){
      console.log('////////')
      // console.log(fileurl)
      if(!this.token){
        this.isDownloadHide = true;
      }else{
        this.$http.get('/policies/filedownload',{params:{
          file:fileurl,
          responseType: 'blob',
          },
          headers:{
            Authorization: "Bearer " + this.token
          }
        }).then(res=>{
          console.log(res)
          
          downloadFile(fileName, res.data.value);
        }).catch(err=>{
          console.log(err)
        })
      }
    },
      downloadFile(fileName, content, blobOptions) {

        blobOptions = blobOptions || {};

        var blob = new Blob([content], blobOptions);
        var a = document.createElement('a');
        a.innerHTML = fileName;

        // 指定生成的文件名
        a.download = fileName;
        a.href = URL.createObjectURL(blob);

        document.body.appendChild(a);

        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", false, false);

        a.dispatchEvent(evt);

        document.body.removeChild(a);
    },
  },

  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  }
};
</script>

<style scoped>
.pop_btn {
  width: 135px;
  background: #0c4ca3;
  line-height: 35px;
  text-align: center;
  display: block;
  color: #fff;
  font-size: 18px;
  border-radius: 3px;
  margin: 0 auto 20px;
}
.pop_bd .hint_storng {
  padding: 40px 0;
  text-align: center;
  font-size: 17px;
}
.program-box {
  background: url("../../images/banner/BJ.jpg") center 0;
  width: 100%;
  height: 310px;
  background-size: cover;
  padding: 50px 30px 30px 30px;
  box-sizing: border-box;
}
.program-box .grid-l-inner {
  float: left;
  width: 50%;
}
.program-box .grid-l-inner h3 {
  font-size: 30px;
  color: #ffffff;
  letter-spacing: 1px;
  line-height: 26px;
  margin-bottom: 10px;
  height: 34px;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.program-box .grid-l-inner p {
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 26px;
  margin-bottom: 10px;
}
.program-box .grid-l-inner p span {
  display: inline-block;
  margin-right: 20px;
}
.program-box .grid-l-inner .orgn-btn {
  overflow: hidden;
  width: 100%;
}
.program-box .grid-l-inner .orgn-btn a {
  display: inline-block;
  border: 1px solid #ff7d02;
  border-radius: 2px;
  font-size: 12px;
  color: #ff7d02;
  letter-spacing: 0;
  line-height: 26px;
  padding: 0 5px;
  box-sizing: border-box;
  margin-right: 10px;
}
.program-box .gird-c-inner {
  float: left;
  padding: 80px 50px 0 80px;
  box-sizing: border-box;
}
.program-box .gird-c-inner a {
  width: 146px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: block;
  color: #fff;
  margin-bottom: 20px;
}
.program-box .gird-c-inner .declare {
  border: 1px solid #ffffff;
  background: none;
}
.program-box .gird-c-inner .review {
  border: 1px solid #2963ca;
  background: #2963ca;
}
.program-box .gird-r-inner {
  float: right;
}
.program-box .gird-r-inner a {
  display: inline-block;
  border: 1px solid #fff;
  color: #fff;
  padding: 3px 5px;
  box-sizing: border-box;
  margin-right: 15px;
}
.program-box .gird-r-inner a:last-child {
  margin-right: 0;
}
.program-box .gird-r-inner i {
  background: url("../../images/combg.png");
  display: block;
  float: left;
}
.program-box .gird-r-inner .cust-wt {
  height: 21px;
  width: 21px;
  background-position: -270px 0;
  margin-right: 3px;
}
.program-box .gird-r-inner .collect-wt {
  height: 21px;
  width: 21px;
  background-position: -333px 0;
}
.program-box .gird-r-inner .collect-success {
  color: #ff7d02;
}
.program-box .gird-r-inner .collect-success .collect-wt {
  height: 21px;
  width: 21px;
  background: url("../../images/wujiaoxing.png") no-repeat;
}
.progam-cont {
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
}
.progam-cont .prog-left {
  width: 867px;
  background: #fff;
  overflow: hidden;
  float: left;
}
.progam-cont .prog-left .progm-lst {
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
  border-bottom: 1px solid #979797;
}
.progam-cont .prog-left .progm-lst h3 {
  background: url("../../images/combg.png");
  background-position: -2479px -141px;
  padding-left: 10px;
  width: 254px;
  height: 40px;
  line-height: 40px;
  font-size: 20px;
  color: #14579e;
  letter-spacing: 1.25px;
  font-weight: 600;
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.progam-cont .prog-left .progm-lst i {
  background: url("../../images/combg.png") no-repeat;
  display: block;
  float: left;
  margin-right: 10px;
  margin-top: 2px;
  height: 36px;
  width: 36px;
}
.progam-cont .prog-left .progm-lst .benefits {
  background-position: -902px 0;
}
.progam-cont .prog-left .progm-lst p b {
  display: block;
  font-size: 16px;
}
.progam-cont .prog-left .progm-lst p {
  display: block;
  margin-bottom: 10px;
}
.progam-cont .prog-left .progm-lst .refer {
  background-position: -974px 0;
}
.progam-cont .prog-left .progm-lst .process {
  background-position: -866px 0;
}
.progam-cont .prog-left .progm-lst .problem {
  background-position: -3701px -59px;
  margin-top: 3px;
}
.progam-cont .prog-left .progm-lst .document {
  background-position: -1118px 0;
}
.progam-cont .prog-left .progm-lst .dot-t a {
  font-size: 16px;
  color: #0447a3;
  letter-spacing: 0;
  line-height: 24px;
  text-decoration: underline;
  float: left;
  display: block;
  margin-right: 15px;
}
.progam-cont .prog-left .progm-lst .dot-t .don-gry {
  background: url("../../images/combg.png");
  height: 22px;
  width: 22px;
  background-position: -397px 0;
  margin-top: 5px;
}
.progam-cont .prog-left .progm-lst .dot-t span {
  display: block;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
}
.progam-cont .prog-right {
  width: 283px;
  float: left;
  margin-left: 20px;
}
.progam-cont .prog-right .proright-tit {
  background: #326cd1;
  line-height: 50px;
  height: 50px;
  padding: 0 10px;
  box-sizing: border-box;
}
.progam-cont .prog-right .proright-tit h2 {
  font-size: 20px;
  color: #fefefe;
  letter-spacing: 1.25px;
  font-weight: normal;
  float: left;
}
.progam-cont .prog-right .proright-tit .relevant {
  background: url("../../images/combg.png");
  height: 36px;
  width: 36px;
  background-position: -1226px 0;
  display: block;
  float: left;
  margin-top: 8px;
  margin-right: 5px;
}
.progam-cont .prog-right .proright-tit a {
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0;
  float: right;
  line-height: 50px;
}
.relve-list {
  background: #fff;
  padding: 10px 0 30px 0;
}
.relve-list li {
  border-bottom: 1px dashed #ddd;
  padding: 10px 10px 15px 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.relve-list li:hover {
  background: #ddd;
}

.relve-list li:last-child {
  border: 0;
}
.relve-list li:before {
  content: "";
  display: block;
  float: left;
  width: 5px;
  height: 5px;
  background: #4e80d7;
  border-radius: 50%;
  margin-top: 10px;
}
.relve-list li span {
  display: block;
  float: left;
}
.relve-list .info-relve {
  width: 98%;
  float: left;
  display: block;
  padding-left: 20px;
  box-sizing: border-box;
}
.relve-list .info-relve .r-t {
  display: block;
  font-size: 16px;
  color: #2b2b2b;
  letter-spacing: 0.8px;
  line-height: 26px;
  margin-bottom: 10px;
  width: 100%;
  overflow: hidden;
  height: 26px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.relve-list .info-relve .r-t:hover {
  color: #4e80d7;
}
.relve-list .info-relve .oth-b {
  border: 1px solid #326cd1;
  border-radius: 2px;
  font-size: 12px;
  color: #14579e;
  letter-spacing: 0;
  line-height: 26px;
  display: inline-block;
  padding: 0 5px;
  margin-right: 10px;
  box-sizing: border-box;
}
</style>
