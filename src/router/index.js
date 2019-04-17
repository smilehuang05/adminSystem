import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Welcome from '@/views/welcome/Welcome'
import User from '@/views/user/User'
import Rights from '@/views/rights/Rights'
import Roles from '@/views/roles/Roles'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: { path: '/welcome' },
            children: [{
                    path: 'welcome',
                    name: 'Welcome',
                    component: Welcome
                },
                {
                    path: 'user',
                    name: 'User',
                    component: User
                },
                {
                    path: 'rights',
                    name: 'Rights',
                    component: Rights
                },
                {
                    path: 'roles',
                    name: 'Roles',
                    component: Roles
                }
            ]
        }
    ]
})