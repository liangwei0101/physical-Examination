<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="结果展示" name="first">
        <div>

          <el-form :label-position="labelPosition" label-width="80px" model="right">
            <el-form-item label="用户" prop="idCard">
              <el-select v-model="ShowNumberValidateForm.idCard" style="width: 100%" placeholder="请选择"
                @change="showUserChange(ShowNumberValidateForm.idCard)">
                <el-option v-for="item in ResultUserListShow" :key="item.idCard" :label="item.Name"
                  :value="item.idCard">
                  <span style="float: left">{{ item.Name }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.idCard
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-card class="box-card" style="width:92%;margin-left:80px;">
              <div slot="header" class="clearfix">
                <span>体检结果：{{resultListShow.result}}</span>
              </div>
              <div v-for="item in resultListShow.resultShowList" :key="item" class="text item">
                {{ item }}
              </div>
            </el-card>
          </el-form>
        </div>
      </el-tab-pane>

      <el-tab-pane label="结果增加" name="second">
        <div>
          <el-form :label-position="labelPosition" label-width="80px" model="right">
            <el-form-item label="身份证号" prop="idCard">
              <el-select v-model="addNumberValidateForm.idCard" style="width: 100%" placeholder="请选择"
                @change="addUserChange(addNumberValidateForm.idCard)">
                <el-option v-for="item in addUserList" :key="item.idCard" :label="item.realName" :value="item.idCard">
                  <span style="float: left">{{ item.realName }}</span>
                  <span style="float: right; color: #8492a6; font-size: 13px">{{
                    item.idCard
                  }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目：" v-for="item in addResultList" :key="item.id">
              <el-col :span="5">
                <el-input v-model="item.name" :disabled="true"></el-input>
              </el-col>
              <el-col class="line" :span="1"> </el-col>
              <el-col :span="8" offset="1">
                <el-radio-group size="medium" v-model="item.checkVal">
                  <el-radio border label="偏低"></el-radio>
                  <el-radio border label="正常"></el-radio>
                  <el-radio border label="偏高"></el-radio>
                </el-radio-group>
              </el-col>
              <el-col :span="8">
                <el-input v-model="item.remark" placeholder="体检记录" />
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-col :span="24" offset="9" style="margin-top: 30px">
                <el-button type="primary" @click="resultAdd">提交结果</el-button>
              </el-col>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
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
    ProjectByIdQryAction,
    resultAddAction,
    resultUserQryAction,
    resultQryAction
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
        addUserList: [],
        addNumberValidateForm: {
          idCard: ""
        },
        ShowNumberValidateForm: {
          idCard: ""
        },
        projectList: [],
        addResultList: [],
        activeName: "first",
        ResultUserListShow: [],
        resultListShow: []
      };
    },
    mounted() {
      this.findByUserTypeQry();
      this.resultQry();
    },
    methods: {
      findByUserTypeQry() {
        findByUserTypeQryAction("用户").then(res => {
          this.addUserList = res.data;
          this.addNumberValidateForm.idCard = this.addUserList[0].idCard;
          this.addUserChange(this.addUserList[0].idCard);
        });
      },
      addUserChange(id) {
        this.projectList = [];
        ProjectByIdQryAction(id).then(res => {
          this.projectList = res.data;
          this.setProject(id);
        });
      },
      showUserChange(id) {
        resultQryAction(id).then(res => {
          this.resultListShow = res.data
          console.log(res.data)
        });
      },
      resultAdd() {
        resultAddAction(this.addResultList).then(res => {
          this.$message({
            message: "增加成功",
            type: "success"
          });
        });
      },
      resultQry() {
        resultUserQryAction().then(res => {
          this.ResultUserListShow = res.data;
        });
      },
      setProject(id) {
        this.addResultList = [];
        this.projectList.forEach(element => {
          let addResult = {
            idCard: "",
            subscribeId: "",
            mealId: "",
            projectId: "",
            name: " ",
            checkVal: "",
            remark: ""
          };
          addResult.idCard = id;
          addResult.subscribeId = "";
          addResult.mealId = "";
          addResult.projectId = element.id;
          addResult.name = element.name;
          addResult.checkVal = "";
          addResult.remark = "";
          this.addResultList.push(addResult);
        });
      }
    }
  };

</script>
<style>
  .box {
    margin-top: 0.5%;
  }

</style>
