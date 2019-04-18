<template>
  <div class="app-container">
    <div class="demo-input-suffix">
      <el-row :gutter="20">
        <el-col :span="12" :offset="4">
          请输入体检项目名：
          <el-input
            v-model="searchStr"
            placehoyalder="请输入项目名"
            prefix-icon="el-icon-search"
            style="width:250px"
          />
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            @click="search()"
          >查询</el-button>
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            @click="handleCreate"
          >增加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width:100%;margin-top: 15px;">
      <el-table-column prop="id" label="项目编号" width="300"/>
      <el-table-column prop="name" label="体检项目" width="300"/>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加" :visible.sync="addDialogFormVisible">
      <el-form
        ref="addNumberValidateForm"
        :model="addNumberValidateForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="体检名称" prop="name">
          <el-input v-model="addNumberValidateForm.name"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addSubmitForm('addNumberValidateForm')">提交</el-button>
          <el-button @click="resetForm('addNumberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="修改" :visible.sync="updateDialogFormVisible">
      <el-form
        ref="updateNumberValidateForm"
        :model="updateNumberValidateForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="项目编号" prop="id">
          <el-input v-model="updateNumberValidateForm.id"/>
        </el-form-item>
        <el-form-item label="体检名称" prop="name">
          <el-input v-model="updateNumberValidateForm.name"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateSubmitForm('updateNumberValidateForm')">提交</el-button>
          <el-button @click="resetForm('updateNumberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  ProjectQryAction,
  ProjectAddAction,
  ProjectDelAction,
  ProjectUpdateAction
} from "@/api/project.js";
export default {
  data() {
    return {
      updateNumberValidateForm: {
        id: "",
        name: ""
      },
      addNumberValidateForm: {
        id: "",
        name: ""
      },
      rules: {
        name: [{ required: true, message: "输入体检项目", trigger: "blur" }]
      },
      data: [],
      searchStr: "",
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: []
    };
  },
  mounted() {
    this.ProjectQry();
  },
  methods: {
    search() {
      if (this.searchStr.trim() !== "") {
        this.data.forEach(element => {
          if (element.name == this.searchStr) {
            var index = this.data.indexOf(element);
            this.tableData = [];
            this.tableData.push(this.data[index]);
          }
        });
      } else {
        this.tableData = this.data;
      }
    },
    ProjectQry() {
      ProjectQryAction().then(res => {
        this.tableData = res.data;
        this.data = res.data;
      });
    },
    updateSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ProjectUpdateAction(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: "编辑成功",
              type: "success"
            });
            this.ProjectQry(), (this.updateDialogFormVisible = false);
          });
        } else {
          return false;
        }
      });
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ProjectAddAction(this.addNumberValidateForm).then(res => {
            this.$message({
              message: "新增成功",
              type: "success"
            });
            this.ProjectQry(), (this.addDialogFormVisible = false);
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleCreate() {
      this.addDialogFormVisible = true;
    },
    handleEdit(index, row) {
      console.log(row);
      this.updateNumberValidateForm = row;
      console.log(this.updateNumberValidateForm);
      this.updateDialogFormVisible = true;
    },
    handleDelete(row) {
      console.log(row);
      ProjectDelAction(row.id).then(res => {
        this.ProjectQry();
        this.$message({
          message: "删除成功",
          type: "success"
        });
      });
    }
  }
};
</script>
<style>
</style>
