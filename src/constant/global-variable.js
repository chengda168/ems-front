// 本地测试url
const umsURL = "http://localhost:8910";

// 发布url
const deployURL = "http://8.142.28.0/gateway/ems-ums"

// 验证码生成接口
const verifyCodeApi = umsURL + "/ums/verifyCode/generate";

const uploadPicUrl = "http://8.142.28.0/file/upload/pic";

export default {
    umsURL,
    verifyCodeApi,
    uploadPicUrl,
    deployURL
}