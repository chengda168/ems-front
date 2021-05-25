<template>
    <div class="siemensLayoutCon">
        <div class="whiteBg siemensLayoutResultBox" >
            <div class="swiperBox">
                <div class="swiperBoxContain">
                    <ul class="swiperWrapper" ref="swiperBox" :style="styleObj">
                        <li class="swiperSlide" :class="{'swiperSlideActive' : activeIndex == index}" 
                        v-for="(item,index) in dicTypeList" :key="item.dicType" @click="onChange(item.dicType)">
                            <el-tooltip effect="dark" :content="item.dicTypeName" placement="top" :disabled="item.length<=6">
                                <div>{{item.dicTypeName}}</div>
                            </el-tooltip>
                        </li>
                    </ul>
                </div>
                <template v-if="isShowArrow">
                    <el-button type="primary" class="swiperBtn swiperPrevBtn flexCenter" :disabled="btnPrevDisabled" @click="onPrev"><i class="iconfont icon-youjiantou"></i></el-button>
                    <el-button type="primary" class="swiperBtn swiperNextBtn flexCenter" :disabled="btnNextDisabled" @click="onNext"><i class="iconfont icon-youjiantou"></i></el-button>
                </template>
            </div>
            <div class="dataConBox">
                <div class="siemensLayoutSearchBox flexStartBetween">
                    <el-form :inline="true"  class="siemensLayoutSearchBoxForm flexBetween">
                        <el-form-item label="字段名称：">
                            <el-input v-model="dic_type_name" placeholder="请输入字段名称"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onSearch"><i class="iconfont icon-sousuo"></i>查询</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="flexCenter">
                        <el-button type="primary" @click="onAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
                        <el-button type="primary" @click="isDialog = true"><i class="iconfont icon-shanchu"></i>删除</el-button>
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
                            prop="dic_type_name" 
                            label="字段名称">
                        </el-table-column>
                        <el-table-column align="center" :width="operWidth"
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
                <Page :total="totalElements" :pageSize="pageSize" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
            </div>
        </div>
        <el-dialog top="0"  class="dialogWrap"
        :title="title" :show-close="false" @close="$resetForm('ruleForm')"
        :visible.sync="dialogVisible">
            <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
            <div class="dialogdiv">
                <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm"  :label-width="labelWidth" >
                    <el-form-item label="字段名称:" prop="dic_type_name">
                        <el-input type="text" v-model="ruleForm.dic_type_name"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div class="dialogbuttom">
                <div @click="dialogVisible = false">取 消</div>
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
import SDic from "@/api/sms/sDic";

  export default {
    computed:{
        ...mapGetters({
            collapse: 'collapse'
        }),
        styleObj(){
            return{
                 transform:`translateX(${this.translateX}px)`
            }
        },
        btnPrevDisabled(){
            return this.translateX == 0
        },
        btnNextDisabled(){
            let scrollWidth = this.$refs.swiperBox.scrollWidth;
            let offsetWidth = this.$refs.swiperBox.offsetWidth;
            return offsetWidth-scrollWidth  == this.translateX
        }
    },
     components:{
        Page,
        Tips
    },
    data(){
        return{
            translateX:0,
            isShowArrow:false,
            activeIndex:0,
            dicTypeList:{},
            dic_type_name:'',
            currentPage:1,
            editIndex:null,
            index:0,
            isDialog:false,
            isEdit:false,
            title:'新建字段',
            dialogVisible:false,
            width:80,
            labelWidth:'84px',
            operWidth:200,
            ruleForm:{
                dic_type_name:''
            },
            rules: {
                dic_type_name: [
                    { required: true, message: '请输入字段名称', trigger: 'blur' },
                ]
            },
            totalElements:0,
            pageSize:15,
            content:[
                {
                    id:0,
                     dic_type_name: '配电室'
                }, 
                {
                    id:1,
                    dic_type_name: '配电室'
                }, 
                {
                    id:2,
                     dic_type_name: '配电室'
                },
                {
                    id:3,
                     dic_type_name: '配电室',
                },
                {
                    id:4,
                     dic_type_name: '配电室'
                }, 
                {
                    id:5,
                     dic_type_name: '配电室'
                }, 
                {
                    id:6,
                     dic_type_name: '配电室'
                },
                {
                    id:7,
                     dic_type_name: '配电室'
                },
                {
                    id:8,
                     dic_type_name: '配电室'
                }, 
                {
                    id:9,
                     dic_type_name: '配电室'
                }, 
                {
                    id:10,
                     dic_type_name: '配电室'
                },
                {
                    id:11,
                     dic_type_name: '配电室'
                },
                {
                    id:12,
                     dic_type_name: '配电室'
                },
                {
                    id:13,
                     dic_type_name: '配电室'
                },
                {
                    id:14,
                     dic_type_name: '配电室'
                }
            ],
            tableData: [],
            tableSeelctVal:[],
        }
    },
    methods:{
        getTableData(){
            this.tableData= this.content;
            this.totalElements = this.content.length;
        },
        onChange(index){
            this.activeIndex = index;
        },
        onPrev(){
            let outerWidth = $(".swiperSlideActive").outerWidth(true);
            this.translateX = this.translateX+outerWidth;
            if(this.translateX>=0){
                this.translateX = 0
            }
        },
        onNext(){
            let scrollWidth = this.$refs.swiperBox.scrollWidth;
            let offsetWidth = this.$refs.swiperBox.offsetWidth;
            let outerWidth = $(".swiperSlideActive").outerWidth(true);
            this.translateX = this.translateX-outerWidth;
            if(offsetWidth-this.translateX>=scrollWidth){
                this.translateX = offsetWidth-scrollWidth
            }
        },
        onSearch(){
            console.log("查询")
        },
        onPageChange(val){
            console.log(val)
            this.currentPage = val;
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
               this.getTableData()
              this.dialogVisible = false
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        onAdd(){
            this.isEdit = false;
            this.title = '新建字段'
            this.ruleForm.id=this.tableData.length;
            this.dialogVisible = true;
        },
         onEdit(row,index){
            this.isEdit = true;
            this.title = '编辑字段'
            this.ruleForm =JSON.parse(JSON.stringify(row)) ;
            this.editIndex = index;
            this.dialogVisible = true
        },
        handleSelectionChange(val){
            this.tableSeelctVal = val;
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
            this.getTableData()
        },
        resizeFn() {
            if(!this.collapse){
                if (document.body.clientWidth > 1664) {
                    this.width = 80;
                    this.operWidth= 200;
                } else {
                    this.width = 54;
                    this.operWidth= 134;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 90;
                    this.operWidth= 210;
                } else {
                    this.width = 60;
                    this.operWidth= 140;
                }
            }
            this.translateX=0;
            let scrollWidth = this.$refs.swiperBox.scrollWidth;
            let offsetWidth = this.$refs.swiperBox.offsetWidth;
            if(scrollWidth>offsetWidth){
                this.isShowArrow = true;
            }else{
                this.isShowArrow = false;
            }
        },
        async api_GetTypes() {
            let res = await SDic.getTypes();
            this.dicTypeList = res.data;
        },
    },
    watch:{
        collapse(newVal){
            if(!newVal){
                if (document.body.clientWidth > 1664) {
                    this.width = 80;
                    this.operWidth= 200;
                } else {
                    this.width = 54;
                    this.operWidth= 134;
                }
            }else{
                if (document.body.clientWidth > 1664) {
                    this.width = 90;
                    this.operWidth= 210;
                } else {
                    this.width = 60;
                    this.operWidth= 140;
                }
            }
        }
    },
    mounted(){
        let self = this;
        this.resizeFn();
        window.addEventListener("resize", function () {
            self.resizeFn();
        });   
        this.getTableData()
        this.api_GetTypes()
       
    }
}
</script>

<style scoped>
 @media screen and (min-width: 1665px) {
    .whiteBg{
        height: 100%;
        padding-bottom: 30px;
    }
    .pageBox{
        margin-top: 20px;
    }
    .swiperBox{
        position: relative;
        height: 70px;
        padding: 0 130px;
    }
    .swiperBoxContain{
        height: 100%;
        overflow: hidden;
    }
    .swiperWrapper{
        display: flex;
        width: auto;
        height: 100%;
        white-space: nowrap;
    }
    .swiperSlide{
        position: relative;
        flex: none;
        width: 110px;
        height: 100%;
        padding-top: 30px;
        font-size: 18px;
        color: #879BAA;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .swiperSlide /deep/ .el-tooltip {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .swiperSlideActive{
        font-weight: 500;
        color:#3C464B
    }
    .swiperSlideActive::before{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 5px;
        background: #009999;
        border-radius: 10px;
    }
    .swiperSlide:not(:last-child){
        margin-right: 116px;
    }
    .swiperBtn{
        position: absolute;
        top: 25px;
        width: 30px;
        height: 30px;
        margin: 0 !important; 
        padding: 0;
        color: #ffffff;
        background-color: #009999;
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
    .swiperBtn.is-disabled{
        background-color: #BECDD7;
    }
    .swiperBtn i{
        margin: 0;
        font-size: 16px;
    }
    .swiperPrevBtn{
        left: 30px;
    }
    .swiperPrevBtn i{
        transform: rotate(180deg);
    }
    .swiperNextBtn{
        right: 30px;
    }
    .dataConBox{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 40px 30px 30px 30px;
        background: #F1F6FA;
        border-radius: 10px;
        overflow: hidden;
    }
    .siemensLayoutSearchBox{
        margin-bottom: 20px;
    }
    
    .siemensLayoutSearchBoxForm /deep/ .el-form-item{
        margin-bottom: 0;
    }
    .siemensLayoutSearchBoxForm /deep/ .el-form-item__content{
        width: 300px;
    }
    .dialogdiv{
        padding-bottom: 36px;
    }
    .dialogWrap /deep/ .el-dialog__body{
        padding-top: 60px;
    }
}


 @media screen and (max-width: 1664px) {
    .whiteBg{
        height: 100%;
         padding-bottom: 20px;
    }
    .pageBox{
        margin-top: 14px;
    }
    .swiperBox{
        position: relative;
        height: 46px;
        padding: 0 86px;
    }
    .swiperBoxContain{
        height: 100%;
        overflow: hidden;
    }
    .swiperWrapper{
        display: flex;
        width: auto;
        height: 100%;
        white-space: nowrap;
    }
    .swiperSlide{
        position: relative;
        flex: none;
        width: 74px;
        height: 100%;
        padding-top: 20px;
        font-size: 12px;
        color: #879BAA;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
    }
    .swiperSlide /deep/ .el-tooltip {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .swiperSlideActive{
        font-family: "PingFang Bold";
        font-weight: 500;
        color:#3C464B
    }
    .swiperSlideActive::before{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: #009999;
        border-radius: 6px;
    }
    .swiperSlide:not(:last-child){
        margin-right: 77px;
    }
    .swiperBtn{
        position: absolute;
        top: 17px;
        width: 20px;
        height: 20px;
        margin: 0 !important; 
        padding: 0;
        color: #ffffff;
        background-color: #009999;
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
    .swiperBtn.is-disabled{
        background-color: #BECDD7;
    }
    .swiperBtn i{
        margin: 0;
        font-size: 12px;
    }
    .swiperPrevBtn{
        left: 20px;
    }
    .swiperPrevBtn i{
        transform: rotate(180deg);
    }
    .swiperNextBtn{
        right: 20px;
    }
    .dataConBox{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 26px 20px 20px 20px;
        background: #F1F6FA;
        border-radius: 6px;
        overflow: hidden;
    }
    .siemensLayoutSearchBox{
        margin-bottom: 14px;
    }
    
    .siemensLayoutSearchBoxForm /deep/ .el-form-item{
        margin-bottom: 0;
    }
    .siemensLayoutSearchBoxForm /deep/ .el-form-item__content{
        width: 200px;
    }
    .dialogdiv{
        padding-bottom: 24px;
    }
    .dialogWrap /deep/ .el-dialog__body{
        padding-top: 40px;
    }
}
    
    
</style>
