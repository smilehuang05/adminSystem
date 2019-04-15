<template>
  <div class="home">
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-menu default-active="2" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class='el-menu-admin'>
          <div class="logo"></div>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>用户列表</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {getUserList} from '@/api'
export default {
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
  .el-menu-admin{
    width:200px;
  }
  .el-container{
    height: 100%;
  }
  .el-aside{
    background-color: #545c64;
  }
  .el-header{
    background-color: #545c64;
  }
  .logo{
    background:url(../assets/logo.png);
    height: 60px;
    background-color: #989898;
    background-size: cover;
  }
}

</style>
