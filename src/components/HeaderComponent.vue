<template>
    <div>
        <NavbarComponent 
            :routes="routes" 
            v-if="navVisible" 
            v-on:changeStatus="checkSession()" />

        <SidenavComponent 
            :routes="routes" 
            v-if="navVisible" 
            v-on:changeStatus="checkSession()" />
    </div>

</template>


<script>
    // @ is an alias to /src
    import NavbarComponent from '@/components/navigation/NavbarComponent.vue';
    import SidenavComponent from '@/components/navigation/SidenavComponent.vue';
    import Router from '@/router.js';
    import AuthService from '@/services/authService'


    export default {
        name: 'Header',
        components: {
            NavbarComponent,
            SidenavComponent
        },
        data() {
            return {
                routes : Router.options.routes,
                currentRoute: Router.currentRoute.name,
                navVisible: false
            }
        },
        watch: {
            '$route' (to, from) {
                if (to.name === 'login' && this.checkSession() ) {
                    this.$router.push('/inicio');
                }
                if (to.name !== 'login' && !this.checkSession() ) {
                     this.$router.push('/');
                }
            }
        },
        methods: {
            checkSession(){
                return this.navVisible = AuthService.checkSession() ? true : false;
            },
        }
    }
</script>