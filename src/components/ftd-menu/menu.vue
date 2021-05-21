<template>
    <div>
        <el-menu class="menuBox" unique-opened :collapse="collapse" :class="{'closeMenu':collapse}"
            :default-active="activeRourter" router :default-openeds="openedsIndex"
           >
           <template v-for="(item,index) in menuList" >
               <el-submenu :index="item.id" :key="index" v-if="item.children">
                    <template slot="title" >
                        <div class="menuTitle"  @click="handleselect(item.id)">
                            <i :class="item.iconfont"></i>
                            <span>{{item.title}}</span>
                        </div>
                    </template>
                    <el-menu-item  v-for="(items,index) in item.children" :index="items.path"  :key="index">{{items.name}}</el-menu-item>
                    
                </el-submenu>
                <el-menu-item  v-else :index="item.path"  :key="index" class="oneMenu">
                    <div class="menuTitle"  @click="handleselect(item.id)">
                        <i :class="item.iconfont"></i>
                        <span>{{item.title}}</span>
                    </div>
                </el-menu-item>
           </template>
            
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    computed:{
        ...mapGetters({
            collapse: 'collapse'
        })
    },
    watch:{
        collapse(newVal){
            if(!newVal){
                
            }else{
               
            }
        }
    },
    data(){
        return{
            activeRourter:'/manage/custom',
            openedsIndex:['0'],
            menuList:[
                {
                    title:'用户管理',
                    iconfont:'iconfont icon-yonghu',
                    path:'/manage/custom',
                    id:'0',
                    children:[
                        
                        {
                            name:'客户信息管理', 
                            path:'/manage/custom'
                        },
                        {
                            name:'人员信息管理',
                            path:'/manage/staff'
                        },
                        {
                            name:'运维单位信息管理', 
                            path:'/manage/opcompany'
                        },
                        {
                            name:'运维团队信息管理',
                            path:'/manage/opteam'
                        }
                    ]
                },
                {
                    title:'档案管理',
                    iconfont:'iconfont icon-dangan',
                    // path:'/aa',
                    id:'1',
                    children:[
                        {
                            name:'建筑信息管理',
                            path:'/manage/build'
                        },
                        {
                            name:'设备信息管理',
                            path:'/manage/device'
                        },
                        {
                            name:'表计、传感器信息管理',
                            path:'/manage/meter'
                        },
                        {
                            name:'规则定义',
                            path:'/manage/rule'
                        },
                        {
                            name:'能耗指标定义',
                            path:'/manage/energy'
                        },
                        {
                            name:'价格录入',
                            path:'/manage/price'
                        }
                    ]
                },
                {
                    title:'系统管理',
                    iconfont:'iconfont icon-xitongshezhi',
                    id:'2',
                     children:[
                        {
                            name:'数据字典管理',
                            path:'/manage/data'
                        },
                        {
                            name:'系统日志管理',
                            path:'/manage/log'
                        },
                        {
                            name:'首页广告位管理',
                            path:'/manage/advertise'
                        }
                    ]
                },
                {
                    title:'信息发布',
                    iconfont:'iconfont icon-xinxifabu',
                    id:'3',
                    path:'/manage/info'
                }
            ]
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleselect(id){
          
          if(this.collapse == true){
                let arr=[]
                arr.push(id)
                this.openedsIndex = arr;
            }
           this.$store.dispatch('setCollapse',false);
          
      }
    },
    mounted(){
        this.activeRourter = this.$route.path
    }
}
</script>

<style  scoped>

