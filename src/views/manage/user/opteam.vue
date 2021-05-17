<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
            <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
                <el-form-item label="姓名：" class="treeFormItem">
                    <el-input v-model="params.userName" placeholder="请输入运维单位名称"></el-input>
                </el-form-item>
                <el-form-item label="单位：" class="treeFormItem">
                    <el-input v-model="params.unitName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" class="treeFormItem">
                    <el-input v-model="params.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱：" class="treeFormItem">
                    <el-input v-model="params.email" placeholder="请输入电子邮箱"></el-input>
                </el-form-item>
                <el-form-item label="运维客户：" class="treeFormItem">
                    <el-input v-model="params.customerName" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="fullBtn" @click="getTableData"><i class="iconfont icon-sousuo"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="siemensLayoutResultBox whiteBg">
            <div class="siemensLayoutResultTitle flexBetween">
                <span>查询结果</span>
                <div class="flexCenter">
                    <el-button type="primary" class="fullBtn" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
                    <el-button type="primary" class="fullBtn" @click="isDialog = true"><i class="iconfont icon-shanchu"></i>删除</el-button>
                    <el-button type="primary" class="fullBtn" @click="suspendBatch"><i class="iconfont icon-zanting"></i>暂停</el-button>
                    <el-button type="primary" class="fullBtn" @click="recoverBatch"><i class="iconfont icon-runtongyiyaoyihuifu_biyan"></i>恢复</el-button>
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
                        prop="userName"
                        label="姓名">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="mobile"
                        label="手机号码">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="job"
                        label="职务/角色">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="email"
                        label="电子邮箱">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="unitName"
                        label="单 位">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="customerName"
                        label="运维客户">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="status"
                        :formatter="$typeFormatter"
                        
                        label="状 态"
                        >
                    </el-table-column>
                    <el-table-column align="center"
                        label="操 作">
                        <template slot-scope="scope">
                            <div class="tableOper">
                                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                                    <i class="iconfont icon-bianji" @click="onEdit(scope.row,scope.$index)"></i>
                                </el-tooltip>
                                
                                <el-tooltip class="item" effect="dark" content="重置密码" placement="top">
                                    <i class="iconfont icon-ic_keyboard" @click="onPassword(scope.row,scope.$index)"></i>
                                </el-tooltip>
                                
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <Page :total="totalElements" :pageSize="pageSize" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
        </div>
        <el-dialog top="0"
            :title="title" :show-close="false"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
                <div class="dialogdiv">
                
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        
                        <el-form-item label="姓　　名:" prop="userName">
                            <el-input type="text" v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:" prop="mobile">
                            <el-input v-model="ruleForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="职务/角色:"  prop="job">
                            <el-input v-model="ruleForm.job"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱:" prop="email">
                            <el-input type="text" v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位:" prop="department">
                            <el-input v-model="ruleForm.department"></el-input>
                        </el-form-item>
                        <el-form-item label="园区名称:" prop="customerId">
                            <el-select v-model="ruleForm.customerId" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in customerList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="状　　态:" prop="status">
                            <el-radio-group v-model="ruleForm.status">
                                <el-radio label="启用">启 用</el-radio>
                                <el-radio label="禁用">禁 用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm('ruleForm')">取 消</div>
                    <div class="dialogbuttomclose"  @click="submitForm('ruleForm')">保 存</div>
                </div>
            </el-dialog>
        <el-dialog top="0"
            title="重置密码" :show-close="false"
            :visible.sync="dialogPassword">
                <div class="close iconfont icon-guanbi" @click="dialogPassword = false"></div>
                <div class="dialogdiv">
                    <el-form :model="ruleForm1" label-position="left" :rules="rules1" ref="ruleForm1" class="registerForm" :label-width="labelWidth1" >
                        
                        <el-form-item label="新密码:" prop="password">
                            <el-input type="password" v-model="ruleForm1.password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码:" prop="password1">
                            <el-input type="password" v-model="ruleForm1.password1"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm1()">取 消</div>
                    <div class="dialogbuttomclose"  @click="submitForm1('ruleForm1')">保 存</div>
                </div>
            </el-dialog>
        <Tips :isDialog="isDialog" @onClose="isDialog = false" @onConfirm="onConfirm"></Tips>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Page from "@/components/ftd-page/page";
