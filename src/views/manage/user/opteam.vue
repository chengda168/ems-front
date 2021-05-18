<template>
  <div class="siemensLayoutCon">
    <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
      <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
        <el-form-item label="姓名：" class="treeFormItem">
          <el-input v-model="params.userName" placeholder="请输入运维单位名称"></el-input>
        </el-form-item>
        <el-form-item label="单位：" class="treeFormItem">
          <el-input v-model="params.unitName" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" class="treeFormItem">
          <el-input v-model="params.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" class="treeFormItem">
          <el-input v-model="params.email" placeholder="请输入电子邮箱"></el-input>
        </el-form-item>
        <el-form-item label="运维客户：" class="treeFormItem">
          <el-input v-model="params.customerName" placeholder="请输入联系人"></el-input>
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
          <el-table-column align="center" prop="job" label="职务/角色">
          </el-table-column>
          <el-table-column align="center" prop="email" label="电子邮箱">
          </el-table-column>
          <el-table-column align="center" prop="unitName" label="单 位">
          </el-table-column>
          <el-table-column align="center" prop="customerName" label="运维客户">
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
          <el-form-item label="职务/角色:" prop="job">
            <el-input v-model="ruleForm.job"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="email">
            <el-input type="text" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="运维单位:" prop="unitId">
            <el-select v-model="ruleForm.unitId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in sOpUnitSelect" :key="item.id" :label="item.unitName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="园区名称:" prop="customerId">
            <el-select v-model="ruleForm.customerId" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in sCustomerSelect" :key="item.id" :label="item.customerName" :value="item.id">
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
        <div class="dialogbuttomclose" @click="submitForm('ruleForm')">保 存</div>
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
        <div class="dialogbuttomclose" @click="submitForm1('ruleForm1')">保 存</div>
      </div>
    </el-dialog>
    <Tips :isDialog="isDialog" @onClose="isDialog = false" @onConfirm="onConfirm"></Tips>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Page from "@/components/ftd-page/page";
import Tips from "@/components/ftd-tips/tips";
import SOperationTeam from "@/api/ums/sOperationTeam";
import SOperationUnit from "@/api/ums/sOperationUnit";
import SCustomer from "@/api/ums/sCustomer";
import Login from "@/api/ums/login.js";
import JsEncrypt from "jsencrypt";
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm1.password1 !== "") {
          this.$refs.ruleForm1.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm1.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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
      sOpUnitSelect: [],
      sCustomerSelect: [],
      ruleForm: {
        id: "",
        userName: "",
        mobile: "",
        job: "",
        email: "",
        unitId: "",
        customerId: "",
        status: "1",
      },
      ruleForm1: {
        password: "",
        password1: "",
      },
      rules1: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        job: [{ required: true, message: "请输入职务/角色", trigger: "blur" }],
        email: [{ required: true, message: "请输入电子邮箱", trigger: "blur" }],
        unitId: [
          { required: true, message: "请选择运维单位", trigger: "change" },
        ],
        customerId: [
          { required: true, message: "请选择园区名称", trigger: "change" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      params: {
        userName: "",
        unitName: "",
        mobile: "",
        email: "",
        customerName: "",
      },
      currentPage: 1,
      totalElements: 0,
      pageSize: 15,
      width: 50,
      tableData: [],
      tableSeelctVal: [],
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
      this.title = "新建人员信息";
      this.dialogVisible = true;
    },
    onEdit(row) {
      this.isEdit = true;
      this.title = "编辑人员信息";
      this.$copyBean(row, this.ruleForm);
      console.log(row);
      console.log(this.ruleForm);
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
          res = await SOperationTeam.update(this.ruleForm);
        } else {
          res = await SOperationTeam.add(this.ruleForm);
        }
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });

        this.dialogVisible = false;
        this.getTableData();
      } else {
        console.log("error submit!!");
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
       console.log(this.ruleForm1.mobile,encrypted);
       let pwdRes = await Login.updateNewPwd(this.ruleForm1.mobile, encrypted);
        console.log(pwdRes);
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    async onConfirm() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      let res = await SOperationTeam.deleteBatch(ids);
      this.$message({
        message: res.msg,
        type: res.code == 200 ? "success" : "error",
      });
      this.getTableData();
      this.isDialog = false;
    },
    handleSelectionChange(val) {
      this.tableSeelctVal = val;
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
      } else {
        this.labelWidth = "68px";
      }
      if (document.body.clientWidth > 1664) {
        this.labelWidth = "96px";
      } else {
        this.labelWidth = "68px";
      }
    },
    async getOpunitSelectData() {
      let res = await SOperationUnit.list();
      this.sOpUnitSelect = res.data;
    },
    async getCustomerSelectData() {
      let res = await SCustomer.getAllCustomer();
      this.sCustomerSelect = res.data;
    },
    async getTableData() {
      let params = this.$deepCopy(this.params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      console.log(params);
      let res = await SOperationTeam.page(params);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    async suspendBatch() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SOperationTeam.suspendBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
      }
    },
    async recoverBatch() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SOperationTeam.recoverBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
      }
    },
  },
  mounted() {
    let self = this;
    this.resizeFn();
    window.addEventListener("resize", function () {
      self.resizeFn();
    });
    // 获取运维单位下拉框数据
    this.getOpunitSelectData();
    // 获取园区下拉框数据
    this.getCustomerSelectData();
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
