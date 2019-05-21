<template>
  <div class="particulares">
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

export default {
    name: 'particulares',
    data() {
      return {
        userData: null
      }
    },
    beforeCreate() {
      let permisos = AuthService.userData().permisos;
      let permitido = ( permisos.includes('particulares') || permisos.includes('admin') ) ? true : false;

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
                              src="https://analytics.zoho.com/open-view/1945768000000340508/0c979cab04c16b3763b3cd1f176b6f96">
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
}
</script>