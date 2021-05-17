<template>
    <div class="layoutBox flexBox">
        <div class="layoutLeft" :class="{'closeLayoutLeft' : isCollapse }">
            <div class="collapseBox">
                <i class="iconfont icon-zuosuojin" @click="setCollapse"></i>
            </div>
            <div class="logoBox" v-if="!isCollapse">
                <img src="../assets/images/layout/logo.png">
            </div>
            <!-- <Tree v-if="$route.path == '/home'"></Tree> -->
            <Menu v-if="$route.meta.path == '/custom'"></Menu>
        </div>
        <div class="layoutRight">
            <Header></Header>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>

import Header from "@/components/ftd-header/header";
import Tree from "@/components/ftd-tree/tree";
import Menu from "@/components/ftd-menu/menu";
import { mapGetters } from 'vuex'
  export default {
    computed:{
        ...mapGetters({
            collapse: 'collapse'
        })
    },    
    watch:{
        collapse(newVal){
            this.isCollapse = newVal;
        }
    },
    components:{
        Header:Header,
        Tree:Tree,
        Menu:Menu
    },
    data(){
        return{
            isCollapse:false
        }
    },
    methods:{
        setCollapse(){
            this.isCollapse = !this.isCollapse;
            this.$store.dispatch('setCollapse',this.isCollapse);
        }
    }
}
</script>
<style scoped>
/* 1920 */
@media screen and (min-width: 1665px) {
    .layoutBox{
        width: 100%;
        height: 100vh;
    }
    .layoutLeft{
        display: flex;
        flex-direction: column;
        width: 280px;
        height: 100%;
        background: linear-gradient(180deg, #50BEBE 0%, #009999 45%, #0099B0 75%, #0099CB 100%);
        border-radius: 0px 10px 10px 0px;
        transition: all .5s;
    }
    .closeLayoutLeft,
    .layoutLeft /deep/ .el-menu--collapse{
        width: 60px;
        transition: all .5s;
    }

    .collapseBox{
        padding: 30px 20px 22px 0;
        text-align: right;
    }
    .collapseBox i{
        font-size: 22px;
        color: rgba(255,255,255,0.7);
        cursor: pointer;
    }
    .logoBox{
        width: 75%;
        margin: 0 auto;
    }
   


    .layoutRight{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 40px 40px 40px;
        overflow: hidden;
    }
    .siemensLayoutCon{
        flex: 1;
    }
}

/* 1280*/
@media screen and (max-width: 1664px) {
    .layoutBox{
        width: 100%;
        height: 100vh;
    }
    .layoutLeft{
        display: flex;
        flex-direction: column;
        width: 186px;
        height: 100%;
        background: linear-gradient(180deg, #50BEBE 0%, #009999 45%, #0099B0 75%, #0099CB 100%);
        border-radius: 0px 10px 10px 0px;
        transition: all .5s;
    }
    .closeLayoutLeft,
    .layoutLeft /deep/ .el-menu--collapse{
        width: 40px;
        transition: all .5s;
    }
    .collapseBox{
        padding: 20px 12px 15px 0;
        text-align: right;
    }
    .collapseBox i{
        font-size: 15px;
        color: rgba(255,255,255,0.7);
        cursor: pointer;
    }
    .logoBox{
        width: 75%;
        margin: 0 auto;
    }


    .layoutRight{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0 26px 26px 26px;
        overflow: hidden;
    }
    .siemensLayoutCon{
        flex: 1;
    }
}
</style>
