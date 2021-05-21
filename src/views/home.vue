<template>
    <div class="siemensLayoutCon siemensLayoutHome flexBox">
        <div class="homeTab">
            <div class="homeTabO green">
                <div class="homeTabOY">Year</div>
                <div :class="bg"></div>
                <div class="homeTabOS" @click="year1">{{year}}</div>
                <div class="homeTabOLine"></div>
                <div class="homeTabOY">Mouth</div>
                <div class="homeTabOS" @click="mouth1">{{mouth}}</div>
                <div class="homeTabimg1 iconfont icon-jiantou">
                     <el-date-picker v-model="value" type="month" value-format="yyyy-MM" @change="homeTabTime" style="cursor: pointer;"></el-date-picker>
                </div>
                
            </div>
            <div class="homeTabAll">
            <div class="homeTabT green" style="margin-left: 2.5%;">
                <div class="homeTabTFont">
                    <div class="homeTabTFontTit">园区水能耗总量</div>
                    <div class="homeTabTFontCon">总耗量：<font class="shuzi">7651.3</font></div>
                    <div class="homeTabTFontCon">基准值：<font class="shuzi">10%</font></div>
                    <div class="homeTabTFontCon">标煤转换值：<font class="shuzi">3825.7</font></div>
                </div>
                <div class="homeTabTIcon g"><div class="homeTabimg iconfont icon-shui1"></div></div>
            </div>
            <div class="homeTabT blue">
                <div class="homeTabTFont">
                    <div class="homeTabTFontTit">园区电能耗总量</div>
                    <div class="homeTabTFontCon">总耗量：<font class="shuzi">7651.3</font></div>
                    <div class="homeTabTFontCon">基准值：<font class="shuzi">10%</font></div>
                    <div class="homeTabTFontCon">标煤转换值：<font class="shuzi">3825.7</font></div>
                </div>
                <div class="homeTabTIcon b"><div class="homeTabimg iconfont icon-electricity_icon"></div></div>
            </div>
            <div class="homeTabT yellow">
                <div class="homeTabTFont">
                    <div class="homeTabTFontTit">园区气能耗总量</div>
                    <div class="homeTabTFontCon">总耗量：<font class="shuzi">7651.3</font></div>
                    <div class="homeTabTFontCon">基准值：<font class="shuzi">10%</font></div>
                    <div class="homeTabTFontCon">标煤转换值：<font class="shuzi">3825.7</font></div>
                </div>
                <div class="homeTabTIcon y"><div class="homeTabimg iconfont icon-meiqi"></div></div>
            </div>
            <div class="homeTabT red">
                <div class="homeTabTFont">
                    <div class="homeTabTFontTit">园区热能耗总量</div>
                    <div class="homeTabTFontCon">总耗量：<font class="shuzi">7651.3</font></div>
                    <div class="homeTabTFontCon">基准值：<font class="shuzi">10%</font></div>
                    <div class="homeTabTFontCon">标煤转换值：<font class="shuzi">3825.7</font></div>
                </div>
                <div class="homeTabTIcon r"><div class="homeTabimg iconfont icon-reshui"></div></div>
            </div>
            </div>
            <div class="homeTabL">
                <div class="homeTabLTop" @click="homeTabLTopOne = !homeTabLTopOne, homeTabLTopTwo= true">
                    <div v-if="homeTabLTopOne">
                        <div class="homeTabLTopIcon iconfont icon-gongdan"></div>
                        <div class="homeTabLTopFont">工单</div>
                        <div class="homeTabLTopIcon2 iconfont icon-jiantou-copy"></div>
                    </div>
                    <div class="homeTabLTopOneClick" v-if="homeTabLTopOne == false">
                        <div class="homeTabFont">
                            <div class="homeTabFontTop">
                                <div class="homeTabLTopIcon iconfont icon-gongdan"></div>
                                <div class="homeTabLTopFont">工单信息汇总</div>
                            </div>
                            <div class="homeTabFontBottom">数量：<font class="homeTabNumber">20</font></div>
                        </div>
                        <div class="homeTabIcon">
                            <div class="homeTabLTopIcon2 iconfont icon-jiantou-copy"></div>
                        </div>
                    </div>
                </div>
                <div class="homeTabLTop" @click="homeTabLTopTwo = !homeTabLTopTwo, homeTabLTopOne= true">
                    <div v-if="homeTabLTopTwo">
                        <div class="homeTabLTopIcon iconfont icon-jinggao"></div>
                        <div class="homeTabLTopFont">警告</div>
                        <div class="homeTabLTopIcon2 iconfont icon-jiantou-copy"></div>
                    </div>
                    <div class="homeTabLTopTwoClick" v-if="homeTabLTopTwo == false">
                        <div class="homeTabFont">
                            <div class="homeTabFontTop">
                        <div class="homeTabLTopIcon iconfont icon-jinggao"></div>
                                <div class="homeTabLTopFont">警告信息汇总</div>
                            </div>
                            <div class="homeTabFontBottom">数量：<font class="homeTabNumber">20</font></div>
                        </div>
                        <div class="homeTabIcon">
                            <div class="homeTabLTopIcon2 iconfont icon-jiantou-copy"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="homeCon">
            <div class="homeConDiv">
                <div class="swiperBox">
                    <div class="swiperBoxContain">
                        <ul class="swiperWrapper" ref="swiperBox" :style="styleObj">
                            <li class="swiperSlide" :class="{'swiperSlideActive' : acativeIndex == index}" 
                            v-for="(item,index) in list" :key="index" @click="onChange(index)">
                            
                                <el-tooltip effect="dark" :content="item" :disabled="item.length<=6">
                                    <div>{{item}}</div>
                                </el-tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <template v-if="isShowArrow">
                    <el-button type="button" class="swiperBtn swiperPrevBtn flexCenter" :disabled="btnPrevDisabled" @click="onPrev"><i class="iconfont icon-jiantou"></i></el-button>
                    <el-button class="swiperBtn1 swiperNextBtn flexCenter" :disabled="btnNextDisabled" @click="onNext"><i class="iconfont icon-jiantou"></i></el-button>
                </template>
            </div>
        </div>
        
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    computed: {
        styleObj(){
            return{
                transform:`translateY(${this.translateY}px)`
            }
        },
        btnPrevDisabled(){
            return this.translateY == 0
        },
        btnNextDisabled(){
            let scrollHeight = this.$refs.swiperBox.scrollHeight;
            let offsetHeight = this.$refs.swiperBox.offsetHeight;
            return offsetHeight-scrollHeight  == this.translateY
        },
    },
    data() {
        return {
            translateY:0,
            isShowArrow:false,
            acativeIndex:0,
            homeTabLTopOne: true,
            homeTabLTopTwo: true,
            value: '',
            bg: 'bg',
            list: ['1栋','2栋','3栋','4栋','5栋','6栋','7栋','8栋','9栋','10栋','19栋','11栋','7栋','8栋','9栋','10栋','19栋','11栋'],
            year: '2021',
            mouth: '05'
        }
    },
    methods: {
        onChange(index){
            this.acativeIndex = index;
        },
        onPrev(){
            let outerHeight = $(".swiperSlideActive").outerHeight();
            this.translateY = this.translateY+outerHeight;
            if(this.translateY>=0){
                this.translateY = 0
            }
        },
        onNext(){
            let scrollHeight = this.$refs.swiperBox.scrollHeight;
            let offsetHeight = this.$refs.swiperBox.offsetHeight;
            let outerHeight = $(".swiperSlideActive").outerHeight();
            this.translateY = this.translateY-outerHeight;
            
            if(offsetHeight-this.translateY>=scrollHeight){
                this.translateY = offsetHeight-scrollHeight
            }
        },
        year1(){
            this.bg = 'bg'
        },
        mouth1(){
            this.bg = 'bg1'
        },
        homeTabTime(val){
            this.year = val.substr(0,4)
            this.mouth =  val.substr(5,2)
        },
        resizeFn() {
            this.translateY=0;
            let scrollHeight = this.$refs.swiperBox.scrollHeight;
            let offsetHeight = this.$refs.swiperBox.offsetHeight;
            if(scrollHeight>offsetHeight){
                this.isShowArrow = true;
            }else{
                this.isShowArrow = false;
            }
        },
    },
    mounted(){
        let self = this;
        this.resizeFn();
        window.addEventListener("resize", function () {
            self.resizeFn();
        });   
        

       
    }
}
</script>

