<template>
    <div class="side-float">
        
        <ul style="position:absolute;z-index:99">
            <li class="top" @click="top"><a href="javaScript:;"> <i></i></a></li>
            <li class="kefu_c"><a target="_Blank" href="http://p.qiao.baidu.com/cps2/chatIndex?reqParam=%7B%22from%22%3A0%2C%22sessionid%22%3A%22%22%2C%22siteId%22%3A%2211390259%22%2C%22tid%22%3A%22-1%22%2C%22userId%22%3A%2218851283%22%2C%22ttype%22%3A1%7D"> <i></i></a></li>
            <li class="collect">
                <router-link to="/my/collect">
                    <a href='javascript:;'><i></i></a>
                    <div class="myCollect" v-show="isShow">我的收藏(<b style="color:red" v-show="total>0">&nbsp;{{total}}&nbsp;</b>)</div>
                </router-link>
                
            </li>
        </ul>
    </div>
</template>

<script>
$(function() {
  $(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
      $(".side-float").fadeIn();
    } else {
      $(".side-float").fadeOut();
    }
  });
});
export default {
  data() {
    return {
      total: "",
      token: "",
      isShow: false
    };
  },
  created() {
    this.token = localStorage.getItem("token");
  },
  mounted(){
      this.init()
  },
  methods: {
    top() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        800
      );
      return false;
    },
    init() {
      if (!this.token) {
        this.isShow = false;
      } else {
        this.isShow = true;
        var params = {
          SkipCount: this.pageCount,
          MaxResultCount: 10
        };
        this.$http
          .get("/policies/followed", {
            params,
            headers: {
              Authorization: "Bearer " + this.token
            }
          })
          .then(res => {
            this.total = res.data.totalCount;
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>

<style scoped>
.myCollect {
  position: absolute;
  top: 100px;
  left: -115px;
  width: 115px;
  background: #367af0;
  height: 47px;
  line-height: 47px;
  z-index: 1;
  color: #fff;
  text-align: center;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
.side-float {
  position: fixed;
  right: 0;
  width: 47px;
  z-index: 999;
  top: 75%;
  display: none;
}
.side-float ul li {
  margin-bottom: 3px;
  z-index: 99;
}
.side-float .top i {
  display: block;
  height: 47px;
  width: 47px;
  background-position: -1560px 0;
}
.side-float .kefu_c i {
  display: block;
  height: 47px;
  width: 47px;
  background-position: -1466px 0;
}
.side-float .kefu_c i:hover {
  height: 47px;
  width: 47px;
  background-position: -1513px 0;
}
.side-float .collect i {
  display: block;
  height: 47px;
  width: 47px;
  background-position: -1419px 0;
}
.side-float .collect i:hover {
  display: block;
  height: 47px;
  width: 47px;
  background-position: -1372px 0;
}
</style>
