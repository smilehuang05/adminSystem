<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
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
