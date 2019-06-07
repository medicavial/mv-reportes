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
                                    <input  id="username" 
                                            type="text" 
                                            @keyup="userFormValidation()"
                                            v-model="nuevoUsuario.credenciales.username"
                                            minlength="3"
                                            maxlength="15"
                                            required
                                            :disabled="regStep>0">
                                    <label for="username">Username</label>
                                </div>

                                <div class="input-field col s12 m6 l4">
                                    <i class="mdi mdi-at prefix"></i>
                                    <input  id="email" 
                                            type="email" 
                                            @keyup="userFormValidation()"
                                            v-model="nuevoUsuario.credenciales.email"
                                            required
                                            :disabled="regStep>0">
                                    <label for="email">Email</label>
                                </div>

                                <div class="col s12 m6 l4">
                                    <br class="hide-on-small-only">
                                    <button type="submit" 
                                            class="btn green right waves-effect waves-light col s12"
                                            v-bind:class="{ disabled: isWorking || !userFormValid }">
                                        <span v-if="!isWorking">Enviar Datos</span>
                                        <span v-if="isWorking"> <i class="mdi mdi-settings mdi-spin"></i> </span>
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div class="divider"></div>

                        <form id="privileges-form" class="disabled">
                            <div class="row">
                                <h5>Permisos</h5>
                                <div class="col s12 m6 l4" v-for="(item, index) in listadoPermisos" :key="index">
                                    <p v-if="item.PER_reqPrivilegios">
                                        <label>
                                            <input type="checkbox" class="filled-in" value="item.PER_id" :disabled="regStep<1"/>
                                            <span> {{ item.PER_nombre }} (*) </span>
                                        </label>
                                    </p>

                                    <p v-if="!item.PER_reqPrivilegios">
                                        <label>
                                            <input type="checkbox" class="filled-in" value="item.PER_id" :disabled="regStep<1"/>
                                            <span> {{ item.PER_nombre }} </span>
                                        </label>
                                    </p>
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
            listadoPermisos: null,
            permiso: 'admin',
            userData: null,
            isLoading: {
                usuarios: false,
                permisos: false
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
            isWorking: false,
            userFormValid: false,
            regStep: 0
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
        this.getListaPermisos();
        this.getUsuariosXsistema();
        M.AutoInit();
        this.message();
    },
    methods: {
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

        userFormValidation(){
            let invalidNodes    = document.querySelectorAll(`#user-form :invalid`);

            this.userFormValid = ( invalidNodes.length === 0 ) ? true : false;
            return this.userFormValid;
        },

        async sendNewUser(){
            this.isWorking = true;

            let datos = {
                username: this.nuevoUsuario.credenciales.username,
                email: this.nuevoUsuario.credenciales.email
            }

            await ApiService.createUser( datos )
            .then(res => {
                    this.isWorking = false;
                    this.regStep++
                    
                    if (!res.ok) return this.message( 'alert', res.message, 'orange' );

                    this.listadoUsuarios();
            });
        },
        
        message( icon='information', msg='prueba', color='blue' ){
            let html = `<span><i class="mdi mdi-${icon}"></i> ${msg}</span>`
            let classes = `${color}`;
            M.toast({html, classes})
        }
    }
}
</script>