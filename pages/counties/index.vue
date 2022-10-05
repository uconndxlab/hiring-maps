<template>
  <div class="single-county-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import GchartMap from '~/components/gchart-map.vue'

export default {
  name: 'CountyPage',
  components: { GchartMap }
}
</script>
