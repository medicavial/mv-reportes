<template>
  <!-- LA APLICACION VA DENTRO DEL #APP -->
  <div id="app">
    <header>
      <!-- <div id="nav">
        <router-link to="/">Login</router-link> |
        <router-link to="/inicio">Inicio</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->
      <HeaderComponent></HeaderComponent>
    </header>
    
    <main>
      <router-view/>
    </main>

    <footer>

    </footer>

    <!-- ACA SE CARGAN LAS VISTAS -->
  </div>
</template>

<style>
  @import './assets/css/styles.css';
</style>

<script>
  import HeaderComponent from '@/components/HeaderComponent.vue'

  export default {
    components: {
      HeaderComponent
    },
    mounted() {
      M.AutoInit();
    },
    data() {
      return {
        
      }
    },
    methods: {}
  }
</script>