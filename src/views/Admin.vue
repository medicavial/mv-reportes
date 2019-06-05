<template>
    <div class="admin">
        En desarrollo
        <BtnHomeFiexedComponent />
    </div>
</template>

<script>
import AuthService from '@/services/authService';
import BtnHomeFiexedComponent from '@/components/BtnHomeFixedComponent.vue';

export default {
    name: 'admin',
    components: {
        BtnHomeFiexedComponent
    },
    data() {
        return {
            userData: null,
            isLoadingData: false,
            permiso: 'admin'
        }
    },
    beforeCreate() {
      let permisos = AuthService.userData().permisos;
      let permitido = ( permisos.includes('admin') ) ? true : false;

      if ( !permitido ) {
        M.toast({html: `<span><i class="mdi mdi-cancel"></i> Acceso denegado</span>`,
                 classes: 'red'})

        this.$router.push('/inicio');
      }
    },
    created(){},
    beforeMount() {},
    mounted() {},
    methods:{

    }
}
</script>