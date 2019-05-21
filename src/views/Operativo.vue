<template>
  <div class="operativo" id="frameContainer">
    <div class="row valing-wrapper">
      <div class="col s12 center grey-text">
        <i class="mdi mdi-settings mdi-48px mdi-spin"></i>
        <p>Sin datos</p>

        <p>
          <router-link to="/" class="btn btn-large purple waves-effect waves-light">
            <span><i class="mdi mdi-arrow-left"></i> Regresar</span>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/authService'

export default {
    name: 'operativo',
    data() {
      return {
        userData: null
      }
    },
    beforeCreate() {
      let permisos = AuthService.userData().permisos;
      let permitido = ( permisos.includes('operativo') || permisos.includes('admin') ) ? true : false;

      if ( !permitido ) {
        M.toast({html: `<span><i class="mdi mdi-cancel"></i> Acceso denegado</span>`,
                 classes: 'red'})

        this.$router.push('/inicio');
      }
    },
    mounted() {
      let frameContainer = document.getElementById('frameContainer');
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight - ( window.innerHeight * 0.08 )
      }
    }
}
</script>