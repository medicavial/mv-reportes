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
      component: () => import(/* webpackChunkName: "home" */ './views/Home.vue'),
      // meta: { requiresAuth: true }
    },

    {
      path: '/particulares',
      name: 'particulares',
      component: () => import(/* webpackChunkName: "particulares" */ './views/Particulares.vue')
    },
    {
      path: '/particulares/:id',
      name: 'particularesRep',
      component: () => import(/* webpackChunkName: "reporte" */ './views/Reporte.vue')
    },
    {
      path: '/insumos',
      name: 'insumos',
      component: () => import(/* webpackChunkName: "insumos" */ './views/Insumos.vue')
    },
    {
      path: '/insumos/:id',
      name: 'insumos',
      component: () => import(/* webpackChunkName: "reporte" */ './views/Reporte.vue')
    },
    {
      path: '/operativo',
      name: 'operativo',
      component: () => import(/* webpackChunkName: "operativo" */ './views/Operativo.vue')
    },
    {
      path: '/operativo/:id',
      name: 'operativo',
      component: () => import(/* webpackChunkName: "reporte" */ './views/Reporte.vue')
    }
  ]
})
