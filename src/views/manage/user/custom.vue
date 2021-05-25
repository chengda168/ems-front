<template>
  <div class="siemensLayoutCon">
    <div class="siemensLayoutSearchBox" :class="{ collspaseForm: collapse }">
      <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
        <el-form-item label="客户名称：" class="treeFormItem">
          <el-input v-model="params.customerName" placeholder="请输入客户名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" class="treeFormItem">
          <el-input v-model="params.contactUserName" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="fullBtn" @click="getTableData"><i class="iconfont icon-sousuo"></i>查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="siemensLayoutResultBox whiteBg">
      <div class="siemensLayoutResultTitle flexBetween">
        <span>查询结果</span>
        <div class="flexCenter">
          <el-button type="primary" class="fullBtn" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
          <el-button type="primary" class="fullBtn" @click="isDialog = true"><i class="iconfont icon-shanchu"></i>删除
          </el-button>
        </div>
      </div>
      <div class="siemensLayoutResultCon">
        <el-table border stripe :key="index" :data="tableData" height="100%" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" :width="width">
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" :width="width">
          </el-table-column>
          <el-table-column align="center" prop="parentName" label="上级单位">
          </el-table-column>
          <el-table-column align="center" prop="customerName" label="客户名称">
          </el-table-column>
          <el-table-column align="center" prop="customerCode" label="客户编号">
          </el-table-column>
          <el-table-column align="center" prop="contactUserName" label="联系人">
          </el-table-column>
          <el-table-column align="center" prop="contactUserMobile" label="手机号码">
          </el-table-column>
          <el-table-column align="center" prop="contactUserEmail" label="电子邮箱">
          </el-table-column>
          <el-table-column align="center" prop="operationsName" label="所属运维单位">
          </el-table-column>
          <el-table-column align="center" prop="h" label="所属地址">
            <template slot-scope="scope">
              {{ scope.row.provinceName }}{{ scope.row.cityName
              }}{{ scope.row.areaName }}{{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操 作">
            <template slot-scope="scope">
              <div class="tableOper">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="iconfont icon-bianji" @click="onEdit(scope.row, scope.$index)"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Page :total="totalElements" :pageSize="pageSize" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
    </div>
    <el-dialog :title="title" :show-close="false" top="0" :visible.sync="dialogVisible" @close="$resetForm('ruleForm')">
      <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
      <div class="dialogdiv">
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm"
          :label-width="labelWidth">
          <el-form-item label="上级单位:" prop="id">
            <el-select v-model="ruleForm.parentId" placeholder="" popper-class="dialogSelect">
              <el-option :value="null" label="无上级单位"></el-option>
              <el-option v-for="item in customList" :key="item.id" :label="item.customerName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="园区名称:" prop="customerName">
            <el-input type="text" v-model="ruleForm.customerName"></el-input>
          </el-form-item>
          <el-form-item label="园区编号:" prop="customerCode">
            <el-input v-model="ruleForm.customerCode"></el-input>
          </el-form-item>
          <el-form-item label="联系   人:" prop="contactUserName">
            <el-input v-model="ruleForm.contactUserName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="contactUserMobile">
            <el-input v-model="ruleForm.contactUserMobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="contactUserEmail">
            <el-input v-model="ruleForm.contactUserEmail"></el-input>
          </el-form-item>
          <el-form-item label="运维单位:" prop="operationsId">
            <el-select v-model="ruleForm.operationsId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in operationList" :key="item.id" :label="item.unitName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="园区地址:" prop="demo">
            <div class="SelectYihang1">
              <el-select v-model="ruleForm.provinceCode" placeholder="" popper-class="dialogSelect"
                class="SelectYihang">
                <el-option v-for="item in provinceList" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.cityCode" placeholder="" popper-class="dialogSelect " class="SelectYihang">
                <el-option v-for="item in cityList" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.areaCode" placeholder="" popper-class="dialogSelect " class="SelectYihang">
                <el-option v-for="item in areaList" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
                </el-option>
              </el-select>
            </div>

            <el-input v-model="ruleForm.address"></el-input>
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
    <Tips :isDialog="isDialog" @onClose="isDialog = false" @onConfirm="onConfirm"></Tips>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Page from "@/components/ftd-page/page";
import Tips from "@/components/ftd-tips/tips";
import SCustomer from "@/api/sms/sCustomer.js";
import SDic from "@/api/sms/sDic.js";
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
      index: 0,
      title: "新建客户信息",
      dialogVisible: false,
      ruleForm: {
        id: null,
        parentId: null,
        customerName: "",
        customerCode: "",
        contactUserName: "",
        contactUserMobile: "",
        contactUserEmail: "",
        operationsId: "",
        provinceCode: null,
        cityCode: null,
        areaCode: null,
        address: "",
        provinceName: "",
        cityName: "",
        areaName: "",
      },
      rules: {
        customerName: [
          { required: true, message: "请输入园区名称", trigger: "blur" },
        ],
        customerCode: [
          { required: true, message: "请输入园区编号", trigger: "blur" },
        ],
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
        g: [{ required: true, message: "请输入运维单位", trigger: "blur" }],
        h: [{ required: true, message: "请输入园区地址", trigger: "blur" }],
      },
      params: {
        customerName: "",
        contactUserName: "",
      },
      currentPage: 1,
      totalElements: 0,
      pageSize: 15,
      width: 50,
      labelWidth: "84px",
      tableData: [],
      isEdit: false,
      tableSeelctVal: [],
      operationList: [],
      customList: [],
      roleList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
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
    },
    "ruleForm.provinceCode": function (newVal) {
      if (newVal == null) {
        this.ruleForm.cityName = "";
        return;
      }
      let item = this.provinceList.find((item) => item.dicCode == newVal);
      this.ruleForm.provinceName = item.dicCode;
      // 下级市
      this.cityList = item.children;
      // 已选市级单位不属于所选省，清空所选市
      if (this.ruleForm.cityCode != null) {
        let cityItem = this.cityList.find(
          (item) => item.dicCode == this.ruleForm.cityCode
        );
        if (!cityItem) {
          this.ruleForm.cityCode = null;
        }
      }
    },
    "ruleForm.cityCode": function (newVal) {
      if (newVal == null) {
        this.ruleForm.cityName = "";
        return;
      }
      let item = this.cityList.find((item) => item.dicCode == newVal);
      // 下级区
      this.ruleForm.cityName = item.dicCode;
      // 已选区级单位不属于所选市，清空所选市
      this.areaList = item.children;
      if (this.ruleForm.areaCode != null) {
        let areaItem = this.areaList.find(
          (item) => item.dicCode == this.ruleForm.areaCode
        );
        if (!areaItem) {
          this.ruleForm.areaCode = null;
        }
      }
    },
    "ruleForm.areaCode": function (newVal) {
      if (newVal == null) {
        this.ruleForm.areaName = "";
        return;
      }
      let item = this.areaList.find((item) => item.dicCode == newVal);
      this.ruleForm.areaName = item.dicInfo;
    },
  },
  methods: {
    onPageChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    async OnAdd() {
      this.isEdit = false;
      this.title = "新建客户信息";
      this.dialogVisible = true;
    },
    async onEdit(row) {
      this.isEdit = true;
      this.title = "编辑客户信息";
      this.$copyBean(row, this.ruleForm);
      this.dialogVisible = true;
    },
    async submitForm(formName) {
      let valid = await this.$refs[formName].validate();
      let res = null;
      if (valid) {
        if (this.isEdit) {
          res = await SCustomer.update(this.ruleForm);
        } else {
          res = await SCustomer.add(this.ruleForm);
        }
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });

        this.dialogVisible = false;
        this.getTableData();
      } else {
        return false;
      }
    },
    async onConfirm() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SCustomer.deleteBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
        this.isDialog = false;
      }
    },
    handleSelectionChange(val) {
      this.tableSeelctVal = val;
    },
    async getTableData() {
      let params = this.$deepCopy(this.params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      let res = await SCustomer.list(params);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    async getAllCustomer() {
      let res = await SCustomer.getAllCustomer();
      this.customList = res.data;
    },
    async getPCA() {
      let res = await SDic.getPCA();
      this.provinceList = res.data;
    },
    async getOperationUnit() {
      let operation = await SCustomer.getOperationUnit();
      this.operationList = operation.data;
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
      if (document.body.clientWidth > 1664) {
        this.labelWidth = "82px";
      } else {
        this.labelWidth = "68px";
      }
    },
  },
  mounted() {
    let self = this;
    this.resizeFn();
    window.addEventListener("resize", function () {
      self.resizeFn();
    });
    this.getTableData();
    this.getAllCustomer();
    this.getPCA();
    this.getOperationUnit();
  },
};
</script>
<style scoped>
.siemensLayoutCon {
  flex: 1;
}

@media screen and (min-width: 1665px) {
  .SelectYihang {
    width: 132px;
  }

  .SelectYihang1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 1664px) {
  .SelectYihang {
    width: 88px;
  }

  .SelectYihang1 {
    display: flex;
    justify-content: space-between;
    margin-bottom: 7px;
  }
}
</style>

