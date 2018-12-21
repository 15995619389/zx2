<template>
    <div>
        <v-searchHeader @childrenSearch='searchDate'></v-searchHeader>
        <div class="i-container">
            <div class="search-wrap">
                <div class="screen-box">
                    <div class="crunmb-nav">
                        <a href="#" class="all-nav"><i class="all-t"></i>全部</a>
                        <span v-show="allAreaTitle != ''"><a href="#" class="search-key">{{allAreaTitle}}<span class="close" @click="tableDelect('allAreaTitle')">x</span></a></span>
                        <span v-show="PolicyLevelTitle !=''">&gt;<a href="#" class="search-key">{{PolicyLevelTitle}} <span class="close" @click="tableDelect('PolicyLevelTitle')">x</span></a></span>
                        <span v-show="PolicyToFromTitle != ''"><a href="#" class="search-key">{{PolicyToFromTitle}}<span class="close" @click="tableDelect('PolicyToFromTitle')">x</span></a></span>
                        <span v-show="PolicyTypeTitle != ''"><a href="#" class="search-key">{{PolicyTypeTitle}}<span class="close" @click="tableDelect('PolicyTypeTitle')">x</span></a></span>
                        <span v-show="industryTypeTitle != ''"><a href="#" class="search-key">{{industryTypeTitle}}<span class="close" @click="tableDelect('industryTypeTitle')">x</span></a></span>
                        <span v-show="publishTimeTitle != ''"><a href="#" class="search-key">{{publishTimeTitle}}<span class="close" @click="tableDelect('publishTimeTitle')">x</span></a></span>
                    </div>
                    <div class="crunmb-gird">
                        <div class="g-list">
                            <div class="glist-left"><span>区域</span></div>
                            <div class="filtrate">

                                <a href="javaScript:;" style="margin-top:6px"  v-for="(item,index) in allArea" :key="index" :class="{classBg:index===allAreaClass}" @click="allAreaClick(index)">{{item}}</a>
                                <!-- <a href="javaScript:;" style="margin-top:6px" >全国</a> -->
                                <form class="form-inline">
                                    <v-distpicker :province="user.searchProvince" :city="user.searchCity" :area='user.searchArea' @province="onChangeProvince" @city="onChangeCity" @area='onChangeArea'></v-distpicker>
                                </form>
                            </div>
                        </div>
                        <div class="g-list">
                            <div class="glist-left"><span>政策级别</span></div>
                            <div class="filtrate">
                                <a href="javaScript:;" v-for="(item,index) in PolicyLevelText" :key="index" @click="LevelSelect(index,item.name,item.value)" :class="{classBg:index===LevelClass}">{{item.name}}</a>
                            </div>
                        </div>
                        <div class="g-list"  v-show="PolicyToShow">
                            <div class="glist-left"><span>政策出处</span></div>
                            <div class="filtrate">
                                <div class="provenance" v-show="provenanceOne">
                                    <a href="javaScript:;" v-show='item.level == 1' v-for="(item,index) in PolicyToFrom" :key="index" @click="PolicysourcesSelect(index,item.name,item.id)" :class="{classBg:index===PolicyToFromClass}">{{item.name}}</a>
                                </div>
                                <div class="provenance" v-show="provenanceTwo">
                                    <a href="javaScript:;" v-show="item.level == 2" v-for="(item,index) in PolicyToFrom" :key="index" @click="PolicysourcesSelect(index,item.name,item.id)" :class="{classBg:index===PolicyToFromClass}">{{item.name}}</a>
                                </div>
                                <div class="provenance" v-show="provenanceThree">
                                    <a href="javaScript:;" v-show="item.level == 3" v-for="(item,index) in PolicyToFrom" :key="index" @click="PolicysourcesSelect(index,item.name,item.id)" :class="{classBg:index===PolicyToFromClass}">{{item.name}}</a>
                                </div>
                                <div class="provenance" v-show="provenanceFore">
                                    <a href="javaScript:;" v-show="item.level == 4" v-for="(item,index) in PolicyToFrom" :key="index" @click="PolicysourcesSelect(index,item.name,item.id)" :class="{classBg:index===PolicyToFromClass}">{{item.name}}</a>
                                </div>
                                
                            </div>
                        </div>
                        <!-- 展开与收缩 -->
                        <div class="hide-items" v-show="toggle">
                            <div style="overflow:hidden">
                                <div class="g-list">
                                <div class="glist-left"><span>类型</span></div>
                                <div class="filtrate">
                                    <a href="javaScript:;" ></a>
                                    <a href="javaScript:;" v-for="(item,index) in PolicyType" :key="index" @click="PolicyTypeSelect(item.id,index,item.name)" :class="{classBg:index===PolicyTypeClass}">{{item.name}}</a>
                                </div>
                            </div>
                            <div class="g-list">
                                <div class="glist-left"><span>使用企业/产业类型</span></div>
                                <div class="filtrate">
                                    <a href="javaScript:;" v-for="(item,index) in industryType" :key="index" @click="industryTypeSelect(item.id,index,item.name)" :class="{classBg:index===industryTypeClass}">{{item.name}}</a>
                                </div>
                            </div>
                            <div class="g-list">
                                <div class="glist-left"><span>发布年份</span></div>
                                <div class="filtrate">
                                    <a href="javaScript:;" v-for="(item,index) in publishTime" :key="index" @click="PublishDate(item,index)" :class="{classBg:index===publishTimeClass}">{{item}}</a>
                                </div>
                            </div>
                            </div>
                            <div class="g-list11" style="border-bottom:1px dashed #ddd">
                                <div class="glist-left"><span>有效时间</span></div>
                                <div class="filtrate" style="width:">
                                    <span>从</span>
                                    <vue-datepicker-local v-model="chosenBeginTime" @confirm="BeginTime" show-buttons style="z-index:10"/>
                                    <span>到</span>
                                    <vue-datepicker-local v-model="chosenEndTime" @confirm="EndTime" show-buttons style="z-index:10"/>
                                </div>
                            </div>
                        </div>
                        <div class="ck-more">
                            <div class="flodbox">
                                <a href="#" class="more-all" id="tog"  v-if="infoToggle" @click="unfold"><b class="arrow_d"></b><span>展开</span></a>
                                <a href="#" class="more-all" id="tog" v-else @click="packUp"><b class="arrow-b-up" ></b><span>收起</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sort-warp">
                    <div class="st-nav">
                        <div class="n-list" @click="sort(0)">
                            <a href="javascript:;" ><span :class="{sortActive:(sortName==0)}">默认排序</span></a>
                        </div>
                        <div class="n-list" @click="sort(1)">
                            <a href="javascript:;">
                                <span :class="{sortActive:(sortName==1)}">发布时间</span>
                                <div class="time_top">
                                    <span class="top_sort" :class="{sortTopActive:(sortName==1&&sortDirection==1)}"></span>
                                    <span class="down_sort" :class="{sortDownActive:(sortName==1&&sortDirection==0)}"></span>
                                    <!-- <em class="triangle_top" ></em>
                                    <em class="triangle_bottom"></em> -->
                                </div>
                            </a>
                        </div>
                        <div class="pol-number">
                            政小二为您找到相关政策<span>{{policyModel.totalCount}}</span>条
                        </div>
                    </div>
                    <div class="Policylist">
                        <!-- 1.有结果显示 -->
                        <div v-if="policyModel.totalCount>0">
                            <ul>
                                <li v-for="(item,index) in policyModel.items" :key="index">
                                    <div class=" fl matter">
                                        <div class="m-pc">
                                            <img src="../../images/gjzc.png" v-if="item.level == 1"/>
                                            <img src="../../images/dfzc.png" v-else/>
                                        </div>
                                        <div class=" mat-text">
                                            <router-link  :to='{path:"/policydetail/"+item.id}'><h3>{{item.policyName}}</h3></router-link>
                                            <p>{{item.benifit}}</p>
                                        </div>
                                    </div>
                                    <div class="fl tag-box">
                                        <p><span>产业类型：</span>{{item.industryName}}</p>
                                        <p><span>政策出处：</span>{{item.policySourcesName}}</p>
                                        <p><span>地域：</span>{{item.area}}</p>
                                        <p><span>发布时间：</span>{{item.publishTime | formatDate}}</p>
                                    </div>
                                    <div class="fl other-item">
                                        <!-- <router-link to="/booking" class="declare">立即申报</router-link> -->
                                        <router-link :to="{path:'/booking',query:{id:item.id,category:item.policyCategory.name}}" class="declare">立即申报</router-link>
                                        <router-link :to="{path:'/evaluation',query:{listId:item.id}}" class="evaluation" v-show="item.isValidity != 'true' ">申报资格测评</router-link>
                                        <p class="validity">有效期至：{{item.endTime | formatDate}}</p>
                                    </div>
                                </li>
                            </ul>
                            <v-pagination :total="total" :size="size" :page="page" :changge="pageFn" ></v-pagination>
                        </div>
                        <!-- 2.没有搜到结果显示 -->
                        <div class="noresult" v-else>
                            <img src="../../images/nores.png">
                            <p class="rest-tit">未找到相关搜索结果</p>
                            <p>{{time}}秒后将为您推荐最新的政策内容！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <v-goTop></v-goTop>
    </div>
