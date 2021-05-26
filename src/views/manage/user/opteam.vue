<template>
  <div class="siemensLayoutCon">
    <div class="siemensLayoutSearchBox" :class="{ collspaseForm: collapse }">
      <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
        <el-form-item label="姓名：" class="treeFormItem">
          <el-input v-model="params.userName" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="单位：" class="treeFormItem">
          <el-input v-model="params.operatorOrgName" placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" class="treeFormItem">
          <el-input v-model="params.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" class="treeFormItem">
          <el-input v-model="params.email" placeholder="请输入电子邮箱"></el-input>
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
          <el-button type="primary" class="fullBtn" @click="onAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
          <el-button type="primary" class="fullBtn" @click="isDialog = true"><i class="iconfont icon-shanchu"></i>删除
          </el-button>
          <el-button type="primary" class="fullBtn" @click="suspendBatch"><i class="iconfont icon-zanting"></i>暂停
          </el-button>
          <el-button type="primary" class="fullBtn" @click="recoverBatch"><i
              class="iconfont icon-runtongyiyaoyihuifu_biyan"></i>恢复</el-button>
        </div>
      </div>
      <div class="siemensLayoutResultCon">
        <el-table border stripe :key="index" :data="tableData" height="100%" style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" :width="width">
          </el-table-column>
          <el-table-column label="序号" align="center" type="index" :width="width">
          </el-table-column>
          <el-table-column align="center" prop="userName" label="姓名">
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号码">
          </el-table-column>
          <el-table-column align="center" prop="userRoleName" label="职务/角色">
          </el-table-column>
          <el-table-column align="center" prop="email" label="电子邮箱">
          </el-table-column>
          <el-table-column align="center" prop="operatorOrgName" label="单 位">
          </el-table-column>
          <el-table-column align="center" prop="operatorCustomerName" label="运维客户">
          </el-table-column>
          <el-table-column align="center" prop="status" :formatter="$typeFormatter" label="状 态">
          </el-table-column>
          <el-table-column align="center" label="操 作">
            <template slot-scope="scope">
              <div class="tableOper">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="iconfont icon-bianji" @click="onEdit(scope.row)"></i>
                </el-tooltip>

                <el-tooltip class="item" effect="dark" content="重置密码" placement="top">
                  <i class="iconfont icon-ic_keyboard" @click="onPassword(scope.row.mobile)"></i>
                </el-tooltip>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Page :total="totalElements" :pageSize="pageSize" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
    </div>
    <el-dialog top="0" :title="title" :show-close="false" :visible.sync="dialogVisible" @close="$resetForm('ruleForm')">
      <div class="close iconfont icon-guanbi" @click="dialogVisible = false"></div>
      <div class="dialogdiv">
        <el-form :model="ruleForm" label-position="left" :rules="rules" ref="ruleForm" class="registerForm"
          :label-width="labelWidth">
          <el-form-item label="姓　　名:" prop="userName">
            <el-input type="text" v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="职务/角色:" prop="userRoleId">
            <el-select v-model="ruleForm.userRoleId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in sRoleSelectData" :key="item.id" :label="item.roleName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="email">
            <el-input type="text" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="运维单位:" prop="operatorOrgId">
            <el-select v-model="ruleForm.operatorOrgId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in sOperatorOrgSelectData" :key="item.id" :label="item.operatorOrgName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="园区名称:" prop="operatorCustomerId">
            <el-select v-model="ruleForm.operatorCustomerId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in sOperatorCustomerSelectData" :key="item.id" :label="item.customerName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状　　态:" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">启 用</el-radio>
              <el-radio label="0">禁 用</el-radio>
            </el-radio-group>
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
    <el-dialog top="0" title="重置密码" :show-close="false" :visible.sync="dialogPassword" @close="$resetForm('ruleForm1')">
      <div class="close iconfont icon-guanbi" @click="dialogPassword = false"></div>
      <div class="dialogdiv">
        <el-form :model="ruleForm1" label-position="left" :rules="rules1" ref="ruleForm1" class="registerForm"
          :label-width="labelWidth1">
          <el-form-item label="新密码:" prop="password">
            <el-input type="password" v-model="ruleForm1.password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码:" prop="password1">
            <el-input type="password" v-model="ruleForm1.password1"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogbuttom">
        <div @click="resetForm1()">取 消</div>
        <div class="dialogbuttomclose" @click="submitForm1('ruleForm1')">
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
import SOperationUnit from "@/api/sms/sOperationUnit";
import SCustomer from "@/api/sms/sCustomer";
import Login from "@/api/ums/login.js";
import JsEncrypt from "jsencrypt";
import Rules from "@/utils/rule.js";
import SUser from "@/api/ums/sUser";
import SRole from "@/api/ums/sRole";
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
      dialogPassword: false,
      isDialog: false,
      dialogVisible: false,
      title: "新建运维团队信息",
      index: 0,
      labelWidth: "88px",
      labelWidth1: "96px",
      isEdit: false,
      editIndex: null,
      /* 下拉框数据 */
      // 1、单位下拉框
      sOperatorOrgSelectData: [],
      // 2、客户下拉框
      sOperatorCustomerSelectData: [],
      // 3、角色下拉框
      sRoleSelectData: [],
      /* 下拉框参数 */
      // 1、角色下拉框参数
      roleParam: {
        roleType: 2,
      },
      /* dialog表格（新增、修改） */
      // 1、表格数据
      ruleForm: {
        id: null,
        userType: "2", // 2：运维团队用户
        userName: "",
        userRoleId: "",
        mobile: "",
        email: "",
        operatorOrgId: "",
        operatorOrgName: "",
        operatorCustomerId: "",
        operatorCustomerName: "",
        status: "1",
      },
      // 2、表格校验
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        mobile: [
          {
            required: true,
            validator: Rules.FormValidate.Form().validatePhone,
            trigger: "blur",
          },
        ],
        userRoleId: [
          { required: true, message: "请选择职务/角色", trigger: "blur" },
        ],
        email: [
          {
            required: true,
            validator: Rules.FormValidate.Form().validateEmail,
            trigger: "blur",
          },
        ],
        operatorOrgId: [
          { required: true, message: "请选择运维单位", trigger: "change" },
        ],
        operatorCustomerId: [
          { required: true, message: "请选择园区名称", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      ruleForm1: {
        password: "",
        password1: "",
      },
      rules1: {
        password: [
          {
            required: true,
            validator: Rules.FormValidate.Form().validatePsd,
            trigger: "blur",
          },
        ],
        password1: [
          {
            required: true,
            validator: (rule, value, callback) =>
              Rules.FormValidate.Form().validateAgainPsd(
                rule,
                value,
                callback,
                this.ruleForm1.password
              ),
            trigger: "blur",
          },
        ],
      },
      params: {
        userType: "2", // 2：运维团队用户
        userName: "",
        operatorOrgName: "",
        mobile: "",
        email: "",
      },
      currentPage: 1,
      totalElements: 0,
      pageSize: 15,
      width: 50,
      tableData: [],
      tableSelectVal: [],
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
    "ruleForm.operatorOrgId": function (newVal) {
      if (newVal == "") {
        this.ruleForm.operatorOrgName = "";
      } else {
        let item = this.sOperatorOrgSelectData.find(
          (item) => item.id == newVal
        );
        this.ruleForm.operatorOrgName = item.operatorOrgName;
      }
    },
    "ruleForm.operatorCustomerId": function (newVal) {
      if (newVal == "") {
        this.ruleForm.operatorCustomerName = "";
      } else {
        let item = this.sOperatorCustomerSelectData.find(
          (item) => item.id == newVal
        );
        this.ruleForm.operatorCustomerName = item.customerName;
      }
    },
  },
  methods: {
    onPageChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    resetForm1() {
      this.dialogPassword = false;
    },
    onAdd() {
      this.isEdit = false;
      this.title = "新建运维团队信息";
      this.dialogVisible = true;
    },
    onEdit(row) {
      this.isEdit = true;
      this.title = "编辑运维团队信息";
      this.$copyBean(row, this.ruleForm);
      this.dialogVisible = true;
    },
    onPassword(mobile) {
      this.ruleForm1["mobile"] = mobile;
      this.dialogPassword = true;
    },
    async submitForm(formName) {
      let valid = await this.$refs[formName].validate();
      let res = null;
      if (valid) {
        if (this.isEdit) {
          res = await SUser.update(this.ruleForm);
        } else {
          res = await SUser.add(this.ruleForm);
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
    async submitForm1(formName) {
      let valid = await this.$refs[formName].validate();
      if (valid) {
        let pk = await Login.getPublicKey(this.ruleForm1.mobile);
        let publicKey = pk.data;
        let jse = new JsEncrypt();
        jse.setPublicKey(
          `-----BEGIN PUBLIC KEY-----${publicKey}-----END PUBLIC KEY-----`
        );
        let encrypted = jse.encrypt(this.ruleForm1.password);
        let res = await Login.resetPwd(this.ruleForm1.mobile, encrypted, 2);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });

        this.dialogPassword = false;
      } else {
        return false;
      }
    },
    async onConfirm() {
      let ids = this.tableSelectVal.map((item) => item.id) || [];
      if (ids.length == 0) {
        return false;
      }
      let res = await SUser.deleteBatch(ids);
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
      if (document.body.clientWidth > 1664) {
        this.labelWidth = "88px";
        this.labelWidth1 = "96px";
      } else {
        this.labelWidth = "68px";
        this.labelWidth1 = "68px";
      }
    },
    async getTableData() {
      let params = this.$deepCopy(this.params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      let res = await SUser.page(params);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    async suspendBatch() {
      let ids = this.tableSelectVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SUser.suspendBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
      }
    },
    async recoverBatch() {
      let ids = this.tableSelectVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SUser.recoverBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
      }
    },
    /* 下拉框 */
    //
    async getOperatorOrgSelectData() {
      let res = await SOperationUnit.list();
      this.sOperatorOrgSelectData = res.data;
    },
    async getCustomerSelectData() {
      let res = await SCustomer.getAllCustomer();
      this.sOperatorCustomerSelectData = res.data;
    },
    async getRoleSelectData() {
      let res = await SRole.list(this.roleParam);
      this.sRoleSelectData = res.data;
    },
  },
  mounted() {
    let self = this;
    this.resizeFn();
    window.addEventListener("resize", function () {
      self.resizeFn();
    });
    // 获取运维单位下拉框数据
    this.getOperatorOrgSelectData();
    // 获取园区下拉框数据
    this.getCustomerSelectData();
    // 获取角色下拉框数据
    this.getRoleSelectData();
    // 获取表格数据
    this.getTableData();
  },
};
</script>
<style scoped>
@media screen and (min-width: 1665px) {
  .siemensLayoutSearchBoxForm /deep/ .el-form-item {
    margin-right: 30px;
  }
}

@media screen and (max-width: 1664px) {
  .siemensLayoutSearchBoxForm /deep/ .el-form-item {
    margin-right: 20px;
  }
}
</style>
