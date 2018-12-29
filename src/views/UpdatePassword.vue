<template>
    <v-content>
        <v-container fluid>
            <v-layout justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Обновление пароля</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field prepend-icon="lock" name="password" label="Текущий пароль" id="current-password" type="password" v-model="credentials.currentPassword"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Новый пароль" id="password" type="password" v-model="credentials.password"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Подтверждение пароля" id="password_confirmation" type="password" v-model="credentials.passwordConfirmation"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="update">Обновить пароль</v-btn>
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
    name: 'UpdatePassword',
    data () {
      return {
        credentials: {
          currentPassword: '',
          password: '',
          passwordConfirmation: '',
        }
      }
    },
    methods: {
      async update () {
        const response = await api.updatePassword(this.credentials)

        console.log(response.data)
      }
    }
  }
</script>

<style scoped>

</style>
