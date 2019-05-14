import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //definimos unn default para cuando se intenta acceder a una ruta inexistente
    { path: '*', redirect: { name: 'login' } },
    {
      path: '/',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue')
    },
    {
      path: '/inicio',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue')
    },
    {
      path: '/particulares',
      name: 'particulares',
      component: () => import(/* webpackChunkName: "particulares" */ './views/Particulares.vue')
    }
  ]
})
