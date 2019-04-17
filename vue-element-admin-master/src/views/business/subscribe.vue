<template>
  <div>
    <div class="demo-input-suffix">
      体检形式:
      <el-select v-model="ruleForm.region" placeholder="请选择体检形式">
        <el-option label="个人" value="shanghai" />
        <el-option label="团体" value="beijing" />
      </el-select>
      请输入用户预约id：
      <el-input
        v-model="input21"
        placeholder="请输入ID"
        prefix-icon="el-icon-search"
        style="width: 20%"
      />
      <el-button type="primary">查询</el-button>
      <el-button type="success" @click="handleCreate">新增</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="预约id" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" width="180">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.id_card }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预约体检项目" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.subscribe_type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约体检时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.subscribe_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约体检医院编号" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 10px">{{ scope.row.branch_no }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加" :visible.sync="addDialogFormVisible">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="身份证号" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="医院编号" prop="desc">
          <el-input v-model="ruleForm.desc" />
        </el-form-item>
        <el-form-item label="预约时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker v-model="ruleForm.date2" placeholder="选择时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item> -->
        <!-- <el-form-item label="体检项目·" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="套餐一" name="type"></el-checkbox>
      <el-checkbox label="套餐二" name="type"></el-checkbox>
      <el-checkbox label="套餐三" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item> -->
        <el-form-item label="体检项目" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="套餐一" />
            <el-radio label="套餐二" />
            <el-radio label="套餐三" />
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 1 到 18个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择体检类型', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写体检医院', trigger: 'blur' }
        ]
      },
      input2: '',
      input21: '',
      addDialogFormVisible: false,
      tableData: [
        {
          id: '1',
          id_card: '123',
          subscribe_type: '好好',
          subscribe_time: '哈哈',
          branch_no: '1',
          serial_no: '001'
        },
        {
          id: '1',
          id_card: '123',
          subscribe_type: '哈哈',
          subscribe_time: '哈哈',
          branch_no: '1',
          serial_no: '002'
        },
        {
          id: '3',
          id_card: '123',
          subscribe_type: '哈哈',
          subscribe_time: '哈哈',
          branch_no: '1',
          serial_no: '002'
        },
        {
          id: '4',
          id_card: '123',
          subscribe_type: '哈哈',
          subscribe_time: '哈哈',
          branch_no: '1',
          serial_no: '002'
        }
      ]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
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
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>
