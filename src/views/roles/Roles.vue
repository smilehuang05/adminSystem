<template>
  <div class="roles">
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
   
  <el-row v-for="firstChildren in scope.row.content" :key='firstChildren.id'>
    <el-col :span='4'>
      <el-tag closable>
        {{firstChildren.authName}} 
      </el-tag>
      <i class="el-icon-arrow-right" v-if='firstChildren.children.length !==0'></i>
    </el-col>
    <el-col :span='20'>
      <el-row v-for='secondChildren in firstChildren.children' :key='secondChildren.id'>
        <el-col :span='5'>
          <el-tag closable type='success'>
            {{secondChildren.authName}}
          </el-tag>
          <i class="el-icon-arrow-right"></i>
        </el-col>
        <el-col :span='19'>
          <el-tag closable type='warning' v-for='thirdChildren in secondChildren.children' :key='thirdChildren.id'>
            {{thirdChildren.authName}}
          </el-tag>
        </el-col>


            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column 
      label="角色名称"
      prop="roleName"
      width="90">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="roleDesc"
      width="130">
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
  .roles{
    .el-tag{
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
</style>
