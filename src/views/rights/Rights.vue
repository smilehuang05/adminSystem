<template>
  <div class="rights">
     <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">权限管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
  </el-col>
  </el-row>
<el-table v-loading="loading" :data="rightsList" border style="width: 100%">
    <el-table-column type="index" width="50">
    </el-table-column>   
  <el-table-column prop="authName" label="权限名称" width="180">
  </el-table-column>
  <el-table-column prop="path" label="路径" width="180">
  </el-table-column>
  <el-table-column label="层级">
    <template slot-scope="scope">
      <span>{{scope.row.level|fmtLevel}}</span>
    </template>
  </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {getRightsList} from '@/api'
export default {
  data(){
    return{
      loading:true,
      rightsList:[]
    }
  },
  filters:{
    fmtLevel(level){
      if(level==='0'){
        return '一层'
      }else if(level==='1'){
        return '二层'
      }else{
        return '三层'
      }
    }
  },
  created(){
   this.loading=true
    getRightsList({type:'list'}).then(res=>{
      if(res.meta.status===200){
        this.loading=false
        console.log(this.rightsList)
        this.rightsList=res.data
      }
      console.log(res)
    })
  }
}
</script>
<style lang="scss" scoped>

</style>
