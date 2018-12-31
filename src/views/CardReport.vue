<template>
    <v-container>
        <v-card>
            <v-card-title>
                <v-toolbar
                        color="teal"
                        dark
                >
                    <v-toolbar-title>Консультативное заключение</v-toolbar-title>
                </v-toolbar>
            </v-card-title>
            <v-card-text>
                <v-text-field
                        label="Дата"
                        type="text"
                        v-model="order.date"
                        box
                        readonly
                ></v-text-field>
                <v-text-field
                        label="Пациент"
                        type="text"
                        v-model="order.user"
                        box
                        readonly
                ></v-text-field>
                <v-textarea
                        label="Жалобы"
                        v-model="order.report.complaint"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Протокол исследования"
                        v-model="order.report.protocol"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Диагноз"
                        v-model="order.report.conclusion"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Рекомендовано"
                        v-model="order.report.recommendations"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
            </v-card-text>
            <v-card-actions>
                <v-btn dark color="teal" @click="update">Сохранить</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'CardReport',
    data () {
      return {
        order: {}
      }
    },
    async mounted () {
      const response = await api.order(this.$route.params.id)

      let order = response.data
      if (!order.report) {
        order.report = {
          complaint: '',
          protocol: '',
          conclusion: '',
          recommendations: '',
        }
      }

      this.order = order
    },
    methods: {
      async update () {
        const response = await api.updateOrder(this.order.id, this.order.report)

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
