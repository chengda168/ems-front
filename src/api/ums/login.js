import BaseApi from '@/api/request/baseApi.js'

export default class login extends BaseApi {
    static async login(){
        // const url = `/ums/login`;
        // const data = await this.$get(url);
        // return data;
    }
    /**
     * 获取公钥
     * @param {*} account （邮箱，手机号）
     * @returns 
     */
    static async getPublicKey(account){
        const url = `/ums/login/getPublicKey`;
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
        const url = `/ums/login/doLogin`;
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
        const url = `/ums/verifyCode/getVerify`;
        const data = await this.$get(url);
        return data;
    }


 
}