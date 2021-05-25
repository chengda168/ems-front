import BaseApi from '@/api/request/baseApi.js'
import GLOBAL from '@/constant/global-variable'
let baseUrl = GLOBAL.baseUrl.smsURL;

/**
 * 运维团队api接口
 */
export default class sOperationUnit extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async page(param){
        const url = baseUrl + `/sOperationUnit/page`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param){
        const url = baseUrl + `/sOperationUnit/add`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 删除
     * @param {实体id} id 
     * @returns 
     */
    static async delete(id){
        const url = baseUrl + `/sOperationUnit/delete/${id}`;
        const data = await this.$post(url);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param){
        const url = baseUrl + `/sOperationUnit/update`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 批量删除
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids){
        const url = baseUrl + `/sOperationUnit/deleteBatch`;
        const data = await this.$post(url,ids);
        return data;
    } 

    /**
     * 查询所有
     * @returns 
     */
     static async list(){
        const url = baseUrl + `/sOperationUnit/list`;
        const data = await this.$get(url);
        return data;
    }
}