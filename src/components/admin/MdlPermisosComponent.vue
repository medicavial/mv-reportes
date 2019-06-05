<template>
    <div>
        <!-- Modal Structure -->
        <div id="mdl-permisos" class="modal modal-fixed-footer">
            <div class="modal-content">
                <h4>Gestión de permisos</h4>
                <table>
                    <thead>
                    <tr>
                        <th>Permiso</th>
                        <th>Estatus</th>
                        <th>Opción</th>
                    </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item, index) in listadoPermisos" :key="index">
                            <td>{{ item.PER_nombre }}</td>
                            <td>
                                <span v-if="item.PER_activo">Activo</span>
                                <span v-if="!item.PER_activo">Inactivo</span>
                            </td>
                            <td>Desactivar</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            <div class="modal-footer">
                <button class="modal-close waves-effect waves-green btn-flat">Cerrar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        M.AutoInit();
        var mdlPermisos = document.querySelector('#mdl-permisos');
        mdlPermisosInstance = M.Modal.init(mdlPermisos, {
            dismissible: false
        });
    },
    props: ['listadoPermisos']
}
</script>