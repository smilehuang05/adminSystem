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
      <el-button type="success" plain @click="addUserNull(addForm)">添加用户</el-button>
      </el-button>
    </div>
  </el-row>
  <el-table v-loading="loading" :data="userList" border style="width: 100%">
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
      <el-button size="mini" icon="el-icon-edit" plain type="primary" @click="showEditDialog(scope.row)"></el-button>
      <el-button size="mini" icon="el-icon-delete" plain type="danger" @click="showDeleteDialog(scope.row)"></el-button>
      <el-button size="mini" icon="el-icon-check" plain type="warning" @click="showGrantDialog(scope.row)"></el-button>
  </template>
  </el-table-column>
  </el-table>
  <el-pagination class="page"  @size-change='handleSizeChange'
  @current-change="handleCurrentChange" :current-page="1" :page-sizes="[5, 10, 15, 20]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
  </el-pagination>
  <!-- 添加用户对话框 -->
  <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
  <el-form :model="addForm" label-width="80px" :rules='rules' ref='addForm'>
    <el-form-item label="用户名" prop='username'>
      <el-input v-model="addForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop='password'>
      <el-input v-model="addForm.password" autocomplete="off" type='password'></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop='email'>
      <el-input v-model="addForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop='mobile'>
      <el-input v-model="addForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUserSubmit('addForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑用户对话框 -->
  <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
  <el-form :model="editForm" label-width="80px" :rules='rules' ref='editForm'>
    <el-form-item label="用户名" prop='username'>
      <el-input v-model="editForm.username" autocomplete="off" :disabled="true"></el-input>  
    </el-form-item>
    <el-form-item label="邮箱" prop='email'>
      <el-input v-model="editForm.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop='mobile'>
      <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="editDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="eddUserSubmit('editForm')">确 定</el-button>
  </div>
</el-dialog>
<!-- 分配角色-->
  <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
  <el-form :model="grantForm" label-width="120px">
    <el-form-item label="当前的用户：" prop='username'>
      <el-tag type="info">{{grantForm.username}}</el-tag>
    </el-form-item>
    <el-form-item label="请选择角色：">
    <el-select v-model="roleId" placeholder="请选择角色">
      <el-option 
      v-for="(role,index) in roleList" :key="index"
      :label="role.roleName" :value="role.id">
      </el-option>
    </el-select>
  </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="grantDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="grantUserSubmit">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import {getUserList,changeUserState,addUsers,getUsers,editUsers,deleteUser,getRoleList,grantRoleList} from '@/api'
export default {
data() {
      return {
        loading:true,
        userList: [],
        query:'',
        total:0,
        pagesize:5,
        pagenum:1,
        roleId:'',
        addDialogFormVisible:false,
        addForm:{
          username:'',
          password:'',
          email:'',
          mobile:''
        },
        editDialogFormVisible: false,
        editForm: {
          username: '',
          email: '',
          mobile: '',
          id:0
        },
       grantDialogFormVisible:false,
       grantForm:{ },
       roleList:[],
      
          rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
            
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
           email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
             { type:'email',message:'请输入正确的邮箱地址',trigger:'blur,change' }
          ],
          mobile:[
            {required:true,message:'电话不能为空'}
          ]
      }     
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
         this.loading=true
      getUserList({params:{query:this.query,pagenum:this.pagenum,pagesize:this.pagesize}}).then(res=>{
        this.userList=res.data.users
        this.total = res.data.total
        this.loading=false
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
    },
    //添加用户
    addUserSubmit(formName){
      this.$refs[formName].validate(valide=>{
        if(valide){
          //执行添加用户方法
          addUsers(this.addForm).then(res=>{
           if(res.meta.status==201){
          this.$message({
            type:'success',
            message:res.meta.msg       
          })
          this.addDialogFormVisible=false
          this.initList()
        }else{       
          this.$message({
            type:'warning',
            message:res.meta.msg       
          })
        }  
          })
           
        }
      })
  },
  addUserNull(addForm){
    this.addDialogFormVisible=true
        console.log(111)
        this.addForm.username = ''
        this.addForm.password = ''
        this.addForm.email = ''
        this.addForm.mobile = ''
  },
  //显示编辑对话框
    showEditDialog(row) {
      this.editDialogFormVisible = true
      console.log(row)
      getUsers(row.id).then(res => {
        console.log(res)
        if (res.meta.status === 200) {
          this.editForm = res.data
        }

      })
    },
    eddUserSubmit(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          editUsers(this.editForm).then(res => {
            console.log(res)
            if (res.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.meta.msg
              })
              this.editDialogFormVisible = false
              this.initList()
            } else {
              this.$message({
                type: 'warning',
                message: res.meta.msg
              })
            }
          })
        }
    })
  },
  //显示删除对话框
    showDeleteDialog(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //执行删除用户操作
        deleteUser(row.id).then(res => {
          if (res.meta.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.initList()
          }
        })
        
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
  //显示分配角色对话框
    showGrantDialog(row) {
      this.grantForm=row
      console.log(row)
      console.log(this.roleId)
      this.grantDialogFormVisible=true
      getRoleList().then(res=>{
        console.log(res)
        if(res.meta.status===200){
          this.roleList=res.data
        }
      })
    },
  
  //分配角色
    grantUserSubmit(){
      if(!this.roleId){
          this.$message({
            type:'warning',
            message:'角色不能为空，请选择！'
          })
        } else {
          grantRoleList({ id: this.grantForm.id, rid: this.roleId }).then(res => {
            console.log(res)
            if (res.meta.status == 200) {
              this.$message({
                type: 'success',
                message: '设置角色成功'
              })
              this.grantDialogFormVisible = false
            } else {
              this.$message({
                type: 'error',
                message: res.meta.msg
              })
          }
        })
        }
     
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

