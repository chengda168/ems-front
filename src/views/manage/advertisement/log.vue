<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
            <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
                <el-form-item label="时间：" class="treeFormItem dateFormItem">
                    <el-date-picker :clearable="false"
                    v-model="params.start" :prefix-icon="'iconfont icon-rili'"
                    type="date" class="dateBox" :picker-options="pickerOptionsStart"
                    placeholder="开始日期">
                    </el-date-picker>
                    <span class="separatorText">至</span>
                    <el-date-picker :clearable="false" 
                    v-model="params.end" :prefix-icon="'iconfont icon-rili'"
                    type="date" class="dateBox"  :picker-options="pickerOptionsEnd"
                    placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="操作人：" class="treeFormItem">
                    <el-input v-model="params.user_name" placeholder="请输入操作人"></el-input>
                </el-form-item>
                <el-form-item label="模块：" class="treeFormItem">
                    <el-input v-model="params.modules" placeholder="请输入模块"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="fullBtn" @click="onSearch"><i class="iconfont icon-sousuo"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="siemensLayoutResultBox whiteBg">
            <div class="siemensLayoutResultTitle siemensLayoutResultTitleNoBtn flexBetween">
                <span>查询结果</span>
            </div>
            <div class="siemensLayoutResultCon">
                 <el-table border stripe :cell-class-name="addColClass"
                    :data="tableData" height="100%"
                    style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column label="序号" align="center"
                        type="index"
                        :width="width">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="operate_type" 
                        label="操作类型">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="modules"
                        label="模 块">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="user_name"
                        label="操作人">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="create_date"
                        label="操作时间">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="access_type"
                        label="访问入口">
                        <template slot-scope="scope">
                            {{scope.row.access_type == 1 ? 'WEB端' :'小程序'}}
                        </template>
                    </el-table-column>
                     <el-table-column align="center"
                        prop="access_ip"
                        label="IP地址">
                    </el-table-column>
                     <el-table-column align="left" :width="maxWidth"
                        prop="describe" header-align="center"
                        label="详细描述">
                    </el-table-column>
                </el-table>
            </div>
            <Page :total="totalElements" :pageSize="pageSize" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
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
        }),
        pickerOptionsStart(){
            var _this=this;
            return {
                disabledDate(time) {
                    let endTime=_this.params.end;
                    if(endTime !=''){
                        return time.getTime() > endTime;
                    }else{
                        return false
                    }
                    
                }
            }
        },
        pickerOptionsEnd() {
            var _this=this;
            return {
                disabledDate(time) {
                    let startTime=_this.params.start;
                    if(startTime !=''){
                        return time.getTime() < startTime;
                    }else{
                        return false
                    }
                    
                }
            }
        }
    },
    components:{
        Page
    },
    data() {
      return {
        params: {
            start:'',
            end:'',
            user_name: '',
            modules: '',
        },
        currentPage: 1,
        width:50,
        maxWidth:480,
        totalElements:0,
        pageSize:15,
        content: [
            {
                operate_type: '新建',
                id:0,
                user_name: '赵丽艳',
                modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:1,
                user_name: '赵丽艳',
                modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens'
            }, 
            {
                operate_type: '新建',
                id:2,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:2,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:3,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:4,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:2,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:5,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:6,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:2,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:7,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:8,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:9,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:10,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:11,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:12,
                user_name: '赵丽艳',
                modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:2,
                access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:13,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
            {
                operate_type: '新建',
                id:14,
                user_name: '赵丽艳',
               modules: '工单管理',
                create_date: '2021-05-07 11:27',
                access_type:1,
                 access_ip: '123456@163.com',
                describe:'告警内容：{"taskDesc":"指定班组","taskName":"维修"}, 接收用户：13819183200,13905813777,18019025732,18621280717,siemens， 返回值：{"RequestId":"AA9A26BA-CB4D-4523-9977-8105487E3CED","Message":"siemens invalid mobile number","Code":"isv.MOBILE_NUMBER_ILLEGAL"}'
            }, 
        ],
        tableData:[],
        tableSeelctVal:[]
      }
    },
    watch:{
        collapse(newVal){
            if(!newVal){
               if (document.body.clientWidth > 1664) {
                    this.width = 50;
                    this.maxWidth = 480;
                } else {
                    this.width = 35;
                    this.maxWidth = 320;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 60;
                    this.maxWidth = 490;
                } else {
                    this.width = 40;
                    this.maxWidth = 326;
                }
            }
        }
    },
    methods: {
         getTableData(){
            this.tableData= this.content;
            this.totalElements = this.content.length;
        },
         onPageChange(val){
            console.log(val)
            this.currentPage = val;
        },
        onSearch() {
            console.log("查询")
        },
      addColClass({ row, column, rowIndex, columnIndex }) {
            if (columnIndex == 7) {
                return "lineHeightCol";
            }
            
        },
        handleSelectionChange(val){
            this.tableSeelctVal = val;
        },
        resizeFn() {
            if(!this.collapse){
                if (document.body.clientWidth > 1664) {
                    this.width = 50;
                    this.maxWidth = 480;
                } else {
                    this.width = 35;
                    this.maxWidth = 320;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 60;
                    this.maxWidth = 490;
                } else {
                    this.width = 40;
                    this.maxWidth = 326;
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
        this.getTableData()
    }
  }
</script>
<style scoped>
    .dateFormItem{
        flex: inherit;
        width: 31.734%;
    }

    .dateFormItem /deep/ .el-form-item__content{
        display: flex;
    }
    .dateBox{
        width: auto;
    }
    
    @media screen and (min-width: 1665px) {
        .el-table /deep/ .lineHeightCol /deep/ .cell{
            padding: 8px 10px 12px 10px;
        }
    }


    @media screen and (max-width: 1664px) {
        .el-table /deep/ .lineHeightCol /deep/ .cell{
            padding: 5px 6px 8px 6px;
        }
    }

    
    
    
</style>
