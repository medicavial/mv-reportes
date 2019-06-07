import AuthService from '@/services/authService';

// const baseURL = 'https://busqueda.medicavial.net/api';
const baseURL = 'http://localhost:8000';

const idSistema = 1;

let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

let postReq = {
    headers,
    method: 'POST',
    body: null
}

export default {

    // pruebaGET: () => {
    //     const url = `${baseURL}/externos/listadoMedicos/1`
    //     return fetch(url).then(res => res.json());
    // },

    login: ( credentials ) => {
        const url = `${baseURL}/users/login`;

        let loginData = {
            username: credentials.usr,
            password: credentials.pwd,
            idSistema
            // remember: credentials.rem
        }

        postReq.body = JSON.stringify(loginData);

        return fetch(url, postReq).then(res => res.json());
    },

    createUser: ( userData ) => {
        const url = `${baseURL}/users/crearusuarioxsistema`;
        
        let data = { 
            idUsuario: AuthService.userData().USU_id,
            idSistema,
            userData
        }

        postReq.body = JSON.stringify(data);
        return fetch(url, postReq).then(res => res.json());
    },

    getPermisos: () => {
        const url = `${baseURL}/users/listapermisos`;
        let data = {idSistema}
        postReq.body = JSON.stringify(data);
        return fetch(url, postReq).then(res => res.json());
    },
    
    getUsuariosXsistema: () => {
        const url = `${baseURL}/users/usuariosxsistema`;
        let data = { idSistema }
        postReq.body = JSON.stringify(data);
        return fetch(url, postReq).then(res => res.json());
    },

    getReporte: (userData, id) => {
        const url = `${baseURL}/reportes/getReporte`

        let data = { userData, id }
        postReq.body = JSON.stringify(data);
        return fetch(url, postReq).then(res => res.json());
    },

    reportesPermiso: (permiso) => {
        const url = `${baseURL}/reportes/reportesPermiso`

        let data = { permiso }
        postReq.body = JSON.stringify(data);

        return fetch(url, postReq).then(res => res.json());
    },

    reportesPermitidos: (permisos) => {
        const url = `${baseURL}/reportes/reportesPermitidos`

        let data = { permisosUsuario: permisos }
        postReq.body = JSON.stringify(data);
        return fetch(url, postReq).then(res => res.json());
    },

    reportesUsuario: () => {
        const url = `${baseURL}/reportes/listado`;
        return fetch(url).then(res => res.json());
    },
} // termina export