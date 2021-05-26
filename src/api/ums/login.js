import BaseApi from '@/api/request/baseApi.js'
import GLOBAL from '@/constant/global-variable'
let baseUrl = GLOBAL.baseUrl.umsURL;

export default class login extends BaseApi {
    /**
     * 获取公钥
     * @param {*} account （邮箱，手机号）
     * @returns 
     */
    static async getPublicKey(account){
        const url = baseUrl + `/login/getPublicKey`;
        let param = {
            "account" : account
        }
        const data = await this.$get(url,param);
        return data;
    }
    /**
     * 登录
     * @param {*} userJson （{account,password}）
     * @returns 
     */
    static async doLogin(userJson){
        const url = baseUrl + `/login/doLogin`;
        // let param = {
        //     "userJson" : userJson
        // }
        const data = await this.$post(url,userJson);
        return data;
    }

    /**
     * 获取验证码
     * @returns 
     */
    static async verifyCode(){
        const url = baseUrl + `/verifyCode/generate`;
        const data = await this.$get(url);
        return data;
    }


    /**
     * 获取验证码（短信、邮箱）
     * @param {*} number 
     * @returns 
     */
    static async sendVerificationCode(number){
        const url = baseUrl + `/users/sendVerificationCode`;
        let param = {
            "number" : number
        }
        const data = await this.$get(url,param);
        return data;

    }

    /**
     * 验证
     * @param {*账号} number 
     * @param {*验证码} vcode 
     * @returns 
     */
    static async verificationCode(account,code){
        const url = baseUrl + `/users/verificationCode`;
        let param = {
            "number" : account,
            "vCode":code
        }
        const data = await this.$get(url,param);
        return data;
    }

    /**
     * 修改密码（发送短信）
     * @param {*} account 
     * @param {*} passwordTwo 
     * @returns 
     */
    static async updateNewPwd(account,encrypted){
        const url = baseUrl + `/users/updateNewPwd`;
        let param = {
            "number" : account,
            "newPwd":encrypted
        }
        const data = await this.$post(url,param);
        return data;
    }
    /**
     * 更新用户密码(旧密码)
     * @param {*} account 
     * @param {*} passwordTwo 
     * @returns 
     */
    static async updatePwd(account,encryptedold,encryptednew){
        const url = baseUrl + `/users/updatePwd`;
        let param = {
            "oldPwd" : encryptedold,
            "newPwd":encryptednew,
            "account":account
        }
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 重置密码(旧密码)
     * @param {*} account 
     * @param {*} passwordTwo 
     * @returns 
     */
     static async resetPwd(account,encryptedNewPwd,type){
        const url = baseUrl + `/login/resetPwd`;
        let param = {
            "account" : account,
            "newPwd" : encryptedNewPwd,
            "type":type
        }
        console.log(param)
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 登出
     * @returns 
     */
    static async logout(){
        const url = baseUrl + `/login/logout`;
        const data = await this.$get(url);
        return data;
    }

 
}