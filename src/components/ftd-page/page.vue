<template>
  <div class="pageBox flexBetween">
    
    <div>
      <el-pagination  
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total"
        :total="total"
      >
      </el-pagination>
    </div>
    <div class="flexBetween">
      <div class="el-pagination">
      <el-button class="firstBtn" :disabled="isFirst" @click="onFirst">
        <i class="iconfont icon-quanbuxiangshang--copy-copy"></i>
      </el-button>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev,pager,next"
      :total="total"
    >
    </el-pagination>
    <div class="el-pagination">
      <el-button class="lastBtn" :disabled="isLast" @click="onLast">
        <i class="iconfont icon-quanbuxiangshang--copy"></i>
      </el-button>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="jumper"
      :total="total"
    >
    </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 15,
    },
    currentPage:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      isFirst: true,
      isLast: false,
    };
  },
  methods: {
    handleSizeChange(val){
      this.$emit('pageSize',val)
    },
    handleCurrentChange(val) {
      let pages = Math.ceil(this.total/this.pageSize);
      if (val == 1) {
        this.isFirst = true;
      } else {
        this.isFirst = false;
      }
      if(val == pages){
        this.isLast = true;
      }else{
        this.isLast = false;
      }
      this.$emit('onPageChange',val)
    },
    onFirst(){
      this.$emit('onPageChange',1)
      this.handleCurrentChange(1);
    },
    onLast(){
      let page = Math.ceil(this.total/this.pageSize);
      this.$emit('onPageChange',page)
      this.handleCurrentChange(Math.ceil(this.total/this.pageSize))
    }
  },
};
</script>
<style scoped>

  
  .pageBox  /deep/ .el-pagination{
    padding: 0;
    line-height: 1;
  }
  .pageBox  /deep/ .el-pagination__total{
    font-size: 14px;
    color: #879BAA;
  }
  .pageBox  /deep/ .el-pagination .btn-next, 
  .pageBox  /deep/ .el-pagination .btn-prev,
  .firstBtn,
  .lastBtn {
    width: 20px;
    min-width: auto;
    height: 20px;
    line-height: 20px;
    border: 0;
    padding: 0;
    text-align: center;
    color: #009999;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(52, 88, 157, 0.2);
    border-radius: 50%;
  }
  .firstBtn i,
  .lastBtn i{
    margin-right: 0;
    font-size: 12px;
  }
  .pageBox  /deep/ .el-pagination .btn-next:disabled, 
  .pageBox  /deep/ .el-pagination .btn-prev:disabled,
  .firstBtn:disabled,
  .lastBtn:disabled{
    color: #879BAA;
  } 
  .pageBox  /deep/ .el-pagination .btn-prev{
    margin:0 14px 0 5px;
  }
  .pageBox  /deep/ .el-pagination .btn-next{
    margin:0 5px 0 14px;
  }
  
  
   .pageBox  /deep/ .el-pager li,
   .pageBox  /deep/ .el-pager li:hover{
     min-width: 20px;
     height: 20px;
    line-height: 20px;
    font-weight: normal;
     font-size: 14px;
    color: #3C464B;
  }
  .pageBox  /deep/ .el-pager li:not(:last-child){
    margin-right: 4px;
  }
  .pageBox  /deep/ .el-pager li.active{
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    padding: 0;
    font-size: 14px;
    color: #FFFFFF;
    background: #009999;
    border-radius: 50%;
  }
 
  .lastBtn /deep/ span:not([class*="suffix"]),
  .firstBtn /deep/ span:not([class*="suffix"]) {
    min-width: auto;
    height: 20px;
    line-height: 20px;
  }
  .pageBox  /deep/ .el-pagination__jump{
    height: 30px;
    line-height: 30px;
    color: #879BAA;
  }
  .pageBox  /deep/ .el-pagination__editor{
    width: auto;
    height: 30px;
    margin: 0 5px;
    padding: 0;
  }
  .pageBox  /deep/ .el-pager .more::before{
    line-height: 20px;
  }
  

/* 1920 */
@media screen and (min-width: 1665px) {
  .pageBox {
    margin-top: 25px;
  }
  .pageBox  /deep/ .el-pagination__editor.el-input .el-input__inner{
    width: 54px;
    height: 30px;
  }
}
/* 1280*/
@media screen and (max-width: 1664px) {
  .pageBox {
    margin-top: 16px;
  }
  .pageBox  /deep/ .el-pagination__editor.el-input .el-input__inner{
    width: 40px;
    height: 26px;
  }
}
</style>
