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
import ApiService from '@/services/apiService'

export default {
    name: 'operativo',
    data() {
      return {
        userData: null,
        screen: {
          width: window.innerWidth,
          height: window.innerHeight - ( window.innerHeight * 0.08 )
        }
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
    beforeMount() {
      this.getReporte();
    },
    mounted() {
      let frameContainer = document.getElementById('frameContainer');
      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight - ( window.innerHeight * 0.08 )
      }
    },
    methods: {
      async getReporte(){
        await ApiService.reportesUsuario()
                .then(res => this.renderFrame( res ));
      },

      renderFrame( data ){
        console.log(data[0].REP_codigo);
        let codigo = data[0].REP_codigo.replace('DEVICEWIDTH', `"${this.screen.width}"`);
        codigo = codigo.replace('DEVICEHEIGHT', `"${this.screen.height}"`);

        frameContainer.innerHTML = codigo;

        console.log(codigo);
      }

    }
}
</script>