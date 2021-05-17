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
                    <el-button type="primary" class="fullBtn" @click="isDialog=true"><i class="iconfont icon-shanchu"></i>删除</el-button>
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
                        prop="data"
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
            <Page :total="400" :pageSize="15" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
        </div>
        <el-dialog top="0"
            :title="title" :show-close="false"
            :visible.sync="dialogVisible" :before-close="beforeClose">
                <div class="close iconfont icon-guanbi" @click="beforeClose()"></div>
                <div class="dialogdiv">
                    <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm" :label-width="labelWidth" >
                        <el-form-item label="广告图片:" prop="bn">
                            <!-- <img class="davertiseimg" :src="scope.row.bn"> -->
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :limit='1'
                                :file-list="ruleForm.bn"
                                list-type="picture"
                                :on-remove="onRemove"
                                :on-success="onSuccess">
                                <div>
                                    <el-button class="updataImg">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip updataImgTip">图片尺寸789dpi*348dpi</div>
                                </div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="广告位置:" prop="name">
                            <el-input type="text" v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="广告展示时间:" prop="data">
                            <el-date-picker :clearable="false"
                            v-model="ruleForm.data[0]" :prefix-icon="'iconfont icon-rili'"
                            type="date" class="dateBox dataCon" :picker-options="pickerOptionsStart"
                            placeholder="开始日期">
                            </el-date-picker>
                            <span class="separatorText">至</span>
                            <el-date-picker :clearable="false" 
                            v-model="ruleForm.data[1]" :prefix-icon="'iconfont icon-rili'"
                            type="date" class="dateBox dataCon" :picker-options="pickerOptionsEnd"
                            placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="　广告描述:"  prop="email">
                            <el-input v-model="ruleForm.email" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
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
        }),
        
        pickerOptionsStart(){
            var _this=this;
            return {
                disabledDate(time) {
                    let endTime=_this.ruleForm.data[1];
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
                    let startTime=_this.ruleForm.data[0];
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
        Page,
        Tips
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value.length != 2) {
                callback(new Error('请输入广告展示时间'));
            } else {
            callback();
            }
        };
        var validatePass1 = (rule, value, callback) => {
            console.log(value.length)
            if (value.length != 1) {
                callback(new Error('请上传图片'));
            } else {
            callback();
            }
        };
      return {
        isDialog:false,
        dialogVisible:false,
        title:"新建首页广告",
        index:0,
        labelWidth:'120px',
        isEdit:false,
        editIndex:null,
        data:[],
        ruleForm: {
            bn: [],
            name: '',
            data:[],
            email: '',
        },
        rules: {
           bn: [
            { validator: validatePass1,  required: true, trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入广告位置', trigger: 'blur' },
          ],
          data: [
            { validator: validatePass,required: true, message: '请输入广告展示时间', trigger: 'blur' },
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
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:1,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:2,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:3,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:4,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:5,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:6,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:7,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:8,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:9,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:10,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:11,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:12,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:13,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:14,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:15,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:16,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:17,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:18,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:19,
                name: '第二张',
                data: '10天',
                email: '广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述广告描述',
            }, 
            {
                bn: require("@/assets/images/backups.png"),
                id:20,
                name: '第二张',
                data: '10天',
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
        onPageChange(val){
            console.log(val)
            this.currentPage = val;
        },
        onSuccess(response, file, fileList){
            console.log(fileList)
            
            this.ruleForm.bn = fileList
            this.$refs.ruleForm.validateField('bn');
        },
        onRemove(file, fileList){
            console.log(fileList)
            this.ruleForm.bn = fileList
            this.$refs.ruleForm.validateField('bn');
        },
        beforeClose(){
            this.ruleForm={
                bn: [],
                name: '',
                data: [],
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
                this.ruleForm.data = '10天'
                this.tableData.unshift(JSON.parse(JSON.stringify(this.ruleForm)))
               }
                
               this.dialogVisible = false
                this.ruleForm={
                    bn: [],
                    name: '',
                    data: [],
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
                this.labelWidth = '95px';
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
    .flex {
        display: flex;
        justify-content: space-between;
    }

    .upload-demo /deep/ .el-upload-list__item-name {
        display: none;
    }

    .upload-demo /deep/ .el-icon-close-tip {
        display: none;
    }

    .upload-demo /deep/ .el-icon-upload-success {
        display: none;
    }

    .upload-demo /deep/ .el-upload-list__item-status-label {
        display: none;
    }

    
    .dateBox{
        width: auto;
    }

    
@media screen and (min-width: 1665px) {

    .upload-demo /deep/ .el-upload-list__item {
        width: 100px;
        height: 100px;
        overflow: inherit;
        padding: 16px 5px;
        display: flex;
        justify-content: center;
        align-content: center;
        background: #FFFFFF;
        border-radius: 4px;
        border: 1px solid #BECDD7;
    }

    .upload-demo /deep/ .el-upload-list--picture .el-upload-list__item-thumbnail{
        width: 90px;
        height: auto;
        margin-left: 0;

    }

    .upload-demo /deep/ .el-icon-close {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 19px;
        color: #FFFFFF;
        text-align: center;
        background-color: #ED5565;
        border-radius: 50%;
        top: -12px;
        right: -12px;
        opacity: 1;
    }
    .upload-demo /deep/ .el-icon-close::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 12px;
        height: 2px;
        background-color: #FFFFFF;
    }

    .updataImg {
        float: left; 
        width: 140px;
        height: 40px;
        background: #009999;
        border-radius: 4px;
    }

    .updataImg /deep/ span {
        font-size: 16px;
        font-weight: 400;
        color: #FFFFFF;
    }

    .updataImgTip {
        float: left;
        height: 15px;
        margin-top: 12px;
        margin-left: 10px;
    }

    .dataCon {
        width: 185px;
    }
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
    .upload-demo /deep/ .el-button {
        padding: 0;
    }

    .flex /deep/ .el-input__icon {
        line-height: 28px;
    }

    .upload-demo /deep/ .el-upload-list__item {
        width: 67px;
        height: 67px;
        overflow: inherit;
        padding: 10px 3px;
        display: flex;
        justify-content: center;
        align-content: center;
        background: #FFFFFF;
        border-radius: 3px;
        border: 1px solid #BECDD7;
    }

    .upload-demo /deep/ .el-upload-list--picture .el-upload-list__item-thumbnail{
        width: 60px;
        height: auto;
        margin-left: 0;

    }

    .upload-demo /deep/ .el-icon-close {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 13px;
        color: #FFFFFF;
        text-align: center;
        background-color: #ED5565;
        border-radius: 50%;
        top: -8px;
        right: -8px;
        opacity: 1;
    }
    .upload-demo /deep/ .el-icon-close::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 8px;
        height: 2px;
        background-color: #FFFFFF;
    }

    .updataImg {
        float: left; 
        width: 94px;
        height: 27px;
        background: #009999;
        border-radius: 3px;
    }

    .updataImg /deep/ span {
        font-size: 12px;
        font-weight: 400;
        color: #FFFFFF;
    }

    .updataImgTip {
        float: left;
        height: 10px;
        margin-top: 5px;
        margin-left: 7px;
    }

    .dataCon {
        width: 114px;
    }
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
