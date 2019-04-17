<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto">
         <div class="logo"></div>
        <el-menu :router='true' :collapse="isCollapse" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class='el-menu-vertical-demo el-menu-admin' :unique-opened='true'>
         
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/user">
              <i class="el-icon-menu"></i>
             用户列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
             角色列表
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
             权限列表
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部部分 -->
        <el-header>
          <i class="iconfont icon-caidan toggle-btn" @click="toggleMenu"></i>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span class="welcome">
              您好，{{$store.getters.username}}
            </span>
            <el-button type="text" @click="loginOut">退出</el-button>
          </div>
        </el-header>
        <!-- 中间内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>
<script>
import { getUserList } from '@/api'
export default {
  data() {
    return {
      isCollapse: false
    }
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toggleMenu(){
      console.log(11)
      this.isCollapse=!this.isCollapse;
    },
    loginOut(){
      //清除登录状态，即保存再localStorage中token
      localStorage.removeItem('myToken')
      //跳转到登录页面
      this.$router.push({name:'Login'})

    }
  },
  mounted(){
    let params = {params:{query:'',pagenum:1,pagesize:1}}
    getUserList(params).then(res=>{
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>
.home{
  height: 100%;
  min-height: 400px;
  .el-menu-admin{
    border-right: none;
  
  }
  .el-container{
    height: 100%;
  }
  .el-aside{
    background-color: #545c64;
  }
  .el-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #545c64;
    .system-title{
      font-size: 26px;
      color:#fff;
    }
    .welcome{
      font-size: 14px;
      color:#fff;
    }
  }
  .logo{
    background:url(../assets/logo.png);
    height: 60px;
    background-color: #545c64;
    background-size: cover;
  }
  .toggle-btn{
    font-size: 36px;
    color: #989898;
    line-height: 60px;
    font-weight: bold;
  }
}

</style>
