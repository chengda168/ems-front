// //--------------------------------------------拦截器  axios-------------------------------------------------------------------
import axios from 'axios';

export const post = (url, param) => {
    return axios({
        url: url,
        method: 'post',
        data: param
    })
}

export const get = (url, param) => {
    return axios({
        url: url,
        method: 'get',
        params: param
    })
}

export const del = (url, param) => {
    return axios({
        url: url,
        method: 'delete',
        data: param
    })
}

export const put = (url, param) => {
    return axios({
        url: url,
        method: 'put',
        data: param
    })
}
