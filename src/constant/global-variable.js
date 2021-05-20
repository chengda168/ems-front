//全局变量文件
// const baseURL = 'http://localhost:8909';

const umsURL = "http://localhost:8910";

// 验证码生成接口
const verifyCodeApi = umsURL + "/ums/verifyCode/generate";

const uploadPicUrl = "http://192.168.22.107:9987/upload/pic";

export default {
    umsURL,
    verifyCodeApi,
    uploadPicUrl
}