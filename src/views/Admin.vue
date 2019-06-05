<template>
    <div class="admin">
        <div class="container">
            <div class="row">

                <div class="col s12 m6 l4">
                    <div class="card card-extended blue-grey darken-4 white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         v-if="!isLoading.permisos"
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Usuarios
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col s12 m6 l4">
                    <div class="card card-extended blue-grey darken-4 white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         v-if="!isLoading.permisos"
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Permisos
                            </span>
                        </div>
                    </div>
                </div>

                <!-- <div class="col s12 m6 l4">
                    <div class="card card-extended pink darken-4 white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         v-if="!isLoading.permisos"
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Permisos por usuario
                            </span>
                        </div>
                    </div>
                </div> -->
            </div>

            <tblUsuariosComponent :listadoUsuarios="listadoUsuarios" />
        </div>
        <BtnHomeFiexedComponent />

        <!-- <MdlPermisosComponent :listadoPermisos='listadoPermisos'/> -->
    </div>
</template>

<script>
import BtnHomeFiexedComponent from '@/components/BtnHomeFixedComponent.vue';
import LoadingComponent from '@/components/LoadingComponent.vue';
import tblUsuariosComponent from '@/components/admin/tblUsuariosComponent.vue'
import MdlPermisosComponent from '@/components/admin/MdlPermisosComponent.vue'
import AuthService from '@/services/authService';
import ApiService from '@/services/apiService';

export default {
    name: 'admin',
    components: {
        BtnHomeFiexedComponent,
        LoadingComponent,
        tblUsuariosComponent
    },
    data() {
        return {
            userData: null,
            isLoading: {
                permisos: false,
                usuarios: false
            },
            permiso: 'admin',
            listadoPermisos: null,
            listadoUsuarios: null
        }
    },
    beforeCreate() {
      let permisos = AuthService.userData().permisos;
      let permitido = ( permisos.includes('admin') ) ? true : false;

      if ( !permitido ) {
        M.toast({html: `<span><i class="mdi mdi-cancel"></i> Acceso denegado</span>`,
                 classes: 'red'})

        this.$router.push('/inicio');
      }
    },
    created(){},
    beforeMount() {
        this.getListaPermisos();
        this.getUsuariosXsistema()
    },
    mounted() {},
    methods:{
      async getListaPermisos(){
        this.isLoading.permisos = true;

        await ApiService.getPermisos()
          .then(res => {
                this.isLoading.permisos = false;
                this.listadoPermisos = res.data;
          });
      },
      async getUsuariosXsistema(){
        this.isLoading.usuarios = true;

        await ApiService.getUsuariosXsistema()
          .then(res => {
                this.isLoading.usuarios = false;
                this.listadoUsuarios = res.data;
          });
      },
      abrirGestionPermisos(){
            var mdlPermisos = document.querySelector('#mdl-permisos');

            var instance = M.Modal.getInstance(mdlPermisos);
            instance.open();
      }
    }
}
</script>