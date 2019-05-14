<template>
    <ul class="sidenav" id="mobile-menu">
    <li><a>UNIDADES MÉDICAVIAL</a></li>
    <div class="divider"></div>
        <li>
            <router-link to="/" class="waves-effect sidenav-close">
                <i class="mdi mdi-home mdi-24px"></i>Inicio
            </router-link>
        </li>

        <li>
            <!-- <router-link to="unidades" class="waves-effect sidenav-close"> -->
            <a href="javascript:;" @click="logout()">
                <i class="mdi mdi-hospital-building mdi-24px"></i>Cerrar Sesión
            </a>
            <!-- </router-link> -->
        </li>
    </ul>
</template>

<script>
import AuthService from '@/services/authService'

export default {
    // props: ['routes'],
    computed: {},
    mounted(){
        M.AutoInit();
    },
    methods:{
        logout(){
            AuthService.logout();
            
            return this.$router.push('/');
        }
    }
}
</script>