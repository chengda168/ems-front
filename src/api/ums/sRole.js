import BaseApi from '@/api/request/baseApi.js'
import GLOBAL from '@/constant/global-variable'
let baseUrl = GLOBAL.baseUrl.umsURL;

/**
 * 角色api接口
 */
export default class sRole extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async page(param) {
        const url = baseUrl + `/sRole/page`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param) {
        const url = baseUrl + `/sRole/add`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param) {
        const url = baseUrl + `/sRole/update`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 批量删除
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids) {
        const url = baseUrl + `/sRole/deleteBatch`;
        const data = await this.$post(url, ids);
        return data;
    }

    /**
     * 查询列表
     * @param {查询参数} param 
     */
    static async list(param) {
        const url = baseUrl + `/sRole/list`;
        console.log(param);
        const data = await this.$get(url, param);
        return data;
    }

}