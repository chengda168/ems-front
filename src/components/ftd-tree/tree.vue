<template>
    <div class="leftTreeBox">
        <el-input
            :placeholder="placeholder"
            v-model="keyword" class="treeSearchBox">
            <i slot="suffix" class="iconfont icon-sousuo"></i>
        </el-input>
        <el-scrollbar style="height:100%">
            <el-tree :data="data" ref="tree" :key="index" node-key="id" highlight-current  :filter-node-method="filterNode" :default-expanded-keys="expandedKeys"
            :current-node-key="currentNode" @node-click="handleNodeClick">
                <div class="el-tree-node__label" slot-scope="{ node, data }" :class="{'currentParentNode' : data.id == parentNode}">
                    <span>{{ node.label }}</span>
                </div>
            </el-tree>
        </el-scrollbar>
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
    data(){
        return{
            placeholder:'搜索园区',
            index:0,
            keyword:'',
            currentNode:'1', //默认选中的节点
            parentNode:'1', //选中节点父节点
            expandedKeys:['1'],//默认展开的key
            data: [
                {
                    label: '某某工业园区1',
                    id:'1',
                    children: [
                        {
                            label: '园区A区一栋',
                            id:'1-1',
                            children: [
                                {label: '一栋1楼',id:'1-1-1'},
                                {label: '一栋2楼',id:'1-1-2'},
                                {label: '一栋3楼',id:'1-1-3'},
                                {label: '一栋4楼',id:'1-1-4'},
                                {label: '一栋5楼',id:'1-1-5'},
                                {label: '一栋6楼',id:'1-1-6'},
                            ]
                        },
                       {
                            label: '园区A区二栋',
                            id:'1-2',
                            children: [
                                {label: '二栋1楼',id:'1-2-1'},
                                {label: '二栋2楼',id:'1-2-2'},
                                {label: '二栋3楼',id:'1-2-3'},
                                {label: '二栋4楼',id:'1-2-4'},
                                {label: '二栋5楼',id:'1-2-5'},
                                {label: '二栋6楼',id:'1-2-6'},
                            ]
                        },
                        {
                            label: '园区A区三栋',
                            id:'1-3',
                            children: [
                                {label: '三栋1楼',id:'1-3-1'},
                                {label: '三栋2楼',id:'1-3-2'},
                                {label: '三栋3楼',id:'1-3-3'},
                                {label: '三栋4楼',id:'1-3-4'},
                                {label: '三栋5楼',id:'1-3-5'},
                                {label: '三栋6楼',id:'1-3-6'},
                            ]
                        }
                    ]
                }, 
            ]

        }
    },
    watch: {
      keyword(val) {
        this.$refs.tree.filter(val);
      },
       collapse(newVal){
            if(newVal){
                this.placeholder=''
                this.$nextTick(function(){
                    this.index++;
                    this.expandedKeys=[]
                })
            }else{
                this.placeholder='搜索园区'
            }
        }
    },
    methods:{
        setCurrentNode(data){
            data.map((item,index)=>{
                if(index == 0){
                    if(item.children){
                        this.setCurrentNode(item.children)
                    }else{
                        console.log(item)
                        this.$refs.tree.setCheckedKeys([3]);
                        this.currentNode= item.id;
                    }
                }
            })
        },
        getTree(){
            this.setCurrentNode(this.data)
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleNodeClick(data,node){
            console.log('data',data)
            console.log('node',node)
            this.$store.dispatch('setCollapse',false);
            if(node.level == 3){
                this.parentNode=node.parent.parent.data.id;
            }else if(node.level == 2){
                this.parentNode=node.parent.data.id;
            }else{
                this.parentNode=node.data.id;
            }
        }
    },
    mounted(){
        this.getTree()
    }
}
</script>
<style scoped>
/* 1920 */
@media screen and (min-width: 1665px) {
    .treeSearchBox{
        display: block;
        width: 78.576%;
        margin: 40px auto 18px auto;
    }
    .treeSearchBox /deep/  .el-input__inner{
        height: 34px;
        line-height: 34px;
        padding: 0 15px;
        font-size: 14px;
        color: #fff !important;
        background-color: #009999;
        box-shadow: 0px 0px 4px 2px #008D8D;
        border-radius: 10px;
        border: 0;
    }
    .treeSearchBox /deep/  .el-input__inner::placeholder{
        color: #fff;
    }
    .treeSearchBox /deep/ .el-input__suffix{
        right: 15px;
        line-height: 34px;
        color: #fff;
    }
    .closeLayoutLeft .treeSearchBox /deep/ .el-input__suffix{
        right: 12px;
    }
    .closeLayoutLeft .treeSearchBox{
        width: 66.67%;
    }
    .closeLayoutLeft /deep/  .el-input__inner{
        padding: 0;
    }

    .leftTreeBox{
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .leftTreeBox /deep/ .el-tree,
    .leftTreeBox /deep/ .el-tree-node__content:hover,
    .leftTreeBox /deep/ .el-tree-node:focus>.el-tree-node__content{
        background-color: transparent;
    }
    .leftTreeBox /deep/ .el-tree-node__label{
        font-size: 14px;
        color: #fff;
    }
    .leftTreeBox /deep/ .el-tree-node__content{
        position: relative;
        height: 40px;
        padding-left: 40px !important;
    }
    .closeLayoutLeft  .leftTreeBox /deep/ .el-tree-node__content{
        padding-left: 6px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__content{
        
        padding-left: 60px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__children  .el-tree-node__content{
        padding-left: 115px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__children  .el-tree-node__content .el-tree-node__expand-icon.is-leaf{
        display: none;
    }
    .leftTreeBox /deep/ .el-tree-node__expand-icon{
        color: #fff;
    }
    .leftTreeBox /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background-color: rgba(255,255,255,0.15);
    }
    .currentParentNode::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 4px;
        height: 40px;
        background: #FFB900;
        border-radius: 2px;
    }
}
/* 1280*/
@media screen and (max-width: 1664px) {
    .treeSearchBox{
        display: block;
        width: 78.576%;
        margin: 26px auto 12px auto;
    }
    .treeSearchBox /deep/  .el-input__inner{
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
        font-size: 12px;
        color: #fff !important;
        background-color: #009999;
        box-shadow: 0px 0px 3px 1px #008D8D;
        border-radius: 6px;
        border: 0;
    }
    .treeSearchBox /deep/  .el-input__inner::placeholder{
        color: #fff;
    }
    .treeSearchBox /deep/ .el-input__suffix{
        right: 10px;
        color: #fff;
    }
    .treeSearchBox /deep/ .el-input__suffix i{
        font-size: 12px;
    }
    .closeLayoutLeft .treeSearchBox /deep/ .el-input__suffix{
        right: 8px;
    }
    
    .closeLayoutLeft .treeSearchBox{
        width: 66.67%;
    }
    .closeLayoutLeft /deep/  .el-input__inner{
        padding: 0;
    }

    .leftTreeBox{
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    .leftTreeBox /deep/ .el-tree,
    .leftTreeBox /deep/ .el-tree-node__content:hover,
    .leftTreeBox /deep/ .el-tree-node:focus>.el-tree-node__content{
        background-color: transparent;
    }
    .leftTreeBox /deep/ .el-tree-node__label{
        font-size: 12px;
        color: #fff;
    }
    .leftTreeBox /deep/ .el-tree-node__content{
        position: relative;
        height: 26px;
        padding-left: 26px !important;
    }
    .closeLayoutLeft  .leftTreeBox /deep/ .el-tree-node__content{
        padding-left: 0px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__content{
        
        padding-left: 40px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__children  .el-tree-node__content{
        padding-left: 76px !important;
    }
    .leftTreeBox /deep/ .el-tree-node__children .el-tree-node__children  .el-tree-node__content .el-tree-node__expand-icon.is-leaf{
        display: none;
    }
    .leftTreeBox /deep/ .el-tree-node__expand-icon{
        color: #fff;
        padding: 4px;
    }
    .leftTreeBox /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        background-color: rgba(255,255,255,0.15);
    }
    .currentParentNode::before{
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 26px;
        background: #FFB900;
        border-radius: 2px;
    }
}
</style>
