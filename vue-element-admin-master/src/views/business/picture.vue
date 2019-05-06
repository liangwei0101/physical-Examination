<template>
  <div class="app-container">
    <div class="demo-input-suffix">
      <el-row :gutter="20">
        <el-col :span="22" :offset="21">
          <el-button class="filter-item" style="margin-left: 10px;" type="primary" @click="handleCreate">增加</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- <div class="box-card">
      <img
        class="img"
        v-for="item in pictureList"
        :key="item.id"
        :src="item.url"
      />
    </div> -->
    <el-dialog title="增加" :visible.sync="addDialogFormVisible">
      <el-form :label-position="labelPosition" label-width="80px" model="right">
        <el-form-item label="身份证号">
          <el-select
            v-model="addNumberValidateForm.idCard"
            style="width: 100%"
            placeholder="请选择"
            @change="userChange(addNumberValidateForm.idCard)"
          >
            <el-option v-for="item in userList" :key="item.idCard" :label="item.realName" :value="item.idCard">
              <span style="float: left">{{ item.realName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{
                item.idCard
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <el-upload
        multiple="true"
        class="upload-demo"
        :data="userId"
        action="http://localhost:8080/api/imgUpdate"
        :file-list="fileList"
        list-type="picture"
      >
        <el-button style="margin-left:100%" size="small" type="primary">上传图片</el-button>
      </el-upload>

    </el-dialog>

    <el-card v-for="item in pictureList" :key="item.id" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ item.userName }}</span>
      </div>
      <img class="img" :src="item.url">
    </el-card>
  </div>
</template>

<script>
import {
  UserQryAction,
  findByUserTypeQryAction
} from '@/api/user.js'
import {
  getPictureAction
} from '@/api/picture.js'

export default {
  data() {
    return {
      pictureList: [],
      pictureListShow: [],
      addNumberValidateForm: {
        idCard: ''
      },
      addDialogFormVisible: false,
      userList: [],
      userId: { 'userId': '360782199401013538' }
    }
  },
  mounted() {
    this.UserQry()
    this.getPicture()
    this.userId = this.addSubmitForm.idCard
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
    findByUserTypeQry() {
      findByUserTypeQryAction('用户').then(res => {
        this.userList = res.data
        this.addNumberValidateForm.idCard = this.userList[0].idCard
        this.userChange(this.userList[0].idCard)
      })
    },
    UserQry() {
      UserQryAction().then(res => {
        this.tableData = res.data
        this.data = res.data
      })
    },
    userChange(id) {
      console.log(id)
    },
    getPicture() {
      getPictureAction().then(res => {
        this.pictureList = res.data
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
      this.findByUserTypeQry()
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
  .box-card {
    width: 330px;
    height: 260px;
    margin-top: 10px;
    margin-left: 10px;
    overflow: hidden;
    float: left;
    padding: 0;
  }

  .img {
    padding: 0;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    float: left;
  }

</style>
