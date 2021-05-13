<template>
    <div>
        <el-input
            placeholder="搜索园区"
            v-model="keyword" class="treeSearchBox">
            <i slot="suffix" class="iconfont icon-sousuo"></i>
        </el-input>
    </div>
</template>

<script>
export default {
    data(){
        return{
            keyword:''
        }
    }
}
</script>
<style scoped>
    .treeSearchBox{
        display: block;
        width: 78.576%;
        margin: 40px auto 28px auto;
    }
    .treeSearchBox /deep/  .el-input__inner{
        height: 34px;
        line-height: 34px;
        padding: 0 15px;
        font-size: 14px;
        color: #fff;
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
    .closeLayoutLeft .treeSearchBox{
        width: 66.67%;
    }
    .closeLayoutLeft /deep/  .el-input__inner{
        padding: 0;
    }
</style>
