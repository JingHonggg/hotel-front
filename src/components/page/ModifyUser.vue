<template>
  <div>
    <!--  客户列表文字  -->
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
        <el-breadcrumb-item>
          <i class='el-icon-user'></i> 修改信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class='container'>
      <el-tabs v-model='activeName'>
        <el-tab-pane label='修改信息' name='first'>
          <div class='handle-box mt20' style='display: flex;align-items: center;justify-content: center;'>
            <el-form label-width='70px' ref='infoForm' :rules='infoRules' :model='infoForm'>
              <el-form-item label='手机号' prop='phone'>
                <el-input class='handle-input' v-model='infoForm.phone' :disabled='role' />
              </el-form-item>
              <el-form-item label='姓名' prop='name'>
                <el-input class='handle-input' v-model='infoForm.name' :disabled='role' />
              </el-form-item>
            </el-form>
          </div>
          <div style='display:flex;justify-content: center'>
            <el-button type='primary' style='width: 100px;margin-left: 50px;' plain @click='infoConfirm'
              :disabled='role'>提交
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label='修改密码' name='second'>
          <div class='handle-box mt20' style='display: flex;align-items: center;justify-content: center;'>
            <el-form label-width='100px' ref='passwordForm' :rules='passwordRules' :model='passwordForm'>
              <el-form-item label='旧密码' prop='oldPassword'>
                <el-input class='handle-input' v-model='passwordForm.oldPassword' :disabled='role' />
              </el-form-item>
              <el-form-item label='新密码' prop='newPassword'>
                <el-input class='handle-input' v-model='passwordForm.newPassword' :disabled='role' />
              </el-form-item>
              <el-form-item label='再次输入' prop='newPasswordConfirm'>
                <el-input class='handle-input' v-model='passwordForm.newPasswordConfirm' :disabled='role' />
              </el-form-item>
            </el-form>
          </div>
          <div style='display:flex;justify-content: center'>
            <el-button type='primary' style='width: 100px;margin-left: 50px;' plain @click='passwordConfirm'
              :disabled='role'>提交
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>


</template>

<script>
  export default {
    name: 'modifyUser',
    data() {
      return {
        activeName: 'first',
        userId: null,
        role: false,
        oldPassword: null,
        userOriginInfo: {},
        infoForm: {
          name: null,
          phone: null,
          password: null
        },
        passwordForm: {
          oldPassword: null,
          newPassword: null,
          newPasswordConfirm: null
        },
        infoRules: {
          phone: [{
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          }, {
            validator: (rule, value, callback) => {
              let pattern = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
              if (!pattern.test(value)) {
                callback('手机号不合法')
              } else {
                callback()
              }
            }
          }],
          name: {
            required: true,
            message: '名字不能为空',
            trigger: 'blur'
          }
        },
        passwordRules: {
          oldPassword: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }, {
            min: 6,
            message: '密码长度不低于6位字符',
            trigger: 'blur'
          }],
          newPassword: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur'
          }, {
            min: 6,
            message: '密码长度不低于6位字符',
            trigger: 'blur'
          }],
          newPasswordConfirm: [{
            required: true,
            message: '请再次输入',
            trigger: 'blur'
          }, {
            min: 6,
            message: '密码长度不低于6位字符',
            trigger: 'blur'
          }]
        }
      };
    },
    async mounted() {
      this.userId = localStorage.getItem('ms_username');
      this.role = this.userId === 'admin';
      if (this.userId !== 'admin') {
        await this.searchFront();
      }
    },
    methods: {
      searchFront: async function () {
        await this.$http.get('/front/getFrontById?frontId=' + this.userId).then(res => {
          if (res.status === 200) {
            const data = res.data.data['front'];
            this.userOriginInfo = data;
            this.infoForm = data;
          } else {
            this.$message.error('服务器错误');
          }
        });
      },
      infoConfirm: function () {
        this.$confirm('是否确认修改信息？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.post('/front/addFront?frontId=' + this.userId + '&name=' + this.infoForm.name +
            '&password=' + this.infoForm.password + '&phone=' + this.infoForm.phone).then(res => {
            if (res.status === 200) {
              this.$message.success('修改成功');
              this.userOriginInfo = Object.assign(this.userOriginInfo, this.infoForm);
            } else {
              this.$message.error('修改失败：' + res.data.msg);
            }
          });
        }).catch();
      },
      passwordConfirm: function () {
        if (this.userOriginInfo.password !== this.passwordForm.oldPassword) {
          this.$message.error('原密码错误！')
          return
        }
        if (this.passwordForm.newPassword !== this.passwordForm.newPasswordConfirm) {
          this.$message.error('两次输入密码不一致！')
          return;
        }
        this.$confirm('是否确认修改信息？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.role === 'admin') {
            this.$http.post('/background/modifyBackground?newPassword=' + this.passwordForm.newPassword).then(res => {
              if (res.status === 200) {
                this.$message.success('修改成功')
                this.userOriginInfo.password = this.passwordForm.newPassword
              } else {
                this.$message.error('修改失败：' + res.data.msg)
              }
            })
          } else {
            this.$http.post('/front/modifyFront?frontId=' + this.userOriginInfo.frontId + '&name=' + this.userOriginInfo
              .name +
              '&password=' + this.passwordForm.newPassword + '&phone=' + this.userOriginInfo.phone).then(
            res => {
              if (res.status === 200) {
                this.$message.success('修改成功')
              } else {
                this.$message.error('修改失败：' + res.data.msg)
              }
            });
          }
        });
      }
    }
  };
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

  .handle-select {
    width: 120px;
  }

  .handle-input {
    width: 300px;
    display: inline-block;
  }

  .table {
    width: 100%;
    font-size: 14px;
  }

  .red {
    color: #ff0000;
  }

  .mt20 {
    margin-top: 20px;
  }

  .table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
  }
</style>
