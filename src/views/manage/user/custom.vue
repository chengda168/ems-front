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
                    <el-button type="primary" class="fullBtn" @click="onSearch"><i class="iconfont icon-sousuo"></i>查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="siemensLayoutResultBox whiteBg">
            <div class="siemensLayoutResultTitle flexBetween">
                <span>查询结果</span>
                <div class="flexCenter">
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
                        prop="a" 
                        label="上级单位">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="b"
                        label="客户名称">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="c"
                        label="客户编号">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="d"
                        label="联系人">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="e"
                        label="手机号码">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="f"
                        label="电子邮箱">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="g"
                        label="所属运维单位">
                    </el-table-column>
                    <el-table-column align="center"
                        prop="h"
                        label="所属地址">
                        <template slot-scope="scope">
                            {{scope.row.h.city}}{{scope.row.h.area}}{{scope.row.h.address}}
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
            <Page :total="400" :pageSize="15"></Page>
        </div>
        <el-dialog
            :title="title" :show-close="false" top="0"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
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
                                <el-select v-model="ruleForm.h.area" placeholder="" popper-class="dialogSelect " class="SelectYihang">
                                    <el-option
                                    v-for="item in roleList1"
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
                    <div @click="resetForm('ruleForm')">取 消</div>
                    <div class="dialogbuttomclose"  @click="submitForm('ruleForm')">保 存</div>
                </div>
        </el-dialog>
    </div>





        <!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->

        <!-- <el-dialog
        title="新建运维团队信息"
        :visible.sync="dialogVisible"
        :show-close="false"
        width="32%">
            <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
            <div class="dialogdiv">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="registerForm" label-width="100px" hide-required-asterisk=false>
                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm.pass"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="ruleForm.age"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialogbuttom">
                <div @click="resetForm('ruleForm')">重置</div>
                <div class="dialogbuttomclose"  @click="submitForm('ruleForm')">提交</div>
            </div>
        </el-dialog> -->

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
            address: ''
          },
        },
        rules: {
          a: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          b: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          c: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          d: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          e: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          f: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          g: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          h: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
        },
        params: {
          name: '',
          contacts: '',
        },
        currentPage: 1,
        width:50,
        labelWidth:'84px',
        tableData: [
            {
                a: '电力信息有限公司',
                id:0,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:1,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:2,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:3,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:4,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:5,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:6,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:7,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:8,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:9,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:10,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:11,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:12,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:13,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
            {
                a: '电力信息有限公司',
                id:14,
                b: '电力公司搭建部',
                c: '09876554',
                d: '赵丽颖',
                e: '12345678909',
                f: '123456@163.com',
                g:'电力公司',
                h: {
                    city: '上海市',
                    area: '浦东区',
                    address: '陆家嘴'
                },
            }, 
        ],
        isEdit:false,
        editIndex:null,
        tableSeelctVal:[],
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
        departmentList1:[
            {
                value: '电力公司搭建部门',
                label: '电力公司搭建部门'
            }, 
            {
                value: '电力公司搭建部门1',
                label: '电力公司搭建部门1'
            },
        ],
        roleList:[
            {
                value: '上海',
                label: '上海'
            }, 
            {
                value: '江苏',
                label: '江苏'
            },
        ],
        roleList1:[
            {
                value: '静安区',
                label: '静安区'
            }, 
            {
                value: '嘉定区',
                label: '嘉定区'
            },
        ],
        roleList2:[
            {
                value: '苏州市',
                label: '苏州市'
            }, 
            {
                value: '南通市',
                label: '南通市'
            },
            {
                value: '无锡市',
                label: '无锡市'
            },
        ],
        roleList3:[
            {
                value: '静安区',
                label: '静安区'
            }, 
            {
                value: '嘉定区',
                label: '嘉定区'
            },
        ],
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
        selectCityArea(){
            console.log(this.ruleForm)
            if(this.ruleForm.h.city == "上海"){
                this.roleList1 = this.roleList3
                this.ruleForm.h.area = ''
                this.ruleForm.h.address = ''
            }else {
                this.roleList1 = this.roleList2
                this.ruleForm.h.area = ''
                this.ruleForm.h.address = ''
            }
            console.log(this.roleList1)
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
            this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
        onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑客户信息'
            this.ruleForm =JSON.parse(JSON.stringify(row)) ;
            this.editIndex = index;
            this.dialogVisible = true
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
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
               }
               this.dialogVisible = false
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

    .treeFormItem /deep/ .el-form-item__content {
        width: 548px;
    }

    .SelectYihang {
        width: 210px;
    }

    .SelectYihang1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

}


@media screen and (max-width: 1664px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 365px;
    }

    .SelectYihang {
        width: 140px;
    }

    .SelectYihang1 {
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
    }

}

    
</style>

