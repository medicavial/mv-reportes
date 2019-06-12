// esto es provicional
const permisos = {
    root:       ['administrador', 'particulares', 'insumos', 'operativo'],
    sramirez:   ['administrador', 'particulares', 'insumos', 'operativo'],
    agutierrez: ['administrador', 'particulares', 'insumos', 'operativo'],
    jabraham:   ['operativo'],
    jsanchez:   ['particulares', 'operativo'],
    xsanchez:   ['operativo'],
    msanchez:   ['particulares'],
    sammv:      ['insumos'],
    lmorales:   ['particulares', 'insumos'],
    eraya:      ['insumos'],
    egutierrez: ['particulares']
}


export default {
    verificaPermisos( usuario ){
        const permisosUsuario = permisos[usuario] || [];
        return permisosUsuario;
    },

    privilegios(datos){
        let permisos = []

        datos.forEach(permiso => {
            permisos.push(permiso.PER_nombre.toLowerCase());
        });

        return permisos;
    },
}