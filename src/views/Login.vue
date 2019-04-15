<template>
  
  <div class="login">
  <el-form ref="form" :model="form" class="container" :rules="rules">
    <el-form-item>
      <img src="../assets/avatar.png" alt="" class="avatar">
    </el-form-item>
    <el-form-item prop='username'>
        <el-input v-model="form.username" placeholder='请输入账户名'><i slot="prefix" class="iconfont icon-zhanghao"></i></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input v-model="form.password" placeholder='请输入密码' type='password'><i slot="prefix" class="iconfont icon-mima" ></i></el-input>
      </el-form-item>
      <el-button type="primary" class="login-button" @click = 'loginSubmit("form")'>登录</el-button>
    </el-form>
  </div>
</template>
<script>
import {checkUser} from '@/api'
export default {
  data(){
    return{
      form:{
        username:'',
        password:''

      },
        rules: {
          username: [
            { required: true, message: '请输入登录名', trigger: 'blur' }
            
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    loginSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        //只有校验成功，才执行函数
        if (valid) {
          checkUser(this.form).then(res => {
            //如果成功要跳转至首页，将token保存到localStroge，将username保存到vuex的state中
            if (res.meta.status == 200) {
              console.log(res)
              localStorage.setItem('myToken',res.data.token)
              this.$store.commit('userName',res.data.username)
              this.$router.push({name:'Home'})
              this.$message({
                type:'success',
                message:res.meta.msg
              })
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
                
              });

            }

          })
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>

  .login {
     position: fixed;
     width: 100%;
     height: 100%;
     background-color: #2f4050;
     .container {
       position: absolute;
       left: 0;
       right: 0;
       margin: 150px auto;
       width: 400px;
       background-color: #fff;
       padding: 0 40px 40px 40px;
     }
     .avatar {
       position: relative;
       width: 120px;
       height: 120px;
       left: 50%;
       border-radius: 50%;
       margin-left: -60px;
       margin-top: -60px;
       box-sizing: border-box;
       border: 10px solid #fff;
       box-shadow: 0 1px 5px #ccc;
       overflow: hidden;
     }
     .login-button {
       width: 100%;

      }
  }
</style>
