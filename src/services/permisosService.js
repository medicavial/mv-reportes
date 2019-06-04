const permisos = {
    root:       ['admin', 'particulares', 'insumos', 'operativo'],
    sramirez:   ['admin', 'particulares', 'insumos', 'operativo'],
    agutierrez: ['admin', 'particulares', 'insumos', 'operativo'],
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
    }
}