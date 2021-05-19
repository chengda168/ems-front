<template>
    <div class="flexBetween NavBox">
        <div class="flexBox menuListBox">
            <router-link :to="item.path"  v-for="(item,index) in menuList" :key="index" class="menuItems flexCenter" :class="{'activeMenu' : $route.meta.path == item.path }">
                {{item.name}}
            </router-link>
        </div>
        <ul class="flexCenter">
            <li class=" flexCenter" :class="isTips ? 'newsRedTips' : 'newsTips'">
                <img src="@/assets/images/layout/icon1.png" class="navTipImg">
            </li>
            <li class="flexCenter langBox">
                <i class="iconfont icon-yuyan" @click.stop="isShowLang = !isShowLang;isShowHead = false"></i>
                <ul class="selectItemBox" v-if="isShowLang">
                    <li class="selectItems" v-for="(item,index) in langList" :key="index" :class="{ langActive: activeIndex == item }" 
                    @click.stop="onSelectLang(item)" @mouseover.stop="hoverLanguage(item)">{{item}}</li>
                </ul>
            </li>
            <li class="navHead flexCenter">
                <i class="iconfont icon-icontouxiang" @click.stop="isShowHead = !isShowHead;isShowLang = false"></i>
                <ul class="selectItemBox" v-if="isShowHead">
                    <li class="selectItems" v-for="(item,index) in headList" :key="index"  
                    @click.stop="onSelectItem(index)"><i :class="item.icon"></i>{{item.name}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters({
            lang: 'lang'
        })
    },
    data(){
        return{
            isTips:true, //是否有新消息提示
            menuList:[
                {
                    name:'首    页',
                    path:'/home'
                },
                {
                    name:'能耗看板',
                    path:'/board/index'
                },
                {
                    name:'数据统计',
                    path:'/'
                },
                {
                    name:'告警运维',
                    path:'/'
                },
                {
                    name:'能耗报表',
                    path:'/'
                },
                {
                    name:'在线监测',
                    path:'/'
                },
                {
                    name:'综合管理',
                    path:'/manage/custom'
                }
            ],
            activeIndex:'Cn',
            isShowLang:false,
            langList:['Cn','En','De'],
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
        }
    },
    methods:{
        onSelectLang(text){
            this.$i18n.locale =text
            this.isShowLang = false;
            this.$store.dispatch('setLang',this.$i18n.locale);
        },
        hoverLanguage(item){
            this.activeIndex = item;
        },
        onSelectItem(index){
            if(index == 0){
                // 修改密码
                this.$router.push("/editPass");
            }else{
                // 退出登录
                this.$router.push("/login");
            }
        }
    },
    mounted(){
        this.activeIndex = this.lang;
        let self = this;
        document.documentElement.onclick=function(){
            self.isShowLang=false
            self.isShowHead=false
            
        }
    }
}
</script>

