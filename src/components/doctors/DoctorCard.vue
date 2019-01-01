<template>
    <v-card color="grey lighten-2" class="black--text">
        <v-layout row>
            <!--<v-flex xs4>-->
                <!--<v-img-->
                        <!--:src="doctor.photo || 'https://cdn.vuetifyjs.com/images/cards/halcyon.png'"-->
                        <!--height="125px"-->
                        <!--contain-->
                <!--&gt;</v-img>-->
            <!--</v-flex>-->
            <v-flex xs12>
                <v-card-text
                        style="text-align: center"
                >
                    <div>Доктор: {{ fullName }}</div>
                    <div>Специализация: {{ doctor.specialization }}</div>
                    <div>Опыт работы: с {{ doctor.experience }} года</div>
                    <div>Квалификация: {{ doctor.qualification }}</div>
                </v-card-text>
            </v-flex>
        </v-layout>
    </v-card>
</template>

<script>
  export default {
    name: 'DoctorCard',
    props: {
      doctor: {
        required: true,
        type: Object
      }
    },
    computed: {
      fullName () {
        return `${this.doctor.lastName} ${this.doctor.firstName} ${this.doctor.patronymic}`
      }
    }
  }
</script>

<style scoped>

</style>
