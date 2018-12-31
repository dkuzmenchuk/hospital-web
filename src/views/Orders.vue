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
                                    <component
                                            :is="orderComponentName"
                                            :order="item"
                                    ></component>
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
  import { mapGetters } from 'vuex'

  export default {
    name: 'Orders',
    components: {
      ClientOrder: () => import('@/components/orders/ClientOrder.vue'),
      DoctorOrder: () => import('@/components/orders/DoctorOrder.vue'),
    },
    data () {
      return {
        items: []
      }
    },
    computed: {
      orderComponentName () {
        return this.isClient ? 'ClientOrder' : 'DoctorOrder'
      },
      ...mapGetters([
        'isClient',
      ]),
    },
    async mounted () {
      this.items = (await api.listOrders('WAITING')).data
    },
  }
</script>

<style scoped>
</style>