</template>


<script>
import searchHeader from "../Search/search-header";
import pagination from "../Common/pageination";
import VDistpicker from "v-distpicker";
import GoTop from "../GoTop/go-top";
import VueDatepickerLocal from "vue-datepicker-local";
import { formatDate } from "../../script/date.js";

export default {
  data() {
    return {
      // 政策出处显示v-show
      provenanceOne: true,
      provenanceTwo: false,
      provenanceThree: false,
      provenanceFore: false,
      // 省份三级
      policyModel: [],
      user: {
        searchProvince: "",
        searchCity: "",
        searchArea: ""
      },
      infoToggle: true,
      toggle: false,
      // 分页
      // pageModel:{
      total: "", //总个数
      size: 10, //每页显示个数
      page: 1, //当前页
      // },
      time: 0,
      // 选择标签的参数
      chosenLevel: null,
      chosenAreaCode: "",
      chosePolicysources: "",
      chosenPolicycategories: "",
      chosenIndustries: "",
      chosenPublishYear: "",
      chosenBeginTime: "",
      chosenEndTime: "",
      PageSkipCount: "",
      sortName: 0,
      sortDirection: 0,
      timeSort: "",
      // 政策级别
      PolicyLevelText: [
        { name: "全部", value: null },
        { name: "国家级政策", value: 1 },
        { name: "省级政策", value: 2 },
        { name: "地市级政策", value: 3 },
        { name: "区县级政策", value: 4 }
      ],
      // 区域
      allArea: ["全部", "全国"],
      // 政策出处
      // PolicyToFrom:['全部','工信部','科技部','商务部','环保部','税务部','财政部'],
      PolicyToFrom: [],
      //类型
      // PolicyType:['全部','高企认定','科技小巨人企业认定','专精特新中小企业认定','专利工作试点示范单位认定','院士专家工作站认定','中国名牌产品认定','企业技术中心认定','高端装备首台（套）突破示范项目辅导','信息化与工业化融合项目培育指导','博士后科研工作站认定'],
      PolicyType: [],
      //产业类型
      // industryType:['全部','劳动密集型产业','能源矿产开发和加工业','新能源产业','农产品加工','装备制造业','高技术产业'],
      industryType: [],
      // 发布时间
      publishTime1: "",
      publishTime: ["全部"],
      PolicyLevelTitle: "",
      PolicyToFromTitle: "",
      PolicyTypeTitle: "",
      industryTypeTitle: "",
      publishTimeTitle: "",
      allAreaTitle: "",
      allAreaClass: 0,
      LevelClass: 0,
      PolicyToFromClass: '',
      PolicyTypeClass: 0,
      industryTypeClass: 0,
      publishTimeClass: 0,
      PolicyToShow: false
    };
  },
  created() {
    // 获取产业类型
    this.$http
      .get("/industries", {
        params: {
          Sorting: "",
          SkipCount: "",
          MaxResultCount: 10
        }
      })
      .then(res => {
        res.data.unshift({ name: "全部", id: 0 });
        this.industryType = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 获取所有政策类型
    this.$http
      .get("/policycategories", {
        params: {
          Sorting: "",
          SkipCount: "",
          MaxResultCount: 10
        }
      })
      .then(res => {
        res.data.items.unshift({ name: "全部", id: 0 });
        this.PolicyType = res.data.items;
      })
      .catch(err => {
        console.log(err);
      });
    // 获取政策出处
    this.$http
      .get("/policysources", {
        params: {
          Sorting: "",
          SkipCount: "",
          MaxResultCount: ""
        }
      })
      .then(res => {

        this.PolicyToFrom = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    //初始数据
    this.init();
    this.nowDate();
  },
  mounted() {
    this.time = 10;
    setInterval(this.timer, 1000);
    // 计算总页数
  },
  components: {
    "v-searchHeader": searchHeader,
    VDistpicker,
    VueDatepickerLocal,
    "v-pagination": pagination,
    "v-goTop": GoTop
  },
  watch: {
    time: function(newVal, oldVal) {
      if (newVal == 0) {
        this.chosenLevel = "";
        this.chosenAreaCode = "";
        this.chosePolicysources = "";
        this.chosenPolicycategories = "";
        this.chosenIndustries = "";
        this.chosenPublishYear = "";
        this.chosenBeginTime = "";
        this.timeSort = "";
        this.PageSkipCount = "";
        this.$route.query.keyword = "";

        this.LevelClass = 0;
        this.PolicyTypeClass = 0;
        this.industryTypeClass = 0;
        this.publishTimeClass = 0;

        (this.PolicyLevelTitle = ""),
          (this.PolicyToFromTitle = ""),
          (this.PolicyTypeTitle = ""),
          (this.industryTypeTitle = ""),
          (this.publishTimeTitle = ""),
          (this.allAreaTitle = ""),
          this.$route.query.keyword = ''
          this.init();
        this.time = 10;
      }
    }
  },
  methods: {
    nowDate() {
      let mydate = new Date();
      let thisYear = mydate.getFullYear();
      let SectionYear = thisYear - 2016;
      for (var i = 0; i <= SectionYear; i++) {
        this.publishTime.push(thisYear--);
      }
    },
    // 城市
    onChangeProvince(data) {
      this.user.searchProvince = data.value;
      this.chosenAreaCode = data.code;
      this.allAreaTitle = data.value;

      this.init();
    },
    onChangeCity(data) {
      this.user.searchCity = data.value;
      this.chosenAreaCode = data.code;
      this.allAreaTitle = data.value;
      this.init();
    },
    onChangeArea(data) {
      this.user.searchArea = data.value;
      this.chosenAreaCode = data.code;
      this.allAreaTitle = data.value;
      this.init();
    },

    unfold() {
      this.infoToggle = false;
      this.toggle = true;
    },
    packUp() {
      this.infoToggle = true;
      this.toggle = false;
    },
    timer() {
      if (this.policyModel.totalCount == 0) {
        this.time--;
      }
    },
    // 点击搜索
    searchDate() {
      this.init();
    },
    // ajax请求数据
    init() {
      this.$http
        .get("/policies", {
          params: {
            Level: this.chosenLevel,
            AreaCode: this.chosenAreaCode,
            PolicySource: this.chosePolicysources,
            PolicyCategory: this.chosenPolicycategories,
            Industry: this.chosenIndustries,
            PublishYear: this.chosenPublishYear,
            BeginTime: this.chosenBeginTime,
            EndTime: this.chosenEndTime,
            Sorting: this.timeSort,
            SkipCount: this.PageSkipCount,
            MaxResultCount: 10,
            Search: this.$route.query.keyword
          }
        })
        .then(res => {
          this.total = res.data.totalCount;
          this.policyModel = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 排序
    sort(num) {
      if (num == this.sortName) {
        this.sortDirection = this.sortDirection == 0 ? 1 : 0;
      }
      if (this.sortName == 1 && this.sortDirection == 1) {
        this.timeSort = "PublishTime ASC";
      } else if (this.sortName == 1 && this.sortDirection == 0) {
        this.timeSort = "PublishTime DESC";
      }
      this.sortName = num;
      console.log(1111);
      this.init();
    },
    // page点击切换执行
    pageFn(val) {
      this.page = val;
      this.PageSkipCount = val * 10 - 10;
      window.scrollTo(0, 0);
      this.init();
    },
    // 删除标签
    tableDelect(type) {
      if (type == "PolicyLevelTitle") {
        this.PolicyLevelTitle = "";
        this.LevelClass = 0;
        this.chosenLevel = 0;
        this.init();
      } else if (type == "PolicyToFromTitle") {
        this.PolicyToFromClass = "";
        this.PolicyToFromTitle = "";
        this.chosePolicysources = "";
        this.init();
      } else if (type == "PolicyTypeTitle") {
        this.PolicyTypeClass = 0;
        this.PolicyTypeTitle = "";
        this.chosenPolicycategories = "";
        this.init();
      } else if (type == "industryTypeTitle") {
        this.industryTypeClass = 0;
        this.industryTypeTitle = "";
        this.chosenIndustries = "";
        this.init();
      } else if (type == "publishTimeTitle") {
        this.publishTimeClass = 0;
        this.publishTimeTitle = "";
        this.chosenPublishYear = "";
        this.init();
      } else if (type == "allAreaTitle") {
        this.allAreaClass = 0;
        this.allAreaTitle = "";
        this.chosenAreaCode = "";
        this.user.searchProvince = "";
        this.init();
      }
    },
    // 区域选择
    allAreaClick(num) {
      this.allAreaClass = num;
      if (num == 0) {
        this.allAreaTitle = "全部";
      } else {
        this.allAreaTitle = "全国";
      }
      this.user.searchProvince = "";
      this.init();
    },
    // 政策类型
    PolicyTypeSelect(id, index, val) {
      this.PolicyTypeTitle = val;
      this.PolicyTypeClass = index;
      if (id == 0) {
        this.chosenPolicycategories = "";
      } else {
        this.chosenPolicycategories = id;
      }
      this.init();
    },
    // 产业类型
    industryTypeSelect(id, index, val) {
      this.industryTypeTitle = val;
      this.industryTypeClass = index;
      if (id == 0) {
        this.chosenIndustries = "";
      } else {
        this.chosenIndustries = id;
      }
      this.init();
    },
    // 政策级别标签选择
    LevelSelect(index, item, value) {
      this.PolicyLevelTitle = item;
      this.LevelClass = index;
      // this.PolicyToFromTitle = (index == 0)?'':value
      if (index == 1) {
        this.provenanceOne = true;
        this.provenanceTwo = false;
        this.provenanceThree = false;
        this.provenanceFore = false;
      } else if (index == 2) {
        this.provenanceOne = false;
        this.provenanceTwo = true;
        this.provenanceThree = false;
        this.provenanceFore = false;
      } else if (index == 3) {
        this.provenanceOne = false;
        this.provenanceTwo = false;
        this.provenanceThree = true;
        this.provenanceFore = false;
      } else if (index == 4) {
        this.provenanceOne = false;
        this.provenanceTwo = false;
        this.provenanceThree = false;
        this.provenanceFore = true;
      }
      this.chosenLevel = value;
      this.PolicyToShow = index == 0 ? false : true;

      this.init();
    },
    // 政策出处标签选择
    PolicysourcesSelect(index, item, id) {
      this.PolicyToFromClass = index;
      this.PolicyToFromTitle = item;
      this.chosePolicysources = id;
      this.init();
    },
    // 发布年份标签选择
    PublishDate(val, index) {
      this.publishTimeClass = index;
      this.publishTimeTitle = val;
      if (index == 0) {
        this.chosenPublishYear = "";
      } else {
        this.chosenPublishYear = val;
      }
      this.init();
    },
    // 有效时间
    BeginTime(data) {
        var month = data.getMonth()+1
        if(month<10){
            month = '0'+month
        }else{
            month = month
        }
        console.log(data.getMonth)
        var dd = data.getDate()
        if(dd<10){
            dd= '0'+dd
            console.log(dd)
        }else{
            dd = dd
        }
      var data_value = data.getFullYear() + "-" + month + "-" + dd;
      this.chosenBeginTime = data_value;
    },
    EndTime(data) {
         var month = data.getMonth()+1
        if(month<10){
            month = '0'+month
        }else{
            month = month
        }
        var dd = data.getDate()
        if(dd<10){
            dd= '0'+dd
            console.log(dd)
        }else{
            dd = dd
        }
      var data_value = data.getFullYear() + "-" + month + "-" + dd;
      this.chosenEndTime = data_value;
      this.init();
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>
<style>
.distpicker-address-wrapper select {
  padding: 0;
  height: 32px;
  font-size: 14px;
  margin-right: 10px;
}
.sort-warp .st-nav .n-list .sortActive {
  color: #367af0;
}
</style>

<style scoped>
.g-list11 {
  width: 100%;
  border-bottom: solid #ddd 1px;
  padding: 0 10px;
  height: 49px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.g-list11 .glist-left {
  width: 15%;
  float: left;
  padding: 10px 0 0 10px;
  font-size: 14px;
  color: #14579e;
  letter-spacing: 0.43px;
  font-weight: 600;
}
.g-list11 .filtrate {
  width: 80%;
  float: left;
  padding: 7px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-left: solid #ddd 1px;
}
.g-list11 .filtrate span {
  display: inline-block;
  margin-right: 10px;
  color: #000;
}
.datepicker-popup {
  z-index: 10;
}

.search-wrap {
  width: 1170px;
  margin: 0 auto;
}
.search-wrap .screen-box {
  width: 100%;
}
.search-wrap .screen-box .crunmb-nav {
  background: #e7e7e7;
  padding: 10px;
  box-sizing: border-box;
}
.search-wrap .screen-box .crunmb-nav a {
  display: inline-block;
  margin-right: 10px;
  padding: 5px 10px;
  box-sizing: border-box;
  cursor: default;
}
.crunmb-nav .close {
  cursor: pointer;
}
.search-wrap .screen-box .crunmb-nav .all-nav {
  border: 0 solid #d4d4d4;
  background: #fff;
  font-size: 12px;
  color: #666666;
  letter-spacing: 0.43px;
}
.search-wrap .screen-box .crunmb-nav .all-nav i {
  background: url("../../images/combg.png");
  display: inline-block;
  height: 16px;
  width: 16px;
  background-position: -101px 0;
  float: left;
  margin-top: 3px;
}
.search-wrap .screen-box .crunmb-nav .search-key {
  background: #367af0;
  border: 0 solid #d4d4d4;
  color: #fff;
}
.search-wrap .screen-box .crunmb-nav .search-key span {
  margin-left: 5px;
}
.search-wrap .screen-box .crunmb-gird {
  width: 100%;
  background: #fff;
}
.search-wrap .screen-box .crunmb-gird .g-list {
  width: 100%;
  overflow: hidden;
  border-bottom: solid #ddd 1px;
  padding: 0 10px;
  box-sizing: border-box;
}
.search-wrap .screen-box .crunmb-gird .g-list .glist-left {
  width: 15%;
  float: left;
  padding: 10px 0 0 10px;
  font-size: 14px;
  color: #14579e;
  letter-spacing: 0.43px;
  font-weight: 600;
}
.search-wrap .screen-box .crunmb-gird .g-list .filtrate {
  width: 80%;
  float: left;
  padding: 7px 10px;
  box-sizing: border-box;
  border-left: solid #ddd 1px;
}
.search-wrap .screen-box .crunmb-gird .g-list .filtrate form {
  display: inline-block;
}
.selctcity {
  display: inline-block;
  overflow: hidden;
}
.selctcity .form-group {
  display: inline-block;
  float: left;
  margin-left: 20px;
}
.search-wrap .screen-box .crunmb-gird .g-list .filtrate a {
  display: inline-block;
  float: left;
  padding: 0 10px;
  box-sizing: border-box;
}
.classBg {
  color: #fff;
  background: #367af0;
}

.form-control {
  height: 32px;
  padding: 3px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.search-wrap .screen-box .crunmb-gird .g-list .filtrate span {
  display: inline-block;
  margin-right: 10px;
}

.ck-more {
  width: 100%;
  /* border-top: #ddd dashed 1px; */
  text-align: center;
}
.ck-more .flodbox {
  width: 60px;
  height: 33px;
  margin: 3px auto;
  background: #367af0;
  cursor: pointer;
  border-radius: 2px;
}
.ck-more .flodbox span {
  display: block;
  color: #fff;
  font-size: 11px;
  margin-top: -4px;
}
.ck-more .flodbox .arrow_d {
  display: block;
  background: url("../../images/combg.png");
  height: 20px;
  width: 20px;
  background-position: -210px 0;
  margin: 0 auto;
}
.show {
  display: block;
}
.ck-more .flodbox .arrow-b-up {
  display: block;
  background: url("../../images/combg.png");
  height: 20px;
  width: 20px;
  background-position: -170px 0;
  margin: 0 auto;
}
.sort-warp {
  width: 100%;
  margin-top: 10px;
}
.sort-warp {
  width: 100%;
  margin-top: 10px;
}
.sort-warp .st-nav {
  background: #e7e7e7;
  padding: 0px 10px;
  box-sizing: border-box;
  overflow: hidden;
  height: 45px;
  line-height: 45px;
}
.sort-warp .st-nav .n-list {
  float: left;
  border-right: 1px solid #ccc;
  width: 125px;
  text-align: center;
  position: relative;
}
.sort-warp .st-nav .n-list span {
  display: inline-block;
}
.sort-warp .st-nav .n-list .time_top {
  display: block;
  position: absolute;
  top: -8px;
  right: 20px;
}
.time_top .top_sort {
  height: 0px;
  width: 0px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 8px solid #9e9e9e;
}
.time_top .down_sort {
  position: absolute;
  top: 33px;
  left: 0;
  height: 0px;
  width: 0px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #9e9e9e;
}
.time_top .sortTopActive {
  height: 0px;
  width: 0px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 8px solid #367af0;
}
.time_top .sortDownActive {
  height: 0px;
  width: 0px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 8px solid #367af0;
}
.triangle_top,
.triangle_bottom,
.top-b,
.btm-b {
  background: url("../../images/combg.png");
  display: block;
}
.triangle_top {
  height: 9px;
  width: 9px;
  background-position: -18px 0;
}
.triangle_bottom {
  height: 9px;
  width: 9px;
  background-position: -27px 0;
}
.top-b {
  height: 9px;
  width: 9px;
  background-position: -36px 0;
}
.btm-b {
  height: 9px;
  width: 9px;
  background-position: 0 0;
}
.pol-number {
  float: right;
  margin-right: 20px;
  font-size: 14px;
  color: #595757;
  letter-spacing: 0.5px;
}
.pol-number span {
  color: #ff0000;
}
.sort-warp .Policylist {
  width: 100%;
  background: #fff;
  padding: 10px;
  box-sizing: border-box;
}
.Policylist ul li {
  border: 1px solid #979797;
  padding: 20px 0 20px 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  overflow: hidden;
}
.Policylist ul li .fl {
  display: inline-block;
  float: left;
}
.Policylist ul li .matter {
  width: 62%;
  float: left;
  overflow: hidden;
  border-right: #979797 solid 1px;
  padding-right: 20px;
  box-sizing: border-box;
}
.Policylist ul li .matter .m-pc {
  width: 25%;
  float: left;
}
.Policylist ul li .matter .m-pc img {
  width: 142px;
  height: 142px;
}
.Policylist ul li .matter .mat-text {
  width: 75%;
  float: left;
  font-size: 12px;
}
.Policylist ul li .matter .mat-text h3 {
  font-size: 16px;
  color: #14579e;
  letter-spacing: 2px;
  margin-bottom: 5px;
  cursor: pointer;
  /* text-decoration: underline */
}
.Policylist ul li .matter .mat-text p {
  font-size: 12px;
  color: #48494a;
  line-height: 24px;
  overflow: hidden;
  height: 144px;
  text-overflow: ellipsis;
}
.Policylist ul li .tag-box {
  width: 20%;
  float: left;
  padding-left: 20px;
  padding-top: 40px;
  line-height: 30px;
  box-sizing: border-box;
}
.Policylist ul li .tag-box p {
  width: 100%;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.Policylist ul li .tag-box span {
  font-size: 14px;
  color: #2b2b2b;
  line-height: 26px;
  font-weight: 600;
}
.Policylist ul li .other-item {
  width: 17.8%;
  height: 153px;
  float: left;
  text-align: center;
  padding-top: 20px;
  border-left: #979797 solid 1px;
}
.Policylist ul li .other-item a {
  display: block;
  width: 110px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 20px auto;
}
.declare {
  background: #367af0;
  color: #fff;
}
.evaluation {
  border: 1px solid #979797;
  color: #2963ca;
}
/*��ҳ*/
.ipage {
  padding: 20px 0;
  color: #666;
  overflow: hidden;
  text-align: center;
}

.ipage a,
.ipage_list,
.ipagevalue {
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  font: 100 12px/24px microsoft yahei;
}

.ipage a,
.ipage_ellipsis {
  border: solid 1px #ddd;
  padding: 0 10px;
  background: #fff;
  margin-right: 5px;
  border-radius: 2px;
}

.ipage a:hover,
.ipage a.cur {
  text-decoration: none;
  color: #0d4ca3;
  border: 1px solid #0d4ca3;
}

.iup {
  margin-right: 10px;
}

.ipage_list a,
.ipage_list .ipage_ellipsis {
  float: left;
}

.ipagevalue {
  margin-left: 10px;
}

.ipagevalue input {
  vertical-align: middle;
}

.ipagevalue .ipage_num {
  height: 32px;
  margin: 0 8px;
  width: 50px;
  text-align: center;
  font: 14px/32px microsoft yahei;
}

.ipagevalue .ipage_submit {
  height: 38px;
  padding: 0 10px;
  font: 14px/38px microsoft yahei;
  margin-left: 10px;
  width: 50px;
  cursor: pointer;
}

.ipage .ino_page,
.ipage .ino_page:hover {
  color: #ccc;
  border-color: #ddd;
  cursor: default;
}
.noresult {
  width: 40%;
  margin: 60px auto;
  font-size: 14px;
  color: #367af0;
  letter-spacing: 0.5px;
  text-align: center;
}
.noresult .rest-tit {
  font-size: 20px;
  color: #595757;
  letter-spacing: 0.71px;
}
</style>
