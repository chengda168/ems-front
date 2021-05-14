<template>
  <div class="siemensForget">
    <div class="siemensForgetWrap">
      <div class="siemensForgetHead">
        <img src="../assets/images/forget/logo.png" class="siemensForgetLogo">
      </div>
      <div class="siemensForgetCon radiusCss">
        <div class="siemensForgetConTitle">找回密码</div>
        <div class="siemensForgetConStep">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <template v-if="activeIndex == 0">
              <el-form-item  prop="account">
                <el-input v-model="ruleForm.account" placeholder="请输入手机号/邮箱"></el-input>
              </el-form-item>
              <el-form-item  prop="code" class="formCode">
                <el-input v-model="ruleForm.code" placeholder="输入验证码"></el-input>
                <el-button type="primary" :disabled="!isSatisfy" v-if="!isGetCode" @click="onGetCode">获取验证码</el-button>
                <el-button type="primary" disabled v-else>{{count}}s</el-button>
              </el-form-item>
             <el-form-item>
                <el-button type="primary" class="fullBtn" @click="nonNext('ruleForm')">下一步</el-button>
            </el-form-item>
            </template>
            <template v-else-if="activeIndex == 1">
                <p class="tipsText">在以下四种字符中至少包含两种即可；密码长度至少为6位，最多为16个字符。大写英文字母、小写英文字母、数字、英文符号。</p>
                <el-form-item  prop="passwordOne">
                <el-input v-model="ruleForm.passwordOne" type="password" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <div class="flexBox passBox">
                <span>密码强度</span>
                <ul class="flexBetween">
                  <li class="passItem" :class="passType !='' ? 'redBg' :'grayBg'"></li>
                  <li class="passItem" :class="passType !='' ? 'orangeBg' :'grayBg'"></li>
                  <li class="passItem" :class="passType !='弱'&& passType !='' ? 'yellowBg' :'grayBg'"></li>
                  <li class="passItem" :class="passType !='弱'&& passType !='' ? 'yellowBg1' :'grayBg'"></li>
                  <li class="passItem" :class="passType =='强' ? 'greenBg' :'grayBg'"></li>
                  <li class="passItem" :class="passType =='强' ? 'greenBg1' :'grayBg'"></li>
                </ul>
                <span :class="classTextObj">{{passType}}</span>
              </div>
               <el-form-item  prop="passwordTwo">
                <el-input v-model="ruleForm.passwordTwo" type="password" placeholder="确认新密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="fullBtn" @click="nonNext('ruleForm')">确 认</el-button>
            </el-form-item>
            </template>
            <template v-else>
              <p class="successText">新密码设置成功！</p>
              <el-form-item>
                <el-button type="primary" class="fullBtn" @click="noRouter">重新登录</el-button>
            </el-form-item>
            </template>
            
            <router-link to="/" class="backHome">返回首页</router-link>
          </el-form>
        </div>
      </div>
      <div class="siemensForgetCopyRight">西门子中国&nbsp;&nbsp;© 西门子（中国）有限公司 1996 – 2021Legal navigation&nbsp;&nbsp;&nbsp;&nbsp;企业信息&nbsp;&nbsp;&nbsp;&nbsp;隐私政策&nbsp;&nbsp;&nbsp;&nbsp;Cookie政策&nbsp;&nbsp;&nbsp;&nbsp;使用条款&nbsp;&nbsp;&nbsp;&nbsp;京ICP备06054295号&nbsp;&nbsp;&nbsp;&nbsp;京公网安备 11010502040638号</div>
    </div>
  </div>
</template>
<script>
import Login from "@/api/ums/login.js";

