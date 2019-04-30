<template>
  <div class="app-container">
    <el-form :label-position="labelPosition" label-width="80px" model="right">
      <el-form-item label="身份证号" prop="idCard">
        <el-select v-model="addNumberValidateForm.idCard" style="width: 100%" placeholder="请选择"
          @change="userChange(addNumberValidateForm.idCard)">
          <el-option v-for="item in userList" :key="item.idCard" :label="item.realName" :value="item.idCard">
            <span style="float: left">{{ item.realName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.idCard
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目：" v-for="item in projectList" :key="item.id">
        <el-col :span="5">
          <el-input  v-model="item.name" :disabled="true"></el-input>
        </el-col>
        <el-col class="line" :span="1"> </el-col>
        <el-col :span="8" offset="1">
          <el-radio-group size="medium">
            <el-radio border label="偏低"></el-radio>
            <el-radio border label="正常"></el-radio>
            <el-radio border label="偏高"></el-radio>
          </el-radio-group>
        </el-col>
        <el-col :span="8">
          <el-input placeholder="体检记录"/>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {
    getMeal
  } from "@/api/meal.js";
  import {
    getBranch
  } from "@/api/branch";
  import {
    subscribeAddAction,
    subscribeQryAction
  } from "@/api/subscribe";
  import {
    findByUserTypeQryAction
  } from "@/api/user";
  import {
    ProjectByIdQryAction
  } from "@/api/physicalCompletion";

  export default {
    data() {
      return {
        labelPosition: "right",
        formLabelAlign: {
          name: "",
          region: "",
          type: ""
        },
        userList: [],
        addNumberValidateForm: {
          idCard: ""
        },
        projectList: []
      };
    },
    mounted() {
      this.findByUserTypeQry();
    },
    methods: {
      findByUserTypeQry() {
        findByUserTypeQryAction("用户").then(res => {
          this.userList = res.data;
          console.log(res.data);
          this.addNumberValidateForm.idCard = this.userList[0].idCard 
          this.userChange(this.userList[0].idCard)
        });
      },
      userChange(id) {
        this.projectList = []
        ProjectByIdQryAction(id).then(res => {
          this.projectList = res.data
        })
      }
    }
  };

</script>
<style>
  .box {
    margin-top: 0.5%;
  }

</style>
