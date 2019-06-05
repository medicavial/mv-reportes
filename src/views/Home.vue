<template>
  <div class="home">
    <div class="section animated fadeIn fast">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="card mouse-default">
              <div class="card-content grey-text text-darken-3">
                <span class="flow-text">
                  Bienvenido <strong>{{ userData.USU_nombre }} {{ userData.USU_paterno }} {{ userData.USU_materno }} </strong>
                </span>

                <p v-if="!userData.permisos.includes('admin')">
                  Permisos:
                  <span v-for="permiso in userData.permisos" :key="permiso">
                    {{ permiso.toUpperCase() }}
                  </span>
                </p>

                <p class="orange-text text-darken-3">
                  <i class="mdi mdi-alert"></i> Sistema en desarrollo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row" v-if="userData.permisos.includes('admin')">
          <div class="col s12 m6 l4 animated fadeIn">
            <div class="card card-extended purple white-text waves-effect waves-light hoverable mouse-select"
                 @click="irAdminPanel">
              <div class="card-content">
                <span class="card-title"> ADMINISTRACIÓN </span>
              </div>
            </div>
          </div>

          <div class="col s12">
            <div class="divider"></div>
          </div>
        </div>

        <LoadingComponent v-if="isLoadingData" />

        <div class="row animated fadeIn fast">
          <div class="col s12" v-if="listadoReportes.length > 0">
            <h5>Reportes por categoría:</h5>
          </div>

          <div  class="col s12 m6 l4 animated fadeIn fast" 
                v-for="reporte in listadoReportes" 
                :key="reporte.REP_id">
            <div  class="card card-extended white-text waves-effect waves-light hoverable mouse-select"
                  :class="{ 'cyan darken-1':        reporte.REP_permiso === 'particulares', 
                            'orange darken-1':      reporte.REP_permiso === 'insumos',
                            'light-green darken-1': reporte.REP_permiso === 'operativo' }"
                  @click="irReporte(reporte.REP_permiso)">
              <div class="card-content">
                <span class="card-title"> {{ reporte.REP_permiso.toUpperCase() }} </span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ApiService from '@/services/apiService'
import AuthService from '@/services/authService'
import LoadingComponent from '@/components/LoadingComponent.vue';

export default {
  name: 'home',
  components: {
    LoadingComponent
  },
  data() {
    return {
      userData: null,
      listadoReportes: [],
      isLoadingData: false,
    }
  },
  beforeMount(){
    this.userData = AuthService.userData();
    this.getReportesUsuario( this.userData.permisos );
  }, 
  mounted(){},
  methods: {
    irAdminPanel(){
      this.$router.push(`/admin`);
    },
    irReporte(permiso,id){
      this.$router.push(`/${ permiso }`);
    },
    getReportesUsuario( permisos ){
      this.isLoadingData = true;

      ApiService.reportesPermitidos(permisos)
        .then(res => {
          this.listadoReportes = res;
          this.isLoadingData = false;
        });
    }
  }
}
</script>
