<template>
  <div class="home">
    <div class="section animated fadeIn fast">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="card mouse-default">
              <div class="card-content grey-text text-darken-3">
                <span class="flow-text">
                  Bienvenido <strong>{{ userData.fullName }}</strong>
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

        <div class="row">
          <div  class="col s12 m6 l4"
                v-if="userData.permisos.includes( 'particulares')">
            <div  class="card cyan darken-1 white-text waves-effect waves-light hoverable mouse-select"
                  style="width:100%"
                  @click="irReporte('particulares')">
              <div class="card-content">
                <span class="card-title">
                  Reporte general
                </span>
                <p> PARTICULARES </p>
              </div>
            </div>
          </div>

          <div  class="col s12 m6 l4"
                v-if="userData.permisos.includes( 'insumos')">
            <div  class="card orange darken-1 white-text waves-effect waves-light hoverable mouse-select"
                  style="width:100%"
                  @click="irReporte('insumos')">
              <div class="card-content">
                <span class="card-title">
                  Flujo AIG
                </span>
                <p> INSUMOS </p>
              </div>
            </div>
          </div>

          <div  class="col s12 m6 l4"
                v-if="userData.permisos.includes( 'operativo' )">
            <div  class="card light-green darken-1 white-text waves-effect waves-light hoverable mouse-select"
                  style="width:100%"
                  @click="irReporte('operativo')">
              <div class="card-content">
                <span class="card-title">
                  Reporte operativo
                </span>
                <p> OPERATIVO </p>
              </div>
            </div>
          </div>
        </div>

        <hr>
        Aqui vamos a probar datos dinamicos

        <div class="row">
          <div  class="col s12 m6 l4" 
                v-for="reporte in listadoReportes" 
                :key="reporte.REP_id">
            <div  class="card card-extended white-text waves-effect waves-light hoverable mouse-select"
                  :class="{ 'cyan darken-1':    reporte.REP_permiso === 'particulares', 
                            'orange darken-1':  reporte.REP_permiso === 'insumos',
                            'light-green darken-1': reporte.REP_permiso === 'operativo' }"
                  @click="irReporte(reporte.REP_permiso, reporte.REP_id)">
              <div class="card-content">
                <span class="card-title"> {{ reporte.REP_nombre }} </span>
                <p> {{ reporte.REP_permiso.toUpperCase() }} </p>
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

export default {
  name: 'home',
  data() {
    return {
      userData: null,
      listadoReportes: []
    }
  },
  components: {},
  beforeMount(){
    this.userData = AuthService.userData();
    this.getReportesUsuario( this.userData.permisos );
  }, 
  methods: {
    // irReporte(ruta){
    //   this.$router.push(`/${ ruta }`);
    // },
    irReporte(permiso,id){
      console.log(permiso,id);
      
      this.$router.push(`/${ permiso }/${ id }`);
    },
    getReportesUsuario( permisos ){
      console.log(permisos);
      ApiService.reportesPermitidos(permisos)
        .then(res => this.listadoReportes = res);
    }
  }
}
</script>
