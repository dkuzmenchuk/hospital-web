<template>
  <div id="app">
    <v-app id="inspire">
      <sidebar></sidebar>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'App',
    components: {
      Sidebar
    },
    async created () {
      await this.$store.dispatch('profile')
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
