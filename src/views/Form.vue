<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Специализация врача</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                           <v-select
                                   :items="specializations"
                                   item-value="uniqueTitle"
                                   item-text="title"
                                   label="Специализация врача"
                                   v-model="form.specialization"
                           ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Врач</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="doctors"
                                    item-value="fullName"
                                    item-text=""
                                    label="Врач"
                                    v-model="form.doctor"
                            ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Дата посещения</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-date-picker
                                    v-model="form.date"
                                    full-width
                                    landscape
                                    locale="ru-ru"
                                    :allowed-dates="allowedDates"
                                    :min="minDateOfVisit"
                                    class="mt-3"
                            ></v-date-picker>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Время посещения</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text class="time-array-list-container">
                            <v-list>
                                <v-list-tile
                                        v-if="allowedTimeArray.length === 0"
                                >
                                    <v-list-tile-content>
                                        Выберите врача и дату, чтобы увидеть свободное для записи время
                                    </v-list-tile-content>
                                </v-list-tile>
                                <v-list-tile
                                        v-for="time in allowedTimeArray"
                                        :key="time"
                                        class="time-array-list-tile"
                                        :class="{'time-array-list-tile_selected': form.time === time}"
                                        @click="selectTime(time)"
                                >
                                    <v-list-tile-content>
                                        {{ time | hm_time }} - свободно
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Форма обслуживания</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="serviceForms"
                                    item-text="text"
                                    item-value="value"
                                    label="Форма обслуживания"
                                    v-model="form.service"
                            ></v-select>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12"
                            v-if="isInsuranceService"
                    >
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Информация о страховке</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="insuranceCompanies"
                                    label="Страховая компания"
                                    v-model="form.insuranceCompany"
                            ></v-select>
                            <v-text-field
                                    label="Номер страхового полиса"
                                    type="text"
                                    v-model="form.insurancePolicyNumber"
                            ></v-text-field>
                            <v-dialog
                                    ref="insurancePolicyStartDate"
                                    v-model="insurancePolicyStartDateModal"
                                    :return-value.sync="form.insurancePolicyStartDate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.insurancePolicyStartDate"
                                        label="Дата начала действия полиса"
                                        readonly
                                ></v-text-field>
                                <v-date-picker
                                        locale="ru-ru"
                                        v-model="form.insurancePolicyStartDate"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="insurancePolicyStartDateModal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.insurancePolicyStartDate.save(form.insurancePolicyStartDate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-dialog
                                    ref="insurancePolicyEndDate"
                                    v-model="insurancePolicyEndDateModal"
                                    :return-value.sync="form.insurancePolicyEndDate"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        slot="activator"
                                        v-model="form.insurancePolicyEndDate"
                                        label="Дата окончания действия полиса"
                                        readonly
                                ></v-text-field>
                                <v-date-picker
                                        :min="insurancePolicyEndDateMin"
                                        locale="ru-ru"
                                        v-model="form.insurancePolicyEndDate"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="insurancePolicyEndDateModal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.insurancePolicyEndDate.save(form.insurancePolicyEndDate)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-card-text>
                    </v-card>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Дополнительная информация</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-textarea
                                    auto-grow
                                    label="Дополнительная информация"
                                    v-model="form.notes"
                            ></v-textarea>
                        </v-card-text>
                    </v-card>
                    <v-btn dark color="teal" @click="apply">Оформить заявку</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import moment from 'moment'
  import api from '@/api/api'
  import groupBy from 'lodash/groupBy'

  export default {
    name: 'Form',
    data () {
      return {
        form: {
          specialization: null,
          doctor: null,
          date: moment().format('YYYY-MM-DD'),
          time: '',
          service: null,
          notes: '',
          insuranceCompany: null,
          insurancePolicyNumber: '',
          insurancePolicyStartDate: null,
          insurancePolicyEndDate: null
        },
        insuranceCompanies: [
          'Company 1',
          'Company 2',
          'Company 3',
          'Company 4',
          'Company 5',
        ],
        insurancePolicyEndDateModal: false,
        insurancePolicyStartDateModal: false,
        serviceForms: [
          {text: 'Платное посещение', value: 'PAID'},
          {text: 'Медицинская страховка', value: 'INSURANCE'}
        ],
        specializations: [],
        doctors: [],
        availableTime: {}
      }
    },
    computed: {
      insurancePolicyEndDateMin: function () {
        return this.form.insurancePolicyStartDate === null
          ? undefined
          : moment(this.form.insurancePolicyStartDate).add(1, 'day').format('YYYY-MM-DD')
      },
      isInsuranceService: function () {
        return this.form.service === 'INSURANCE'
      },
      maxDobDate: function () {
        return moment().format('YYYY-MM-DD')
      },
      minDateOfVisit: function () {
        return moment().format('YYYY-MM-DD')
      },
      allowedDatesArray: function () {
        return Object.keys(this.availableTime)
      },
      allowedTimeArray: function () {
        const items = this.availableTime[this.form.date]
        const time = items ? items.map(item => item.time) : []

        return time.sort()
      }
    },
    watch: {
      'form.specialization': async function (specialization) {
        this.doctors = (await api.doctors(specialization)).data
          .map(doc => `${doc.lastName} ${doc.firstName} ${doc.patronymic}`)
      },
      'form.doctor': async function (doctor) {
        this.availableTime = groupBy((await api.time(this.form.specialization, doctor)).data, 'date')
      },
      'form.service': function (currentService) {
        if (currentService === 'paid') {
          this.resetInsuranceInformation()
        }
      },
      'form.date': function () {
        this.form.time = ''
      }
    },
    async created () {
      this.specializations = (await api.specializations()).data;
    },
    methods: {
      allowedDates (val) {
        return this.allowedDatesArray.includes(val)
      },
      resetInsuranceInformation () {
        this.form.insuranceCompany = null;
        this.form.insurancePolicyNumber = '';
        this.form.insurancePolicyStartDate = null;
        this.form.insurancePolicyEndDate = null
      },
      selectTime (time) {
        this.form.time = time;
      },
      async apply () {
        const { data: response } = await api.createOrder(this.form)

        console.log(response)
      }
    }
  }
</script>

<style scoped>
    .time-array-list-container.v-card__text {
        padding: 0;
    }
    .time-array-list-item, .time-array-list-tile:hover {
        cursor: pointer;
    }
    .time-array-list-tile:hover {
        background-color: #B2DFDB;
    }
    .time-array-list-tile_selected, .time-array-list-tile_selected:hover {
        background-color: #80CBC4;
    }
</style>
