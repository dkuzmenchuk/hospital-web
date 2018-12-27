<template>
    <v-container fluid>
        <v-layout row>
            <v-flex xs12 sm8 offset-sm2>
                <v-card>
                    <v-list two-line>
                        <template v-for="(item, index) in items">
                            <v-divider
                                    v-if="index > 0"
                                    :inset="true"
                                    :key="index"
                            ></v-divider>

                            <v-list-tile
                                    :key="item.title"
                            >
                                <v-list-tile-content>
                                    <v-container>
                                        <v-layout align-center justify-space-between row class="text-sm-center">
                                            <v-flex md2>{{ item.date | formatted_date }} {{ item.time | hm_time }}</v-flex>
                                            <v-flex md8>
                                                <v-list-tile-title>Специализация врача: {{ item.specialization }}</v-list-tile-title>
                                                <v-list-tile-sub-title>Врач: {{ item.doctor }}</v-list-tile-sub-title>
                                                <v-list-tile-sub-title>Форма обслуживания: {{ translateService(item.service) }}</v-list-tile-sub-title>
                                            </v-flex>
                                            <v-flex md2>
                                                <v-btn dark color="red lighten-1" @click="cancel">Отменить</v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-container>
                                </v-list-tile-content>
                            </v-list-tile>
                        </template>
                    </v-list>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'Orders',
    data () {
      return {
        items: []
      }
    },
    async mounted () {
      this.items = (await api.listOrders('WAITING')).data
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
      cancel: () => {
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
