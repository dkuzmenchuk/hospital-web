<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Рабочее время</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="types"
                                    item-value="isAnalyse"
                                    item-text="title"
                                    label="Группа врачей"
                                    v-model="form.isAnalyse"
                            ></v-select>
                            <template v-if="form.isAnalyse === false">
                                <v-select
                                        :items="specializations"
                                        item-value="uniqueTitle"
                                        item-text="title"
                                        label="Специализация врача"
                                        v-model="form.specialization"
                                ></v-select>
                                <v-select
                                        :items="doctors"
                                        item-value="fullName"
                                        item-text=""
                                        label="Врач"
                                        v-model="form.doctor"
                                ></v-select>
                            </template>
                            <template v-if="form.isAnalyse === true">
                                <v-select
                                        :items="analyseTypes"
                                        item-value="uniqueTitle"
                                        item-text="title"
                                        label="Тип исследования"
                                        v-model="form.analyseType"
                                ></v-select>
                                <v-select
                                        :items="analyses"
                                        item-value="uniqueTitle"
                                        item-text="title"
                                        label="Анализ или исследование"
                                        v-model="form.analyse"
                                ></v-select>
                            </template>
                            <v-menu
                                    ref="menu"
                                    :close-on-content-click="false"
                                    v-model="menu"
                                    :nudge-right="40"
                                    :return-value.sync="form.dates"
                                    lazy
                                    transition="scale-transition"
                                    offset-y
                                    full-width
                                    min-width="290px"
                            >
                                <v-combobox
                                        slot="activator"
                                        v-model="form.dates"
                                        multiple
                                        chips
                                        small-chips
                                        prepend-icon="event"
                                        readonly
                                        label="Даты"
                                ></v-combobox>
                                <v-date-picker
                                        v-model="form.dates"
                                        multiple
                                        no-title
                                        scrollable
                                        :allowed-dates="allowedDates"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="menu = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.menu.save(form.dates)">OK</v-btn>
                                </v-date-picker>
                            </v-menu>
                            <v-dialog
                                    ref="timeStartDialog"
                                    v-model="timeStartModal"
                                    :return-value.sync="form.timeStart"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.timeStart"
                                        prepend-icon="access_time"
                                        readonly
                                        label="Время начала работы"
                                ></v-text-field>
                                <v-time-picker
                                        v-if="timeStartModal"
                                        v-model="form.timeStart"
                                        full-width
                                        format="24hr"
                                        :allowed-minutes="allowedMinutes"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="timeStartModal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.timeStartDialog.save(form.timeStart)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                            <v-dialog
                                    ref="timeEndDialog"
                                    v-model="timeEndModal"
                                    :return-value.sync="form.timeEnd"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.timeEnd"
                                        prepend-icon="access_time"
                                        readonly
                                        label="Время окончания работы"
                                ></v-text-field>
                                <v-time-picker
                                        v-if="timeEndModal"
                                        v-model="form.timeEnd"
                                        full-width
                                        format="24hr"
                                        :allowed-minutes="allowedMinutes"
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="timeEndModal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.timeEndDialog.save(form.timeEnd)">OK</v-btn>
                                </v-time-picker>
                            </v-dialog>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="create">Создать</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import api from '@/api/api'
  import moment from 'moment'

  export default {
    name: 'WorkingTime',
    data () {
      return {
        analyseTypes: [],
        analyses: [],
        form: {
          isAnalyse: null,
          specialization: null,
          doctor: null,
          analyseType: null,
          analyse: null,
          dates: [],
          timeStart: null,
          timeEnd: null,
        },
        specializations: [],
        doctors: [],
        types: [
          { title: 'Практикующие врачи', isAnalyse: false },
          { title: 'Анализы и исследования', isAnalyse: true },
        ],
        menu: false,
        timeStartModal: false,
        timeEndModal: false,
      }
    },
    watch: {
      'form.specialization': async function (specialization) {
        this.doctors = (await api.doctors(specialization)).data
          .map(doc => `${doc.lastName} ${doc.firstName} ${doc.patronymic}`)
      },
      'form.isAnalyse': async function (analyse) {
        if (analyse === true) {
          this.form.specialization = null
          this.form.doctor = null

          this.analyseTypes  = (await api.analyseTypesList()).data
        } else if (analyse === false) {
          this.form.analyseType = null
          this.form.analyse = null

          this.specializations = (await api.specializations()).data
        }
      },
      'form.analyseType': async function (type) {
        this.analyses = (await api.analyses(type)).data
      },
    },
    methods: {
      allowedMinutes: m => [0, 30].includes(m),
      allowedDates: d => moment(d).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD'),
      async create () {
        const response = await api.createWorkingTime(this.form)

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
