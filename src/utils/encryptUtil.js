import JsEncrypt from "jsencrypt";
import Login from "@/api/ums/login.js";

/**
 * 密码加密
 * @param {账号} account 
 * @param {密码} password 
 */
export async function encrypt(account, password) {
    let pk = await getPublicKey(account);
    let jse = new JsEncrypt();
    jse.setPublicKey(
        `-----BEGIN PUBLIC KEY-----${pk}-----END PUBLIC KEY-----`
    );
    let encrypted = jse.encrypt(password);
    return encrypted;
}

/**
 * 获取公钥
 * @param {账号}} account 
 * @returns 
 */
export async function getPublicKey(account) {
    let res = await Login.getPublicKey(account);
    console.log(res);
    return res.data;
}

export default {
    encrypt
}