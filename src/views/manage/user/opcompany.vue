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
                    <el-button type="primary" class="fullBtn" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
                    <el-button type="primary" class="fullBtn" @click="isDialog = true"><i class="iconfont icon-shanchu"></i>删除</el-button>
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
            <Page :total="400" :pageSize="15" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
        </div>
        <el-dialog top="0"
            :title="title" :show-close="false"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
                <div class="dialogdiv">
                
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        <el-form-item label="运维单位名称:" prop="bn">
                            <el-input type="text" v-model="ruleForm.bn"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位编号:" prop="name">
                            <el-input type="text" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="联系　人:" prop="mobile">
                            <el-input v-model="ruleForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:"  prop="email">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱:"  prop="account">
                            <el-input v-model="ruleForm.account"></el-input>
                        </el-form-item>
                        <el-form-item label="所属角色:" prop="department">
                            <el-select v-model="ruleForm.department" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in departmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm('ruleForm')">取 消</div>
                    <div class="dialogbuttomclose"  @click="submitForm('ruleForm')">保 存</div>
                </div>
            </el-dialog>
        <Tips :isDialog="isDialog" @onClose="isDialog = false" @onConfirm="onConfirm"></Tips>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Page from "@/components/ftd-page/page";
import Tips from "@/components/ftd-tips/tips";
  export default {
    computed:{
        ...mapGetters({
            collapse: 'collapse'
        })
    },
    components:{
        Page,
        Tips
    },
    data() {
      return {
          isDialog:false,
        labelWidth:'112px',
        dialogVisible:false,
        title:"新建运维单位信息",
        index:0,
        params: {
          name: '',
          mobile: '',
        },
        departmentList:[
            {
                value: '电力公司搭建部门',
                label: '电力公司搭建部门'
            }, 
            {
                value: '电力公司搭建部门1',
                label: '电力公司搭建部门1'
            },
        ],
        isEdit:false,
        editIndex:null,
        ruleForm: {
            bn: '',
            name: '',
            mobile: '',
            email: '',
            account:'',
            department: ''
        },
        rules: {
          bn: [
            { required: true, message: '请输入运维单位名称', trigger: 'blur' },
          ],
          name: [
            { required: true, message: '请输入运维单位编号', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          account: [
           { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
          department: [
            { required: true, message: '请选择所属角色', trigger: 'change' }
          ],
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
            if (document.body.clientWidth > 1664) {
                this.labelWidth = '112px';
            } else {
                this.labelWidth = '75px';
            }
        }
    },
    methods: {
         onPageChange(val){
            console.log(val)
            this.currentPage = val;
        },
        beforeClose(){
            this.ruleForm={
                bn: '',
                name: '',
                mobile: '',
                email: '',
                department:'',
                account: ''
            }
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
        },
        onSearch() {
        },
        OnAdd(){
            this.isEdit = false;
            this.title = '新建运维单位信息'
            this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
        onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑运维单位信息'
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
                    department:'',
                    account: ''
                }
                this.$refs.ruleForm.resetFields()
              
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.beforeClose()
            // this.$refs[formName].resetFields();
            // this.dialogVisible = false
        },
        onConfirm(){
            this.tableSeelctVal.map((item) => {
                this.tableData.map((child, index) => {
                if (item.id == child.id) {
                    this.tableData.splice(index, 1);
                }
                });
            });
            this.isDialog =false
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
    
/* @media screen and (min-width: 1665px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 548px;
    }

}


@media screen and (max-width: 1664px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 365px;
    }

} */

    
</style>
