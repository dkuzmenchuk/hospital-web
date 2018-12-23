<template>
    <v-container fluid fill-height style="padding: 0">
        <v-layout justify-start>
            <v-navigation-drawer
                    permanent
            >
                <v-list class="pt-0" dense>
                    <v-divider light></v-divider>

                    <v-list-tile
                            v-for="item in specializations"
                            :key="item.title"
                            @click="$router.push({ name: 'doctors', params: { specialization: item.uniqueTitle } })"
                    >
                        <v-list-tile-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-tile-action>

                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-navigation-drawer>
            <v-flex>
                <router-view></router-view>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: 'Specializations',
    data () {
      return {
        specializations: []
      }
    },
    async created() {
      const response = await api.specializations()

      this.specializations = response.data
    }
  }
</script>

<style scoped>

</style>
