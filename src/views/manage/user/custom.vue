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
          <el-table-column align="center" prop="operationsId" label="所属运维单位">
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
      <Page :total="400" :pageSize="15" :currentPage="currentPage" @onPageChange="onPageChange"></Page>
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
              <el-select v-model="ruleForm.provinceCode" placeholder="" popper-class="dialogSelect" class="SelectYihang"
                @change="selectCity">
                <el-option v-for="item in provinceList" :key="item.id" :label="item.dicInfo" :value="item.dicCode">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.cityCode" placeholder="" popper-class="dialogSelect " class="SelectYihang"
                @change="selectArea">
                <el-option v-for="item in cityList" :key="item.id" :label="item.dicInfo"
                  :value="item.dicCode">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.areaCode" placeholder="" popper-class="dialogSelect " class="SelectYihang"
                @change="selectTown">
                <el-option v-for="item in areaList" :key="item.id" :label="item.dicInfo"
                  :value="item.dicCode">
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
import SCustomer from "@/api/ums/sCustomer.js";
import SDic from "@/api/ums/sDic.js";
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
        parentId: null,
        customerName: "",
        customerCode: "",
        contactUserName: "",
        contactUserMobile: "",
        contactUserEmail: "",
        operationsId: "",
        provinceCode: "",
        cityCode: "",
        areaCode: "",
        address: "",
        provinceName: "",
        cityName: "",
        areaName: "",
      },
      rules: {
        //   a: [
        //     { required: true, message: '请输入上级单位', trigger: 'blur' }
        //   ],
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
          { required: true, message: "请输入手机号码", trigger: "blur" },
        ],
        contactUserEmail: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
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
      editIndex: null,
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
  },
  methods: {
    onPageChange(val) {
      console.log(val);
      this.currentPage = val;
      this.getTableData();
    },
    async selectCity(provinceCode) {
      let item = this.provinceList.find((item) => item.dicCode == provinceCode);
      this.ruleForm.provinceName = item.dicInfo;
      let res = await SDic.list({
        parentCode: provinceCode,
      });
        this.cityList = res.data;
    },
    async selectArea(cityCode) {
      let item = this.cityList.find((item) => item.dicCode == cityCode);
      console.log(item)
      this.ruleForm.cityName = item.dicInfo;
      let res = await SDic.list({
        parentCode: cityCode,
      });
      this.areaList = res.data;
    },
    async selectTown(areaCode) {
      let item = this.areaList.find((item) => item.dicCode == areaCode);
      console.log(item)
      this.ruleForm.areaName = item.dicInfo;
    },
    async OnAdd(ruleForm) {
      let res = await SCustomer.getAllCustomer();
      this.customList = res.data;
      let operation = await SCustomer.getOperationUnit();
      this.operationList = operation.data;
      //获取省
      let province = await SDic.list({
        dicType: "province",
      });
      this.provinceList = province.data;
      this.isEdit = false;
      this.title = "新建客户信息";
      this.dialogVisible = true;
    },
    async onEdit(row, index) {
      this.isEdit = true;
      this.title = "编辑客户信息";
      this.ruleForm = JSON.parse(JSON.stringify(row));
      this.editIndex = index;
      this.dialogVisible = true;
    },
    async submitForm(formName) {
      let valid = await this.$refs[formName].validate();
      if (valid) {
        if (this.isEdit) {
          //    编辑
          console.log(this.ruleForm);
          this.tableData[this.editIndex] = JSON.parse(
            JSON.stringify(this.ruleForm)
          );
          let res = await SCustomer.update(this.ruleForm);
          this.index++;
          console.log(this.tableData);
        } else {
          //    新建
          this.tableData.unshift(JSON.parse(JSON.stringify(this.ruleForm)));
          console.log(this.ruleForm);
          let res = await SCustomer.add(this.ruleForm);
          console.log(res);
          this.$refs.ruleForm.resetFields();
        }
        this.dialogVisible = false;
      } else {
        console.log("error submit!!");
        return false;
      }
    },

    onSearch() {},
   async onConfirm() {
       let ids = this.tableSeelctVal.map((item) => item.id);
            let res = await SCustomer.deleteBatch(ids);
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    async getTableData() {
      let params = this.$deepCopy(this.params);
      console.log(params);
      params["pageIndex"] = this.currentPage;
      params["length"] = this.pageSize;
      let res = await SCustomer.list(params);
      console.log(res);
      this.tableData = res.data.content || [];
      this.totalElements = res.data.totalElements;
    },
    async getAllCustomer() {
      let res = await SCustomer.getAllCustomer();
      console.log(res);
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

