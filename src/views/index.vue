<template>
  <div class="siemensHome">
    <div class="siemensHomeNav flexStartBetween">
      <router-link to="/" class="siemensHomeLogo">
        <img src="../assets/images/home/logo.png">
      </router-link>

      <div class="siemensHomeOperate flexCenter">
        <span class="siemensHomeTime">{{time}}&nbsp;&nbsp;&nbsp;&nbsp;{{time1}}</span>
        <div style="position: relative;">
          <span class="siemensHomeLang flexEnd" @click.stop="isShowLang = !isShowLang">{{langText}}<i
              class="iconfont icon-jiantou"></i></span>
          <ul class="langItemBox" v-if="isShowLang">
            <li class="langItems" v-for="(item,index) in langList" :key="index"
              :class="{ langActive: activeIndex == item }" @click.stop="onSelectLang(item)"
              @mouseover.stop="hoverLanguage(item)">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="siemensHomeCon flexBox">
      <div class="siemensHomeInfo">
        <div class="siemensHomeInfoBtn flexColumnCenter">
          <router-link to="" class="siemensHomeInfoBtnBox siemensHomeInfoPer flexCenter"
            @click.native.stop="isShowHead = !isShowHead"><i class="iconfont icon-iconfontgerenzhongxin"></i>
          </router-link>
          <router-link to="/custom" class="siemensHomeInfoBtnBox siemensHomeInfoSetting flexCenter"><i
              class="iconfont icon-shezhi"></i></router-link>
          <ul class="selectItemBox" v-if="isShowHead">
            <li class="selectItems" v-for="(item,index) in headList" :key="index" @click.stop="onSelectItem(index)"><i
                :class="item.icon"></i>{{item.name}}</li>
          </ul>
        </div>
        <div class="siemensHomeInfoText">
          <div class="siemensHomeInfoEn">EMS</div>
          <div class="siemensHomeInfoCn">智能配电管理平台</div>
        </div>
      </div>
      <div class="siemensHomeMap">
        <div class="siemensHomeTop flexStartBetween">
          <el-select v-model="value" placeholder="选择工业园区" popper-class="homeDropdownBox" @change="onChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <div class="siemensHomeTopRight"><img src="../assets/images/home/icon2.png">工业园区</div>
        </div>
        <div class="siemensHomeSwiper radiusCss">
          <div class="flexCenter siemensHomeBulletin">
            <i class="iconfont icon-laba"></i>公告栏
          </div>
          <el-carousel arrow="never" indicator-position="outside" :interval="5000" trigger="click">
            <el-carousel-item v-for="item in 3" :key="item">
              <el-scrollbar style="height:100%">
                打造新能源汽车“世界名片”现代的汽车正朝着电动化、智能化、网联化、个性化持续进化。对消费者而言，汽车早已不只是简单的代步工具。商务人士将其看作品位的代言，新锐青年追求智能化的驾驶体验……如今的消费者更加看重汽车的综合素质与附加价值。虽然不断变化的市场给汽车制造商们带来了一些挑战，但北京新能源汽车股份有限公司（北汽新能源）有着自己的破局之策。
              </el-scrollbar>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="siemensHomeChina" ref="myChart1"></div>
      </div>
    </div>

  </div>