<style  scoped>
    .homeTabimg1 /deep/ .el-input__prefix {
        width: 100%;
    }
    .swiperBox /deep/.el-button.is-disabled,  .el-button.is-disabled:hover {
        background-color: transparent;
    }
    .swiperBtn1.is-disabled{
        background-color: transparent;
    }


    @media screen and (min-width: 1665px) {
        .homeTabAll {
            width: calc(100% - 170px);
            display: flex;
            justify-content: space-between;
        }
        .homeConDiv button {
            background-color: #009999;
            border: 0;
        }


        .swiperBox{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .swiperBoxContain{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .swiperWrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
        .swiperSlide{
            position: relative;
            flex: none;
            width: 100%;
            height: 37px;
            line-height: 37px;
            font-size: 14px;
            color: rgba(255,255,255,0.5);
            text-align: center;
            overflow: hidden;
            cursor: pointer;
        }
        .swiperSlide /deep/ .el-tooltip {
            overflow: hidden;
        }
        .swiperSlideActive{
            font-size: 16px;
            color: #FFFFFF;
            background: rgb(255, 255, 255, 0.3);
            box-shadow: 0px 2px 4px 0px #008888;
        }
        .swiperBtn{
            position: absolute;
            top: 0;
            width: 60px;
            height: 40px;
            margin: 0 !important; 
            padding: 0;
            color: #ffffff;
            border-top-left-radius: 10px;
        }
        .swiperBtn:disabled{
            color: rgba(255,255,255,0.5);
            cursor: not-allowed;
        }
        .swiperBtn1:disabled{
            color: rgba(255,255,255,0.5);
            cursor: not-allowed;
        }
        .swiperBtn i{
            margin: 0;
            font-size: 16px;
        }
        .swiperBtn1 {
            position: absolute;
            bottom: 0;
            width: 60px;
            height: 40px;
            margin: 0 !important; 
            padding: 0;
            color: #ffffff;
            border-bottom-left-radius: 10px;
        }
        .swiperBtn1 i{
            margin: 0;
            font-size: 16px;
        }
        .swiperPrevBtn{
            left: 0;
        }
        .swiperPrevBtn i{
            transform: rotate(180deg);
        }
        .swiperNextBtn{
            left: 0;
            margin-left: 23px;
            width: 60px;
            height: 40px;
        }


        .homeTabLTopOneClick {
            position: absolute;
            top: 0;
            right: 0;
            width: 170px;
            height: 70px;
            background: #009999;
            box-shadow: 4px 18px 24px 0px rgba(31, 216, 216, 0.15);
            border-radius: 10px;
            padding: 13px 10px 0 20px;
        }

        .homeTabLTopTwoClick {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 170px;
            height: 70px;
            background: #009999;
            box-shadow: 4px 18px 24px 0px rgba(31, 216, 216, 0.15);
            border-radius: 10px;
            padding: 13px 10px 0 20px;
        }

        .homeTabFont {
            float: left;
        }

        .homeTabIcon {
            margin-top: 15px;
        }

        .homeTabFontTop {
            height: 14px;
        }
        .homeTabFontBottom {
            height: 14px;
            margin-top: 10px;
            font-size: 12px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 17px;
        }

        .homeTabNumber {
            font-family: "Arial Black";
        }

        .homeTabimg1 .el-date-editor {
                background-color: darkblue !important;
                width: auto !important;
                position: absolute !important;
                top: -15px !important;
                left: 0 !important;
                opacity: 0;
        }

        .bg {
            position: absolute;
            z-index: -1;
            left: 0;
            top: 34px;
            width: 90px;
            height: 32px;
            background-image: url(../assets/images/home/bg5.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        .bg1 {
            position: absolute;
            z-index: -1;
            left: 0;
            top: 100px;
            width: 90px;
            height: 32px;
            background-image: url(../assets/images/home/bg5.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        .homeTabimg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 34px;
            color: #FFFFFF;
        }

        .siemensLayoutHome{
            flex-direction: column;
            margin-top: -10px;
        }

        .homeTab {
            display: flex;
            justify-content: space-between;
            height: 160px;
            margin-bottom: 40px;
        }

        .homeTabO {
            z-index: 200;
            position: relative;
            width: 80px;
            height: 100%;
            padding: 18px 0 0 0;
            color: #ffffff;
            text-align: center;
            font-family: "Arial";
        }

        .homeTabOY {
            font-size: 12px;
            line-height: 12px;
            margin-bottom: 4px;
        }

        .homeTabOS {
            width: 100%;
            height: 32px;
            margin-bottom: 6px;
            font-size: 18px;
            line-height: 32px;
            font-family: "Arial Black";
            font-weight: 900;
            cursor: pointer;
        }

        .homeTabOLine {
            margin-left: 10px;
            width: 60px;
            height: 12px;
            border-top: 0.65px dashed #C9E5E5;
        }

        .homeTabimg1 {
            position: relative;
            font-size: 5px;
            color: #ffffff;
        }

        .homeTabT {
            position: relative;
            /* width: 310px; */
            width: 21.8%;
            height: 100%;
            padding: 20px 30px 0 30px;
            margin-right: 2.5%;
        }

        .homeTabTFont {
            float: left;
        }

        .homeTabTFontTit {
            height: 22px;
            font-size: 18px;
            font-family: "PingFang Bold";
            color: #FFFFFF;
            line-height: 25px;
            margin-bottom: 20px;
        }

        .homeTabTFontCon {
            height: 20px;
            font-size: 16px;
            font-family: "PingFang Regular";
            color: #FFFFFF;
            line-height: 22px;
            margin-bottom: 10px;
        }

        .shuzi {
            font-size: 18px;
            font-family: "Arial Black";
            font-weight: 900;
            color: #FFFFFF;
            line-height: 26px;
        }

        .homeTabTIcon {
            position: absolute;
            top: 20px;
            right: 20px;
            float: right;
            width: 70px;
            height: 70px;
            padding: 24px;
            border-radius: 50%;
        }

        .homeTabL {
            width: 90px;
            padding: 15px 0 15px 0;
            height: 100%;
            display: flex;
            flex-flow: row wrap;
            align-content: space-between;
        }

        .homeTabLTop {
            position: relative;
            width: 100%;
            height: 50px;
            padding: 18px 9px 18px 15px;
            background: #009999;
            box-shadow: 4px 18px 24px 0px rgba(31, 216, 216, 0.15);
            border-radius: 10px;
            cursor: pointer; 
        }

        .homeTabLTopIcon {
            float: left;
            font-size: 14px;
            margin-right: 4px;
            color: #FFFFFF;
        }

        .homeTabLTopFont {
            float: left;
            font-size: 14px;
            font-family: "PingFang Regular";
            font-weight: 400;
            color: #FFFFFF;
            line-height: 14px;
        }

        .homeTabLTopIcon2 {
            float: right;
            font-size: 8px;
            margin-top: 2px;
            color: #FFFFFF;
        }

        .g {
            background-color: #009999;
        }

        .b {
            background-color: #039BCD;
        }

        .y {
            background-color: #FF9200;
        }

        .r {
            background-color: #ED5565;
        }

        .green {
            background: linear-gradient(180deg, #60BDBF 0%, #009999 100%);
            box-shadow: 4px 18px 24px 0px rgba(31, 216, 216, 0.15);
            border-radius: 10px;
        }

        .blue {
            background: linear-gradient(180deg, #73DCFF 0%, #0099CB 100%);
            box-shadow: 4px 18px 24px 0px rgba(6, 157, 206, 0.15);
            border-radius: 10px;
        }

        .yellow {
            background: linear-gradient(180deg, #FFBD65 0%, #FF9200 100%);
            box-shadow: 4px 18px 24px 0px rgba(255, 146, 0, 0.15);
            border-radius: 10px;
        }

        .red {
            background: linear-gradient(180deg, #FFABB3 0%, #ED5565 100%);
            box-shadow: 4px 18px 24px 0px rgba(255, 150, 161, 0.15);
            border-radius: 10px;
        }

        .homeCon {
            position: relative;
            width: 100%;
            background-image: url(../assets/images/home/homebg.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: cover;
            flex: 1;

        }

        .homeConDiv {
            position: absolute;
            top: 50px;
            right: 0;
            width: 60px;
            height: calc(100% - 100px);
            padding: 40px 0;
            background: #009999;
            box-shadow: -3px 4px 22px 0px rgba(0, 81, 81, 0.56);
            border-radius: 10px 0px 0px 10px;
        }
    }

    @media screen and (max-width: 1664px) {
        
        .homeTabAll {
            width: calc(100% - 113px);
            display: flex;
            justify-content: space-between;
        }
        .homeConDiv button {
            background-color: #009999;
            border: 0;
        }


        .swiperBox{
            position: relative;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .swiperBoxContain{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .swiperWrapper{
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
        }
        .swiperSlide{
            position: relative;
            flex: none;
            width: 100%;
            height: 25px;
            line-height: 25px;
            font-size: 12px;
            color: rgba(255,255,255,0.5);
            text-align: center;
            overflow: hidden;
            cursor: pointer;
        }
        .swiperSlide /deep/ .el-tooltip {
            overflow: hidden;
        }
        .swiperSlideActive{
            font-size: 14px;
            color: #FFFFFF;
            background: rgb(255, 255, 255, 0.3);
            box-shadow: 0px 2px 4px 0px #008888;
        }
        .swiperBtn{
            position: absolute;
            top: 0;
            width: 40px;
            height: 27px;
            margin: 0 !important; 
            padding: 0;
            color: #ffffff;
            border-top-left-radius: 7px;
        }
        .swiperBtn:disabled{
            color: rgba(255,255,255,0.5);
            cursor: not-allowed;
        }
        .swiperBtn1:disabled{
            color: rgba(255,255,255,0.5);
            cursor: not-allowed;
        }
        .swiperBtn i{
            margin: 0;
            font-size: 11px;
        }
        .swiperBtn1 {
            position: absolute;
            bottom: 0;
            width: 40px;
            height: 27px;
            margin: 0 !important; 
            padding: 0;
            color: #ffffff;
            border-bottom-left-radius: 7px;
        }
        .swiperBtn1 i{
            margin: 0;
            font-size: 11px;
        }
        .swiperPrevBtn{
            left: 0;
        }
        .swiperPrevBtn i{
            transform: rotate(180deg);
        }
        .swiperNextBtn{
            left: 0;
            width: 40px;
            height: 27px;
        }


        .homeTabLTopOneClick {
            position: absolute;
            top: 0;
            right: 0;
            width: 113px;
            height: 47px;
            background: #009999;
            box-shadow: 3px 12px 16px 0px rgba(31, 216, 216, 0.15);
            border-radius: 7px;
            padding: 9px 7px 0 13px;
        }

        .homeTabLTopTwoClick {
            position: absolute;
            bottom: 0;
            right: 0;
            width: 113px;
            height: 47px;
            background: #009999;
            box-shadow: 3px 12px 16px 0px rgba(31, 216, 216, 0.15);
            border-radius: 7px;
            padding: 9px 7px 0 13px;
        }

        .homeTabFont {
            float: left;
        }

        .homeTabIcon {
            margin-top: 10px;
        }

        .homeTabFontTop {
            height: 9px;
        }
        .homeTabFontBottom {
            height: 9px;
            margin-top: 7px;
            font-size: 8px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 11px;
        }

        .homeTabNumber {
            font-family: "Arial Black";
        }

        .homeTabimg1 .el-date-editor {
                background-color: darkblue !important;
                width: auto !important;
                position: absolute !important;
                top: -10px !important;
                left: 0 !important;
                opacity: 0;
        }

        .bg {
            position: absolute;
            z-index: -1;
            left: 0;
            top: 23px;
            width: 60px;
            height: 21px;
            background-image: url(../assets/images/home/bg5.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        .bg1 {
            position: absolute;
            z-index: -1;
            left: 0;
            top: 67px;
            width: 60px;
            height: 21px;
            background-image: url(../assets/images/home/bg5.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: 100%;
        }

        .homeTabimg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 23px;
            color: #FFFFFF;
        }

        .siemensLayoutHome{
            flex-direction: column;
            margin-top: -7px;
        }

        .homeTab {
            display: flex;
            justify-content: space-between;
            height: 107px;
            margin-bottom: 27px;
        }

        .homeTabO {
            z-index: 200;
            position: relative;
            width: 53px;
            height: 100%;
            padding: 12px 0 0 0;
            color: #ffffff;
            text-align: center;
            font-family: "Arial";
        }

        .homeTabOY {
            font-size: 8px;
            line-height: 8px;
            margin-bottom: 3px;
        }

        .homeTabOS {
            width: 100%;
            height: 21px;
            margin-bottom: 4px;
            font-size: 12px;
            line-height: 21px;
            font-family: "Arial Black";
            font-weight: 900;
            cursor: pointer;
        }

        .homeTabOLine {
            margin-left: 7px;
            width: 40px;
            height: 8px;
            border-top: 0.65px dashed #C9E5E5;
        }

        .homeTabimg1 {
            position: relative;
            font-size: 3px;
            color: #ffffff;
        }

        .homeTabT {
            position: relative;
            /* width: 207px; */
            width: 21.8%;
            height: 100%;
            padding: 13px 20px 0 20px;
            margin-right: 2.5%;
        }

        .homeTabTFont {
            float: left;
        }

        .homeTabTFontTit {
            height: 15px;
            font-size: 12px;
            font-family: "PingFang Bold";
            color: #FFFFFF;
            line-height: 17px;
            margin-bottom: 13px;
        }

        .homeTabTFontCon {
            height: 13px;
            font-size: 11px;
            font-family: "PingFang Regular";
            color: #FFFFFF;
            line-height: 15px;
            margin-bottom: 7px;
        }

        .shuzi {
            font-size: 12px;
            font-family: "Arial Black";
            font-weight: 900;
            color: #FFFFFF;
            line-height: 17px;
        }

        .homeTabTIcon {
            position: absolute;
            top: 14px;
            right: 14px;
            float: right;
            width: 47px;
            height: 47px;
            border-radius: 50%;
            padding: 16px;
        }

        .homeTabL {
            width: 60px;
            padding: 10px 0 10px 0;
            height: 100%;
            display: flex;
            flex-flow: row wrap;
            align-content: space-between;
        }

        .homeTabLTop {
            position: relative;
            width: 100%;
            height: 33px;
            padding: 12px 6px 12px 8px;
            background: #009999;
            box-shadow: 3px 12px 16px 0px rgba(31, 216, 216, 0.15);
            border-radius: 7px;
            cursor: pointer;
        }

        .homeTabLTopIcon {
            float: left;
            font-size: 9px;
            /* margin-right: 3px; */
            color: #FFFFFF;
        }

        .homeTabLTopFont {
            float: left;
            font-size: 12px;
            transform: scale(0.8);
            font-family: "PingFang Regular";
            font-weight: 400;
            color: #FFFFFF;
            line-height: 9px;
            width: 19px;
            white-space:nowrap; 
        }

        .homeTabLTopIcon2 {
            float: right;
            font-size: 5px;
            margin-top: 1px;
            color: #FFFFFF;
        }

        .g {
            background-color: #009999;
        }

        .b {
            background-color: #039BCD;
        }

        .y {
            background-color: #FF9200;
        }

        .r {
            background-color: #ED5565;
        }

        .green {
            background: linear-gradient(180deg, #60BDBF 0%, #009999 100%);
            box-shadow: 3px 12px 16px 0px rgba(31, 216, 216, 0.15);
            border-radius: 7px;
        }

        .blue {
            background: linear-gradient(180deg, #73DCFF 0%, #0099CB 100%);
            box-shadow: 3px 12px 16px 0px rgba(6, 157, 206, 0.15);
            border-radius: 7px;
        }

        .yellow {
            background: linear-gradient(180deg, #FFBD65 0%, #FF9200 100%);
            box-shadow: 3px 12px 16px 0px rgba(255, 146, 0, 0.15);
            border-radius: 7px;
        }

        .red {
            background: linear-gradient(180deg, #FFABB3 0%, #ED5565 100%);
            box-shadow: 3px 12px 16px 0px rgba(255, 150, 161, 0.15);
            border-radius: 7px;
        }

        .homeCon {
            position: relative;
            width: 100%;
            background-image: url(../assets/images/home/homebg.png);
            background-position: top center;
            background-repeat: no-repeat;
            background-size: cover;
            flex: 1;

        }

        .homeConDiv {
            position: absolute;
            top: 33px;
            right: 0;
            width: 40px;
            height: calc(100% - 100px);
            padding: 27px 0;
            background: #009999;
            box-shadow: -2px 3px 15px 0px rgba(0, 81, 81, 0.56);
            border-radius: 7px 0px 0px 7px;
        }
    }

    
</style>
