import BaseApi from '@/api/request/baseApi.js'


/**
 * 数据字典api接口
 */
export default class sDic extends BaseApi {
    /**
     * 查询所有
     * @param {查询参数} param 
     * @returns 
     */
    static async list(param){
        const url = `/ums/sDic/list`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 新增
     * @param {新增实体参数} param 
     * @returns 
     */
    static async add(param){
        const url = `/ums/sDic/add`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 删除
     * @param {实体id} id 
     * @returns 
     */
    static async delete(id){
        const url = `/ums/sDic/delete/${id}`;
        const data = await this.$post(url);
        return data;
    }

    /**
     * 更新
     * @param {更新实体参数} param 
     * @returns 
     */
    static async update(param){
        const url = `/ums/sDic/add`;
        const data = await this.$post(url,param);
        return data;
    }

    /**
     * 批量删除
     * @param {批量删除实体ids-数组}} ids 
     * @returns 
     */
    static async deleteBatch(ids){
        const url = `/ums/sDic/deleteBatch`;
        const data = await this.$post(url,ids);
        return data;
    } 

    /**
     * 获取省市区
     * @returns 
     */
     static async getPCA(){
        const url = `/ums/sDic/getPCA`;
        const data = await this.$get(url);
        return data;
    }

    /**
     * 获取字典大分类
     * @returns 
     */
         static async getTypes(){
            const url = `/ums/sDic/types`;
            const data = await this.$get(url);
            return data;
        }
}