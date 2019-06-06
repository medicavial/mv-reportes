<template>
    <div class="admin">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="card mouse-default">
                        <div class="card-content grey-text text-darken-3">
                            <span class="flow-text">
                                <strong>Panel de Administración</strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col s12 m6 l4">
                    <router-link to="/admin/usuarios">
                    <div class="card card-extended green white-text waves-effect waves-light hoverable mouse-select animated fadeIn">
                        <div class="card-content">
                            <span class="card-title">
                                Usuarios
                            </span>
                        </div>
                    </div>
                    </router-link>
                </div>

                <div class="col s12 m6 l4">
                    <div class="card card-extended orange white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Reportes
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col s12 m6 l4">
                    <div class="card card-extended light-blue darken-1 white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Permisos
                            </span>
                        </div>
                    </div>
                </div>

                <div class="col s12 m6 l4">
                    <div class="card card-extended pink accent-4 white-text waves-effect waves-light hoverable mouse-select animated fadeIn" 
                         @click="abrirGestionPermisos">
                        <div class="card-content">
                            <span class="card-title">
                                Control de sistemas
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

            <!-- <tblUsuariosComponent :listadoUsuarios="listadoUsuarios" /> -->
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

        // this.$router.push('/inicio');
      }
    },
    created(){},
    beforeMount() {
        this.getListaPermisos();
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
      abrirGestionPermisos(){
            // var mdlPermisos = document.querySelector('#mdl-permisos');

            // var instance = M.Modal.getInstance(mdlPermisos);
            // instance.open();
      }
    }
}
</script>