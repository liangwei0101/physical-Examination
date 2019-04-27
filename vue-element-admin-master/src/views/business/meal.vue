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
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">展示</el-button>
          <el-button size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
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
          prop="money"
          :rules="[{ required: true, message: '套餐金额不能为空' }]"
        >
          <el-col>
            <el-input
              v-model.number="addNumberValidateForm.money"
              type="money"
              autocomplete="off"
            />
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-transfer
            :titles="title"
            v-model="projectDataSelected"
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

    <el-dialog title="体检项目" :visible.sync="updateDialogFormVisible">
      <border v-for="item in projectDataShowList" :key="item.id">
        <el-tag type="success" style="margin-right:10px">{{item.name}}</el-tag>
      </border>
    </el-dialog>
  </div>
</template>

<script>
import { ProjectQryAction } from "@/api/project";
import {
  getMeal,
  addMeal,
  updateMeal,
  deleteMeal,
  addMealProject,
  getMealProject,
  deleteMealProject
} from "@/api/meal";
export default {
  data() {
    return {
      title: ["全部", "套餐"],
      projectDataList: [],
      projectDataSelected: [],
      projectDataShowList: [],
      dataList: [],
      value: [1, 4],
      tableData: [],
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      addNumberValidateForm: {
        name: "",
        money: 100
      },
      updateNumberValidateForm: {
        name: "",
        money: 100
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
          let obj = { label: element.name, key: element.id };
          data.push(obj);
        });
        this.projectDataList = data;
      });
    },
    mealQryAction() {
      getMeal().then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      getMealProject(row.id).then(res=>{
        console.log(res.data)
        this.projectDataShowList = res.data
        this.updateDialogFormVisible = true
     })
    },
    handleDelete(index, row){
      let params = {'id': row.id, 'mealId': '', 'projectId': '' }
      deleteMealProject(params).then(res=>{
        this.$message({
                message: "操作成功",
                type: "success"
              });
        this.mealQryAction()
      })
    },
    handleCreate() {
      this.addDialogFormVisible = true;
      this.projectQry();
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addMeal(this.addNumberValidateForm).then(res => {
            let mealProjectList = [];
            this.projectDataSelected.forEach(element => {
              let mealProjectObj = {
                id: "",
                projectId: element,
                mealId: res.data.id
              };
              mealProjectList.push(mealProjectObj);
            });

            addMealProject(mealProjectList).then(res => {
              this.mealQryAction();
              this.addDialogFormVisible = false;
              this.$message({
                message: "操作成功",
                type: "success"
              });
            });
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
