<template>
  <div class="siemensLayoutCon">
    <div class="siemensLayoutSearchBox" :class="{ collspaseForm: collapse }">
      <el-form
        :inline="true"
        :model="params"
        class="siemensLayoutSearchBoxForm flexBetween"
      >
        <el-form-item label="运维单位名称：" class="treeFormItem">
          <el-input
            v-model="params.operatorOrgName"
            placeholder="请输入客户名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系人：" class="treeFormItem">
          <el-input
            v-model="params.contactUserName"
            placeholder="请输入联系人"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="fullBtn" @click="getTableData"
            ><i class="iconfont icon-sousuo"></i>查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="siemensLayoutResultBox whiteBg">
      <div class="siemensLayoutResultTitle flexBetween">
        <span>查询结果</span>
        <div class="flexCenter">
          <el-button type="primary" class="fullBtn" @click="onAdd"
            ><i class="iconfont icon-xinjian"></i>新建</el-button
          >
          <el-button type="primary" class="fullBtn" @click="isDialog = true"
            ><i class="iconfont icon-shanchu"></i>删除
          </el-button>
        </div>
      </div>
      <div class="siemensLayoutResultCon">
        <el-table
          border
          stripe
          :key="index"
          :data="tableData"
          height="100%"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" :width="width">
          </el-table-column>
          <el-table-column
            label="序号"
            align="center"
            type="index"
            :width="width"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="operatorOrgName"
            label="运维单位名称"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="operatorOrgCode"
            label="运维单位编号"
          >
          </el-table-column>
          <el-table-column align="center" prop="contactUserName" label="联系人">
          </el-table-column>
          <el-table-column
            align="center"
            prop="contactUserMobile"
            label="手机号码"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="contactUserEmail"
            label="电子邮箱"
          >
          </el-table-column>
          <el-table-column align="center" prop="versionInfo" label="版本">
          </el-table-column>
          <el-table-column align="center" label="操 作">
            <template slot-scope="scope">
              <div class="tableOper">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="编辑"
                  placement="top"
                >
                  <i
                    class="iconfont icon-bianji"
                    @click="onEdit(scope.row, scope.$index)"
                  ></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Page
        :total="totalElements"
        :pageSize="pageSize"
        :currentPage="currentPage"
        @onPageChange="onPageChange"
      ></Page>
    </div>
    <el-dialog
      top="0"
      :title="title"
      :show-close="false"
      :visible.sync="dialogVisible"
      @close="$resetForm('ruleForm')"
    >
      <div
        class="close iconfont icon-guanbi"
        @click="dialogVisible = false"
      ></div>
      <div class="dialogdiv">
        <el-form
          :model="ruleForm"
          label-position="left"
          :rules="rules"
          ref="ruleForm"
          class="registerForm"
          :label-width="labelWidth"
        >
          <el-form-item label="运维单位名称:" prop="operatorOrgName">
            <el-input type="text" v-model="ruleForm.operatorOrgName"></el-input>
          </el-form-item>
          <el-form-item label="运维单位编号:" prop="operatorOrgCode">
            <el-input type="text" v-model="ruleForm.operatorOrgCode"></el-input>
          </el-form-item>
          <el-form-item label="联系　人:" prop="contactUserName">
            <el-input v-model="ruleForm.contactUserName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="contactUserMobile">
            <el-input v-model="ruleForm.contactUserMobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="contactUserEmail">
            <el-input v-model="ruleForm.contactUserEmail"></el-input>
          </el-form-item>
          <el-form-item label="版本:" prop="versionCode">
            <el-select v-model="ruleForm.versionCode" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in versionSelectData" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogbuttom">
        <div @click="dialogVisible = false">取 消</div>
        <div class="dialogbuttomclose" @click="submitForm('ruleForm')">
          保 存
        </div>
      </div>
    </el-dialog>
    <Tips
      :isDialog="isDialog"
      @onClose="isDialog = false"
      @onConfirm="onConfirm"
    ></Tips>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Page from "@/components/ftd-page/page";
