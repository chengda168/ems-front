<template>
  <div class="bgLogin">
    <div class="lim">
      <div class="siemensLogin">
        <div class="LoginImage">
          <el-carousel :interval="5000" arrow="never" class="carousel">
            <el-carousel-item v-for="(item, index) in imageicon" :key="index">
              <img :src="item.images" />
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="Login">
          <div class="LoginTit">
            <img src="../assets/images/login/login.png" />
          </div>
          <div class="LoginCon">
            <div class="error" v-if="errordis == '1'">
              <div class="errorimage iconfont icon-jinggaozhuyi"></div>
              <div class="errorfont">
                登录账户或密码错误！剩余5次机会，超过6次将冻结24小时。
              </div>
            </div>
            <el-form
              :model="params"
              :rules="rule"
              ref="params"
              class="registerForm"
            >
              <el-form-item prop="name">
                <el-input v-model="params.name" placeholder="邮箱账号/手机号">
                </el-input>
                <div class="inputicon iconfont icon-wode"></div>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  :type="password1"
                  v-model="params.password"
                  placeholder="密码"
                ></el-input>
                <div class="inputicon iconfont icon-ic_keyboard"></div>
                <div
                  class="inputiconyanjing iconfont icon-yanjing"
                  @click="showpassword"
                ></div>
              </el-form-item>
              <el-form-item class="vcode" prop="vcode">
                <el-input
                  v-model="params.vcode"
                  placeholder="验证码"
                ></el-input>
                <div
                  class="inputicon iconfont icon-yunongtongqingshuruyanzhengma"
                ></div>
                <div class="inputCodeimage">
                  <img :src="verifyCodeApi" @click="getVerifyCode" />
                </div>
              </el-form-item>
              <div class="LoginConPass">
                <div class="FL">
                  <el-checkbox v-model="checked" class="">记住密码</el-checkbox>
                </div>
                <router-link to="/forget" class="FR" style="color: #009999"
                  >忘记密码?</router-link
                >
              </div>
              <el-button class="loginBtn" @click="sumbile('params')"
                >登 录</el-button
              >
            </el-form>
          </div>
          <div class="LoginBot">
            <el-carousel :autoplay="false" arrow="always">
              <el-carousel-item v-for="(item, index) in cn" :key="index">
                <h3>{{ item.no }}</h3>
              </el-carousel-item>
            </el-carousel>
            <!-- <div class="LoginBotQian"><div class="iconfontContent iconfont icon-jiantou-zuo" style="font-size:12px"></div></div>
            <div class="LoginBotFont">中文</div>
            <div class="LoginBotQian"><div class="iconfontContent iconfont icon-jiantou-copy"></div></div> -->
          </div>
        </div>
      </div>
      <div class="footLogin">
        西门子中国&nbsp;&nbsp;© 西门子（中国）有限公司 1996 – 2021Legal
        navigation&nbsp;&nbsp;&nbsp;&nbsp;企业信息&nbsp;&nbsp;&nbsp;&nbsp;隐私政策&nbsp;&nbsp;&nbsp;&nbsp;Cookie政策&nbsp;&nbsp;&nbsp;&nbsp;使用条款&nbsp;&nbsp;&nbsp;&nbsp;京ICP备06054295号&nbsp;&nbsp;&nbsp;&nbsp;京公网安备
        11010502040638号
      </div>
    </div>
  </div>
</template>
<script>
// import JsEncrypt from "jsencrypt";
import Login from "@/api/ums/login.js";

