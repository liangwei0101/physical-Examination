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
      <el-table-column prop="branchNo" label="编号" width="250" />
      <el-table-column prop="name" label="分院名称" width="200" />
      <el-table-column prop="subscribeMaxCount" label="分院预约最大人数" width="170" />
      <el-table-column prop="address" label="分院地址" />
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
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
          label="分院名称"
          prop="name"
          :rules="[{ required: true, message: '分院名称不能为空' }]"
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
          label="分院地址"
          prop="address"
          :rules="[{ required: true, message: '分院地址不能为空' }]"
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
          <el-button
            type="primary"
            @click="addSubmitForm('addNumberValidateForm')"
          >提交</el-button>
          <el-button
            @click="resetForm('addNumberValidateForm')"
          >重置</el-button>
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
          <el-button
            type="primary"
            @click="updateSubmitForm('updateNumberValidateForm')"
          >提交</el-button>
          <el-button
            @click="resetForm('updateNumberValidateForm')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getBranch, addBranch, updateBranch } from '@/api/branch'
export default {
  data() {
    return {
      tableData: [],
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      addNumberValidateForm: {
        branchNo: '0',
        name: '',
        address: '',
        subscribeMaxCount: 5
      },
      updateNumberValidateForm: {
        branchNo: '',
        name: '',
        address: '',
        subscribeMaxCount: 5
      }
    }
  },
  mounted() {
    this.branchQryAction()
  },
  methods: {
    branchQryAction() {
      getBranch().then(res => {
        console.log(res)
        this.tableData = res.data
        console.log(this.tableData)
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.updateNumberValidateForm = row
      this.updateDialogFormVisible = true
    },
    handleCreate() {
      this.addDialogFormVisible = true
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addDialogFormVisible = false
          addBranch(this.addNumberValidateForm).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.branchQryAction()
          })
        } else {
          return false
        }
      })
    },
    updateSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          updateBranch(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.branchQryAction()
            this.updateDialogFormVisible = false
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
