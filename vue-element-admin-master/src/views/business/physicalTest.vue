<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="活动性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="身高：">
        <el-input v-model="input" placeholder="请输入身高" style="width:350px"></el-input>
        <el-radio-group style="margin-left:50px" v-model="form.resource">
          <el-radio label="偏低"></el-radio>
          <el-radio label="正常"></el-radio>
          <el-radio label="超标"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { getBranch, addBranch, updateBranch } from "@/api/branch";
export default {
  data() {
    return {
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
      },
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    };
  },
  mounted() {
    this.branchQryAction();
  },
  methods: {
    branchQryAction() {
      getBranch().then(res => {
        console.log(res);
        this.tableData = res.data;
        console.log(this.tableData);
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.updateNumberValidateForm = row;
      this.updateDialogFormVisible = true;
    },
    handleCreate() {
      this.addDialogFormVisible = true;
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addBranch(this.addNumberValidateForm).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.branchQryAction();
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
          updateBranch(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: "操作成功",
              type: "success"
            });
            this.branchQryAction();
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
