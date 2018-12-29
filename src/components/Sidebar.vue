<template>
    <v-toolbar
            color="teal"
            dark
    >
        <v-toolbar-items>
            <v-btn flat @click="$router.push({ name: 'home' })">Больница</v-btn>
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

            <template v-if="isLoggedIn">
                <v-btn
                        flat
                        @click="$router.push('specializations')"
                >Врачи</v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                        flat
                        @click="$router.push('form')"
                >Записаться на прием</v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                        flat
                        @click="$router.push('orders')"
                >Записи</v-btn>
                <v-divider vertical></v-divider><v-btn
                        flat
                        @click="$router.push('card')"
                >Карточка</v-btn>
                <v-divider vertical></v-divider>
                <v-btn
                        flat
                        @click="$router.push('profile')"
                >Профиль</v-btn>
            </template>
            <template v-else>
                <v-btn
                        flat
                        @click="$router.push('login')"
                >Войти</v-btn>
            </template>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Sidebar',
    computed: {
      ...mapGetters([
        'isLoggedIn',
      ])
    }
  }
</script>

<style scoped>

</style>
