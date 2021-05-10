<template>
  <div class="pageBox flexBetween">
    
    <div>
      <el-pagination v-if="size"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="sizes"
        :total="total">
      </el-pagination>
      <el-pagination  v-if="isTotal"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total"
        :total="total"
      >
      </el-pagination>
    </div>
    
    <div class="flexBetween">
      <div class="el-pagination">
      <el-button class="firstBtn" :disabled="isFirst" @click="onFirst">
        <img src="../../assets/images/layout/firstD.png" v-if="isFirst"/>
        <img src="../../assets/images/layout/last.png" v-else/>
      </el-button>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev,pager,next"
      :total="total"
    >
    </el-pagination>
    <div class="el-pagination">
      <el-button class="lastBtn" :disabled="isLast" @click="onLast">
        <img src="../../assets/images/layout/last.png" v-if="!isLast"/>
        <img src="../../assets/images/layout/firstD.png" v-else/>
      </el-button>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
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
    size:{
      type: Boolean,
      default: false
    },
    isTotal:{
       type: Boolean,
      default: false
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    currentPage:{
      type:Number,
      default:1
    }
  },
  data() {
    return {
      // currentPage: 1,
      isFirst: true,
      isLast: false,
    };
  },
  methods: {
    handleSizeChange(val){
      // this.pageSize = val
      this.$emit('pageSize',val)
    },
    handleCurrentChange(val) {
      let pages = Math.ceil(this.total/10);
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
      this.currentPage= 1;
      this.$emit('onPageChange',1)
      this.handleCurrentChange(1);
    },
    onLast(){
      // this.currentPage= Math.ceil(this.total/10);
      let page = Math.ceil(this.total/10);
      this.$emit('onPageChange',page)
      this.handleCurrentChange(Math.ceil(this.total/10))
    }
  },
};
</script>
<style scoped>

  .pageBox {
    margin-top: 15px;
  }
  
  .firstBtn,
  .lastBtn {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 0;
    background-color: #F2F6FA;
    border-radius: 50%;
  }
  .el-pagination .firstBtn,
  .el-pagination .lastBtn,
  .lastBtn /deep/ span:not([class*="suffix"]),
  .firstBtn /deep/ span:not([class*="suffix"]) {
    min-width: auto;
    height: 30px;
    line-height: 30px;
  }
  button img {
    width: 7px;
    vertical-align: middle;
  }
  .firstBtn:not(:disabled) /deep/ span{
    line-height: 30px;
  }
  .firstBtn:not(:disabled) img{
    transform: rotate(-180deg);
  }
  .lastBtn:disabled /deep/ span{
    line-height: 30px;
  }
  .lastBtn:disabled img{
    transform: rotate(-180deg);
  }
 


</style>
