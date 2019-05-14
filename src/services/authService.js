import Router from 'vue-router';

export default {
    auth( userData, remember ){
        if ( remember ) localStorage.setItem('session', JSON.stringify(userData))

        sessionStorage.setItem('session', JSON.stringify(userData))

        return this.checkSession();
    },

    checkSession(){
        if (sessionStorage.getItem('session') || localStorage.getItem('session')) {
            if (localStorage.getItem('session')) {
                sessionStorage.setItem('session', JSON.stringify(JSON.parse(localStorage.getItem('session'))));
            }

            return true;
        } else {
            return false;
        }
    },

    logout(){
        sessionStorage.removeItem('session');
        if (localStorage.getItem('session')) localStorage.removeItem('session');

        return this.checkSession();
    }
}