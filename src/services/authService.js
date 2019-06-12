import PermisosService from '@/services/permisosService'

let changeStatus = new Event('changeStatus');

export default {
    auth( userData, remember ){
        if ( userData.permisos.length < 1 ) {
            console.log('entra al provicional');
            
            let permisos = PermisosService.verificaPermisos(userData.USU_username);
            userData.permisos = permisos;
        }else{
            console.log('permisos desde DB');
            let permisos = PermisosService.privilegios(userData.permisos);
            userData.permisos = permisos;
        }
        
        sessionStorage.setItem('session', JSON.stringify(userData))
        if (remember) localStorage.setItem('session', JSON.stringify(userData))

        let verify = this.checkSession();

        if ( !verify ) {
            return verify;
        }else{
            document.dispatchEvent(changeStatus);
            return verify;
        }
    },

    checkSession(){
        if (sessionStorage.getItem('session') || localStorage.getItem('session')) {
            if (localStorage.getItem('session')) {
                sessionStorage.setItem('session', JSON.stringify(JSON.parse(localStorage.getItem('session'))));
            }
            let usuario = JSON.parse(sessionStorage.getItem('session'));

            return true;
        } else {
            return false;
        }
    },

    logout(){
        sessionStorage.removeItem('session');
        if (localStorage.getItem('session')) localStorage.removeItem('session');

        document.dispatchEvent(changeStatus);
        return this.checkSession();
    },

    userData(){
        return JSON.parse( sessionStorage.getItem('session') );
    }
}