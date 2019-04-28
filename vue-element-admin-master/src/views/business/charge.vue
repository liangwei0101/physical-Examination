<template>
  <div class="app-container">
    <div class="demo-input-suffix">
      <el-row :gutter="20">
        <el-col :span="22" :offset="21">
          <el-button
            class="filter-item"
            style="margin-left: 10px;"
            type="primary"
            @click="handleCreate"
          >增加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width:100%; margin-top: 15px;">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="subscribeId" label="预约号" />
      <el-table-column prop="payType" label="支付方式" />
      <el-table-column prop="money" label="支付金额" />
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
        <el-form-item label="预约号" prop="subscribeId">
          <el-input v-model="addNumberValidateForm.subscribeId" />
        </el-form-item>

        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="addNumberValidateForm.payType" style="width: 100%" placeholder="请选择支付方式">
            <el-option label="现金" value="现金" />
            <el-option label="微信" value="微信" />
            <el-option label="支付宝" value="支付宝" />
          </el-select>
        </el-form-item>

        <el-form-item label="支付金额" prop="money">
          <el-input v-model="addNumberValidateForm.money" />
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
        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="updateNumberValidateForm.payType" style="width: 100%" placeholder="请选择支付方式">
            <el-option label="现金" value="现金" />
            <el-option label="微信" value="微信" />
            <el-option label="支付宝" value="支付宝" />
          </el-select>
        </el-form-item>

        <el-form-item label="支付金额" prop="money">
          <el-input v-model="updateNumberValidateForm.money" />
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
  ChargeQryAction,
  ChargeAddAction,
  ChargeDelAction,
  ChargeUpdateAction
} from '@/api/charge.js'
export default {
  data() {
    return {

      updateNumberValidateForm: {
        id: '',
        subscribeId: '',
        payType: '',
        money: ''
      },
      addNumberValidateForm: {
        id: '',
        subscribeId: '',
        payType: '',
        money: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入编号', trigger: 'blur' },
          { min: 1, max: 18, message: '只能是数字', trigger: 'blur' }
        ],
        subscribeId: [{ required: true, message: '请填写预约号', trigger: 'blur' }],
        payType: [{ required: true, message: '请填写支付金额', trigger: 'blur' }],
        money: [{ required: true, message: '请填写支付金额', trigger: 'blur' }]
      },
      data: [],
      searchStr: '',
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.ChargeQry()
  },
  methods: {
    search() {
      if (this.searchStr.trim() !== '') {
        this.data.forEach(element => {
          if (element.subscribeId === this.searchStr) {
            var index = this.data.indexOf(element)
            this.tableData = []
            this.tableData.push(this.data[index])
          }
        })
      } else {
        this.tableData = this.data
      }
    },
    ChargeQry() {
      ChargeQryAction().then(res => {
        this.tableData = res.data
        this.data = res.data
      })
    },
    updateSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          ChargeUpdateAction(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.ChargeQry(), (this.updateDialogFormVisible = false)
          })
        } else {
          return false
        }
      })
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        this.addDialogFormVisible = false
        if (valid) {
          ChargeAddAction(this.addNumberValidateForm).then(res => {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.ChargeQry()
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleCreate() {
      this.addDialogFormVisible = true
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.updateNumberValidateForm = row
      this.updateDialogFormVisible = true
    }
    // handleDelete(row) {
    //   console.log(row);
    //   ChargeDelAction(row.id).then(res => {
    //     this.ChargeQry();
    //     this.$message({
    //       message: "删除成功",
    //       type: "success"
    //     });
    //   });
    // }
  }
}
</script>
<style>
</style>