/* 1920 */
@media screen and (min-width: 1665px) {
    .menuBox{
        margin-top: 48px;
    }
    /deep/  .el-menu{
        background-color: transparent;
        border:0;
    }
    /deep/ .el-submenu__title{
        position: relative;
        height: 40px;
        line-height: 40px;
        padding: 0 !important;
        margin-bottom: 5px;
        font-size: 16px;
        color: #fff;
    }
    .menuTitle{
        padding: 0 30px !important;
    }
    .closeMenu{
        margin-top: 68px;
    }
    .closeMenu /deep/ .el-submenu__title{
        padding: 0 !important;
    }
    .closeMenu /deep/ .menuTitle{
        padding: 0 22px !important;
    }
   .closeMenu /deep/ .el-submenu__title span,
   .closeMenu /deep/ .el-submenu__icon-arrow{
        display: none;
    }
  
    /deep/ .el-submenu.is-active .el-submenu__title::after,
    .oneMenu.is-active::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 40px;
        background-color: #FFB900;
        border-radius: 2px;
    }
     /deep/ .el-submenu__title .iconfont,
     .oneMenu .iconfont{
         display: inline-block;
         width: 16px;
         height: 16px;
         line-height: 16px;
         margin-right: 12px;
         font-size: 18px;
         color: #fff;
         vertical-align: middle;
     }
     /deep/ .el-submenu__title .icon-xitongshezhi{
         font-size: 22px;
         margin-left: -2px;
         margin-right: 14px;
     }
    /deep/ .el-submenu__title .icon-dangan{
        font-size: 17px;
     }
     /deep/ .oneMenu .icon-xinxifabu{
          font-size: 20px;
     }
     /deep/ .oneMenu span{
          font-size: 16px;
     }
    /deep/ .el-submenu__title .el-submenu__icon-arrow{
        color: #fff;
        transform: rotate(-90deg);
    }
    /deep/ .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
        transform: rotate(0deg);
    }
    /deep/ .el-menu-item.is-active,
    /deep/ .el-submenu__title:hover,
    /deep/ .el-menu-item:focus, 
    /deep/ .el-menu-item:hover{
        background-color: rgba(255,255,255,0.15);
    }
    /deep/ .el-menu-item{
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        color: #fff;
        padding: 0 0 0 70px !important;
    }
    .oneMenu{
        padding-left: 0 !important;
    }
}
/* 1280*/
@media screen and (max-width: 1664px) {
    .menuBox{
        margin-top: 32px;
    }
    /deep/  .el-menu{
        background-color: transparent;
        border:0;
    }
    /deep/ .el-submenu__title{
        position: relative;
        height: 26px;
        line-height: 26px;
        padding: 0 !important;
        margin-bottom: 3px;
        font-size: 12px;
        color: #fff;
    }
    .menuTitle{
        padding: 0 20px !important;
    }
    .closeMenu{
        margin-top: 45px;
    }
    .closeMenu /deep/ .el-submenu__title{
        padding: 0 !important;
    }
    .closeMenu /deep/ .menuTitle{
        padding: 0 14px !important;
    }
   .closeMenu /deep/ .el-submenu__title span,
   .closeMenu /deep/ .el-submenu__icon-arrow{
        display: none;
    }
  
    /deep/ .el-submenu.is-active .el-submenu__title::after,
    .oneMenu.is-active::after{
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 2px;
        height: 26px;
        background-color: #FFB900;
        border-radius: 1px;
    }
     /deep/ .el-submenu__title .iconfont,
     .oneMenu .iconfont{
         display: inline-block;
         width: 11px;
         height: 11px;
         line-height: 11px;
         margin-right: 8px;
         font-size: 12px;
         color: #fff;
         vertical-align: middle;
     }
     /deep/ .el-submenu__title .icon-xitongshezhi{
         font-size: 14px;
         margin-left: -1px;
         margin-right: 9px;
     }
    /deep/ .el-submenu__title .icon-dangan{
        font-size: 12px;
     }
     /deep/ .oneMenu .icon-xinxifabu{
          font-size: 14px;
     }
    /deep/ .el-submenu__title .el-submenu__icon-arrow{
        color: #fff;
        transform: rotate(-90deg);
    }
    /deep/ .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow{
        transform: rotate(0deg);
    }
    /deep/ .el-menu-item.is-active,
    /deep/ .el-submenu__title:hover,
    /deep/ .el-menu-item:focus, 
    /deep/ .el-menu-item:hover{
        background-color: rgba(255,255,255,0.15);
    }
    /deep/ .el-menu-item{
        height: 26px;
        line-height: 26px;
        font-size: 12px;
        color: #fff;
        padding: 0 0 0 46px !important;
    }
    .oneMenu{
        padding-left: 0 !important;
    }
}
</style>