<style  scoped>
/* 1920 */
@media screen and (min-width: 1665px) {
    .NavBox{
        height: 120px;
        padding: 30px 0 50px 110px;
    }
    .menuItems{
        width: 120px;
        height: 40px;
        font-size: 16px;
        color: #3C464B;
    }
    .menuItems:not(:last-child){
        margin-right: 20px;
    }
    .activeMenu{
        background-color: rgba(0,153,153,0.08);
        border-radius: 10px;
         color: #009999;
    }
    .navTipImg{
        width: 24px;
    }
    .newsTips,
    .newsRedTips,
    .langBox{
        position: relative;
        cursor: pointer;
    }
    .newsRedTips::after{
        content: "";
        position: absolute;
        top: 2px;
        right: 0;
        width: 9px;
        height: 9px;
        background-color: #ED5565;
        border-radius: 50%;
    }
    .iconfont{
        margin: 0 30px;
        font-size: 27px;
    }
    .navHead{
        position: relative;
        width: 24px;
        height: 24px;
        background-color: #3C464B;
        border-radius: 50%;
        cursor: pointer;
    }
    .navHead i{
        margin: 0;
        font-size: 15px;
        color: #fff;
    }
     /* 语言菜单 */
  .selectItemBox{
      position: absolute;
      top: 40px;
      right: -18px;
      width: 120px;
      height: 142px;
      padding-top: 15px;
      background-color: #009999;
      box-shadow: 0px 6px 12px 0px rgba(0, 102, 102, 0.2);
      border-radius: 4px;
      z-index: 9;
  }
  .selectItemBox::after{
    content: "";
    position: absolute;
    top: -12px;
    left: 54px;
    width:0;
    height:0;
    border-width: 6px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #009999;
  }
  .selectItems{
    height: 30px;
    line-height: 30px;
    font-family: "Arial";
    font-size: 14px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .selectItems:not(:last-child){
    margin-bottom: 10px;
  }
  .langActive{
    background-color: rgba(255,255,255,0.2);
  }
  .navHead .selectItemBox{
      height: 100px;
  }
  .navHead .selectItemBox::after{
      left:85px;
  }
  .navHead .selectItems{
      padding: 0 20px;
      font-family: "PingFang Regular";
      text-align: left;
  }
  .navHead .selectItems:hover{
      background-color: rgba(255,255,255,0.2);
  }
  .navHead .selectItems i{
      margin-right: 6px;
      font-size: 14px;
  }
}

/* 1280*/
@media screen and (max-width: 1664px) {
    .NavBox{
        height: 80px;
        padding: 20px 0 34px 73px;
    }
    .menuItems{
        width: 80px;
        height: 26px;
        font-size: 12px;
        color: #3C464B;
    }
    .menuItems:not(:last-child){
        margin-right: 14px;
    }
    .activeMenu{
        background-color: rgba(0,153,153,0.08);
        border-radius: 6px;
         color: #009999;
    }
    .navTipImg{
        width: 16px;
    }
    .newsTips,
    .newsRedTips,
    .langBox{
        position: relative;
        cursor: pointer;
    }
    .newsRedTips::after{
        content: "";
        position: absolute;
        top: 1px;
        right: 0;
        width: 6px;
        height: 6px;
        background-color: #ED5565;
        border-radius: 50%;
    }
    .iconfont{
        margin: 0 20px;
        font-size: 18px;
    }
    .navHead{
        position: relative;
        width: 16px;
        height: 16px;
        background-color: #3C464B;
        border-radius: 50%;
    }
    .navHead i{
        margin: 0;
        font-size: 12px;
        transform: scale(0.7);
        transform-origin: center;
        color: #fff;
    }

      /* 语言菜单 */
  .selectItemBox{
      position: absolute;
      top: 26px;
      right: -12px;
      width: 80px;
      height: 95px;
      padding-top: 10px;
      background-color: #009999;
      box-shadow: 0px 6px 12px 0px rgba(0, 102, 102, 0.2);
      border-radius: 4px;
      z-index: 9;
  }
  .selectItemBox::after{
    content: "";
    position: absolute;
    top: -8px;
    left: 36px;
    width:0;
    height:0;
    border-width: 4px;
    border-color: transparent;
    border-style: solid;
    border-bottom-color: #009999;
  }
  .selectItems{
    height: 20px;
    line-height: 20px;
    font-family: "Arial";
    font-size: 12px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  .selectItems:not(:last-child){
    margin-bottom: 6px;
  }
  .langActive{
    background-color: rgba(255,255,255,0.2);
  }
  .navHead .selectItemBox{
      height: 66px;
  }
  .navHead .selectItemBox::after{
      left:56px;
  }
  .navHead .selectItems{
      padding: 0 0 0 10px;
      font-family: "PingFang Regular";
      text-align: left;
  }
  .navHead .selectItems:hover{
      background-color: rgba(255,255,255,0.2);
  }
  .navHead .selectItems i{
      margin-right: 4px;
      font-size: 12px;
  }
}
</style>
