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
                            <v-text-field prepend-icon="person" name="username" label="Фамилия" type="text" v-model="credentials.lastName"></v-text-field>
                            <v-text-field prepend-icon="person" name="username" label="Имя" type="text" v-model="credentials.firstName"></v-text-field>
                            <v-text-field prepend-icon="person" name="username" label="Отчество" type="text" v-model="credentials.patronymic"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="E-mail" type="text" v-model="credentials.email"></v-text-field>
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
                                        slot="activator"
                                        v-model="credentials.dob"
                                        label="Date of Birth"
                                        readonly
                                ></v-text-field>
                                <v-date-picker
                                        :max="maxDobDate"
                                        v-model="credentials.dob"
                                        scrollable
                                >
                                    <v-spacer></v-spacer>
                                    <v-btn flat color="primary" @click="dobModal = false">Cancel</v-btn>
                                    <v-btn flat color="primary" @click="$refs.dobDialog.save(credentials.dob)">OK</v-btn>
                                </v-date-picker>
                            </v-dialog>
                            <v-select
                                    :items="genders"
                                    label="Gender"
                                    v-model="credentials.gender"
                            ></v-select>
                            <v-select
                                    :items="countries"
                                    label="Nationality"
                                    v-model="credentials.nationality"
                            ></v-select>
                            <v-text-field
                                    label="Address"
                                    type="text"
                                    v-model="credentials.address"
                            ></v-text-field>
                            <v-text-field
                                    label="Phone"
                                    type="text"
                                    v-model="credentials.phone"
                            ></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password" v-model="credentials.password"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Подтверждение пароля" id="password_confirmation" type="password" v-model="credentials.passwordConfirmation"></v-text-field>
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

  export default {
    name: 'Login',
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
      minDateOfVisit: function () {
        return moment().format('YYYY-MM-DD')
      }
    },
    methods: {
      async registration () {
        const response = await api.registration(this.credentials)

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
