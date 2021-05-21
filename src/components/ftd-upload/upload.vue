<template>
    <el-upload :with-credentials="true" class="upload-demo" :action="url" :limit="limt" :accept="accept"
    :file-list="fileList" list-type="picture" :on-remove="onRemove" :on-success="onSuccess" :on-error="onError">
        <div class="flexBox uploadTipBox">
            <el-button type="primary" class="updataImg">点击上传</el-button>
            <div slot="tip" class="el-upload__tip ">
                <div class="updataImgTip">{{tips}}</div>
            </div>
        </div>
    </el-upload>
</template>

<script>
export default {
    props: {
        fileList: {
            type: Array,
            default: function () {
                return [];
            },
        },
        url: {
            type: String,
            default:'http://192.168.22.107:9987/upload/pic',
        },
        limt:{
            type: Number,
            default:1,
        },
        accept:{
          type: String,
          default:'.jpg,.jpeg,.png',
        },
        tips: {
            type: String,
            default:'',
        }
    },
    methods:{
        onSuccess(response, file, fileList) {
          console.log("response",response)
          console.log("file",file)
          console.log("fileList",fileList)
            this.$emit('onSucess',fileList)
        },
        onRemove(file, fileList) {
           this.$emit('onRemove',fileList)
        },
        onError(err, file, fileList){
            console.log("上传失败")
        }
    }
}
</script>


<style  scoped>
.upload-demo /deep/ .el-upload-list__item-name {
    display: none;
}

.upload-demo /deep/ .el-icon-close-tip {
    display: none !important;
}

.upload-demo /deep/ .el-icon-upload-success {
    display: none;
}

.upload-demo /deep/ .el-upload-list__item-status-label {
    display: none !important;
}
/* 1920 */
@media screen and (min-width: 1665px) {
    .upload-demo /deep/ .el-upload-list{
        display: flex;
    }
   .upload-demo /deep/ .el-upload-list__item {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 100px;
        height: 100px;
        padding: 16px 5px;
        margin-top: 30px;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #becdd7;
        overflow: inherit;
      }
      .upload-demo /deep/ .el-upload-list__item:not(:last-child){
        margin-right: 30px;
        }
    
      .upload-demo /deep/ .el-upload-list--picture .el-upload-list__item-thumbnail {
        width: 90px;
        height: auto;
        margin-left: 0;
      }
    
      .upload-demo /deep/ .el-icon-close {
        display: inline-block;
        width: 22px;
        height: 22px;
        line-height: 19px;
        color: #ffffff;
        text-align: center;
        background-color: #ed5565;
        border-radius: 50%;
        top: -12px;
        right: -12px;
        opacity: 1;
      }
      .upload-demo /deep/ .el-icon-close::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 2px;
        background-color: #ffffff;
      }
      .updataImg /deep/ span {
        font-size: 16px;
        font-weight: 400;
        color: #ffffff;
      }
      .upload-demo /deep/ .el-upload__tip{
        width: calc(100% - 140px);
        margin-top: 0;
      }
    .upload-demo /deep/  .uploadTipBox{
          align-items: flex-end;
      }
    .upload-demo /deep/  .updataImgTip {
        height: auto;
        line-height: 20px;
        margin-top: 0;
        margin-left: 10px;
        text-align: left;
      }
}
/* 1280*/
@media screen and (max-width: 1664px) {
     .upload-demo /deep/ .el-upload-list{
        display: flex;
    }
    .upload-demo /deep/ .el-upload-list__item {
        display: flex;
        justify-content: center;
        align-content: center;
        width: 67px;
        height: 67px;
        padding: 10px 3px;
        margin-top: 20px;
        background: #ffffff;
        border-radius: 3px;
        border: 1px solid #becdd7;
        overflow: inherit;
      }
    .upload-demo /deep/ .el-upload-list__item:not(:last-child){
        margin-right: 20px;
        }
      .upload-demo /deep/ .el-upload-list--picture .el-upload-list__item-thumbnail {
        width: 60px;
        height: auto;
        margin-left: 0;
      }
    
      .upload-demo /deep/ .el-icon-close {
        display: inline-block;
        width: 15px;
        height: 15px;
        line-height: 13px;
        color: #ffffff;
        text-align: center;
        background-color: #ed5565;
        border-radius: 50%;
        top: -8px;
        right: -8px;
        opacity: 1;
      }
      .upload-demo /deep/ .el-icon-close::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 8px;
        height: 2px;
        background-color: #ffffff;
      }

    
      .updataImg /deep/ span {
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;
      }
      .upload-demo /deep/  .uploadTipBox{
          align-items: flex-end;
      }
     .upload-demo /deep/ .el-upload__tip{
        width: calc(100% - 94px);
        margin-top: 0;
      }
    .upload-demo /deep/  .updataImgTip {
        width: 125%;
        height: auto;
        line-height: 14px;
        margin-top: 0;
        margin-left: 6px;
        text-align: left;
        transform: scale(0.8);
        transform-origin: left bottom;
      }
}
</style>
