<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content grey-text text-darken-3">
                <span class="card-title">
                  Bienvenido <strong>{{ userData.fullName }}</strong>
                </span>

                <p class="orange-text text-darken-3">
                  <i class="mdi mdi-alert"></i> Sistema en desarrollo
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12 m4 l3">
            <div class="card mv-blue white-text hoverable mouse-select" @click="irReporte">
              <div class="card-content">
                <span class="card-title">
                  Reporte 1
                </span>
              </div>
            </div>
          </div>

          <div class="col s12 m4 l3">
            <div class="card mv-blue white-text hoverable mouse-select" @click="irReporte">
              <div class="card-content">
                <span class="card-title">
                  Reporte 2
                </span>
              </div>
            </div>
          </div>

          <div class="col s12 m4 l3">
            <div class="card mv-blue white-text hoverable mouse-select" @click="irReporte">
              <div class="card-content">
                <span class="card-title">
                  Reporte 3
                </span>
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
import HelloWorld from '@/components/HelloWorld.vue'
import ApiService from '@/services/apiService'
import AuthService from '@/services/authService'

export default {
  name: 'home',
  data() {
    return {
      userData: null
    }
  },
  components: {
    HelloWorld
  },
  beforeMount(){
    this.userData = AuthService.userData();
  }, 
  methods: {
    irReporte(){
      this.$router.push('/particulares');
    }
  }
}
</script>
