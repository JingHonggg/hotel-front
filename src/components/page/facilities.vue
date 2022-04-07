<template>
  <div>
    <!--  客户列表文字  -->
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class='el-icon-brush'></i>设施管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card>
      <el-row>

        <el-col :span="12">
          <div>
            <img src="../../assets/img/sangna.jpg" class="image">
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <h1>男桑拿房</h1>
              <br>
              <div style='height: 5px;'></div>
              <span>人数：{{result.sangna.current }}/{{result.sangna.total}}</span>
            <br>
              <div style='height: 5px;'></div>
              <span>营业状态：</span>
            <el-tag type='success' v-if="result.sangna.status === 1">正在营业</el-tag>
            <el-tag type='danger' v-else>未营业</el-tag>
              <div style='height: 5px;'></div>
              <p>营业时间：{{result.sangna.time}}</p>
              <div style='height: 5px;'></div>
              <p>管理人员：{{result.sangna.person}}</p>
              <div style='height: 5px;'></div>
              <div style='height: 5px;'></div>
              <el-button type="primary" @click="change(result.sangna)">编辑</el-button>
          </div>
        </el-col>

      </el-row>
    </el-card>
      <el-card>
          <el-row>

              <el-col :span="12">
                  <div>
                      <img src="../../assets/img/sangna.jpg" class="image">
                  </div>
              </el-col>
              <el-col :span="8">
                  <div>
                      <h1>女桑拿房</h1>
                      <br>
                      <div style='height: 5px;'></div>
                      <span>人数：{{result.sangna2.current }}/{{result.sangna2.total}}</span>
                      <br>
                      <div style='height: 5px;'></div>
                      <span>营业状态：</span>
                      <el-tag type='success' v-if="result.sangna2.status === 1">正在营业</el-tag>
                      <el-tag type='danger' v-else>未营业</el-tag>
                      <div style='height: 5px;'></div>
                      <p>营业时间：{{result.sangna2.time}}</p>
                      <div style='height: 5px;'></div>
                      <p>管理人员：{{result.sangna2.person}}</p>
                      <div style='height: 5px;'></div>
                      <div style='height: 5px;'></div>
                      <el-button type="primary" @click="change(result.sangna2)">编辑</el-button>
                  </div>
              </el-col>

          </el-row>
      </el-card>
    <el-card>
      <el-row>

        <el-col :span="12">
          <div>
            <img src="../../assets/img/jiuba.jpg" class="image">
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <h1>酒吧</h1>
              <br>
            <span>人数：{{result.jiuba.current }}/{{result.jiuba.total}}</span>
            <br />
              <div style='height: 5px;'></div>
              <span>营业状态：</span>
            <el-tag type='success' v-if="result.jiuba.status === 1">正在营业</el-tag>
            <el-tag type='danger' v-else>未营业</el-tag>
              <div style='height: 5px;'></div>
              <p>营业时间：{{result.jiuba.time}}</p>
              <div style='height: 5px;'></div>
              <p>管理人员：{{result.jiuba.person}}</p>
              <div style='height: 5px;'></div>
              <div style='height: 5px;'></div>
              <el-button type="primary" @click="change(result.jiuba)">编辑</el-button>

          </div>
        </el-col>

      </el-row>
    </el-card>
    <el-card>
      <el-row>

        <el-col :span="12">
          <div>
            <img src="../../assets/img/canting.jpg" class="image">
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <h1>餐厅</h1>
              <br>
            <span>人数：{{result.canting.current }}/{{result.canting.total}}</span>
            <br />
              <div style='height: 5px;'></div>
              <span>营业状态：</span>
            <el-tag type='success' v-if="result.canting.status === 1">正在营业</el-tag>
            <el-tag type='danger' v-else>未营业</el-tag>
              <div style='height: 5px;'></div>
            <p>营业时间：{{result.canting.time}}</p>
              <div style='height: 5px;'></div>
              <p>管理人员：{{result.canting.person}}</p>
              <div style='height: 5px;'></div>
              <div style='height: 5px;'></div>
              <el-button type="primary" @click="change(result.canting)">编辑</el-button>

          </div>
        </el-col>

      </el-row>
    </el-card>
      <div style='height: 80px;'></div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-row>
        <el-col :span="5">营业时间:</el-col>
        <el-col :span="19">
          <el-input v-model="formData.time"></el-input>
        </el-col>
      </el-row>
        <div style='height: 14px;'></div>
        <el-row>
        <el-col :span="5">管理人员:</el-col>
        <el-col :span="19">
          <el-input v-model="formData.person"></el-input>
        </el-col>
      </el-row>
        <div style='height: 14px;'></div>
      <el-row>
        <el-col :span="5">开放状态:</el-col>
        <el-col :span="19">
          <el-select v-model="formData.status" placeholder="请选择">
            <el-option label="正在营业" :value="1"></el-option>
            <el-option label="未营业" :value="2">
            </el-option>
          </el-select>

        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateStatus()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  data(){
    return{
        result:{},
        dialogVisible:false,
        formData:{

        },
        editFrom:{
          id:'',
          status:'',
          person:"",
          time:""
        },

    }
  },


  methods:{
    getAll(){
        this.$http.get('/facilities/getFacilities').then(res =>{
             if (res.data.code === 200) {
                 this.result = res.data.data
                 console.log(res.data.data);
              } else {
                this.$message.error('获取失败');

              }
          })

    },
    updateStatus(){
        this.$http.get('/facilities/updateFacilities',{
          params:{
            'id':this.formData.id,
            'person':this.formData.person,
            'time':this.formData.time,
            'status':this.formData.status,
          }
        }).then(res =>{
                this.dialogVisible =false
           if (res.data.code === 200) {
                this.$message.success("更新成功")
                this.getAll()
                this.editFrom = {}
              } else {
                this.$message.error('更新失败');

              }
        })

    },
    change(param){
      this.formData = _.cloneDeep(param)
      this.dialogVisible =true
    },
    handleClose(){
       this.formData = {}
      this.dialogVisible =false
    }
  },
  created(){
    this.getAll()
  }
}
</script>

<style >
.image {
    object-fit: fill;
    width: 50%;
}
.el-card {
    margin-top: 10px;
}
</style>
