<template>
  <div class="login">
    <div class="section">
      <div class="container">
        <div class="row">
          <div class="col s12 m8 offset-m2 l6 offset-l3">
            <div class="card">
              <div class="card-header mv-blue white-text">
                <div class="section">
                  <div class="container">
                    <div class="row no-margin-bottom">
                      <div class="col s6 offset-s3 m6 offset-m3 valign-wrapper">
                        <img  src="@/assets/logos/logo.png" 
                              alt="Medicavial logo"
                              class="responsive-img">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card-content">
                <span class="grey-text text-darken-1">
                  <i class="mdi mdi-lightbulb-on-outline"></i>
                  Ingresa con tu usuario y contraseña.
                </span>

                <div class="section">
                  <div class="container">
                    <div class="row">
                      <div class="input-field col s12">
                        <i class="mdi mdi-account prefix blue-grey-text text-darken-1"></i>
                        <input  id="username" type="text"
                                autocomplete="off"
                                v-model="credentials.usr">
                                <!-- @keyup="prueba()" -->
                        <label for="username">USUARIO</label>
                      </div>

                      <div class="input-field col s12">
                        <i class="mdi mdi-key prefix blue-grey-text text-darken-1"></i>
                        <input  id="password" type="password"
                                autocomplete="off"
                                v-model="credentials.pwd">
                        <label for="password">CONTRASEÑA</label>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col s12 center">
                        <label>
                          <input  type="checkbox" 
                                  class="filled-in"
                                  v-model="credentials.rem"/>
                          <span>Recordar usuario</span>
                        </label>
                      </div>
                    </div>

                    <div class="row">
                        <button class="col s12 m10 offset-m1 l8 offset-l2 btn mv-blue waves-effect waves-light"
                                @click="loginAttempt()">
                          Ingresar
                        </button>
                    </div>

                    <div class="row no-margin-bottom hide">
                      <div class="col s12 right-align">
                        <small>
                          <a href="javascript:;" class="grey-text">
                            <i class="mdi mdi-lock-reset"></i> Recuperar contraseña
                            </a>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from '@/services/apiService'
import AuthService from '@/services/authService'
import Router from '@/router.js';

export default {
    name: 'login',
    mounted() {},
    data() {
      return {
        credentials: {
          usr: null,
          pwd: null,
          rem: false,
        }
      }
    },
    methods: {
      async loginAttempt(){
        await ApiService.login( this.credentials )
              .then( res => {
                if ( !res || res.length !== 1 ) return alert('Datos incorrectos');
                
                let resAuth = AuthService.auth( res[0], this.credentials.rem );

                this.$router.push('/inicio');
              });
      }
    }
}
</script>