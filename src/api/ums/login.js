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
     * 修改密码（发送短信）
     * @param {*} account 
     * @param {*} passwordTwo 
     * @returns 
     */
    static async updateNewPwd(account,encrypted){
        const url = `/ums/users/updateNewPwd`;
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
        const url = `/ums/users/updatePwd`;
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
        const url = `/ums/login/resetPwd`;
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
        const url = `/ums/login/logout`;
        const data = await this.$get(url);
        return data;
    }

 
}