import Tips from "@/components/ftd-tips/tips";
import SOperationTeam from "@/api/ums/sOperationTeam"
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
         var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm1.password1 !== '') {
            this.$refs.ruleForm1.validateField('password1');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm1.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        dialogPassword: false,
        isDialog:false,
        dialogVisible:false,
        title:"新建运维团队信息",
        index:0,
        labelWidth:'88px',
        labelWidth1:'96px',
        isEdit:false,
        editIndex:null,
        customerList:[
            {
                value: '园区1',
                label: '园区1'
            }, 
            {
                value: '园区2',
                label: '园区2'
            },
        ],
        ruleForm: {
            userName: '',
            mobile: '',
            email: '',
            account: '',
            department: '',
            role:'',
            status: '启用',
        },
        ruleForm1: {
            password: '',
            password1: '',
        },
        rules1: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          password1: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        rules: {
          name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
          ],
          mobile: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
          ],
          email: [
            { required: true, message: '请输入职务/角色', trigger: 'blur' },
          ],
          account: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          ],
          department: [
           { required: true, message: '请输入运维单位', trigger: 'change' },
          ],
          customerId: [
            { required: true, message: '请选择园区名称', trigger: 'change' }
          ],
          enabled: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
        },
        params: {
          userName: '',
          unitName: '',
          mobile: '',
          email:'',
          customerName: ''
        },
        currentPage: 1,
        totalElements : 0,
        pageSize : 15,
        width:50,
        tableData: [],
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
        onPageChange(val){
            this.currentPage = val;
            this.getTableData();
        },
        resetForm1(){
            this.dialogPassword = false;
        },
        beforeClose(){
             this.ruleForm={
                name: '',
                mobile: '',
                email: '',
                account: '',
                department: '',
                role:'',
                status: '启用',
            }
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
        },
        OnAdd(){
            this.isEdit = false;
            this.title = '新建人员信息'
            this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
        onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑人员信息'
            this.ruleForm =JSON.parse(JSON.stringify(row)) ;
            this.editIndex = index;
            this.dialogVisible = true
        },
        onPassword(row,index){
            this.dialogPassword = true;
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
                    department: '',
                    role:'',
                    status: '启用',
                    watch:false,
                    edit:false,
                    power:''
                }
                this.$refs.ruleForm.resetFields()
              
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        submitForm1(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.dialogPassword = false;
              
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
            let ids = this.tableSeelctVal.map(item => item.id);
            console.log(ids);
            // this.tableSeelctVal.map((item) => {
            //     console.log(item);
            //     this.tableData.map((child, index) => {
            //     if (item.id == child.id) {
            //         this.tableData.splice(index, 1);
            //     }
            //     });
            // });
            this.isDialog =false
        },
        handleSelectionChange(val){
            this.tableSeelctVal = val;
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
                this.labelWidth = '88px';
            } else {
                this.labelWidth = '68px';
            }
            if (document.body.clientWidth > 1664) {
                this.labelWidth = '96px';
            } else {
                this.labelWidth = '68px';
            }
            
            
        },
        async getTableData() {
            let params = this.$deepCopy(this.params);
            params['pageIndex'] = this.currentPage;
            params['length'] = this.pageSize;
            console.log(params);
            let res = await SOperationTeam.page(params);
            console.log(res);
            this.tableData = res.data.content || [];
            this.totalElements = res.data.totalElements;
        },
        async suspendBatch() {
            let ids = this.tableSeelctVal.map(item => item.id);
            if(ids.length > 0) {
                let res = await SOperationTeam.suspendBatch(ids);
                _self.getTableData();
            }
        },
        async recoverBatch() {
            let ids = this.tableSeelctVal.map(item => item.id);
            if(ids.length > 0) {
                let res = await SOperationTeam.recoverBatch(ids);
                _self.getTableData();
            }
        }
    },
    mounted(){
        let self = this;
        this.resizeFn();
        window.addEventListener("resize", function () {
            self.resizeFn();
        });
        this.getTableData();
    }
  }
</script>
<style scoped>
    
@media screen and (min-width: 1665px) {

    .siemensLayoutSearchBoxForm /deep/ .el-form-item {
        margin-right: 30px;
    }

}


@media screen and (max-width: 1664px) {

    .siemensLayoutSearchBoxForm /deep/ .el-form-item {
        margin-right: 20px;
    }

}

    
</style>
