<template>
    <div>
        <doctor-card
                v-for="(doctor, i) in doctors"
                :key="i"
                :doctor="doctor"
                style="margin: 10px;"
        ></doctor-card>
    </div>
</template>

<script>
  import api from '@/api/api'
  import DoctorCard from '@/components/doctors/DoctorCard.vue'

  export default {
    name: 'Doctors',
    components: {
      DoctorCard
    },
    data() {
      return {
        doctors: []
      }
    },
    watch: {
      '$route.params.specialization': {
        handler: async function (specialization) {
          await this.fetch(specialization)
        }
      }
    },
    async created () {
      await this.fetch()
    },
    methods: {
      async fetch () {
        const response = await api.doctors(this.$route.params.specialization)

        this.doctors = response.data
      }
    }
  }
</script>

<style scoped>

</style>
