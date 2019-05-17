<template>
    <ul class="sidenav" id="mobile-menu">
    <li><a>REPORTES MÉDICAVIAL</a></li>
    <div class="divider"></div>
        <li>
            <router-link to="/" class="waves-effect sidenav-close">
                <i class="mdi mdi-home mdi-24px"></i>Inicio
            </router-link>
        </li>

        <li>
            <a  href="javascript:;"
                @click="logout()"
                class="waves-effect sidenav-close">
                <i class="mdi mdi-logout mdi-24px"></i>Cerrar Sesión
            </a>
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
            this.$router.push('/');
            return window.close();
        }
    }
}
</script>