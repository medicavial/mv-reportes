<template>

    <div>
    <NavbarComponent></NavbarComponent>
    <SidenavComponent></SidenavComponent>
    </div>

</template>


<script>
    // @ is an alias to /src
    import NavbarComponent from '@/components/navigation/NavbarComponent.vue';
    import SidenavComponent from '@/components/navigation/SidenavComponent.vue';

    export default {
        name: 'Header',
        components: {
            NavbarComponent,
            SidenavComponent
        },
    }
</script>