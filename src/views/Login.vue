<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Авторизация</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field prepend-icon="email" name="username" label="E-mail" type="text" v-model="credentials.email"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Пароль" id="password" type="password" v-model="credentials.password"></v-text-field>
                            <div v-if="error" class="red--text">{{ error }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="login">Авторизоваться</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  import api from '@/api/api'
  import axios from '@/api/axios'
  import cookies from 'js-cookie'

  export default {
    name: 'Login',
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: undefined
      };
    },
    methods: {
      async login () {
        this.error = undefined
        const response = await api.login(this.credentials)

        if (response.data.error) {
          this.credentials.password = ''
          this.error = response.data.error
        } else {
          cookies.set('token', response.data.accessToken)
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`

          await this.$store.dispatch('profile')

          this.$router.push({ name: 'home' })
        }
      }
    }
  }
</script>

<style scoped>

</style>
