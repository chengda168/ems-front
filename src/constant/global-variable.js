// 本地测试url
const baseUrl = {
    umsURL : "http://localhost:8910",
    smsURL : "http://localhost:8966"
}

// 发布url
const deployURL = "http://8.142.28.0/gateway/ems-ums"

// 验证码生成接口
const verifyCodeApi = baseUrl.umsURL + "/ums/verifyCode/generate";

const uploadPicUrl = "http://8.142.28.0/file/upload/pic";

export default {
    baseUrl,
    verifyCodeApi,
    uploadPicUrl,
    deployURL
}