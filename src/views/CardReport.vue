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
                        v-model="report.date"
                        box
                        readonly
                ></v-text-field>
                <v-text-field
                        label="Фамилия"
                        type="text"
                        v-model="report.lastName"
                        box
                        readonly
                ></v-text-field>
                <v-text-field
                        label="Имя"
                        type="text"
                        v-model="report.firstName"
                        box
                        readonly
                ></v-text-field>
                <v-text-field
                        label="Отчество"
                        type="text"
                        v-model="report.patronymic"
                        box
                        readonly
                ></v-text-field>
                <v-textarea
                        label="Жалобы"
                        v-model="report.complaint"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Протокол исследования"
                        v-model="report.protocol"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Диагноз"
                        v-model="report.conclusion"
                        rows="1"
                        auto-grow
                >
                </v-textarea>
                <v-textarea
                        label="Рекомендовано"
                        v-model="report.recommendations"
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
  export default {
    name: 'CardReport',
    data () {
      return {
        report: {
          date: '2018-08-16',
          lastName: 'Сидоров',
          firstName: 'Иван',
          patronymic: 'Петрович',
          complaint: '',
          conclusion: '',
          recommendations: '',
        }
      }
    },
    methods: {
      update: async () => {
        return true;
      }
    }
  }
</script>

<style scoped>

</style>
