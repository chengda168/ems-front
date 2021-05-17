<template>
    <el-dialog top="0" :show-close="false" class="deletedDailog"
            :visible.sync="isDialog">
            <div class="close iconfont icon-guanbi" @click="resetForm()"></div>
            <p class="tipsText"> {{title}}</p>
            <div class="dialogbuttom">
                <div @click="resetForm()">取 消</div>
                <div class="dialogbuttomclose"  @click="submitForm()">确 定</div>
            </div>
    </el-dialog>
</template>
<script>
export default {
    props:{
        title: {
            type: String,
            default:'确认删除此信息吗？',
        },
        isDialog:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{

        }
    },
    methods:{
        resetForm(){
            this.$emit('onClose')
        },
        submitForm(){
            this.$emit('onConfirm')
        }
    }
}
</script>
<style scoped>
@media screen and (min-width: 1665px) {
    .deletedDailog /deep/ .el-dialog__header{
        display: none;
    }
    .deletedDailog /deep/ .el-dialog__body{
        padding-right: 30px;
        padding-top: 50px;
        font-size: 20px;
        text-align: center;
        color: #3C464B;
    }
    .dialogbuttom{
        margin-top: 74px;
        padding-right: 60px;
    }
    .tipsText{
        line-height: 36px;
    }
}

/* 1280*/
@media screen and (max-width: 1664px) {
    .deletedDailog /deep/ .el-dialog__header{
        display: none;
    }
    .deletedDailog /deep/ .el-dialog__body{
        padding-right: 20px;
        padding-top: 34px;
        font-size: 14px;
        text-align: center;
        color: #3C464B;
    }
    .dialogbuttom{
        margin-top: 50px;
         padding-right:40px;
    }
    .tipsText{
        line-height: 24px;
    }
}
</style>
