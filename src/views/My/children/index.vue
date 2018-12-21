<template>
    <div class="ac-right  member-wp">
				<div class="mb-model">
            <div class="meb-tit">
              <h3><i class="meas-icon"></i>评测提醒：</h3>
              <span>当前有<b class="r">{{total}}</b>项业务提醒</span>
              <router-link to="/my/appraisa">查看更多&gt;</router-link>
            </div>
					<div class="tip-list">
              <ul v-if="listModel.length>0">
                <li v-for="(item,index) in listModel" :key="index">
                  <span>{{index+1}}.您有一项测评报告未申报 </span> 
                  <router-link :to="{path:'/my/appraisa/detail/'+item.id}" class="declare">立即申报&gt;</router-link> 
                </li>
              </ul>
              <div class="nomind" v-else>
                <i class="noreport"></i>
                <p>您当前没有评测报告：<span class="bl"> <router-link :to="{path:'/evaluation',query:{listId:''}}">立即测评&gt;</router-link></span></p>
              </div>
					</div>
				</div>
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="declare-icon"></i>申报提醒</h3>
            <router-link to="/my/order">查看更多&gt;</router-link>
					</div>
					<div class="tip-list">
						<ul v-if="orderModel.length>0">
							<li v-for="(item,index) in orderModel" :key="index">
                <!-- <router-link :to="{path:'/my/appraisa/detail/'+item.id}">
                <span>{{index+1}}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.applyTime |formatDateList}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您的“{{item.policyName}}”已申报</span> 
                <span  class="declare">查看详情&gt;</span></router-link>  -->
                <a href="javascript:;" style="cursor: default">
                <span>{{index+1}}.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.applyTime |formatDateList}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您的“{{item.policyName}}”已申报</span> 
                </a> 
              </li>
						</ul>
            <div class="nomind" v-else>
                <i class="nowarn"></i>
                <router-link  :to="{path:'/evaluation',query:{listId:''}}" class="evaluate">去测评</router-link>
                <router-link  :to="{path:'/booking',query:{id:''}}" class="declare">立即申报</router-link>
            </div>
					</div>
				</div>
				<!--常见问题-->
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="business-icon"></i>业务推荐</h3>
						<!-- <a href="#">查看更多&gt;</a> -->
					</div>
					<div class="business-item">
						<ul>
							<li class="bstitle"><span>推荐政策</span><span> <router-link  to="/search">查看更多&gt;</router-link></span></li>
							<li v-for="(item,index) in policyModel" :key="index">
                  <router-link  :to="{path:'/policydetail/'+item.id}">{{item.policyName}}</router-link>
              </li>
						</ul>
						<ul>
							<li class="bstitle"><span>推荐服务</span><span> <router-link to="/companie">查看更多&gt;</router-link></span></li>
							<li v-for="(item,index) in enterpriseServiceModel" :key="index">
                <router-link :to="{path:'/companie/detail/'+item.id}">{{item.title}}</router-link>
              </li>
						</ul>
					</div>
				</div>
			</div>
</template>

<script>
import { formatDate } from "../../../script/date.js";
export default {
  data() {
    return {
      appraisalLength: 0,
      declareLength: 5,
      listModel: [], //评测提醒
      total: "",
      orderModel: [], //申报提醒
      policyModel: [], //推荐政策
      enterpriseServiceModel: [] //推荐业务
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //申报提醒
      var params = {
        Applied: false,
        MaxResultCount: 5
      };
      this.$http
        .get("/policyapplys", {params})
        .then(res => {
          this.total = res.data.totalCount;
          this.orderModel = res.data.items;
        })
        .catch(err => {
          console.log(err);
        });
      // 评测提醒
      this.$http
        .get("/policytestreports", {params})
        .then(res => {
          this.total = res.data.totalCount;
          this.listModel = res.data.items;
        })
        .catch(err => {
          console.log(err);
        });
      // 推荐政策
      this.$http
        .get("/policies/featured", { params: { MaxResultCount: 5 } })
        .then(res => {
          this.policyModel = res.data;
        })
        .catch(err => {
          console.log(err);
        });
      // 推荐企业
      this.$http
        .get("/enterprises/featured", { params: { MaxResultCount: 5 } })
        .then(res => {
          this.enterpriseServiceModel = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  filters: {
    formatDateList(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    }
  }
};
</script>

<style scoped>
.member-wp {
  padding: 0;
  background: none;
}
.member-wp .mb-model {
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
  overflow: hidden;
}

.meb-tit .r {
  color: #ff0000;
}
.member-wp .meas-icon {
  background-position: -722px 0;
}
.meb-tit .declare-icon {
  height: 36px;
  width: 36px;
  background-position: -686px 0;
}
.member-wp .business-icon {
  background-position: -794px 0;
}
.meb-tit a {
  float: right;
  margin-right: 20px;
  line-height: 50px;
  color: #fff;
}
.meb-tit a:hover {
  color: #000;
  text-decoration: underline;
}
.meb-tit span {
  float: left;
  font-size: 14px;
  color: #fefefe;
  letter-spacing: 0.88px;
  line-height: 50px;
}
.member-wp .mb-model .tip-list {
  padding: 10px 20px;
  box-sizing: border-box;
}
.member-wp .mb-model ul li {
  width: 100%;
  border-bottom: #ddd dashed 1px;
  height: 40px;
  line-height: 40px;
}
.member-wp .mb-model .tip-list span {
  float: left;
  margin-right: 20px;
}
.member-wp .mb-model .nomind span {
  float: none;
}
.member-wp .mb-model .nomind a {
  color: #326cd1;
  float: none;
}
.member-wp .mb-model .tip-list .declare {
  color: #326cd1;
}

.business-item {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
.business-item ul {
  width: 406px;
  float: left;
  margin-right: 20px;
  border: 1px solid #979797;
  padding: 10px;
  box-sizing: border-box;
}
.member-wp .mb-model ul li {
  width: 100%;
  border-bottom: #ddd dashed 1px;
  height: 40px;
  line-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.business-item ul:last-child {
  margin-right: 0;
}
.business-item .bstitle span {
  font-size: 16px;
  font-weight: 600;
  color: #326cd1;
}
.business-item .bstitle a {
  position: absolute;
  float: right;
  color: #326cd1;
  right: 5px;
  font-size: 14px;
  font-weight: normal;
}
.bstitle a:hover {
  text-decoration: underline;
}
.business-item .bstitle {
  position: relative;
}

.mb-model .nomind {
  text-align: center;
  padding: 30px;
  box-sizing: border-box;
}
.mb-model .nomind i {
  background: url("../../../images/combg.png");
}
.mb-model .nomind .noreport {
  display: block;
  height: 120px;
  width: 120px;
  background-position: -3291px 0;
  margin: 0 auto;
}
.mb-model .nomind .nowarn {
  display: block;
  margin: 0 auto;
  height: 120px;
  width: 120px;
  background-position: -3171px 0;
}
.member-wp .mb-model .nomind .evaluate {
  background: #2963ca;
  width: 110px;
  height: 31px;
  line-height: 31px;
  display: inline-block;
  color: #fff;
  font-weight: bold;
  margin-right: 20px;
}
.member-wp .mb-model .nomind .declare {
  background: #fff;
  border: 1px solid #979797;
  width: 110px;
  height: 31px;
  line-height: 31px;
  display: inline-block;
  color: #2963ca;
  font-weight: bold;
}
</style>
