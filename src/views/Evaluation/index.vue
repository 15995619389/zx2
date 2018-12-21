<template>
    <div>
        <searchHeader></searchHeader>
        <Banner></Banner>
        <div class="c-container">
            <div class="ceping-wrap">
                <div class="flow-nav">
                    <ul>
                        <li>
                            <i class="basci"></i><span class="org">基本信息</span><i class="org-line"></i>                           
                        </li>
                        <li>
                            <span v-if="FinanceClass" style="margin:0">
                                <i class="finance_0"></i><span class="org">企业财务状况</span><i class="org-line"></i>
                            </span>
                            <span v-else style="margin:0">
                               <i class="finance"></i><span class="blue">企业财务状况</span><i class="blue-line"></i>
                            </span>
                        </li>
                        <li>
                            <span style="margin:0" v-if="EquityClass">
                                <i class="equity_O"></i><span class="org">知识产权状况</span><i class="org-line"></i>
                            </span>
                            <span style="margin:0" v-else>
                               <i class="equity"></i><span class="blue">知识产权状况</span><i class="blue-line"></i>
                            </span>
                        </li>
                        <li>
                            <span style="margin:0" v-if="BotClass">
                                <i class="bot_0"></i><span class="org">企业建设状况</span>
                            </span>
                            <span style="margin:0" v-else>
                                <i class="bot"></i><span class="blue">企业建设状况</span>
                            </span>
                        </li>
                    </ul>
                </div>
                <div>
                        <!-- 1.基本信息 -->
                        <div class="ceping-form" v-show="isBasciShow">
                            <div>
                                <h2>基本信息输入</h2>
                                <div class="form-row">
                                    <span class="labels">申报地区：</span>
                                    <div class="row-rt address">
                                            <div class="form-inline">
                                                <v-distpicker :province="user.searchProvince" :city="user.searchCity" :area='user.searchArea' @province="onChangeProvince" @city="onChangeCity" @area='onChangeArea'></v-distpicker>
                                            </div>
                                            <p v-show="user.searchProvince.length<=0">{{user.ProvinceText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">所属领域：</span>
                                    <div class="row-rt">
                                        <select class="oth-control" v-model="infoModel.fieldSelest.fieldSelestId" @blur="fieldSelest(1)">
                                            <option v-for="item in infoModel.fieldSelest.list" :key="item.id" :value="item.id" @click="fieldOptions(item.id)">{{item.name}}</option>
                                        </select>
                                        <p>{{infoModel.fieldSelest.fieldSelestText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">注册地区：</span>
                                    <div class="row-rt">
                                        <input type="text" class="oth-control" v-model.trim="infoModel.address" @blur="basicInfoBlur(1)">
                                         <p>{{infoModel.addressText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">机构性质：</span>
                                    <div class="row-rt">
                                        <select class="oth-control" v-model="infoModel.institutionsSelect.institutionsSelestId" @blur="fieldSelest(2)">
                                            <option v-for="(item,index) in infoModel.institutionsSelect.list" :key="index" :value="item.id">{{item.name}}</option>
                                        </select>
                                        <p>{{infoModel.institutionsSelect.institutionsSelestText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">企业名称：</span>
                                    <div class="row-rt">
                                        <input type="text" class="oth-control" v-model.trim="infoModel.JobName" @blur="basicInfoBlur(2)">
                                        <p>{{infoModel.jobText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">  &nbsp;</span>
                                    <div class="row-rt">
                                        <!-- <button type="button" :class="infoModel.btnBg?'':'btn_bg'" @click="next(1)">下一步</button> -->
                                        <button type="button" :class="{'btn_bg':infoModel.btnBgColor}" @click="next(1)">下一步</button>
                                    </div>
                                </div>
                            </div>
                        </div>  
                        <!-- 2.企业财务 -->
                        <div class="ceping-form" v-show="isFinanceShow">
                            <div>
                                <h2>近3年的销售收入</h2>
                                <div class="form-row">
                                    <span class="labels">{{nowYear}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.LastYearMoney" @blur="FinanceBlur(1)">
                                        <span class="wan">万元</span>
                                        <p>{{financeModel.LastYearMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">{{nowBeforeYear}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.BeforeYearMoney" @blur="FinanceBlur(2)">
                                        <span class="wan">万元</span>
                                         <p>{{financeModel.BeforeYearMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">{{nowBeforeYearBefore}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.ThreeYearsAgoMoney" @blur="FinanceBlur(3)">
                                        <span class="wan">万元</span>
                                         <p>{{financeModel.ThreeYearsAgoMoneyText}}</p>
                                    </div>
                                </div>
                                <h2>近3年的研发投入</h2>
                                <div class="form-row">
                                    <span class="labels">{{nowYear}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.researchOneMoney" @blur="FinanceBlur(4)">
                                        <span class="wan">万元</span>
                                         <p>{{financeModel.researchOneMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">{{nowBeforeYear}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.researchTwoMoney" @blur="FinanceBlur(5)">
                                        <span class="wan">万元</span>
                                         <p>{{financeModel.researchTwoMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">{{nowBeforeYearBefore}}年：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.researchThreeMoney" @blur="FinanceBlur(6)">
                                        <span class="wan">万元</span>
                                         <p>{{financeModel.researchThreeMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">注册资金：</span>
                                    <div class="row-rt">
                                        <input class="oth-control mon-ipt" type="text" placeholder="请输入整数数值，不支持小数数值录入" v-model="financeModel.registeredMoney" @blur="FinanceBlur(7)"/>
                                        <span class="wan">万元</span>
                                        <p>{{financeModel.registeredMoneyText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">利润率：</span>
                                    <div class="row-rt">
                                        <!-- <form id="chekid">
                                            <span class="chek-item">
                                                <input type="radio"  value="1" v-model="financeModel.profits">
                                                >20%
                                            </span>
                                            <span class="chek-item">
                                                <input type="radio" value="2" v-model="financeModel.profits">
                                                10%≤X≤20%
                                            </span>
                                            <span class="chek-item">
                                                <input type="radio" value="3" v-model="financeModel.profits">
                                                5%≤X≤10%
                                            </span>
                                            <span class="chek-item">
                                                <input type="radio" value="4" v-model="financeModel.profits">
                                                1%≤X&lt;5%
                                            </span>
                                                <br>
                                            <span class="chek-item">
                                                <input type="radio" value="5" v-model="financeModel.profits">
                                                0%≤X&lt;1%
                                            </span>
                                            <span class="chek-item">
                                                <input type="radio" value="6" v-model="financeModel.profits">
                                                0%以下
                                            </span>
                                           {{financeModel.profits}}
                                        </form> -->
                                        <input class="oth-control mon-ipt" type="text" placeholder="请输入利润率"  v-model="financeModel.profits" @blur="FinanceBlur(8)"/>
                                        <span class="wan">%</span>
                                        <p>{{financeModel.profitsText}}</p>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <span class="labels">&nbsp;</span>
                                    <div class="row-rt">
                                        <a href="javascript:;" class="next" @click="previous(1)">上一页</a>
                                        <a href="javascript:;" class="previous" @click="next(2)">下一页</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 3.知识产权 -->
                        <div class="ceping-form equity-fm" v-show="isEquityShow">
                             <div class="Pro-wrp">
                                <div class="cq-title" style="margin-top: 0;">
                                    <h2>发明专利</h2>
                                    <span>2项</span>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">自主研发：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.inventOne" @blur="EquityBlur(1)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.inventOneText}}</p>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">受让、受赠和并购等：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.inventTwo" @blur="EquityBlur(2)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.inventTwoText}}</p>
                                </div>
                                <div class="cq-title">
                                    <h2>实用型专利</h2>
                                    <span>2项</span>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">自主研发：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.practicalOne" @blur="EquityBlur(3)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.practicalOneText}}</p>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">受让、受赠和并购等：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.practicalTwo" @blur="EquityBlur(4)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.practicalTwoText}}</p>
                                </div>
                                <div class="cq-title">
                                    <h2>软件著作权</h2>
                                    <span>2项</span>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">自主研发：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.softwareOne" @blur="EquityBlur(5)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.softwareOneText}}</p>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">受让、受赠和并购等：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.softwareTwo" @blur="EquityBlur(6)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.softwareTwoText}}</p>
                                </div>
                                <div class="cq-title">
                                    <h2>外观专利设计</h2>
                                    <span>2项</span>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">自主研发：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.aspectOne" @blur="EquityBlur(7)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.aspectOneText}}</p>
                                </div>
                                <div class="form-row">
                                    <div style="overflow:hidden">
                                        <span class="labels fim">受让、受赠和并购等：</span>
                                        <div class="row-rt">
                                            <input class="oth-control mon-ipt"  v-model="equityModel.aspectTwo" @blur="EquityBlur(8)">
                                            <span class="wan">项</span>
                                        </div>
                                    </div>
                                    <p style="color:red">{{equityModel.aspectTwoText}}</p>
                                </div>
                                <div class="form-row">
                                    <span class="labels" style="width: 23%">产学研究合作：</span>
                                    <div class="row-rt">
                                        <span class="chek-item">
                                            <input type="radio"  value="true" v-model="equityModel.cooperateRadio">
                                            是
                                        </span>
                                        <span class="chek-item">
                                            <input type="radio" value="false" v-model="equityModel.cooperateRadio">
                                            否
                                        </span>
                                    </div>
                                    <p style="color:red">{{equityModel.cooperateRadioText}}</p>
                                </div>
                                <div class="form-row">
                                    <a href="javascript:;" class="next" @click="previous(2)">上一页</a>
                                    <a href="javascript:;" class="previous" style="margin-right:0;" @click="next(3)">下一页</a>
                                </div>
                            </div>
                        </div>
                        <!-- 4.企业建设 -->
                        <div class="ceping-form equity-fm" v-show="isBotShow">
                            <h2>团队建设</h2>
                            <div class="form-row">
                                <span class="labels fim">企业管理人员总数：</span>
                                <div class="row-rt">
                                    <div>
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="botModel.managementPeople" @blur="BotBlur(1)">
                                        <span class="wan">人</span>
                                    </div>
                                    <p>{{botModel.managementText}}</p>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels fim">企业技术人员总数：</span>
                                <div class="row-rt">
                                    <div>
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="botModel.technologyPeople" @blur="BotBlur(2)">
                                        <span class="wan">人</span>
                                    </div>
                                    <p>{{botModel.technologyText}}</p>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels fim">企业人员总数：</span>
                                <div class="row-rt">
                                    <div>
                                        <input class="oth-control mon-ipt" placeholder="请输入整数数值，不支持小数数值录入" v-model="botModel.allPeople" @blur="BotBlur(3)">
                                        <span class="wan">人</span>
                                    </div>
                                    <p>{{botModel.allText}}</p>
                                </div>
                            </div>
                            <h2>企业已获资质</h2>
                            <div class="form-row">
                                <span class="labels" style="width: 28%">承担国家、省、市项目：</span>
                                <div class="row-rt">
                                    <label class="chek-item" @change="Project('countries')">
                                        <input type="checkbox" name="profit"  value="国家" v-model="botModel.countriesCkeckbox">国家
                                    </label>
                                    <label class="chek-item" @change="Project('province')">
                                        <input type="checkbox" name="profit"  value="省级" v-model="botModel.provinceCkeckbox">省级
                                    </label>
                                    <label class="chek-item" @change="Project('city')">
                                        <input type="checkbox" name="profit"  value="市级" v-model="botModel.CityCkeckbox">市级
                                    </label>
                                  <b style="color:red"> {{botModel.cityCkeck}}</b>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels">体系认证情况：</span>
                                <div class="row-rt">
                                    <span class="chek-item">
                                        <input type="radio"  v-model='botModel.systemRadio' value="true">
                                        有
                                    </span>
                                    <span class="chek-item">
                                        <input type="radio"  v-model='botModel.systemRadio' value="false">
                                        无
                                    </span>
                                    <b style="color:red">{{botModel.systemText}}</b>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels">是否高企：</span>
                                <div class="row-rt">
                                    <span class="chek-item">
                                        <input type="radio" v-model="botModel.highRadio" value="true">
                                        是
                                    </span>
                                    <span class="chek-item">
                                        <input type="radio" v-model="botModel.highRadio" value="false">
                                        否
                                    </span>
                                    <b style="color:red">{{botModel.highRadioText}}</b>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels">是否上市：</span>
                                <div class="row-rt">
                                    <span class="chek-item">
                                        <input type="radio" v-model="botModel.listedRadio"  value="true">
                                        是
                                    </span>
                                    <span class="chek-item">
                                        <input type="radio"  v-model="botModel.listedRadio"  value="false">
                                        否
                                    </span>
                                    <b style="color:red">{{botModel.listedText}}</b>
                                </div>
                            </div>
                            <div class="form-row">
                                <span class="labels">&nbsp;</span>
                                <div class="row-rt">
                                    <a href="javascript:;" class="previous" @click="next(4)">提交</a>
                                    <a href="javascript:;" class="previous" style="margin-right:0;" @click="previous(3)">上一页</a>
                                </div>
                            </div>
                        </div>
                        <!-- 5提交信息 -->
                        <div class="ceping-form quick-wp SubmintData" v-show="isSubmintData">
                            <div class="form-row quick-box">
                                <i class="supman"></i>
                                <p class="zxr-b">政小二正在努力赶制测评报告.....</p>
                                <p class="get-t">输入如下信息，快速获取报告</p>
                                <div class="inputText">
                                    <input class="oth-control mon-ipt" placeholder="请输入公司名称" v-model="submitInfoModel.jobName" @blur="inputBlur(1)">
                                    <p>{{submitInfoModel.msgJobName}}</p>
                                </div>
                                <div class="inputText">
                                    <input class="oth-control mon-ipt" placeholder="联系人姓名" v-model="submitInfoModel.username" @blur="inputBlur(2)">
                                    <p>{{submitInfoModel.msgName}}</p>
                                </div>
                                <v-phone ref="childrenPhone"></v-phone>
                                <button class="immediate" @click="submitInfoData">提&nbsp;&nbsp;&nbsp;&nbsp;交</button>
                            </div>
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
                            <strong>请先登录，才能查看测评报告！</strong>
                        </div>
                        <a href="javascript:;" class="pop_btn" @click="evaluation">确定</a>
                        <!-- <router-link class="pop_btn" :to="{path:'/evaluation/detail',query:{id:reportId}}">确定</router-link> -->
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import searchHeader from "../Search/search-header";
import VDistpicker from "v-distpicker";
import Banner from "../Common/banner";
import phone from "../Common/phoneNumber";

export default {
  data() {
    return {
      // 省份三级
      nowYear:'',
      nowBeforeYear:'',
      nowBeforeYearBefore:'',
      isLoginHide:false,
      reportId:'',//返回的id
      token: "",
      userId: "",
      user: {
        searchProvince: "",
        searchCity: "",
        searchArea: "",
        ProvinceText: "",
        choseArea: "",
        ProvinceCode: "",
        CityCode: "",
        AreaCode: ""
      },
      FinanceClass: false,
      EquityClass: false,
      BotClass: false,
      // 4步骤
      isBasciShow: true, //基本信息
      isFinanceShow: false, //企业财务
      isEquityShow: false, //知识产权
      isBotShow: false, //企业建设
      isSubmintData: false, //提交信息

      listShow: false,
      isclassShow: false,
      //基本信息
      infoModel: {
        address: "",
        addressText: "",
        JobName: "",
        jobText: "",
        fieldSelest: {
          list: [],
          fieldSelestId: '',
          fieldSelestText: ""
        },
        institutionsSelect: {
          list: [],
          institutionsSelestId: '',
          institutionsSelestText: ""
        },
        btnBgColor: false,
      },
      //企业财务
      financeModel: {
        LastYearMoney: "",
        BeforeYearMoney: "",
        ThreeYearsAgoMoney: "",
        researchOneMoney: "",
        researchTwoMoney: "",
        researchThreeMoney: "",
        LastYearMoneyText: "",
        BeforeYearMoneyText: "",
        ThreeYearsAgoMoneyText: "",
        researchOneMoneyText: "",
        researchTwoMoneyText: "",
        researchThreeMoneyText: "",
        registeredMoney: "",
        registeredMoneyText: "",
        profits: "",
        profitsText: "",
        hintText: "请重新输入，内容不能为空或超过30位整数！"
      },
      //知识产权
      equityModel: {
        inventOne: "",
        inventOneText: "",
        inventTwo: "",
        inventTwoText: "",
        practicalOne: "",
        practicalOneText: "",
        practicalTwo: "",
        practicalTwoText: "",
        softwareOne: "",
        softwareOneText: "",
        softwareTwo: "",
        softwareTwoText: "",
        aspectOne: "",
        aspectOneText: "",
        aspectTwo: "",
        aspectTwoText: "",
        cooperateRadio: "",
        cooperateRadioText: "",
        hintText: "请重新输入，内容不能为空或超过10位整数！"
      },
      // 企业建设
      botModel: {
        managementPeople: "",
        technologyPeople: "",
        allPeople: "",
        managementText: "",
        technologyText: "",
        allText: "",
        countriesCkeckbox: false,
        provinceCkeckbox: false,
        CityCkeckbox: false,
        systemRadio: "", //是否体系
        listedRadio: "", //是否上市
        highRadio: "", //是否高企
        highRadioText: "",
        cityCkeck: "",
        systemText: "",
        listedText: "",
        highText: "请重新输入，只支持录入阿拉伯整数内容！"
      },
      //提交表单
      submitInfoModel: {
        phoneNumber:'',
        username: "",
        msgName: "",
        jobName: "",
        msgJobName: "",
        hintText: "请重新输入，内容不能为空或超过100个字符！"
      }
    };
  },
  created() {
    this.token = localStorage.getItem("token");
    // console.log(this.token)
    // 所属领域
    this.$http.get("/industries")
      .then(res => {
        // console.log(res)
        this.infoModel.fieldSelest.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
    // 机构性质
    this.$http.get("/OrganizationCategories")
      .then(res => {
        this.infoModel.institutionsSelect.list = res.data
      })
      .catch(err => {
        console.log(err);
      });
      
  },
  mounted(){
    $('.address .distpicker-address-wrapper select').css({"width":"32.33%"})
    this.nowDate()
  },
  watch: {

  },
  components: {
    searchHeader,
    Banner,
    VDistpicker,
    "v-phone": phone
  },
  methods: {
    nowDate() {
      let mydate = new Date();
      this.nowYear = mydate.getFullYear();
      this.nowBeforeYear = this.nowYear-1
      this.nowBeforeYearBefore = this.nowYear-2
    },
    evaluation(){
      this.$router.push({path:'/evaluation/detail',query:{id:this.reportId}})
    },
    loginHide() {
      this.isLoginHide = false;
    },
    // 提交表单
    submitInfoData() {
      if(!this.ValidateSubmitData()){
          return false
      }
      if(!this.$refs.childrenPhone.Validate()){
          return false
      }
      if (this.user.CityCode == "") {
        this.user.CityCode = 0;
      }
      if (this.user.AreaCode == "") {
        this.user.AreaCode = 0;
      }
      this.getMax(this.user.ProvinceCode,this.user.CityCode,this.user.AreaCode);
      let id = this.$route.query.listId;
      if (this.botModel.systemRadio.length >= 0) {
        this.botModel.systemText = "";
      } else if (this.botModel.highRadio.length >= 0) {
        this.botModel.highText = "";
      } else if (this.botModel.listedRadio.length >= 0) {
        this.botModel.listedText = "";
      }
      var params = {
        areaCode: this.user.choseArea,
        industryId: this.infoModel.fieldSelest.fieldSelestId,
        registerAddress: this.infoModel.address,
        organizationCategoryId:this.infoModel.institutionsSelect.institutionsSelestId,  //机构性质
        companyName: this.infoModel.JobName,
        lastYearSalesRevenues: this.financeModel.LastYearMoney,
        theYearBeforeLastSalesRevenues: this.financeModel.BeforeYearMoney,
        threeYearsAgoSalesRevenues: this.financeModel.ThreeYearsAgoMoney,
        lastYearRndInvestment: this.financeModel.researchOneMoney,
        theYearBeforeLastRndInvestment: this.financeModel.researchTwoMoney,
        threeYearsAgoRndInvestment: this.financeModel.researchThreeMoney,
        registerdCapital: this.financeModel.registeredMoney,
        profitMargin: this.financeModel.profits,
        inventionPatentCount: this.equityModel.inventOne,
        otherInventionPatentCount: this.equityModel.inventTwo,
        utilityPatentCount: this.equityModel.practicalOne,
        otherUtilityPatentCount: this.equityModel.practicalTwo,
        softwareCopyrightCount: this.equityModel.softwareOne,
        otherSoftwareCopyrightCount: this.equityModel.softwareTwo,
        designPatentCount: this.equityModel.aspectOne,
        otherDesignPatentCount: this.equityModel.aspectTwo,
        industryUniversityCooperation: this.equityModel.cooperateRadio,
        managerNumber: this.botModel.managementPeople,
        technicianNumber: this.botModel.technologyPeople,
        personnelNumber: this.botModel.allPeople,
        nationProject: this.botModel.countriesCkeckbox,
        provinceProject: this.botModel.provinceCkeckbox,
        cityProject: this.botModel.CityCkeckbox,
        systemCertificated: this.botModel.systemRadio,
        isHighTechinologyExpertise: this.botModel.highRadio,
        isPublicCompany: this.botModel.listedRadio,
        contactCompanayName:this.submitInfoModel.jobName,
        contactName:this.submitInfoModel.username,
        contactPhoneNumber:this.$refs.childrenPhone.phone,
        verifyCode:'',
        policyId:this.$route.query.listId,
        policyCategoryId:''

      };
        this.$http.post("/policytest", params)
          .then(res => {
            if(res.status == '200'){
              this.reportId = res.data
              if(this.token){
                this.$router.push({path:'/evaluation/detail',query:{id:res.data}})
              }else{
                this.isLoginHide = true
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      
    },
    fieldSelest(num) {
      const field = this.infoModel.fieldSelest;
      const institutions = this.infoModel.institutionsSelect;
      if (num == 1) {
        if (!field.fieldSelestId) {
          field.fieldSelestText = "所属领域不能空！";
        } else {
          field.fieldSelestText = "";
        }
      } else{
        if (!institutions.institutionsSelestId) {
          institutions.institutionsSelestText = "机构性质不能空！";
        } else {
          institutions.institutionsSelestText = "";
        }
      }
    },
    fieldOptions(id) {
      this.infoModel.fieldSelest.fieldSelestId = id;
    },
    //
    getMax(num1, num2, num3) {
      if (num1 > num2) {
        if (num1 > num3) {
          this.user.choseArea = num1;
        } else {
          this.user.choseArea = num3;
        }
      } else {
        if (num2 > num3) {
          this.user.choseArea = num2;
        } else {
          this.user.choseArea = num3;
        }
      }
    },
    // 基本信息
    basicInfoBlur(num) {
      const model = this.infoModel;
      if (num == 1) {
        if (!model.address || model.address.length >= 100) {
          model.addressText = "当前录入内容超出限定字符数或为空，请重新输入！";
        } else {
          model.addressText = "";
        }
      } else if (num == 2) {
        if (!model.JobName || model.JobName.length >= 100) {
          model.jobText = "当前录入内容超出限定字符数或为空，请重新输入！";
        } else {
          model.jobText = "";
        }
      }
      return true;
    },
    //企业财务失去焦点判断
    FinanceBlur(num) {
      const model = this.financeModel;
      const reg = /^[0-9]+\d*$/;
      // const regNum = 0||/^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
      const regNum = /^([0-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;

      if (num == 1) {
        if (!reg.test(model.LastYearMoney) || !model.LastYearMoney ||model.LastYearMoney.length>30) {
          model.LastYearMoneyText = model.hintText;
        } else {
          model.LastYearMoneyText = "";
        }
      } else if (num == 2) {
        if (!reg.test(model.BeforeYearMoney) || !model.BeforeYearMoney || model.BeforeYearMoney.length>30) {
          model.BeforeYearMoneyText = model.hintText;
        } else {
          model.BeforeYearMoneyText = "";
        }
      } else if (num == 3) {
        if (!reg.test(model.ThreeYearsAgoMoney) || !model.ThreeYearsAgoMoney || model.ThreeYearsAgoMoney.length>30) {
          model.ThreeYearsAgoMoneyText = model.hintText;
        } else {
          model.ThreeYearsAgoMoneyText = "";
        }
      } else if (num == 4) {
        if (!reg.test(model.researchOneMoney) || !model.researchOneMoney || model.researchOneMoney.length>30) {
          model.researchOneMoneyText = model.hintText;
        } else {
          model.researchOneMoneyText = "";
        }
      } else if (num == 5) {
        if (!reg.test(model.researchTwoMoney) || !model.researchTwoMoney || model.researchTwoMoney.length>30) {
          model.researchTwoMoneyText = model.hintText;
        } else {
          model.researchTwoMoneyText = "";
        }
      } else if (num == 6) {
        if (!reg.test(model.researchThreeMoney) || !model.researchThreeMoney || model.researchThreeMoney.length>30) {
          model.researchThreeMoneyText = model.hintText;
        } else {
          model.researchThreeMoneyText = "";
        }
      } else if (num == 7) {
        if (!reg.test(model.registeredMoney) || !model.registeredMoney || model.registeredMoney.length>30) {
          model.registeredMoneyText = model.hintText;
        } else {
          model.registeredMoneyText = "";
        }
      } else if (num == 8) {
        if (!regNum.test(model.profits) || !model.profits) {
          model.profitsText = "请输入数字或小数点，保留两位小数！";
        } else {
          model.profitsText = "";
        }
      }
    },
    // 知识产权状况
    EquityBlur(num) {
      const model = this.equityModel;
      const reg = /^[0-9]+\d*$/;
      if (num == 1) {
        if (!model.inventOne || !reg.test(model.inventOne)) {
          model.inventOneText = model.hintText;
        } else {
          model.inventOneText = "";
        }
      } else if (num == 2) {
        if (!model.inventTwo || !reg.test(model.inventTwo)) {
          model.inventTwoText = model.hintText;
        } else {
          model.inventTwoText = "";
        }
      } else if (num == 3) {
        if (!model.practicalOne || !reg.test(model.practicalOne)) {
          model.practicalOneText = model.hintText;
        } else {
          model.practicalOneText = "";
        }
      } else if (num == 4) {
        if (!model.practicalTwo || !reg.test(model.practicalTwo)) {
          model.practicalTwoText = model.hintText;
        } else {
          model.practicalTwoText = "";
        }
      } else if (num == 5) {
        if (!model.softwareOne || !reg.test(model.softwareOne)) {
          model.softwareOneText = model.hintText;
        } else {
          model.softwareOneText = "";
        }
      } else if (num == 6) {
        if (!model.softwareTwo || !reg.test(model.softwareTwo)) {
          model.softwareTwoText = model.hintText;
        } else {
          model.softwareTwoText = "";
        }
      } else if (num == 7) {
        if (!model.aspectOne || !reg.test(model.aspectOne)) {
          model.aspectOneText = model.hintText;
        } else {
          model.aspectOneText = "";
        }
      } else if (num == 8) {
        if (!model.aspectTwo || !reg.test(model.aspectTwo)) {
          model.aspectTwoText = model.hintText;
        } else {
          model.aspectTwoText = "";
        }
      }
    },
    // 企业建设
    BotBlur(num) {
      const model = this.botModel;
      const reg = /^[0-9]+\d*$/;
      if (num == 1) {
        if (!model.managementPeople || !reg.test(model.managementPeople)) {
          model.managementText = model.highText;
        } else {
          model.managementText = "";
        }
      } else if (num == 2) {
        if (!model.technologyPeople || !reg.test(model.technologyPeople)) {
          model.technologyText = model.highText;
        } else {
          model.technologyText = "";
        }
      } else {
        if (!model.allPeople || !reg.test(model.allPeople)) {
          model.allText = model.highText;
        } else {
          model.allText = "";
        }
      }
    },
    // 提交表单验证
    inputBlur(num) {
      const model = this.submitInfoModel;
      if (num == 1) {
        if (!model.jobName || model.jobName.length > 100) {
          model.msgJobName = model.hintText;
        } else {
          model.msgJobName = "";
        }
      } else if (num == 2) {
        if (!model.username || model.username.length > 40) {
          model.msgName = "请重新输入，内容不能为空或超过40个字符！";
        } else {
          model.msgName = "";
        }
      }
    },
    // 选择承担项目级别
    Project(type) {
      const model = this.botModel;
      if (type == "countries") {
        if (model.countriesCkeckbox) {
          model.countriesCkeckbox = true;
        } else {
          model.countriesCkeckbox = false;
        }
      } else if (type == "province") {
        if (model.provinceCkeckbox) {
          model.provinceCkeckbox = true;
        } else {
          model.provinceCkeckbox = false;
        }
      } else if (type == "city") {
        if (model.CityCkeckbox) {
          model.CityCkeckbox = true;
        } else {
          model.CityCkeckbox = false;
        }
      }
    },
    // 城市
    onChangeProvince(data) {
      this.user.ProvinceCode = data.code;
      this.user.searchProvince = data.value;
    },
    onChangeCity(data) {
      this.user.CityCode = data.code;
      this.user.searchCity = data.value;
    },
    onChangeArea(data) {
      this.user.AreaCode = data.code;
      this.user.searchArea = data.value;
    },
    // 验证表单
    ValidateInfo() {
      const model = this.infoModel;
      const field = this.infoModel.fieldSelest;
      const institutions = this.infoModel.institutionsSelect;
      let isPas = true;
      if (this.user.searchProvince.length <= 0) {
        this.user.ProvinceText = "请选择申报地区！";
        isPas = false;
      } else if (!field.fieldSelestId) {
        field.fieldSelestText = "所属领域不能空！";
        isPas = false;
      } else if (!model.address || model.address.length >= 100) {
        model.addressText = "当前录入内容超出限定字符数或为空，请重新输入！";
        isPas = false;
      } else if (!institutions.institutionsSelestId) {
        institutions.institutionsSelestText = "机构性质不能空！";
        isPas = false;
      } else if (!model.JobName || model.JobName.length >= 100) {
        model.jobText = "当前录入内容超出限定字符数或为空，请重新输入！";
        isPas = false;
      }
      this.infoModel.btnBgColor = isPas
      return isPas;
    },
    ValidateFinance() {
      const model = this.financeModel;
      const reg = /^[0-9]+\d*$/;
      const regNum = /^([0-9]\d*(\.\d*[1-9])?)|(0\.\d*[1-9])$/;
      let isPas = true;
      if (!reg.test(model.LastYearMoney) &&!model.LastYearMoney ||model.LastYearMoney.length > 30) {
        model.LastYearMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.BeforeYearMoney) && !model.BeforeYearMoney || model.BeforeYearMoney.length>30) {
        model.BeforeYearMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.ThreeYearsAgoMoney) &&!model.ThreeYearsAgoMoney || model.ThreeYearsAgoMoney.legnth>30) {
        model.ThreeYearsAgoMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.researchOneMoney) && !model.researchOneMoney || model.researchOneMoney.legnth>30) {
        model.researchOneMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.researchTwoMoney) && !model.researchTwoMoney || model.researchTwoMoney.legnth>30) {
        model.researchTwoMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.researchThreeMoney) &&!model.researchThreeMoney || model.researchThreeMoney.legnth>30) {
        model.researchThreeMoneyText = model.hintText;
        isPas = false;
      } else if (!reg.test(model.registeredMoney) && !model.registeredMoney || model.registeredMoney.legnth>30) {
        model.registeredMoneyText = model.hintText;
        isPas = false;
      } else if (!regNum.test(model.profits)) {
        model.profitsText = "请输入数字或小数点，保留两位小数！";
        isPas = false;
      }
      return isPas;
    },
    ValidateEquity() {
      const model = this.equityModel;
      const reg = /^[0-9]+\d*$/;
      let isPas = true;
      if (!model.inventOne || !reg.test(model.inventOne)) {
        model.inventOneText = model.hintText;
        isPas = false;
      } else if (!model.inventTwo || !reg.test(model.inventTwo)) {
        model.inventTwoText = model.hintText;
        isPas = false;
      } else if (!model.practicalOne || !reg.test(model.practicalOne)) {
        model.practicalOneText = model.hintText;
        isPas = false;
      } else if (!model.practicalTwo || !reg.test(model.practicalTwo)) {
        model.practicalTwoText = model.hintText;
        isPas = false;
      } else if (!model.softwareOne || !reg.test(model.softwareOne)) {
        model.softwareOneText = model.hintText;
        isPas = false;
      } else if (!model.softwareTwo || !reg.test(model.softwareTwo)) {
        model.softwareTwoText = model.hintText;
        isPas = false;
      } else if (!model.aspectOne || !reg.test(model.aspectOne)) {
        model.aspectOneText = model.hintText;
        isPas = false;
      } else if (!model.aspectTwo || !reg.test(model.aspectTwo)) {
        model.aspectTwoText = model.hintText;
        isPas = false;
      } else if (!model.cooperateRadio) {
        model.cooperateRadioText = "请选择产学研究合作";
        isPas = false;
      }
      return isPas;
    },
    ValidateBot() {
      const model = this.botModel;
      const reg = /^[0-9]+\d*$/;
      let isPas = true;
      if (!model.managementPeople || !reg.test(model.managementPeople)) {
        model.managementText = model.highText;
        isPas = false;
      } else if (!model.technologyPeople || !reg.test(model.technologyPeople)) {
        model.technology = model.highText;
        isPas = false;
      } else if (!model.allPeople || !reg.test(model.allPeople)) {
        model.allText = model.highText;
        isPas = false;
      } 
      // else if(model.countriesCkeckbox ==false || model.provinceCkeckbox==false || model.CityCkeckbox==false){
      //        model.cityCkeck = '请选择承担项目！'
      //       isPas = false
      //   } 
        else if (model.systemRadio.length <= 0) {
        model.systemText = "请选择体系认证！";
        isPas = false;
      } else if (model.highRadio.length <= 0) {
        model.highRadioText = "请选择是否高企！";
        isPas = false;
      } else if (model.listedRadio.length <= 0) {
        model.listedText = "请选择是否上市！";
        isPas = false;
      }
      return isPas;
    },
    ValidateSubmitData() {
      const model = this.submitInfoModel;
      let isPas = true;
      if (!model.jobName || model.jobName.length > 100) {
        model.msgJobName = model.hintText;
        isPas = false;
      } else if (!model.username || model.username.length > 40) {
        model.msgName = "请重新输入，内容不能为空或超过40个字符！";
        isPas = false;
      }
      return isPas;
    },

    next(num) {
      if (num == 1) {
        if (!this.ValidateInfo()) {
          return false;
        } else {
          this.FinanceClass = true;
          this.isBasciShow = false;
          this.isFinanceShow = true;
        }
      } else if (num == 2) {
        if (!this.ValidateFinance()) {
          return false;
        }
        this.EquityClass = true;
        this.isFinanceShow = false;
        this.isEquityShow = true;
      } else if (num == 3) {
        if (!this.ValidateEquity()) {
          return false;
        }
        this.isEquityShow = false;
        this.BotClass = true;
        this.isBotShow = true;
      } else {
        if (!this.ValidateBot()) {
          return false;
        } else {
          this.isBotShow = false;
          this.isSubmintData = true;
        }
      }
    },
    previous(num) {
      if (num == 1) {
        this.FinanceClass = false;
        this.isFinanceShow = false;
        this.isBasciShow = true;
      } else if (num == 2) {
        this.EquityClass = false;
        this.isFinanceShow = true;
        this.isEquityShow = false;
      } else {
        this.isEquityShow = true;
        this.BotClass = false;
        this.isBotShow = false;
      }
    }
  }
};

</script>

<style scoped>

.distpicker-address-wrapper{
  width:435px !important
}
.ceping-form .address .distpicker-address-wrapper select{
  width:33.33%;
  float: left;
}
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
.ela-banner {
  background: url("../../images/banner/free.png") top center;
  width: 100%;
  height: 370px;
  background-size: cover;
  text-align: center;
  padding: 80px 0 20px 0;
  box-sizing: border-box;
  z-index: 222;
}
.ela-banner h2 {
  font-size: 50px;
  color: #fff;
  letter-spacing: 1px;
  line-height: 55px;
}
.ela-banner h2 span {
  color: #7eacff;
}
.ela-banner p {
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
  line-height: 55px;
  margin-top: 20px;
}

.c-container .ceping-wrap .flow-nav {
  width: 100%;
  border-bottom: 1px solid #979797;
  padding: 20px 20px 20px 40px;
  box-sizing: border-box;
}
.c-container .ceping-wrap .flow-nav li {
  display: inline-block;
}
.c-container .ceping-wrap .flow-nav i {
  background: url(../../images/combg.png);
  display: block;
  float: left;
}
.c-container .ceping-wrap .flow-nav .finance_0 {
  height: 56px;
  width: 56px;
  background-position: -1999px 0;
}
.c-container .ceping-wrap .flow-nav .equity_O {
  height: 56px;
  width: 56px;
  background-position: -1607px 0;
}
.c-container .ceping-wrap .flow-nav .bot_0 {
  height: 56px;
  width: 56px;
  background-position: -1775px 0;
}
/*  1 基本信息    */
.c-container .ceping-wrap .flow-nav .basci {
  height: 56px;
  width: 56px;
  background-position: -1719px 0;
}
.c-container .ceping-wrap .flow-nav li span {
  float: left;
  display: block;
  font-size: 20px;
  letter-spacing: 0.4px;
  font-weight: 600;
  line-height: 50px;
  margin: 0 10px;
}
.org {
  color: #fa6602;
}
.c-container .ceping-wrap .flow-nav .org-line {
  height: 10px;
  width: 106px;
  background-position: -2495px 0;
  margin-top: 20px;
}
/*  2企业财务状况 */
.c-container .ceping-wrap .flow-nav .finance {
  height: 56px;
  width: 56px;
  background-position: -1887px 0;
}
.c-container .ceping-wrap .flow-nav .blue-line {
  height: 10px;
  width: 106px;
  background-position: -2601px 0;
  margin-top: 20px;
}
/*  3知识产权状况 */
.c-container .ceping-wrap .flow-nav .equity {
  height: 56px;
  width: 56px;
  background-position: -1663px 0;
}
.c-container .ceping-wrap .flow-nav .blue-line {
  height: 10px;
  width: 106px;
  background-position: -2601px 0;
  margin-top: 20px;
}
/*   4 企业建设状况*/
.c-container .ceping-wrap .flow-nav .bot {
  height: 56px;
  width: 56px;
  background-position: -1831px 0;
}

.ceping-form {
  width: 760px;
  margin: 50px auto;
  background: #f8f8f8;
  padding: 50px 20px 80px 100px;
  box-sizing: border-box;
  position: relative;
}
.ceping-form h2 {
  font-size: 18px;
  color: #14579e;
  margin-bottom: 30px;
  font-weight: 800;
}
.ceping-form h2:before {
  content: "";
  width: 2px;
  height: 35px;
  background: #2963ca;
  display: block;
  margin-right: 20px;
  margin-left: -30px;
  float: left;
}
.ceping-form .form-row {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}
.ceping-form .form-row .labels {
  width: 16%;
  float: left;
  font-size: 14px;
  color: #4a4a4a;
  letter-spacing: 0.5px;
  font-weight: 800;
}
.ceping-form .form-row .row-rt {
  /* width: 435px; */
  float: left;
  position: relative;
}
.row-rt p {
  color: red;
  margin-top: 5px;
}
.chek-item {
  float: left;
  display: block;
  margin-right: 15px;
  margin-bottom: 15px;
}
.chek-item input {
  float: left;
  margin-top: 5px;
}
.selctcity {
  display: inline-block;
  overflow: hidden;
}
.selctcity .form-group {
  margin-left: 0;
  margin-right: 20px;
  display: block;
  float: left;
}
.form-control {
  padding: 3px 5px;
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
.ceping-form .form-row .oth-control {
  width: 431px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.blue {
  color: #2963ca;
}
.ceping-form .form-row .row-rt button {
  width: 418px;
  background: #2963ca;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.57px;
  font-weight: bold;
  border: 0;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.ceping-form .form-row .row-rt .btn_bg {
  background: #d0d0d0;
  color: #333;
}
.ceping-form .form-row .row-rt button:hover {
  opacity: 0.9;
}
.previous {
  display: inline-block;
  background: #2963ca;
  width: 207px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.57px;
  font-weight: 600;
  text-align: center;
  margin-right: 15px;
  line-height: 40px;
}
.next {
  display: inline-block;
  background: #d0d0d0;
  width: 207px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  letter-spacing: 0.57px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
}
/*3.*/
.equity-fm {
  padding: 50px 20px 80px 50px;
}
.Pro-wrp {
  width: 65%;
  margin: 0 auto;
}
.Pro-wrp .cq-title {
  width: 88%;
  clear: both;
  margin-top: 30px;
  margin-bottom: 10px;
}
.Pro-wrp .cq-title h2 {
  float: left;
  margin-bottom: 0;
  font-size: 16px;
}
.Pro-wrp .cq-title span {
  float: right;
  font-size: 16px;
  color: #fa6602;
  letter-spacing: 0.57px;
  line-height: 21px;
  font-weight: 600;
}
.ceping-form .Pro-wrp .form-row .labels {
  width: 50%;
}
.ceping-form .Pro-wrp .form-row .row-rt {
  width: 173px;
}
.ceping-form .Pro-wrp .form-row .oth-control {
  width: 173px;
}
.ceping-form .form-row .mon-ipt {
  position: relative;
  text-align: center;
  display: block;
}
.ceping-form .form-row .wan {
  position: absolute;
  right: 10px;
  top: 7px;
  font-size: 12px;
  color: #595757;
  letter-spacing: 0.43px;
}
/*4.*/
.ceping-form .form-row .fim {
  width: 22%;
}
.chek-item {
  float: left;
  display: block;
  margin-right: 15px;
  margin-bottom: 15px;
}
.chek-item input {
  float: left;
  margin-top: 5px;
}
.previous:hover {
  color: #fff;
  opacity: 0.9;
}
.next:hover {
  opacity: 0.9;
  color: #2963ca;
}
/*  info   */
.quick-wp {
  padding: 20px;
  box-sizing: border-box;
}
</style>

<style scoped>
.quick-wp {
  padding: 20px;
  box-sizing: border-box;
}
.quick-wp .quick-box {
  width: 80%;
  margin: 0 auto;
}
.quick-wp .form-row {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}
.quick-wp .quick-box .supman {
  margin: 0 auto;
  background: url(../../images/sup.png) no-repeat;
  width: 170px;
  height: 160px;
  display: block;
}
.quick-wp .supman {
  animation: myfirst 1s infinite;
}
@keyframes myfirst {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -10px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
.quick-wp .zxr-b {
  font-size: 20px;
  color: #14579e;
  letter-spacing: 0.89px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
}
.quick-wp .get-t {
  font-size: 16px;
  color: #4a4a4a;
  letter-spacing: 0.57px;
  text-align: center;
  font-weight: 600;
  margin: 20px 0 10px 0;
}
.quick-wp .form-row .oth-control {
  width: 431px;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.quick-wp .quick-box .oth-control {
  width: 351px;
}
.quick-wp .form-row .mon-ipt {
  position: relative;
  text-align: center;
  display: block;
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  height: 32px;
}
.quick-wp .iphone {
  margin: 0 auto 20px;
  line-height: 32px;
  color: #ccc;
}
.quick-wp .quick-box .tell-item {
  display: block;
  width: 350px;
  margin: 0 auto;
  overflow: hidden;
}
.quick-wp .quick-box .tel-int {
  width: 216px;
  float: left;
}
.quick-wp .quick-box .tell-item input {
  float: left;
}
.quick-wp .quick-box .tell-item a {
  display: inline-block;
  width: 116px;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #ffffff;
  letter-spacing: 0.43px;
  background: #2963ca;
  margin-left: 16px;
  text-align: center;
}
.quick-wp .quick-box .selctcity {
  width: 354px;
  display: block;
  margin: 0 auto;
}
.quick-wp .quick-box .row-rt {
  width: 350px;
  display: block;
  margin: 20px auto;
  float: none;
  position: relative;
}
.immediate {
  display: block;
  margin: 0 auto;
  background: #2963ca;
  width: 360px;
  height: 40px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.57px;
  cursor: pointer;
  border: 0;
}
.quick-wp .quick-box .inputText {
  margin: 0 auto 20px auto;
}
.quick-wp .inputText input {
  margin: 0 auto;
}
.quick-wp .inputText p {
  width: 353px;
  margin: 0 auto;
  color: red;
}
</style>
