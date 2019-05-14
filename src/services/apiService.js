const baseURL = 'https://busqueda.medicavial.net/api'

export default {
    pruebaGET: () => {
        const url = `${baseURL }/externos/listadoMedicos/1`

        return fetch(url).then(res => res.json());
    },

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
    }
}