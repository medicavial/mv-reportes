<template>
  <!-- LA APLICACION VA DENTRO DEL #APP -->
  <div id="app">
    <header>
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