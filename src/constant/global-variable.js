// 本地测试url
const baseUrl = {
    umsURL : "http://localhost:8910",
    smsURL : "http://localhost:8966"
}

// 部署环境
if (process.env.NODE_ENV == "production") {
    baseUrl.umsURL = "http://8.142.28.0/gateway/ems-ums"
    baseUrl.smsURL = "http://8.142.28.0/gateway/ems-sms"
}

// 验证码生成接口
const verifyCodeApi = baseUrl.umsURL + "/ums/verifyCode/generate";

const uploadPicUrl = "http://8.142.28.0/file/upload/pic";

export default {
    baseUrl,
    verifyCodeApi,
    uploadPicUrl,
    deployURL
}