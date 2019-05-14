<template>
    <div class="navbar-fixed">
        <nav class="mv-blue">
        <div class="nav-wrapper container">
            <router-link to="/" class="brand-logo">
            <img src="@/assets/logos/logo.png" alt="MedicaVial Logo" style="height: 40px; margin-top: 6%"/>
            </router-link>

            <a data-target="mobile-menu" class="left sidenav-trigger"><i class="mdi mdi-menu"></i></a>
            
            <ul class="right hide-on-med-and-down">
                <li class="waves-effect waves-light opt-menu">
                    <router-link to="/">Login</router-link>
                </li>
                <li class="waves-effect waves-light opt-menu">
                    <router-link to="/inicio">Inicio</router-link>
                </li>
                <li class="waves-effect waves-light opt-menu">
                    <router-link to="/particulares">Particulares</router-link>
                </li>

                <li class="waves-effect waves-light opt-menu" @click="logout()">
                    <a href="javascript:;">Cerrar Sesión</a>
                </li>
            </ul>
        </div>
        </nav>
    </div>

</template>

<script>
import AuthService from '@/services/authService'
import Router from '@/router.js';

export default {
    props: ['routes'],
    computed: {},
    mounted(){
        // console.log(this.routes)
    },
    methods:{
        logout(){
            AuthService.logout();
            
            return this.$router.push('/');
        }
    }
}
</script>