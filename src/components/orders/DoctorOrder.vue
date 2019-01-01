<template>
    <v-container>
        <v-layout align-center justify-space-between row class="text-sm-center">
            <v-flex md2>{{ order.date | formatted_date }} {{ order.time | hm_time }}</v-flex>
            <v-flex md8>
                <v-list-tile-title v-if="order.isAnalyse === true">{{ order.analyse }}</v-list-tile-title>
                <v-list-tile-title>Пациент: {{ order.user }}</v-list-tile-title>
                <v-list-tile-sub-title>Форма обслуживания: {{ translateService(order.service) }}</v-list-tile-sub-title>
            </v-flex>
            <v-flex md2>
                <v-btn
                        v-if="true"
                        dark
                        color="teal"
                        @click="report"
                >
                    Заключение
                </v-btn>
                <v-btn
                        v-if="true"
                        dark
                        color="orange lighten-1"
                        @click="missed"
                >
                    Пропущено
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'DoctorOrder',
    props: {
      order: {
        required: true,
        type: Object,
      }
    },
    methods: {
      translateService: service => {
        switch (service) {
          case 'PAID':
            return 'Платно'
          case 'INSURANCE':
            return 'По страховке'
          default:
            return ''
        }
      },
      report () {
        this.$router.push({ name: 'card-report', params: { id: this.order.id } })
      },
      missed () {
        return true
      }
    }
  }
</script>

<style scoped>
    .v-list__tile__title {
        text-align: center;
    }
</style>
