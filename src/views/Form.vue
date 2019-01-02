<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Тип записи</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-select
                                    :items="types"
                                    item-value="isAnalyse"
                                    item-text="title"
                                    label="Тип записи"
                                    v-model="form.isAnalyse"
                                    :error-messages="isAnalyseErrors"
                                    @change="$v.form.isAnalyse.$touch()"
                                    @blur="$v.form.isAnalyse.$touch()"
                            ></v-select>
                        </v-card-text>
                    </v-card>
                    <template v-if="form.isAnalyse === false">
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
                                        :error-messages="specializationErrors"
                                        @change="$v.form.specialization.$touch()"
                                        @blur="$v.form.specialization.$touch()"
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
                                        :error-messages="doctorErrors"
                                        @change="$v.form.doctor.$touch()"
                                        @blur="$v.form.doctor.$touch()"
                                ></v-select>
                            </v-card-text>
                        </v-card>
                    </template>
                    <template v-if="form.isAnalyse === true">
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Тип исследования</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-select
                                        :items="analyseTypes"
                                        item-value="uniqueTitle"
                                        item-text="title"
                                        label="Тип исследования"
                                        v-model="form.analyseType"
                                        :error-messages="analyseTypeErrors"
                                        @change="$v.form.analyseType.$touch()"
                                        @blur="$v.form.analyseType.$touch()"
                                ></v-select>
                            </v-card-text>
                        </v-card>
                        <v-card class="elevation-12">
                            <v-toolbar dark color="primary">
                                <v-toolbar-title>Анализ или исследование</v-toolbar-title>
                            </v-toolbar>
                            <v-card-text>
                                <v-select
                                        :items="analyses"
                                        item-value="uniqueTitle"
                                        item-text="title"
                                        label="Анализ или исследование"
                                        v-model="form.analyse"
                                        :error-messages="analyseErrors"
                                        @change="$v.form.analyse.$touch()"
                                        @blur="$v.form.analyse.$touch()"
                                ></v-select>
                            </v-card-text>
                        </v-card>
                    </template>
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
                                    :error-messages="serviceErrors"
                                    @change="$v.form.service.$touch()"
                                    @blur="$v.form.service.$touch()"
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
                                    :error-messages="insuranceCompanyErrors"
                                    @change="$v.form.insuranceCompany.$touch()"
                                    @blur="$v.form.insuranceCompany.$touch()"
                            ></v-select>
                            <v-text-field
                                    label="Номер страхового полиса"
                                    type="text"
                                    v-model="form.insurancePolicyNumber"
                                    :error-messages="insurancePolicyNumberErrors"
                                    @input="$v.form.insurancePolicyNumber.$touch()"
                                    @blur="$v.form.insurancePolicyNumber.$touch()"
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
                                        :error-messages="insurancePolicyStartDateErrors"
                                        @input="$v.form.insurancePolicyStartDate.$touch()"
                                        @blur="$v.form.insurancePolicyStartDate.$touch()"
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
                                        :error-messages="insurancePolicyEndDateErrors"
                                        @input="$v.form.insurancePolicyEndDate.$touch()"
                                        @blur="$v.form.insurancePolicyEndDate.$touch()"
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
  import { validationMixin } from 'vuelidate'
  import { required, requiredIf } from 'vuelidate/lib/validators'

  export default {
    name: 'Form',
    mixins: [ validationMixin ],
    validations: {
      form: {
        isAnalyse: { required },
        analyseType: { required: requiredIf(function () { return this.form.isAnalyse === true }) },
        analyse: { required: requiredIf(function () { return this.form.isAnalyse === true }) },
        specialization: { required: requiredIf(function () { return this.form.isAnalyse === false }) },
        doctor: { required: requiredIf(function () { return this.form.isAnalyse === false }) },
        service: { required },
        notes: '',
        insuranceCompany: { required: requiredIf(function () { return this.form.service === 'INSURANCE' }) },
        insurancePolicyNumber: { required: requiredIf(function () { return this.form.service === 'INSURANCE' }) },
        insurancePolicyStartDate: { required: requiredIf(function () { return this.form.service === 'INSURANCE' }) },
        insurancePolicyEndDate: { required: requiredIf(function () { return this.form.service === 'INSURANCE' }) },
      },
    },
    data () {
      return {
        analyseTypes: [],
        analyses: [],
        form: {
          isAnalyse: null,
          analyseType: null,
          analyse: null,
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
        types: [
          { title: 'Прием у врача', isAnalyse: false },
          { title: 'Анализы и исследования', isAnalyse: true },
        ],
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
      },
      isAnalyseErrors () {
        const errors = []
        if (!this.$v.form.isAnalyse.$error) return errors
        !this.$v.form.isAnalyse.required && errors.push('Тип записи обязателен')
        return errors
      },
      analyseTypeErrors () {
        const errors = []
        if (!this.$v.form.analyseType.$error) return errors
        !this.$v.form.analyseType.required && errors.push('Тип исследования обязателен')
        return errors
      },
      analyseErrors () {
        const errors = []
        if (!this.$v.form.analyse.$error) return errors
        !this.$v.form.analyse.required && errors.push('Исследование обязательно')
        return errors
      },
      specializationErrors () {
        const errors = []
        if (!this.$v.form.specialization.$error) return errors
        !this.$v.form.specialization.required && errors.push('Специализация врача обязательна')
        return errors
      },
      doctorErrors () {
        const errors = []
        if (!this.$v.form.doctor.$error) return errors
        !this.$v.form.doctor.required && errors.push('Врач обязателен')
        return errors
      },
      serviceErrors () {
        const errors = []
        if (!this.$v.form.service.$error) return errors
        !this.$v.form.service.required && errors.push('Тип обслуживания обязателен')
        return errors
      },
      insuranceCompanyErrors () {
        const errors = []
        if (!this.$v.form.insuranceCompany.$error) return errors
        !this.$v.form.insuranceCompany.required && errors.push('Страховая компания обязательна')
        return errors
      },
      insurancePolicyNumberErrors () {
        const errors = []
        if (!this.$v.form.insurancePolicyNumber.$error) return errors
        !this.$v.form.insurancePolicyNumber.required && errors.push('Номер страхового полиса обязателен')
        return errors
      },
      insurancePolicyStartDateErrors () {
        const errors = []
        if (!this.$v.form.insurancePolicyStartDate.$error) return errors
        !this.$v.form.insurancePolicyStartDate.required && errors.push('Дата начала действия страхового полиса обязательна')
        return errors
      },
      insurancePolicyEndDateErrors () {
        const errors = []
        if (!this.$v.form.insurancePolicyEndDate.$error) return errors
        !this.$v.form.insurancePolicyEndDate.required && errors.push('Дата окончания действия страхового полиса обязательна')
        return errors
      },
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
      'form.analyse': async function (analyse) {
        this.availableTime = groupBy((await api.analysesTime(this.form.analyseType, analyse)).data, 'date')
      }
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
        console.log('touch')
        this.$v.$touch()
        console.log(this.$v.$error)
        if (this.$v.$error === false) {
          console.log('apply!')
          const { data: response } = await api.createOrder(this.form)

          console.log(response)
        }
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
