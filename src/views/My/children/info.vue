            <template>
    			<div class="ac-right  member-wp">
                    <div class="mb-model">
                        <div class="meb-tit">
                            <h3><i class="basic-icon"></i>基本信息</h3>
                        </div>
                        <div class="past-wp">
                            <div class="basic-box" v-if="isInfo">
                                <div class="bs-left">
                                    <div class="user-img">
                                        <img :src="baeUrl+'/'+userModel.imgUrl">
                                    </div>
                                    <div class="use-name">
                                        <i class="up-icon"></i>
                                        <span>{{userModel.realName}}</span>
                                    </div>
                                </div>
                                <div class="bs-right">
                                    <dl>
                                        <dd><span>账户名称：</span><p>{{userModel.userName}}</p><a href="#" class="buletext" style="display:none">修改</a></dd>
                                        <dd><span>真实姓名：</span><p>{{userModel.realName}}</p></dd>
                                    </dl>
                                    <dl>
                                        <dd><span>工作单位：</span><p>{{userModel.companyName}}</p></dd>
                                        <dd><span>联系方式：</span><p>{{userModel.phoneNumber}}</p></dd>
                                    </dl>
                                    <dl>
                                        <dd><span>电子邮箱：</span><p>{{userModel.emailAddress}}</p></dd>
                                        <!-- <span href="javascript:;" class="blue" @click="modifyInfo">修改基本信息</span> -->
                                        <router-link   class="blue" to='/my/amendInfo'>修改基本信息</router-link>
                                    </dl>
                                </div>
                            </div>
                            <!-- <myAmend @amendData='changData'  ref="myAmend"  v-else ></myAmend> -->
                        </div>
                    </div>
                    <router-view></router-view>
                </div>
                
            </template>

<script>
import myAmend from '../children/amend'
import config from '../../../appsettings'
export default {
    data(){
        return{
            isInfo:true,
            userModel:[],
            baeUrl:config.Api_Url
        }
    },
    created(){
    },
    mounted(){
        this.init()
    },
    components:{
        myAmend
    },
    methods:{
        init(){
            this.$http.get('/account/epns_detail').then(res=>{
                // console.log(res)
                this.userModel = res.data
            }).catch(err=>{
                console.log(err)
            })
        },
        changData(data){
            this.isInfo = true
        },
        modifyInfo(){
            this.$router.push({name:'myAmendInfo',params:{type:'info'}})           
        },
      
    }
}
</script>

<style scoped>
.member-wp .basic-icon {
    background-position: -938px 0;
}
.member-wp .mb-model .past-wp {
    padding: 20px 10px;
    box-sizing: border-box;
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
.basic-box .bs-left .user-img {
    width: 168px;
    height: 168px;
    box-shadow: 2px 3px 2px #979797;
    margin: 20px auto;
    overflow: hidden;
    border-radius: 50%
}
.user-img img{
    width: 100%;
    height: 100%;
}
.basic-box .bs-left .use-name {
    text-align: center;
    width: 40%;
    margin: 0 auto;
    margin-bottom: 20px;
}
.up-icon {
    background: url('../../../images/combg.png') no-repeat;
    background-position: -2599px -54px;
    width: 18px;
    height: 19px;
    display: block;
    float: left;
    margin-top: 3px;
}
.basic-box .bs-right {
    width: 70%;
    float: left;
    padding-left: 30px;
    padding-top: 60px;
    border-left: #979797 solid 1px;
    box-sizing: border-box;
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
    color: #2963CA;
    font-weight: 600;
}
.basic-box .bs-right dl dd p{
    width:72%;
    float: right;
    height: 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.basic-box .bs-right dl dd .buletext {
    margin-left: 20px;
}
.buletext {
    color: #2963CA;
}
.basic-box .blue {
    background: #2963CA;
    color: #fff;
    width: 168px;
    height: 35px;
    line-height: 35px;
    display: inline-block;
    text-align: center;
    cursor: pointer;
}
</style>
