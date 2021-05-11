import BaseApi from '@/api/request/baseApi.js'

export default class sOperationTeam extends BaseApi {
    static async add(param){
        const url = `/ums/sOperationTeam/add`;
        const data = await this.$post(url,param);
        return data;
    }
 
}