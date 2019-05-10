<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <button @click="login()"> POST </button>
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
