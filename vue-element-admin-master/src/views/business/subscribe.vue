<template>
  <div class="app-container">
    <div class="demo-input-suffix">
      <el-row :gutter="20">
        <el-col :span="22" :offset="21">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">增加</el-button>
        </el-col>
      </el-row>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top: 15px;">
      <el-table-column prop="idCard" label="身份证号" width="180" />
      <el-table-column prop="subscribeType" label="预约方式" width="150" />
      <el-table-column prop="subscribeTime" label="预约时间" width="150" />
      <el-table-column prop="mealId" label="套餐" width="250" />
      <el-table-column prop="branchNo" label="所在部门编号" width="250" />
      <el-table-column prop="serialNo" label="流水号" width="150" />
      <el-table-column label="操作">
        <template slot-scope="scope">
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

        <el-form-item label="身份证号" prop="idCard">
          <el-select v-model="addNumberValidateForm.idCard" style="width: 100%" placeholder="请选择">
            <el-option v-for="item in userDataList" :key="item.idCard" :label="item.realName" :value="item.idCard">
              <span style="float: left">{{ item.realName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.idCard }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="方式">
          <el-select v-model="addNumberValidateForm.subscribeType" style="width: 100%" placeholder="请选择性别">
            <el-option label="电话" value="电话" />
            <el-option label="体检中心" value="体检中心" />
          </el-select>
        </el-form-item>

        <el-form-item label="医院">
          <el-select v-model="addNumberValidateForm.branchNo" style="width: 100%" placeholder="请选择">
            <el-option v-for="item in branchSelectList" :key="item.branchNo" :label="item.name" :value="item.branchNo">
              <span style="float: left">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="套餐">
          <el-select v-model="addNumberValidateForm.mealId" style="width: 100%" placeholder="请选择">
            <el-option v-for="item in mealSelectList" :key="item.id" :label="item.name" :value="item.id">
              <span style="float: left">{{ item.name }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.money }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预约日期">
          <el-date-picker v-model="addNumberValidateForm.subscribeTime" style="width: 100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" type="date" :picker-options="pickerOptions" placeholder="选择日期" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addSubmitForm('addNumberValidateForm')">提交</el-button>
          <el-button @click="resetForm('addNumberValidateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import {
  getMeal
} from '@/api/meal.js'
import {
  getBranch
} from '@/api/branch'
import {
  subscribeAddAction,
  subscribeQryAction
} from '@/api/subscribe'
import {
  findByUserTypeQryAction
} from '@/api/user'

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        }
      },
      userDataList: [],
      branchSelectList: [],
      mealSelectList: [],
      addNumberValidateForm: {
        idCard: '',
        branchNo: '',
        subscribeType: '',
        subscribeTime: '',
        mealId: ''
      },
      rules: {
        idCard: [{
          required: true,
          message: '请输入身份证',
          trigger: 'blur'
        },
        {
          min: 1,
          max: 18,
          message: '长度在 1 到 18个字符',
          trigger: 'blur'
        }
        ],
        subscribeType: [{
          required: true,
          message: '请填写预约方式',
          trigger: 'blur'
        }]
      },
      data: [],
      searchStr: '',
      addDialogFormVisible: false,
      updateDialogFormVisible: false,
      tableData: []
    }
  },
  mounted() {
    this.subscribeQry()
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
    subscribeQry() {
      subscribeQryAction().then(res => {
        this.tableData = res.data
        this.data = res.data
      })
    },
    addSubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          subscribeAddAction(this.addNumberValidateForm).then(res => {
            this.addDialogFormVisible = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.subscribeQry()
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
      getMeal().then(res => {
        this.mealSelectList = res.data
        this.addDialogFormVisible = true
      })

      getBranch().then(res => {
        this.branchSelectList = res.data
      })

      findByUserTypeQryAction('用户').then(res => {
        this.userDataList = res.data
      })
    },
    handleEdit(index, row) {
      console.log(index, row)
      this.updateNumberValidateForm = row
      this.updateDialogFormVisible = true
    },
    handleDelete(row) {
      console.log(row)
      UserDelAction(row.idCard).then(res => {
        this.subscribeQry()
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
