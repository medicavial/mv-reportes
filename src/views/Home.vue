<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col s12">
            <div class="card">
              <div class="card-content">
                <span class="card-title">
                  Bienvenido Fulanito
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col s12 m4 l3">
            <div class="card purple white-text">
              <div class="card-content">
                <span class="card-title">
                  Reporte 1
                </span>
              </div>
            </div>
          </div>

          <div class="col s12 m4 l3">
            <div class="card purple white-text">
              <div class="card-content">
                <span class="card-title">
                  Reporte 2
                </span>
              </div>
            </div>
          </div>

          <div class="col s12 m4 l3">
            <div class="card purple white-text">
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

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  beforeMount(){
    this.pruebaGET();
  }, 
  methods: {
    async pruebaGET(){
      await ApiService.pruebaGET().then( res => console.log(res) );
    },

    async login(){
      await ApiService.login().then( res => console.log(res) );
    }
  }
}
</script>