</template>
<script>
import geoJson from "../assets/js/china.json";
import { mapGetters } from "vuex";
import SCustomer from "@/api/ums/sCustomer";
export default {
  computed: {
    ...mapGetters({
      lang: "lang",
    }),
  },
  data() {
    return {
      geoJson: {},
      activeIndex: "Cn",
      icon: "image://" + require("@/assets/images/home/icon1.jpg"),
      isShowHead:false,
       headList:[
                {
                    name:'修改密码',
                    icon:'iconfont icon-ic_keyboard'
                },
                {
                    name:'登出',
                    icon:'iconfont icon-dengchu'
                }
            ],
      options: [
        {
          value: "0",
          label: "工业园区01",
        },
        {
          value: "1",
          label: "工业园区02",
        },
        {
          value: "2",
          label: "工业园区03",
        },
      ],
      convertData: [],
      langText: "Cn",
      isShowLang: false,
      langList: ["Cn", "En", "De"],
      value: "",
      time: "",
      time1: "",
      fontSize: 12,
      symbolScatterSize: [12, 12],
      symbolIconSize: [48, 56],
      symbolIconOffset: [0, -18],
    };
  },
  methods: {
    onSelectItem(index) {
      if (index == 0) {
        // 修改密码
        this.$router.push("/editPass");
      } else {
        // 退出登录
        this.$router.push("/login");
      }
    },
    onChange(val) {
      this.$router.push("/home");
    },
    onSelectLang(text) {
      this.langText = text;
      this.$i18n.locale = text;
      this.isShowLang = false;
      this.$store.dispatch("setLang", this.$i18n.locale);
    },
    hoverLanguage(item) {
      this.activeIndex = item;
    },
    echartsInit1() {
      // 找到容器
      let myChart = this.$echarts.init(this.$refs.myChart1);
      let geoJson1 = this.geoJson;
      this.$echarts.registerMap("china", geoJson1);
      var geoCoordMap = {
        台北: [121.5135, 25.0308],
        哈尔滨: [127.9688, 45.368],
        呼和浩特: [110.3467, 41.4899],
        长春: [125.8154, 44.2584],
        北京: [116.4551, 40.2539],
        沈阳: [123.1238, 42.1216],
        石家庄: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        西安: [109.1162, 34.2004],
        兰州: [103.5901, 36.3043],
        银川: [106.3586, 38.1775],
        西宁: [101.4038, 36.8207],
        乌鲁木齐: [87.9236, 43.5883],
        拉萨: [91.11, 29.97],
        成都: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        济南: [117.1582, 36.8701],
        郑州: [113.4668, 34.6234],
        南京: [118.8062, 31.9208],
        合肥: [117.29, 32.0581],
        武汉: [114.3896, 30.6628],
        杭州: [119.5313, 29.8773],
        福州: [119.4543, 25.9222],
        南昌: [116.0046, 28.6633],
        长沙: [113.0823, 28.2568],
        贵阳: [106.6992, 26.7682],
        昆明: [102.9199, 25.4663],
        广州: [113.12244, 23.009505],
        南宁: [108.479, 23.1152],
        海口: [110.3893, 19.8516],
        上海: [121.4648, 31.2891],
        香港: [114.2578, 22.3242],
        澳门: [113.5547, 22.1484],
      };
      // var convertData = [
      //   { name: "北京", value: [116.4551, 40.2539] },
      //   { name: "沈阳", value: [123.1238, 42.1216] },
      //   { name: "锦州", value: [121.1238, 41.1216] },
      //   { name: "合肥", value: [117.29, 32.0581] },
      //   { name: "郑州", value: [113.4668, 34.6234] },
      //   { name: "天津", value: [117.4219, 39.4189] },
      //   { name: "杭州", value: [119.5313, 29.8773] },
      //   { name: "义乌", value: [121.5313, 28.8773] },
      //   { name: "金华", value: [119.633, 27.8773] },
      // ];
      var convertData = this.convertData;
      console.log(this.convertData);

      function provinceData() {
        var res = [];
        for (let key in geoCoordMap) {
          res.push({
            name: key,
            value: geoCoordMap[key],
          });
        }
        return res;
      }

      let option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "#00475C",
          padding: [5, 10],
          extraCssText: "border-radius:6px",
          textStyle: {
            color: "#01EBDA",
          },
          formatter: function (params) {
            return params.name;
          },
        },
        geo: {
          map: "china",
          show: true,
          roam: false,
          aspectScale: 0.8, //长宽比
          zoom: 1.15,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: "#01EBDA",
                fontSize: this.fontSize,
              },
            },
            emphasis: {
              show: false,
              textStyle: {
                color: "#01EBDA",
              },
            },
          },
          itemStyle: {
            normal: {
              areaColor: "transparent",
              borderColor: "#00F2DF", //线
              borderWidth: 1.5,
              shadowColor: "#00A3FF", //外发光
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 1,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#0099CB", // 0% 处的颜色
                  },
                  {
                    offset: 0.4,
                    color: "#0099B0", // 0% 处的颜色
                  },
                  {
                    offset: 0.8,
                    color: "#009999", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#50BEBE", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              }, //悬浮区背景
              shadowColor: "#00A3FF", //外发光
            },
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            geoIndex: 0,
            showLegendSymbol: false, // 存在legend时显示
          },
          {
            name: "散点",
            type: "effectScatter",
            coordinateSystem: "geo",
            rippleEffect: {
              brushType: "fill",
              scale: 2,
            },
            label: {
              normal: {
                show: true,
                position: "bottom", //显示位置
                offset: [0, 5], //偏移设置
                formatter: "{b}", //圆环显示文字
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: "#01EBDA",
                shadowBlur: 4,
                shadowColor: "#006570",
              },
            },

            data: provinceData(),
            symbolSize: this.symbolScatterSize,
            showEffectOn: "render", //加载完毕显示特效
          },
          {
            name: "气泡",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: this.icon,
            // silent: true,
            // symbolKeepAspect:true,
            symbolSize: this.symbolIconSize,
            symbolOffset: this.symbolIconOffset,
            label: {
              normal: {
                show: false,
              },
            },
            itemStyle:{
              opacity:1
            },
           
            data: convertData,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
            },
            hoverAnimation: true,
            zlevel: 2,
          },
        ],
      };
      // 开始渲染
      myChart.setOption(option);
      myChart.resize();
      // 点击园区
      let self = this;
      myChart.on("click", function (params) {
        if (params.seriesIndex == 2) {
          console.log(params.name);
          self.$router.push("/home");
        }
      });
    },
    resizeFn() {
      if (document.body.clientWidth > 1664) {
        this.fontSize = 12;
        this.symbolScatterSize = [12, 12];
        this.symbolIconSize = [48, 56];
        this.symbolIconOffset = [0, -18];
      } else {
        this.fontSize = 10;
        this.symbolScatterSize = [8, 8];
        this.symbolIconSize = [32, 37];
        this.symbolIconOffset = [0, -12];
      }

      this.echartsInit1();
    },
    getDate() {
      let myDate = new Date(); //实例一个时间对象；
      let year = myDate.getFullYear(); //获取系统的年；
      let month = myDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
      month = month < 10 ? "0" + month : month;
      let date = myDate.getDate(); // 获取系统日，
      date = date < 10 ? "0" + date : date;
      let hours = myDate.getHours(); //获取系统时，
      hours = hours < 10 ? "0" + hours : hours;
      let minutes = myDate.getMinutes(); //分
      minutes = minutes < 10 ? "0" + minutes : minutes;
      let seconds = myDate.getSeconds(); //秒
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = year + "-" + month + "-" + date;
      this.time1 = hours + " ：" + minutes + " ：" + seconds;
    },
    async getAllByLoginUser() {
      let res = await SCustomer.allByLoginUser();
      let datas = res.data || [];
      this.options = [];
      let options = [];
      var convertData = [];
      for (let i = 0; i < datas.length; i++) {
        options.push({ value: datas[i].id, label: datas[i].clientName });
        convertData.push({name: datas[i].cityCode , value: [datas[i].longitude,datas[i].latitude]});
      }
      this.options = options;
      this.convertData = convertData;
      this.resizeFn();
    },
  },

  mounted() {
    this.getDate();
    this.activeIndex = this.langText = this.lang;
    let self = this;
    setInterval(function () {
      self.getDate();
    });
    this.geoJson = geoJson;
    // this.resizeFn();
    window.addEventListener("resize", function () {
      self.resizeFn();
    });

    document.documentElement.onclick = function () {
      self.isShowLang = false;
      self.isShowHead = false;
    };

    this.getAllByLoginUser();
  },
};
</script>

