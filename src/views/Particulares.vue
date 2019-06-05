<template>
  <div class="particulares">

    <div class="container">
      <div class="row">
        <div class="col s12">
          <div class="card card-extended">
              <div class="card-content">
                <span class="card-title">
                  <strong>Reportes de particulares</strong>
                </span>
              </div>
          </div>
        </div>

        <div class="col s12 m6 l4" v-for="reporte in listadoReportes" :key="reporte.REP_id">
          <div class="card card-extended cyan darken-1 white-text waves-effect waves-light hoverable mouse-select animated fadeIn"
               @click="verReporte( reporte.REP_id )">
            <div class="card-content">
              <span class="card-title">
                {{ reporte.REP_nombre }}
              </span>
              <p> {{ reporte.REP_permiso.toUpperCase() }} </p>
            </div>
          </div>
        </div>

      </div>
    </div>

    <LoadingComponent v-if="isLoadingData" />

    <BtnHomeFiexedComponent />

  </div>
</template>

<script>
import AuthService from '@/services/authService'
import ApiService from '@/services/apiService'
import BtnHomeFiexedComponent from '@/components/BtnHomeFixedComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
    name: 'particulares',
    components: {
      BtnHomeFiexedComponent,
      LoadingComponent
    },
    data() {
      return {
        userData: null,
        isLoadingData: false,
        permiso: 'particulares',
        listadoReportes: null
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
    created(){},
    beforeMount() {
      this.getReportesPermiso( this.permiso );
    },
    mounted(){},
    methods: {
      async getReportesPermiso( permiso ){
        this.isLoadingData = true;

        await ApiService.reportesPermiso(permiso)
          .then(res => {
            this.listadoReportes = res.data;
            this.isLoadingData = false;
          });
      },
      verReporte( id ){
        console.log(id);
        this.$router.push(`/${this.permiso}/${id}`);
      }
    }
}
</script>