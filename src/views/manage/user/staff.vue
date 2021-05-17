<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
            <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
                <el-form-item label="用户名：" class="treeFormItem">
                    <el-input v-model="params.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：" class="treeFormItem">
                    <el-input v-model="params.mobile" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱：" class="treeFormItem">
                    <el-input v-model="params.email" placeholder="请输入电子邮箱"></el-input>
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
                    <el-button type="primary" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
                    <el-button type="primary" @click="isDialog=true"><i class="iconfont icon-shanchu"></i>删除</el-button>
                    <el-button type="primary"><i class="iconfont icon-zanting"></i>暂停</el-button>
                    <el-button type="primary"><i class="iconfont icon-runtongyiyaoyihuifu_biyan"></i>恢复</el-button>
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
                        label="用户编号">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="name"
                        label="用户姓名">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="mobile"
                        label="手机号码">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="email"
                        label="电子邮箱">
                    </el-table-column>
                     <el-table-column align="center"
                        prop="department"
                        label="所属园区">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="role"
                        label="所属角色">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="status"
                        label="状 态">
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
            <Page :total="400" :pageSize="15" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
        </div>
        <el-dialog top="0"
            :title="title" :show-close="false"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
                <div class="dialogdiv">
                
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        <el-form-item label="用户编码:" prop="bn">
                            <el-input type="text" v-model="ruleForm.bn"></el-input>
                        </el-form-item>
                        <el-form-item label="用户姓名:" prop="name">
                            <el-input type="text" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:" prop="mobile">
                            <el-input v-model="ruleForm.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱:"  prop="email">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                        <el-form-item label="所属园区:" prop="department">
                            <el-select v-model="ruleForm.department" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in departmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="所属角色:" prop="role">
                            <el-select v-model="ruleForm.role" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in roleList"
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
                        <el-form-item label="系统权限:" prop="power" class="requireIcon">
                            <div class="systemPowerBox">
                                <div class="flexEnd">
                                    <el-checkbox v-model="ruleForm.watch" @change="handleAllWatch">全部</el-checkbox>
                                    <el-checkbox v-model="ruleForm.edit" @change="handleAllEdit">全部</el-checkbox>
                                </div>
                                <el-tree :key="index"
                                    :data="data"
                                    node-key="id"
                                    default-expand-all
                                    >
                                    <span class="customTreeNode" slot-scope="{ node, data }">
                                        <span>{{ node.label }}</span>
                                        <span v-if="!data.children" style="display: flex;">
                                            <el-checkbox v-model="node.watch" @change="(val)=>handleWatchChange(val,data)" >浏览</el-checkbox>
                                            <el-checkbox v-model="node.edit" @change="(val)=>handleEditChange(val,data)">编辑</el-checkbox>
                                        </span>
                                    </span>
                                </el-tree>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm()">取 消</div>
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
        title:"新建人员信息",
        index:0,
        labelWidth:'84px',
        labelWidth1:'96px',
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
        roleList:[
            {
                value: '搭建员',
                label: '搭建员'
            }, 
            {
                value: '角色2',
                label: '角色2'
            },
        ],
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
        params: {
          name: '',
          mobile: '',
          email:''
        },
        ruleForm: {
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
          department: [
           { required: true, message: '请选择所属园区', trigger: 'change' },
          ],
          role: [
            { required: true, message: '请选择所属角色', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'blur' }
          ],
        },
        currentPage: 1,
        width:50,
        data :[
            {
                id: '2',
                label: '能耗看板',
                watch:false,
                edit:false,
            }, 
            {
                id: '3',
                label: '能耗统计',
                children: [
                    {
                        id:' 3-1', 
                        label:"能耗分析",
                        watch:false,
                        edit:false,
                    },
                    {
                        id:' 3-2', 
                        label:"成本分析",
                        watch:false,
                        edit:false,
                    },
                    {
                        id:'3-3', 
                        label:"指标分析",
                        watch:false,
                        edit:false,
                    }
                ]
            }, 
            {
                id: '4',
                label: '告警运维',
                children: [
                    {
                        id:' 4-1', 
                        label:"运维管理",
                        watch:false,
                        edit:false,
                    },
                    {
                        id:' 4-2', 
                        label:"工单管理",
                        watch:false,
                        edit:false,
                    }
                ]
            }, 
            {
                id: '5',
                label: '能耗报表',
            }, 
            {
                id: '1',
                label: '综合管理',
                children: [
                    {
                        id:' 1-1',
                        label: '用户管理',
                        children: [
                            {
                                id: '1-1-1',
                                label: '人员信息管理',
                                watch:false,
                                edit:false,
                            }, {
                                id: '1-1-2',
                                label: '客户信息管理',
                                watch:false,
                                edit:false,
                            }
                        ]
                    },
                    {
                        id: '1-2',
                        label: '档案管理',
                        children: [
                            {
                                id: '1-2-1',
                                label: '建筑信息管理',
                                watch:false,
                                edit:false,
                            }, 
                            {
                                id: '1-2-2',
                                label: '设备信息管理',
                                watch:false,
                                edit:false,
                            },
                            {
                                id: '1-2-3',
                                label: '表计、传感器信息管理',
                                watch:false,
                                edit:false,
                            },
                            {
                                id: '1-2-4',
                                label: '规则定义',
                                watch:false,
                                edit:false,
                            },
                            {
                                id: '1-2-5',
                                label: '能耗指标设定',
                                watch:false,
                                edit:false,
                            },
                            {
                                id: '1-2-6',
                                label: '价格录入',
                                watch:false,
                                edit:false,
                            }
                        ]
                    },
                    {
                        id: '1-3',
                        label: '系统管理',
                        children: [
                            {
                                id: '1-3-1',
                                label: '数据字典管理',
                                watch:false,
                                edit:false,
                            }, 
                            {
                                id: '1-3-2',
                                label: '系统日志管理',
                                watch:false,
                                edit:false,
                            },
                            {
                                id: '1-3-3',
                                label: '首页广告位管理',
                                watch:false,
                                edit:false,
                            }
                        ]
                    },
                    {
                        id: '1-4',
                        label: '信息发布',
                    }
                ]
            }, 
        ],
        tableData: [
            {
                bn: '345678568998',
                id:0,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:1,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:2,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:3,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:4,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:5,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:6,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:7,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:8,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:9,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }, 
            {
                bn: '345678568998',
                id:10,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:11,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:12,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:13,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            },
            {
                bn: '345678568998',
                id:14,
                name: '赵丽艳',
                mobile: '12345678909',
                email: '123456@163.com',
                account: '123456sdhyyj',
                department: '电力公司搭建部门',
                role:'搭建员',
                status: '启用',
            }
        ],
        tableSeelctVal:[],
        isSelectWatch:false,
        isSelectEdiot:false
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
            console.log(val)
            this.currentPage = val;
        },
        resetForm1(){
            this.dialogPassword = false;
        },
        onPassword(row,index){
            this.dialogPassword = true;
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
        onConfirm(){
            this.tableSeelctVal.map((item) => {
                this.tableData.map((child, index) => {
                if (item.id == child.id) {
                    this.tableData.splice(index, 1);
                }
                });
            });
            this.isDialog = false
        },
        beforeClose(){
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
            this.dialogVisible = false
        },
        onSearch() {
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
               this.dialogVisible = false
              
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm() {
            this.beforeClose()
        },
        handleAllWatch(val){
        },
        handleAllEdit(val){

        },
        handleWatchChange(value,data){
            data.watch = value
        },
        handleEditChange(value,data){
            data.edit = value
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
                this.labelWidth = '82px';
            } else {
                this.labelWidth = '68px';
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
    .systemPowerBox{
        width: 100%;
        height: auto;
        padding: 14px 20px 24px 14px;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #BECDD7;
    }
    .systemPowerBox /deep/ .el-tree{
        font-size: 16px;
        color:#3C464B ;
    }
    .systemPowerBox /deep/ .el-tree-node__expand-icon{
        font-size: 14px;
        color:#009999 ;
    }
    .systemPowerBox /deep/ .el-tree-node__expand-icon.is-leaf{
        /* display: none; */
        color: #BECDD7;
    }
    .systemPowerBox /deep/ .el-tree-node__content{
        height: 35px;
        
    }
    .systemPowerBox /deep/  .customTreeNode{
        display: flex;
        width: 100%;
        line-height: 35px;
        align-items: baseline;
        justify-content: space-between;
    }
    .systemPowerBox /deep/ .el-tree-node__content:hover,
    .systemPowerBox /deep/ .el-tree-node:focus>.el-tree-node__content{
        background-color: transparent;
    }
    .systemPowerBox /deep/ .el-checkbox{
        margin-right: 30px;
    }
    .systemPowerBox /deep/ .el-checkbox:last-of-type{
        margin-right: 0;
    }
    .flexEnd{
        justify-content: flex-end;
    }
    .systemPowerBox /deep/ .el-tree .el-tree-node__children .el-tree-node__children .el-tree-node__expand-icon.is-leaf{
        color: transparent;
    }
    .requireIcon /deep/ .el-form-item__label::before{
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }
}
/* 1280*/
@media screen and (max-width: 1664px) {
    .siemensLayoutCon /deep/ .el-dialog__wrapper .el-dialog{
        width: 430px;
    }
    .systemPowerBox{
        width: 100%;
        height: auto;
        padding: 10px 14px 15px 10px;
        background: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #BECDD7;
    }
    .systemPowerBox /deep/ .el-tree{
        font-size: 12px;
        color:#3C464B ;
    }
    .systemPowerBox /deep/ .el-tree-node__expand-icon{
        font-size: 12px;
        color:#009999 ;
    }
    .systemPowerBox /deep/ .el-tree-node__expand-icon.is-leaf{
        /* display: none; */
        padding: 3px;
        color: #BECDD7;
    }
    .systemPowerBox /deep/ .el-tree-node__content{
        height: 24px;
    }
    .systemPowerBox /deep/  .customTreeNode{
        display: flex;
        width: 100%;
        line-height: 24px;
        align-items: baseline;
        justify-content: space-between;
    }
    .systemPowerBox /deep/ .el-tree-node__content:hover,
    .systemPowerBox /deep/ .el-tree-node:focus>.el-tree-node__content{
        background-color: transparent;
    }
    .systemPowerBox /deep/ .el-checkbox{
        margin-right: 20px;
    }
    .systemPowerBox /deep/ .el-checkbox:last-of-type{
        margin-right: 0;
    }
    .flexEnd{
        justify-content: flex-end;
    }
    .systemPowerBox /deep/ .el-tree .el-tree-node__children .el-tree-node__children .el-tree-node__expand-icon.is-leaf{
        color: transparent;
    }
    .requireIcon /deep/ .el-form-item__label::before{
        content: '*';
        color: #F56C6C;
        margin-right: 4px;
    }
}
</style>
