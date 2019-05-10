const baseURL = 'https://busqueda.medicavial.net/api'

export default {
    pruebaGET: () => {
        const url = `${baseURL }/externos/listadoMedicos/1`

        return fetch(url).then(res => res.json());
    },

    login: ( username, password, remember ) => {
        const url = `${baseURL}/externos/login`;

        return fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: username, password: password, remember: remember })
        }).then(res => res.json());
    }
}