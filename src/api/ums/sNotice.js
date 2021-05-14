import BaseApi from '@/api/request/baseApi.js'


/**
 * 发布信息api接口
 */
export default class sNotice extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async list(param) {
        const url = `/ums/sNotice/list`;
        const data = await this.$get(url, param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param) {
        const url = `/ums/sNotice/add`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 删除
     * @param {实体id} id 
     * @returns 
     */
    static async delete(id) {
        const url = `/ums/sNotice/delete/${id}`;
        const data = await this.$post(url);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param) {
        const url = `/ums/sNotice/add`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 批量数组
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids) {
        const url = `/ums/sNotice/deleteBatch`;
        const data = await this.$post(url, ids);
        return data;
    }

    /**
     * 查询登录用户的信息
     * @returns 
     */
    static async loginPage() {
        const url = `/ums/sNotice/loginPage`;
        const data = await this.$get(url);
        return data;
    }

}