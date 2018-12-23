<template>
    <v-toolbar
            color="teal"
            dark
    >
        <v-toolbar-items>
            <v-btn flat @click="$router.push({ name: 'home' })">Hospital</v-btn>
        </v-toolbar-items>

        <v-divider
                class="mx-3"
                inset
                vertical
        ></v-divider>

        <span class="subheading">My Home</span>

        <v-spacer></v-spacer>

        <v-toolbar-items>
            <template
                    v-for="item in items"
            >
                <v-btn
                        :key="'btn-' + item.title"
                        flat
                        @click="$router.push({ name: item.name })"
                >
                    {{ item.title }}
                </v-btn>
                <v-divider
                        :key="'divider-' + item.title"
                        vertical
                ></v-divider>
            </template>
        </v-toolbar-items>
        <v-toolbar-side-icon></v-toolbar-side-icon>
    </v-toolbar>
</template>

<script>
  export default {
    name: 'Sidebar',
    data () {
      return {
        items: [
          { title: 'Врачи', icon: 'dashboard', name: 'specializations' },
          { title: 'Записаться на прием', icon: 'question_answer', name: 'form' },
          { title: 'Login', icon: 'question_answer', name: 'login' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
