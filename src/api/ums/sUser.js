import BaseApi from '@/api/request/baseApi.js'


/**
 * 客户api接口
 */
export default class sUser extends BaseApi {
    /**
     * 分页查询
     * @param {查询参数} param 
     * @returns 
     */
    static async list(param) {
        const url = `/ums/users/page`;
        const data = await this.$post(url, param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
     static async add(param){
        const url = `/ums/users/add`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
     static async update(param){
        const url = `/ums/users/update`;
        const data = await this.$post(url,param);
        return data;
    }

        /**
     * 批量删除
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
         static async deleteBatch(ids){
            const url = `/ums/users/deleteBatch`;
            const data = await this.$post(url,ids);
            return data;
        }

        /**
     * 批量暂停
     * @param {批量暂停实体ids-数组} ids 
     * @returns 
     */
    static async suspendBatch(ids){
        const url = `/ums/users/suspendBatch`;
        const data = await this.$post(url,ids);
        return data;
    }

      /**
     * 批量恢复
     * @param {批量恢复实体ids-数组}} ids 
     * @returns 
     */
       static async recoverBatch(ids){
        const url = `/ums/users/recoverBatch`;
        const data = await this.$post(url,ids);
        return data;
    }


}