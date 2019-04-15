//第二步，在src目录下创建store.js 文件夹
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
    username: ''
}
const mutations = {
    userName: (state, username) => {
        state.username = username
        localStorage.setItem('userName', username)
    }
}
const actions = {}
const getters = {
    username: (state) => localStorage.getItem('username')
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})