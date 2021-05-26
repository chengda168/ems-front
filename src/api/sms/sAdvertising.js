import BaseApi from '@/api/request/baseApi.js'
import GLOBAL from '@/constant/global-variable'
let baseUrl = GLOBAL.baseUrl.smsURL;

/**
 * 客户api接口
 */
export default class sAdvertising extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async page(param) {
        const url = baseUrl + `/sAdvertising/page`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param) {
        const url = baseUrl + `/sAdvertising/add`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 删除
     * @param {实体id} id 
     * @returns 
     */
    static async delete(id) {
        const url = baseUrl + `/sAdvertising/delete/${id}`;
        const data = await this.$post(url);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param) {
        const url = baseUrl + `/sAdvertising/update`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 批量数组
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids) {
        const url = baseUrl + `/sAdvertising/deleteBatch`;
        const data = await this.$post(url, ids);
        return data;
    }

    /**
     * 查询详情
     * @returns 
     */
    static async detail(id) {
        const url = baseUrl + `/sAdvertising/detail/` + id;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 更新展示时间
     * @returns 
     */
    static async updateShowTime(time) {
        const url = baseUrl + `/sAdvertising/updateShowTime/` + time;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 查询展示广告详情
     * @returns 
     */
    static async getShowAdv() {
        const url = baseUrl + `/sAdvertising/getShowAdv`;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 查询轮播时间最大值
     * @returns 
     */
    static async getMaxShowTime() {
        const url = baseUrl + `/sAdvertising/getMaxShowTime`;
        const data = await this.$get(url);
        return data;
    }
}