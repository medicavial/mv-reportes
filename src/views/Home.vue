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
                v-if="userData.permisos.includes( 'particulares') || userData.permisos.includes( 'admin')">
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
                v-if="userData.permisos.includes( 'insumos') || userData.permisos.includes( 'admin')">
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
                v-if="userData.permisos.includes( 'operativo') || userData.permisos.includes( 'admin')">
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
      userData: null
    }
  },
  components: {},
  beforeMount(){
    this.userData = AuthService.userData();
  }, 
  methods: {
    irReporte(ruta){
      this.$router.push(`/${ ruta }`);
    }
  }
}
</script>
