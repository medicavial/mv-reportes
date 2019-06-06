<template>
    <div class="usuarios">
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="card">
                        <div class="card-content grey-text text-darken-3 ">
                            <span class="flow-text mouse-default">
                                <strong>Gestión de usuarios</strong>
                            </span>

                            <button class="right btn btn-floating animated bounceIn waves-effect waves-lignt green"
                                    @click="openNewUser">
                                <i class="mdi mdi-plus"></i>
                            </button>

                            <div class="row animated fadeIn" v-if="listadoUsuarios">
                                <div class="input-field col s12 m6">
                                    <i class="mdi mdi-account-search prefix"></i>
                                    <input id="icon_prefix" type="text" placeholder="Filtrar"
                                            @keyup="filterData()"
                                            v-model="filterParams">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row animated fadeIn fast" v-if="listadoUsuarios">
                <div class="col s12">
                    <tblUsuariosComponent :listadoUsuarios="filterResults"/>
                </div>
            </div>

            <LoadingComponent v-if="isLoading.usuarios" />
        </div>

        <!-- Modal Structure -->
        <div id="mdl-usuario" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h5>Crear usuario</h5>
                <p>
                    <i class="mdi mdi-lightbulb-on-outline"></i>
                    La contraseña será igual al nombre de usuario.
                </p>

                <div class="row">
                    <div class="col s12">
                        <form v-on:submit.prevent="sendNewUser()" id="user-form">
                            <div class="row">
                                <div class="input-field col s12 m6 l4">
                                    <i class="mdi mdi-account-plus prefix"></i>
                                    <input id="username" type="text" @keyup="userFormValidation()">
                                    <label for="username">Username</label>
                                </div>

                                <div class="input-field col s12 m6 l4">
                                    <i class="mdi mdi-at prefix"></i>
                                    <input id="email" type="email" @keyup="userFormValidation()">
                                    <label for="email">Email</label>
                                </div>

                                <div class="col s12 m6 l4">
                                    <button type="submit" 
                                            class="btn green right"
                                            v-bind:class="{ disabled: isWorking }">
                                        Enviar Datos
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            <div class="modal-footer">
            <button class="modal-close waves-effect waves-green btn-flat">Cerrar</button>
            </div>
        </div>
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
    name: 'usuarios',
    components: {
        BtnHomeFiexedComponent,
        LoadingComponent,
        tblUsuariosComponent
    },
    data() {
        return {
            permiso: 'admin',
            userData: null,
            isLoading: {
                usuarios: false
            },
            listadoUsuarios: null,
            filterResults: null,
            filterParams: null,
            nuevoUsuario: {
                credenciales: {
                    email: null,
                    username: null,
                },
                personales: {
                    nombres: null,
                    paterno: null,
                    materno: null,
                    telefono: null
                }
            },
            isWorking: false
        }
    },
    beforeCreate(){
        let permisos = AuthService.userData().permisos;
        let permitido = ( permisos.includes('admin') ) ? true : false;

        if ( !permitido ) {
            M.toast({html: `<span><i class="mdi mdi-cancel"></i> Acceso denegado</span>`,
                    classes: 'red'})

            this.$router.push('/inicio');
        }
    },
    mounted(){
        this.getUsuariosXsistema();
        M.AutoInit();
        // let mdlUsuario = document.querySelector('#mdl-usuario');
        // mdlPermisosInstance = M.Modal.init(mdlUsuario, {
        //     dismissible: false
        // });
    },
    methods: {
        async getUsuariosXsistema(){
            this.isLoading.usuarios = true;

            await ApiService.getUsuariosXsistema()
            .then(res => {
                    this.isLoading.usuarios = false;
                    this.listadoUsuarios = res.data;
                    this.filterResults = this.listadoUsuarios;
            });
        },
        filterData(){
            this.filterResults = this.listadoUsuarios.filter( usuario => JSON.stringify(usuario).toLowerCase().includes( this.filterParams ) );
        },
        openNewUser(){
            let mdlUsuario = document.querySelector('#mdl-usuario');
            let mdlUsuarioInstance = M.Modal.init(mdlUsuario, {
                dismissible: false
            });

            let instance = M.Modal.getInstance(mdlUsuario);
            instance.open();
        },
        sendNewUser(){
            console.log( this.nuevoUsuario.credenciales )
        }
    }
}
</script>