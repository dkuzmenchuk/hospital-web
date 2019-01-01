<template>
    <div>
        <v-container fluid>
            <v-layout row>
                <v-flex offset-sm2 sm4>
                    <v-btn
                            block
                            @click="todayOrders"
                            :class="{'v-btn__state-active': active === 'today'}"
                    >Сегоднящние посещения</v-btn>
                </v-flex>
                <v-flex sm4>
                    <v-btn
                            block
                            @click="futureOrders"
                            :class="{'v-btn__state-active': active === 'future'}"
                    >Будущие посещения</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container fluid>
            <v-layout row>
                <v-flex xs12 sm8 offset-sm2>
                    <v-card>
                        <v-card-text v-if="items.length === 0">
                            На текущий промежуток времени нет записей
                        </v-card-text>
                        <v-list two-line v-if="items.length">
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
                                        <doctor-order
                                                :order="item"
                                        ></doctor-order>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </template>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'DoctorOrders',
    components: {
      DoctorOrder: () => import('@/components/orders/DoctorOrder.vue'),
    },
    data () {
      return {
        items: [],
        active: 'today',
      }
    },
    async mounted () {
      await this.todayOrders()
    },
    methods: {
      todayOrders () {
        this.active = 'today'
        return true;
      },
      futureOrders () {
        this.active = 'future'
        return true;
      }
    }
  }
</script>

<style scoped>
    .v-btn__state-active {
        color: white !important;
        background-color: #009688 !important;
    }
</style>
