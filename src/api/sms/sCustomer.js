import BaseApi from '@/api/request/baseApi.js'
import GLOBAL from '@/constant/global-variable'
let baseUrl = GLOBAL.baseUrl.smsURL;
/**
 * 客户api接口
 */
export default class sCustomer extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async list(param) {
        const url = baseUrl + `/sCustomer/list`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param) {
        const url = baseUrl + `/sCustomer/add`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 删除
     * @param {实体id} id 
     * @returns 
     */
    static async delete(id) {
        const url = baseUrl + `/sCustomer/delete/${id}`;
        const data = await this.$post(url);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param) {
        const url = baseUrl + `/sCustomer/update`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 批量数组
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids) {
        const url = baseUrl + `/sCustomer/deleteBatch`;
        const data = await this.$post(url, ids);
        return data;
    }

    /**
     * 查询登录用户下的客户
     * @returns 
     */
    static async allByLoginUser() {
        const url = baseUrl + `/sCustomer/allByLoginUser`;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 
     * @returns 获取上级单位
     */
    static async getAllCustomer(){
        const url = baseUrl + `/sCustomer/getAllCustomer`;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 获取运维团队
     * @returns 
     */
    static async getOperationUnit(){
        const url = baseUrl + `/sOperationUnit/list`;
        const data = await this.$get(url);
        return data;
    }


}