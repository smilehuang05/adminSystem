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
      <el-tag closable @close='deleteRight(scope.row,firstChildren.id)'>
        {{firstChildren.authName}}
      </el-tag>
      <i class="el-icon-arrow-right" v-if='firstChildren.children.length !==0'></i>
    </el-col>
    <el-col :span='20'>
      <el-row v-for='secondChildren in firstChildren.children' :key='secondChildren.id'>
        <el-col :span='5'>
          <el-tag closable type='success' @close='deleteRight(scope.row,secondChildren.id)'>
            {{secondChildren.authName}}
          </el-tag>
          <i class="el-icon-arrow-right"></i>
        </el-col>
        <el-col :span='19'>
          <el-tag closable type='warning' @close='deleteRight(scope.row,thirdChildren.id)'  v-for='thirdChildren in secondChildren.children' :key='thirdChildren.id'>
            {{thirdChildren.authName}}
          </el-tag>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row v-if="scope.row.content.length===0">
    <el-col :span='24'>该角色没有分配权限，请前往分配！</el-col>
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
      width="150">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
      <el-button size="mini" icon="el-icon-edit" plain type="primary"></el-button>
      <el-button size="mini" icon="el-icon-delete" plain type="danger"></el-button>
      <el-button size="mini" icon="el-icon-check" plain type="warning" @click='showDialog(scope.row)' title="授权角色"></el-button>
  </template>
 
  </el-table-column>

  </el-table>

  <el-dialog title="授权角色" :visible.sync="dialogFormVisible">
    <div class="tree-container">
      <el-tree :data="rightList" show-checkbox node-key="id" :default-expand-all='true' :default-checked-keys="seleteRight" :props="defaultProps">
      </el-tree>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>

  </div>
</template>
<script>
import { getRoleList, deleteRoleRight,getRightsList } from '@/api'
export default {
  data() {
    return {
      loading: true,
      roleList: [],
      dialogFormVisible: false,
      rightList: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      seleteRight:[],//保存默认选中的权限ID
      currentRole:{}//保存点击的角色
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
   
  },
  methods:{
    deleteRight(row,rightId){
      deleteRoleRight({roleId:row.id,rightId:rightId}).then(res=>{
        if(res.meta.status===200){
         row.content=res.data
        }else{
          this.$message({
            type:'error',
            message:res.meta.msg
          })
        }
      })
      
    },
    showDialog(row){
      this.dialogFormVisible=true
      this.currentRole=row
      getRightsList({type:'tree'}).then(res=>{
        
        if(res.meta.status===200){
          console.log(res.data)
          this.rightList=res.data
        }else{
          this.$message({
            type:'error',
            message:res.meta.msg
          })
        }
      })
      this.seleteRight.length=0
      // 取出当前点击角色的所有权限，然后遍历到它的第三个children,取出他里面的所有的项的id,放进selectedRights中
      this.currentRole.content.forEach(first=>{
        if(first.children && first.children.length!==0){
          first.children.forEach(second=>{
            if(second.children && second.children.length!==0){
              second.children.forEach(third=>{
                this.seleteRight.push(third.id)
              })
            }
          })
        }
      })
    }
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
  .tree-container{
    height: 300px;
    overflow: auto;
  }
</style>
