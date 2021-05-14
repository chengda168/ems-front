<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutResultBox whiteBg">
            <div class="siemensLayoutResultTitle flexBetween">
                <span>首页广告位</span>
                <div class="flexCenter">
                    <div class="adverDiv">
                        <div class="adver">秒</div>
                        <el-input v-model="input" class="adverInput"></el-input>
                        <div class="adver">轮播时间</div>
                    </div>
                    <el-button type="primary" class="fullBtn" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
                    <el-button type="primary" class="fullBtn" @click="onDeleted"><i class="iconfont icon-shanchu"></i>删除</el-button>
                </div>
            </div>
            <div class="siemensLayoutResultCon">
                 <el-table border stripe :key="index"
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
                        label="广告图片">
                        <template slot-scope="scope">
                            <img class="davertiseimg" :src="scope.row.bn">
                        </template>
                    </el-table-column>
                    <el-table-column align="center"
                        prop="name"
                        label="广告轮转位置">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="mobile"
                        label="广告展示时限">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="email"
                        label="广告描述"
                        :width="width1">
                    </el-table-column>
                    <el-table-column align="center"
                        label="操 作">
                        <template slot-scope="scope">
                            <div class="tableOper">
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                    <i class="iconfont icon-bianji" @click="onEdit(scope.row,scope.$index)"></i>
                                </el-tooltip>
                                
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <Page :total="400" :pageSize="15"></Page>
        </div>
        <el-dialog top="0"
            :title="title" :show-close="false"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
                <div class="dialogdiv">
                
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        <el-form-item label="广告图片:" prop="bn">
                            <!-- <img class="davertiseimg" :src="scope.row.bn"> -->
                            <button class=""></button>
                        </el-form-item>
                        <el-form-item label="广告位置:" prop="name">
                            <el-input type="text" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="广告展示时间:" prop="mobile">
                            <!-- <el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker> -->
                            <el-input v-model="ruleForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="广告描述:"  prop="email">
                            <el-input v-model="ruleForm.email" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm('ruleForm')">取 消</div>
                    <div class="dialogbuttomclose"  @click="submitForm('ruleForm')">保 存</div>
                </div>
        </el-dialog>
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
        dialogVisible:false,
        title:"新建首页广告",
        index:0,
        labelWidth:'120px',
        isEdit:false,
        editIndex:null,
        ruleForm: {
            bn: '',
            name: '',
            mobile: '',
            email: '',
        },
        rules: {
          bn: [
            { required: true, message: '请输入用户编码', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
        },
        input: '',
        params: {
          name: '',
          mobile: '',
          emial:''
        },
        currentPage: 1,
        width:50,
        width1:540,
        tableData: [
            {
                bn: require("@/assets/images/backups.png"),
                id:0,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:1,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:2,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:3,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:4,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:5,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:6,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:7,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:8,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:9,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:10,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:11,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:12,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:13,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:14,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:15,
                name: '第二张',
                mobile: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
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
        beforeClose(){
            this.ruleForm={
                bn: '',
                name: '',
                mobile: '',
                email: '',
            }
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
        },
        onSearch() {
        },
        OnAdd(){
            this.isEdit = false;
            this.title = '新建首页广告'
            this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
        onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑首页广告'
            this.ruleForm =JSON.parse(JSON.stringify(row)) ;
            this.editIndex = index;
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
               if(this.isEdit){
                // 编辑
                console.log(this.ruleForm)
                this.tableData[this.editIndex]=JSON.parse(JSON.stringify(this.ruleForm));
                this.index++;
                console.log(this.tableData)
               }else{
                // 新建
                this.tableData.unshift(JSON.parse(JSON.stringify(this.ruleForm)))
               }
                
               this.dialogVisible = false
                this.ruleForm={
                    bn: '',
                    name: '',
                    mobile: '',
                    email: '',
                }
                this.$refs.ruleForm.resetFields()
              
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.dialogVisible = false
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
            if (document.body.clientWidth > 1664) {
                    this.width1 = 540;
            } else {
                    this.width1 = 360;
            }
            if (document.body.clientWidth > 1664) {
                this.labelWidth = '120px';
            } else {
                this.labelWidth = '80px';
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
    .adverDiv {
        width: 600px;
    }

    .adver {
        float: right;
        font-size: 16px;
        line-height: 40px;
        margin: 0 10px;
        
    }

    .adverInput {
        float: right;
        width: 60px;
        height: 30px;
    }

    .adverInput /deep/ .el-input__inner {
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        padding: 0 15px;
        font-size: 16px;
        font-weight: 400;
        color: #009999 !important;
    }

    .davertiseimg {
        width: 32px;
        height: 32px;
    }

}


@media screen and (max-width: 1664px) {
    .adverDiv {
        width: 400px;
    }

    .adver {
        float: right;
        font-size: 12px;
        line-height: 27px;
        margin: 0 7px;
        
    }

    .adverInput {
        float: right;
        width: 40px;
        height: 20px;
    }

    .adverInput /deep/ .el-input__inner {
        height: 20px;
        line-height: 20px;
        margin-top: 3px;
        padding: 0 8px;
        font-size: 12px;
        font-weight: 400;
        color: #009999 !important;
    }

    .davertiseimg {
        width: 21px;
        height: 21px;
    }

}
</style>
