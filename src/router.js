import Vue from 'vue'
import Router from 'vue-router'
import AuthService from '@/services/authService';

Vue.use(Router)

const router = new Router({
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
      name: 'insumosRep',
      component: () => import(/* webpackChunkName: "reporte" */ './views/Reporte.vue')
    },
    {
      path: '/operativo',
      name: 'operativo',
      component: () => import(/* webpackChunkName: "operativo" */ './views/Operativo.vue')
    },
    {
      path: '/operativo/:id',
      name: 'operativoRep',
      component: () => import(/* webpackChunkName: "reporte" */ './views/Reporte.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/Admin.vue'),
      meta: {
        onlyAdmin: true
      }
    },
    {
      path: '/admin/usuarios',
      name: 'usuarios',
      component: () => import(/* webpackChunkName: "usuarios" */ './views/Usuarios.vue'),
      meta: {
        onlyAdmin: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let isAutenticated = AuthService.checkSession();
  let onlyAdmin = to.matched.some( route => route.meta.onlyAdmin );
  
  if (isAutenticated){
    let userData = AuthService.userData();
    let isAdmin = userData.permisos.some(permiso => permiso === 'administrador' )

    if( onlyAdmin && !isAdmin ){
      next('home');
    }

    if (onlyAdmin && isAdmin) {
      next();
    }
  }

  next();
})

export default router;