<template>
    <div class="siemensLayoutCon">
        <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
            <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
                <el-form-item label="客户名称：" class="treeFormItem">
                    <el-input v-model="params.name" placeholder="请输入客户名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" class="treeFormItem">
                    <el-input v-model="params.contacts" placeholder="请输入联系人"></el-input>
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
                        prop="parentId" 
                        label="上级单位">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="customerName"
                        label="客户名称">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="customerCode"
                        label="客户编号">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="contactUserName"
                        label="联系人">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="contactUserMobile"
                        label="手机号码">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="contactUserEmail"
                        label="电子邮箱">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="operationsId"
                        label="所属运维单位">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="h"
                        label="所属地址">
                        <template slot-scope="scope">
                            {{scope.row.h.city}}{{scope.row.h.area}}{{scope.row.h.area1}}{{scope.row.h.address}}
                        </template>
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
        <el-dialog
            :title="title" :show-close="false" top="0"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="beforeClose()"></div>
                <div class="dialogdiv">
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        <el-form-item label="上级单位:" prop="a">
                            <el-select v-model="ruleForm.a" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in departmentList1"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="园区名称:" prop="b">
                            <el-input type="text" v-model="ruleForm.b"></el-input>
                        </el-form-item>
                        <el-form-item label="园区编号:" prop="c">
                            <el-input v-model="ruleForm.c"></el-input>
                        </el-form-item>
                        <el-form-item label="联系   人:"  prop="d">
                            <el-input v-model="ruleForm.d"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码:" prop="e">
                            <el-input v-model="ruleForm.e"></el-input>
                        </el-form-item>
                        <el-form-item label="电子邮箱:"  prop="f">
                            <el-input v-model="ruleForm.f"></el-input>
                        </el-form-item>
                        <el-form-item label="运维单位:" prop="g">
                            <el-select v-model="ruleForm.g" placeholder="" popper-class="dialogSelect">
                                <el-option
                                v-for="item in departmentList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="园区地址:" prop="h">
                            <div class="SelectYihang1">
                                <el-select v-model="ruleForm.h.city" placeholder="" popper-class="dialogSelect" class="SelectYihang" @change="selectCityArea()">
                                    <el-option
                                    v-for="item in roleList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.h.area" placeholder="" popper-class="dialogSelect " class="SelectYihang" @change="selectCityArea1()">
                                    <el-option
                                    v-for="item in roleList1"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="ruleForm.h.area1" placeholder="" popper-class="dialogSelect " class="SelectYihang">
                                    <el-option
                                    v-for="item in roleList10"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            
                            <el-input v-model="ruleForm.h.address"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialogbuttom">
                    <div @click="resetForm()">取 消</div>
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
import SCustomer from "@/api/ums/sCustomer.js";
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
        index: 0,
        title: "新建客户信息",
        dialogVisible: false,
        ruleForm: {
          a: '',
          b: '',
          c: '',
          d: '',
          e: '',
          f: '',
          g: '',
          h: {
            city: '',
            area: '',
            area1: '',
            address: ''
          },
        },
        rules: {
          a: [
            { required: true, message: '请输入上级单位', trigger: 'blur' }
          ],
          b: [
            { required: true, message: '请输入园区名称', trigger: 'blur' }
          ],
          c: [
            { required: true, message: '请输入园区编号', trigger: 'blur' }
          ],
          d: [
            { required: true, message: '请输入联系人', trigger: 'blur' }
          ],
          e: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ],
          f: [
            { required: true, message: '请输入电子邮箱', trigger: 'blur' }
          ],
          g: [
            { required: true, message: '请输入运维单位', trigger: 'blur' }
          ],
          h: [
            { required: true, message: '请输入园区地址', trigger: 'blur' }
          ],
        },
        params: {
          name: '',
          contacts: '',
        },
        currentPage: 1,
        width:50,
        labelWidth:'84px',
        tableData: [ ],
        isEdit:false,
        editIndex:null,
        tableSeelctVal:[],
        departmentList:[ ],
        departmentList1:[                ],
        roleList:[ ], 
      };
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
        selectCityArea(){
            console.log(this.ruleForm)
            if(this.ruleForm.h.city == "上海市"){
                this.roleList1 = this.roleList3
                this.ruleForm.h.area = ''
                this.ruleForm.h.area1 = ''
                this.ruleForm.h.address = ''
            }else {
                this.roleList1 = this.roleList2
                this.ruleForm.h.area = ''
                this.ruleForm.h.area1 = ''
                this.ruleForm.h.address = ''
            }
        },
        selectCityArea1(){
            console.log(this.ruleForm)
            if(this.ruleForm.h.area == "上海市"){
                this.roleList10 = this.roleList4
                this.ruleForm.h.area1 = ''
                this.ruleForm.h.address = ''
            }else if(this.ruleForm.h.area == "苏州市"){
                this.roleList10 = this.roleList5
                this.ruleForm.h.area1 = ''
                this.ruleForm.h.address = ''
            }else if(this.ruleForm.h.area == "南通市"){
                this.roleList10 = this.roleList6
                this.ruleForm.h.area1 = ''
                this.ruleForm.h.address = ''
            }
        },
        beforeClose(){
             this.ruleForm={
                a: '',
                b: '',
                c: '',
                d: '',
                e: '',
                f:'',
                g: '',
                h: {
                    city: '',
                    area: '',
                    address: ''
                },
            }
            this.$refs.ruleForm.resetFields()
            this.dialogVisible = false
        },
        OnAdd(ruleForm){
           
            this.isEdit = false;
            this.title = '新建客户信息'
            // this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
        onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑客户信息'
            this.ruleForm =JSON.parse(JSON.stringify(row)) ;
            this.editIndex = index;
            this.dialogVisible = true
        },
      async  submitForm(formName) {
            let valid = await this.$refs[formName].validate();
            if (valid) {
               if(this.isEdit){
                //    编辑
                console.log(this.ruleForm)
                this.tableData[this.editIndex]=JSON.parse(JSON.stringify(this.ruleForm));
                this.index++;
                console.log(this.tableData)
               }else{
                //    新建
                this.tableData.unshift(JSON.parse(JSON.stringify(this.ruleForm)))
                let res = await SCustomer.add(this.ruleForm)
                console.log(res);
                this.$refs.ruleForm.resetFields()
               }
               this.dialogVisible = false
     
            } else {
                console.log('error submit!!');
                return false;
            }

        },
        resetForm() {
            this.beforeClose()
        },
        
        onSearch() {
        },
        onConfirm(){
            this.tableSeelctVal.map((item) => {
                this.tableData.map((child, index) => {
                if (item.id == child.id) {
                    this.tableData.splice(index, 1);
                }
                });
            });
            this.isDialog = false;
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
        async getTableData() {
            let params = this.$deepCopy(this.params);
            console.log(params)
            params['pageIndex'] = this.currentPage;
            params['length'] = this.pageSize;
            let res = await SCustomer.list(params);
            console.log(res);
            this.tableData = res.data.content || [];
            this.totalElements = res.data.totalElements;
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
  };
</script>
<style scoped>

    .siemensLayoutCon{
        flex: 1;
    }
    
@media screen and (min-width: 1665px) {



    .SelectYihang {
        width: 132px;
    }

    .SelectYihang1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

}


@media screen and (max-width: 1664px) {

    .SelectYihang {
        width: 88px;
    }

    .SelectYihang1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
    }

}

    
</style>

