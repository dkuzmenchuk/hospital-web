<template>
    <v-toolbar
            color="teal"
            dark
    >
        <v-toolbar-items>
            <v-btn flat @click="$router.push({ name: 'home' })">Альфа</v-btn>
        </v-toolbar-items>

        <v-divider
                class="mx-3"
                inset
                vertical
        ></v-divider>

        <span class="subheading">{{ $route.meta.title }}</span>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <v-divider vertical></v-divider>

            <v-btn
                    flat
                    @click="$router.push('specializations')"
            >Врачи</v-btn>
            <v-divider vertical></v-divider>
            <template v-if="isLoggedIn">
                <template v-if="isClient">
                    <v-btn
                            v-if="isClient"
                            flat
                            @click="$router.push('form')"
                    >Записаться на прием</v-btn>
                    <v-divider vertical></v-divider>
                    <v-btn
                            flat
                            @click="$router.push(isClient ? 'client-orders' : 'doctor-orders')"
                    >Записи</v-btn>
                    <v-divider vertical></v-divider>
                    <v-btn
                            v-if="isClient"
                            flat
                            @click="$router.push('card')"
                    >Карточка</v-btn>
                    <v-divider vertical></v-divider>
                </template>
                <template v-if="isDoctor">
                    <v-btn
                            flat
                            @click="$router.push(isClient ? 'client-orders' : 'doctor-orders')"
                    >Записи</v-btn>
                    <v-divider vertical></v-divider>
                </template>
                <template v-if="isAdmin">
                    <v-btn
                            flat
                            @click="$router.push('create-doctor')"
                    >Добавить врача</v-btn>
                    <v-divider vertical></v-divider>
                    <v-btn
                            flat
                            @click="$router.push('working-time')"
                    >Добавить расписание</v-btn>
                    <v-divider vertical></v-divider>
                </template>
                <v-btn
                        flat
                        @click="$router.push('profile')"
                >Профиль</v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                        flat
                        @click="logout"
                >Выйти</v-btn>
            </template>
            <template v-else>
                <v-btn
                        flat
                        @click="$router.push('registration')"
                >Зарегистрироваться</v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                        flat
                        @click="$router.push('login')"
                >Войти</v-btn>
            </template>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import cookie from 'js-cookie'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters([
        'isLoggedIn',
        'isClient',
        'isDoctor',
        'isAdmin',
      ])
    },
    methods: {
      logout () {
        cookie.remove('token')
        this.$store.commit('setUser', undefined)
        this.$router.push({ name: 'login' })
      }
    }
  }
</script>

<style scoped>

</style>