export default {
  data() {
    const validateVcode = (rule, value, callback) => {
      console.log(this.code, value);
      if (this.code.toLowerCase() != value.toLowerCase()) {
        callback(new Error("验证码错误，请重新输入"));
      } else {
        callback();
      }
    };

    return {
      errordis: "2",
      password1: "password",
      verifyCodeApi: this.GLOBAL.verifyCodeApi,

      params: {
        name: "",
        password: "",
        uuid: "",
        vcode: "",
      },
      cn: [
        {
          no: "中文",
        },
        {
          no: "英文",
        },
      ],
      imageicon: [
        {
          images: require("@/assets/images/login/loginimage.png"),
        },
        {
          images: require("@/assets/images/login/loginimage.png"),
        },
        {
          images: require("@/assets/images/login/loginimage.png"),
        },
      ],
      checked: false,
      rule: {
        name: [{ required: true, message: "不能为空", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        vcode: [
          {
            required: true,
            validator: validateVcode,
            trigger: "blur",
          },
        ],
      },
      code: "",
    };
  },
  mounted() {
    this.getVerifyCode();
  },
  methods: {
    // 获取图片验证码
    async getVerifyCode() {
      //获取uuid
      let res = await Login.verifyCode();
      this.verifyCodeApi = "data:image/gif;base64," + res.data.img;
      this.code = res.data.code;
    },
    showpassword() {
      if (this.password1 == "password") {
        this.password1 = "text";
      } else {
        this.password1 = "password";
      }
    },
    async sumbile(params) {
      //let code=await Login.verifyCode();
      let valid = this.$refs[params].validate();
      // this.$refs[params].validate((valid) => {
      if (valid) {
        let res = await Login.getPublicKey(this.params.name);
        let publicKey = res.data;
        let jse = new JsEncrypt();
        jse.setPublicKey(
          `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
        );
        let encrypted = jse.encrypt(this.params.password);
        let loginRes = await Login.doLogin({
          account: this.params.name,
          password: encrypted,
        });
        if (loginRes.code == 200) {
          this.$router.push("/dashboard");
        } else {
          this.errordis = "1";
        }
      }
    },
  },
};
</script>
<style scoped>
/deep/ .el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #009999;
  border-color: #009999;
}

/deep/ .el-checkbox__input.is-focus .el-checkbox__inner {
  border-color: #009999;
}

/* 广告 */
/deep/ .el-carousel__container {
  height: 780px;
}

/deep/ .el-checkbox__inner::after {
  height: 7px;
  left: 6px;
  top: 3px;
}

/deep/ .el-carousel__button {
  height: 12px;
  width: 12px;
  border-radius: 50%;
}
.LoginImage /deep/ .el-carousel__indicator--horizontal {
  padding: 18px 6px;
}
/* 中文英文 */
.LoginBot /deep/ .el-carousel--horizontal {
  width: 200px;
  height: 30px;
}
.LoginBot /deep/ .el-carousel__container {
  width: 200px;
  height: 30px;
}
.LoginBot /deep/ .el-carousel__indicators--horizontal {
  display: none;
}
.LoginBot /deep/ h3 {
  width: auto;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
}

.LoginBot /deep/ .el-carousel__arrow {
  width: 30px;
  height: 30px;
  background: #009999;
  box-shadow: 0px 0px 8px 0px rgba(0, 153, 153, 0.15);
  border-radius: 50%;
}
.LoginBot /deep/ .el-carousel__arrow--left {
  left: 0;
}
.LoginBot /deep/ .el-carousel__arrow--right {
  right: 0;
}
.FL {
  float: left;
}

.FL /deep/ .el-checkbox__label {
  padding-left: 0;
  line-height: 22px;
  font-size: 16px;
  color: #009999;
}
.FR {
  float: right;
}
.bgLogin {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(../assets/images/login/bg.png) no-repeat;
  background-size: 100% 100%;
  background-position: center;
}

.lim {
  width: 1400px;
  margin: 0 auto;
}

.siemensLogin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1400px;
  height: 800px;
  padding: 10px;
  background-color: #ffffff;
  box-shadow: 14px 42px 94px 0px rgba(0, 144, 173, 0.23);
  border-radius: 4px;
}

.footLogin {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 14px;
  text-align: center;
}

.LoginImage {
  float: left;
  width: 780px;
  height: 780px;
}

.Login {
  float: left;
  width: 600px;
  height: 780px;
  padding-top: 100px;
  padding-left: 90px;
  padding-right: 90px;
  background: #f1f6fa;
  border-radius: 0px 4px 4px 0px;
}

.LoginTit {
  width: 200px;
  height: 32px;
  margin-left: 110px;
  margin-bottom: 80px;
}

.vcode /deep/ .el-input {
  float: left;
  width: 260px;
}

.vcode /deep/ .el-input__inner {
  padding-right: 102px;
}

.inputCodeimage {
  float: right;
  width: 150px;
  height: 56px;
}

/deep/ .el-input__inner {
  position: relative;
  height: 56px;
  line-height: 56px;
  font-size: 18px;
  color: #becdd7;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 86, 122, 0.08);
  border-radius: 4px;
  padding-left: 60px;
  padding-right: 65px;
  border: 0;
}

/deep/ .el-form-item__error {
  padding-top: 5px;
  left: 20px;
}

.inputicon {
  position: absolute;
  top: 18px;
  left: 20px;
  color: #009999;
  font-size: 20px;
}

.inputiconyanjing {
  position: absolute;
  top: 17px;
  right: 20px;
  color: #879baa;
  font-size: 22px;
}

/deep/ .el-form-item {
  margin-bottom: 40px;
  position: relative;
}

.loginBtn {
  width: 400px;
  height: 56px;
  margin-left: 10px;
  line-height: 56px;
  background: #009999;
  border-radius: 4px;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  padding: 0;
}

.LoginCon {
  position: relative;
}

.error {
  position: absolute;
  top: -60px;
  left: 12px;
  width: 396px;
  height: 64px;
  background: url(../assets/images/login/error.png);
  background-size: 100% 100%;
  padding-top: 17px;
  line-height: 20px;
}

.errorfont {
  float: left;
  color: #ed5565;
  font-size: 12px;
  font-weight: 400;
}

.errorimage {
  float: left;
  margin-left: 28px;
  margin-top: 2px;
  margin-right: 8px;
  font-size: 14px;
  color: #ed5565;
}

.LoginConPass {
  width: 420px;
  height: 18px;
  line-height: 22px;
  font-size: 16px;
  color: #009999;
  margin-bottom: 40px;
}

/deep/ .el-checkbox__inner {
  width: 18px;
  height: 18px;
  background: #f1f6fa;
  border-radius: 2px;
  border: 1px solid #becdd7;
  margin-right: 10px;
}

.LoginBot {
  width: 200px;
  height: 30px;
  margin-top: 86px;
  display: flex;
  justify-content: space-between;
  margin-left: 110px;
}

/* .LoginBotQian {
    position: relative;
    width: 30px;
    height: 30px;
    background: #009999;
    box-shadow: 0px 0px 8px 0px rgba(0, 153, 153, 0.15);
    border-radius: 50%;
  }

  .iconfontContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffffff;
    font-size: 14px;
  } */

/* .LoginBotFont {
    width: auto;
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    font-weight: 400;
    color: #3C464B;
  } */

img {
  height: 100%;
}

@media screen and (max-width: 1664px) {
  /* 广告 */
  /deep/ .el-carousel__container {
    height: 520px;
  }

  /deep/ .el-checkbox__inner::after {
    width: 3px;
    height: 6px;
    left: 3px;
    top: 1px;
  }

  /deep/ .el-carousel__button {
    height: 8px;
    width: 8px;
    border-radius: 50%;
  }
  .LoginImage /deep/ .el-carousel__indicator--horizontal {
    padding: 12px 4px;
  }
  /* 中文英文 */
  .LoginBot /deep/ .el-carousel--horizontal {
    width: 133px;
    height: 20px;
  }
  .LoginBot /deep/ .el-carousel__container {
    width: 133px;
    height: 20px;
  }
  .LoginBot /deep/ .el-carousel__indicators--horizontal {
    display: none;
  }
  .LoginBot /deep/ h3 {
    width: auto;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
    font-weight: 400;
    text-align: center;
  }

  .FL /deep/ .el-checkbox__label {
    padding-left: 0;
    line-height: 15px;
    font-size: 11px;
    color: #009999;
  }

  .LoginBot /deep/ .el-carousel__arrow {
    width: 20px;
    height: 20px;
    background: #009999;
    box-shadow: 0px 0px 6px 0px rgba(0, 153, 153, 0.15);
    border-radius: 50%;
  }
  .LoginBot /deep/ .el-carousel__arrow--left {
    left: 0;
  }
  .LoginBot /deep/ .el-carousel__arrow--right {
    right: 0;
  }
  .FL {
    float: left;
  }
  .FR {
    float: right;
  }
  .bgLogin {
    position: relative;
    width: 100%;
    height: 100vh;
    background: url(../assets/images/login/bg.png) no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }

  .lim {
    width: 934px;
    margin: 0 auto;
  }

  .siemensLogin {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 934px;
    height: 534px;
    padding: 7px;
    background-color: #ffffff;
    box-shadow: 9px 28px 63px 0px rgba(0, 144, 173, 0.23);
    border-radius: 2px;
  }

  .footLogin {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%) scale(0.8);
    transform-origin: center;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }

  .LoginImage {
    float: left;
    width: 520px;
    height: 520px;
  }

  .Login {
    float: left;
    width: 400px;
    height: 520px;
    padding-top: 67px;
    padding-left: 60px;
    padding-right: 60px;
    background: #f1f6fa;
    border-radius: 0px 2px 2px 0px;
  }

  .LoginTit {
    width: 133px;
    height: 21px;
    margin-left: 73px;
    margin-bottom: 53px;
  }

  .vcode /deep/ .el-input {
    float: left;
    width: 173px;
  }

  .vcode /deep/ .el-input__inner {
    padding-right: 68px;
  }

  .inputCodeimage {
    float: right;
    width: 100px;
    height: 37px;
  }

  /deep/ .el-input__inner {
    position: relative;
    height: 37px;
    line-height: 37px;
    font-size: 12px;
    color: #becdd7;
    background: #ffffff;
    box-shadow: 0px 1px 2px 0px rgba(0, 86, 122, 0.08);
    border-radius: 3px;
    padding-left: 40px;
    padding-right: 43px;
    border: 0;
  }

  /deep/ .el-form-item__error {
    padding-top: 3px;
    left: 13px;
  }

  .inputicon {
    position: absolute;
    top: 14px;
    left: 13px;
    color: #009999;
    font-size: 13px;
  }

  .inputiconyanjing {
    position: absolute;
    top: 11px;
    right: 13px;
    color: #879baa;
    font-size: 15px;
  }

  /deep/ .el-form-item {
    margin-bottom: 27px;
    position: relative;
  }

  .loginBtn {
    width: 267px;
    height: 37px;
    margin-left: 7px;
    line-height: 37px;
    background: #009999;
    border-radius: 3px;
    text-align: center;
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;
    padding: 0;
  }

  .LoginCon {
    position: relative;
  }

  .error {
    position: absolute;
    top: -40px;
    left: 8px;
    width: 264px;
    height: 43px;
    background: url(../assets/images/login/error.png);
    background-size: 100% 100%;
    padding-top: 11px;
    line-height: 13px;
  }

  .errorfont {
    left: -21px;
    color: #ed5565;
    font-size: 12px;
    font-weight: 400;
    transform: scale(0.7);
    white-space: nowrap;
    position: absolute;
  }

  .errorimage {
    float: left;
    margin-left: 13px;
    margin-top: 1px;
    margin-right: 5px;
    font-size: 9px;
    color: #ed5565;
  }

  .LoginConPass {
    width: 280px;
    height: 12px;
    line-height: 15px;
    font-size: 12px;
    color: #009999;
    margin-bottom: 27px;
  }

  /deep/ .el-checkbox__inner {
    margin-top: 2px;
    width: 12px;
    height: 12px;
    background: #f1f6fa;
    border-radius: 1px;
    border: 1px solid #becdd7;
    margin-right: 7px;
  }

  .LoginBot {
    width: 133px;
    height: 20px;
    margin-top: 57px;
    display: flex;
    justify-content: space-between;
    margin-left: 73px;
  }

  /* .LoginBotQian {
      position: relative;
      width: 30px;
      height: 30px;
      background: #009999;
      box-shadow: 0px 0px 8px 0px rgba(0, 153, 153, 0.15);
      border-radius: 50%;
    }

    .iconfontContent {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ffffff;
      font-size: 14px;
    } */

  /* .LoginBotFont {
      width: auto;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      font-weight: 400;
      color: #3C464B;
    } */

  img {
    height: 100%;
  }
}
</style>

