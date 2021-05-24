<template>
  <div class="siemensLayoutCon">
    <div class="siemensLayoutSearchBox" :class="{'collspaseForm' : collapse}">
      <el-form :inline="true" :model="params" class="siemensLayoutSearchBoxForm flexBetween">
        <el-form-item label="用户名：" class="treeFormItem">
          <el-input v-model="params.userName" placeholder="请输入用户名"></el-input>
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
          <el-button type="primary" @click="OnAdd"><i class="iconfont icon-xinjian"></i>新建</el-button>
          <el-button type="primary" @click="isDialog=true"><i class="iconfont icon-shanchu"></i>删除</el-button>
          <el-button type="primary" @click="suspendBatch"><i class="iconfont icon-zanting"></i>暂停</el-button>
          <el-button type="primary" @click="recoverBatch"><i class="iconfont icon-runtongyiyaoyihuifu_biyan"></i>恢复
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
          <el-table-column align="center" prop="userCode" label="用户编号">
          </el-table-column>
          <el-table-column align="center" prop="userName" label="用户姓名">
          </el-table-column>
          <el-table-column align="center" prop="mobile" label="手机号码">
          </el-table-column>
          <el-table-column align="center" prop="email" label="电子邮箱">
          </el-table-column>
          <el-table-column align="center" prop="customerName" label="所属园区">
          </el-table-column>
          <el-table-column align="center" prop="dicInfo" label="所属角色">
          </el-table-column>
          <el-table-column align="center" prop="status" label="状 态" :formatter="$typeFormatter">
          </el-table-column>
          <el-table-column align="center" label="操 作">
            <template slot-scope="scope">
              <div class="tableOper">
                <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                  <i class="iconfont icon-bianji" @click="onEdit(scope.row,scope.$index)"></i>
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
          <el-form-item label="用户编码:" prop="userCode">
            <el-input type="text" v-model="ruleForm.userCode"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名:" prop="userName">
            <el-input type="text" v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号码:" prop="mobile">
            <el-input v-model="ruleForm.mobile"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱:" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="所属园区:" prop="customerId">
            <el-select v-model="ruleForm.customerId" placeholder="" popper-class="dialogSelect">
              <el-option :value="null" label="无"></el-option>
              <el-option v-for="item in customList" :key="item.id" :label="item.customerName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属角色:" prop="userRole">

            <el-select v-model="ruleForm.userRole" placeholder="" popper-class="dialogSelect">
              <el-option v-for="item in roleList" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状　　态:" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio label="1">启 用</el-radio>
              <el-radio label="0">禁 用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="系统权限:" prop="power" class="requireIcon">
            <div class="systemPowerBox">
              <div class="flexEnd">
                <el-checkbox v-model="ruleForm.watch" @change="handleAllWatch">全部</el-checkbox>
                <el-checkbox v-model="ruleForm.edit" @change="handleAllEdit">全部</el-checkbox>
              </div>
              <el-tree :key="index" :data="data" node-key="id" default-expand-all>
                <span class="customTreeNode" slot-scope="{ node, data }">
                  <span>{{ data.name }}</span>
                  <span v-if="data.children.length == 0" style="display: flex;">
                    <el-checkbox v-model="browsePerm[data.id]" @change="(val)=>handleWatchChange(val,data,node)">浏览
                    </el-checkbox>
                    <el-checkbox v-model="editPerm[data.id]" @change="(val)=>handleEditChange(val,data)">编辑
                    </el-checkbox>
                  </span>
                </span>
              </el-tree>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialogbuttom">
        <div @click="dialogVisible = false">取 消</div>
        <div class="dialogbuttomclose" @click="submitForm('ruleForm')">保 存</div>
      </div>
    </el-dialog>
    <el-dialog top="0" title="重置密码" :show-close="false" :visible.sync="dialogPassword">
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
import SUser from "@/api/ums/sUser";
import SCustomer from "@/api/ums/sCustomer.js";
import Login from "@/api/ums/login.js";
import JsEncrypt from "jsencrypt";
import SDic from "@/api/ums/sDic.js";
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
        callback(new Error("新密码不一致，请重新输入!"));
      } else {
        callback();
      }
    };
    return {
      dialogPassword: false,
      isDialog: false,
      dialogVisible: false,
      title: "新建人员信息",
      index: 0,
      labelWidth: "84px",
      labelWidth1: "96px",
      ruleForm1: {
        password: "",
        password1: "",
      },
      rules1: {
        password: [{ validator: validatePass, trigger: "blur" }],
        password1: [{ validator: validatePass2, trigger: "blur" }],
      },
      roleList: [],
      customList: [],
      isEdit: false,
      editIndex: null,
      params: {
        userName: "",
        mobile: "",
        email: "",
      },
      ruleForm: {
        id: null,
        userCode: "",
        userName: "",
        mobile: "",
        email: "",
        customerId: "",
        userRole: "",
        status: "1",
        watch: false,
        edit: false,
        power: "",
        userMenuList: [],
      },
      rules: {
        userCode: [
          { required: true, message: "请输入用户编码", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
        ],
        mobile: [
          {  required: true, validator: Rules.FormValidate.Form().validatePhone, trigger: "blur" },
        ],
        email: [{ required: true, validator: Rules.FormValidate.Form().validateEmail, trigger: "blur" }],
        //   customerId: [
        //    { required: true, message: '请选择所属园区', trigger: 'change' },
        //   ],
        //   userRole: [
        //     { required: true, message: '请选择所属角色', trigger: 'change' }
        //   ],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
      currentPage: 1,
      totalElements: 0,
      pageSize: 15,
      width: 50,
      data: [],
      tableData: [],
      tableSeelctVal: [],
      isSelectWatch: false,
      isSelectEdiot: false,
      browsePerm: {},
      editPerm: {},
      menuPerm: {},
      allCheckBoxIds: [],
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
    onSuspend() {
      console.log("点击暂停按钮");
    },
    onRecover() {
      console.log("点击恢复按钮");
    },
    onPageChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    resetForm1() {
      this.dialogPassword = false;
    },
    onPassword(mobile) {
      this.ruleForm1["mobile"] = mobile;
      this.dialogPassword = true;
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
        let res = await Login.resetPwd(this.ruleForm1.mobile, encrypted, 1);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });

        this.dialogPassword = false;
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    async getAllCustomer() {
      let res = await SCustomer.getAllCustomer();
      this.customList = res.data;
    },
    async onConfirm() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      let res = await SUser.deleteBatch(ids);
      this.$message({
        message: res.msg,
        type: res.code == 200 ? "success" : "error",
      });
      this.getTableData();
      this.isDialog = false;
    },
    OnAdd() {
      this.permInit();
      this.isEdit = false;
      this.title = "新建人员信息";
      this.dialogVisible = true;
    },
    onEdit(row, index) {
      this.permInit();
      this.isEdit = true;
      this.title = "编辑人员信息";
      this.$copyBean(row, this.ruleForm);
      this.ruleForm.id = row.id;
      this.getPermission(row.id);
      this.dialogVisible = true;
    },
    async submitForm(formName) {
      for (let i in this.menuPerm) {
        if (
          this.menuPerm[i]["browsePermissions"] ||
          this.menuPerm[i]["editPermissions"]
        ) {
          this.ruleForm.userMenuList.push({
            userId: this.ruleForm.id,
            menuId: i,
            browsePermissions: this.menuPerm[i]["browsePermissions"] ? 1 : 0,
            editPermissions: this.menuPerm[i]["editPermissions"] ? 1 : 0,
          });
        }
      }
      let valid = await this.$refs[formName].validate();
      let res = null;
      if (valid) {
        if (this.isEdit) {
          // 编辑
          res = await SUser.update(this.ruleForm);
        } else {
          // 新建
          res = await SUser.add(this.ruleForm);
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
    //  recursion(data, id) {
    //     let result;
    //     if (!data) {
    //       return;
    //     }
    //     for (var i = 0; i < data.length; i++) {
    //       let item = data[i];
    //       if (item.id === id) {
    //         result = item;
    //         break;
    //       } else if (item.children && item.children.length > 0) {
    //         result = this.recursion(item.children, id);
    //       }
    //     }
    //     console.log(result);
    //     return result;
    //   },
    recursion(treeData) {
      for (let i = 0; i < treeData.length; i++) {
        if (treeData[i].children.length > 0) {
          this.recursion(treeData[i].children);
        } else {
          this.allCheckBoxIds.push(treeData[i].id);
        }
      }
    },
    handleAllWatch(val) {
      for (let i = 0; i < this.allCheckBoxIds.length; i++) {
        this.$set(this.browsePerm, this.allCheckBoxIds[i], val);
        if(!this.menuPerm[this.allCheckBoxIds[i]]) {
          this.menuPerm[this.allCheckBoxIds[i]] = new Object();
        }
        this.menuPerm[this.allCheckBoxIds[i]]["browsePermissions"] = val;
      }
    },
    handleAllEdit(val) {
      for (let i = 0; i < this.allCheckBoxIds.length; i++) {
        this.$set(this.editPerm, this.allCheckBoxIds[i], val);
        if(!this.menuPerm[this.allCheckBoxIds[i]]) {
          this.menuPerm[this.allCheckBoxIds[i]] = new Object();
        } 
        this.menuPerm[this.allCheckBoxIds[i]]["editPermissions"] = val;
      }
    },
    handleWatchChange(value, data, node) {
      this.browsePerm[data.id] = value;
      if (!this.menuPerm[data.id]) {
        this.menuPerm[data.id] = new Object();
      }
      this.menuPerm[data.id]["browsePermissions"] = value;
    },
    handleEditChange(value, data) {
      this.editPerm[data.id] = value;
      if (!this.menuPerm[data.id]) {
        this.menuPerm[data.id] = new Object();
      }
      this.menuPerm[data.id]["editPermissions"] = value;
    },

    handleSelectionChange(val) {
      this.tableSeelctVal = val;
    },
    async getTableData() {
      let params = this.$deepCopy(this.params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      let res = await SUser.list(params);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    permInit() {
      for (let i in this.browsePerm) {
        this.$set(this.browsePerm, i, false);
      }
      for (let i in this.editPerm) {
        this.$set(this.editPerm, i, false);
      }
      this.menuPerm = {};
    },
    async menuList() {
      let res = await SUser.menuList();
      this.data = res.data;
      this.recursion(this.data);
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
    async suspendBatch() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SUser.suspendBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
        this.isDialog = false;
      }
    },
    async getRole() {
      let param = { dicType: "role" };
      let res = await SDic.list(param);
      this.roleList = res.data;
    },
    async recoverBatch() {
      let ids = this.tableSeelctVal.map((item) => item.id);
      if (ids.length > 0) {
        let res = await SUser.recoverBatch(ids);
        this.$message({
          message: res.msg,
          type: res.code == 200 ? "success" : "error",
        });
        this.getTableData();
        this.isDialog = false;
      }
    },
    async getPermission(userId) {
      let res = await SUser.getUserMenu(userId);
      let resData = res.data || [];
      for (let i = 0; i < resData.length; i++) {
        this.$set(
          this.browsePerm,
          resData[i].menuId,
          resData[i].browsePermissions == 1 ? true : false
        );
        this.$set(
          this.editPerm,
          resData[i].menuId,
          resData[i].editPermissions == 1 ? true : false
        );
        // this.browsePerm[resData[i].menuId] =
        //   resData[i].browsePermissions == 1 ? true : false;
        // this.editPerm[resData[i].menuId] =
        //   resData[i].editPermissions == 1 ? true : false;
        this.menuPerm[resData[i].menuId] = new Object();
        this.menuPerm[resData[i].menuId]["browsePermissions"] =
          resData[i].browsePermissions == 1 ? true : false;
        this.menuPerm[resData[i].menuId]["editPermissions"] =
          resData[i].editPermissions == 1 ? true : false;
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
    this.menuList();
    this.getRole();
  },
};
</script>

<style scoped>
@media screen and (min-width: 1665px) {
  .systemPowerBox {
    width: 100%;
    height: auto;
    padding: 14px 20px 24px 14px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #becdd7;
  }
  .systemPowerBox /deep/ .el-tree {
    font-size: 16px;
    color: #3c464b;
  }
  .systemPowerBox /deep/ .el-tree-node__expand-icon {
    font-size: 14px;
    color: #009999;
  }
  .systemPowerBox /deep/ .el-tree-node__expand-icon.is-leaf {
    /* display: none; */
    color: #becdd7;
  }
  .systemPowerBox /deep/ .el-tree-node__content {
    height: 35px;
  }
  .systemPowerBox /deep/ .customTreeNode {
    display: flex;
    width: 100%;
    line-height: 35px;
    align-items: baseline;
    justify-content: space-between;
  }
  .systemPowerBox /deep/ .el-tree-node__content:hover,
  .systemPowerBox /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }
  .systemPowerBox /deep/ .el-checkbox {
    margin-right: 30px;
  }
  .systemPowerBox /deep/ .el-checkbox:last-of-type {
    margin-right: 0;
  }
  .flexEnd {
    justify-content: flex-end;
  }
  .systemPowerBox
    /deep/
    .el-tree
    .el-tree-node__children
    .el-tree-node__children
    .el-tree-node__expand-icon.is-leaf {
    color: transparent;
  }
  .requireIcon /deep/ .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
/* 1280*/
@media screen and (max-width: 1664px) {
  .siemensLayoutCon /deep/ .el-dialog__wrapper .el-dialog {
    width: 430px;
  }
  .systemPowerBox {
    width: 100%;
    height: auto;
    padding: 10px 14px 15px 10px;
    background: #ffffff;
    border-radius: 3px;
    border: 1px solid #becdd7;
  }
  .systemPowerBox /deep/ .el-tree {
    font-size: 12px;
    color: #3c464b;
  }
  .systemPowerBox /deep/ .el-tree-node__expand-icon {
    font-size: 12px;
    color: #009999;
  }
  .systemPowerBox /deep/ .el-tree-node__expand-icon.is-leaf {
    /* display: none; */
    padding: 3px;
    color: #becdd7;
  }
  .systemPowerBox /deep/ .el-tree-node__content {
    height: 24px;
  }
  .systemPowerBox /deep/ .customTreeNode {
    display: flex;
    width: 100%;
    line-height: 24px;
    align-items: baseline;
    justify-content: space-between;
  }
  .systemPowerBox /deep/ .el-tree-node__content:hover,
  .systemPowerBox /deep/ .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
  }
  .systemPowerBox /deep/ .el-checkbox {
    margin-right: 20px;
  }
  .systemPowerBox /deep/ .el-checkbox:last-of-type {
    margin-right: 0;
  }
  .flexEnd {
    justify-content: flex-end;
  }
  .systemPowerBox
    /deep/
    .el-tree
    .el-tree-node__children
    .el-tree-node__children
    .el-tree-node__expand-icon.is-leaf {
    color: transparent;
  }
  .requireIcon /deep/ .el-form-item__label::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
</style>
