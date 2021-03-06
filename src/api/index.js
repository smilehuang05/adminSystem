import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

//添加请求拦截器
axios.interceptors.request.use(function(config) {
    //将token给到一个前后台约定好的key中，作为请求发送
    let token = localStorage.getItem('myToken')
    if (token) {
        config.headers['Authorization'] = token
    }
    return config;
}, function(error) {
    return Promise.reject(error);
})

//登录验证
export const checkUser = params => {
    return axios.post('login', params).then(res => res.data)
}

//获取用户列表
export const getUserList = params => {
    return axios.get('users', params).then(res => res.data)
}

//修改用户状态
export const changeUserState = params => {
    return axios.put(`users/${params.uid}/state/${params.type}`).then(res => res.data)
}

//添加用户
export const addUsers = params => {
    return axios.post('users', params).then(res => res.data)
}

//根据ID获取用户信息
export const getUsers = params => {
    return axios.get(`users/${params}`).then(res => res.data)
}

//编辑用户信息
export const editUsers = params => {
    return axios.put(`users/${params.id}`, params).then(res => res.data)
}

//删除单个用户
export const deleteUser = params => {
    return axios.delete(`users/${params}`).then(res => res.data)
}

//获取角色列表
export const getRoleList = params => {
    return axios.get('roles').then(res => res.data)
}

//分配角色列表
export const grantRoleList = params => {
    return axios.put(`users/${params.id}/role`, { id: params.id, rid: params.rid }).then(res => res.data)
}

//获取所有权限列表
export const getRightsList = params => {
    return axios.get(`rights/${params.type}`).then(res => res.data)
}

//删除角色指定权限
export const deleteRoleRight = params => {
    return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`).then(res => res.data)
}