<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="primary">
                            <v-toolbar-title>Login form</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field prepend-icon="person" name="username" label="Username" type="text" v-model="credentials.username"></v-text-field>
                            <v-text-field prepend-icon="lock" name="password" label="Password" id="password" type="password" v-model="credentials.password"></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary"  @click.native="login">Login</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        }
      };
    }
  }
</script>

<style scoped>

</style>