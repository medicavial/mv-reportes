<template>
  <div class="operativo">
    <div id="loading-icon">
      <div class="row valing-wrapper">
        <div class="col s12 center grey-text">
          <i class="mdi mdi-settings mdi-48px mdi-spin"></i>
          <br>
          Cargando...
        </div>
      </div>
    </div>

    <div id="frameContainer"></div>
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
        // screen: {
        //   width: window.innerWidth,
        //   height: window.innerHeight - ( window.innerHeight * 0.08 )
        // }
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
      let loadingIcon = document.getElementById('loading-icon');
      let frameContainer = document.getElementById('frameContainer');

      let sizes = {
        width: window.innerWidth,
        height: window.innerHeight - ( window.innerHeight * 0.08 )
      }

      let dataFrame= `<iframe frameborder=0 
                              width="${ sizes.width }" 
                              height="${ sizes.height }" 
                              id="frame-content"
                              src="https://analytics.zoho.com/open-view/1945768000000599912/8907dbc43e8c5ee98ed371f8736f80a2">
                      </iframe>`;

      frameContainer.innerHTML = dataFrame;
      dataFrame = null;

      let frameContent = document.getElementById('frame-content');

      frameContent.onload = () => {
        frameContent.classList.add('animated', 'fadeIn', 'fast');
        loadingIcon.classList.add('animated', 'fadeOut','fast', 'hide')
        loadingIcon.parentNode.removeChild(loadingIcon)
      }
    }
    // beforeMount() {
    //   this.getReporte();
    // },
    // mounted() {
    //   let frameContainer = document.getElementById('frameContainer');
    //   let sizes = {
    //     width: window.innerWidth,
    //     height: window.innerHeight - ( window.innerHeight * 0.08 )
    //   }
    // },
    // methods: {
    //   async getReporte(){
    //     await ApiService.reportesUsuario()
    //             .then(res => this.renderFrame( res ));
    //   },

    //   renderFrame( data ){
    //     console.log(data[0].REP_codigo);
    //     let codigo = data[0].REP_codigo.replace('DEVICEWIDTH', `"${this.screen.width}"`);
    //     codigo = codigo.replace('DEVICEHEIGHT', `"${this.screen.height}"`);

    //     frameContainer.innerHTML = codigo;

    //     console.log(codigo);
    //   }

    // }
}
</script>