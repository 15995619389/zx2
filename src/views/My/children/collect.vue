        <template>
            <div class="ac-right  member-wp">
		     <!--报告详情-->
				<div class="mb-model">
					<div class="meb-tit">
						<h3><i class="collen-icon"></i>我的收藏</h3>
					</div>
					<div class="tip-list past-wp">
						<table class="post-table">
							<thead>
							<tr>
							<td>编号</td>
							<td>政策名称</td>
							<td>收藏时间</td>
							</tr>
							</thead>
							<tbody class="filltbd">
							<tr v-for="(item,index) in listModel.items" :key="index">
								<td>{{index+1}}</td>
								<td>
                    <router-link :to="{path:'/policydetail/'+item.policyId}" class="buletext">{{item.policyName}}</router-link>
                </td>
								<td>{{item.followedTime | formatDate}}</td>
							</tr>
							</tbody>    
						</table>
						<!-- <div class="ipage gain_right" id="pagination"><a href="#">上一页</a> <a class="cur" href="#">1</a><a class="page-index" href="#">2</a><a class="page-index" href="#">3</a><a href="#">下一页</a> </div> -->
                         <v-pagination :total="total" :size="size" :page="page" :changge="pageFn" style="margin-top:50px"></v-pagination>
                    </div>
                </div>
            </div>
        </template>

<script>
import pagination from "../../Common/pageination";
import { formatDate } from "../../../script/date.js";
export default {
  data() {
    return {
      listModel: [],
      total:'' , //总个数
      size: 10, //每页显示个数
      page: 1, //当前页
      pageCount: "",
      token: "",
      PageSkipCount: 10
    };
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  mounted() {
    this.initData();
  },
  components: {
    "v-pagination": pagination
  },
  methods: {
    initData() {
      var params = {
            SkipCount: this.pageCount,
            MaxResultCount: 10
      }
      this.$http.get("/policies/followed",{params})
        .then(res => {
          this.total = res.data.totalCount
          this.listModel = res.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 页面点击切换执行
    pageFn(val) {
      this.page = val;
      this.pageCount = (val * 10) - 10;
      this.initData();
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

<style scoped>
.member-wp .collen-icon {
  background-position: -1262px 0;
}
.member-wp .mb-model .past-wp {
  padding: 20px 10px;
  box-sizing: border-box;
}
.post-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #979797;
}
.post-table td {
  height: 20px;
  border: 1px solid #979797;
  text-align: center;
}
.post-table thead tr td {
  color: #2963ca;
  font-weight: 600;
  height: 35px;
  font-size: 13px;
}
.post-table tbody tr td {
  padding: 10px 0;
  box-sizing: border-box;
  font-size: 12px;
}
.post-table .filltbd tr td {
  padding: 20px 10px;
  box-sizing: border-box;
}
.member-wp .collen-icon {
  background-position: -1262px 0;
}
.member-wp .basic-icon {
  background-position: -938px 0;
}
.basic-box {
  border: 1px solid #979797;
  overflow: hidden;
  margin-bottom: 250px;
}
.basic-box .bs-left {
  width: 30%;
  float: left;
  text-align: center;
  padding-right: 30px;
  box-sizing: border-box;
}
.basic-box .bs-right {
  width: 70%;
  float: left;
  padding-left: 80px;
  padding-top: 60px;
  border-left: #979797 solid 1px;
  box-sizing: border-box;
}
.basic-box .bs-left .user-img {
  width: 168px;
  height: 168px;
  box-shadow: 2px 3px 2px #979797;
  margin: 20px auto;
}
.basic-box .bs-left .use-name {
  text-align: center;
  width: 40%;
  margin: 0 auto;
  margin-bottom: 20px;
}
.basic-box .bs-right dl {
  display: block;
  overflow: hidden;
  margin-bottom: 20px;
}
.basic-box .bs-right dl dd {
  float: left;
  width: 50%;
}
.basic-box .bs-right dl dd span {
  color: #2963ca;
  font-weight: 600;
}
.basic-box .bs-right dl dd .buletext {
  margin-left: 20px;
}
.buletext {
  color: #2963ca;
}
.buletext:hover {
  text-decoration: underline;
}
</style>
