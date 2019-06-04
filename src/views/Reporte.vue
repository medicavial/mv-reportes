<template>
    <div class="reporte">
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

        <div class="fixed-action-btn">
        <a class="btn-floating btn-large red">
            <i class="mdi mdi-menu"></i>
        </a>
        <ul>
            <li><a class="btn-floating mv-blue" @click="regresar('inicio')"><i class="mdi mdi-home"></i></a></li>
            <li><a  class="btn-floating"
                    :class="{'cyan darken-1':       rutaPermiso === 'particulares', 
                            'orange darken-1':      rutaPermiso === 'insumos',
                            'light-green darken-1': rutaPermiso === 'operativo' }"
                    @click="regresar(rutaPermiso)">
                    <i class="mdi mdi-arrow-left"></i>
                </a>
            </li>
        </ul>
        </div>

    </div>
</template>

<script>
import AuthService from '@/services/authService'
import ApiService from '@/services/apiService'

export default {
    name: 'reporte',
    data() {
      return {
          userData: AuthService.userData(),
          rutaPermiso: this.$route.path.split('/')[1],
          screen: {}
      }
    },
    beforeCreate() {
      let permisos = AuthService.userData().permisos;
      let permitido = ( permisos.includes( this.rutaPermiso ) || permisos.includes('admin') ) ? true : false;
      
      let avisoDenegado = `<span><i class="mdi mdi-cancel"></i> Acceso denegado</span>`;
      if ( !permitido ) {
        M.toast({ html: avisoDenegado, classes: 'red' })
        return this.regresar('inicio');
      }
    },
    beforeMount(){
        this.getReporteID( this.userData, this.$route.params.id );
    },
    mounted() {
        M.AutoInit();
        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight - ( window.innerHeight * 0.08 )
        }
    },
    methods:{
        regresar( ruta ){
            this.$router.push(`/${ruta}`);
        },
        idErroneo( message ){
            let avisoIncorrecto = `<span><i class="mdi mdi-cancel"></i> ${message}</span>`;
            
            M.toast({ html: avisoIncorrecto , classes: 'red' })

            this.$router.push(`/${this.rutaPermiso}`);
        },
        async getReporteID( usuario, id ){
            await ApiService.getReporte( usuario, id )
                            .then(res => {
                                console.log(res)
                                if (!res.ok) this.idErroneo( res.message );
                                this.incrustaReporte( res.data );
                            });
        },
        incrustaReporte( data ){
            let loadingIcon = document.getElementById('loading-icon');
            let frameContainer = document.getElementById('frameContainer');

            let codigo = data.REP_codigo.replace('DEVICEWIDTH', `"${this.screen.width}"`);
            codigo = codigo.replace('DEVICEHEIGHT', `"${this.screen.height}"`);

            let idFrame = 'id="frame-content"'
            let start = codigo.substr( 0, codigo.search('src') )
            let finish = codigo.substr( codigo.search('src')  )
            
            let codigoNuevo = `${start} ${idFrame} ${finish}`;
            console.log(codigoNuevo);
            
            frameContainer.innerHTML = codigoNuevo;
            codigoNuevo = null;

            let frameContent = document.getElementById('frame-content');
            frameContent.onload = () => {
                frameContent.classList.add('animated', 'fadeIn', 'fast');
                loadingIcon.classList.add('animated', 'fadeOut','fast', 'hide')
                loadingIcon.parentNode.removeChild(loadingIcon)
            }
        }
    }
}
</script>