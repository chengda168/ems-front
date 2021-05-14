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
        // console.log(uuid)
        const url = `/ums/verifyCode/generate`;
        // let param = {
        //     "uuid" : uuid
        // }
        const data = await this.$get(url);
        return data;
    }


    /**
     * 获取验证码（短信、邮箱）
     * @param {*} number 
     * @returns 
     */
    static async sendVerificationCode(number){
        const url = `/ums/users/sendVerificationCode`;
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
        const url = `/ums/users/verificationCode`;
        let param = {
            "number" : account,
            "vCode":code
        }
        const data = await this.$get(url,param);
        return data;
    }

    /**
     * 修改密码
     * @param {*} account 
     * @param {*} passwordTwo 
     * @returns 
     */
    static async updateNewPwd(account,passwordTwo){
        const url = `/ums/users/updateNewPwd`;
        let param = {
            "number" : account,
            "newPwd":passwordTwo
        }
        const data = await this.$post(url,param);
        console.log(param)
        return data;
    }

 
}