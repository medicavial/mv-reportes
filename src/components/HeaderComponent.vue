<template>
    <div>
        <NavbarComponent :routes="routes"></NavbarComponent>
        <SidenavComponent :routes="routes"></SidenavComponent>
    </div>

</template>


<script>
    // @ is an alias to /src
    import NavbarComponent from '@/components/navigation/NavbarComponent.vue';
    import SidenavComponent from '@/components/navigation/SidenavComponent.vue';
    import Router from '@/router.js';
    import AuthService from '@/services/authService'

    // console.log(Router.currentRoute.name);

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
                // navVisible
                // renderComponent: false
            }
        },
        watch: {
            '$route' (to, from) {
                // console.log(this.checkSession())
                if (to.name === 'login' && this.checkSession() ) {
                    this.$router.push('/inicio');
                    // this.checkSession();
                    this.forceRender();
                }
                if (to.name !== 'login' && !this.checkSession() ) {
                     this.$router.push('/');
                    //  this.checkSession();
                     this.forceRender();
                }
            }
        },
        methods: {
            checkSession(){
                return AuthService.checkSession();
            },
            // forceRender(){
            //     this.renderComponent = true;

            //     this.$nextTick(() => {
            //         // Add the component back in
            //         // this.renderComponent = true;
            //         this.renderComponent = this.checkSession();
            //     });
            // }
        }
    }
</script>