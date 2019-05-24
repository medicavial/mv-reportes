const permisos = {
    root:       ['admin', 'particulares', 'insumos', 'operativo'],
    sramirez:   ['admin', 'particulares', 'insumos', 'operativo'],
    agutierrez: ['admin', 'particulares', 'insumos', 'operativo'],
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