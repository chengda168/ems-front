<template>
    <div class="tabBox">
        <ul class="flexBox tabItemsBox">
            <li v-for="(item,index) in list" :key="index" class="tabItemBox" 
            :class="{'tabItemsActive' : activeIndex == index}" @click="onChange(index,item)">{{item.name}}</li>
        </ul>
        <div class="tabBottomBox"></div>
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
  
    data() {
        return {
            activeIndex:0,
        };
    },
    methods: {
        onChange(index,item){
            this.activeIndex = index;
            this.$emit('tabChange',item)
        },
    }
};
</script>

<style scoped>
 @media screen and (min-width: 1665px) {
     .tabBox{
         position: relative;
         width: 100%;
         height: 80px;
         
     }
     .tabItemsBox{
        height: 100%;
        padding-left: 30px;
     }
     .tabItemBox{
        height: 100%;
        line-height: 80px;
        font-size: 18px;
        color: #879BAA;
        cursor: pointer;
     }
     .tabItemBox:not(:last-child){
         margin-right: 60px;
     }
    .tabItemsActive{
        position: relative;
        font-weight: 500;
        color:#3C464B
    }

    .tabBottomBox{
        position: absolute;
        bottom: -10px;
        left: 0px;
        width: 100%;
        height: 10px;
        border: 3px solid #009999;
        border-bottom-color: transparent;
        border-radius: 10px 10px 0 0;
    }
    .tabItemsActive::before{
        content: "";
        position:absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent transparent  #009999 transparent;
    }
    
}


 @media screen and (max-width: 1664px) {
     .tabBox{
         position: relative;
         width: 100%;
         height: 54px;
         
     }
     .tabItemsBox{
        height: 100%;
        padding-left: 20px;
     }
     .tabItemBox{
        height: 100%;
        line-height: 54px;
        font-size: 12px;
        color: #879BAA;
        cursor: pointer;
     }
     .tabItemBox:not(:last-child){
         margin-right: 40px;
     }
    .tabItemsActive{
        position: relative;
        font-weight: 500;
        color:#3C464B
    }
    .tabBottomBox{
        position: absolute;
        bottom: -6px;
        left: 0px;
        width: 100%;
        height: 6px;
        border: 2px solid #009999;
        border-bottom-color: transparent;
        border-radius: 6px 6px 0 0;
    }
    .tabItemsActive::before{
        content: "";
        position:absolute;
        bottom: 0px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-width: 4px;
        border-style: solid;
        border-color: transparent transparent  #009999 transparent;
    }
}
    
    
</style>
