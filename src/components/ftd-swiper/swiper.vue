<template>
    <div class="swiperBox">
        <div class="swiperBoxContain">
            <ul class="swiperWrapper" ref="swiperBox" :style="styleObj">
                <li class="swiperSlide" :class="{'swiperSlideActive' : activeIndex == index}" 
                v-for="(item,index) in list" :key="index" @click="onChange(index,item)">
                    {{item}}
                </li>
            </ul>
        </div>
         <template v-if="isShowArrow">
            <el-button type="primary" class="swiperBtn swiperPrevBtn flexCenter" :disabled="btnPrevDisabled" @click="onPrev"><i class="iconfont icon-youjiantou"></i></el-button>
            <el-button type="primary" class="swiperBtn swiperNextBtn flexCenter" :disabled="btnNextDisabled" @click="onNext"><i class="iconfont icon-youjiantou"></i></el-button>
        </template>
    </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    }
  },
  computed:{
        styleObj(){
            return{
                 transform:`translateX(${this.translateX}px)`
            }
        },
        btnPrevDisabled(){
            return this.translateX == 0
        },
        btnNextDisabled(){
            let scrollWidth = this.$refs.swiperBox.scrollWidth;
            let offsetWidth = this.$refs.swiperBox.offsetWidth;
            return offsetWidth-scrollWidth  == this.translateX
        }
    },
  data() {
    return {
        translateX:0,
        isShowArrow:false,
        activeIndex:0,
    };
  },
  methods: {
    onChange(index,item){
        this.activeIndex = index;
        this.$emit('swiperChange',item)
    },
     onPrev(){
        let outerWidth = $(".swiperSlideActive").outerWidth(true);
        this.translateX = this.translateX+outerWidth;
        if(this.translateX>=0){
            this.translateX = 0
        }
    },
    onNext(){
        let scrollWidth = this.$refs.swiperBox.scrollWidth;
        let offsetWidth = this.$refs.swiperBox.offsetWidth;
        let outerWidth = $(".swiperSlideActive").outerWidth(true);
        this.translateX = this.translateX-outerWidth;
        if(offsetWidth-this.translateX>=scrollWidth){
            this.translateX = offsetWidth-scrollWidth
        }
    },
    resizeFn(){
        this.translateX=0;
        this.$nextTick(function(){
            let scrollWidth = this.$refs.swiperBox.scrollWidth;
            let offsetWidth = this.$refs.swiperBox.offsetWidth;
            if(scrollWidth>offsetWidth){
                this.isShowArrow = true;
            }else{
                this.isShowArrow = false;
            }
        })
        
    }
  },
  mounted(){
        let self = this;
        this.resizeFn();
        window.addEventListener("resize", function () {
            self.resizeFn();
        });  
       
    }
};
</script>

<style scoped>
 @media screen and (min-width: 1665px) {
    .swiperBox{
        position: relative;
        height: 60px;
        padding: 0 140px 20px 140px;
    }
    .swiperBoxContain{
        height: 60px;
        padding: 0 10px;
        overflow: hidden;
    }
    .swiperWrapper{
        display: flex;
        width: auto;
        height: 40px;
        white-space: nowrap;
    }
    .swiperSlide{
        position: relative;
        flex: none;
        width: 110px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        color: #3C464B;
        text-align: center;
        background: #FFFFFF;
        border: 1px solid transparent;
        box-shadow: 0px 1px 4px 0px rgba(0, 41, 58, 0.2);
        border-radius: 10px;
        cursor: pointer;
    }
    .swiperSlide /deep/ .el-tooltip {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .swiperSlideActive{
        color:#009999;
        border: 1px solid #009999;
    }
    .swiperSlide:not(:last-child){
        margin-right: 34px;
    }
    .swiperBtn{
        position: absolute;
        top: 0;
        width: 40px;
        height: 40px;
        margin: 0 !important; 
        padding: 0;
        color: #ffffff;
        background-color: #009999;
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
    .swiperBtn.is-disabled{
        background-color: #BECDD7;
    }
    .swiperBtn i{
        margin: 0;
        font-size: 20px;
    }
    .swiperPrevBtn{
        left: 40px;
    }
    .swiperPrevBtn i{
        transform: rotate(180deg);
    }
    .swiperNextBtn{
        right: 40px;
    }
    
}


 @media screen and (max-width: 1664px) {

   .swiperBox{
        position: relative;
        height: 40px;
        padding: 0 94px 14px 94px;
    }
    .swiperBoxContain{
        height: 40px;
        padding: 0 6px;
        overflow: hidden;
    }
    .swiperWrapper{
        display: flex;
        width: auto;
        height: 26px;
        white-space: nowrap;
    }
    .swiperSlide{
        position: relative;
        flex: none;
        width: 74px;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #3C464B;
        text-align: center;
        background: #FFFFFF;
        border: 1px solid transparent;
        box-shadow: 0px 1px 3px 0px rgba(0, 41, 58, 0.2);
        border-radius: 6px;
        cursor: pointer;
    }
    .swiperSlide /deep/ .el-tooltip {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .swiperSlideActive{
        color:#009999;
        border: 1px solid #009999;
    }
    .swiperSlide:not(:last-child){
        margin-right: 22px;
    }
    .swiperBtn{
        position: absolute;
        top: 0;
        width: 26px;
        height: 26px;
        margin: 0 !important; 
        padding: 0;
        color: #ffffff;
        background-color: #009999;
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
    .swiperBtn.is-disabled{
        background-color: #BECDD7;
    }
    .swiperBtn i{
        margin: 0;
        font-size: 14px;
    }
    .swiperPrevBtn{
        left: 26px;
    }
    .swiperPrevBtn i{
        transform: rotate(180deg);
    }
    .swiperNextBtn{
        right: 26px;
    }
}
    
    
</style>
