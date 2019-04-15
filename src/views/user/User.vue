<template>
  <div class="user">
    <el-row>
      <el-col :span="24">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>
            <a href="/">活动管理</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
 
  </el-col>


  </el-row>
  <el-row>
    <div>
      <!-- 给组件绑定原生事件的时候，需要一个.native的修饰符 -->
      <el-input placeholder="请输入内容" class="search-input" v-model="query" @keydown.native.enter="initList">
        <el-button slot="append" icon="el-icon-search" @click='initList'></el-button>
      </el-input>
      <el-button type="success" plain>添加用户</el-button>
      </el-button>
    </div>
  </el-row>

  <el-table :data="userList" border style="width: 100%">
    <el-table-column type="index" width="50">
    </el-table-column>
    
  <el-table-column prop="username" label="姓名" width="180">

  </el-table-column>
  <el-table-column prop="email" label="邮箱" width="180">
  </el-table-column>
  <el-table-column prop="mobile" label="电话">
  </el-table-column>
 
  <el-table-column label="用户状态">
    <template slot-scope="scope">
      <el-switch v-model="scope.row.mg_state" @change='changeUserState(scope.row)'>
      </el-switch>
    </template>
  </el-table-column>
   <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button size="mini" icon="el-icon-edit" plain type="primary"></el-button>
      <el-button size="mini" icon="el-icon-delete" plain type="danger"></el-button>
      <el-button size="mini" icon="el-icon-check" plain type="warning"></el-button>
  </template>
  </el-table-column>
  </el-table>
  <el-pagination class="page"  @size-change='handleSizeChange'
  @current-change="handleCurrentChange" :current-page="1" :page-sizes="[1, 2, 3, 4]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
  </div>
</template>
<script>
import {getUserList,changeUserState} from '@/api'
export default {
data() {
      return {
        userList: [],
        query:'',
        total:0,
        pagesize:1,
        pagenum:1     
      }
    },
    created(){
      this.initList()
    },
    methods:{
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.pagesize=val
        this.initList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagenum=val
         this.initList()
      },
       initList(){
      getUserList({params:{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}}).then(res=>{
        this.userList=res.data.users
        this.total = res.data.total
      })
    },
    //改变用户状态
    changeUserState(row){
      console.log(row)
      changeUserState({uid:row.id,type:row.mg_state}).then(res=>{
        if(res.meta.status==200){
          this.$message({
            type:'success',
            message:res.meta.msg       
          })
        }else{       
          this.$message({
            type:'warning',
            message:res.meta.msg       
          })
        }
      })
    }
    }
   
}
</script>
<style lang="scss" scoped>
.user{
  .search-input{
    width: 300px;
    margin-bottom: 10px;
  }
  .page{
    margin-top: 10px;
    background-Color: #D3DCE6;
    padding: 10px;
  }
}
</style>

