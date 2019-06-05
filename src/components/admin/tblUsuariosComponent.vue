<template>
    <div>
        <table class="highlight striped responsive-table">
            <thead>
            <tr>
                <th>Usuario</th>
                <th>Nomber</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estatus</th>
            </tr>
            </thead>

            <tbody>
                <tr v-for="(item, index) in listadoUsuarios" :key="index">
                    <td> {{ item.USU_username }} </td>
                    <td>
                        {{ item.USU_nombre }}
                        {{ item.USU_paterno }}
                        {{ item.USU_materno }}
                    </td>
                    <td> {{ item.USU_email }} </td>
                    <td>
                        <span v-if="item.USU_telefono">{{ item.USU_telefono }}</span>
                        <span v-if="!item.USU_telefono">N/A</span>
                    </td>
                    <td>
                        <span v-if="item.USU_activoSistema">Activo</span>
                        <span v-if="!item.USU_activoSistema">Inactivo</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: ['listadoUsuarios']
}
</script>