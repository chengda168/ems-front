//全局变量文件
// const baseURL = 'http://localhost:8909';

const umsURL = "http://localhost:8910";

// 验证码生成接口
const verifyCodeApi = umsURL + "/ums/verifyCode/generate";


export default {
    umsURL,
    verifyCodeApi
}