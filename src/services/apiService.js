// const baseURL = 'https://busqueda.medicavial.net/api';
const baseURL = 'http://localhost:8000';

export default {

    // pruebaGET: () => {
    //     const url = `${baseURL}/externos/listadoMedicos/1`
    //     return fetch(url).then(res => res.json());
    // },


    login: ( credentials ) => {
        const url = `${baseURL}/externos/login`;

        let loginData = {
            username: credentials.usr,
            password: credentials.pwd,
            remember: credentials.rem
        }

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( loginData )
        }).then(res => res.json());
    },

    
    reportesUsuario: () => {
        const url = `${baseURL}/reportes/listado`

        return fetch(url).then(res => res.json());
    },

    reportesPermitidos: ( permisos ) => {
        const url = `${baseURL}/reportes/reportesPermitidos`

        let data = { permisosUsuario: permisos }

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

} // termina export