export default {
  computed: {
    classTextObj: function () {
      return {
        'redColor': this.passType == '弱',
        'yellowColor': this.passType == '中',
        'greenColor': this.passType == '强'
      }
    }
  },
  data(){
    var validateName = (rule, value, callback) => {
      // 邮箱
      let ruleEmail = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      // 手机
      let rulePhone = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (value === '') {
          this.isSatisfy = false;
          callback(new Error('请输入手机号/邮箱'));
        } else {
          if (ruleEmail.test(value)) {
             this.isSatisfy = true;
              callback()
          }else if(rulePhone.test(value)){
            this.isSatisfy = true;
            callback()
          }else{
             this.isSatisfy = false;
            callback(new Error('格式错误，请重新输入'));
          }
        }
    };
    var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }  else {
          let length = value.length; //密码长度
          let modes = 0; //包含字符数量
          if(/\d/.test(value)){//如果用户输入的密码 包含了数字
            modes++;
          }
          if(/[a-z]/.test(value)){//如果用户输入的密码 包含了小写的a到z
            modes++;
          }
          if(/[A-Z]/.test(value)){//如果用户输入的密码 包含了大写的A到Z
            modes++;
          }
          if(/\W/.test(value)){//如果是非数字 字母 下划线
            modes++;
          }
          console.log(length)
          console.log(modes)
          if(length>=6&&length<=11&&modes==2){
            this.passType='弱'
            if (this.ruleForm.passwordTwo !== '') {
              this.$refs.ruleForm.validateField('passwordTwo');
            }
            callback()
          }else if((length>=6&&length<=11&&modes==3) || (length>=11&&length<=16&&modes==2)){
            this.passType='中'
            if (this.ruleForm.passwordTwo !== '') {
              this.$refs.ruleForm.validateField('passwordTwo');
            }
            callback()
          }else if((length>=6&&length<=11&&modes==4) || (length>=11&&length<=16&&modes==3)){
            this.passType='强'
            if (this.ruleForm.passwordTwo !== '') {
              this.$refs.ruleForm.validateField('passwordTwo');
            }
            callback()
          }else{
            this.passType=''
            callback(new Error('密码格式不正确'))
          } 
        }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请确认新密码'));
      } else if (value !== this.ruleForm.passwordOne) {
        callback(new Error('新密码不一致，请重新输入!'));
      } else {
        callback();
      }
    };
    return{

      passType:'',
      activeIndex:0,
      isSatisfy:false,
      isGetCode:false,
      count:60,
      ruleForm:{
        account:'',
        code:'',
        passwordOne:'',
        passwordTwo:''
      },
       rules: {
          account: [
            { validator: validateName, trigger: 'blur'}
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ],
          passwordOne: [
            { validator: validatePass, trigger: 'blur'}
          ],
          passwordTwo: [
            { validator: validatePass2, trigger: 'blur' }
          ],
       }
    }
  },
  methods:{
    onGetCode(){
      let res =  Login.sendVerificationCode(this.ruleForm.account);
      console.log(res)
      this.isGetCode = true
      let self = this;
      let timer =setInterval(function(){
        self.count--;
        if(self.count<=0){
          clearInterval(timer)
          self.isGetCode = false;
        }
      },1000)
    },
    nonNext(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.activeIndex++;
          } else {
            return false;
          }
        });
    },
    noRouter(){
       this.$router.push("/login");
    }
  }
}
</script>