import Tips from "@/components/ftd-tips/tips";
import SOperationUnit from "@/api/sms/sOperationUnit";
import SDic from "@/api/sms/sDic";
import Rules from "@/utils/rule.js";
export default {
  computed: {
    ...mapGetters({
      collapse: "collapse",
    }),
  },
  components: {
    Page,
    Tips,
  },
  data() {
    return {
      isDialog: false,
      labelWidth: "112px",
      dialogVisible: false,
      title: "新建运维单位信息",
      index: 0,
      params: {
        operatorOrgName: "",
        contactUserName: "",
      },
      roleList: [],
      isEdit: false,
      ruleForm: {
        id: null,
        versionCode: null,
        operatorOrgName: "",
        operatorOrgCode: null,
        contactUserName: "",
        contactUserMobile: "",
        contactUserEmail: "",
      },
      rules: {
        operatorOrgName: [
          { required: true, message: "请输入运维单位名称", trigger: "blur" },
        ],
        // operatorOrgCode: [
        //   { required: true, message: "请输入运维单位编号", trigger: "blur" },
        // ],
        contactUserName: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        contactUserMobile: [
          {
            required: true,
            validator: Rules.FormValidate.Form().validatePhone,
            trigger: "blur",
          },
        ],
        contactUserEmail: [
          {
            required: true,
            validator: Rules.FormValidate.Form().validateEmail,
            trigger: "blur",
          },
        ],
        versionCode: [
          { required: true, message: "请选择版本", trigger: "change" },
        ],
      },
      currentPage: 1,
      totalElements: 0,
      pageSize: 15,
      width: 50,
      tableData: [],
      tableSelectVal: [],
      /* 下拉框数据 */
      // 1、版本下拉框
      versionSelectData: [],
    };
  },
  watch: {
    collapse(newVal) {
      if (!newVal) {
        if (document.body.clientWidth > 1664) {
          this.width = 50;
        } else {
          this.width = 35;
        }
      } else {
        if (document.body.clientWidth > 1664) {
          this.width = 60;
        } else {
          this.width = 40;
        }
      }
      if (document.body.clientWidth > 1664) {
        this.labelWidth = "112px";
      } else {
        this.labelWidth = "75px";
      }
    },
  },
  methods: {
    onPageChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    onAdd() {
      this.isEdit = false;
      this.title = "新建运维单位信息";
      this.dialogVisible = true;
    },
    onEdit(row, index) {
      this.isEdit = true;
      this.title = "编辑运维单位信息";
      this.$copyBean(row, this.ruleForm);
      this.dialogVisible = true;
    },
    async submitForm(formName) {
      let valid = await this.$refs[formName].validate();
      let res = null;
      if (valid) {
        if (this.isEdit) {
          res = await SOperationUnit.update(this.ruleForm);
        } else {
          res = await SOperationUnit.add(this.ruleForm);
        }
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        if (res.code != 200) {
        } else {
          this.dialogVisible = false;
          this.getTableData();
        }
      } else {
        return false;
      }
    },
    async onConfirm() {
      let ids = this.tableSelectVal.map((item) => item.id) || [];
      if (ids.length == 0) {
        return false;
      }
      let res = await SOperationUnit.deleteBatch(ids);

      this.$message({
        message: res.msg,
        type: res.code == 200 ? "success" : "error",
      });
      this.getTableData();
      this.isDialog = false;
    },
    handleSelectionChange(val) {
      this.tableSelectVal = val;
    },
    resizeFn() {
      if (!this.collapse) {
        if (document.body.clientWidth > 1664) {
          this.width = 50;
        } else {
          this.width = 35;
        }
      } else {
        if (document.body.clientWidth > 1664) {
          this.width = 60;
        } else {
          this.width = 40;
        }
      }
    },
    // 分页查询表格数据
    async getTableData() {
      // 查询参数
      let params = this.$deepCopy(this.params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      // 表格数据
      let res = await SOperationUnit.page(params);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    // 查询版本下拉框数据
    async getVersionSelectData() {
      let res = await SDic.list({ dicType: "version" });
      this.versionSelectData = res.data;
    },
  },
  mounted() {
    let self = this;
    this.resizeFn();
    window.addEventListener("resize", function () {
      self.resizeFn();
    });
    this.getTableData();
    this.getVersionSelectData();
  },
};
</script>
<style scoped>
/* @media screen and (min-width: 1665px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 548px;
    }

}


@media screen and (max-width: 1664px) {

    .treeFormItem /deep/ .el-form-item__content {
        width: 365px;
    }

} */
</style>
