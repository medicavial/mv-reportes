<template>
    <div>
        <div class="card">
            <div class="card-content">
                <table class="highlight striped responsive-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estatus</th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item, index) in listadoUsuarios" :key="index">
                            <td> {{ index+1 }} </td>
                            <td> {{ item.USU_username }} </td>
                            <td>
                                <span v-if="item.USU_nombre"> {{ item.USU_nombre }} {{ item.USU_paterno }} {{ item.USU_materno }} </span>
                                <span v-if="!item.USU_nombre"> N/A </span>
                            </td>
                            <td> {{ item.USU_email }} </td>
                            <td>
                                <span v-if="item.USU_activoSistema">Activo</span>
                                <span v-if="!item.USU_activoSistema">Inactivo</span>
                            </td>
                            <td>
                                <button class="btn btn-small orange btn-floating"> <i class="mdi mdi-pencil"></i> </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['listadoUsuarios']
}
</script>