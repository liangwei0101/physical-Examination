<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :offset="21">
        <el-button
          class="filter-item"
          style="margin-left: 10px;"
          type="primary"
          @click="handleCreate"
        >
          增加
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%;margin-top: 15px;">
      <el-table-column prop="id" label="编号" width="350" />
      <el-table-column prop="name" label="套餐名称" />
      <el-table-column prop="money" label="套餐金额" width="200" />
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加" :visible.sync="addDialogFormVisible">
      <el-form
        ref="addNumberValidateForm"
        :model="addNumberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="套餐名称"
          prop="name"
          :rules="[{ required: true, message: '套餐名称不能为空' }]"
        >
          <el-col>
            <el-input
              v-model.number="addNumberValidateForm.name"
              type="name"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>
        <el-form-item
          label="套餐金额"
          prop="address"
          :rules="[{ required: true, message: '套餐金额不能为空' }]"
        >
          <el-col>
            <el-input
              v-model.number="addNumberValidateForm.address"
              type="address"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-transfer
            :titles="title"
            v-model="value"
            :data="projectDataList"
          ></el-transfer>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="addSubmitForm('addNumberValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('addNumberValidateForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="updateDialogFormVisible">
      <el-form
        ref="updateNumberValidateForm"
        :model="updateNumberValidateForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item
          label="分院名称"
          prop="name"
          :rules="[{ required: true, message: '分院名称不能为空' }]"
        >
          <el-col>
            <el-input
              v-model.number="updateNumberValidateForm.name"
              type="name"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          label="分院地址"
          prop="address"
          :rules="[{ required: true, message: '分院地址不能为空' }]"
        >
          <el-col>
            <el-input
              v-model.number="updateNumberValidateForm.address"
              type="address"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-transfer v-model="value" :data="data"></el-transfer>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="updateSubmitForm('updateNumberValidateForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('updateNumberValidateForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { ProjectQryAction } from "@/api/project";
import { getMeal, addMeal, updateMeal, deleteMeal } from "@/api/meal";
export default {
  data() {
    return {
      title: ["全部", "套餐"],
      projectDataList: [],
      dataList: [],
      value: [1, 4],
      tableData: [],
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      addNumberValidateForm: {
        branchNo: "0",
        name: "",
        address: "",
        subscribeMaxCount: 5
      },
      updateNumberValidateForm: {
        branchNo: "",
        name: "",
        address: "",
        subscribeMaxCount: 5
      }
    };
  },
  mounted() {
    this.mealQryAction();
  },
  methods: {
    projectQry() {
      ProjectQryAction().then(res => {
        const data = [];
        res.data.forEach(element => {
          let obj = {label: element.name, key: element.id};
          console.log("--------")
          console.log(obj)
          data.push(obj)
        });
        this.projectDataList = data
      });
    },
    mealQryAction() {
      getMeal().then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.updateNumberValidateForm = row;
      this.updateDialogFormVisible = true;
    },
    handleCreate() {
      this.addDialogFormVisible = true;
      this.projectQry();
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addBranch(this.addNumberValidateForm).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.mealQryAction();
            this.addDialogFormVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    updateSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateMeal(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.mealQryAction();
            this.updateDialogFormVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
