<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Данные доктора</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field prepend-icon="person" name="lastName" label="Фамилия" type="text" v-model="credentials.lastName"></v-text-field>
                            <v-text-field prepend-icon="person" name="firstName" label="Имя" type="text" v-model="credentials.firstName"></v-text-field>
                            <v-text-field prepend-icon="person" name="patronymic" label="Отчество" type="text" v-model="credentials.patronymic"></v-text-field>
                            <v-text-field prepend-icon="email" name="email" label="E-mail" type="text" v-model="credentials.email"></v-text-field>
                            <v-text-field name="experience" label="Опыт работы" type="text" v-model="credentials.experience"></v-text-field>
                            <v-select
                                    :items="specializations"
                                    label="Специализация"
                                    item-text="title"
                                    item-value="uniqueTitle"
                                    v-model="credentials.specialization"
                            ></v-select>
                            <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password" v-model="credentials.password"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Подтверждение пароля" id="password_confirmation" type="password" v-model="credentials.passwordConfirmation"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="registration">Создать</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'CreateDoctor',
    data () {
      return {
        credentials: {
          firstName: '',
          lastName: '',
          patronymic: '',
          email: '',
          password: '',
          passwordConfirmation: '',
          experience: null,
          specialization: null,
        },
        experienceModal: false,
        specializations: [],
      };
    },
    async mounted () {
      this.specializations = (await api.specializations()).data
    },
    methods: {
      async registration () {
        const response = await api.createDoctor(this.credentials)

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
