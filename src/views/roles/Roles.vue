<template>
  <div class="rights">
     <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">角色管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>
  </el-col>
  </el-row>
  <el-button type="primary" plain >添加角色</el-button>
  <el-table 
    :data="roleList" border class="mt-10"
    style="width: 100%">
    
    <el-table-column type="expand">
      
      <template slot-scope="scope">
        <div>11111</div>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column 
      label="角色名称"
      prop="roleName">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
      <el-button size="mini" icon="el-icon-edit" plain type="primary"></el-button>
      <el-button size="mini" icon="el-icon-delete" plain type="danger"></el-button>
      <el-button size="mini" icon="el-icon-check" plain type="warning"></el-button>
  </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {getRoleList} from '@/api'
export default {
  data(){
    return{
      loading:true,
        roleList: []
    }
  },
  created(){
    this.loading=true
    getRoleList().then(res=>{
      
    if(res.meta.status===200){
      this.loading=false
      console.log(res)
      res=(res.data).map(item=>{
        item.content=item.children
        delete item.children
        return item
      })
      console.log(res)
      this.roleList = res
     }
    })
   
  }
}
</script>
<style lang="scss" scoped>

</style>
