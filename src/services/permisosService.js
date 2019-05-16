const permisos = {
    root:       ['admin'],
    sramirez:   ['admin'],
    agutierrez: ['admin'],
    jsanchez:   ['particulares'],
    xsanchez:   [],
    msanchez:   [],
    sammv:      ['insumos'],
    lmorales:   ['particulares', 'insumos'],
    eraya:      ['insumos'],
    egutierrez: ['particulares']
}


export default {
    verificaPermisos( usuario ){
        const permisosUsuario = permisos[usuario] || [];
        return permisosUsuario;
    }
}