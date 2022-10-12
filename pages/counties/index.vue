<template>
  <div class="county-map-page">
    <v-row justify="center">
      <v-col cols="12">
        <GchartMap />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="mb-4 mt-8">
        <CountiesList />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import GchartMap from '~/components/gchart-map.vue'
import CountiesList from '~/components/counties-list.vue'

export default {
  name: 'CountyPage',
  components: { GchartMap, CountiesList }
}
</script>
