<template>
    <v-carousel hide-controls>
        <v-carousel-item
                v-for="(item,i) in items"
                :key="i"
                :src="item.src"
        ></v-carousel-item>
    </v-carousel>
</template>

<script>
  export default {
    name: 'Carousel',
    data () {
      return {
        items: [
          { src: '/img/hospital-1.jpg' },
          { src: '/img/hospital-2.jpg' },
          { src: '/img/hospital-3.jpg' }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
