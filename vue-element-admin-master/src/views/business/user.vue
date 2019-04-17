<template>
  <div class="app-container">
    <div class="demo-input-suffix">
      <el-row :gutter="20">
        <el-col :span="16" :offset="10">
          请输入用户名：
          <el-input
            v-model="searchStr"
            placehoyalder="请输入姓名"
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
    <el-table :data="tableData" style="width: 100%;margin-top: 15px;">
      <el-table-column prop="idCard" label="身份证号" width="180" />
      <el-table-column prop="phone" label="电话号码" width="150" />
      <el-table-column prop="realName" label="姓名" width="150" />
      <el-table-column prop="userType" label="职务" width="150" />
      <el-table-column prop="pwd" label="用户密码" width="150" />
      <el-table-column prop="branchNo" label="所在部门编号" width="150" />
      <el-table-column prop="sex" label="性别" width="150" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 功能未实现 -->
    <el-dialog title="增加" :visible.sync="addDialogFormVisible">
      <el-form
        ref="addNumberValidateForm"
        :model="addNumberValidateForm"
        :rules="rules"
        class="demo-ruleForm"
        label-width="100px"
      >
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="addNumberValidateForm.idCard" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="addNumberValidateForm.phone" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="addNumberValidateForm.realName" />
        </el-form-item>

        <el-form-item label="用户密码" prop="pwd">
          <el-input v-model="addNumberValidateForm.pwd" />
        </el-form-item>
        <el-form-item label="部门编号" prop="branchNo">
          <el-input v-model="addNumberValidateForm.branchNo" />
        </el-form-item>
        <el-form-item label="职务" prop="userType">
          <el-select v-model="addNumberValidateForm.userType" placeholder="请选择职务">
            <el-option label="医生" value="userType1" />
            <el-option label="前台接待员" value="userType2" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="addNumberValidateForm.sex" placeholder="请选择性别">
            <el-option label="男" value="sex1" />
            <el-option label="女" value="sex2" />
          </el-select>
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
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="身份证号" prop="idCard">
          <el-input v-model="updateNumberValidateForm.idCard" />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="updateNumberValidateForm.phone" />
        </el-form-item>
        <el-form-item label="姓名" prop="realName">
          <el-input v-model="updateNumberValidateForm.realName" />
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd">
          <el-input v-model="updateNumberValidateForm.pwd" />
        </el-form-item>
        <el-form-item label="部门编号" prop="branchNo">
          <el-input v-model="updateNumberValidateForm.branchNo" />
        </el-form-item>
        <el-form-item label="职务" prop="userType">
          <el-select v-model="updateNumberValidateForm.userType" placeholder="请选择职务">
            <el-option label="医生" value="shanghai" />
            <el-option label="前台接待员" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="updateNumberValidateForm.sex" placeholder="请选择性别">
            <el-option label="男" value="shanghai" />
            <el-option label="女" value="beijing" />
          </el-select>
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
  UserQryAction,
  UserAddAction,
  UserDelAction,
  UserUpdateAction
} from '@/api/user.js'
export default {
  data() {
    return {
      selectList: [{ id: 0, sex: '男' }, { id: 1, sex: '女' }],

      updateNumberValidateForm: {
        idCard: '',
        phone: '',
        branchNo: '',
        realName: '',
        userType: '',
        pwd: '',
        sex: ''
      },
      addNumberValidateForm: {
        idCard: '',
        phone: '',
        branchNo: '',
        realName: '',
        userType: '',
        pwd: '',
        sex: ''
      },
      rules: {
        idCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { min: 1, max: 18, message: '长度在 1 到 18个字符', trigger: 'blur' }
        ],
        phone: [{ required: true, message: '请填写电话号码', trigger: 'blur' }],
        realName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        userType: [{ required: true, message: '请填写职务', trigger: 'blur' }],
        pwd: [{ required: true, message: '请填写用户密码', trigger: 'blur' }],
        branchNo: [
          { required: true, message: '请填写部门编号', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请填写性别', trigger: 'blur' }]
      },
      data: [],
      searchStr: '',
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.UserQry()
  },
  methods: {
    search() {
      if (this.searchStr.trim() !== '') {
        this.data.forEach(element => {
          if (element.realName == this.searchStr) {
            var index = this.data.indexOf(element)
            this.tableData = []
            this.tableData.push(this.data[index])
          }
        })
      } else {
        this.tableData = this.data
      }
    },
    UserQry() {
      UserQryAction().then(res => {
        this.tableData = res.data
        this.data = res.data
      })
    },
    updateSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          UserUpdateAction(this.updateNumberValidateForm).then(res => {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.UserQry(), (this.updateDialogFormVisible = false)
          })
        } else {
          return false
        }
      })
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          UserAddAction(this.addNumberValidateForm).then(res => {
            this.$message({
              message: '新增成功',
              type: 'success'
            })
            this.UserQry(), (this.addDialogFormVisible = false)
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
    },
    handleDelete(row) {
      console.log(row)
      UserDelAction(row.idCard).then(res => {
        this.UserQry()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style>
</style>
