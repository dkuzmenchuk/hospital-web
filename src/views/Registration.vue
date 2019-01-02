<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Форма регистрации</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                    :error-messages="lastNameErrors"
                                    prepend-icon="person"
                                    name="lastName"
                                    label="Фамилия"
                                    type="text"
                                    v-model="credentials.lastName"
                                    @input="$v.credentials.lastName.$touch()"
                                    @blur="$v.credentials.lastName.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="firstNameErrors"
                                    prepend-icon="person"
                                    name="firstName"
                                    label="Имя"
                                    type="text"
                                    v-model="credentials.firstName"
                                    @input="$v.credentials.firstName.$touch()"
                                    @blur="$v.credentials.firstName.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="patronymicErrors"
                                    prepend-icon="person"
                                    name="patronymic"
                                    label="Отчество"
                                    type="text"
                                    v-model="credentials.patronymic"
                                    @input="$v.credentials.patronymic.$touch()"
                                    @blur="$v.credentials.patronymic.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="emailErrors"
                                    prepend-icon="email"
                                    name="email"
                                    label="E-mail"
                                    type="text"
                                    v-model="credentials.email"
                                    @input="$v.credentials.email.$touch()"
                                    @blur="$v.credentials.email.$touch()"
                            ></v-text-field>
                            <v-dialog
                                    ref="dobDialog"
                                    v-model="dobModal"
                                    :return-value.sync="credentials.dob"
                                    persistent
                                    lazy
                                    full-width
                                    width="290px"
                            >
                                <v-text-field
                                        :error-messages="dobErrors"
                                        slot="activator"
                                        v-model="credentials.dob"
                                        label="Дата рождения"
                                        readonly
                                        @input="$v.credentials.dob.$touch()"
                                        @blur="$v.credentials.dob.$touch()"
                                ></v-text-field>
                                <v-date-picker
                                        :max="maxDobDate"
                                        v-model="credentials.dob"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="dobModal = false">Отмена</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dobDialog.save(credentials.dob)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-select
                                    :error-messages="genderErrors"
                                    :items="genders"
                                    label="Пол"
                                    v-model="credentials.gender"
                                    @change="$v.credentials.gender.$touch()"
                                    @blur="$v.credentials.gender.$touch()"
                            ></v-select>
                            <v-select
                                    :error-messages="nationalityErrors"
                                    :items="countries"
                                    label="Гражданство"
                                    v-model="credentials.nationality"
                                    @change="$v.credentials.nationality.$touch()"
                                    @blur="$v.credentials.nationality.$touch()"
                            ></v-select>
                            <v-text-field
                                    :error-messages="addressErrors"
                                    label="Адрес"
                                    type="text"
                                    v-model="credentials.address"
                                    @input="$v.credentials.address.$touch()"
                                    @blur="$v.credentials.address.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="phoneErrors"
                                    label="Телефон"
                                    type="text"
                                    v-model="credentials.phone"
                                    @input="$v.credentials.phone.$touch()"
                                    @blur="$v.credentials.phone.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="passwordErrors"
                                    prepend-icon="lock"
                                    name="password"
                                    label="Пароль"
                                    id="password"
                                    type="password"
                                    v-model="credentials.password"
                                    @input="$v.credentials.password.$touch()"
                                    @blur="$v.credentials.password.$touch()"
                            ></v-text-field>
                            <v-text-field
                                    :error-messages="passwordConfirmationErrors"
                                    prepend-icon="lock"
                                    name="password_confirmation"
                                    label="Подтверждение пароля"
                                    id="password_confirmation"
                                    type="password"
                                    v-model="credentials.passwordConfirmation"
                                    @input="$v.credentials.passwordConfirmation.$touch()"
                                    @blur="$v.credentials.passwordConfirmation.$touch()"
                            ></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="registration">Зарегистрироваться</v-btn>
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
  import { validationMixin } from 'vuelidate'
  import { required, email, minValue, sameAs } from 'vuelidate/lib/validators'

  export default {
    name: 'Registration',
    mixins: [validationMixin],
    validations: {
      credentials: {
        firstName: { required },
        lastName: { required },
        patronymic: { required },
        email: { required, email },
        dob: { required },
        nationality: { required },
        gender: { required },
        address: { required },
        phone: { required },
        password: { required, minValue: minValue(6) },
        passwordConfirmation: { required, sameAsPassword: sameAs('password') }
      }
    },
    data () {
      return {
        credentials: {
          firstName: '',
          lastName: '',
          patronymic: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          dob: null,
          nationality: null,
          gender: null,
          address: '',
          phone: ''
        },
        dobModal: false,
        genders: [
          'Мужской',
          'Женский',
        ],
        countries: [
          'Belarus',
          'Russia',
          'Ukraine'
        ]
      };
    },
    computed: {
      maxDobDate: function () {
        return moment().format('YYYY-MM-DD')
      },
      firstNameErrors () {
        const errors = []
        if (!this.$v.credentials.firstName.$dirty) return errors
        !this.$v.credentials.firstName.required && errors.push('Имя обязательно')
        return errors
      },
      lastNameErrors () {
        const errors = []
        if (!this.$v.credentials.lastName.$dirty) return errors
        !this.$v.credentials.lastName.required && errors.push('Фамилия обязательна')
        return errors
      },
      patronymicErrors () {
        const errors = []
        if (!this.$v.credentials.patronymic.$dirty) return errors
        !this.$v.credentials.patronymic.required && errors.push('Отчество обязательно')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.credentials.email.$dirty) return errors
        !this.$v.credentials.email.email && errors.push('Должно быть валидным адресом электронной почты')
        !this.$v.credentials.email.required && errors.push('E-mail обязателен')
        return errors
      },
      dobErrors () {
        const errors = []
        if (!this.$v.credentials.dob.$dirty) return errors
        !this.$v.credentials.dob.required && errors.push('Дата рождения обязательна')
        return errors
      },
      nationalityErrors () {
        const errors = []
        if (!this.$v.credentials.nationality.$dirty) return errors
        !this.$v.credentials.nationality.required && errors.push('Гражданство обязательно')
        return errors
      },
      genderErrors () {
        const errors = []
        if (!this.$v.credentials.gender.$dirty) return errors
        !this.$v.credentials.gender.required && errors.push('Пол обязателен')
        return errors
      },
      addressErrors () {
        const errors = []
        if (!this.$v.credentials.address.$dirty) return errors
        !this.$v.credentials.address.required && errors.push('Адрес обязателен')
        return errors
      },
      phoneErrors () {
        const errors = []
        if (!this.$v.credentials.phone.$dirty) return errors
        !this.$v.credentials.phone.required && errors.push('Телефон обязателен')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.credentials.password.$dirty) return errors
        !this.$v.credentials.password.required && errors.push('Пароль обязателен')
        return errors
      },
      passwordConfirmationErrors () {
        const errors = []
        if (!this.$v.credentials.passwordConfirmation.$dirty) return errors
        !this.$v.credentials.passwordConfirmation.required && errors.push('Подверждение пароля обязательно')
        !this.$v.credentials.passwordConfirmation.sameAsPassword && errors.push('Подтверждение пароля должно совпадать с паролем')
        return errors
      },
    },
    methods: {
      async registration () {
        this.$v.$touch()

        if (this.$v.$error === false ) {
          const response = await api.registration(this.credentials)

          console.log(response.data)
        }
      }
    }
  }
</script>

<style scoped>

</style>