<style scoped>
.siemensHomeTop /deep/ .el-input__inner::placeholder {
  color: #fff;
}

/* 1920 */
@media screen and (min-width: 1665px) {
  .siemensHome {
    width: 100%;
    height: 100vh;
    padding-bottom: 50px;
    background-image: url(../assets/images/home/bg1.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensHomeNav {
    width: 100%;
    height: 90px;
    padding: 30px 40px 0 60px;
  }
  .siemensHomeLogo {
    width: 180px;
    height: auto;
  }
  .siemensHomeOperate {
    font-family: "Arial";
    font-size: 16px;
    color: #fff;
  }
  .siemensHomeLang {
    width: 43px;
    margin-left: 40px;
    cursor: pointer;
  }
  .siemensHomeLang i {
    margin-left: 6px;
  }
  /* 语言菜单 */
  .langItemBox {
    position: absolute;
    top: 30px;
    right: -18px;
    width: 120px;
    height: 142px;
    padding-top: 15px;
    background-color: #025f7a;
    box-shadow: 0 0px 10px 0 #044557;
    border-radius: 4px;
    z-index: 9;
  }
  .langItemBox::after {
    content: "";
    position: absolute;
    top: -12px;
    right: 20px;
    width: 0;
    height: 0;
    border-width: 6px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #025f7a;
  }
  .langItems {
    height: 30px;
    line-height: 30px;
    font-family: "Arial";
    font-size: 14px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .langItems:not(:last-child) {
    margin-bottom: 10px;
  }
  .langActive {
    background-color: rgba(255, 255, 255, 0.09);
  }

  .siemensHomeCon {
    width: 100%;
    height: calc(100% - 90px);
    padding-right: 60px;
  }
  .siemensHomeInfo {
    position: relative;
    width: 280px;
    height: 100%;
  }
  .siemensHomeInfoBtn {
    position: relative;
    width: 70px;
    height: 280px;
    margin: 160px 0 0 100px;
    background-color: rgba(1, 96, 118, 0.8);
    border-radius: 35px;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  .siemensHomeInfoBtnBox {
    width: 42px;
    height: 42px;

    background: rgba(255, 255, 255, 0.89);
    box-shadow: 0px 4px 12px 0px rgba(0, 85, 94, 0.15);
    border-radius: 50%;
  }
  .siemensHomeInfoBtnBox i {
    font-size: 22px;
    color: #009999;
  }
  .siemensHomeInfoPer i {
    font-size: 26px;
  }
  .siemensHomeInfoSetting {
    margin-top: 50px;
  }
  .siemensHomeInfoText {
    position: absolute;
    bottom: 10px;
    left: 60px;
    line-height: 30px;
    font-family: "Arial Black";
    font-weight: 900;
    font-size: 18px;
    color: #fff;
  }
  /* todo */
  .siemensHomeInfoCn {
    font-family: "PingFang Bold";
  }
  .siemensHomeMap {
    position: relative;
    width: calc(100% - 280px);
    height: 100%;
    padding: 0px 50px 30px 50px;
    background: linear-gradient(
      134deg,
      rgba(1, 79, 100, 0.85) 0%,
      rgba(0, 80, 108, 0.85) 100%
    );
    box-shadow: 2px 6px 30px 0px rgba(0, 144, 173, 0.1);
    border-radius: 6px;
  }
  .siemensHomeMap::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/home/bg3.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensHomeTop {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 0 50px;
  }
  .siemensHomeTop /deep/ .el-select {
    width: 240px;
    z-index: 99;
  }
  .siemensHomeTop /deep/ .el-input__inner {
    padding-left: 20px;
    font-size: 16px;
    color: #fff !important;
    border-color: rgba(255, 255, 255, 0.3);
    background-color: #005269;
  }
  .siemensHomeTop /deep/ .el-input__suffix {
    right: 15px;
  }
  .siemensHomeTop /deep/ .el-select .el-input .el-select__caret {
    font-size: 18px;
    color: #fff;
  }
  .siemensHomeTop /deep/ .el-select .el-input__inner:focus,
  .siemensHomeTop /deep/ .el-select .el-input.is-focus .el-input__inner {
    border-color: rgba(255, 255, 255, 0.3);
  }
  .siemensHomeTopRight {
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
  }
  .siemensHomeTopRight img {
    width: 16px;
    margin-right: 8px;
  }
  .siemensHomeSwiper {
    position: absolute;
    left: 50px;
    bottom: 48px;
    width: 180px;
    height: 490px;
    background: #005269;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }
  .siemensHomeBulletin {
    width: 140px;
    height: 36px;
    margin: 15px auto 10px auto;
    font-size: 16px;
    color: #01ebda;
    background-color: #106380;
    border-radius: 18px;
  }
  .siemensHomeBulletin i {
    margin-right: 6px;
    font-size: 19px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__container {
    height: 398px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__item {
    line-height: 24px;
    font-size: 14px;
    color: #fff;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__view {
    width: 150px;
    margin: 0 auto;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__thumb {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .siemensHomeSwiper /deep/ .el-carousel__indicator--horizontal {
    padding: 10px 0;
  }
  .siemensHomeSwiper
    /deep/
    .el-carousel__indicator--horizontal:not(:last-child) {
    margin-right: 5px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__button {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    opacity: 0.29;
  }
  .siemensHomeSwiper /deep/ .el-carousel__indicator.is-active button {
    opacity: 1;
  }
  .siemensHomeChina {
    position: absolute !important;
    right: 0;
    width: 1300px;
    height: 100%;
  }
  /* 个人中心菜单 */
  .selectItemBox {
    position: absolute;
    top: 43px;
    left: 83px;
    width: 120px;
    height: 100px;
    padding-top: 14px;
    background-color: #025f7a;
    box-shadow: 0px 2px 10px 0px #044557;
    border-radius: 4px;
    z-index: 9;
  }
  .selectItemBox::after {
    content: "";
    position: absolute;
    top: 38px;
    left: -12px;
    width: 0;
    height: 0;
    border-width: 6px;
    border-color: transparent;
    border-style: solid;
    border-right-color: #025f7a;
  }
  .selectItems {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    font-size: 14px;
    color: #fff;
    text-align: left;
    cursor: pointer;
  }
  .selectItems:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }
  .selectItems:not(:last-child) {
    margin-bottom: 10px;
  }
  .selectItems i {
    margin-right: 6px;
    font-size: 14px;
  }
}

/* 1280*/
@media screen and (max-width: 1664px) {
  .siemensHome {
    width: 100%;
    height: 100vh;
    padding-bottom: 34px;
    background-image: url(../assets/images/home/bg1.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensHomeNav {
    width: 100%;
    height: 60px;
    padding: 20px 26px 0 40px;
  }
  .siemensHomeLogo {
    width: 120px;
    height: auto;
  }
  .siemensHomeOperate {
    font-family: "Arial";
    font-size: 12px;
    color: #fff;
  }
  .siemensHomeLang {
    width: 32px;
    margin-left: 26px;
    cursor: pointer;
  }
  .siemensHomeLang i {
    margin-left: 4px;
    font-size: 12px;
  }
  /* 语言菜单 */
  .langItemBox {
    position: absolute;
    top: 20px;
    right: -12px;
    width: 80px;
    height: 95px;
    padding-top: 10px;
    background-color: #025f7a;
    box-shadow: 0 0px 6px 0 #044557;
    border-radius: 3px;
    z-index: 9;
  }
  .langItemBox::after {
    content: "";
    position: absolute;
    top: -8px;
    right: 14px;
    width: 0;
    height: 0;
    border-width: 4px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #025f7a;
  }
  .langItems {
    height: 20px;
    line-height: 20px;
    font-family: "Arial";
    font-size: 12px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .langItems:not(:last-child) {
    margin-bottom: 6px;
  }
  .langActive {
    background-color: rgba(255, 255, 255, 0.09);
  }

  .siemensHomeCon {
    width: 100%;
    height: calc(100% - 60px);
    padding-right: 40px;
  }
  .siemensHomeInfo {
    position: relative;
    width: 186px;
    height: 100%;
  }
  .siemensHomeInfoBtn {
    position: relative;
    width: 46px;
    height: 186px;
    margin: 106px 0 0 66px;
    background-color: rgba(1, 96, 118, 0.8);
    border-radius: 24px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .siemensHomeInfoBtnBox {
    width: 28px;
    height: 28px;
    background: rgba(255, 255, 255, 0.89);
    box-shadow: 0px 3px 8px 0px rgba(0, 85, 94, 0.15);
    border-radius: 50%;
  }
  .siemensHomeInfoBtnBox i {
    font-size: 14px;
    color: #009999;
  }
  .siemensHomeInfoPer i {
    font-size: 15px;
  }
  .siemensHomeInfoSetting {
    margin-top: 34px;
  }
  .siemensHomeInfoText {
    position: absolute;
    bottom: 6px;
    left: 40px;
    line-height: 20px;
    font-family: "Arial Black";
    font-weight: 900;
    font-size: 12px;
    color: #fff;
  }
  /* todo */
  .siemensHomeInfoCn {
    font-family: "PingFang Bold";
  }
  .siemensHomeMap {
    position: relative;
    width: calc(100% - 186px);
    height: 100%;
    padding: 0px 34px 20px 34px;
    background: linear-gradient(
      134deg,
      rgba(1, 79, 100, 0.85) 0%,
      rgba(0, 80, 108, 0.85) 100%
    );
    box-shadow: 1px 4px 20px 0px rgba(0, 144, 173, 0.1);
    border-radius: 4px;
  }
  .siemensHomeMap::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(../assets/images/home/bg3.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensHomeTop {
    position: absolute;
    top: 26px;
    left: 0;
    width: 100%;
    height: 26px;
    padding: 0 34px;
  }
  .siemensHomeTop /deep/ .el-select {
    width: 160px;
    z-index: 99;
  }
  .siemensHomeTop /deep/ .el-input__inner {
    height: 26px;
    line-height: 26px;
    padding-left: 14px;
    font-size: 12px;
    color: #fff !important;
    border-color: rgba(255, 255, 255, 0.3);
    background-color: #005269;
  }
  .siemensHomeTop /deep/ .el-input__suffix {
    right: 7px;
  }
  .siemensHomeTop /deep/ .el-select .el-input .el-select__caret {
    line-height: 26px;
    font-size: 12px;
    color: #fff;
  }
  .siemensHomeTop /deep/ .el-select .el-input__inner:focus,
  .siemensHomeTop /deep/ .el-select .el-input.is-focus .el-input__inner {
    border-color: rgba(255, 255, 255, 0.3);
  }
  .siemensHomeTopRight {
    height: 14px;
    line-height: 14px;
    font-size: 12px;
    color: #fff;
  }
  .siemensHomeTopRight img {
    width: 10px;
    margin-right: 5px;
  }
  .siemensHomeSwiper {
    position: absolute;
    left: 34px;
    bottom: 32px;
    width: 120px;
    height: 326px;
    background: #005269;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  .siemensHomeBulletin {
    width: 94px;
    height: 24px;
    margin: 10px auto 6px auto;
    font-size: 12px;
    color: #01ebda;
    background-color: #106380;
    border-radius: 12px;
  }
  .siemensHomeBulletin i {
    margin-right: 4px;
    font-size: 13px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__container {
    height: 265px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__item {
    line-height: 18px;
    font-size: 12px;
    color: #fff;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__view {
    width: 111px;
    margin: 0 auto;
    transform: scale(0.9);
    height: 100%;
    transform-origin: top center;
  }
  .siemensHomeSwiper /deep/ .el-scrollbar__thumb {
    background-color: rgba(255, 255, 255, 0.5);
  }
  .siemensHomeSwiper /deep/ .el-carousel__indicators--outside {
    line-height: 1;
  }
  .siemensHomeSwiper /deep/ .el-carousel__indicator--horizontal {
    padding: 6px 0;
  }
  .siemensHomeSwiper
    /deep/
    .el-carousel__indicator--horizontal:not(:last-child) {
    margin-right: 3px;
  }
  .siemensHomeSwiper /deep/ .el-carousel__button {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    opacity: 0.29;
  }
  .siemensHomeSwiper /deep/ .el-carousel__indicator.is-active button {
    opacity: 1;
  }
  .siemensHomeChina {
    position: absolute !important;
    right: 0;
    width: 866px;
    height: 100%;
  }
  /* 个人中心菜单 */
  .selectItemBox {
    position: absolute;
    top: 31px;
    left: 55px;
    width: 80px;
    height: 66px;
    padding-top: 10px;
    background-color: #025f7a;
    box-shadow: 0px 1px 6px 0px #044557;
    border-radius: 3px;
    z-index: 9;
  }
  .selectItemBox::after {
    content: "";
    position: absolute;
    top: 27px;
    left: -8px;
    width: 0;
    height: 0;
    border-width: 4px;
    border-color: transparent;
    border-style: solid;
    border-right-color: #025f7a;
  }
  .selectItems {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    font-size: 12px;
    color: #fff;
    text-align: left;
    cursor: pointer;
  }
  .selectItems:hover {
    background-color: rgba(255, 255, 255, 0.09);
  }
  .selectItems:not(:last-child) {
    margin-bottom: 6px;
  }
  .selectItems i {
    margin-right: 4px;
    font-size: 12px;
  }
}
</style>
