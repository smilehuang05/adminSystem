// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import '../src/styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/iconfont/iconfont.css';


Vue.use(ElementUI);

Vue.config.productionTip = false

//注册一个路由全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他页面去
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('myToken')
    if (token) {
        //如果已经登录，那我干涉你，随便你访问
        next()
    } else {
        if (to.path !== '/login') {
            //如果没有登录，但你访问的是其他需要登录的页面，那我就让你条到登录页面去
            next({ path: '/login' })
        } else {
            //如果没有登录，访问的是login，那就不干涉，让你访问
            next()
        }
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})