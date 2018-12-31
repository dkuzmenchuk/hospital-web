<template>
    <v-container>
        <v-layout align-center justify-space-between row class="text-sm-center">
            <v-flex md2>{{ order.date | formatted_date }} {{ order.time | hm_time }}</v-flex>
            <v-flex md8>
                <v-list-tile-title v-if="order.isAnalyse === false">Специализация врача: {{ order.specialization }}</v-list-tile-title>
                <v-list-tile-title v-if="order.isAnalyse === true">{{ order.analyse }}</v-list-tile-title>
                <v-list-tile-sub-title>Врач: {{ order.doctor }}</v-list-tile-sub-title>
                <v-list-tile-sub-title>Форма обслуживания: {{ translateService(order.service) }}</v-list-tile-sub-title>
            </v-flex>
            <v-flex md2>
                <v-btn dark color="red lighten-1" @click="cancel(order.id)">Отменить</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'ClientOrder',
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
      cancel: async id => {
        const result = (await api.cancelOrder(id)).data

        console.log(result)
      }
    }
  }
</script>

<style scoped>
    .v-list__tile__title {
        text-align: center;
    }
</style>
