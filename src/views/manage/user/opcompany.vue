<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
            <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
                <el-form-item label="运维单位名称：" class="treeFormItem">
                    <el-input v-model="params.name" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" class="treeFormItem">
                    <el-input v-model="params.mobile" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="fullBtn" @click="onSearch"><i class="iconfont icon-sousuo"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="siemensLayoutResultBox whiteBg">
            <div class="siemensLayoutResultTitle flexBetween">
                <span>查询结果</span>
                <div class="flexCenter">
                    <el-button type="primary" class="fullBtn"><i class="iconfont icon-xinjian"></i>新建</el-button>
                    <el-button type="primary" class="fullBtn" @click="onDeleted"><i class="iconfont icon-shanchu"></i>删除</el-button>
                </div>
            </div>
            <div class="siemensLayoutResultCon">
                 <el-table border stripe
                    :data="tableData" height="100%"
                    style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column align="center"
                        type="selection"
                        :width="width">
                    </el-table-column>
                    <el-table-column label="序号" align="center"
                        type="index"
                        :width="width">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="bn" 
                        label="运维单位名称">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="name"
                        label="运维单位编号">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="mobile"
                        label="联系人">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="email"
                        label="手机号码">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="account"
                        label="电子邮箱">
                    </el-table-column>
                    <el-table-column align="center"
                        label="操 作">
                        <div class="tableOper">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                <i class="iconfont icon-bianji"></i>
                            </el-tooltip>
                            
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <Page :total="400" :pageSize="15"></Page>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Page from "@/components/ftd-page/page";
  export default {
    computed:{
        ...mapGetters({
            collapse: 'collapse'
        })
    },
    components:{
        Page
    },
    data() {
      return {
        params: {
          name: '',
          mobile: '',
        },
        currentPage: 1,
        width:50,
        tableData: [
            {
                bn: '西门子（中国）有限公司 SI',
                id:0,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:1,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:2,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:3,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:4,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:5,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:6,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:7,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:8,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:9,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:10,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:11,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:12,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:13,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
            {
                bn: '西门子（中国）有限公司 SI',
                id:14,
                name: '09876554',
                mobile: '赵丽颖',
                email: '12345678909',
                account: '123456@163.com',
            }, 
        ],
        tableSeelctVal:[]
      }
    },
    watch:{
        collapse(newVal){
            if(!newVal){
                if (document.body.clientWidth > 1664) {
                    this.width = 50;
                } else {
                    this.width = 35;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 60;
                } else {
                    this.width = 40;
                }
            }
        }
    },
    methods: {
        onSearch() {
        },
        onDeleted(){
            this.tableSeelctVal.map((item) => {
                this.tableData.map((child, index) => {
                if (item.id == child.id) {
                    this.tableData.splice(index, 1);
                }
                });
            });
        },
        handleSelectionChange(val){
            this.tableSeelctVal = val;
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        resizeFn() {
            if(!this.collapse){
                if (document.body.clientWidth > 1664) {
                    this.width = 50;
                } else {
                    this.width = 35;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 60;
                } else {
                    this.width = 40;
                }
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
<style scoped>
    
@media screen and (min-width: 1665px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 548px;
    }

}


@media screen and (max-width: 1664px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 365px;
    }

}

    
</style>