<style scoped>
/* 1920 */
@media screen and (min-width: 1665px) {
  .siemensForget{
    width: 100%;
    height: 100vh;
    background-image: url(../assets/images/forget/bg.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensForgetWrap{
    position: relative;
    width: 1500px;
    height: 100%;
    margin: 0 auto;
  }
  .siemensForgetHead{
    height: 100px;
    padding: 40px 0 32px 0;
  }
  .siemensForgetLogo{
    width: 180px;
  }
  .siemensForgetCon{
    width: 100%;
    height: 800px;
    padding: 0 30px;
    text-align: center;
    background-color: #FFFFFF;
    box-shadow: 0px 26px 80px 0px rgba(0, 144, 173, 0.05);
  }
  .siemensForgetConTitle{
    width: 100%;
    height: 80px;
    padding-top: 40px;
    font-size: 18px;
    text-align: left;
    border-bottom: 1px solid #F1F6FA;
  }
  .siemensForgetConStep{
    position: relative;
    width: 480px;
    height: auto;
    margin: 120px auto 0 auto;
  }
  .siemensForgetConStep /deep/ .el-form-item{
    margin-bottom: 50px;
  }
  .siemensForgetConStep /deep/ .el-button,
  .siemensForgetConStep /deep/ .el-input__inner{
    font-size: 16px;
    height: 56px;
  }
  .siemensForgetConStep /deep/ .el-input__inner{
    padding: 0 20px;
  }
  .siemensForgetConStep /deep/ .el-button.fullBtn{
    font-size: 18px;
  }

  .formCode /deep/ .el-form-item__content{
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .formCode /deep/ .el-input{
    flex: 1;
  }
  .formCode /deep/ .el-button{
    width: 140px;
    margin-left: 10px;
  }
  .passBox{
    margin-top: -30px;
    margin-bottom: 40px;
    font-size: 16px;
  }
  .passBox ul{
    margin: 0 10px;
  }
  .passItem{
    width: 60px;
    height: 10px;
    border-radius: 10px;
  }
  .passItem:not(:last-child){
    margin-right: 4px;
  }
  .tipsText{
    position: absolute;
    top: -32px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 1;
    font-size: 12px;
    color: #ED5565;
    white-space: nowrap;
  }
  .successText{
    line-height: 28px;
    padding: 68px 0 118px 0;
    font-size: 20px;
    color: #009999;
  }
  .backHome{
    font-size: 14px;
    color: #4461F2;
    text-decoration: underline;
  }
  .siemensForgetCopyRight{
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}
/* 1280*/
@media screen and (max-width: 1664px) {
  .siemensForget{
    width: 100%;
    height: 100vh;
    background-image: url(../assets/images/forget/bg.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .siemensForgetWrap{
    position: relative;
    width: 1000px;
    height: 100%;
    margin: 0 auto;
  }
  .siemensForgetHead{
    height: 66px;
    padding: 26px 0 21px 0;
  }
  .siemensForgetLogo{
    width: 120px;
  }
  .siemensForgetCon{
    width: 100%;
    height: 534px;
    padding: 0 20px;
    text-align: center;
    background-color: #FFFFFF;
    box-shadow: 0px 17px 54px 0px rgba(0, 144, 173, 0.05);
  }
  .siemensForgetConTitle{
    width: 100%;
    height: 54px;
    padding-top: 26px;
    font-size: 12px;
    text-align: left;
    border-bottom: 1px solid #F1F6FA;
  }
  .siemensForgetConStep{
    position: relative;
    width: 320px;
    height: auto;
    margin: 80px auto 0 auto;
  }
  .siemensForgetConStep /deep/ .el-form-item{
    margin-bottom: 34px;
  }
  .siemensForgetConStep /deep/ .el-button,
  .siemensForgetConStep /deep/ .el-input__inner{
    font-size: 12px;
    height: 37px;
  }
  .siemensForgetConStep /deep/ .el-input__inner{
    padding: 0 14px;
  }
  .siemensForgetConStep /deep/ .el-button.fullBtn{
    width: 100%;
    font-size: 12px;
  }

  .formCode /deep/ .el-form-item__content{
    display: flex;
    align-items: center;
    justify-content:space-between;
  }
  .formCode /deep/ .el-input{
    flex: 1;
  }
  .formCode /deep/ .el-button{
    width: 94px;
    margin-left: 6px;
  }
  .passBox{
    margin-top: -20px;
    margin-bottom: 26px;
    font-size: 12px;
  }
  .passBox ul{
    margin: 0 6px;
  }
  .passItem{
    width: 38px;
    height: 6px;
    border-radius: 6px;
  }
  .passItem:not(:last-child){
    margin-right: 3px;
  }
  .tipsText{
    position: absolute;
    top: -21px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 1;
    font-size: 12px;
    color: #ED5565;
    white-space: nowrap;
  }
  .successText{
    line-height: 18px;
    padding: 45px 0 78px 0;
    font-size: 14px;
    color: #009999;
  }
  .backHome{
    font-size: 12px;
    color: #4461F2;
    text-decoration: underline;
  }
  .siemensForgetCopyRight{
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    transform-origin: center;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }
}

</style>
